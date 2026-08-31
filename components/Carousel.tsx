"use client";

import Image from "next/image";
import { useEffect, useMemo, useRef } from "react";
import { railFotos } from "@/lib/data";

const CARD_W = "clamp(220px, 24vw, 300px)";
// Image is a 3:4 (w:h) box, so its rendered height is card-width * 4/3 —
// used to center the arrows on the PHOTO itself, not the card+caption.
const CARD_H = `calc(${CARD_W} * 4 / 3)`;

export default function Carousel() {
  const railRef = useRef<HTMLDivElement>(null);
  const blockWidth = useRef(0);
  const animating = useRef(false);
  const initialized = useRef(false);
  const wrapTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Three copies of the same list so the rail can scroll infinitely: start
  // in the middle copy, and once the user scrolls into copy 1 or 3, snap
  // back to the equivalent spot in copy 2 — invisibly, since the copies
  // are identical.
  const items = useMemo(
    () => [0, 1, 2].flatMap((setIdx) => railFotos.map((f) => ({ ...f, key: `${f.id}-${setIdx}`, setIdx }))),
    [],
  );

  useEffect(() => {
    const el = railRef.current;
    if (!el) return;

    const maybeWrap = () => {
      if (animating.current) return;
      const b = blockWidth.current;
      if (!b) return;
      if (el.scrollLeft < b * 0.5) el.scrollLeft += b;
      else if (el.scrollLeft > b * 1.5) el.scrollLeft -= b;
    };

    // Re-measure whenever the rail's size changes (images finishing load,
    // resize, orientation change) — scrollWidth isn't reliable before the
    // images have laid out, so this replaces any fixed setTimeout guess.
    const ro = new ResizeObserver(() => {
      const b = el.scrollWidth / 3;
      blockWidth.current = b;
      if (!initialized.current && b > 0) {
        el.scrollLeft = b;
        initialized.current = true;
      } else {
        maybeWrap();
      }
    });
    ro.observe(el);

    // Only wrap once scrolling has actually settled — nudging scrollLeft
    // mid-gesture fights the browser's native touch/momentum scrolling and
    // is what made the rail feel broken on mobile. Once settled, the jump
    // between the (identical) copies is visually imperceptible.
    const onScroll = () => {
      if (wrapTimer.current) clearTimeout(wrapTimer.current);
      wrapTimer.current = setTimeout(maybeWrap, 120);
    };
    el.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      ro.disconnect();
      el.removeEventListener("scroll", onScroll);
      if (wrapTimer.current) clearTimeout(wrapTimer.current);
    };
  }, []);

  const scroll = (direction: 1 | -1) => {
    const el = railRef.current;
    if (!el) return;
    const b = blockWidth.current || el.scrollWidth / 3;
    if (el.scrollLeft < b * 0.5) el.scrollLeft += b;
    else if (el.scrollLeft > b * 1.5) el.scrollLeft -= b;

    const start = el.scrollLeft;
    const target = start + direction * Math.round(el.clientWidth * 0.7);
    animating.current = true;
    const t0 = performance.now();
    const duration = 420;
    const step = (t: number) => {
      const p = Math.min(1, (t - t0) / duration);
      const eased = 1 - Math.pow(1 - p, 3);
      el.scrollLeft = start + (target - start) * eased;
      if (p < 1) requestAnimationFrame(step);
      else animating.current = false;
    };
    requestAnimationFrame(step);
  };

  return (
    <div className="relative" style={{ "--card-w": CARD_W, "--card-h": CARD_H } as React.CSSProperties}>
      <button
        type="button"
        aria-label="Vorige"
        onClick={() => scroll(-1)}
        style={{ top: "calc(var(--card-h) / 2)" }}
        className="absolute left-1 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-black/10 bg-white/70 text-black/75 opacity-90 shadow-[0_2px_10px_rgba(17,17,17,0.1)] backdrop-blur-md transition hover:border-black hover:bg-black hover:text-white hover:opacity-100 sm:left-2 sm:h-[52px] sm:w-[52px] sm:bg-white/45 sm:opacity-70"
      >
        ←
      </button>
      <button
        type="button"
        aria-label="Volgende"
        onClick={() => scroll(1)}
        style={{ top: "calc(var(--card-h) / 2)" }}
        className="absolute right-1 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-black/10 bg-white/70 text-black/75 opacity-90 shadow-[0_2px_10px_rgba(17,17,17,0.1)] backdrop-blur-md transition hover:border-black hover:bg-black hover:text-white hover:opacity-100 sm:right-2 sm:h-[52px] sm:w-[52px] sm:bg-white/45 sm:opacity-70"
      >
        →
      </button>
      <div
        ref={railRef}
        className="finkje-rail flex items-start gap-4 overflow-x-auto overflow-y-hidden pb-2"
        style={{ scrollSnapType: "x mandatory" }}
      >
        {items.map((f) => (
          <figure
            key={f.key}
            aria-hidden={f.setIdx !== 1}
            className="m-0 flex-none"
            style={{ flexBasis: "var(--card-w)", scrollSnapAlign: "start" }}
          >
            <div className="relative aspect-[3/4] w-full overflow-hidden rounded-2xl bg-black/5">
              <Image
                src={f.src}
                alt={f.beroep}
                fill
                sizes="300px"
                className={`object-cover ${f.src.includes("finkje-rail-6") ? "scale-[1.08] translate-x-[-1%] translate-y-[2%]" : ""}`}
              />
            </div>
            <figcaption className="mt-3 text-[16px] text-black/60">
              &ldquo;{f.wil}&rdquo;
              <br />
              <br />
              <b>{f.beroep}</b>
            </figcaption>
          </figure>
        ))}
      </div>
    </div>
  );
}
