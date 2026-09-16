"use client";

import { useEffect, useState } from "react";
import { loadFromStorage } from "@/lib/storage";
import type { ReflectionEntry, GoalCard, DecisionEntry } from "@/lib/types";

function startOfWeek(): Date {
  const now = new Date();
  const day = now.getDay();
  const diff = (day === 0 ? -6 : 1) - day;
  const monday = new Date(now);
  monday.setDate(now.getDate() + diff);
  monday.setHours(0, 0, 0, 0);

  return monday;
}

function isThisWeek(iso: string, weekStart: Date): boolean {
  return new Date(iso) >= weekStart;
}

export default function WeekDashboard() {
  const [counts, setCounts] = useState<{
    reflections: number;
    completed: number;
    decisions: number;
  } | null>(null);

  useEffect(() => {
    const weekStart = startOfWeek();
    const reflections = loadFromStorage<ReflectionEntry[]>(
      "waypoint.reflections",
      [],
    ).filter((r) => isThisWeek(r.createdAt, weekStart)).length;

    const completed = loadFromStorage<GoalCard[]>("waypoint.goals", []).filter((g) => g.completedAt && isThisWeek(g.completedAt, weekStart)).length;

    const decisions = loadFromStorage<DecisionEntry[]>("waypoint.decisions", []).filter((d) => isThisWeek(d.createdAt, weekStart)).length;

    setCounts({ reflections, completed, decisions });

  }, []);

  if (!counts || (counts.reflections === 0 && counts.completed === 0 && counts.decisions === 0)) {
    return null;
  }

  const stats = [
    { label: "reflections", value: counts.reflections },
    { label: "completed", value: counts.completed },
    { label: "decisions worked through", value: counts.decisions },
  ];

  return (
    <div className="flex flex-wrap items-center gap-x-8 gap-y-2 border-y border-stone bg-card/60 px-6 py-4 text-sm">
      <span className="font-serif italic text-moss-dark">This week</span>
      {stats.map((stat) => (
        <span key={stat.label} className="text-inkfaint">
          <span className="font-medium text-ink">{stat.value}</span>
        </span>
      ))}
    </div>
  )
}
