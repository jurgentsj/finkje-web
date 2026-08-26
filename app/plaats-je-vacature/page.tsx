import type { Metadata } from "next";
import Link from "next/link";
import VacatureForm from "@/components/VacatureForm";

export const metadata: Metadata = {
  title: "Plaats je vacature — Finkje",
  description: "Plaats gratis een vacature, bewust niet zichtbaar. Wij gaan binnen 24 uur gericht voor je op zoek.",
};

const tijdlijn = [
  {
    label: "Direct",
    titel: "Wij gaan zoeken",
    tekst:
      "We leggen jouw baan voor aan mensen die dit werk zelf hebben omschreven, nog voordat ze wisten dat jouw vacature bestond.",
  },
  {
    label: "Binnen 1 werkdag",
    titel: "Je hoort of we iemand hebben",
    tekst:
      "Is er een match, dan weet je het binnen één werkdag. Zo niet, dan houden we de vacature intern actief tot de sluitingsdatum.",
  },
  {
    label: "Tot de sluitingsdatum",
    titel: "De vacature blijft actief",
    tekst: "Meldt zich daarna iemand aan die zoekt wat jij biedt, dan laten we je dat direct weten.",
  },
  {
    label: "Bij een ja",
    titel: "Jij voert het gesprek",
    tekst: "Naam en contactgegevens komen vrij zodra iemand ja zegt. Daarna stapt Finkje eruit.",
  },
];

export default function PlaatsVacaturePage() {
  return (
    <>
      <section id="vacature-formulier" className="mx-auto max-w-[940px] px-6 pt-20 pb-28">
        <p className="m-0 mb-6 text-xs font-semibold tracking-[0.16em] text-accent uppercase">Voor werkgevers</p>
        <h1 className="m-0 font-display text-[clamp(36px,7vw,92px)] leading-[0.9] font-extrabold tracking-[-0.05em]">
          Plaats gratis je vacature
        </h1>
        <p className="mt-6 mb-10 max-w-[46ch] text-lg leading-snug text-black/62">
          Na het plaatsen van je vacature, kijken we in onze database of er een match is. Hebben we op dit moment
          niemand? Dan blijft je vacature open tot de door jou gekozen sluitingsdatum. Goed om te weten: we krijgen
          elke dag nieuwe aanmeldingen.
        </p>

        <VacatureForm />

        <div className="mt-14 grid grid-cols-[repeat(auto-fit,minmax(min(100%,280px),1fr))] items-start gap-10 border-t border-black/10 pt-11">
          {/*
            Sticky only from md up, where the grid is actually two columns.
            Below md the grid collapses to a single column, and a sticky
            left block there pins itself over the timeline as the page
            scrolls instead of just sitting above it in normal flow.
          */}
          <div className="flex flex-col gap-3.5 md:sticky md:top-26">
            <h2 className="m-0 max-w-[18ch] font-display text-[clamp(24px,3vw,34px)] leading-none font-extrabold tracking-[-0.04em]">
              Wat je kunt verwachten
            </h2>
            <p className="m-0 max-w-[34ch] text-[16.5px] leading-snug text-black/62">
              Liever niet wachten? Onze mensen staan al klaar, je kunt vandaag nog iemand uitnodigen.
            </p>
            <Link
              href="/mensen"
              className="self-start rounded-full bg-black px-6.5 py-3.5 text-base font-semibold text-white transition-colors hover:bg-accent"
            >
              Zoek zelf in de profielen →
            </Link>
          </div>
          <div className="flex flex-col">
            {tijdlijn.map((t, i) => (
              <div key={t.titel} className="relative pb-7.5 pl-10 last:pb-0">
                <span className="absolute top-1 left-0 h-3.5 w-3.5 rounded-full bg-accent shadow-[0_0_0_4px_rgba(255,90,0,0.14)]" />
                {i < tijdlijn.length - 1 && (
                  <span className="absolute top-4 bottom-0 left-1.5 w-px bg-black/15" />
                )}
                <div className="flex flex-col gap-1.5">
                  <span className="text-[11px] font-semibold tracking-[0.16em] text-black/42 uppercase">
                    {t.label}
                  </span>
                  <span className="font-display text-[21px] leading-tight font-bold tracking-[-0.03em]">
                    {t.titel}
                  </span>
                  <span className="max-w-[44ch] text-[16.5px] leading-snug text-black/62">{t.tekst}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
