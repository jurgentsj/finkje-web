import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Faq from "@/components/Faq";
import { redenen, werkgeverFaq, werkgeverStappen } from "@/lib/data";

export const metadata: Metadata = {
  title: "Voor werkgevers",
  description: "Ontdek mensen die weten wat ze willen. Plaats gratis een vacature, niet online, wel bij de juiste mensen.",
};

const strip = [
  { src: "/images/finkje-wg-1.webp", alt: "Nieuwe collega wordt ingewerkt achter een bureau" },
  { src: "/images/finkje-wg-2.webp", alt: "Kort overleg met twee mensen bij een whiteboard" },
  { src: "/images/finkje-wg-3.webp", alt: "Handdruk op de eerste werkdag" },
];

export default function VoorWerkgeversPage() {
  return (
    <>
      <section className="mx-auto max-w-[1360px] px-4 pt-10 sm:px-6 sm:pt-16">
        <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,300px),1fr))] items-start gap-12 lg:items-center">
          <div>
            <div className="inline-flex rounded-full border border-accent px-4 py-2 text-xs font-semibold tracking-[0.16em] text-accent uppercase">
              Voor werkgevers
            </div>
            <h1 className="m-0 mt-7 max-w-[16ch] font-display text-[clamp(38px,11vw,68px)] leading-[0.92] font-medium tracking-[-0.05em]">
              Ontdek gemotiveerde mensen die weten wat ze willen.
            </h1>
            <p className="mt-7 max-w-[42ch] text-[18px] leading-snug text-black/62 sm:text-[20px]">
              Onze mensen beginnen bij zichzelf en worden niet extern geprikkeld door de voorwaarden op jouw vacature. Zo
              beloven we enorm gedreven mensen, die intrinsiek gemotiveerd zijn.
            </p>
            <div className="mt-9 flex flex-col items-start gap-3 sm:flex-row sm:flex-wrap">
              <Link
                href="/motivatiebrief"
                className="rounded-full bg-accent px-7 py-4 text-[18px] font-semibold text-white transition-colors hover:bg-black"
              >
                Plaats je eerste vacature →
              </Link>
              <Link
                href="/werkgever/registreren"
                className="rounded-full border border-black/20 px-7 py-4 text-[18px] font-semibold text-[#111] transition-colors hover:border-black hover:bg-black/5"
              >
                Bekijk de profielen
              </Link>
            </div>
            <p className="mt-5 text-[15px] text-black/50">
              Finkje is nu nog kosteloos: geen plaatsingskosten, geen abonnement of fee.
            </p>
          </div>
          <div className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl bg-black/5">
            <Image
              src="/images/finkje-wg-hero.webp"
              alt="Werkgever en nieuwe medewerker in gesprek op de werkvloer"
              fill
              sizes="600px"
              className="object-cover"
              priority
            />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1360px] px-4 pt-14 sm:px-6 sm:pt-20">
        <div className="flex flex-col gap-8 border-b border-black/15 pb-7">
          <h2 className="m-0 font-display text-[34px] leading-[0.96] font-medium tracking-[-0.045em] sm:text-[52px]">
            Zo werkt het
          </h2>
        </div>
        <div className="flex flex-col">
          {werkgeverStappen.map((s) => (
            <div
              key={s.nr}
              className="grid grid-cols-[40px_minmax(0,1fr)] items-start gap-x-4 gap-y-2 border-b border-black/10 py-6.5 sm:grid-cols-[64px_minmax(180px,300px)_1fr] sm:items-baseline sm:gap-6"
            >
              <span className="font-display text-xl font-bold text-accent">{s.nr}</span>
              <h3 className="col-span-1 m-0 font-display text-[clamp(20px,2.2vw,30px)] leading-tight font-normal tracking-[-0.03em]">
                {s.titel}
              </h3>
              <p className="col-span-2 m-0 w-full max-w-none text-[16.5px] leading-snug text-black/65 sm:col-auto sm:max-w-[56ch] sm:text-[18px]">{s.tekst}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-[1360px] px-4 pt-14 sm:px-6 sm:pt-20">
        <div className="grid grid-cols-[repeat(auto-fit,minmax(220px,1fr))] gap-4">
          {strip.map((s) => (
            <div key={s.src} className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl bg-black/5">
              <Image src={s.src} alt={s.alt} fill sizes="320px" className="object-cover" />
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-[1360px] px-4 pt-16 sm:px-6 sm:pt-24">
        <div className="flex flex-col gap-8 border-b border-black/15 pb-7 sm:flex-row sm:items-end sm:justify-between">
          <h2 className="m-0 max-w-[20ch] font-display text-[34px] leading-[0.96] font-medium tracking-[-0.045em] sm:text-[45px]">
            Motivatie is uniek, een cv niet
          </h2>
        </div>
        <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,290px),1fr))] gap-x-14">
          {redenen.map((r) => (
            <div key={r.titel} className="flex flex-col gap-2.5 border-b border-black/10 py-7.5">
              <span className="text-[11px] font-semibold tracking-[0.16em] text-accent uppercase">{r.label}</span>
              <h3 className="m-0 font-display text-[clamp(19px,2vw,24px)] leading-tight font-normal tracking-[-0.03em]">
                {r.titel}
              </h3>
              <p className="m-0 max-w-[40ch] text-[16.5px] leading-snug text-black/62">{r.tekst}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-[1360px] px-6 pt-22">
        <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,260px),1fr))] items-start gap-8 rounded-3xl bg-accent p-11 text-white">
          <h3 className="m-0 font-display text-[clamp(26px,3.2vw,42px)] leading-[0.98] font-normal tracking-[-0.04em]">
            Niet online, wel bij de juiste mensen.
          </h3>
          <div className="flex flex-col gap-5.5">
            <p className="m-0 max-w-[36ch] text-lg leading-snug text-white/92">
              Je vacature komt nergens openbaar. Wij leggen hem intern voor aan iedereen die past, en houden hem
              actief tot je sluitingsdatum.
            </p>
            <Link
              href="/motivatiebrief"
              className="self-start rounded-full bg-black px-6.5 py-3.5 font-semibold text-white transition-colors hover:bg-white hover:text-[#111]"
            >
              Gratis vacature plaatsen →
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1360px] px-6 pt-22">
        <h2 className="m-0 mb-8 font-display text-[clamp(28px,4vw,52px)] leading-[0.96] font-medium tracking-[-0.045em]">
          Wat werkgevers vragen
        </h2>
        <Faq items={werkgeverFaq} />
      </section>

      <section className="mx-auto max-w-[1360px] px-6 pt-18 pb-28">
        <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,260px),1fr))] items-center gap-8 rounded-[32px] bg-black p-8 text-white sm:p-14">
          <h2 className="m-0 max-w-[22ch] font-display text-[clamp(28px,3.6vw,50px)] leading-[0.96] font-extrabold tracking-[-0.04em]">
            Jij hebt de baan, wij weten wie &apos;m wil.
          </h2>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/motivatiebrief"
              className="rounded-full bg-accent px-7 py-4 text-[17px] font-semibold text-white transition-colors hover:bg-white hover:text-[#111]"
            >
              Plaats gratis een vacature →
            </Link>
            <Link
              href="/contact"
              className="rounded-full border border-white/30 px-7 py-4 text-[17px] font-semibold text-white transition-colors hover:border-white hover:bg-white/10"
            >
              Even bellen?
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
