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

  const isOrange = active % 2 === 1;

  return (
    <section className={`relative overflow-hidden px-6 py-16 text-[color:var(--vision-ink)] transition-colors duration-500 sm:px-12 sm:py-20 ${isOrange ? "bg-accent" : "bg-black"}`} aria-label="De visie van Finkje" style={{ "--vision-ink": isOrange ? "#ffffff" : "#ffffff", "--vision-muted": isOrange ? "rgba(255,255,255,0.72)" : "rgba(255,255,255,0.68)", "--vision-line": isOrange ? "rgba(255,255,255,0.82)" : "#ff5a00", "--vision-bg": isOrange ? "#ff5a00" : "#0b0b0b" } as React.CSSProperties}>
      <div className="absolute top-0 bottom-0 left-10 w-px bg-[color:var(--vision-line)] sm:left-14" aria-hidden="true" />
      <div className="absolute top-[40%] left-[calc(2.5rem-6px)] h-3 w-3 rounded-full border border-[color:var(--vision-line)] bg-[color:var(--vision-bg)] sm:left-[calc(3.5rem-6px)]" aria-hidden="true" />
      <div className="mx-auto grid min-h-[620px] max-w-[1240px] grid-cols-1 gap-16 pl-12 sm:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] sm:gap-20 sm:pl-20">
        <div className="flex items-start">
          <h2 className="m-0 max-w-[8ch] font-display text-[clamp(48px,7vw,92px)] leading-[0.94] font-medium tracking-[-0.065em] text-[color:var(--vision-ink)]">{chapter.title}</h2>
        </div>
        <div className="flex flex-col justify-between gap-16">
          <div className="max-w-[38ch] space-y-7 pt-1">
            <p className="m-0 font-display text-[clamp(18px,2vw,22px)] leading-[1.35] font-medium text-[color:var(--vision-ink)]">{chapter.body}</p>
            <p className="m-0 text-[clamp(17px,1.8vw,20px)] leading-relaxed text-[color:var(--vision-muted)]">{chapter.subtitle}</p>
          </div>
          <p className="m-0 max-w-[34ch] font-display text-[clamp(18px,2vw,23px)] leading-[1.25] font-medium text-[color:var(--vision-ink)]">→ {chapter.close}</p>
        </div>
      </div>
      <div className="mx-auto mt-12 flex max-w-[1240px] gap-3 pl-12 sm:pl-20" role="tablist" aria-label="Visiehoofdstukken">
        {chapters.map((item, index) => (
          <button key={item.title} type="button" onClick={() => setActive(index)} className={`h-1.5 flex-1 transition-opacity ${active === index ? "bg-[color:var(--vision-ink)] opacity-100" : "bg-[color:var(--vision-ink)] opacity-25 hover:opacity-60"}`} aria-label={`Ga naar ${item.title}`} aria-pressed={active === index} />
        ))}
      </div>
    </section>
  );
}
