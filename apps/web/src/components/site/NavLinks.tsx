"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { DESKTOP_NAV, isCurrent } from "./nav";

/** The desktop navigation bar. Hidden on phones, where the menu button takes over. */
export function NavLinks() {
  const pathname = usePathname();
  return (
    <nav aria-label="Main" className="mr-auto hidden items-center gap-6 md:flex lg:gap-8">
      {DESKTOP_NAV.map((n) => (
        <Link
          key={n.href}
          href={n.href}
          aria-current={isCurrent(pathname, n.href) ? "page" : undefined}
          className="nav-link whitespace-nowrap"
        >
          {n.label}
        </Link>
      ))}
    </nav>
  );
}
