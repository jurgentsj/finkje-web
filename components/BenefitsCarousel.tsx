"use client";

import { useRef } from "react";
type Voordeel = { titel: string; tekst: string };

export default function BenefitsCarousel({ voordelen }: { voordelen: Voordeel[] }) {
  const railRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 1 | -1) => {
    railRef.current?.scrollBy({ left: direction * railRef.current.clientWidth * 0.82, behavior: "smooth" });
  };

  return (
    <div className="relative -mx-6 sm:mx-0">
      <button
        type="button"
        aria-label="Vorige voordelen"
        onClick={() => scroll(-1)}
        className="absolute left-2 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-black/10 bg-white text-xl text-black shadow-sm transition hover:bg-black hover:text-white sm:hidden"
      >
        <span aria-hidden="true">←</span>
      </button>
      <button
        type="button"
        aria-label="Volgende voordelen"
        onClick={() => scroll(1)}
        className="absolute right-2 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-black/10 bg-white text-xl text-black shadow-sm transition hover:bg-black hover:text-white sm:hidden"
      >
        <span aria-hidden="true">→</span>
      </button>
      <div ref={railRef} className="flex snap-x snap-mandatory gap-3 overflow-x-auto px-6 pb-2 sm:grid sm:grid-cols-2 sm:gap-px sm:overflow-hidden sm:px-0 xl:grid-cols-4">
        {voordelen.map((v) => (
          <div key={v.titel} className="flex min-h-[220px] min-w-[82%] snap-start flex-col gap-3 rounded-2xl border border-black/8 bg-white px-6 py-7 sm:min-w-0 sm:rounded-none sm:border-0 sm:px-6 sm:py-7">
            <span className="font-display text-[20px] leading-tight font-semibold tracking-[-0.02em] text-[#111]">{v.titel}</span>
            <span className="text-[16px] leading-relaxed text-black/55">{v.tekst}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
