import type { Metadata } from "next";
import Link from "next/link";
import { VisionStory } from "@/components/VisionStory";

export const metadata: Metadata = {
  title: "Onze visie",
  description: "De visie achter Finkje: werk begint bij willen.",
};

export default function OnzeVisiePage() {
  return (
    <>
      <section className="mx-auto max-w-[1100px] px-6 pt-20 pb-0">
        <h1 className="m-0 max-w-[12ch] font-display text-[clamp(52px,7vw,89px)] leading-[0.9] font-medium tracking-[-0.071em]">
          De visie achter Finkje.
        </h1>
        <p className="mt-8 max-w-[42ch] text-[clamp(18px,2vw,21px)] leading-snug text-black/64">
          Door te kijken naar de wil en wat iemand motiveert, bouwen we aan een arbeidsmarkt die eerlijker,
          inclusiever en persoonlijker is.
        </p>
      </section>

      <VisionStory />

      <section className="bg-black px-6 py-24 text-white sm:py-32">
        <div className="mx-auto max-w-[1100px]">
          <p className="m-0 max-w-[18ch] font-display text-[clamp(36px,5vw,68px)] leading-[0.94] font-medium tracking-[-0.05em]">
            Jouw droom is het beste cv dat je ooit gemaakt hebt.
          </p>
          <Link href="/aanmelden" className="mt-12 inline-flex rounded-full bg-accent px-7 py-4 text-[17px] font-semibold text-white transition-colors hover:bg-white hover:text-black">
            Zeg wat jij wil →
          </Link>
        </div>
      </section>
    </>
  );
}
