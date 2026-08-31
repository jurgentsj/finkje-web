import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { blogImage, blogs } from "@/lib/blogs";

export const metadata: Metadata = {
  title: "Blog",
  description: "Wij schrijven wel eens over motivatie. Check het hieronder.",
};

export default function BlogIndexPage() {
  const [hero, ...rest] = blogs;
  const [a, b, ...more] = rest;
  const [dark, ...grid] = more;

  return (
    <>
      <section className="mx-auto max-w-[1240px] px-6 pt-20">
        <p className="m-0 mb-5.5 text-xs font-semibold tracking-[0.16em] text-accent uppercase">Blog</p>
        <h1 className="m-0 font-display text-[clamp(52px,7vw,89px)] leading-[0.9] font-medium tracking-[-0.071em]">
          Stof tot nadenken. 0 jaar leeservaring vereist.
        </h1>
        <p className="mt-7 max-w-[40ch] text-[clamp(18px,2vw,21px)] leading-snug text-black/64">
          Wij schrijven wel eens over motivatie. Check het hieronder.
        </p>
      </section>

      <section className="mx-auto flex max-w-[1240px] flex-col gap-4 px-6 pt-14">
        <Link
          href={`/${hero.slug}`}
          className="group relative isolate block min-h-[360px] overflow-hidden rounded-[28px] text-white sm:min-h-[560px]"
        >
          <Image
            src={blogImage(hero.slug)}
            alt={hero.titel}
            fill
            sizes="1240px"
            className="object-cover transition-opacity group-hover:opacity-90"
          />
          <div className="absolute inset-0 z-[1] bg-gradient-to-b from-black/5 via-black/5 to-black/82" />
          <div className="relative z-[2] flex min-h-[360px] flex-col justify-end gap-3.5 p-6 sm:min-h-[560px] sm:p-12">
            <span className="self-start rounded-full bg-white/16 px-3.5 py-1.5 text-[11px] font-bold tracking-[0.14em] text-white uppercase backdrop-blur">
              {hero.tag}
            </span>
            <h2 className="m-0 max-w-[17ch] font-display text-[clamp(30px,5.2vw,68px)] leading-[0.94] font-extrabold tracking-[-0.05em] text-balance">
              {hero.titel}
            </h2>
            <p className="m-0 max-w-[52ch] text-[clamp(16px,1.7vw,20px)] leading-snug text-white/82">{hero.lead}</p>
          </div>
        </Link>

        <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,300px),1fr))] gap-4">
          {[a, b].map((p) => (
            <Link
              key={p.slug}
              href={`/${p.slug}`}
              className="flex flex-col gap-4 rounded-3xl bg-sand p-4 text-[#111] transition-colors hover:bg-[#EFEDE7]"
            >
              <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl bg-black/5">
                <Image src={blogImage(p.slug)} alt={p.titel} fill sizes="600px" className="object-cover" />
              </div>
              <div className="flex flex-col gap-2.5 px-2 pb-3">
                <span className="text-[11px] font-bold tracking-[0.14em] text-accent uppercase">{p.tag}</span>
                <span className="font-display text-[clamp(23px,2.6vw,34px)] leading-[1.05] font-bold tracking-[-0.04em] text-balance">
                  {p.titel}
                </span>
                <span className="text-base leading-snug text-black/60">{p.lead}</span>
              </div>
            </Link>
          ))}
        </div>

        <Link
          href={`/${dark.slug}`}
          className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,320px),1fr))] items-center gap-6 rounded-[28px] bg-black p-4 text-white transition-colors hover:bg-[#1c1c1c] sm:gap-11"
        >
          <div className="relative aspect-[5/4] w-full overflow-hidden rounded-2xl bg-white/5">
            <Image src={blogImage(dark.slug)} alt={dark.titel} fill sizes="600px" className="object-cover" />
          </div>
          <div className="flex flex-col gap-3.5 py-1 pr-1 pb-5 sm:py-3 sm:pr-7">
            <span className="self-start rounded-full bg-accent px-3.5 py-1.5 text-[11px] font-bold tracking-[0.14em] text-white uppercase">
              {dark.tag}
            </span>
            <h2 className="m-0 font-display text-[clamp(26px,3.4vw,46px)] leading-none font-extrabold tracking-[-0.045em] text-balance">
              {dark.titel}
            </h2>
            <p className="m-0 max-w-[46ch] text-[17px] leading-relaxed text-white/68">{dark.lead}</p>
          </div>
        </Link>

        <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,240px),1fr))] gap-4">
          {grid.map((p) => (
            <Link key={p.slug} href={`/${p.slug}`} className="flex flex-col gap-3.5 text-[#111] transition-opacity hover:opacity-70">
              <div className="relative aspect-square w-full overflow-hidden rounded-[18px] bg-black/5">
                <Image src={blogImage(p.slug)} alt={p.titel} fill sizes="320px" className="object-cover" />
              </div>
              <div className="flex flex-col gap-2">
                <span className="text-[11px] font-bold tracking-[0.14em] text-accent uppercase">{p.tag}</span>
                <span className="font-display text-[clamp(19px,1.9vw,24px)] leading-[1.12] font-bold tracking-[-0.035em] text-balance">
                  {p.titel}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-[1240px] px-6 pt-22 pb-28">
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
