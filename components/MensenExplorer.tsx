"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { mensenData } from "@/lib/data";
import PersonCard from "@/components/PersonCard";

const urenOpties = ["Alle uren", "Fulltime", "Parttime", "Flexibel"];
const startOpties = ["Maakt niet uit", "Per direct", "Binnen een maand", "Binnen drie maanden"];

export default function MensenExplorer() {
  const [zoek, setZoek] = useState("");
  const [regio, setRegio] = useState("Alle locaties");
  const [uren, setUren] = useState("Alle uren");
  const [start, setStart] = useState("Maakt niet uit");

  const regioOpties = useMemo(
    () => ["Alle locaties", ...Array.from(new Set(mensenData.map((m) => m.regio))).sort()],
    [],
  );

  const gefilterd = useMemo(() => {
    const q = zoek.trim().toLowerCase();
    return mensenData.filter((m) => {
      if (q && !(m.wil + " " + m.sector).toLowerCase().includes(q)) return false;
      if (regio !== "Alle locaties" && m.regio !== regio) return false;
      if (uren !== "Alle uren" && m.dienstverband !== uren) return false;
      if (start !== "Maakt niet uit" && m.start !== start) return false;
      return true;
    });
  }, [zoek, regio, uren, start]);

  const wisFilters = () => {
    setZoek("");
    setRegio("Alle locaties");
    setUren("Alle uren");
    setStart("Maakt niet uit");
  };

  const teller =
    gefilterd.length === 0
      ? "Geen resultaten"
      : gefilterd.length === 1
        ? "1 persoon gevonden"
        : `${gefilterd.length} mensen gevonden`;

  return (
    <>
      <div className="mt-10 rounded-3xl bg-sand p-6">
        <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,180px),1fr))] gap-4">
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
            <span className="text-xs font-semibold tracking-[0.14em] text-black/50 uppercase">Locatie</span>
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
              {startOpties.map((o) => (
                <option key={o} value={o}>
                  {o}
                </option>
              ))}
            </select>
          </label>
        </div>
        <div className="mt-5 flex flex-wrap items-center justify-between gap-4">
          <span className="text-[15px] text-black/60">{teller}</span>
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
              href="/plaats-je-vacature"
              className="mt-2 self-start rounded-full bg-accent px-6 py-3.5 font-semibold text-white transition-colors hover:bg-black"
            >
              Plaats gratis een vacature →
            </Link>
          </div>
        )}
        <div className="grid grid-cols-[repeat(auto-fit,minmax(340px,1fr))] items-start gap-4">
          {gefilterd.map((m) => (
            <PersonCard key={m.id} persoon={m} />
          ))}
        </div>
      </div>
    </>
  );
}
