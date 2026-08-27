import type { Metadata } from "next";
import Link from "next/link";
import { handKleuren } from "@/lib/data";

export const metadata: Metadata = {
  title: "Kies je lievelingskleur — Finkje",
  description:
    "Elke persoon kiest zelf een lievelingskleur. Zo geef je een persoonlijk tintje mee aan je aanmelding.",
};

const punten = [
  {
    titel: "Het is indicatief",
    tekst:
      "Er is geen goed of fout. Het is puur een persoonlijke tint aan je profiel. Kies wat het beste bij jezelf past en denk er niet te lang over na.",
  },
  {
    titel: "Persoonlijke knipoog",
    tekst:
      "Zonder meteen naar de hoed én de rand te vragen, maak je je profiel op een eenvoudige manier persoonlijk, voor jouw toekomstige werkgever.",
  },
  {
    titel: "Het is een opening",
    tekst: "Handig als eerste vraag in een gesprek: waarom koos je deze kleur?",
  },
];

export default function LievelingskleurPage() {
  return (
    <>
      <section className="mx-auto max-w-[1100px] px-6 pt-18">
        <h1 className="m-0 max-w-[16ch] font-display text-[clamp(38px,7.5vw,104px)] leading-[0.9] font-extrabold tracking-[-0.05em]">
          Maak het persoonlijk.
        </h1>
        <p className="mt-7.5 max-w-[48ch] text-[clamp(17px,2vw,23px)] leading-snug text-black/64">
          We vragen iedere aanmelding om zijn of haar lievelingskleur te kiezen. Op deze manier geef je een persoonlijk
          tintje mee aan je toekomstige werkgever én vinden we het vragen om een kleur, gewoon best wel leuk.
        </p>
      </section>

      <section className="mx-auto max-w-[1100px] px-6 pt-14">
        <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,240px),1fr))] gap-7 rounded-[28px] bg-sand p-6.5 sm:p-11">
          {punten.map((p) => (
            <div key={p.titel} className="flex flex-col gap-2">
              <span className="font-display text-[21px] font-bold tracking-[-0.025em]">{p.titel}</span>
              <span className="text-[16.5px] leading-snug text-black/62">{p.tekst}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-[1100px] px-6 pt-18">
        <h2 className="m-0 mb-3 font-display text-[clamp(28px,4.4vw,58px)] leading-[0.96] font-extrabold tracking-[-0.045em]">
          Kies je lievelingskleur
        </h2>
        <p className="m-0 mb-9 max-w-[54ch] text-[17.5px] leading-snug text-black/62">
          Staat jouw lievelingskleur er niet bij? Kies dan degene die het meest dichtbij komt. Waarom we dit doen?
          Om je profiel persoonlijker te maken. En omdat het kan. Niemand vraagt naar je lievelingskleur, wij wel.
        </p>
        <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,220px),1fr))] gap-4">
          {handKleuren.map((c) => (
            <div
              key={c.naam}
              className="flex items-center gap-3.5 rounded-3xl border border-black/12 bg-white p-6.5"
            >
              <span className="h-10 w-10 shrink-0 rounded-full" style={{ background: c.hex }} />
              <span className="text-[16.5px] font-semibold">{c.naam}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-[1100px] px-6 pt-18 pb-28">
        <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,260px),1fr))] items-center gap-8 rounded-[32px] bg-black p-8 text-white sm:p-14">
          <div className="flex flex-col gap-3.5">
            <span className="text-xs font-semibold tracking-[0.16em] text-accent uppercase">Voor werkgevers</span>
            <h2 className="m-0 max-w-[18ch] font-display text-[clamp(28px,3.6vw,50px)] leading-[0.96] font-extrabold tracking-[-0.04em]">
              Zie ze staan bij onze mensen.
            </h2>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/mensen"
              className="rounded-full bg-accent px-7 py-4 text-[17px] font-semibold text-white transition-colors hover:bg-white hover:text-[#111]"
            >
              Bekijk onze mensen →
            </Link>
            <Link
              href="/aanmelden"
              className="rounded-full border border-white/30 px-7 py-4 text-[17px] font-semibold text-white transition-colors hover:bg-white hover:text-[#111]"
            >
              Kies je eigen kleur →
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
