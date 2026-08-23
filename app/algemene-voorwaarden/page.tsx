import type { Metadata } from "next";

import Link from "next/link";

export const metadata: Metadata = {
  title: "Algemene Voorwaarden — Finkje",
};

function H({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="mt-11 mb-3.5 font-display text-[clamp(21px,2.2vw,27px)] leading-tight font-bold tracking-[-0.03em]">
      {children}
    </h2>
  );
}
function P({ children }: { children: React.ReactNode }) {
  return <p className="m-0 mb-3.5 text-[17px] leading-relaxed text-black/78">{children}</p>;
}
function Ul({ children }: { children: React.ReactNode }) {
  return (
    <ul className="m-0 mb-3.5 flex flex-col gap-2 pl-5.5 text-[17px] leading-relaxed text-black/78">{children}</ul>
  );
}

export default function VoorwaardenPage() {
  return (
    <>
      <section className="mx-auto max-w-[820px] px-6 pt-18">
        <p className="m-0 mb-6 text-xs font-semibold tracking-[0.16em] text-accent uppercase">Juridisch</p>
        <h1 className="m-0 font-display text-[clamp(34px,5.6vw,72px)] leading-[0.92] font-extrabold tracking-[-0.05em]">
          Algemene Voorwaarden
        </h1>
        <p className="mt-5 text-base text-black/50">Versie 1.0 — 29 juni 2026</p>
      </section>

      <section className="mx-auto max-w-[820px] px-6 pt-6 pb-28">
        <H>Artikel 1 — Definities</H>
        <P>In deze algemene voorwaarden wordt verstaan onder:</P>
        <Ul>
          <li>
            <strong>Finkje:</strong> het platform dat bedrijven en kandidaten gratis met elkaar verbindt,
            geëxploiteerd door Finkje (KvK 95213120).
          </li>
          <li>
            <strong>Platform:</strong> de website en diensten van Finkje, bereikbaar via www.finkje.nl.
          </li>
          <li>
            <strong>Kandidaat:</strong> de natuurlijke persoon die zich registreert op het platform om in contact
            te komen met werkgevers.
          </li>
          <li>
            <strong>Werkgever:</strong> de rechtspersoon of natuurlijke persoon die handelt in de uitoefening van
            een beroep of bedrijf en gebruik maakt van het platform.
          </li>
          <li>
            <strong>Gebruiker:</strong> zowel kandidaat als werkgever.
          </li>
          <li>
            <strong>Profiel:</strong> de door een kandidaat of werkgever aangemaakte weergave op het platform.
          </li>
        </Ul>

        <H>Artikel 2 — Toepasselijkheid</H>
        <P>
          2.1 Deze algemene voorwaarden zijn van toepassing op elk gebruik van het platform en op alle
          overeenkomsten die via of met Finkje tot stand komen.
        </P>
        <P>2.2 Door gebruik te maken van het platform accepteert de gebruiker deze voorwaarden.</P>
        <P>
          2.3 Finkje behoudt zich het recht voor deze voorwaarden te wijzigen. De meest actuele versie is te
          vinden op www.finkje.nl. Bij wezenlijke wijzigingen worden gebruikers vooraf geïnformeerd.
        </P>

        <H>Artikel 3 — Dienstverlening</H>
        <P>
          3.1 Finkje biedt een gratis platform waarop kandidaten een profiel kunnen aanmaken en werkgevers
          gemotiveerde kandidaten kunnen vinden.
        </P>
        <P>
          3.2 Finkje is geen uitzendbureau en treedt niet op als werkgever, intermediair, of partij in een
          arbeidsovereenkomst. Het platform faciliteert uitsluitend de eerste ontmoeting tussen kandidaat en
          werkgever.
        </P>
        <P>3.3 Finkje staat niet in voor het sluiten van een arbeidsovereenkomst na een koppeling via het platform.</P>
        <P>
          3.4 Finkje behoudt zich het recht voor de dienstverlening tijdelijk of permanent te wijzigen, op te
          schorten of te beëindigen, zonder dat daarvoor aansprakelijkheid ontstaat.
        </P>

        <H>Artikel 4 — Registratie en profiel</H>
        <P>
          4.1 Om gebruik te kunnen maken van het platform dient de gebruiker een profiel aan te maken met correcte
          en actuele informatie.
        </P>
        <P>
          4.2 De gebruiker is verantwoordelijk voor de juistheid van de door hem of haar verstrekte gegevens en
          voor het up-to-date houden van het profiel.
        </P>
        <P>4.3 Het is niet toegestaan om een profiel aan te maken namens een ander zonder diens uitdrukkelijke toestemming.</P>
        <P>
          4.4 Finkje behoudt zich het recht voor profielen te verwijderen of te blokkeren indien deze onjuiste,
          misleidende of ongepaste informatie bevatten, zonder voorafgaande kennisgeving.
        </P>

        <H>Artikel 5 — Gedragsregels</H>
        <P>Gebruikers dienen zich te onthouden van:</P>
        <Ul>
          <li>Het plaatsen van onjuiste, misleidende, beledigende of discriminerende inhoud.</li>
          <li>Het gebruik van het platform voor commerciële doeleinden buiten de kernfunctie.</li>
          <li>Het (geautomatiseerd) scrapen of kopiëren van profieldata.</li>
          <li>Het hinderen of schaden van andere gebruikers of de werking van het platform.</li>
          <li>Elke handeling die in strijd is met de wet of de goede zeden.</li>
        </Ul>

        <H>Artikel 6 — Kosteloosheid</H>
        <P>6.1 Het gebruik van het platform is voor zowel kandidaten als werkgevers kosteloos.</P>
        <P>
          6.2 Finkje brengt geen bemiddelingskosten, plaatsingskosten of andere vergoedingen in rekening voor
          koppelingen die via het platform tot stand komen.
        </P>
        <P>
          6.3 Finkje behoudt zich het recht voor in de toekomst betaalde aanvullende diensten aan te bieden. Het
          basisgebruik blijft kosteloos.
        </P>

        <H>Artikel 7 — Intellectueel eigendom</H>
        <P>
          7.1 Alle intellectuele eigendomsrechten met betrekking tot het platform, de software, het ontwerp en de
          content van Finkje berusten bij Finkje of haar licentiegevers.
        </P>
        <P>
          7.2 De gebruiker verleent Finkje het recht om profielinhoud te tonen op het platform voor het doel
          waarvoor het platform is bedoeld.
        </P>
        <P>
          7.3 Het is niet toegestaan om materiaal van het platform te verveelvoudigen, te distribueren of openbaar
          te maken zonder schriftelijke toestemming van Finkje.
        </P>

        <H>Artikel 8 — Aansprakelijkheid</H>
        <P>8.1 Finkje is niet aansprakelijk voor:</P>
        <Ul>
          <li>Schade voortvloeiend uit het niet tot stand komen van een arbeidsovereenkomst na een koppeling.</li>
          <li>Schade die voortvloeit uit onjuiste of onvolledige informatie in profielen van gebruikers.</li>
          <li>Schade als gevolg van tijdelijke onbeschikbaarheid van het platform.</li>
          <li>Indirecte schade, gevolgschade of gederfde winst.</li>
        </Ul>
        <P>
          8.2 De aansprakelijkheid van Finkje is in alle gevallen beperkt tot directe schade en tot maximaal het
          bedrag dat de gebruiker heeft betaald voor de diensten van Finkje in de drie maanden voorafgaand aan het
          schadeveroorzakende feit (bij kosteloos gebruik: nihil).
        </P>
        <P>8.3 Finkje is niet verantwoordelijk voor de inhoud van externe websites waarnaar het platform kan verwijzen.</P>

        <H>Artikel 9 — Privacy</H>
        <P>
          Finkje verwerkt persoonsgegevens conform de Algemene Verordening Gegevensbescherming (AVG). Zie de{" "}
          <Link href="/privacybeleid">Privacyverklaring</Link> van Finkje voor een volledig overzicht van de
          gegevensverwerking.
        </P>

        <H>Artikel 10 — Beëindiging</H>
        <P>
          10.1 Gebruikers kunnen hun profiel te allen tijde verwijderen via de accountinstellingen of door contact
          op te nemen via contact@finkje.nl.
        </P>
        <P>
          10.2 Finkje behoudt zich het recht voor een account te beëindigen of te blokkeren bij overtreding van
          deze voorwaarden of bij misbruik van het platform, zonder aansprakelijkheid.
        </P>

        <H>Artikel 11 — Toepasselijk recht en geschillen</H>
        <P>11.1 Op deze voorwaarden is uitsluitend Nederlands recht van toepassing.</P>
        <P>
          11.2 Geschillen worden bij voorkeur in goed overleg opgelost. Indien dat niet lukt, worden geschillen
          voorgelegd aan de bevoegde rechter in het arrondissement Amsterdam.
        </P>

        <H>Artikel 12 — Contact</H>
        <div className="mt-14 flex flex-col gap-2 rounded-3xl bg-sand p-7 text-[17px] leading-relaxed">
          <span className="mb-1.5 text-xs font-semibold tracking-[0.14em] text-black/45 uppercase">Contact</span>
          <a href="mailto:contact@finkje.nl">contact@finkje.nl</a>
          <a href="tel:+31108906696" className="text-[#111]">
            010 - 890 66 96
          </a>
          <span>Schiedamsesingel 187 E, 3012 BB Rotterdam</span>
          <span>KvK 95213120 · www.finkje.nl</span>
        </div>
      </section>
    </>
  );
}
