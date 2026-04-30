"use client";

import { useState } from "react";

export default function Home() {
  const [input, setInput] = useState("");
  const [prayer, setPrayer] = useState("");
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);

  const generatePrayer = async () => {
    if (!input) return;

    setLoading(true);
    setPrayer("");

    try {
      const res = await fetch("/api/prayer", {
        method: "POST",
        body: JSON.stringify({ topic: input }),
      });

      const data = await res.json();
      setPrayer(data.prayer);
    } catch (err) {
      setPrayer("Something went wrong.");
    }

    setLoading(false);
  };

  const savePrayer = async () => {
    setSaving(true);

    try {
      await fetch("https://faithcompanionai.com/api/save", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          type: "prayer",
          content: prayer,
        }),
      });

      alert("Prayer saved!");
    } catch (err) {
      alert("Error saving prayer.");
    }

    setSaving(false);
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-[#020617] to-[#020617] text-white flex flex-col items-center px-6 py-16">
      <h1 className="text-4xl md:text-6xl font-bold text-center mb-6">
        Generate a Personalized Prayer in Seconds
      </h1>

      <p className="text-gray-300 text-center max-w-2xl mb-8">
        Write what you need prayer for, and receive a thoughtful Christian prayer
        you can read, reflect on, and share.
      </p>

      <div className="w-full max-w-2xl bg-[#0f172a] p-6 rounded-2xl shadow-lg border border-gray-800">
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Example: I need prayer for peace, healing, my family, or guidance..."
          className="w-full h-32 p-4 rounded-lg bg-[#020617] border border-gray-700 text-white outline-none"
        />

        <button
          onClick={generatePrayer}
          className="w-full mt-4 bg-green-600 hover:bg-green-700 transition rounded-lg py-3 font-semibold"
        >
          {loading ? "Generating..." : "Generate My Prayer"}
        </button>
      </div>

      {prayer && (
        <div className="mt-10 max-w-2xl w-full bg-[#020617] border border-gray-800 p-6 rounded-2xl">
          <h2 className="text-xl font-semibold mb-4">Your Prayer</h2>
          <p className="text-gray-300 whitespace-pre-line">{prayer}</p>

          <div className="flex gap-4 mt-6">
            <button
              onClick={savePrayer}
              className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg"
            >
              {saving ? "Saving..." : "Save Prayer"}
            </button>

            <button
              onClick={() => navigator.clipboard.writeText(prayer)}
              className="bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded-lg"
            >
              Copy
            </button>
          </div>
        </div>
      )}

      <div className="mt-16 max-w-2xl text-center">
        <h2 className="text-2xl font-semibold mb-4">
          Want to Save Your Prayers?
        </h2>
        <p className="text-gray-400">
          Create an account on FaithCompanionAI to save your prayers, track your
          spiritual journey, and access more tools.
        </p>
      </div>
    </main>
  );
}
