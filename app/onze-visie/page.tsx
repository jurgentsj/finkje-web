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
