"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/reflect", label: "Reflect" },
  { href: "/decide", label: "Decide" },
  { href: "/goals", label: "Plan" },
  { href: "/resources", label: "Resources" },
];

export default function Nav() {
  const pathname = usePathname();

  return (
    <header className="border-b border-stone">
      <div className="mx-auto flex max-w-content items-center justify-between px-6 py-5">
        <Link href="/" className="flex items-center gap-2.5">
          <svg width="22" height="22" viewBox="0 0 22 22" aria-hidden="true">
            <circle cx="11" cy="11" r="9" fill="none" stroke="#43604F" strokeWidth="1.4" />
            <circle cx="11" cy="11" r="2" fill="#C98A3C" />
          </svg>
          <span className="font-serif text-lg text-ink">Waypoint</span>
        </Link>

        <nav aria-label="Main">
          <ul className="flex items-center gap-7 text-[0.95rem]">
            {links.map((link) => {
              const active = pathname === link.href;
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={
                      active
                        ? "text-moss-dark font-medium"
                        : "text-inkfaint hover:text-ink"
                    }
                  >
                    {link.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    </header>
  );
}
