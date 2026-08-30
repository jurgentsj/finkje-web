"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  gefilterdeMensen,
  regioOpties,
  urenOpties,
  startFilterOpties,
  sectorFilterOpties,
} from "@/lib/data";
import PersonCard from "@/components/PersonCard";

export default function MensenExplorer() {
  const [zoek, setZoek] = useState("");
  const [regio, setRegio] = useState("Alle locaties");
  const [geavanceerd, setGeavanceerd] = useState(false);
  const [sector, setSector] = useState("Alle sectoren");
  const [uren, setUren] = useState("Alle uren");
  const [start, setStart] = useState("Maakt niet uit");

  const gefilterd = useMemo(
    () => gefilterdeMensen({ zoek, filterRegio: regio, filterUren: uren, filterStart: start, filterSector: sector }),
    [zoek, regio, uren, start, sector],
  );

  const wisFilters = () => {
    setZoek("");
    setRegio("Alle locaties");
    setSector("Alle sectoren");
    setUren("Alle uren");
    setStart("Maakt niet uit");
  };

  return (
    <>
      <p className="mt-3.5 text-[16px]">
        <Link href="/lievelingskleur?from=mensen" className="font-semibold">
          Wat is dat kleurbolletje bovenaan elke kaart? →
        </Link>
      </p>

      <div className="mt-10 rounded-3xl bg-sand p-6">
        <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,240px),1fr))] gap-4">
          <label className="flex flex-col gap-2">
            <span className="text-xs font-semibold tracking-[0.14em] text-black/50 uppercase">Functietitel</span>
            <input
              value={zoek}
              onChange={(e) => setZoek(e.target.value)}
              placeholder="bijv. developer"
              className="rounded-full border border-black/15 bg-white px-4.5 py-3.5 text-base text-[#111] outline-none focus:border-accent"
            />
          </label>
          <label className="flex flex-col gap-2">
            <span className="text-xs font-semibold tracking-[0.14em] text-black/50 uppercase">
              Locatie van de functie
            </span>
            <select
              value={regio}
              onChange={(e) => setRegio(e.target.value)}
              className="rounded-full border border-black/15 bg-white px-4.5 py-3.5 text-base text-[#111] outline-none focus:border-accent"
            >
              {regioOpties.map((o) => (
                <option key={o} value={o}>
                  {o}
                </option>
              ))}
            </select>
            <span className="text-[13.5px] leading-snug text-black/50">
              We tonen iedereen die hier volgens zijn eigen reisafstand naartoe wil.
            </span>
          </label>
        </div>

        <button
          type="button"
          onClick={() => setGeavanceerd((g) => !g)}
          className="mt-4.5 flex items-center gap-2 text-[15px] font-semibold text-[#111] transition-colors hover:text-accent"
        >
          <span className="text-lg text-accent">+</span>
          <span>{geavanceerd ? "Geavanceerd zoeken verbergen" : "Geavanceerd zoeken"}</span>
        </button>

        {geavanceerd && (
          <div className="mt-4.5 grid grid-cols-[repeat(auto-fit,minmax(min(100%,180px),1fr))] gap-4 border-t border-black/10 pt-4.5">
            <label className="flex flex-col gap-2">
              <span className="text-xs font-semibold tracking-[0.14em] text-black/50 uppercase">Sector</span>
              <select
                value={sector}
                onChange={(e) => setSector(e.target.value)}
                className="rounded-full border border-black/15 bg-white px-4.5 py-3.5 text-base text-[#111] outline-none focus:border-accent"
              >
                {sectorFilterOpties.map((o) => (
                  <option key={o} value={o}>
                    {o}
                  </option>
                ))}
              </select>
            </label>
            <label className="flex flex-col gap-2">
              <span className="text-xs font-semibold tracking-[0.14em] text-black/50 uppercase">Aantal uren</span>
              <select
                value={uren}
                onChange={(e) => setUren(e.target.value)}
                className="rounded-full border border-black/15 bg-white px-4.5 py-3.5 text-base text-[#111] outline-none focus:border-accent"
              >
                {urenOpties.map((o) => (
                  <option key={o} value={o}>
                    {o}
                  </option>
                ))}
              </select>
            </label>
            <label className="flex flex-col gap-2">
              <span className="text-xs font-semibold tracking-[0.14em] text-black/50 uppercase">Beschikbaar</span>
              <select
                value={start}
                onChange={(e) => setStart(e.target.value)}
                className="rounded-full border border-black/15 bg-white px-4.5 py-3.5 text-base text-[#111] outline-none focus:border-accent"
              >
                {startFilterOpties.map((o) => (
                  <option key={o} value={o}>
                    {o}
                  </option>
                ))}
              </select>
            </label>
          </div>
        )}

        <div className="mt-5 flex flex-wrap items-center justify-end gap-4">
          <button
            type="button"
            onClick={wisFilters}
            className="rounded-full border border-black/20 px-5 py-2.5 text-[15px] font-semibold text-[#111] transition-colors hover:border-black"
          >
            Wis filters
          </button>
        </div>
      </div>

      <div className="mt-10">
        {gefilterd.length === 0 && (
          <div className="mb-4 flex flex-col gap-3 rounded-3xl border border-dashed border-black/20 p-10">
            <span className="font-display text-[26px] font-bold tracking-[-0.03em]">
              Niemand gevonden op deze combinatie.
            </span>
            <span className="max-w-[46ch] text-[17px] leading-snug text-black/62">
              Plaats je vacature en wij melden het zodra iemand zich aanmeldt die hierop aansluit.
            </span>
            <Link
              href="/motivatiebrief"
              className="mt-2 self-start rounded-full bg-accent px-6 py-3.5 font-semibold text-white transition-colors hover:bg-black"
            >
              Plaats gratis een vacature →
            </Link>
          </div>
        )}
        <div className="grid grid-cols-[repeat(auto-fit,minmax(340px,1fr))] items-start gap-4">
          {gefilterd.map((m) => (
            <PersonCard key={m.id} persoon={m} filterRegio={regio} />
          ))}
        </div>
      </div>
    </>
  );
}
