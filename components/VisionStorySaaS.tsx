"use client";

import Link from "next/link";
import { chapters } from "@/components/VisionStory";

export function VisionStorySaaS() {
  const chapterList = Object.values(chapters as unknown as Record<string, unknown>)
    .flatMap((value) => (Array.isArray(value) ? value : [value]))
    .filter((value): value is { title: string; paragraphs: string[]; close: string } => Boolean(value && typeof value === "object" && "title" in value && "paragraphs" in value && "close" in value));

  return (
    <main className="bg-white text-[#111]">
      <section className="relative overflow-hidden border-b border-black/8 px-6 pb-20 pt-12 sm:px-10 sm:pb-28 sm:pt-16 lg:px-16">
        <div className="pointer-events-none absolute -right-32 -top-40 h-[34rem] w-[34rem] rounded-full bg-[radial-gradient(circle_at_35%_35%,rgba(47,111,255,0.2),transparent_58%),radial-gradient(circle_at_70%_70%,rgba(255,90,0,0.16),transparent_55%)] blur-2xl" />
        <div className="relative mx-auto grid max-w-[1360px] items-end gap-12 lg:grid-cols-[minmax(0,1.05fr)_minmax(300px,0.55fr)] lg:gap-20">
          <div className="flex flex-col gap-7">
            <div className="flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.16em] text-black/45">
              <span className="h-2 w-2 rounded-full bg-accent" /> Onze visie
            </div>
            <h1 className="m-0 max-w-[10ch] font-display text-[clamp(48px,8vw,118px)] font-semibold leading-[0.88] tracking-[-0.075em] text-balance">
              Werk begint bij willen.
            </h1>
            <p className="m-0 max-w-[42ch] text-[18px] leading-relaxed text-black/55 sm:text-[20px]">
              De arbeidsmarkt verandert. Niet omdat mensen minder kunnen, maar omdat ze steeds beter weten wat ze willen.
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1360px] px-6 py-16 sm:px-10 sm:py-24 lg:px-16">
        <div className="mb-14 flex flex-col gap-5 border-b border-black/8 pb-8 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="m-0 mt-3 max-w-[15ch] font-display text-[clamp(34px,5vw,64px)] font-semibold leading-[0.94] tracking-[-0.06em]">Een andere kijk op werk.</h2>
          </div>
          <p className="m-0 max-w-[34ch] text-[16px] leading-relaxed text-black/50">Lees hoe willen, interesse en vooruitkijken de manier waarop we werken veranderen.</p>
        </div>

        <div className="flex flex-col">
          {chapterList.map((chapter) => (
            <article key={chapter.title} className="grid gap-8 border-b border-black/8 py-10 first:pt-0 last:border-b-0 lg:grid-cols-[minmax(180px,0.36fr)_minmax(0,1fr)] lg:gap-16 lg:py-16">
              <div className="flex items-start gap-4">
                <h3 className="m-0 max-w-[12ch] font-display text-[clamp(27px,3.4vw,48px)] font-semibold leading-[0.95] tracking-[-0.05em]">{chapter.title}</h3>
              </div>
              <div className="flex max-w-[760px] flex-col gap-7">
                <div className="flex flex-col gap-5">
                  {chapter.paragraphs.flatMap((paragraph) => paragraph.split(/\n+/).filter(Boolean)).map((text, paragraphIndex) => (
                    <p key={`${chapter.title}-${paragraphIndex}`} className={`m-0 leading-relaxed ${paragraphIndex === 0 ? "text-[20px] font-medium tracking-[-0.02em] text-black/80" : "text-[16px] text-black/58"}`}>{text}</p>
                  ))}
                </div>
                <p className="m-0 border-l-2 border-accent pl-4 font-display text-[20px] font-semibold leading-tight tracking-[-0.03em] text-black/80">{chapter.close}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="relative overflow-hidden border-t border-black/8 px-6 py-20 sm:px-10 sm:py-28 lg:px-16">
        <div className="absolute inset-0 bg-[linear-gradient(115deg,rgba(47,111,255,0.12),transparent_45%,rgba(255,90,0,0.16))]" />
        <div className="relative mx-auto flex max-w-[1100px] flex-col gap-8">
          <p className="m-0 max-w-[15ch] font-display text-[clamp(40px,6vw,76px)] font-semibold leading-[0.92] tracking-[-0.065em]">Jouw droom is het beste cv dat je ooit gemaakt hebt.</p>
          <Link href="/aanmelden" className="w-fit rounded-full bg-accent px-7 py-4 text-[17px] font-semibold text-white transition-colors hover:bg-black">Zeg wat jij wil →</Link>
        </div>
      </section>
    </main>
  );
}
