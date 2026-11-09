import Link from "next/link";
import { PLAY_HREF } from "@/lib/links";
import { Brand } from "./Brand";
import { MobileMenu } from "./MobileMenu";
import { NavLinks } from "./NavLinks";

/** Site header. Desktop: logo, nav, Play now. Phone: logo, Play now and a menu button. */
export function Header({ sticky = false }: { sticky?: boolean }) {
  return (
    <header className={`${sticky ? "sticky top-0" : "relative"} z-30 border-b border-line bg-background/95`}>
      <div className="hdr-in mx-auto flex max-w-6xl items-center gap-4 px-5 py-3 md:gap-8">
        <Link href="/" className="flex min-w-0 items-center gap-2.5 sm:gap-3" aria-label="PawnPool home">
          <Brand />
        </Link>
        <NavLinks />
        <div className="ml-auto flex items-center gap-2 md:ml-0">
          <Link href={PLAY_HREF} className="btn btn-gold btn-sm">
            Play now
          </Link>
          <MobileMenu />
        </div>
      </div>
    </header>
  );
}
