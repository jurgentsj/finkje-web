"use client";

const chapters = [
  {
    title: "Zo is het nu",
    subtitle: "De wereld van werk loopt vast",
    body: "Er wordt gezocht, geschreven, geselecteerd, aangepast en geprobeerd. It's the circle of work. Maar één vraag wordt opvallend weinig gesteld: wat wil iemand eigenlijk?",
    close: "Tijd om opnieuw te kijken naar wat mensen in beweging brengt.",
  },
  {
    title: "Mensen zijn veranderd",
    subtitle: "Werk is meer dan werk",
    body: "Twee partijen met hetzelfde belang vechten gek genoeg om elkaars aandacht. En allebei zijn ze gedwongen zichzelf nét even anders voor te doen om überhaupt in beeld te komen.",
    close: "Tijd voor een systeem dat recht doet aan onze nieuwe belevingswereld.",
  },
  {
    title: "Interesse wint aan terrein",
    subtitle: "It's only a matter of time",
    body: "De zoektocht naar werk begint zelden met de vraag waar iemands hart sneller van gaat kloppen. We vragen wat iemand heeft gestudeerd, waar iemand heeft gewerkt, hoeveel jaar ervaring iemand heeft. Inmiddels is duidelijk geworden dat het helpt om kinderen te volgen in hun zelfgekozen interesse. Volg een jong mens en je komt er snel genoeg achter waar het hart sneller van gaat kloppen.",
    close: "Tijd voor de werkvloer. Tijd voor wat het hart sneller doet kloppen.",
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
    body: "Kennis wordt steeds toegankelijker. De nieuwe schaarste zit in mensen die willen leren, bijdragen en verantwoordelijkheid nemen.",
    close: "Motivatie wordt de nieuwe maatstaf.",
  },
  {
    title: "Willen zal worden",
    subtitle: "De toekomst is er klaar voor",
    body: "De toekomst van werk begint bij mensen die weten waar ze naartoe willen en organisaties die daar ruimte voor maken.",
    close: "De toekomst zal bestaan uit willen.",
  },
];

const backgrounds = ["bg-white", "bg-accent", "bg-black", "bg-white", "bg-accent", "bg-accent", "bg-black"];
const foregrounds = ["text-black", "text-white", "text-white", "text-black", "text-white", "text-white", "text-white"];

export function VisionStory() {
  return (
    <section aria-label="De visie van Finkje" className="overflow-hidden">
      {chapters.map((chapter, index) => {
        const isLight = index === 0 || index === 4;
        return (
          <article key={chapter.title} className={`relative min-h-[760px] border-t-4 border-accent px-6 py-24 ${backgrounds[index]} ${foregrounds[index]} sm:min-h-screen sm:px-14 sm:py-32`}>
            <div className={`absolute top-0 bottom-0 left-10 w-px sm:left-14 ${isLight ? "bg-accent" : "bg-white/80"}`} aria-hidden="true" />
            <div className={`absolute top-1/2 left-[calc(2.5rem-8px)] h-7 w-7 -translate-y-1/2 rounded-full border-2 sm:left-[calc(3.5rem-8px)] ${isLight ? "border-accent bg-white" : "border-white bg-accent"}`} aria-hidden="true" />
            <div className="mx-auto grid min-h-[650px] max-w-[1240px] grid-cols-1 gap-20 pl-12 sm:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] sm:gap-24 sm:pl-20">
              <h2 className="m-0 max-w-[8ch] self-start pt-20 font-display text-[clamp(48px,7vw,96px)] leading-[0.92] font-medium tracking-[-0.065em] sm:pt-24">{chapter.title}</h2>
              <div className="flex flex-col justify-between gap-16">
                <div className="max-w-[38ch] space-y-8 pt-1">
                  <p className="m-0 font-display text-[clamp(19px,2vw,24px)] leading-[1.35] font-medium">{chapter.body}</p>
                  <p className={`m-0 text-[clamp(17px,1.8vw,20px)] leading-relaxed ${isLight ? "text-black/60" : "text-white/75"}`}>{chapter.subtitle}</p>
                </div>
                <p className="m-0 max-w-[34ch] font-display text-[clamp(19px,2vw,24px)] leading-[1.25] font-medium">→ {chapter.close}</p>
              </div>
            </div>
          </article>
        );
      })}
    </section>
  );
}

export { chapters };
