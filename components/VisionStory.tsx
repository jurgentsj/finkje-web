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

  return (
    <section className="bg-white px-6 py-28 text-black sm:py-40" aria-label="De visie van Finkje">
      <div className="mx-auto max-w-[1360px]">
        <div className="relative mb-24 overflow-x-auto pb-5 scrollbar-none sm:mb-32">
          <div className="absolute top-5 left-5 right-5 h-px bg-black/20" aria-hidden="true" />
          <div className="relative flex min-w-[920px] justify-between gap-8 px-5">
            {chapters.map((item, index) => (
              <button key={item.title} type="button" onClick={() => setActive(index)} className="group flex w-[140px] shrink-0 flex-col items-center text-center" aria-pressed={active === index}>
                <span className={`z-10 mb-5 h-3 w-3 rounded-full border-2 bg-white transition-all ${active === index ? "border-accent bg-accent ring-4 ring-white" : "border-black/35 group-hover:border-black"}`} />
                <span className={`font-display text-[17px] leading-[1.05] font-medium tracking-[-0.03em] transition-colors ${active === index ? "text-black" : "text-black/45 group-hover:text-black/75"}`}>{item.title}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="grid min-h-[420px] grid-cols-1 items-start gap-12 border-t border-transparent pt-0 sm:grid-cols-[minmax(0,1.2fr)_minmax(280px,0.8fr)] sm:gap-24 sm:pt-16">
          <div>
            <h2 className="m-0 max-w-[11ch] font-display text-[clamp(48px,7vw,96px)] leading-[0.9] font-medium tracking-[-0.06em] text-black">{chapter.title}</h2>
          </div>
          <div className="max-w-[38ch]">
            <p className="m-0 text-[19px] leading-relaxed text-black/65 sm:text-[21px]">{chapter.body}</p>
            <p className="mt-10 font-display text-[clamp(25px,3vw,38px)] leading-tight font-medium tracking-[-0.04em] text-black">{chapter.close}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
