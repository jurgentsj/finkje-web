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
        aria-label="Volgende voordelen"
        onClick={() => scroll(1)}
        className="absolute right-1 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-black/10 bg-white/70 text-black/75 opacity-90 shadow-[0_2px_10px_rgba(17,17,17,0.1)] backdrop-blur-md transition hover:border-black hover:bg-black hover:text-white hover:opacity-100 sm:hidden"
      >
        <span aria-hidden="true">→</span>
      </button>
      <div ref={railRef} className="finkje-benefits-rail flex snap-x snap-mandatory gap-3 overflow-x-auto px-6 pb-2 sm:grid sm:grid-cols-2 sm:gap-px sm:overflow-hidden sm:rounded-2xl sm:border sm:border-black/10 sm:bg-black/5 sm:px-0 sm:pb-0 xl:grid-cols-4">
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
