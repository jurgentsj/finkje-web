import type { Metadata } from "next";
import Link from "next/link";
import { handKleuren } from "@/lib/data";
import FrustrationButton from "@/components/FrustrationButton";

export const metadata: Metadata = {
  title: "Kies je lievelingskleur — Finkje",
  description:
    "Elke persoon kiest zelf een lievelingskleur. Zo geef je een persoonlijk tintje mee aan je aanmelding.",
};

export default function LievelingskleurPage() {
  return (
    <>
      <section className="mx-auto max-w-[1100px] px-6 pt-18">
        <h1 className="m-0 max-w-[16ch] font-display text-[51px] leading-[0.9] font-extrabold tracking-[-0.05em]">
          Maak het persoonlijk.
        </h1>
        <p className="mt-7.5 max-w-[48ch] text-[clamp(17px,2vw,23px)] leading-snug text-black/64">
          Solliciteren moet weer leuk worden. Waar we kunnen proberen we daarom altijd net even anders te zijn. Het
          vragen naar je lievelingskleur past in dat rijtje. 
        </p>
      </section>

      <section className="mx-auto max-w-[1100px] px-6 pt-18">
        <h2 className="m-0 mb-3 font-display text-[clamp(28px,4.4vw,58px)] leading-[0.96] font-extrabold tracking-[-0.045em]">
          Kies je lievelingskleur
        </h2>
        <p className="m-0 mb-9 max-w-[54ch] text-[17.5px] leading-snug text-black/62">
          Staat jouw lievelingskleur er niet bij? Kies dan de kleur die
          <br className="hidden md:block" />
          het dichtst in de buurt komt. 
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

      <section className="mx-auto max-w-[1100px] px-6 pt-18">
        <h2 className="m-0 mb-8 max-w-[26ch] font-display text-[clamp(24px,3.4vw,40px)] leading-[1.05] font-extrabold tracking-[-0.035em]">
          Benieuwd wat we nog meer doen om solliciteren weer leuk te maken?
        </h2>
        <FrustrationButton
          heading="De frustratieteller."
          description="Onze frustratieteller staat op een aantal willekeurige plekken op de website. Klik er zo vaak op als je wil en bewijs met ons hoeveel mensen vastlopen in het huidige sollicitatiesysteem."
        />
      </section>

      <section className="mx-auto max-w-[1100px] px-6 pt-18 pb-28">
        <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,260px),1fr))] items-center gap-8 rounded-[32px] border border-black/10 bg-sand p-8 text-black sm:p-14">
          <div className="flex flex-col gap-3.5">
            <span className="text-xs font-semibold tracking-[0.16em] text-accent uppercase">Voor werkgevers</span>
            <h2 className="m-0 max-w-[18ch] font-display text-[clamp(28px,3.6vw,50px)] leading-[0.96] font-extrabold tracking-[-0.04em] text-black">
              Zie ze staan bij onze mensen.
            </h2>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/mensen"
              className="rounded-full bg-black px-7 py-4 text-[17px] font-semibold text-white transition-colors hover:bg-accent"
            >
              Bekijk onze mensen →
            </Link>
            <Link
              href="/aanmelden"
              className="rounded-full border border-black/20 px-7 py-4 text-[17px] font-semibold text-black transition-colors hover:bg-black hover:text-white"
            >
              Kies je eigen kleur →
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
