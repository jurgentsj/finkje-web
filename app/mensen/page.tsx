import type { Metadata } from "next";
import Link from "next/link";
import MensenExplorer from "@/components/MensenExplorer";

export const metadata: Metadata = {
  title: "Onze mensen",
  description: "Onze helden. Erop gebrand om te doen wat ze leuk vinden.",
};

export default function MensenPage() {
  return (
    <>
      <section className="mx-auto max-w-[1360px] px-6 pt-18 pb-10">
        <p className="m-0 mb-6 text-xs font-semibold tracking-[0.16em] text-accent uppercase">Mensen</p>
        <h1 className="m-0 max-w-[20ch] font-display text-[clamp(38px,7vw,104px)] leading-[0.9] font-extrabold tracking-[-0.05em]">
          Onze mensen
        </h1>
        <p className="mt-7 max-w-[46ch] text-[clamp(17px,1.9vw,22px)] leading-snug text-black/64">
          Onze helden. Erop gebrand om te doen wat ze leuk vinden.
        </p>

        <MensenExplorer />
      </section>

      <section className="mx-auto max-w-[1360px] px-6 pt-10 pb-28">
        <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,260px),1fr))] items-center gap-8 rounded-[32px] bg-black p-8 text-white sm:p-14">
          <h2 className="m-0 font-display text-[clamp(28px,3.6vw,48px)] leading-[0.96] font-extrabold tracking-[-0.04em]">
            Wil je hier ook staan?
          </h2>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/aanmelden"
              className="rounded-full bg-accent px-7 py-4 text-[17px] font-semibold text-white transition-colors hover:bg-white hover:text-[#111]"
            >
              Zeg wat je wil →
            </Link>
            <Link
              href="/voor-werkgevers"
              className="rounded-full border border-white/30 px-7 py-4 text-[17px] font-semibold text-white transition-colors hover:border-white hover:bg-white/10"
            >
              Ik zoek mensen
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
