"use client";

import { useState } from "react";
import type { Persoon } from "@/lib/data";

export default function PersonCard({ persoon }: { persoon: Persoon }) {
  const [open, setOpen] = useState(false);
  const [gereageerd, setGereageerd] = useState(false);

  const antwoorden = [
    { vraag: "Waarom wil ik dit?", tekst: persoon.waarom },
    { vraag: "Waar ik tegenaan loop", tekst: persoon.tegenaan },
    { vraag: "Waar ik sterk in ben", tekst: persoon.sterk },
    { vraag: "Wat ik er al voor deed", tekst: persoon.deed },
  ];
  const velden = [
    { label: "Dienstverband", waarde: persoon.dienstverband },
    { label: "Reisafstand", waarde: persoon.reisafstand },
    { label: "Werkomgeving", waarde: persoon.omgeving },
    { label: "Heeft ervoor over", waarde: persoon.over },
  ];

  return (
    <div
      className={`overflow-hidden rounded-3xl border bg-white transition-colors ${
        open ? "border-black/25" : "border-black/10"
      }`}
    >
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="flex w-full flex-col gap-4.5 px-6.5 pt-6.5 pb-6 text-left"
      >
        <span className="flex w-full items-center justify-between gap-4">
          <span className="text-xs font-semibold tracking-[0.16em] text-black/45 uppercase">Wil worden</span>
          <span
            className={`shrink-0 text-[26px] leading-none text-accent transition-transform duration-200 ${
              open ? "rotate-45" : ""
            }`}
          >
            +
          </span>
        </span>
        <span className="block font-display text-[clamp(30px,3.2vw,44px)] font-extrabold tracking-[-0.04em]">
          {persoon.wil}
        </span>
        <span className="flex flex-wrap gap-2">
          {[persoon.regio, persoon.start, persoon.dienstverband].map((chip) => (
            <span key={chip} className="rounded-full bg-sand px-3.5 py-1.5 text-sm font-medium text-black/70">
              {chip}
            </span>
          ))}
        </span>
      </button>

      {open && (
        <div className="flex flex-col gap-6 px-6.5 pb-6.5">
          {antwoorden.map((a) => (
            <div key={a.vraag} className="flex flex-col gap-2 border-t border-black/10 pt-5">
              <span className="text-xs font-semibold tracking-[0.14em] text-accent uppercase">{a.vraag}</span>
              <span className="text-[17px] leading-snug">{a.tekst}</span>
            </div>
          ))}
          <div className="grid grid-cols-2 gap-x-5 gap-y-4.5 border-t border-black/10 pt-5">
            {velden.map((v) => (
              <div key={v.label} className="flex flex-col gap-0.5">
                <span className="text-[11px] font-semibold tracking-[0.14em] text-black/45 uppercase">
                  {v.label}
                </span>
                <span className="text-[16px] font-semibold">{v.waarde}</span>
              </div>
            ))}
          </div>

          {gereageerd ? (
            <div className="flex flex-col gap-2 border-t border-black/10 pt-5">
              <span className="font-display text-[21px] font-bold tracking-[-0.03em] text-accent">
                Reactie verstuurd
              </span>
              <span className="text-[16px] leading-snug text-black/65">
                Wij leggen jouw uitnodiging voor. Zegt deze persoon ja, dan krijg je naam en contactgegevens —
                zonder kosten.
              </span>
            </div>
          ) : (
            <div className="flex items-center justify-between gap-3 border-t border-black/10 pt-5">
              <span className="text-sm text-black/50">Reageren is gratis</span>
              <button
                type="button"
                onClick={() => setGereageerd(true)}
                className="rounded-full bg-accent px-5.5 py-3 text-[15px] font-semibold text-white"
              >
                Reageer
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
