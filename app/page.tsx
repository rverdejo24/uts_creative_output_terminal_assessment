import Link from "next/link";

export default function Home() {
  return (
    <>
      {/* Hero */}
      <section className="mx-auto max-w-content px-6 pb-16 pt-16 md:pb-24 md:pt-20">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-12 md:gap-8">
          <div className="md:col-span-7">
            <p className="font-serif text-sm italic text-moss-dark">
              For the in-between
            </p>
            <h1 className="mt-3 max-w-[16ch] font-serif text-4xl leading-[1.12] text-ink md:text-5xl">
              Between roles isn&rsquo;t the same as without direction.
            </h1>
            <p className="mt-6 max-w-prose text-[1.05rem] leading-relaxed text-inkfaint">
              Waypoint is a small, private toolkit for career transitions —
              somewhere to think clearly, break a vague goal into next
              actions, and keep a short list of what actually helps, without
              the noise of a hundred open tabs.
            </p>
            <div className="mt-9 flex flex-wrap items-center gap-4">
              <Link
                href="/reflect"
                className="rounded-sm bg-moss px-5 py-3 text-sm font-medium text-white transition-colors hover:bg-moss-dark"
              >
                Start reflecting
              </Link>
              <Link
                href="/goals"
                className="rounded-sm border border-stoneline px-5 py-3 text-sm font-medium text-ink transition-colors hover:border-moss hover:text-moss-dark"
              >
                Open your board
              </Link>
            </div>
            <p className="mt-6 text-xs text-inkfaint">
              Everything you write stays on this device — nothing is sent
              anywhere.
            </p>
          </div>

          <div className="md:col-span-5 md:pt-4">
            <WayPath />
          </div>
        </div>
      </section>

      {/* Three entry points */}
      <section className="border-t border-stone bg-card/40">
        <div className="mx-auto max-w-content px-6 py-16">
          <div className="grid grid-cols-1 gap-10 md:grid-cols-3 md:gap-8">
            <EntryPoint
              index="1"
              title="Reflect"
              href="/reflect"
              copy="Short, specific prompts for the days when 'how's the search going' has no easy answer. Takes five minutes, kept for yourself."
            />
            <EntryPoint
              index="2"
              title="Plan"
              href="/goals"
              copy="Move a goal from someday to this week, one card at a time. A board, not a to-do list you'll abandon by Wednesday."
            />
            <EntryPoint
              index="3"
              title="Resources"
              href="/resources"
              copy="Practical, non-generic notes on applications, money and logistics, and the self-doubt that tends to show up uninvited."
            />
          </div>
        </div>
      </section>
    </>
  );
}

function EntryPoint({
  index,
  title,
  href,
  copy,
}: {
  index: string;
  title: string;
  href: string;
  copy: string;
}) {
  return (
    <Link href={href} className="group block">
      <div className="flex items-baseline gap-3 border-b border-stoneline pb-3">
        <span className="font-serif text-sm text-amber">{index}</span>
        <h2 className="font-serif text-xl text-ink group-hover:text-moss-dark">
          {title}
        </h2>
      </div>
      <p className="mt-4 text-sm leading-relaxed text-inkfaint">{copy}</p>
    </Link>
  );
}

function WayPath() {
  return (
    <svg
      viewBox="0 0 360 300"
      className="w-full max-w-sm"
      role="img"
      aria-label="A winding path with four waypoints, the second marked as today"
    >
      <path
        d="M40 40 C 140 60, 60 120, 150 140 S 320 160, 300 260"
        fill="none"
        stroke="#7C9884"
        strokeWidth="1.5"
        className="waypath-line"
      />
      {/* point 1 - behind you */}
      <circle cx="40" cy="40" r="5" fill="#DAD9D0" />
      <text x="54" y="44" className="fill-inkfaint text-[11px]" fontFamily="var(--font-sans)">
        the last role
      </text>

      {/* point 2 - today, emphasized */}
      <circle cx="150" cy="140" r="7.5" fill="#C98A3C" />
      <circle cx="150" cy="140" r="12" fill="none" stroke="#C98A3C" strokeWidth="1" opacity="0.4" />
      <text x="166" y="136" className="fill-ink text-[12px] font-medium" fontFamily="var(--font-sans)">
        today
      </text>
      <text x="166" y="152" className="fill-inkfaint text-[11px]" fontFamily="var(--font-sans)">
        figuring out the next step
      </text>

      {/* point 3 */}
      <circle cx="300" cy="188" r="5" fill="#DAD9D0" />
      <text x="230" y="182" className="fill-inkfaint text-[11px]" fontFamily="var(--font-sans)">
        a few interviews
      </text>

      {/* point 4 - destination, open */}
      <circle cx="300" cy="260" r="5.5" fill="none" stroke="#43604F" strokeWidth="1.5" />
      <text x="228" y="284" className="fill-moss-dark text-[11px]" fontFamily="var(--font-sans)">
        the next right role
      </text>
    </svg>
  );
}
