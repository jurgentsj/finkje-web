"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { chapters } from "@/components/VisionStory";

const themes = [
  { background: "bg-[#0d2452]", foreground: "text-[#cfe3ff]", muted: "text-[#a9c8ef]", accent: "bg-[#ff8a52]", line: "border-[#456da8]" },
  { background: "bg-[#d7ecff]", foreground: "text-[#102c5a]", muted: "text-[#42628b]", accent: "bg-[#ff7043]", line: "border-[#9ec3e8]" },
  { background: "bg-[#123f35]", foreground: "text-[#d8f4d0]", muted: "text-[#a8d0a8]", accent: "bg-[#ff9a57]", line: "border-[#3a705d]" },
  { background: "bg-[#e2f4d8]", foreground: "text-[#163b31]", muted: "text-[#4c735d]", accent: "bg-[#ff7043]", line: "border-[#afd1a9]" },
  { background: "bg-[#ffede0]", foreground: "text-[#542b24]", muted: "text-[#8b5b4e]", accent: "bg-[#2f6fff]", line: "border-[#e4baa4]" },
  { background: "bg-[#172c4d]", foreground: "text-[#d9e8ff]", muted: "text-[#a7bfdc]", accent: "bg-[#ff8a52]", line: "border-[#4b6688]" },
  { background: "bg-[#d8f0ee]", foreground: "text-[#173d42]", muted: "text-[#507b7c]", accent: "bg-[#ff7043]", line: "border-[#a5cfca]" },
];

export function VisionStorySaaS() {
  const chapterList = Object.values(chapters as unknown as Record<string, unknown>)
    .flatMap((value) => (Array.isArray(value) ? value : [value]))
    .filter((value): value is { title: string; paragraphs: string[]; close: string } => Boolean(value && typeof value === "object" && "title" in value && "paragraphs" in value && "close" in value));
  const [activeSlide, setActiveSlide] = useState(0);
  const slideCount = chapterList.length + 2;

  const goToSlide = useCallback((index: number) => {
    setActiveSlide(Math.max(0, Math.min(index, slideCount - 1)));
  }, [slideCount]);

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, []);

  useEffect(() => {
    let wheelLocked = false;
    const onWheel = (event: WheelEvent) => {
      if (wheelLocked || Math.abs(event.deltaY) < 8) return;

      const copyPanel = (event.target as HTMLElement).closest<HTMLElement>("[data-vision-copy]");
      if (copyPanel) {
        const atTop = copyPanel.scrollTop <= 0;
        const atBottom = copyPanel.scrollTop + copyPanel.clientHeight >= copyPanel.scrollHeight - 2;
        const movingDown = event.deltaY > 0;
        if ((movingDown && !atBottom) || (!movingDown && !atTop)) return;
      }

      event.preventDefault();
      wheelLocked = true;
      goToSlide(activeSlide + (event.deltaY > 0 ? 1 : -1));
      window.setTimeout(() => {
        wheelLocked = false;
      }, 750);
    };
    const element = document.querySelector("[data-vision-slider]");
    element?.addEventListener("wheel", onWheel as EventListener, { passive: false });
    return () => element?.removeEventListener("wheel", onWheel as EventListener);
  }, [activeSlide, goToSlide]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowDown" || event.key === "PageDown") {
        event.preventDefault();
        goToSlide(activeSlide + 1);
      }
      if (event.key === "ArrowUp" || event.key === "PageUp") {
        event.preventDefault();
        goToSlide(activeSlide - 1);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [activeSlide, goToSlide]);

  return (
    <main data-vision-slider className="relative h-[100svh] w-full overflow-hidden bg-[#0d2452]">
      <div className="absolute inset-0 transition-transform duration-700 ease-[cubic-bezier(0.76,0,0.24,1)]" style={{ transform: `translateY(-${activeSlide * 100}%)` }}>
        <section className="relative flex h-[100svh] items-start overflow-hidden bg-white px-6 py-12 text-[#111] sm:px-10 sm:py-16 lg:px-16 lg:py-20">
          <div className="pointer-events-none absolute -inset-[20%] bg-[radial-gradient(ellipse_at_15%_25%,rgba(47,111,255,0.28),transparent_42%),radial-gradient(ellipse_at_82%_70%,rgba(255,112,67,0.26),transparent_43%)]" />
          <div className="relative mx-auto w-full max-w-[1360px]">
            <p className="mb-8 text-xs font-semibold uppercase tracking-[0.18em] text-black/45">Onze visie</p>
            <h1 className="m-0 max-w-[10ch] font-display text-[clamp(58px,10vw,150px)] font-semibold leading-[0.84] tracking-[-0.08em]">Werk begint bij willen.</h1>
            <p className="mt-10 max-w-[40ch] text-[18px] leading-relaxed text-black/55 sm:text-[21px]">De arbeidsmarkt verandert. Niet omdat mensen minder kunnen, maar omdat ze steeds beter weten wat ze willen.</p>
          </div>
        </section>

        {chapterList.map((chapter, index) => {
          const theme = themes[index % themes.length];
          return (
            <section key={chapter.title} className={`flex h-[100svh] items-start overflow-hidden px-6 py-12 ${theme.background} ${theme.foreground} sm:px-10 sm:py-16 lg:px-16 lg:py-20`}>
              <div className="mx-auto grid w-full max-w-[1360px] gap-12 lg:grid-cols-[0.75fr_1.25fr] lg:items-start lg:gap-24">
                <div>
                  <p className={`mb-8 text-xs font-semibold uppercase tracking-[0.18em] ${theme.muted}`}>Onze visie</p>
                  <h2 className="m-0 max-w-[10ch] font-display text-[clamp(46px,7vw,112px)] font-semibold leading-[0.86] tracking-[-0.075em]">{chapter.title}</h2>
                </div>
                <div data-vision-copy className={`flex max-h-[calc(100svh-10rem)] max-w-[760px] flex-col gap-8 overflow-y-auto overscroll-contain border-t pt-8 pr-3 ${theme.line}`}>
                  <div className="flex flex-col gap-6">
                    {chapter.paragraphs.flatMap((paragraph) => paragraph.split(/\n+/).filter(Boolean)).map((text, paragraphIndex) => (
                      <p key={`${chapter.title}-${paragraphIndex}`} className={`m-0 leading-relaxed ${paragraphIndex === 0 ? "text-[21px] font-medium tracking-[-0.02em]" : `text-[16px] ${theme.muted}`}`}>{text}</p>
                    ))}
                  </div>
                  <p className={`m-0 border-l-2 pl-5 font-display text-[22px] font-semibold leading-tight tracking-[-0.03em] ${theme.accent.replace("bg-", "border-")}`}>{chapter.close}</p>
                </div>
              </div>
            </section>
          );
        })}

        <section className="flex h-[100svh] items-start bg-[#ffede0] px-6 py-12 text-[#542b24] sm:px-10 sm:py-16 lg:px-16 lg:py-20">
          <div className="mx-auto w-full max-w-[1360px]">
            <p className="m-0 max-w-[12ch] font-display text-[clamp(48px,8vw,126px)] font-semibold leading-[0.86] tracking-[-0.08em]">Jouw droom is het beste cv dat je ooit gemaakt hebt.</p>
            <Link href="/aanmelden" className="mt-12 inline-flex rounded-full bg-[#2f6fff] px-7 py-4 text-[17px] font-semibold text-white transition-transform hover:-translate-y-1">Zeg wat jij wil →</Link>
          </div>
        </section>
      </div>

      <nav aria-label="Visie slides" className="fixed right-5 top-1/2 z-20 flex -translate-y-1/2 flex-col gap-3 sm:right-8">
        {Array.from({ length: slideCount }, (_, index) => (
          <button key={index} type="button" aria-label={`Ga naar slide ${index + 1}`} aria-current={activeSlide === index ? "step" : undefined} onClick={() => goToSlide(index)} className={`h-2.5 w-2.5 rounded-full border border-white/70 transition-all ${activeSlide === index ? "scale-150 bg-white" : "bg-white/35 hover:bg-white/75"}`} />
        ))}
      </nav>
    </main>
  );
}
