import { Sprite } from "./Sprite";

/** Pawn badge + PawnPool wordmark. The wordmark drops out on very narrow phones so the header never crowds. */
export function Brand({ keepWordmark = false }: { keepWordmark?: boolean }) {
  return (
    <>
      <span className="grid h-9 w-9 shrink-0 place-items-center rounded-md border border-gold/50 bg-panel">
        <Sprite piece="pawn" size={24} />
      </span>
      <span
        className={`font-mono text-[0.95rem] font-bold uppercase tracking-[0.22em] sm:tracking-[0.3em] ${
          keepWordmark ? "" : "max-[359px]:sr-only"
        }`}
      >
        PawnPool
      </span>
    </>
  );
}
