"use client";

import { useEffect, useMemo, useState } from "react";
import { ArrowDown, ArrowUpRight, Search, X } from "lucide-react";
import { ComposableMap, Geographies, Geography, Marker } from "react-simple-maps";
import worldAtlas from "world-atlas/countries-50m.json";

const geoUrl = worldAtlas;

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

const suggestions = ["Onderwijs", "Zorg", "Technologie", "Maken en bouwen", "Communicatie"];
const clean = (value: string) => value.trim().toLowerCase();

export function WillersMap() {
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState<(typeof willers)[number] | null>(null);
  const [introActive, setIntroActive] = useState(true);
  const filtered = useMemo(() => {
    const needle = clean(query);
    if (!needle) return willers;
    return willers.filter((willer) => `${willer.city} ${willer.wants.join(" ")}`.toLowerCase().includes(needle));
  }, [query]);

  useEffect(() => {
    const timer = window.setTimeout(() => setIntroActive(false), 1600);
    return () => window.clearTimeout(timer);
  }, []);

  const search = (value: string) => {
    setQuery(value);
    window.requestAnimationFrame(() => document.getElementById("willers-map")?.scrollIntoView({ behavior: "smooth", block: "start" }));
  };

  return (
    <main className="min-h-screen bg-[#fffaf6] text-[#171412]">
      <section className="relative min-h-[720px] overflow-hidden bg-[#ff5a00] px-6 pb-24 pt-28 text-white sm:min-h-[780px] sm:px-12 sm:pt-40">
        <div className={`pointer-events-none absolute inset-0 transition-opacity duration-700 ${introActive ? "opacity-100" : "opacity-0"}`} aria-hidden="true">
          <div className="will-fly absolute left-1/2 top-1/2 text-white">
            <svg width="150" height="90" viewBox="-24 -18 48 30" className="overflow-visible">
              <path d="M -22 -2 L -12 0.5 L -12 7.5 Z M -14 -1 C -14 -6.6 -8.6 -10 -2 -10 C 2.4 -10 5.8 -8 8 -5.6 L 16.5 -4.4 L 9.4 0 C 8.4 4.4 3.8 7.6 -2 7.6 C -8.6 7.6 -14 4.4 -14 -1 Z M -9 -3.8 C -4.8 -10.8 2 -13.4 6.2 -12 C 3.4 -5.8 -2.2 -1.4 -7.4 -0.6 Z" fill="currentColor" />
            </svg>
          </div>
        </div>
        <div className="relative mx-auto flex min-h-[520px] max-w-7xl flex-col justify-between">
          <div className="max-w-5xl">
            <p className="mb-8 text-xs font-semibold uppercase tracking-[0.24em] text-white/70">Finkje voor werkgevers</p>
            <h1 className="max-w-4xl font-display text-[clamp(62px,10vw,148px)] leading-[0.82] tracking-[-0.075em]">Wat Nederland Wil</h1>
            <p className="mt-12 max-w-2xl text-xl leading-relaxed text-white/85 sm:text-2xl">Geen cv&apos;s. Geen ruis. Alleen mensen die weten welke kant ze op willen.</p>
          </div>
          <div className="flex flex-col gap-5">
            <label htmlFor="want-search" className="text-sm font-medium text-white/80">Zoek op wat iemand graag wil doen</label>
            <div className="flex max-w-3xl items-center gap-4 border-b-2 border-white/70 py-4 focus-within:border-white">
              <Search className="size-7 shrink-0" aria-hidden="true" />
              <input id="want-search" value={query} onChange={(event) => search(event.target.value)} placeholder="Bijvoorbeeld: werken met mensen" className="min-w-0 flex-1 bg-transparent text-2xl outline-none placeholder:text-white/45 sm:text-4xl" />
              {query && <button type="button" onClick={() => search("")} aria-label="Zoekopdracht wissen"><X className="size-6" /></button>}
            </div>
            <div className="flex flex-wrap gap-2 pt-1" aria-label="Populaire zoekopdrachten">
              {suggestions.map((suggestion) => <button key={suggestion} type="button" onClick={() => search(suggestion)} className="rounded-full border border-white/35 px-4 py-2 text-sm text-white/85 transition-colors hover:bg-white hover:text-[#ff5a00]">{suggestion}</button>)}
            </div>
          </div>
        </div>
        <ArrowDown className="absolute bottom-8 left-1/2 size-5 -translate-x-1/2 animate-bounce" aria-hidden="true" />
      </section>

      <section id="willers-map" className="mx-auto max-w-7xl scroll-mt-6 px-4 py-16 sm:px-10 sm:py-24">
        <div className="mb-12 flex flex-col justify-between gap-8 md:flex-row md:items-end">
          <div><p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#ff5a00]">{filtered.reduce((total, willer) => total + willer.count, 0)} willers · {filtered.length} regio&apos;s</p><h2 className="mt-4 max-w-2xl font-display text-5xl leading-[0.9] tracking-[-0.06em] sm:text-7xl">Kijk waar mensen willen werken.</h2></div>
          <p className="max-w-xs text-base leading-relaxed text-black/55">Beweeg over Nederland. Klik op een regio. Ontdek wat daar leeft.</p>
        </div>
        <div className="relative overflow-hidden border border-[#f2c8af] bg-[#fff0e5] shadow-[0_30px_100px_rgba(149,65,18,0.12)]">
          <div className="relative aspect-[1.1/1] min-h-[620px] bg-[#ffe2d0] sm:aspect-[1.45/1]">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,rgba(255,255,255,0.48),transparent_55%)]" aria-hidden="true" />
            <ComposableMap projection="geoMercator" projectionConfig={{ center: [5.4, 52.2], scale: 7300 }} className="absolute inset-0 h-full w-full">
              <Geographies geography={geoUrl}>
                {({ geographies }) => geographies.filter((geo) => geo.id === "528").map((geo) => <Geography key={geo.rsmKey} geography={geo} fill="#fffaf6" stroke="#eeb18d" strokeWidth={0.65} style={{ default: { outline: "none" }, hover: { fill: "#fffaf6", outline: "none" }, pressed: { outline: "none" } }} />)}
              </Geographies>
              {filtered.map((willer) => <Marker key={willer.id} coordinates={willer.coordinates} onClick={() => setSelected(willer)} className="cursor-pointer outline-none"><circle r={Math.max(11, Math.min(25, willer.count + 8))} fill="#ff5a00" fillOpacity="0.92" stroke="#fffaf6" strokeWidth="2.5" /><circle r={Math.max(17, Math.min(34, willer.count + 14))} fill="none" stroke="#ff5a00" strokeOpacity="0.16" strokeWidth="1" /><text textAnchor="middle" y="4" style={{ fontFamily: "Inter, sans-serif", fontSize: 9, fontWeight: 700, fill: "white", pointerEvents: "none" }}>{willer.count}</text></Marker>)}
            </ComposableMap>
            <div className="absolute bottom-5 left-5 border border-[#f2c8af] bg-[#fffaf6]/90 px-4 py-3 text-xs font-medium backdrop-blur">Klik op een bol om te ontdekken</div>
          </div>
          {selected && <aside className="absolute bottom-5 left-5 right-5 border border-[#f2c8af] bg-[#fffaf6] p-6 shadow-2xl sm:bottom-auto sm:left-auto sm:right-8 sm:top-8 sm:max-w-sm"><button onClick={() => setSelected(null)} aria-label="Sluiten" className="absolute right-5 top-5"><X className="size-5" /></button><p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#ff5a00]">{selected.city} · {selected.count} willers</p><h3 className="mt-3 font-display text-4xl tracking-[-0.05em]">Dit willen zij.</h3><ul className="mt-6 flex flex-col gap-2">{selected.wants.map((want) => <li key={want} className="flex items-center justify-between border-b border-[#eaded6] py-3 text-base">{want}<ArrowUpRight className="size-4 text-[#ff5a00]" /></li>)}</ul><button type="button" className="mt-6 flex items-center gap-2 text-sm font-semibold text-[#ff5a00]">Bekijk deze willers <ArrowUpRight className="size-4" /></button></aside>}
        </div>
      </section>
    </main>
  );
}
