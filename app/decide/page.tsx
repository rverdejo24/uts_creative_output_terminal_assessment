"use client";

import { useEffect, useMemo, useState } from "react";
import { loadFromStorage, saveToStorage, makeId } from "@/lib/storage";
import type { DecisionEntry } from "@/lib/types";

const STORAGE_KEY = "waypoint.decisions";

const EMPTY = {
  decision: "",
  canControl: "",
  cannotControl: "",
  worstCase: "",
  contingency: "",
  thisWeekAction: "",
};

export default function DecidePage() {
  const [form, setForm] = useState(EMPTY);
  const [entries, setEntries] = useState<DecisionEntry[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setEntries(loadFromStorage<DecisionEntry[]>(STORAGE_KEY, []));
    setLoaded(true);
  }, []);

  useEffect(() => {
    if (loaded) saveToStorage(STORAGE_KEY, entries);
  }, [entries, loaded]);

  const canSave = form.decision.trim().length > 0;

  function update(field: keyof typeof EMPTY, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  function handleSave() {
    if (!canSave) return;
    const entry: DecisionEntry = {
      id: makeId(),
      decision: form.decision.trim(),
      canControl: form.canControl.trim(),
      cannotControl: form.cannotControl.trim(),
      worstCase: form.worstCase.trim(),
      contingency: form.contingency.trim(),
      thisWeekAction: form.thisWeekAction.trim(),
      createdAt: new Date().toISOString(),
    };
    setEntries((prev) => [entry, ...prev]);
    setForm(EMPTY);
  }

  function handleDelete(id: string) {
    setEntries((prev) => prev.filter((e) => e.id !== id));
  }

  const dateFormatter = useMemo(
    () => new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric" }),
    []
  );

  return (
    <div className="mx-auto max-w-content px-6 py-14">
      <header className="max-w-prose">
        <p className="font-serif text-sm italic text-moss-dark">Decide</p>
        <h1 className="mt-2 font-serif text-3xl text-ink">
          Work through the uncertainty on paper.
        </h1>
        <p className="mt-3 text-sm leading-relaxed text-inkfaint">
          Most career-transition regret comes from not having a plan for
          things going wrong, not from the decision itself. This walks
          through one decision at a time — what's yours to influence, what
          isn't, and what you'd do if the worst realistic version happened.
        </p>
      </header>

      <div className="mt-10 grid grid-cols-1 gap-12 md:grid-cols-12">
        <div className="md:col-span-7 space-y-7">
          <Field
            label="Decision I'm facing"
            hint="State it plainly — e.g. 'Should I keep pursuing X, or change direction?'"
            value={form.decision}
            onChange={(v) => update("decision", v)}
            rows={2}
          />
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <Field
              label="What can I control?"
              hint="Effort, preparation, how you follow up."
              value={form.canControl}
              onChange={(v) => update("canControl", v)}
            />
            <Field
              label="What can't I control?"
              hint="Timelines, other people's decisions, the market."
              value={form.cannotControl}
              onChange={(v) => update("cannotControl", v)}
            />
          </div>
          <Field
            label="Realistic worst-case outcome"
            hint="Not the catastrophic version — the plausible one."
            value={form.worstCase}
            onChange={(v) => update("worstCase", v)}
          />
          <Field
            label="If that happens, what's my contingency plan?"
            hint="One concrete fallback is enough."
            value={form.contingency}
            onChange={(v) => update("contingency", v)}
          />
          <Field
            label="One action I can take this week"
            hint="Small and specific beats big and vague."
            value={form.thisWeekAction}
            onChange={(v) => update("thisWeekAction", v)}
          />

          <button
            type="button"
            onClick={handleSave}
            disabled={!canSave}
            className="rounded-sm bg-moss px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-moss-dark disabled:cursor-not-allowed disabled:bg-stone disabled:text-inkfaint"
          >
            Save this decision
          </button>
        </div>

        <div className="md:col-span-5">
          <h2 className="font-serif text-lg text-ink">Past decisions</h2>
          {entries.length === 0 ? (
            <p className="mt-4 text-sm leading-relaxed text-inkfaint">
              Nothing saved yet. Work through one above and it'll show up
              here.
            </p>
          ) : (
            <ul className="mt-4 space-y-6">
              {entries.map((entry) => (
                <li key={entry.id} className="border-l-2 border-stone pl-4">
                  <div className="flex items-start justify-between gap-3">
                    <p className="text-sm font-medium text-ink">
                      {entry.decision}
                    </p>
                    <button
                      type="button"
                      onClick={() => handleDelete(entry.id)}
                      className="shrink-0 text-xs text-inkfaint hover:text-ink"
                      aria-label="Delete entry"
                    >
                      remove
                    </button>
                  </div>
                  <p className="mt-1 text-xs text-inkfaint">
                    {dateFormatter.format(new Date(entry.createdAt))}
                  </p>
                  {entry.thisWeekAction && (
                    <p className="mt-2 text-sm leading-relaxed text-ink">
                      <span className="text-inkfaint">This week: </span>
                      {entry.thisWeekAction}
                    </p>
                  )}
                  {entry.contingency && (
                    <p className="mt-1 text-sm leading-relaxed text-ink">
                      <span className="text-inkfaint">If it goes wrong: </span>
                      {entry.contingency}
                    </p>
                  )}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}

function Field({
  label,
  hint,
  value,
  onChange,
  rows = 3,
}: {
  label: string;
  hint: string;
  value: string;
  onChange: (v: string) => void;
  rows?: number;
}) {
  return (
    <div>
      <label className="font-serif text-base text-ink">{label}</label>
      <p className="mt-1 text-xs text-inkfaint">{hint}</p>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        rows={rows}
        className="field mt-2.5 w-full rounded-sm p-3.5 text-sm leading-relaxed text-ink outline-none"
      />
    </div>
  );
}
