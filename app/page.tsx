"use client";

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

export default function Home() {
  const [input, setInput] = useState("");
  const [prayer, setPrayer] = useState("");
  const [loading, setLoading] = useState(false);

  function generatePrayer() {
    if (!input.trim()) return;

    setLoading(true);
    setPrayer("");

    setTimeout(() => {
      setPrayer(`Heavenly Father,

I come before You today asking for Your presence, peace, and guidance regarding ${input.trim()}.

Please calm my heart, strengthen my faith, and help me trust Your timing. Give me wisdom for each step, courage for each challenge, and comfort in every uncertain moment.

May Your love surround me, Your truth guide me, and Your peace fill my heart.

In Jesus' name, Amen.`);
      setLoading(false);
    }, 800);
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-black text-white">
      <section className="mx-auto flex min-h-screen max-w-5xl flex-col items-center justify-center px-6 py-16 text-center">
        <p className="mb-4 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-300">
          Free Christian Prayer Generator
        </p>

        <h1 className="max-w-3xl text-4xl font-bold tracking-tight sm:text-6xl">
          Generate a Personalized Prayer in Seconds
        </h1>

        <p className="mt-6 max-w-2xl text-lg text-slate-300">
          Write what you need prayer for, and receive a thoughtful Christian prayer
          you can read, reflect on, and share.
        </p>

        <div className="mt-8 flex flex-wrap justify-center gap-2">
          {topics.map((topic) => (
            <button
              key={topic}
              onClick={() => setInput(`Prayer for ${topic.toLowerCase()}`)}
              className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-200 hover:bg-white/10"
            >
              {topic}
            </button>
          ))}
        </div>

        <div className="mt-8 w-full max-w-2xl rounded-3xl border border-white/10 bg-white/5 p-4 shadow-2xl">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Example: I need prayer for peace, healing, my family, or guidance..."
            className="min-h-36 w-full resize-none rounded-2xl border border-white/10 bg-slate-950/80 p-4 text-white outline-none placeholder:text-slate-500"
          />

          <button
            onClick={generatePrayer}
            disabled={loading || !input.trim()}
            className="mt-4 w-full rounded-2xl bg-emerald-500 px-6 py-4 font-semibold text-slate-950 transition hover:bg-emerald-400 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading ? "Generating Prayer..." : "Generate My Prayer"}
          </button>
        </div>

        {prayer && (
          <div className="mt-8 w-full max-w-2xl rounded-3xl border border-emerald-400/20 bg-slate-950/90 p-6 text-left shadow-2xl">
            <h2 className="text-2xl font-bold">Your Prayer</h2>
            <p className="mt-4 whitespace-pre-line leading-8 text-slate-200">
              {prayer}
            </p>

            <a
              href="https://faithcompanionai.com/tools/prayer?from=prayergeneratorai"
              className="mt-6 block rounded-2xl bg-white px-6 py-4 text-center font-semibold text-slate-950 hover:bg-slate-200"
            >
              Save & Access More on FaithCompanionAI
            </a>
          </div>
        )}

        <section className="mt-16 max-w-3xl text-left text-slate-300">
          <h2 className="text-2xl font-bold text-white">
            How to Use This Prayer Generator
          </h2>
          <p className="mt-4 leading-7">
            Type a short description of what you need prayer for, such as anxiety,
            healing, family, guidance, strength, protection, or gratitude. The
            generator will create a simple Christian prayer you can use for personal
            reflection.
          </p>

          <h2 className="mt-8 text-2xl font-bold text-white">
            Want to Save Your Prayers?
          </h2>
          <p className="mt-4 leading-7">
            For saved prayers, devotionals, Bible tools, and more, continue to
            FaithCompanionAI.
          </p>
        </section>
      </section>
    </main>
  );
}
