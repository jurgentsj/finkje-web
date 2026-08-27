import Image from "next/image";
import Link from "next/link";
import HeroForm from "@/components/HeroForm";
import Carousel from "@/components/Carousel";
import { stapData, voordelen } from "@/lib/data";

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <section className="relative mx-auto w-full max-w-[1360px] px-6 pt-[46px]">
        <div className="flex flex-wrap items-end gap-10">
          <div className="min-w-0 flex-[3_1_420px]">
            <h1 className="m-0 mt-7 font-display text-[clamp(48px,10vw,148px)] leading-[0.88] font-extrabold tracking-[-0.045em] text-[#111]">
              Haal je droombaan binnen met je motivatie
            </h1>
            <p className="mt-8 max-w-[46ch] text-[clamp(18px,2.1vw,24px)] leading-snug text-black/62">
              Want waar een wil is, is een weg.
            </p>
          </div>
          <figure className="relative m-0 min-w-0 flex-[1_1_280px] max-w-[420px]">
            <figcaption className="pointer-events-none absolute bottom-4 left-4 z-10 rounded-full bg-white px-4.5 py-2.5 text-[17px] font-semibold text-[#111]">
              &ldquo;Ik wil mijn passie achterna&rdquo;
            </figcaption>
            <div className="relative aspect-[2/3] w-full overflow-hidden rounded-[40px] bg-black/5">
              <Image
                src="/images/finkje-hero.webp"
                alt="Iemand kijkt recht in de camera"
                fill
                priority
                sizes="420px"
                className="object-cover"
              />
            </div>
          </figure>
        </div>

        <HeroForm />
      </section>

      {/* Marquee */}
      <div className="mt-22 overflow-hidden bg-accent py-4 text-white">
        <div className="flex w-max">
          {[0, 1].map((i) => (
            <span
              key={i}
              className="finkje-marquee font-display text-[clamp(20px,2.6vw,34px)] font-bold tracking-[-0.02em] whitespace-nowrap"
              style={{ paddingRight: 24 }}
            >
              {Array.from({ length: 6 })
                .map(() => "vind werk zonder vacatures ✦")
                .join(" ")}
              &nbsp;
            </span>
          ))}
        </div>
      </div>

      {/* Carousel */}
      <section className="mx-auto max-w-[1360px] px-6 pt-18 pb-6">
        <Carousel />
      </section>

      {/* 3 steps */}
      <section className="mx-auto max-w-[1360px] px-6 py-18">
        <h2 className="m-0 mb-14 max-w-[40ch] font-display text-[clamp(32px,5vw,70px)] leading-[0.96] font-extrabold tracking-[-0.04em]">
          In drie stappen naar jouw droombaan.
        </h2>
        <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,260px),1fr))] gap-4">
          {stapData.map((s, i) => {
            const styles = [
              { bg: "bg-accent", fg: "text-white", sub: "text-white/90" },
              { bg: "bg-black", fg: "text-white", sub: "text-white/65" },
              { bg: "bg-white border border-black/15", fg: "text-[#111]", sub: "text-black/65" },
            ][i];
            return (
              <div key={s.nr} className={`flex min-h-[320px] flex-col gap-6 rounded-[26px] p-8 ${styles.bg} ${styles.fg}`}>
                <span className="font-display text-[clamp(56px,7vw,100px)] leading-[0.8] font-extrabold tracking-[-0.06em]">
                  {s.nr}
                </span>
                <div className="mt-auto flex flex-col gap-3">
                  <h3 className="m-0 font-display text-[26px] leading-tight font-bold tracking-[-0.03em]">{s.titel}</h3>
                </div>
                <p className={`m-0 text-[17px] leading-snug ${styles.sub}`}>{s.tekst}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Waarom Finkje */}
      <section className="mx-auto max-w-[1360px] px-6 pb-24">
        <div className="flex flex-col gap-10 rounded-[32px] bg-sand p-8 sm:p-16">
          <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,340px),1fr))] items-center gap-10">
            <div className="flex flex-col gap-4.5">
              <p className="m-0 text-xs font-semibold tracking-[0.16em] text-accent uppercase">
                De voordelen van Finkje
              </p>
              <h2 className="m-0 max-w-[16ch] font-display text-[clamp(34px,5.2vw,76px)] leading-[0.92] font-extrabold tracking-[-0.05em]">
                Solliciteren zoals het moet zijn.
              </h2>
              <p className="m-0 max-w-[40ch] text-[clamp(17px,1.9vw,21px)] leading-snug text-black/68">
                Scannen, zoeken, kijken, schrijven. Solliciteren is een fulltime baan geworden. Gelukkig hebben wij
                daar de oplossing voor.
              </p>
            </div>
            <div className="relative aspect-[5/4] w-full overflow-hidden rounded-3xl bg-black/5">
              <Image
                src="/images/finkje-waarom.webp"
                alt="Iemand die net goed nieuws kreeg"
                fill
                sizes="500px"
                className="object-cover"
              />
            </div>
          </div>
          <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,260px),1fr))] gap-4">
            {voordelen.map((v) => (
              <div key={v.titel} className="flex flex-col gap-2 rounded-[20px] bg-white px-7 pt-7 pb-7.5">
                <span className="font-display text-[21px] leading-tight font-bold tracking-[-0.025em]">
                  {v.titel}
                </span>
                <span className="text-base leading-snug text-black/62">{v.tekst}</span>
              </div>
            ))}
          </div>
          <div className="flex flex-wrap items-center gap-3.5">
            <Link
              href="/aanmelden"
              className="rounded-full bg-accent px-8.5 py-4.5 text-lg font-bold text-white transition-colors hover:bg-black"
            >
              Meld je aan →
            </Link>
            <Link
              href="/hoe-het-werkt"
              className="rounded-full border border-black/15 px-5.5 py-4.5 text-[17px] font-semibold text-[#111] transition-colors hover:bg-black/5"
            >
              Hoe het werkt
            </Link>
          </div>
        </div>
      </section>

      {/* Quote */}
      <section className="bg-black text-white">
        <div className="mx-auto max-w-[1360px] px-6 py-26">
          <p className="m-0 mb-6 text-xs font-semibold tracking-[0.16em] text-accent uppercase">Wat wij geloven</p>
          <h2 className="m-0 max-w-[30ch] font-display text-[clamp(38px,6.6vw,104px)] leading-[0.9] font-extrabold tracking-[-0.05em]">
            Jouw droom is het beste cv dat je ooit gemaakt hebt.
          </h2>
          <Link
            href="/onze-visie"
            className="mt-11 inline-flex items-center gap-2.5 rounded-full bg-white px-7 py-4 text-[17px] font-semibold text-[#111] transition-colors hover:bg-accent hover:text-white"
          >
            Waarom we Finkje zijn begonnen <span className="text-xl">→</span>
          </Link>
        </div>
      </section>

      {/* Orange CTA */}
      <section className="mx-auto max-w-[1360px] px-6 py-24">
        <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,260px),1fr))] items-start gap-8 rounded-3xl bg-accent p-6 text-white sm:p-11">
          <h3 className="m-0 max-w-[16ch] font-display text-[clamp(26px,3.2vw,42px)] leading-[0.98] font-extrabold tracking-[-0.04em]">
            Niet plaatsen, aanpakken.
          </h3>
          <div className="flex flex-col gap-5.5">
            <p className="m-0 max-w-[34ch] text-lg leading-snug text-white/92">
              We plaatsen je vacature niet online maar gaan er daadwerkelijk mee aan de slag. We leggen de baan
              direct voor aan gemotiveerde mensen. Én bieden jou de mogelijkheid om zelf op zoek te gaan.
            </p>
            <Link
              href="/motivatiebrief"
              className="self-start rounded-2xl bg-black px-5 py-3 text-center text-[15px] font-semibold text-white transition-colors hover:bg-white hover:text-[#111] sm:rounded-full sm:px-6.5 sm:py-3.5 sm:text-base"
            >
              Gratis vacature plaatsen →
            </Link>
          </div>
        </div>
      </section>

      {/* Closing */}
      <section className="mx-auto flex max-w-[1360px] flex-col items-center gap-9 px-6 pb-30 text-center">
        <h2 className="m-0 font-display text-[clamp(40px,9vw,140px)] leading-[0.88] font-extrabold tracking-[-0.05em]">
          Wat voor baan wil <br className="sm:hidden" /><span className="text-accent">jíj</span>?
        </h2>
        <Link
          href="/aanmelden"
          className="rounded-full bg-accent px-11 py-5.5 text-[clamp(18px,2vw,23px)] font-bold text-white transition-colors hover:bg-black"
        >
          Aanmelden →
        </Link>
      </section>
    </>
  );
}
