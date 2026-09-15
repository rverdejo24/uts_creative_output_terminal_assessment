import KanbanBoard from "@/components/KanbanBoard";

export default function GoalsPage() {
  return (
    <div className="mx-auto max-w-content px-6 py-14">
      <header className="max-w-prose">
        <p className="font-serif text-sm italic text-moss-dark">Plan</p>
        <h1 className="mt-2 font-serif text-3xl text-ink">
          Break it down until it's doable.
        </h1>
        <p className="mt-3 text-sm leading-relaxed text-inkfaint">
          "Find a new job" isn't a task, it's a direction. Drag cards toward
          <span className="whitespace-nowrap"> this week </span>
          as they get small enough to actually start.
        </p>
      </header>

      <div className="mt-10">
        <KanbanBoard />
      </div>
    </div>
  );
}
