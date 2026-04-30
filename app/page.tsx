"use client";

import Link from "next/link";
import { useState } from "react";

const topics = [
  "Anxiety",
  "Healing",
  "Family",
  "Guidance",
  "Strength",
  "Protection",
  "Gratitude",
  "Before Sleep",
];

const prayerPages = [
  { label: "Prayer for Anxiety", href: "/prayer-for-anxiety" },
  { label: "Prayer for Healing", href: "/prayer-for-healing" },
  { label: "Prayer for Family", href: "/prayer-for-family" },
  { label: "Prayer for Strength", href: "/prayer-for-strength" },
  { label: "Prayer for Protection", href: "/prayer-for-protection" },
  { label: "Prayer for Guidance", href: "/prayer-for-guidance" },
  { label: "Morning Prayer", href: "/morning-prayer" },
  { label: "Prayer Before Sleep", href: "/prayer-before-sleep" },
  { label: "Prayer for Peace", href: "/prayer-for-peace" },
  { label: "Prayer for Gratitude", href: "/prayer-for-gratitude" },
];

export default function Home() {
  const [input, setInput] = useState("");
  const [prayer, setPrayer] = useState("");
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  async function generatePrayer() {
    if (!input.trim()) return;

    setLoading(true);
    setPrayer("");
    setCopied(false);
    setSaving(false);
    setError("");

    try {
      const response = await fetch("/api/prayer", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          topic: input.trim(),
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data?.error || "Unable to generate prayer.");
        return;
      }

      setPrayer(data.prayer);
    } catch {
      setError("Unable to connect. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  async function copyPrayer() {
    if (!prayer) return;

    await navigator.clipboard.writeText(prayer);
    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 2000);
  }

  async function saveOnFaithCompanion() {
    if (!prayer) return;

    setSaving(true);

    try {
      await navigator.clipboard.writeText(prayer);
    } catch {
      // Continue even if clipboard fails.
    }

    const encodedPrayer = encodeURIComponent(prayer);
    const encodedTopic = encodeURIComponent(input.trim());

    window.location.href = `https://faithcompanionai.com/tools/prayer?from=prayergeneratorai&topic=${encodedTopic}&prayer=${encodedPrayer}`;
  }

  function resetForm() {
    setInput("");
    setPrayer("");
    setCopied(false);
    setSaving(false);
    setError("");
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-black text-white">
      <section className="mx-auto flex min-h-screen max-w-5xl flex-col items-center justify-center px-6 py-16 text-center">
        <p className="mb-4 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-300">
          Free Christian AI Prayer Generator
        </p>

        <h1 className="max-w-3xl text-4xl font-bold tracking-tight sm:text-6xl">
          Generate a Personalized Prayer in Seconds
        </h1>

        <p className="mt-6 max-w-2xl text-lg text-slate-300">
          Write what you need prayer for, and receive a thoughtful Christian
          prayer you can read, reflect on, copy, and share.
        </p>

        <p className="mt-3 text-sm text-slate-400">
          Created for believers seeking peace, strength, comfort, and guidance.
        </p>

        <div className="mt-8 flex flex-wrap justify-center gap-2">
          {topics.map((topic) => (
            <button
              key={topic}
              onClick={() => {
                setInput(`Prayer for ${topic.toLowerCase()}`);
                setPrayer("");
                setCopied(false);
                setSaving(false);
                setError("");
              }}
              className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-200 transition hover:bg-white/10"
            >
              {topic}
            </button>
          ))}
        </div>

        <div className="mt-8 w-full max-w-2xl rounded-3xl border border-white/10 bg-white/5 p-4 shadow-2xl">
          <textarea
            value={input}
            onChange={(e) => {
              setInput(e.target.value);
              setError("");
            }}
            maxLength={500}
            placeholder="Example: I need prayer for peace, healing, my family, or guidance..."
            className="min-h-36 w-full resize-none rounded-2xl border border-white/10 bg-slate-900 p-4 text-white outline-none placeholder:text-slate-500"
          />

          <div className="mt-2 text-right text-xs text-slate-500">
            {input.length}/500
          </div>

          <button
            onClick={generatePrayer}
            disabled={loading || !input.trim()}
            className="mt-4 w-full rounded-2xl bg-emerald-500 px-6 py-4 font-semibold text-slate-950 transition hover:bg-emerald-400 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading ? "Generating Prayer..." : "Generate My Prayer"}
          </button>

          {error && (
            <p className="mt-4 rounded-2xl border border-red-400/20 bg-red-500/10 p-4 text-sm text-red-200">
              {error}
            </p>
          )}
        </div>

        {prayer && (
          <div className="mt-8 w-full max-w-2xl rounded-3xl border border-emerald-400/20 bg-slate-950/90 p-6 text-left shadow-2xl">
            <h2 className="text-2xl font-bold">Your Prayer</h2>

            <p className="mt-4 whitespace-pre-line leading-8 text-slate-200">
              {prayer}
            </p>

            <button
              onClick={saveOnFaithCompanion}
              disabled={saving}
              className="mt-6 w-full rounded-2xl bg-emerald-500 px-6 py-4 text-center font-semibold text-slate-950 transition hover:bg-emerald-400 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {saving
                ? "Opening FaithCompanionAI..."
                : "Save This Prayer on FaithCompanionAI"}
            </button>

            <button
              onClick={copyPrayer}
              className="mt-3 w-full rounded-2xl bg-slate-700 px-6 py-4 text-center font-semibold text-white transition hover:bg-slate-600"
            >
              {copied ? "Prayer Copied!" : "Copy Prayer"}
            </button>

            <button
              onClick={resetForm}
              className="mt-3 w-full rounded-2xl border border-white/10 px-6 py-4 text-center font-semibold text-slate-200 transition hover:bg-white/10"
            >
              Generate Another Prayer
            </button>

            <p className="mt-4 text-center text-xs text-slate-500">
              Saving opens FaithCompanionAI, where prayers can be stored with
              your account.
            </p>
          </div>
        )}

        <section className="mt-16 max-w-3xl text-left text-slate-300">
          <h2 className="text-2xl font-bold text-white">
            How to Use This AI Prayer Generator
          </h2>

          <p className="mt-4 leading-7">
            Type a short description of what you need prayer for, such as
            anxiety, healing, family, guidance, strength, protection, or
            gratitude. The generator will create a simple Christian prayer you
            can use for personal reflection.
          </p>

          <h2 className="mt-8 text-2xl font-bold text-white">
            Popular Prayer Topics
          </h2>

          <p className="mt-4 leading-7">
            Browse prayer topics below or generate a custom prayer for your
            personal situation.
          </p>

          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            {prayerPages.map((page) => (
              <Link
                key={page.href}
                href={page.href}
                className="rounded-2xl border border-white/10 bg-white/5 px-5 py-4 text-white transition hover:bg-white/10"
              >
                {page.label}
              </Link>
            ))}
          </div>

          <h2 className="mt-8 text-2xl font-bold text-white">
            Want to Save Your Prayers?
          </h2>

          <p className="mt-4 leading-7">
            Use the save button after generating a prayer. It will send you to
            FaithCompanionAI so you can continue with saved prayers, devotionals,
            Bible tools, and more.
          </p>
        </section>
      </section>
    </main>
  );
}
