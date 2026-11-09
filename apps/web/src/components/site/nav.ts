import type { SpriteKind } from "./Sprite";

export type NavItem = { href: string; label: string; piece: SpriteKind };

/** Main navigation. The desktop bar shows the first four; the phone menu shows all of them. */
export const NAV: NavItem[] = [
  { href: "/events", label: "Events", piece: "knight" },
  { href: "/leaderboard", label: "Leaderboard", piece: "queen" },
  { href: "/rules", label: "Rules", piece: "bishop" },
  { href: "/sponsor", label: "Sponsors", piece: "rook" },
  { href: "/host", label: "For creators", piece: "king" },
];

export const DESKTOP_NAV = NAV.slice(0, 4);

/** A section is current on its own page and on the pages under it. */
export const isCurrent = (pathname: string | null, href: string) =>
  !!pathname && (pathname === href || pathname.startsWith(`${href}/`));
