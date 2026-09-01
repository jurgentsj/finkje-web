"use client";

import { useState } from "react";

const chapters = [
  { title: "Zo is het nu", subtitle: "De wereld van werk loopt vast", body: "De arbeidsmarkt draait nog vaak op vaste routes, functietitels en systemen die ooit logisch waren. Maar de wereld is veranderd, en die oude route past steeds minder goed bij mensen.", close: "Tijd om het patroon te doorbreken." },
  { title: "Mensen zijn veranderd", subtitle: "Werk is meer dan werk", body: "Mensen zoeken niet alleen een salaris. Ze zoeken ruimte, betekenis en werk dat past bij wie ze zijn. Hun leven en ambities laten zich niet meer netjes in één functieprofiel vangen.", close: "De mens komt weer op één." },
  { title: "Interesse wint aan terrein", subtitle: "It’s only a matter of time", body: "Wat iemand interessant vindt, zegt vaak meer over de richting waarin diegene wil groeien dan een lijstje diploma’s. Interesse is geen bijzaak, maar een kompas.", close: "Nieuwsgierigheid wijst de weg." },
  { title: "Het cv kijkt achteruit", subtitle: "Terwijl mensen vooruit willen", body: "Een cv vertelt waar iemand vandaan komt. De belangrijkste vraag is waar iemand naartoe wil. Door alleen terug te kijken, missen we precies dat wat beweging mogelijk maakt.", close: "Tijd om vooruit te kijken." },
  { title: "De komst van AI", subtitle: "Makkelijker kunnen we het niet maken, wel leuker.", body: "AI maakt het eenvoudiger om informatie te vinden, werk te organiseren en talent zichtbaar te maken. Daardoor ontstaat ruimte voor wat technologie niet kan vervangen: menselijke motivatie.", close: "Technologie maakt ruimte voor wil." },
  { title: "Een nieuwe schaarste", subtitle: "Niet kunnen, maar willen", body: "Kennis wordt steeds toegankelijker. De nieuwe schaarste zit in mensen die willen leren, bijdragen en verantwoordelijkheid nemen. Niet alleen kunnen telt, willen maakt het verschil.", close: "Motivatie wordt de nieuwe maatstaf." },
  { title: "Willen zal worden", subtitle: "De toekomst is er klaar voor", body: "De toekomst van werk begint bij mensen die weten waar ze naartoe willen en organisaties die daar ruimte voor maken. Niet door harder vast te houden, maar door beter te luisteren.", close: "De toekomst blijft bewegen." },
];

export function VisionStory() {
  const [active, setActive] = useState(0);
  const chapter = chapters[active];
  return (
    <section className="relative overflow-hidden bg-sand px-6 py-32 text-black sm:py-44" aria-label="De visie van Finkje">
      <div className="pointer-events-none absolute -right-8 top-16 font-display text-[clamp(120px,22vw,320px)] leading-none font-semibold tracking-[-0.1em] text-black/[0.035]" aria-hidden="true">WIL</div>
      <div className="relative mx-auto max-w-[1360px]">
        <p className="mb-16 text-xs font-semibold tracking-[0.16em] text-accent uppercase sm:mb-24">/ Een lijn van gedachten</p>
        <div className="relative mb-28 py-10 sm:mb-36">
          <div className="absolute right-0 bottom-0 left-0 h-px bg-black/20" aria-hidden="true" />
          <div className="absolute bottom-[-5px] left-0 z-10 h-2.5 w-2.5 -translate-x-1/2 rounded-full bg-accent ring-4 ring-sand transition-[left] duration-700" style={{ left: `${(active / (chapters.length - 1)) * 100}%` }} aria-hidden="true" />
          <div className="relative grid grid-cols-1 gap-10 sm:grid-cols-2 sm:gap-x-12 sm:gap-y-16 lg:grid-cols-7 lg:gap-x-10">
            {chapters.map((item, index) => (
              <button key={item.title} type="button" onClick={() => setActive(index)} className={`border-b-2 pb-10 text-left transition-opacity ${active === index ? "border-accent opacity-100" : "border-transparent opacity-55 hover:opacity-85"}`} aria-pressed={active === index}>
                <span className="mb-3 block text-xs font-semibold tracking-[0.12em] text-black/45">0{index + 1}</span>
                <span className="block max-w-[15ch] font-display text-[clamp(22px,2.2vw,30px)] leading-[0.98] font-semibold tracking-[-0.045em] text-black">{item.title}</span>
                <span className="mt-3 block max-w-[20ch] text-[15px] leading-snug text-black/65">{item.subtitle}</span>
              </button>
            ))}
          </div>
        </div>
        <div className="grid max-w-[1080px] grid-cols-1 gap-12 sm:grid-cols-[minmax(0,1.25fr)_minmax(260px,0.75fr)] sm:gap-24">
          <div>
            <h2 className="m-0 font-display text-[clamp(42px,7vw,84px)] leading-[0.9] font-medium tracking-[-0.071em]">{chapter.title}</h2>
            <p className="mt-5 text-[clamp(20px,2.2vw,27px)] leading-snug text-accent">{chapter.subtitle}</p>
          </div>
          <div className="pt-2 text-[18px] leading-relaxed text-black/70 sm:pt-4">
            <p className="m-0">{chapter.body}</p>
            <p className="mt-8 font-display text-[clamp(22px,2.8vw,34px)] leading-tight font-medium tracking-[-0.035em] text-black">{chapter.close}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
