"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { railFotos } from "@/lib/data";

export default function Carousel() {
  const railRef = useRef<HTMLDivElement>(null);
  const blockWidth = useRef(0);
  const animating = useRef(false);

  useEffect(() => {
    const el = railRef.current;
    if (!el) return;

    const setup = () => {
      const real = Array.from(el.children) as HTMLElement[];
      // Guard against re-running after clones already exist.
      if (el.dataset.railBound === "1") {
        blockWidth.current = el.scrollWidth / 3;
        return;
      }
      const makeClone = (n: HTMLElement) => {
        const c = n.cloneNode(true) as HTMLElement;
        c.setAttribute("aria-hidden", "true");
        return c;
      };
      real.forEach((n) => el.appendChild(makeClone(n)));
      for (let i = real.length - 1; i >= 0; i--) el.insertBefore(makeClone(real[i]), el.firstChild);
      blockWidth.current = el.scrollWidth / 3;
      el.scrollLeft = blockWidth.current;
      el.dataset.railBound = "1";

      const onScroll = () => {
        if (animating.current || !blockWidth.current) return;
        const b = blockWidth.current;
        if (el.scrollLeft < b * 0.5) el.scrollLeft += b;
        else if (el.scrollLeft > b * 1.5) el.scrollLeft -= b;
      };
      el.addEventListener("scroll", onScroll, { passive: true });
      const onResize = () => {
        blockWidth.current = el.scrollWidth / 3;
      };
      window.addEventListener("resize", onResize);
      return () => {
        el.removeEventListener("scroll", onScroll);
        window.removeEventListener("resize", onResize);
      };
    };

    const t1 = setTimeout(setup, 100);
    return () => clearTimeout(t1);
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
    <div className="relative flex flex-col">
      <button
        type="button"
        aria-label="Vorige"
        onClick={() => scroll(-1)}
        className="absolute top-1/2 left-2 z-10 flex h-[52px] w-[52px] -translate-y-1/2 items-center justify-center rounded-full border border-black/10 bg-white/45 text-black/75 opacity-70 shadow-[0_2px_10px_rgba(17,17,17,0.06)] backdrop-blur-md transition hover:border-black hover:bg-black hover:text-white hover:opacity-100"
      >
        ←
      </button>
      <button
        type="button"
        aria-label="Volgende"
        onClick={() => scroll(1)}
        className="absolute top-1/2 right-2 z-10 flex h-[52px] w-[52px] -translate-y-1/2 items-center justify-center rounded-full border border-black/10 bg-white/45 text-black/75 opacity-70 shadow-[0_2px_10px_rgba(17,17,17,0.06)] backdrop-blur-md transition hover:border-black hover:bg-black hover:text-white hover:opacity-100"
      >
        →
      </button>
      <div
        ref={railRef}
        className="finkje-rail flex items-start gap-4 overflow-x-auto overflow-y-hidden pb-2"
        style={{ scrollSnapType: "x mandatory" }}
      >
        {railFotos.map((f) => (
          <figure key={f.id} className="m-0 flex-none" style={{ flexBasis: "clamp(220px, 24vw, 300px)", scrollSnapAlign: "start" }}>
            <div className="relative aspect-[3/4] w-full overflow-hidden rounded-2xl bg-black/5">
              <Image src={f.src} alt={f.beroep} fill sizes="300px" className="object-cover" />
            </div>
            <figcaption className="mt-3 text-[15px] text-black/60">
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
