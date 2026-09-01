"use client";

import { useState } from "react";
import { Bird } from "lucide-react";

const chapters = [
  {
    title: "Zo is het nu",
    paragraphs: [
      "Er wordt gezocht, geschreven, geselecteerd, aangepast en geprobeerd. It’s the circle of work. Maar één vraag wordt opvallend weinig gesteld: wat wil iemand eigenlijk?",
      "“Het arbeidstekort groeit, de werkloosheid stijgt en het aantal vacatures daalt. Deze sector heeft moeite met het vinden van personeel en persoon X heeft al meer dan honderd keer gesolliciteerd; zonder succes.” Iedereen kan de artikelen inmiddels al dromen.",
      "Bedrijven zoeken naar een manier om personeel aan te trekken: hogere salarissen, prachtige ‘werken bij ons’-video’s, pingpongtafels, een 14e maand. Aan de andere kant stuurt iemand een spontane mail. Geen respons. Daarna elke dag een willekeurige baan in de inbox. Wat je wil doet niet ter zake.",
    ],
    close: "Tijd om andere vragen te gaan stellen.",
  },
  {
    title: "Mensen zijn veranderd",
    paragraphs: [
      "Twee partijen met hetzelfde belang vechten gek genoeg om elkaars aandacht. En allebei zijn ze gedwongen zichzelf nét even anders voor te doen om überhaupt in beeld te komen.",
      "Het adagium van onze grootouders dat ‘leuk werk een luxe is’, begint voor velen steeds minder aantrekkelijk te klinken. Mensen zijn meer en meer bezig met de vraag waarom ze doen wat ze doen.",
      "Niet slechts op zoek naar ‘een’ werkgever, maar naar een bedrijf dat past bij hoe zij naar de wereld kijken. Bedrijven zijn daarom steeds meer bezig met cultuur, waarden en samenwerking: niet alleen wat ze doen, maar waar ze voor staan en met wie.",
    ],
    close: "Tijd voor een systeem dat recht doet aan onze nieuwe belevingswereld.",
  },
  {
    title: "Interesse wint aan terrein",
    paragraphs: [
      "De zoektocht naar werk begint zelden met de vraag waar iemands hart sneller van gaat kloppen. We vragen wat iemand heeft gestudeerd, waar iemand heeft gewerkt, hoeveel jaar ervaring iemand heeft.",
      "Inmiddels is duidelijk geworden dat het helpt om kinderen te volgen in hun zelfgekozen interesse. Volg een jong mens en je komt er snel genoeg achter waar het hart sneller van gaat kloppen.",
      "De keuzes die je vanaf de basisschool maakt blijken meer dan eens bepalend voor je hele carrière, terwijl je er vaak pas ná die keuzes achter komt waar je gelukkig van wordt.",
    ],
    close: "Tijd voor de werkvloer. Tijd voor wat het hart sneller doet kloppen.",
  },
  {
    title: "Het cv kijkt achteruit",
    paragraphs: [
      "We proberen de toekomst van iemand nog altijd te voorspellen aan de hand van het verleden. Een verleden zonder toelichting. Een verleden zonder toekomst.",
      "Een cv kan uitstekend vertellen waar iemand is geweest. Welke opleiding iemand volgde, waar iemand heeft gewerkt en hoe lang.",
      "Maar datzelfde cv is veel minder goed in voorspellen waar iemand naartoe wil. Waar op het cv staat iemands droom? Waar staan de dingen die minder goed gingen? Alle opgedane levenservaring?",
    ],
    close: "Tijd om vooruit te kijken.",
  },
  {
    title: "De komst van AI",
    paragraphs: [
      "Terwijl we druk bezig zijn met de vraag welk werk technologie straks kan doen, is er nog een andere vraag: welk werk willen mensen straks nog doen?",
      "De eerste tools notuleerden gesprekken. Daarna luisterden ze mee en kwamen ze zelf met voorstellen. Inmiddels zijn er tools die het sollicitatiegesprek voor je voeren, en tools die andere tools moeten herkennen.",
      "Nu wordt AI vooral toegepast op wat mogelijk is. Dat zal veranderen: de vraag wordt waar mensen zelf geen zin meer in hebben. En om dat te weten, moeten we eerst weten waar mensen nog altijd wél zin in hebben.",
    ],
    close: "Tijd om de vraag om te draaien. Welk werk willen we juist níet kwijt?",
  },
  {
    title: "Een nieuwe schaarste",
    paragraphs: [
      "Er ontstaat een nieuwe schaarste: mensen die iets willen. Wil, iemands intrinsieke motivatie, is misschien wel het meest onderbelichte vinkje tijdens een sollicitatie.",
      "Lange tijd draaide schaarste op de arbeidsmarkt vooral om kunnen. Wie heeft de juiste opleiding? Genoeg ervaring? Wie beheerst een bepaalde techniek?",
      "Maar kennis wordt toegankelijker, technologie ondersteunt steeds meer en functies veranderen soms sneller dan opleidingen kunnen volgen. Niet als laatste vraag onderaan een formulier dus, maar als belangrijkste uitgangspunt.",
    ],
    close: "Tijd voor de toekomst. Tijd voor Willers.",
  },
  {
    title: "Willen zal worden",
    paragraphs: [
      "Hoe minder vastligt wat iemand over tien jaar doet, hoe belangrijker het wordt dat iemand weet waar hij of zij naartoe wil.",
      "De vijfdaagse werkweek is geen vast gegeven meer, die ene functie voor dertig jaar ook niet, en een opleiding bepaalt steeds minder wat iemand de rest van zijn leven doet. Functies ontstaan, veranderen en verdwijnen.",
      "Wij geloven daarom niet dat de toekomst van werk alleen gaat over nieuwe functies, technieken of arbeidsvoorwaarden. De toekomst gaat over mensen: over wat zij belangrijk vinden en waar zij voor willen gaan.",
    ],
    close: "Willen zal worden. De toekomst zal bestaan uit willen.",
  },
];

const backgrounds = ["bg-white", "bg-accent", "bg-black", "bg-white", "bg-accent", "bg-accent", "bg-black"];
const foregrounds = ["text-black", "text-white", "text-white", "text-black", "text-white", "text-white", "text-white"];

// Each chapter gets its own hand-tuned, asymmetric flight path so the line
// never repeats the same rhythm twice — like an actual bird finding its way.
const flightPaths = [
  { d: "M38,0 C71,9 14,19 52,31 C83,42 9,53 46,66 C64,77 22,89 58,100", bird: { x: 52, y: 31 }, rotate: -22 },
  { d: "M62,0 C21,11 79,17 33,29 C6,41 74,50 41,63 C13,74 66,85 47,100", bird: { x: 33, y: 29 }, rotate: 18 },
  { d: "M27,0 C66,13 11,21 61,33 C93,45 17,59 49,71 C71,83 20,92 42,100", bird: { x: 61, y: 33 }, rotate: -28 },
  { d: "M58,0 C17,10 84,16 37,27 C8,39 71,52 26,64 C57,76 15,87 53,100", bird: { x: 37, y: 27 }, rotate: 16 },
  { d: "M31,0 C74,8 16,20 57,32 C88,43 19,56 44,67 C69,79 24,90 56,100", bird: { x: 57, y: 32 }, rotate: -19 },
  { d: "M69,0 C19,9 81,22 35,31 C4,43 76,53 39,64 C11,76 63,88 45,100", bird: { x: 35, y: 31 }, rotate: 24 },
  { d: "M43,0 C81,11 8,20 55,33 C86,45 13,58 51,68 C73,81 21,90 60,100", bird: { x: 55, y: 33 }, rotate: -16 },
];

export function VisionStory() {
  const [active, setActive] = useState(0);
  return (
    <section aria-label="De visie van Finkje" className="overflow-hidden">
      {chapters.map((chapter, index) => {
        const isLight = index === 0 || index === 3;
        const path = flightPaths[index];
        const isActive = active === index;
        return (
          <article key={chapter.title} className={`relative min-h-[820px] border-t-4 border-accent px-6 py-28 ${backgrounds[index]} ${foregrounds[index]} sm:min-h-screen sm:px-14 sm:py-40`}>
            <div className="pointer-events-none absolute top-0 bottom-0 left-4 h-full w-24 sm:left-8 sm:w-32">
              <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="h-full w-full" aria-hidden="true">
                <path
                  d={path.d}
                  fill="none"
                  strokeWidth="2"
                  strokeLinecap="round"
                  className={isLight ? "stroke-accent/70" : "stroke-white/60"}
                  vectorEffect="non-scaling-stroke"
                />
              </svg>
              <button
                type="button"
                aria-label={`Ga naar ${chapter.title}`}
                onClick={() => setActive(index)}
                className="absolute z-10 flex h-12 w-12 items-center justify-center rounded-full sm:h-16 sm:w-16"
                style={{
                  left: `${path.bird.x}%`,
                  top: `${path.bird.y}%`,
                  "--glide-rotate": `${path.rotate}deg`,
                  animation: "finkje-glide 3.4s ease-in-out infinite",
                  animationDelay: `${index * 0.4}s`,
                } as React.CSSProperties}
              >
                <Bird
                  className={`h-8 w-8 sm:h-10 sm:w-10 ${isActive ? "text-accent" : isLight ? "text-accent/80" : "text-white/90"}`}
                  strokeWidth={1.75}
                  aria-hidden="true"
                />
              </button>
            </div>
            <div className="mx-auto grid min-h-[700px] max-w-[1440px] grid-cols-1 gap-20 pl-24 sm:grid-cols-[minmax(0,0.95fr)_minmax(0,1.25fr)] sm:gap-36 sm:pl-40">
              <div className="flex flex-col justify-between gap-16">
                <h2 className="m-0 max-w-[8ch] self-start pt-20 font-display text-[clamp(48px,7vw,96px)] leading-[0.92] font-medium tracking-[-0.065em] sm:pt-24">{chapter.title}</h2>
                <p className="m-0 max-w-[34ch] font-display text-[clamp(19px,2vw,24px)] leading-[1.25] font-medium">→ {chapter.close}</p>
              </div>
              <div className="max-w-[52ch] space-y-10 pt-1">
                {chapter.paragraphs.map((paragraph, paragraphIndex) => <p key={paragraph} className={`m-0 ${paragraphIndex === 0 ? "max-w-[48ch] font-sans text-[clamp(20px,2.1vw,29px)] leading-[1.42] font-semibold tracking-[-0.02em]" : "text-current/65 font-sans text-[clamp(16px,1.5vw,21px)] leading-[1.62]"}`}>{paragraph}</p>)}
              </div>
            </div>
          </article>
        );
      })}
    </section>
  );
}

export { chapters };
