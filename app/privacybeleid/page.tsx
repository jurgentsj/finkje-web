import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacyverklaring — Finkje",
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

export default function PrivacyPage() {
  return (
    <>
      <section className="mx-auto max-w-[820px] px-6 pt-18">
        <p className="m-0 mb-6 text-xs font-semibold tracking-[0.16em] text-accent uppercase">Juridisch</p>
        <h1 className="m-0 font-display text-[clamp(34px,5.6vw,72px)] leading-[0.92] font-extrabold tracking-[-0.05em]">
          Privacyverklaring
        </h1>
        <p className="mt-5 text-base text-black/50">Versie 1.0 — 29 juni 2026</p>
      </section>

      <section className="mx-auto max-w-[820px] px-6 pt-6 pb-28">
        <H>1. Wie zijn wij?</H>
        <P>
          Finkje is een platform dat bedrijven en gemotiveerde kandidaten gratis met elkaar verbindt. Finkje is
          ingeschreven bij de Kamer van Koophandel onder nummer 95213120 en is bereikbaar via contact@finkje.nl.
        </P>
        <P>
          Als je gebruik maakt van ons platform, verwerken wij persoonsgegevens. In deze privacyverklaring leggen
          wij uit welke gegevens dat zijn, waarom we die verwerken en wat jouw rechten zijn.
        </P>

        <H>2. Welke persoonsgegevens verwerken wij?</H>
        <P>
          <strong>2.1 Kandidaten.</strong> Wanneer je als kandidaat een profiel aanmaakt op Finkje, verwerken wij:
        </P>
        <Ul>
          <li>Naam en contactgegevens (e-mailadres, telefoonnummer)</li>
          <li>Opleidingsniveau en vaardigheden</li>
          <li>Beschikbaarheid en gewenste functie</li>
          <li>Door jou opgegeven citaten en persoonlijke teksten</li>
        </Ul>
        <P>
          <strong>2.2 Werkgevers.</strong> Wanneer je als werkgever gebruik maakt van ons platform, verwerken wij:
        </P>
        <Ul>
          <li>Naam en functietitel contactpersoon</li>
          <li>Zakelijk e-mailadres en telefoonnummer</li>
          <li>Bedrijfsnaam, KvK-nummer en vestigingsadres</li>
          <li>Informatie over vacatures en zoekopdrachten</li>
        </Ul>
        <P>
          <strong>2.3 Websitebezoekers.</strong> Bij bezoek aan onze website verwerken wij anonieme analytische
          gegevens (paginabezoeken, klikgedrag) via cookies. Zie ons cookiebeleid voor meer informatie.
        </P>

        <H>3. Waarom verwerken wij jouw gegevens?</H>
        <P>Finkje verwerkt persoonsgegevens uitsluitend voor de volgende doeleinden:</P>
        <Ul>
          <li>Het tot stand brengen van een koppeling tussen kandidaat en werkgever (uitvoering overeenkomst).</li>
          <li>Het aanmaken en beheren van profielen op het platform (uitvoering overeenkomst).</li>
          <li>Het verbeteren van onze dienstverlening (gerechtvaardigd belang).</li>
          <li>Het voldoen aan wettelijke verplichtingen (wettelijke verplichting).</li>
          <li>Het verzenden van relevante informatie over Finkje, mits toestemming is gegeven.</li>
        </Ul>

        <H>4. Hoe lang bewaren wij jouw gegevens?</H>
        <P>Wij bewaren persoonsgegevens niet langer dan noodzakelijk voor het doel waarvoor ze zijn verzameld:</P>
        <Ul>
          <li>Kandidaatprofielen: zo lang het profiel actief is, plus maximaal 12 maanden na laatste activiteit.</li>
          <li>Werkgeversgegevens: zo lang de zakelijke relatie duurt, plus maximaal 2 jaar daarna.</li>
          <li>Analytische websitedata: maximaal 14 maanden (geanonimiseerd).</li>
        </Ul>
        <P>Na verloop van deze termijnen worden gegevens veilig verwijderd of geanonimiseerd.</P>

        <H>5. Delen wij jouw gegevens?</H>
        <P>Finkje verkoopt nooit persoonsgegevens aan derden. Wij delen gegevens uitsluitend:</P>
        <Ul>
          <li>Met werkgevers die een koppeling willen maken met een kandidaat, en vice versa. Dit is de kernfunctie van het platform.</li>
          <li>Met technische dienstverleners (hosting, e-mail) die als verwerker optreden en gebonden zijn aan een verwerkersovereenkomst.</li>
          <li>Met overheidsinstanties, indien wettelijk verplicht.</li>
        </Ul>

        <H>6. Beveiliging</H>
        <P>
          Wij nemen passende technische en organisatorische maatregelen om persoonsgegevens te beschermen tegen
          verlies, ongeautoriseerde toegang of misbruik. Dit omvat onder meer versleutelde verbindingen (HTTPS),
          beperkte toegangsrechten en regelmatige beveiligingscontroles.
        </P>

        <H>7. Jouw rechten</H>
        <P>Op grond van de Algemene Verordening Gegevensbescherming (AVG) heb jij de volgende rechten:</P>
        <Ul>
          <li>Recht op inzage in jouw persoonsgegevens.</li>
          <li>Recht op rectificatie van onjuiste gegevens.</li>
          <li>Recht op verwijdering (&ldquo;recht om vergeten te worden&rdquo;).</li>
          <li>Recht op beperking van de verwerking.</li>
          <li>Recht op gegevensoverdraagbaarheid (dataportabiliteit).</li>
          <li>Recht van bezwaar tegen verwerking op basis van gerechtvaardigd belang.</li>
        </Ul>
        <P>Een verzoek indienen kan via contact@finkje.nl. Wij reageren binnen 30 dagen.</P>
        <P>
          Ben je het niet eens met hoe wij met jouw gegevens omgaan, dan heb je het recht om een klacht in te
          dienen bij de Autoriteit Persoonsgegevens (autoriteitpersoonsgegevens.nl).
        </P>

        <H>8. Cookies</H>
        <P>
          Finkje maakt gebruik van functionele cookies (noodzakelijk voor de werking van het platform) en
          analytische cookies (zonder persoonsgegevens, gericht op verbetering van de website). Bij het eerste
          bezoek vragen wij om toestemming voor niet-functionele cookies.
        </P>

        <H>9. Wijzigingen</H>
        <P>
          Finkje behoudt het recht deze privacyverklaring aan te passen. Bij wezenlijke wijzigingen informeren wij
          gebruikers per e-mail of via een melding op het platform. De actuele versie is altijd beschikbaar op onze
          website.
        </P>

        <H>10. Contact</H>
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
