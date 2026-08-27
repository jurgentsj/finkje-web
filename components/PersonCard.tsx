"use client";

import { useState } from "react";
import Link from "next/link";
import type { Persoon } from "@/lib/data";
import { matchtLocatie, woonplaats } from "@/lib/data";
import { useReageer } from "@/lib/reageer-context";

export default function PersonCard({ persoon, filterRegio }: { persoon: Persoon; filterRegio: string }) {
  const [open, setOpen] = useState(false);
  const [leesMeer, setLeesMeer] = useState(false);
  const { reageerOp, heeftGereageerd } = useReageer();
  const gereageerd = heeftGereageerd(persoon.id);

  const woon = woonplaats(persoon);
  const loc = matchtLocatie(persoon, filterRegio);
  const toonAfstand = loc.km !== null && loc.km > 0;

  const antwoorden = [
    { vraag: "Waar ik sterk in ben", tekst: persoon.sterk || "Helaas, geen invoer." },
    { vraag: "Waar ik tegenaan loop", tekst: persoon.tegenaan || "Helaas, geen invoer." },
    { vraag: "Wat heb ik ervoor over?", tekst: persoon.over || "Helaas, geen invoer." },
  ];
  const velden = [
    { label: "Woonplaats", waarde: woon + (persoon.reisafstand ? " · tot " + persoon.reisafstand.toLowerCase() : "") },
    { label: "Beschikbaar", waarde: persoon.start || "Helaas, geen invoer." },
    { label: "Dienstverband", waarde: persoon.dienstverband || "Helaas, geen invoer." },
    { label: "Werkomgeving", waarde: persoon.omgeving || "Helaas, geen invoer." },
    { label: "Jaren ervaring", waarde: persoon.ervaring || "Helaas, geen invoer." },
    { label: "Sectorvoorkeur", waarde: persoon.sector || "Helaas, geen invoer." },
  ];

  return (
    <div
      className={`relative overflow-hidden rounded-3xl border bg-white transition-colors ${
        open ? "border-black/25" : "border-black/12"
      }`}
    >
      {persoon.hkleur && (
        <div className="group absolute top-4.5 left-4.5 z-[2]">
          <span
            className="block h-6 w-6 rounded-full ring-2 ring-white"
            style={{ background: persoon.hkleur }}
          />
          <div className="pointer-events-none absolute top-9 left-0 z-[6] flex w-72 flex-col gap-2 rounded-2xl bg-black p-4.5 text-white opacity-0 transition-all duration-150 group-hover:pointer-events-auto group-hover:opacity-100 group-focus-within:pointer-events-auto group-focus-within:opacity-100">
            <span className="font-display text-[15px] font-bold tracking-[-0.01em]">
              De lievelingskleur van deze persoon
            </span>
            <span className="text-[13.5px] leading-relaxed text-white/72">
              Gewoon iets leuks om te laten zien aan een werkgever. Verder niks bijzonders.
            </span>
            <Link href="/lievelingskleur" className="text-[13.5px] font-semibold text-white underline">
              Waarom een lievelingskleur? →
            </Link>
          </div>
        </div>
      )}
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="flex w-full flex-col gap-7 px-6.5 pt-6.5 pb-6 text-left"
      >
        <span className="flex min-h-7.5 w-full items-center justify-end gap-4">
          {toonAfstand && (
            <span className="mr-auto text-xs font-semibold tracking-[0.06em] text-black/45 uppercase">
              {loc.km} km van {filterRegio}
            </span>
          )}
          <span
            className={`shrink-0 text-[26px] leading-none text-accent transition-transform duration-200 ${
              open ? "rotate-45" : ""
            }`}
          >
            +
          </span>
        </span>
        <span className="flex min-h-[2.85em] flex-col justify-end font-display text-[clamp(30px,3.2vw,44px)] leading-[0.94] font-extrabold tracking-[-0.04em]">
          {persoon.wil}
        </span>
        <span className="flex min-h-19 flex-wrap content-start gap-2">
          {[persoon.dienstverband, persoon.start, persoon.omgeving, persoon.sector].filter(Boolean).map((chip) => (
            <span key={chip} className="rounded-full bg-sand px-3.5 py-1.5 text-sm font-medium text-black/72">
              {chip}
            </span>
          ))}
        </span>
      </button>

      {open && (
        <div className="flex flex-col gap-6 px-6.5 pb-6.5">
          <div className="flex flex-col gap-2 border-t border-black/10 pt-5">
            <span className="text-xs font-semibold tracking-[0.14em] text-accent uppercase">Introductie</span>
            <span className="text-[17px] leading-snug">{persoon.intro || "Helaas, geen invoer."}</span>
          </div>

          {!leesMeer && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setLeesMeer(true);
              }}
              className="self-start rounded-full border border-black/20 px-5.5 py-3 text-[15px] font-semibold text-[#111] transition-colors hover:border-black hover:bg-sand"
            >
              Lees meer
            </button>
          )}

          {leesMeer &&
            antwoorden.map((a) => (
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
                onClick={(e) => {
                  e.stopPropagation();
                  reageerOp(persoon.id, persoon.wil);
                }}
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
