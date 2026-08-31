import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Faq from "@/components/Faq";
import FrustrationButton from "@/components/FrustrationButton";
import { hoeHetWerktFaq } from "@/lib/data";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Hoe het werkt",
  description: "Wij werken andersom: geen vacatures waar jij op moet reageren, maar bedrijven die reageren op jou.",
};

const stappen = [
  {
    nr: "01",
    titel: "Meld je aan",
    tekst:
      "In een aantal korte stappen brengen we je motivatie en voorkeuren in kaart.",
  },
  {
    nr: "02",
    titel: "Een werkgever reageert",
    tekst: "Heeft een werkgever een vacature open met wat jij zoekt? We nemen contact met je op.",
  },
  {
    nr: "03",
    titel: "Jij beslist",
    tekst:
      "Als jij ja zegt zorgen we dat jullie in contact komen. Zeg je nee, dan blijft je aanmelding gewoon staan. Totdat jij tevreden bent.",
  },
];

export default function HoeHetWerktPage() {
  return (
    <>
      <section className="mx-auto max-w-[1360px] px-6 pt-18">
        <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,360px),1fr))] items-center gap-10 lg:gap-18">
          <div className="relative min-h-[420px] overflow-hidden rounded-[32px] sm:min-h-[560px]">
            <Image
              src="/images/process-hero-colleagues.png"
              alt="Een enthousiaste werkzoeker in de wereld van Finkje"
              fill
              priority
              className="object-cover"
              sizes="(min-width: 1024px) 50vw, 100vw"
            />
          </div>
          <div className="flex flex-col items-start gap-8">
            <h1 className="m-0 max-w-[13ch] font-display text-[clamp(52px,7vw,89px)] leading-[0.9] font-medium tracking-[-0.071em]">
              Ons proces in stappen.
            </h1>
            <p className="m-0 max-w-[40ch] text-[clamp(18px,2vw,21px)] leading-snug text-black/64">
              Finkje draait solliciteren om: je motivatie staat centraal. Enthousiaste werkgevers reageren op jou.
            </p>
            <Link
              href="/aanmelden"
              className="rounded-full bg-accent px-8 py-4.5 text-[18px] font-bold text-white transition-colors hover:bg-black"
            >
              Aanmelden →
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1360px] px-6 pt-22">
        <div className="flex flex-col">
          {stappen.map((s) => (
            <div key={s.nr} className="grid grid-cols-[64px_1fr] items-start gap-6 border-t border-black/10 py-7.5">
              <span className="font-display text-[clamp(40px,5vw,60px)] leading-[0.9] font-extrabold tracking-[-0.05em] text-accent">
                {s.nr}
              </span>
              <div className="flex flex-col gap-2">
                <span className="font-display text-[clamp(24px,3vw,34px)] leading-tight font-medium tracking-[-0.035em]">
                  {s.titel}
                </span>
                <span className="max-w-[48ch] text-[17.5px] leading-snug text-black/66">{s.tekst}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-[1360px] px-6 pt-24">
        <div className="flex flex-col gap-9 rounded-[32px] bg-sand p-8 sm:p-16">
          <div className="flex flex-col gap-4.5">
            <h2 className="m-0 max-w-[18ch] font-display text-[clamp(32px,5.4vw,49px)] leading-[0.94] font-medium tracking-[-0.045em]">
              Geen vacatures, waarom?
            </h2>
            <p className="m-0 max-w-[42ch] text-[clamp(17px,1.9vw,20px)] leading-snug text-black/68">
              Een vacature vraagt jou om je aan te passen. Wij draaien de boel om. Of de om boel.
            </p>
          </div>
          <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,300px),1fr))] gap-4">
            <div className="flex flex-col gap-5 rounded-3xl border border-black/10 bg-white px-8 py-8.5">
              <span className="text-xs font-semibold tracking-[0.16em] text-black/40 uppercase">Met een vacature</span>
              <div className="flex flex-col gap-3.5">
                {["Schrijf je naar de eisen toe", "Wacht je op antwoord", "Verzamel je afwijzingen"].map((t) => (
                  <span
                    key={t}
                    className="font-display text-[clamp(19px,2.1vw,24px)] leading-tight font-semibold tracking-[-0.03em] text-black/42"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
            <div className="flex flex-col gap-5 rounded-3xl border border-black bg-black px-8 py-8.5">
              <span className="text-xs font-semibold tracking-[0.16em] text-accent uppercase">Bij Finkje</span>
              <div className="flex flex-col gap-3.5">
                {["Zeg je wat je wil", "Komen bedrijven naar jou toe", "Verzamel je uitnodigingen"].map((t) => (
                  <span
                    key={t}
                    className="font-display text-[clamp(19px,2.1vw,24px)] leading-tight font-semibold tracking-[-0.03em] text-white"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="border-t border-black/15 pt-9">
            <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,320px),1fr))] items-center gap-10">
              <div className="flex flex-col gap-5">
                <h2 className="m-0 max-w-[16ch] font-display text-[clamp(30px,4.4vw,47px)] leading-[0.96] font-medium tracking-[-0.045em]">
                  Zo ziet jouw profiel eruit
                </h2>
                <p className="m-0 max-w-[38ch] text-[17.5px] leading-relaxed text-black/66">
                  Jouw motivatie in beeld voor onze werkgevers. Naam en contactgegevens delen we als jíj op gesprek
                  wil.
                </p>
                <Link
                  href="/mensen"
                  className="self-start rounded-full bg-black px-6.5 py-3.5 font-semibold text-white transition-colors hover:bg-accent"
                >
                  Bekijk alle mensen →
                </Link>
              </div>
              <div className="w-full max-w-[460px] overflow-hidden rounded-3xl border border-black/10 bg-white">
                <div className="flex items-baseline justify-between gap-4 px-7 pt-6 pb-5.5">
                  <span className="text-[13px] font-semibold text-accent">Rotterdam · per direct</span>
                </div>
                <div className="border-b border-black/10 px-7 pb-6.5">
                  <span className="block font-display text-[clamp(32px,3.6vw,41px)] leading-[0.94] font-medium tracking-[-0.04em]">
                    Junior developer
                  </span>
                </div>
                <div className="grid grid-cols-1 gap-x-5 gap-y-5 border-b border-black/10 px-7 py-6 sm:grid-cols-2">
                  {[
                    ["Dienstverband", "Fulltime"],
                    ["Reisafstand", "Tot 50 km"],
                    ["Werkomgeving", "Startup of MKB"],
                    ["Heeft ervoor over", "Verhuizen, omscholen"],
                  ].map(([label, waarde]) => (
                    <div key={label} className="flex flex-col gap-0.5">
                      <span className="text-[11px] font-semibold tracking-[0.14em] text-black/45 uppercase">
                        {label}
                      </span>
                      <span className="text-base font-semibold">{waarde}</span>
                    </div>
                  ))}
                </div>
                <div className="flex items-center justify-between gap-3 px-7 py-5.5">
                  <span className="text-sm text-black/50">Voorbeeld</span>
                  <span className="rounded-full bg-accent px-5 py-2.5 text-[15px] font-semibold text-white">
                    Reageer
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1360px] px-6 pt-26">
        <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,300px),1fr))] items-start gap-14">
          <div className="flex flex-col gap-4 lg:sticky lg:top-25">
            <h2 className="m-0 max-w-[12ch] font-display text-[clamp(30px,4.4vw,60px)] leading-[0.94] font-extrabold tracking-[-0.05em]">
              Vragen over het proces
            </h2>
            <p className="m-0 max-w-[32ch] text-[17px] leading-relaxed text-black/60">
              Staat je vraag er niet bij?{" "}
              <Link href="/contact" className="font-semibold text-accent">
                Stel hem gerust.
              </Link>
            </p>
          </div>
          <Faq items={hoeHetWerktFaq} />
        </div>
      </section>

      <section className="mx-auto max-w-[1360px] px-6 pt-26">
        <FrustrationButton />
      </section>

      <section className="mx-auto flex max-w-[1360px] flex-col items-center gap-9 px-6 pt-24 pb-30 text-center">
        <h2 className="m-0 font-display text-[clamp(40px,9vw,65px)] leading-[0.88] font-extrabold tracking-[-0.05em]">
          Wat voor baan wil <br className="sm:hidden" /><span className="text-accent">jíj</span>?
        </h2>
        <Link
          href="/aanmelden"
          className="rounded-full bg-accent px-11 py-5.5 text-[clamp(18px,2vw,23px)] font-bold text-white transition-colors hover:bg-black"
        >
          Deze →
        </Link>
      </section>
    </>
  );
}
