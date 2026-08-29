import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Onze visie",
  description: "Wij veranderen het ritme. Focus op ambities, interesses en waarden — niet enkel op diploma's of werkervaring.",
};

export default function OnzeVisiePage() {
  return (
    <>
      <section className="mx-auto max-w-[1100px] px-6 pt-20">
        <h1 className="m-0 font-display text-[clamp(42px,8vw,118px)] leading-[0.9] font-extrabold tracking-[-0.05em]">
          Wij veranderen het ritme.
        </h1>
        <p className="mt-8 max-w-[42ch] text-[clamp(18px,2.1vw,25px)] leading-snug text-black/64">
          Door te kijken naar de wil en wat iemand motiveert, bouwen we aan een arbeidsmarkt die eerlijker,
          inclusiever en persoonlijker is. Focus op ambities, interesses en waarden — niet enkel op diploma&apos;s
          of werkervaring.
        </p>
      </section>

      <section className="mx-auto max-w-[1100px] px-6 py-20">
        <p className="m-0 mb-7 text-xs font-semibold tracking-[0.16em] text-accent uppercase">/ Geen rituele dans</p>
        <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,260px),1fr))] gap-8 text-lg leading-relaxed text-black/74">
          <p className="m-0">
            Pingpongtafels. Extra vakantiedagen. 14e maand. Elke dinsdag een vrijmibo. Dit is waarmee jij mensen
            moet overtuigen om bij jou te komen werken.
          </p>
          <p className="m-0">
            Senior werkervaring in de studententijd, twee keer gepromoveerd als raketgeleerde en uitsluitend
            positieve eigenschappen. Dat is hoe mensen zich presenteren om aan een baan te komen. Geduwd in een
            systeem dat niet meer werkt.
          </p>
        </div>
        <blockquote className="mt-14 rounded-[28px] bg-black p-12 text-white">
          <p className="m-0 font-display text-[clamp(28px,4.4vw,58px)] leading-[0.96] font-extrabold tracking-[-0.045em]">
            &ldquo;Zie hier de rituele dans. Wij? Veranderen het ritme.&rdquo;
          </p>
          <footer className="mt-6 text-[15px] font-semibold text-white/60">— Finkje, cadanscoach</footer>
        </blockquote>
        <p className="mt-10 max-w-[62ch] text-lg leading-relaxed text-black/74">
          Door de focus te leggen op de wil om te werken, passie voor het vak en de motivatie hoeft niemand zich
          meer anders voor te doen. Niet als handige tool, maar als oplossing voor een structureel probleem van
          deze tijd.
        </p>
      </section>

      <section className="bg-sand">
        <div className="mx-auto max-w-[1100px] px-6 py-24">
          <p className="m-0 mb-7 text-xs font-semibold tracking-[0.16em] text-accent uppercase">
            / Waarom we Finkje begonnen
          </p>
          <div className="flex max-w-[68ch] flex-col gap-6 text-[19px] leading-relaxed text-black/76">
            <p className="m-0">
              Wat is jouw droombaan? Waar word je gelukkig van? Je hebt de vraag misschien weleens gekregen. Vaak
              als je jong bent. De keuzes die je vanaf de basisschool maakt blijken meer dan eens bepalend voor de
              rest van jouw carrière, terwijl je er vaak pas ná deze keuzes achter komt waar je gelukkig van wordt.
            </p>
            <p className="m-0">
              Wij geloven dat juist jouw verleden en alles wat je hebt meegemaakt, ervoor kan zorgen dat je nu heel
              goed weet waar je naartoe wil. En dat de dingen die je in een cv achterwege laat, juist het verschil
              maken.
            </p>
          </div>
          <p className="mt-14 max-w-[20ch] font-display text-[clamp(28px,4.6vw,64px)] leading-[0.94] font-extrabold tracking-[-0.05em] text-accent">
            &ldquo;Jouw droom is het beste cv dat je ooit gemaakt hebt.&rdquo;
          </p>
          <Link
            href="/aanmelden"
            className="mt-11 inline-flex rounded-full bg-black px-7.5 py-4.5 text-[17px] font-semibold text-white transition-colors hover:bg-accent"
          >
            Zeg wat jij wil →
          </Link>
        </div>
      </section>
    </>
  );
}
