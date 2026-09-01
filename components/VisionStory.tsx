"use client";

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
  return (
    <section className="bg-white px-6 py-28 text-black sm:py-40" aria-label="De visie van Finkje">
      <div className="mx-auto max-w-[1360px]">
        <div className="grid grid-cols-1 gap-20 sm:grid-cols-2 sm:gap-x-24 sm:gap-y-32 lg:grid-cols-3 lg:gap-x-28 lg:gap-y-40">
          {chapters.map((chapter, index) => (
            <article key={chapter.title} className="flex min-h-[260px] flex-col justify-between">
              <h2 className="m-0 max-w-[10ch] font-display text-[clamp(38px,5vw,68px)] leading-[0.92] font-medium tracking-[-0.05em] text-black">
                {chapter.title}
              </h2>
              <div className="mt-10 max-w-[34ch]">
                <p className="m-0 text-[18px] leading-relaxed text-black/65 sm:text-[20px]">{chapter.body}</p>
                <p className="mt-8 font-display text-[clamp(22px,2.5vw,30px)] leading-tight font-medium tracking-[-0.03em] text-black">
                  {chapter.close}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
