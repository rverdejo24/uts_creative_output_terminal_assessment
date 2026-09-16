import { RESOURCE_CATEGORIES, FURTHER_READING } from "@/lib/data";

export default function ResourcesPage() {
  return (
    <div className="mx-auto max-w-content px-6 py-14">
      <header className="max-w-prose">
        <p className="font-serif text-sm italic text-moss-dark">Resources</p>
        <h1 className="mt-2 font-serif text-3xl text-ink">
          Notes worth having on hand.
        </h1>
        <p className="mt-3 text-sm leading-relaxed text-inkfaint">
          Nothing here is a substitute for advice specific to your situation
          — think of it as a starting list, not a checklist to clear.
        </p>
      </header>

      <div className="mt-10 grid grid-cols-1 gap-10 md:grid-cols-12">
        <nav
          aria-label="Resource categories"
          className="md:col-span-3 md:sticky md:top-8 md:h-fit"
        >
          <ul className="space-y-2 border-l border-stone pl-4">
            {RESOURCE_CATEGORIES.map((cat) => (
              <li key={cat.id}>
                <a
                  href={`#${cat.id}`}
                  className="text-sm text-inkfaint hover:text-moss-dark"
                >
                  {cat.label}
                </a>
              </li>
            ))}
            <li>
              <a
                href="#sources"
                className="text-sm text-inkfaint hover:text-moss-dark"
              >
                Sources
              </a>
            </li>
          </ul>
        </nav>

        <div className="md:col-span-9 space-y-14">
          {RESOURCE_CATEGORIES.map((cat) => (
            <section key={cat.id} id={cat.id} className="scroll-mt-24">
              <h2 className="font-serif text-xl text-ink">{cat.label}</h2>
              <p className="mt-2 max-w-prose text-sm leading-relaxed text-inkfaint">
                {cat.intro}
              </p>

              <ul className="mt-6 space-y-6">
                {cat.items.map((item) => (
                  <li key={item.title} className="border-l-2 border-stone pl-4">
                    <p className="text-sm font-medium text-ink">
                      {item.href ? (
                        <a
                          href={item.href}
                          target="_blank"
                          rel="noreferrer"
                          className="hover:text-moss-dark"
                        >
                          {item.title}
                        </a>
                      ) : (
                        item.title
                      )}
                    </p>
                    <p className="mt-1 text-sm leading-relaxed text-inkfaint">
                      {item.description}
                    </p>
                  </li>
                ))}
              </ul>
            </section>
          ))}

          <section id="sources" className="scroll-mt-24">
            <h2 className="font-serif text-xl text-ink">
              Sources &amp; further reading
            </h2>
            <p className="mt-2 max-w-prose text-sm leading-relaxed text-inkfaint">
              The reframes on this page draw on research about unemployment,
              wellbeing, and career adaptability, not just general advice.
            </p>
            <ul className="mt-6 space-y-5">
              {FURTHER_READING.map((s) => (
                <li key={s.citation} className="border-l-2 border-stone pl-4">
                  <a href={s.link} target="_blank" rel="noreferrer" className="hover:text-moss-dark">
                    <p className="text-sm text-ink">{s.citation}</p>
                  </a>
                  <p className="mt-1 text-sm leading-relaxed text-inkfaint">
                    {s.note}
                  </p>
                </li>
              ))}
            </ul>
          </section>
        </div>
      </div>
    </div>
  );
}
