"use client";

import { useState } from "react";

const chapters = [
  {
    title: "Zo is het nu",
    subtitle: "De wereld van werk loopt vast",
    body: "De arbeidsmarkt draait nog vaak op vaste routes, functietitels en systemen die ooit logisch waren. Maar de wereld is veranderd, en die oude route past steeds minder goed bij mensen.",
    close: "Tijd om het patroon te doorbreken.",
  },
  {
    title: "Mensen zijn veranderd",
    subtitle: "Werk is meer dan werk",
    body: "Mensen zoeken niet alleen een salaris. Ze zoeken ruimte, betekenis en werk dat past bij wie ze zijn. Hun leven en ambities laten zich niet meer netjes in één functieprofiel vangen.",
    close: "De mens komt weer op één.",
  },
  {
    title: "Interesse wint aan terrein",
    subtitle: "It's only a matter of time",
    body: "Wat iemand interessant vindt, zegt vaak meer over de richting waarin diegene wil groeien dan een lijstje diploma's. Interesse is geen bijzaak, maar een kompas.",
    close: "Nieuwsgierigheid wijst de weg.",
  },
  {
    title: "Het cv kijkt achteruit",
    subtitle: "Terwijl mensen vooruit willen",
    body: "Een cv vertelt waar iemand vandaan komt. De belangrijkste vraag is waar iemand naartoe wil. Door alleen terug te kijken, missen we precies dat wat beweging mogelijk maakt.",
    close: "Tijd om vooruit te kijken.",
  },
  {
    title: "De komst van AI",
    subtitle: "Makkelijker kunnen we het niet maken, wel leuker",
    body: "AI maakt het eenvoudiger om informatie te vinden, werk te organiseren en talent zichtbaar te maken. Daardoor ontstaat ruimte voor wat technologie niet kan vervangen: menselijke motivatie.",
    close: "Technologie maakt ruimte voor wil.",
  },
  {
    title: "Een nieuwe schaarste",
    subtitle: "Niet kunnen, maar willen",
    body: "Kennis wordt steeds toegankelijker. De nieuwe schaarste zit in mensen die willen leren, bijdragen en verantwoordelijkheid nemen. Niet alleen kunnen telt, willen maakt het verschil.",
    close: "Motivatie wordt de nieuwe maatstaf.",
  },
  {
    title: "Willen zal worden",
    subtitle: "De toekomst is er klaar voor",
    body: "De toekomst van werk begint bij mensen die weten waar ze naartoe willen en organisaties die daar ruimte voor maken. Niet door harder vast te houden, maar door beter te luisteren.",
    close: "De toekomst blijft bewegen.",
  },
];

export function VisionStory() {
  const [active, setActive] = useState(0);
  const chapter = chapters[active];
  const progress = ((active + 1) / chapters.length) * 100;

  return (
    <section className="bg-[#0a0a0a] px-6 py-28 text-white sm:py-40" aria-label="De visie van Finkje">
      <div className="mx-auto max-w-[1360px]">
        <div className="mb-14 flex items-center justify-between gap-6 border-b border-white/12 pb-6 sm:mb-20">
          <span className="font-hand-mono text-[11px] tracking-[0.22em] text-white/45 uppercase">Visie — een lijn van gedachten</span>
          <span className="font-hand-mono text-[11px] tracking-[0.1em] text-white/45 tabular-nums">
            0{active + 1} / 0{chapters.length}
          </span>
        </div>

        <div className="relative mb-20 sm:mb-28">
          <div className="scrollbar-none -mx-6 flex gap-x-10 overflow-x-auto px-6 pb-6 sm:mx-0 sm:gap-x-14 sm:px-0">
            {chapters.map((item, index) => (
              <button
                key={item.title}
                type="button"
                onClick={() => setActive(index)}
                className="group flex shrink-0 flex-col items-start gap-3 text-left"
                aria-pressed={active === index}
              >
                <span className={`font-hand-mono text-[11px] tracking-[0.1em] tabular-nums transition-colors ${active === index ? "text-accent" : "text-white/35 group-hover:text-white/60"}`}>
                  0{index + 1}
                </span>
                <span className={`text-[15px] leading-snug whitespace-nowrap transition-colors sm:text-[16px] ${active === index ? "text-white" : "text-white/40 group-hover:text-white/70"}`}>
                  {item.title}
                </span>
              </button>
            ))}
          </div>
          <div className="relative h-px w-full bg-white/12">
            <div className="absolute top-0 left-0 h-px bg-accent transition-all duration-500 ease-out" style={{ width: `${progress}%` }} />
          </div>
        </div>

        <div className="grid grid-cols-1 gap-16 sm:grid-cols-[minmax(0,1.3fr)_minmax(280px,1fr)] sm:gap-24">
          <div>
            <span className="mb-6 block font-hand-mono text-[12px] tracking-[0.14em] text-accent uppercase">{chapter.subtitle}</span>
            <h2 className="m-0 max-w-[16ch] font-display text-[clamp(44px,7.2vw,92px)] leading-[0.94] font-medium tracking-[-0.04em] text-white">
              {chapter.title}
            </h2>
          </div>
          <div className="border-t border-white/12 pt-8 sm:border-t-0 sm:border-l sm:pt-2 sm:pl-16">
            <p className="m-0 text-[19px] leading-relaxed text-white/65 sm:text-[21px]">{chapter.body}</p>
            <p className="mt-10 font-display text-[clamp(24px,3vw,36px)] leading-tight font-medium tracking-[-0.03em] text-white">
              {chapter.close}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
