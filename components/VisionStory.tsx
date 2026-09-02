"use client";

import { useEffect, useRef, useState } from "react";

const chapters = [
  {
    title: "De visie achter Finkje.",
    paragraphs: [
      "Er wordt gezocht, geschreven, geselecteerd, aangepast en geprobeerd. It’s the circle of work. Maar één vraag wordt opvallend weinig gesteld: wat wil iemand eigenlijk?",
      "“Het arbeidstekort groeit, de werkloosheid stijgt en het aantal vacatures daalt. Deze sector heeft moeite met het vinden van personeel en persoon X heeft al meer dan honderd keer gesolliciteerd; zonder succes.”Iedereen kan de artikelen inmiddels al dromen. Bedrijven zoeken naar een manier om personeel aan te trekken. Hogere salarissen, prachtig gemaakte ‘werken bij ons’-video’s, pingpongtafels, extra vakantiedagen, een 14e maand of elke dinsdag een vrijmibo.Sectorbreed vecht men voor meer scholing, grote campagnes, desnoods ingrijpen van de overheid. Aan de andere kant is iemand op zoek naar werk. Het begint met een spontane mail. Geen respons. Omdat je hebt gezocht op het woord ‘werk’, krijg je de rest van de maand elke dag een nieuwe baan aangeboden. Totaal willekeurig. Wat jij wil doet niet of nauwelijks ter zake. Na verloop van tijd toch maar weer eens proberen. Dan maar eens dat cv finetunen. Wacht, die vriendin zit in een zakelijke omgeving, zij weet vast wat ik op moet schrijven. Of ik laat dat familielid eens meekijken. Wat kwaliteiten toevoegen, gaten dichten en een paar extra activiteiten vermelden kan geen kwaad.\nOp gesprek stevig onderhandelen over alle voorwaarden. Eerlijk? Je begrijpt er niks van maar ach, wat heb je te verliezen, het is toch een instapfunctie die toevallig voorbij kwam. En tenslotte niet jouw droombaan. Bedrijven krijgen zo een nieuwe uitdaging. Is dit wel echt de kandidaat die we online tegenkwamen? En hoe kom ik er nou achter of deze persoon lang bij ons gaat blijven? \nAan beide kanten gebeurt ontzettend veel.Er wordt gezocht, geschreven, geselecteerd, aangepast en geprobeerd. It’s the circle of work. Maar één vraag wordt opvallend weinig gesteld: wat wil iemand eigenlijk?",
    ],
    close: "Tijd om andere vragen te gaan stellen.",
  },
  {
    title: "Mensen zijn veranderd",
    paragraphs: [
      "Twee partijen met hetzelfde belang vechten gek genoeg om elkaars aandacht. En allebei zijn ze gedwongen zichzelf nét even anders voor te doen om überhaupt in beeld te komen.",
      "In een wereld waar sociale media ons van een overvloed aan vergelijkingsmateriaal voorzien, onze aandachtsspanne verkorten en alle berichtgeving soms het uiterste van ons als mens vraagt, nemen zingeving, spiritualiteit en zelfkennis een vlucht naar voren. Niet geheel ontoevallig.\nHet adagium van onze grootouders dat ‘leuk werk een luxe is’, begint voor velen steeds minder aantrekkelijk te klinken. \nMensen zijn meer en meer bezig met de vraag waarom ze doen wat ze doen en wat het leven hen te bieden heeft. Niet slechts op zoek naar ‘een’ werkgever, maar naar een bedrijf dat past bij hoe zij naar de wereld kijken.\nEn dat heeft een alsmaar groter wordend effect op werk.\n“Een baan met zingeving, betekenisvol werk of het verschil maken.\" Het zijn termen die je bij steeds meer vacatures tegenkomt. Niet gek, het is de markt die reageert op de behoefte.\nBedrijven zijn daarom steeds meer bezig met cultuur, waarden en goede onderlinge samenwerking. Met de vraag hoe ze bijdragen aan een betere wereld, met welke boodschap ze klanten écht weten te raken en hoe ze het bedrijf doorgeven aan de volgende generatie. \nSteeds vaker gaat het dus niet alleen om wat een organisatie doet, maar ook om waar ze voor staat en met wie ze dat wil doen. Niet slechts op zoek naar iemand die het werk kan uitvoeren, maar naar iemand die bij het bedrijf past. \nTwee partijen met uiteindelijk hetzelfde belang, vechten gek genoeg om elkaars aandacht. En allebei zijn ze gedwongen zichzelf nét even anders voor te doen om überhaupt in beeld te komen.\n",
    ],
    close: "Tijd voor een systeem dat recht doet aan onze nieuwe belevingswereld.",
  },
  {
    title: "Interesse wint aan terrein",
    paragraphs: [
      "De zoektocht naar werk begint zelden met de vraag waar iemands hart sneller van gaat kloppen. We vragen wat iemand heeft gestudeerd, waar iemand heeft gewerkt, hoeveel jaar ervaring iemand heeft.",
      "Evenwijdig aan deze ontwikkeling loopt een opleidingssysteem. Een systeem dat zichzelf evenwel aan het heruitvinden is.\nInmiddels is duidelijk geworden dat het helpt om jongere kinderen te volgen in hun zelfgekozen interesse. Volg een jong mens en je komt er snel genoeg achter waar het hart sneller van gaat kloppen. \nInteresse krijgt daarmee steeds vaker een rol in hoe iemand leert en zich ontwikkelt. \nWat is jouw droombaan? Waar word je gelukkig van? Je hebt de vraag misschien weleens gekregen. Vaak als je jong bent. De keuzes die je vanaf de basisschool maakt blijken meer dan eens bepalend voor de rest van jouw carrière, terwijl je er vaak pas ná deze keuzes achter komt waar je gelukkig van wordt.\nMisschien kwam ergens onderweg juist iets heel anders voorbij. Een vak, bedrijf, beroep, hobby of persoon waarvan je dacht: dát is het! \nEn toch begint de zoektocht naar werk daarna meestal niet met de vraag waar iemands hart sneller van gaat kloppen.\nWe vragen wat iemand heeft gestudeerd.\nWaar iemand heeft gewerkt.\nHoeveel jaar ervaring iemand heeft.\nOp steeds meer plekken leren we interesse serieus te nemen.\n",
    ],
    close: "Tijd voor de werkvloer. Tijd voor wat het hart sneller doet kloppen.",
  },
  {
    title: "Het cv kijkt achteruit",
    paragraphs: [
      "We proberen de toekomst van iemand nog altijd te voorspellen aan de hand van het verleden. Een verleden zonder toelichting. Een verleden zonder toekomst.",
      "Terwijl mensen vooruit willen\nIs een cv dat vol staat met ‘hoe het plaatje klopt’ nog wel een goede graadmeter van geschiktheid?\nEen cv kan uitstekend vertellen waar iemand is geweest. Welke opleiding iemand volgde, waar iemand heeft gewerkt en hoe lang.\nMaar datzelfde cv is veel minder goed in voorspellen waar iemand naartoe wil. Waar op het cv staat iemands droom? Waar staan alle dingen die minder goed gingen? Alle opgedane levenservaring?\nBij de één staat er genoeg op papier, maar lukt het toch niet om binnen te komen. Bij de ander is juist wat er niet op papier staat de reden waarom een nieuwe richting moeilijk wordt.\nWe proberen de toekomst van iemand daarmee nog altijd te voorspellen aan de hand van het verleden.\nEen verleden zonder toelichting.\nEen verleden zonder toekomst.\nEen verleden dat niets zegt over waar iemand naartoe wil.",
    ],
    close: "Tijd om vooruit te kijken.",
  },
  {
    title: "De komst van AI",
    paragraphs: [
      "Terwijl we druk bezig zijn met de vraag welk werk technologie straks kan doen, is er nog een andere vraag: welk werk willen mensen straks nog doen?",
      "Als bedrijf krijg je de ene magische toepassing na de andere aangeboden. Van tools die processen versnellen tot systemen die steeds meer werk uit handen nemen. De eerste tools notuleerden gesprekken. Daarna luisterden ze actief mee en kwamen ze zelf met voorstellen. Inmiddels zijn er zelfs tools die het sollicitatiegesprek voor je voeren.\nTools die andere tools herkennen. Software die moet ontdekken of een sollicitatiebrief met AI is geschreven. Werkgevers die, geconfronteerd met AI-brieven, zelf AI inzetten om zich daartegen te weren. De ene toepassing roept zo bijna automatisch de volgende op.\nEn dan zijn er nog de banen zelf. Welke banen kunnen worden overgenomen, en door wat? Welke zullen verdwijnen, welke veranderen en welke blijven? En hoe verhoudt die ontwikkeling zich eigenlijk tot wat mensen zelf willen? Want terwijl we druk bezig zijn met de vraag welk werk technologie straks kan doen, is er nog een andere vraag: welk werk willen mensen straks nog doen?\nAls werkzoekende zoek je je wezenloos. Gebruik je een cv-tool, laat je automatisch mails versturen of gooi je toch die vacaturetekst in AI om er vervolgens ook maar meteen je sollicitatiebrief mee te laten schrijven?\nOp dit moment wordt AI vooral toegepast op wat mogelijk is.\nVolgens Finkje zal dat binnen afzienbare tijd veranderen. Dan wordt de vraag niet alleen meer: wat kán worden overgenomen? Maar vooral: waar hebben mensen zelf geen zin meer in?\nEn om te weten waar mensen geen zin meer in hebben, moeten we eerst weten waar mensen nog altijd wél zin in hebben.\n",
    ],
    close: "Tijd om de vraag om te draaien. Welk werk willen we juist níet kwijt?",
  },
  {
    title: "Een nieuwe schaarste",
    paragraphs: [
      "Er ontstaat een nieuwe schaarste: mensen die iets willen. Wil, iemands intrinsieke motivatie, is misschien wel het meest onderbelichte vinkje tijdens een sollicitatie.",
      "Lange tijd draaide schaarste op de arbeidsmarkt vooral om kunnen.\nWie heeft de juiste opleiding? Wie heeft genoeg ervaring? Wie beheerst een bepaalde techniek?\nMaar kennis wordt toegankelijker. Werkzaamheden veranderen sneller. Technologie kan steeds meer ondersteunen en functies veranderen soms sneller dan opleidingen kunnen volgen.\nDaarmee ontstaat langzaam een nieuwe schaarste: mensen die iets willen.\nEn juist dat is misschien wel het meest onderbelichte vinkje tijdens een sollicitatie.\nWil.\nIemands intrinsieke motivatie.\nNiet als laatste vraag onderaan een sollicitatieformulier. Niet als ‘nice to know’ tijdens het gesprek. Maar als belangrijkste uitgangspunt.\nWant als kunnen steeds makkelijker te ondersteunen, aan te leren of aan te vullen is, wordt willen alleen maar belangrijker.\n",
    ],
    close: "Tijd voor de toekomst. Tijd voor Willers.",
  },
  {
    title: "Willen zal worden",
    paragraphs: [
      "Hoe minder vastligt wat iemand over tien jaar doet, hoe belangrijker het wordt dat iemand weet waar hij of zij naartoe wil.",
      "De vijfdaagse werkweek is geen vast gegeven meer, die ene functie voor dertig jaar lang bij dezelfde werkgever ook niet meer en een opleiding bepaalt steeds minder wat iemand de rest van zijn leven zal doen.\nFuncties ontstaan, functies veranderen en functies verdwijnen.\nMensen zullen vaker voor hun dromen gaan, opnieuw moeten kiezen.\nBedrijven zullen zich vaker opnieuw moeten afvragen welk werk zij nodig hebben, wie dat werk moet doen en waarom iemand juist bij hen zou willen werken.\nHoe minder vastligt wat iemand over tien jaar doet, hoe belangrijker het wordt dat iemand weet waar hij of zij naartoe wil.\nWij geloven daarom niet dat de toekomst van werk alleen zal gaan over nieuwe functies, nieuwe technieken of nieuwe arbeidsvoorwaarden.\nDe toekomst zal gaan over mensen.\nOver wat zij belangrijk vinden.\nWaar zij goed in willen worden.\nWaar zij hun tijd aan willen besteden.\nWaar zij voor willen gaan.\nDe toekomst zal bestaan uit willen.\n",
    ],
    close: "Willen zal worden. De toekomst zal bestaan uit willen.",
  },
];

const palettes = [
  { bg: "bg-white", text: "text-black", bgHex: "#ffffff", line: "#FF5A00", bird: "#FF5A00" },
  { bg: "bg-accent", text: "text-white", bgHex: "#FF5A00", line: "#ffffff", bird: "#ffffff" },
  { bg: "bg-black", text: "text-white", bgHex: "#0E0E0E", line: "#FF5A00", bird: "#FF5A00" },
];

// Anchor x-positions (in a 0-120 viewBox) that each chapter's flight path
// swings between. Uneven, non-repeating values keep every curve looking
// like a real, hand-flown path rather than a mirrored/generated pattern.
const anchors = [24, 92, 16, 84, 30, 96, 20, 88];

function buildFlightPath(index: number) {
  const from = anchors[index];
  const to = anchors[index + 1];
  const bow = to > from ? -34 : 34;
  return `M ${from} -40 C ${from + bow} 260 ${to - bow} 760 ${to} 1060`;
}

type BirdState = { index: number; x: number; y: number; rotation: number };

export function VisionStory() {
  const sectionRefs = useRef<(HTMLElement | null)[]>([]);
  const pathRefs = useRef<(SVGPathElement | null)[]>([]);
  const samplesRef = useRef<{ x: number; y: number }[][]>([]);
  const stateRef = useRef<BirdState>({ index: 0, x: anchors[0], y: 0, rotation: 90 });
  const [bird, setBird] = useState<BirdState>(stateRef.current);

  useEffect(() => {
    pathRefs.current.forEach((path, i) => {
      if (!path) return;
      const length = path.getTotalLength();
      const samples: { x: number; y: number }[] = [];
      for (let s = 0; s <= 240; s++) samples.push(path.getPointAtLength((length * s) / 240));
      samplesRef.current[i] = samples;
    });

    let raf = 0;
    const update = () => {
      const mid = window.innerHeight * 0.42;
      let index = 0;
      let local = 0;
      sectionRefs.current.forEach((section, i) => {
        if (!section) return;
        const rect = section.getBoundingClientRect();
        if (rect.top <= mid) {
          index = i;
          local = Math.min(1, Math.max(0, (mid - rect.top) / Math.max(1, rect.height)));
        }
      });

      const samples = samplesRef.current[index];
      if (samples?.length) {
        const frame = Math.round(local * (samples.length - 1));
        const point = samples[frame];
        const ahead = samples[Math.min(samples.length - 1, frame + 6)];
        const angle = (Math.atan2(ahead.y - point.y, (ahead.x - point.x) * 10) * 180) / Math.PI;
        const next: BirdState = {
          index,
          x: Math.min(94, Math.max(6, (point.x / 120) * 100)),
          y: (point.y / 1000) * 100,
          rotation: Math.max(40, Math.min(120, angle)),
        };
        const prev = stateRef.current;
        if (
          next.index !== prev.index ||
          Math.abs(next.x - prev.x) > 0.05 ||
          Math.abs(next.y - prev.y) > 0.05 ||
          Math.abs(next.rotation - prev.rotation) > 0.3
        ) {
          stateRef.current = next;
          setBird(next);
        }
      }
      raf = requestAnimationFrame(update);
    };
    raf = requestAnimationFrame(update);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <section aria-label="De visie van Finkje" className="overflow-hidden">
      {chapters.map((chapter, index) => {
        const palette = palettes[index % 3];
        const isActive = bird.index === index;
        return (
          <article
            key={chapter.title}
            ref={(el) => {
              sectionRefs.current[index] = el;
            }}
            className={`relative min-h-[820px] border-t-4 border-accent px-6 py-28 ${palette.bg} ${palette.text} sm:min-h-screen sm:px-14 sm:py-40`}
          >
            <div className="pointer-events-none absolute top-0 bottom-0 left-2 h-full w-28 overflow-visible sm:left-6 sm:w-44">
              <svg viewBox="0 0 120 1000" preserveAspectRatio="none" className="h-full w-full overflow-visible" aria-hidden="true">
                <path
                  ref={(el) => {
                    pathRefs.current[index] = el;
                  }}
                  d={buildFlightPath(index)}
                  fill="none"
                  stroke={palette.line}
                  strokeOpacity={0.4}
                  strokeWidth={1.25}
                  strokeDasharray="1 5"
                  strokeLinecap="round"
                  vectorEffect="non-scaling-stroke"
                />
              </svg>
              {isActive && (
                <div
                  className="absolute"
                  style={{
                    left: `${bird.x}%`,
                    top: `${bird.y}%`,
                    transform: `translate(-50%, -50%) rotate(${bird.rotation}deg)`,
                  }}
                >
                  <svg width="72" height="46" viewBox="-24 -18 48 30" className="block overflow-visible drop-shadow-sm">
                    <path d="M -22 -2 L -12 0.5 L -12 7.5 Z" fill={palette.bird} />
                    <path
                      d="M -14 -1 C -14 -6.6 -8.6 -10 -2 -10 C 2.4 -10 5.8 -8 8 -5.6 L 16.5 -4.4 L 9.4 0 C 8.4 4.4 3.8 7.6 -2 7.6 C -8.6 7.6 -14 4.4 -14 -1 Z"
                      fill={palette.bird}
                    />
                    <path
                      d="M -9 -3.8 C -4.8 -10.8 2 -13.4 6.2 -12 C 3.4 -5.8 -2.2 -1.4 -7.4 -0.6 Z"
                      fill={palette.bird}
                      stroke={palette.bgHex}
                      strokeWidth={1.8}
                    />
                  </svg>
                </div>
              )}
            </div>
            <div className="mx-auto grid min-h-[700px] max-w-[1440px] grid-cols-1 gap-10 pl-28 sm:grid-cols-[minmax(0,0.95fr)_minmax(0,1.25fr)] sm:gap-16 sm:pl-52">
              <div className="flex flex-col justify-between gap-16">
                <h2 className="m-0 max-w-[8ch] self-start pt-0 font-display text-[clamp(48px,7vw,96px)] leading-[0.92] font-medium tracking-[-0.065em]">{chapter.title}</h2>
              </div>
              <div className="col-span-full flex w-full max-w-none flex-col gap-10 pt-1 sm:gap-14">
                {chapter.paragraphs.flatMap((paragraph) => paragraph.split(/\n+/)).map((subtext, subtextIndex) => <p key={`${subtext}-${subtextIndex}`} className={`m-0 ${index === 0 ? "mb-6" : ""} ${subtextIndex === 0 ? "max-w-[48ch] font-sans text-[clamp(20px,2.1vw,29px)] leading-[1.42]" : "font-sans text-[clamp(16px,1.5vw,21px)] leading-[1.62]"} ${subtextIndex === 0 ? (index === 0 ? "font-medium" : "font-semibold") : index === 0 || index === 3 || index === 6 ? "text-black" : index <= 2 || index >= 4 ? "text-white" : "text-current/65"} ${index === 4 && subtextIndex !== 0 ? "bg-transparent" : ""}`}>{subtext}</p>)}
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
