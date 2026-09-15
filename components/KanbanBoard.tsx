"use client";

import { useEffect, useState } from "react";
import { loadFromStorage, saveToStorage, makeId } from "@/lib/storage";
import type { ColumnId, GoalCard } from "@/lib/types";

const STORAGE_KEY = "waypoint.goals";

const COLUMNS: { id: ColumnId; label: string; hint: string }[] = [
  {
    id: "someday",
    label: "Someday",
    hint: "Ideas worth keeping, not ready to act on yet",
  },
  {
    id: "this-month",
    label: "This month",
    hint: "Worth breaking down into a smaller step",
  },
  {
    id: "this-week",
    label: "This week",
    hint: "Small enough to actually do",
  },
  {
    id: "done",
    label: "Done",
    hint: "Evidence you're moving",
  },
];

const SEED: Omit<GoalCard, "id" | "createdAt">[] = [
  {
    title: "Rewrite resume summary around outcomes",
    column: "this-week",
  },
  {
    title: "Reach out to two former colleagues",
    note: "Ask what they're seeing in the market, not for a job",
    column: "this-month",
  },
  {
    title: "Land a role I actually want, not just any role",
    column: "someday",
  },
];

function seedGoals(): GoalCard[] {
  return SEED.map((g) => ({
    ...g,
    id: makeId(),
    createdAt: new Date().toISOString(),
  }));
}

export default function KanbanBoard() {
  const [cards, setCards] = useState<GoalCard[]>([]);
  const [loaded, setLoaded] = useState(false);
  const [draggingId, setDraggingId] = useState<string | null>(null);
  const [dragOverColumn, setDragOverColumn] = useState<ColumnId | null>(null);
  const [addingTo, setAddingTo] = useState<ColumnId | null>(null);
  const [draft, setDraft] = useState("");

  useEffect(() => {
    const stored = loadFromStorage<GoalCard[] | null>(STORAGE_KEY, null);
    setCards(stored ?? seedGoals());
    setLoaded(true);
  }, []);

  useEffect(() => {
    if (loaded) saveToStorage(STORAGE_KEY, cards);
  }, [cards, loaded]);

  function moveCard(id: string, column: ColumnId) {
    setCards((prev) =>
      prev.map((c) => (c.id === id ? { ...c, column } : c))
    );
  }

  function deleteCard(id: string) {
    setCards((prev) => prev.filter((c) => c.id !== id));
  }

  function addCard(column: ColumnId) {
    const title = draft.trim();
    if (!title) {
      setAddingTo(null);
      return;
    }
    const card: GoalCard = {
      id: makeId(),
      title,
      column,
      createdAt: new Date().toISOString(),
    };
    setCards((prev) => [...prev, card]);
    setDraft("");
    setAddingTo(null);
  }

  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
      {COLUMNS.map((col) => {
        const colCards = cards.filter((c) => c.column === col.id);
        const isOver = dragOverColumn === col.id;
        return (
          <div
            key={col.id}
            onDragOver={(e) => {
              e.preventDefault();
              setDragOverColumn(col.id);
            }}
            onDragLeave={() => setDragOverColumn((c) => (c === col.id ? null : c))}
            onDrop={(e) => {
              e.preventDefault();
              const id = e.dataTransfer.getData("text/plain");
              if (id) moveCard(id, col.id);
              setDraggingId(null);
              setDragOverColumn(null);
            }}
            className={`flex min-h-[16rem] flex-col rounded-sm border p-3 transition-colors ${
              isOver ? "border-moss bg-moss/5" : "border-stone bg-card/60"
            }`}
          >
            <div className="mb-1 flex items-baseline justify-between">
              <h3 className="font-serif text-base text-ink">{col.label}</h3>
              <span className="text-xs text-inkfaint">{colCards.length}</span>
            </div>
            <p className="mb-3 text-xs leading-snug text-inkfaint">{col.hint}</p>

            <div className="flex flex-1 flex-col gap-2.5">
              {colCards.map((card) => (
                <div
                  key={card.id}
                  draggable
                  onDragStart={(e) => {
                    e.dataTransfer.setData("text/plain", card.id);
                    setDraggingId(card.id);
                  }}
                  onDragEnd={() => setDraggingId(null)}
                  className={`group cursor-grab rounded-sm border border-stoneline bg-white px-3 py-2.5 active:cursor-grabbing ${
                    draggingId === card.id ? "opacity-40" : ""
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <p className="text-sm leading-snug text-ink">{card.title}</p>
                    <button
                      type="button"
                      onClick={() => deleteCard(card.id)}
                      aria-label={`Remove ${card.title}`}
                      className="shrink-0 text-inkfaint opacity-0 transition-opacity group-hover:opacity-100 hover:text-ink"
                    >
                      ×
                    </button>
                  </div>
                  {card.note && (
                    <p className="mt-1 text-xs leading-snug text-inkfaint">
                      {card.note}
                    </p>
                  )}

                  {/* quick-move controls, keyboard/touch friendly fallback for drag */}
                  <div className="mt-2 flex flex-wrap gap-1">
                    {COLUMNS.filter((c) => c.id !== card.column).map((c) => (
                      <button
                        key={c.id}
                        type="button"
                        onClick={() => moveCard(card.id, c.id)}
                        className="rounded-full border border-stone px-2 py-0.5 text-[10px] text-inkfaint hover:border-moss hover:text-moss-dark"
                      >
                        → {c.label}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {addingTo === col.id ? (
              <div className="mt-2.5">
                <input
                  autoFocus
                  value={draft}
                  onChange={(e) => setDraft(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") addCard(col.id);
                    if (e.key === "Escape") {
                      setAddingTo(null);
                      setDraft("");
                    }
                  }}
                  onBlur={() => addCard(col.id)}
                  placeholder="Name this step..."
                  className="field w-full rounded-sm px-2.5 py-2 text-sm text-ink outline-none"
                />
              </div>
            ) : (
              <button
                type="button"
                onClick={() => setAddingTo(col.id)}
                className="mt-2.5 text-left text-xs text-inkfaint hover:text-moss-dark"
              >
                + add a card
              </button>
            )}
          </div>
        );
      })}
    </div>
  );
}
