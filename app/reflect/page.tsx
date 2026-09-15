"use client";

import { useEffect, useMemo, useState } from "react";
import { PROMPTS } from "@/lib/data";
import { loadFromStorage, saveToStorage, makeId } from "@/lib/storage";
import type { ReflectionEntry } from "@/lib/types";

const STORAGE_KEY = "waypoint.reflections";

const ENERGY_OPTIONS: { value: ReflectionEntry["energy"]; label: string }[] = [
  { value: "low", label: "Running low" },
  { value: "steady", label: "Steady" },
  { value: "good", label: "Genuinely good" },
];

function pickPrompt(exclude?: string) {
  const options = exclude ? PROMPTS.filter((p) => p !== exclude) : PROMPTS;
  return options[Math.floor(Math.random() * options.length)];
}

export default function ReflectPage() {
  const [prompt, setPrompt] = useState(PROMPTS[0]);
  const [text, setText] = useState("");
  const [energy, setEnergy] = useState<ReflectionEntry["energy"]>("steady");
  const [entries, setEntries] = useState<ReflectionEntry[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setPrompt(pickPrompt());
    setEntries(loadFromStorage<ReflectionEntry[]>(STORAGE_KEY, []));
    setLoaded(true);
  }, []);

  useEffect(() => {
    if (loaded) saveToStorage(STORAGE_KEY, entries);
  }, [entries, loaded]);

  const canSave = text.trim().length > 0;

  function handleSave() {
    if (!canSave) return;
    const entry: ReflectionEntry = {
      id: makeId(),
      prompt,
      text: text.trim(),
      energy,
      createdAt: new Date().toISOString(),
    };
    setEntries((prev) => [entry, ...prev]);
    setText("");
    setPrompt(pickPrompt(prompt));
  }

  function handleDelete(id: string) {
    setEntries((prev) => prev.filter((e) => e.id !== id));
  }

  const dateFormatter = useMemo(
    () =>
      new Intl.DateTimeFormat("en-US", {
        month: "short",
        day: "numeric",
        year: entries.length ? undefined : undefined,
      }),
    [entries.length]
  );

  return (
    <div className="mx-auto max-w-content px-6 py-14">
      <header className="max-w-prose">
        <p className="font-serif text-sm italic text-moss-dark">Reflect</p>
        <h1 className="mt-2 font-serif text-3xl text-ink">
          Five minutes, just for you.
        </h1>
        <p className="mt-3 text-sm leading-relaxed text-inkfaint">
          No one else reads this. Write whatever's actually true, not the
          version you'd give in an interview.
        </p>
      </header>

      <div className="mt-10 grid grid-cols-1 gap-10 md:grid-cols-12">
        {/* Writing area */}
        <div className="md:col-span-7">
          <div className="flex items-start justify-between gap-4 border-b border-stoneline pb-4">
            <p className="font-serif text-lg leading-snug text-ink">
              {prompt}
            </p>
            <button
              type="button"
              onClick={() => setPrompt(pickPrompt(prompt))}
              className="shrink-0 whitespace-nowrap text-xs text-inkfaint underline decoration-stoneline underline-offset-4 hover:text-moss-dark"
            >
              try another
            </button>
          </div>

          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            rows={8}
            placeholder="Start typing..."
            className="field mt-5 w-full rounded-sm p-4 text-sm leading-relaxed text-ink outline-none placeholder:text-inkfaint/70"
          />

          <div className="mt-5 flex flex-wrap items-center justify-between gap-4">
            <fieldset className="flex items-center gap-2">
              <legend className="sr-only">How's your energy today</legend>
              {ENERGY_OPTIONS.map((opt) => (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => setEnergy(opt.value)}
                  aria-pressed={energy === opt.value}
                  className={`rounded-full border px-3.5 py-1.5 text-xs transition-colors ${
                    energy === opt.value
                      ? "border-moss bg-moss text-white"
                      : "border-stoneline text-inkfaint hover:border-moss hover:text-moss-dark"
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </fieldset>

            <button
              type="button"
              onClick={handleSave}
              disabled={!canSave}
              className="rounded-sm bg-moss px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-moss-dark disabled:cursor-not-allowed disabled:bg-stone disabled:text-inkfaint"
            >
              Save entry
            </button>
          </div>
        </div>

        {/* Past entries */}
        <div className="md:col-span-5">
          <h2 className="font-serif text-lg text-ink">Past entries</h2>
          {entries.length === 0 ? (
            <p className="mt-4 text-sm leading-relaxed text-inkfaint">
              Nothing saved yet. Your first entry will show up here.
            </p>
          ) : (
            <ul className="mt-4 space-y-5">
              {entries.map((entry) => (
                <li key={entry.id} className="border-l-2 border-stone pl-4">
                  <div className="flex items-center justify-between gap-3">
                    <p className="text-xs text-inkfaint">
                      {dateFormatter.format(new Date(entry.createdAt))} ·{" "}
                      {ENERGY_OPTIONS.find((o) => o.value === entry.energy)?.label}
                    </p>
                    <button
                      type="button"
                      onClick={() => handleDelete(entry.id)}
                      className="text-xs text-inkfaint hover:text-ink"
                      aria-label="Delete entry"
                    >
                      remove
                    </button>
                  </div>
                  <p className="mt-1 text-sm italic text-inkfaint">
                    {entry.prompt}
                  </p>
                  <p className="mt-1.5 whitespace-pre-wrap text-sm leading-relaxed text-ink">
                    {entry.text}
                  </p>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
