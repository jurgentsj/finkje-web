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
      <section className="mx-auto max-w-[940px] px-6 pt-18">
        <div className="flex flex-col gap-5 rounded-3xl bg-sand p-8 sm:p-11">
          <p className="m-0 text-[17.5px] leading-relaxed text-black/78">
            We laten jouw vacature niet zien, en dat is bewust. Zodra iemand een functietitel en een lijst eisen
            leest, gaat hij zich daarnaartoe schrijven. Je krijgt dan het antwoord dat jij wilde horen en weet nog
            niets over wat die persoon zelf wil. Daarom beginnen we andersom: eerst wat iemand wil worden en
            waarom, zonder vacature in zicht. Wat er dan uit komt, is niet aangepast aan jou.
          </p>
          <p className="m-0 text-[17.5px] leading-relaxed text-black/78">
            Een werkzoekende schrijft zijn vacature dus zelf. Past jouw baan daarop, dan spreek je iemand die er al
            ja tegen had gezegd voordat hij bestond. Mensen die doen wat ze echt willen zijn gelukkiger en dat is
            precies waar het beste personeel uit komt.
          </p>
          <p className="m-0 text-[17.5px] leading-relaxed text-black/78">Vragen over je vacature? App of mail ons.</p>
          <div className="flex flex-col gap-0.5 pt-1">
            <span className="font-display text-[19px] font-bold tracking-[-0.03em]">Rembt &amp; Jurgen</span>
            <span className="text-[15px] text-black/50">Oprichters van Finkje</span>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[940px] px-6 pt-20 pb-28">
        <p className="m-0 mb-6 text-xs font-semibold tracking-[0.16em] text-accent uppercase">Voor werkgevers</p>
        <h1 className="m-0 font-display text-[clamp(36px,7vw,92px)] leading-[0.9] font-extrabold tracking-[-0.05em]">
          Plaats gratis vacature, bewust niet zichtbaar
        </h1>
        <p className="mt-6 mb-10 max-w-[46ch] text-lg leading-snug text-black/62">
          Je vacature verdwijnt niet in een lijst tussen duizend anderen. We gaan binnen 24 uur gericht voor je op
          zoek tussen onze mensen. Hebben we op dit moment niemand? We houden je vacature open tot de
          sluitingsdatum.
        </p>

        <VacatureForm />

        <div className="mt-14 grid grid-cols-[repeat(auto-fit,minmax(min(100%,280px),1fr))] items-start gap-10 border-t border-black/10 pt-11">
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
