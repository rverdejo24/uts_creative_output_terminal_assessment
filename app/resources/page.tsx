import { RESOURCE_CATEGORIES } from "@/lib/data";

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
        </div>
      </div>
    </div>
  );
}
