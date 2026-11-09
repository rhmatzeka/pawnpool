"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState, type CSSProperties } from "react";
import { createPortal } from "react-dom";
import { PLAY_HREF } from "@/lib/links";
import { Brand } from "./Brand";
import { NAV, isCurrent } from "./nav";
import { Sprite } from "./Sprite";

const SHEET_ID = "site-menu";

// Phosphor "list" and "x", regular weight.
function MenuIcon() {
  return (
    <svg viewBox="0 0 256 256" width="22" height="22" fill="currentColor" aria-hidden="true">
      <path d="M224,128a8,8,0,0,1-8,8H40a8,8,0,0,1,0-16H216A8,8,0,0,1,224,128ZM40,72H216a8,8,0,0,0,0-16H40a8,8,0,0,0,0,16ZM216,184H40a8,8,0,0,0,0,16H216a8,8,0,0,0,0-16Z" />
    </svg>
  );
}
function CloseIcon() {
  return (
    <svg viewBox="0 0 256 256" width="22" height="22" fill="currentColor" aria-hidden="true">
      <path d="M205.66,194.34a8,8,0,0,1-11.32,11.32L128,139.31,61.66,205.66a8,8,0,0,1-11.32-11.32L116.69,128,50.34,61.66A8,8,0,0,1,61.66,50.34L128,116.69l66.34-66.35a8,8,0,0,1,11.32,11.32L139.31,128Z" />
    </svg>
  );
}

const iconButton =
  "grid h-9 w-9 shrink-0 place-items-center rounded-md border border-line text-foreground transition-colors hover:border-gold hover:text-gold";

/**
 * Phone navigation: a button in the header opens a full-screen sheet with every page.
 * The sheet closes on navigation, Escape, the close button, or when the window grows to the desktop layout.
 */
export function MobileMenu() {
  const pathname = usePathname();
  // Remember which page the menu was opened on: navigating away closes it without an effect.
  const [openOn, setOpenOn] = useState<string | null>(null);
  const open = openOn !== null && openOn === pathname;
  const button = useRef<HTMLButtonElement>(null);
  const sheet = useRef<HTMLDivElement>(null);

  const close = useCallback(() => {
    setOpenOn(null);
    button.current?.focus();
  }, []);

  useEffect(() => {
    if (!open) return;
    const root = document.documentElement;
    const before = root.style.overflow;
    root.style.overflow = "hidden";
    sheet.current?.querySelector<HTMLElement>("[data-autofocus]")?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") return close();
      if (e.key !== "Tab" || !sheet.current) return;
      // Keep focus inside the sheet while it is open.
      const items = sheet.current.querySelectorAll<HTMLElement>("a[href], button");
      const first = items[0];
      const last = items[items.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last?.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first?.focus();
      }
    };
    const desktop = window.matchMedia("(min-width: 768px)");
    const onWide = () => desktop.matches && setOpenOn(null);
    document.addEventListener("keydown", onKey);
    desktop.addEventListener("change", onWide);
    return () => {
      root.style.overflow = before;
      document.removeEventListener("keydown", onKey);
      desktop.removeEventListener("change", onWide);
    };
  }, [open, close]);

  return (
    <>
      <button
        ref={button}
        type="button"
        className={`${iconButton} md:hidden`}
        aria-label="Open menu"
        aria-expanded={open}
        aria-controls={SHEET_ID}
        onClick={() => setOpenOn(pathname)}
      >
        <MenuIcon />
      </button>
      {open &&
        createPortal(
          <div
            ref={sheet}
            id={SHEET_ID}
            role="dialog"
            aria-modal="true"
            aria-label="Menu"
            className="menu-sheet grid-fine fixed inset-0 z-50 flex flex-col overflow-y-auto bg-background md:hidden"
          >
            <div className="flex shrink-0 items-center gap-2 border-b border-line px-5 py-3">
              <Link href="/" onClick={() => setOpenOn(null)} className="flex min-w-0 items-center gap-2.5" aria-label="PawnPool home">
                <Brand />
              </Link>
              <button type="button" className={`${iconButton} ml-auto`} aria-label="Close menu" onClick={close} data-autofocus>
                <CloseIcon />
              </button>
            </div>

            <nav aria-label="Main" className="px-5 pt-4">
              <ul>
                {NAV.map((n, i) => {
                  const current = isCurrent(pathname, n.href);
                  return (
                    <li key={n.href} className="menu-row border-b border-line" style={{ "--i": i } as CSSProperties}>
                      <Link
                        href={n.href}
                        onClick={() => setOpenOn(null)}
                        aria-current={current ? "page" : undefined}
                        className={`group flex items-center justify-between gap-4 py-4 ${current ? "text-gold" : "text-foreground"}`}
                      >
                        <span className="display text-[2rem] !leading-none transition-colors group-hover:text-gold">{n.label}</span>
                        <Sprite piece={n.piece} size={36} className={current ? "" : "opacity-70 transition-opacity group-hover:opacity-100"} />
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </nav>

            <div className="menu-row mt-auto px-5 pb-[max(1.5rem,env(safe-area-inset-bottom))] pt-8" style={{ "--i": NAV.length } as CSSProperties}>
              <Link href={PLAY_HREF} onClick={() => setOpenOn(null)} className="btn btn-gold w-full">
                Play now
              </Link>
              <p className="mt-4 text-center text-sm text-muted">Free to play. No payment, ever.</p>
            </div>
          </div>,
          document.body,
        )}
    </>
  );
}
