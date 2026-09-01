"use client";

import { useMemo, useState } from "react";
import { Search, X } from "lucide-react";
import { useEffect } from "react";
import { ComposableMap, Geographies, Geography, Marker } from "react-simple-maps";

const geoUrl = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

const willers = [
  { id: 1, city: "Amsterdam", coordinates: [4.9, 52.37] as [number, number], count: 12, wants: ["Mensen helpen", "Onderwijs", "Communicatie"] },
  { id: 2, city: "Rotterdam", coordinates: [4.48, 51.92] as [number, number], count: 9, wants: ["Logistiek", "Maken en bouwen", "Zorg"] },
  { id: 3, city: "Utrecht", coordinates: [5.12, 52.09] as [number, number], count: 15, wants: ["Technologie", "Onderzoek", "Duurzaamheid"] },
  { id: 4, city: "Den Haag", coordinates: [4.3, 52.08] as [number, number], count: 7, wants: ["Rechtvaardigheid", "Communicatie", "Beleid"] },
  { id: 5, city: "Eindhoven", coordinates: [5.48, 51.44] as [number, number], count: 11, wants: ["Techniek", "Creativiteit", "Productontwikkeling"] },
  { id: 6, city: "Groningen", coordinates: [6.57, 53.22] as [number, number], count: 6, wants: ["Onderwijs", "Onderzoek", "Zorg"] },
  { id: 7, city: "Maastricht", coordinates: [5.69, 50.85] as [number, number], count: 5, wants: ["Cultuur", "Mensen helpen", "Horeca"] },
  { id: 8, city: "Arnhem", coordinates: [5.9, 51.98] as [number, number], count: 8, wants: ["Natuur", "Ontwerpen", "Maken en bouwen"] },
];

export function WillersMap() {
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState<(typeof willers)[number] | null>(null);
  const [introActive, setIntroActive] = useState(true);
  const [mapHasFocus, setMapHasFocus] = useState(false);
  const filtered = useMemo(() => willers.filter((w) => w.wants.some((want) => want.toLowerCase().includes(query.toLowerCase()))), [query]);
  const handleQueryChange = (value: string) => {
    setQuery(value);
    if (value.trim()) {
      setMapHasFocus(true);
      window.setTimeout(() => document.getElementById("willers-map")?.scrollIntoView({ behavior: "smooth", block: "start" }), 80);
    }
  };
  useEffect(() => {
    const timer = window.setTimeout(() => {
      setIntroActive(false);
      document.getElementById("willers-map")?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 1900);
    return () => window.clearTimeout(timer);
  }, []);

  return (
    <main className="min-h-screen bg-[#fff7f1] text-[#161616]">
      <section className="relative overflow-hidden bg-[#ff5a00] px-6 pb-20 pt-28 text-white sm:px-12 sm:pb-28 sm:pt-40">
        <div className={`pointer-events-none absolute left-1/2 top-0 h-full w-40 -translate-x-1/2 opacity-0 transition-opacity duration-700 ${introActive ? "opacity-100" : ""}`} aria-hidden="true">
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 animate-[will-fly_1.7s_ease-in-out_forwards] text-white">
            <svg width="120" height="74" viewBox="-24 -18 48 30" className="overflow-visible">
              <path d="M -22 -2 L -12 0.5 L -12 7.5 Z M -14 -1 C -14 -6.6 -8.6 -10 -2 -10 C 2.4 -10 5.8 -8 8 -5.6 L 16.5 -4.4 L 9.4 0 C 8.4 4.4 3.8 7.6 -2 7.6 C -8.6 7.6 -14 4.4 -14 -1 Z M -9 -3.8 C -4.8 -10.8 2 -13.4 6.2 -12 C 3.4 -5.8 -2.2 -1.4 -7.4 -0.6 Z" fill="currentColor" />
            </svg>
          </div>
        </div>
        <div className="mx-auto max-w-6xl">
          <p className="mb-6 text-sm font-medium uppercase tracking-[0.2em] text-white/70">De kaart van willers</p>
          <h1 className="max-w-4xl font-display text-[clamp(58px,10vw,144px)] leading-[0.86] tracking-[-0.07em]">Wat Nederland Wil</h1>
          <p className="mt-10 max-w-xl text-xl leading-relaxed text-white/85 sm:text-2xl">Duizenden mensen weten wat ze willen. Bekijk waar ze zitten en waar hun hart sneller van gaat kloppen.</p>
          <div className="mt-10 flex max-w-xl items-center gap-3 rounded-full bg-white px-5 py-4 text-[#161616] shadow-xl shadow-black/10">
            <Search className="size-5 text-[#ff5a00]" aria-hidden="true" />
            <label htmlFor="want-search" className="sr-only">Zoek op wat iemand wil doen</label>
            <input id="want-search" value={query} onChange={(e) => handleQueryChange(e.target.value)} onFocus={() => setMapHasFocus(true)} placeholder="Wat wil iemand graag doen?" className="min-w-0 flex-1 bg-transparent text-base outline-none placeholder:text-[#161616]/45" />
            {query && <button type="button" onClick={() => setQuery("")} aria-label="Zoekopdracht wissen"><X className="size-5" /></button>}
          </div>
        </div>
      </section>

      <section id="willers-map" className={`mx-auto max-w-7xl scroll-mt-8 px-4 py-10 transition-transform duration-700 sm:px-10 sm:py-16 ${mapHasFocus ? "scale-[1.01]" : ""}`}>
        <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
          <div><p className="text-sm uppercase tracking-[0.18em] text-[#ff5a00]">Live overzicht</p><h2 className="mt-2 font-display text-4xl tracking-[-0.05em] sm:text-6xl">Waar zitten de willers?</h2></div>
          <p className="max-w-xs text-sm leading-relaxed text-black/55">Klik op een bol om te zien wat mensen in die omgeving graag willen doen.</p>
        </div>
        <div className="relative overflow-hidden rounded-[2rem] bg-[#ffe2d0] p-2 shadow-[0_24px_80px_rgba(255,90,0,0.12)] sm:p-6">
          <div className="relative aspect-[1.15/1] min-h-[520px] overflow-hidden rounded-[1.5rem] bg-[#ffd1b8]">
            <ComposableMap projection="geoMercator" projectionConfig={{ center: [5.4, 52.2], scale: 6500 }} className="absolute inset-0 h-full w-full">
              <Geographies geography={geoUrl}>
                {({ geographies }) => geographies.map((geo) => <Geography key={geo.rsmKey} geography={geo} fill="#fff7f1" stroke="#ffb38b" strokeWidth={0.7} />)}
              </Geographies>
              {filtered.map((willer) => <Marker key={willer.id} coordinates={willer.coordinates} onClick={() => setSelected(willer)} className="cursor-pointer outline-none"><circle r={Math.max(8, Math.min(22, willer.count + 5))} fill="#ff5a00" fillOpacity="0.9" stroke="#fff7f1" strokeWidth="3" /><text textAnchor="middle" y="4" style={{ fontFamily: "Inter", fontSize: 9, fontWeight: 700, fill: "white", pointerEvents: "none" }}>{willer.count}</text></Marker>)}
            </ComposableMap>
            <div className="pointer-events-none absolute bottom-5 left-5 rounded-full bg-white/80 px-4 py-2 text-xs font-medium backdrop-blur">{filtered.length} plekken met willers</div>
          </div>
          {selected && <aside className="absolute bottom-6 left-6 right-6 max-w-sm rounded-3xl bg-white p-6 shadow-2xl sm:left-auto sm:right-10 sm:top-10 sm:bottom-auto"><button onClick={() => setSelected(null)} aria-label="Sluiten" className="absolute right-5 top-5"><X className="size-5" /></button><p className="text-sm uppercase tracking-[0.16em] text-[#ff5a00]">{selected.city}</p><h3 className="mt-2 font-display text-4xl tracking-[-0.05em]">Wat zij willen</h3><ul className="mt-5 flex flex-col gap-3">{selected.wants.map((want) => <li key={want} className="rounded-full bg-[#fff0e7] px-4 py-3 text-sm">{want}</li>)}</ul><p className="mt-5 text-sm text-black/50">{selected.count} willers in deze omgeving</p></aside>}
        </div>
      </section>
    </main>
  );
}
