import type { Metadata } from "next";
import Link from "next/link";
import { blogs } from "@/lib/blogs";

export const metadata: Metadata = {
  title: "Blog — Finkje",
  description: "Over kansen zonder diploma, starten zonder ervaring en waarom motivatie het beste selectiecriterium is.",
};

export default function BlogIndexPage() {
  return (
    <>
      <section className="mx-auto max-w-[1100px] px-6 pt-20">
        <p className="m-0 mb-5.5 text-xs font-semibold tracking-[0.16em] text-accent uppercase">Blog</p>
        <h1 className="m-0 font-display text-[clamp(42px,8vw,112px)] leading-[0.9] font-extrabold tracking-[-0.05em]">
          Lezen over werk zonder cv.
        </h1>
        <p className="mt-7.5 max-w-[44ch] text-[clamp(18px,2.1vw,24px)] leading-snug text-black/64">
          Over kansen zonder diploma, starten zonder ervaring en waarom motivatie het beste selectiecriterium is.
        </p>
      </section>

      <section className="mx-auto max-w-[1100px] px-6 pt-14">
        <div className="flex flex-col">
          {blogs.map((b) => (
            <Link
              key={b.slug}
              href={`/${b.slug}`}
              className="flex flex-col gap-2 border-t border-black/10 py-6.5 text-[#111] transition-opacity hover:opacity-60"
            >
              <span className="text-[11px] font-semibold tracking-[0.16em] text-accent uppercase">{b.tag}</span>
              <span className="font-display text-[clamp(22px,2.6vw,32px)] leading-tight font-bold tracking-[-0.035em]">
                {b.titel}
              </span>
              <span className="max-w-[60ch] text-[16.5px] leading-snug text-black/62">{b.lead}</span>
            </Link>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-[1100px] px-6 pt-22 pb-28">
        <div className="flex flex-col gap-5.5 rounded-3xl bg-accent p-8 text-white sm:p-14">
          <h2 className="m-0 max-w-[20ch] font-display text-[clamp(28px,4vw,52px)] leading-[0.96] font-extrabold tracking-[-0.045em]">
            Zeg wat je wil worden. Wij regelen de rest.
          </h2>
          <Link
            href="/aanmelden"
            className="self-start rounded-full bg-black px-7.5 py-4.5 text-[17px] font-semibold text-white transition-colors hover:bg-white hover:text-[#111]"
          >
            Meld je gratis aan →
          </Link>
        </div>
      </section>
    </>
  );
}
