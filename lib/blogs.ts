export type BlogSection = {
  kop: string;
  tekst: string[];
};

export type Blog = {
  slug: string;
  titel: string;
  tag: string;
  datum: string;
  lead: string;
  voor: "kandidaat" | "werkgever";
  beeld: string;
  secties: BlogSection[];
};

// Ported verbatim from the Claude Design export (project/blogs.js).
export const blogs: Blog[] = [
  {
    slug: "werken-zonder-diploma",
    titel: "Werken zonder diploma: wat zijn je kansen?",
    tag: "Zonder diploma",
    datum: "Augustus 2026",
    lead: "Je kansen zijn groter dan de vacaturetekst je laat geloven. Alleen kom je er via die route zelden achter.",
    voor: "kandidaat",
    beeld: "assets/foto-bouw.jpg",
    secties: [
      {
        kop: "Solliciteren zonder diploma",
        tekst: [
          "Als je zonder diploma solliciteert, loop je vaak tegen hetzelfde aan. Je stuurt iets in, je hoort een week niets en dan komt er een bericht dat ze verder gaan met andere kandidaat. Mega frusterend en uiteindelijk niemand gesproken. Toch hoef je het niet persoonlijk op te vatten: bij een vacature met tachtig reacties moet iemand die stapel terugbrengen tot vijf gesprekken. Dat gaat op de snelste manier die er is, en dat is kijken of het gevraagde papiertje erbij zit.",
          "Maar toch, steeds meer bedrijven naar wat je kunt, hoe snel je leert en hoeveel motivatie je meebrengt. Zeker nu veel werkgevers personeel zoeken, ontstaan er kansen voor mensen die via een andere route willen binnenkomen.",
        ],
      },
      {
        kop: "Werkgevers hebben je harder nodig dan ze in de vacature toegeven",
        tekst: [
          "In vrijwel elke sector staan functies maanden open. Werkgevers merken dat de kandidaat die aan alle eisen voldoet niet komt, en dat ze intussen wel het werk moeten doen. Steeds meer bedrijven zijn daarom overgestapt op zelf opleiden. Ze zoeken iemand die het wil, en de vakkennis komt in de praktijk.",
          "Dat zie je alleen niet aan de vacature. Die staat er nog precies zo als drie jaar geleden, met dezelfde eisen erin, omdat niemand de tijd heeft gehad om hem te herschrijven. Als je afgaat op wat er staat, denk je dat je nergens welkom bent. Terwijl dezelfde werkgever bij een goed gesprek zomaar zegt dat het diploma minder belangrijk is dan hij had opgeschreven.",
        ],
      },
      {
        kop: "Zo kom je binnen",
        tekst: [
          "Wat de mensen die het wel lukt gemeen hebben, is dat iemand hun verhaal eerst hoorde. Via een kennis, een vriend of de buurvrouw. Niet toevallig: in al die gevallen kwam de motivatie voor het cv.",
          "Wij hebben Finkje precies om die reden omgedraaid. Je meld je één keer aan met wat jij wil, vult geen cv in en schrijft geen brief per vacature. Je vertelt in een aantal korte stappen wat je wil worden en waarom, wij maken daar een anoniem profiel van, en bedrijven die verder kijken dan papier nodigen jou uit. Het beste nieuws? Bedrijven die bij Finkje aangesloten zijn kijken verder dan je cv. Aanmelden kost maar een aantal minuten en is gratis, en je blijft anoniem totdat jij ja zegt.",
        ],
      },
    ],
  },
  {
    slug: "waarom-steeds-meer-mensen-werken-zonder-diploma",
    titel: "Waarom steeds meer mensen werken zonder diploma",
    tag: "Arbeidsmarkt",
    datum: "Augustus 2026",
    lead: "Het diploma is niet verdwenen. Het is alleen niet langer het enige toegangsbewijs, en dat heeft een nuchtere reden.",
    voor: "kandidaat",
    beeld: "assets/foto-keuken.jpg",
    secties: [
      {
        kop: "Er is niemand meer om op te wachten",
        tekst: [
          "Jarenlang kon een werkgever een vacature plaatsen en wachten tot de juiste kandidaat langskwam. Er waren er meestal genoeg. Dat is voorbij. In veel sectoren staan functies nu maanden open, en iedere maand dat een plek onbezet blijft, kost geld en overuren van het team dat wel is gebleven.",
          "Op een bepaald moment gaat een werkgever dan rekenen. Wachten op iemand met het juiste papiertje kost drie maanden. Iemand aannemen die het werk echt wil en zelf inwerken kost zes weken. Dat is geen ideologische keuze over diploma's, dat is de goedkoopste oplossing van de twee.",
          'Dat verklaart waarom je de laatste jaren steeds vaker leest dat een diploma "een plus" is in plaats van een eis. Niet omdat werkgevers minder streng zijn geworden, maar omdat ze het zich niet meer kunnen veroorloven.',
        ],
      },
      {
        kop: "Vakkennis blijkt sneller te leren dan gedacht",
        tekst: [
          "De tweede reden is dat bedrijven zijn gaan meten wat inwerken echt kost. Vaak minder dan ze dachten. Bij veel functies is iemand na een paar weken begeleiding productief, en na een half jaar niet meer te onderscheiden van iemand die er met een opleiding binnenkwam.",
          "Wat wel duur is, is verloop. Iemand die na vijf maanden weggaat, kost je de hele inwerkperiode plus een nieuwe wervingsronde. En daar zit de omslag: verloop hangt veel minder samen met opleiding dan met de vraag of iemand dit werk eigenlijk wel wilde doen. Iemand die reageerde omdat het de eerste vacature was die langskwam, vertrekt sneller dan iemand die dit werk zelf had uitgekozen.",
          "Zo is motivatie van een vaag pluspunt een hard selectiecriterium geworden. Niet omdat het aardiger klinkt, maar omdat het beter voorspelt.",
        ],
      },
      {
        kop: "Wat dat voor jou verandert",
        tekst: [
          "Het betekent dat je je niet langer hoeft te verontschuldigen voor wat je niet hebt. Er zit geen kracht in uitleggen waarom een ontbrekend diploma geen probleem is. Wel in duidelijk maken wat je wil gaan doen en waarom je daar geschikt voor bent.",
          "Dat vraagt wel iets anders van je dan tien keer reageren op wat er langskomt. Het vraagt dat je één keer goed nadenkt over wat je zoekt, en dat dan bij de juiste mensen terechtkomt. Precies daar is Finkje voor gemaakt. Je meldt je één keer aan, vertelt wat je wil worden, en werkgevers die daarop zitten te wachten nodigen jou uit. Zonder dat je bij elke functie opnieuw hoeft te beginnen.",
        ],
      },
    ],
  },
  {
    slug: "werken-zonder-ervaring-dit-is-hoe-je-start",
    titel: "Werken zonder ervaring: dit is hoe je start",
    tag: "Eerste stap",
    datum: "Augustus 2026",
    lead: "Iedereen vraagt ervaring en niemand wil je die geven. Die cirkel doorbreek je niet door harder te solliciteren, maar door het anders te doen.",
    voor: "kandidaat",
    beeld: "assets/foto-barista.jpg",
    secties: [
      {
        kop: 'Waar "minimaal twee jaar ervaring" echt vandaan komt',
        tekst: [
          "Die eis lijkt hard, maar is dat zelden. In de praktijk staat hij in de vacature omdat hij er de vorige keer ook stond. Iemand van HR heeft de oude tekst opgehaald, de functietitel aangepast en hem opnieuw geplaatst. Niemand heeft zich afgevraagd of het werk echt twee jaar ervaring vraagt, of hoeveel goede mensen er door die regel afvallen.",
          'Vraag een leidinggevende wat hij eigenlijk zoekt en het antwoord is bijna nooit "twee jaar ervaring". Het is: iemand die snel oppakt, die het serieus neemt en die blijft. Ervaring is daar een indicatie voor, geen bewijs. We hebben allemaal collega\'s gezien met vijf jaar op papier die er met hun hoofd niet bij waren.',
          "Dat is goed nieuws, want het betekent dat de eis onderhandelbaar is. Maar alleen als je iemand een betere reden geeft. Zonder die reden is het cv het enige waar hij op kan varen, en dan verlies je.",
        ],
      },
      {
        kop: "Je hebt meer bewijs dan je denkt",
        tekst: [
          "Veel mensen die net beginnen zetten zichzelf onnodig op nul. Ze denken dat alleen een betaalde baan meetelt en laten al het andere weg. Terwijl juist daar staat wat een werkgever wil weten. Een bijbaan waar je twee jaar bleef zegt dat je afspraken nakomt. Mantelzorg zegt dat je verantwoordelijkheid draagt. Een opleiding die je niet afmaakte hoeft geen zwart gat te zijn als je kunt vertellen wat je er wel uit meenam en waarom je bent gestopt.",
          "Zet het dus niet weg als niets. Benoem wat je eruit haalde en wat het over je zegt. Twee concrete voorbeelden werken beter dan een rij vaardigheden waar iedereen dezelfde woorden voor gebruikt.",
          "En wees eerlijk over wat je nog niet kunt. Dat klinkt tegenstrijdig, maar iemand die precies weet wat hij moet leren komt betrouwbaarder over dan iemand die zegt dat hij alles wel oppikt.",
        ],
      },
      {
        kop: "Duidelijker in plaats van breder",
        tekst: [
          "De meest gemaakte fout is breder gaan zoeken als het niet lukt. Vijftig keer hetzelfde algemene bericht sturen levert vijftig keer hetzelfde niets op, en het kost je alle energie die je nodig hebt om het één keer goed te doen.",
          "Wat wel werkt is scherper worden. Eén ding kiezen dat je echt wil, opschrijven waarom, en zorgen dat dat verhaal terechtkomt bij werkgevers die daar iets mee kunnen. Dat is precies waar Finkje voor bestaat. Je beschrijft in vier stappen welk werk je wil doen en waarom, en wij leggen dat voor aan bedrijven die iemand zoeken die het echt wil, ook zonder ervaring. Jij hoeft niets te achtervolgen: je hoort het wanneer iemand je wil spreken.",
        ],
      },
    ],
  },
  {
    slug: "museum-voor-het-cv",
    titel: "Nieuw museum zet het CV definitief in de vitrine",
    tag: "Column",
    datum: "Augustus 2026",
    lead: "Een bezoek aan een museum dat nog niet bestaat, maar dat wat ons betreft niet lang meer duurt.",
    voor: "kandidaat",
    beeld: "assets/foto-atelier-breed.jpg",
    secties: [
      {
        kop: "De eerste zaal is stil",
        tekst: [
          'Achter glas hangt een A4. Twaalf jaar van iemands leven, teruggebracht tot jaartallen en functietitels. Bezoekers buigen voorover en lezen "2019 tot 2021, medewerker". Wat die persoon daar deed staat er niet. Of hij het leuk vond staat er niet. Waar hij goed in was staat er niet.',
          "Op het bordje ernaast staat één regel: dit document besliste ooit over iemands toekomst.",
          "Een groepje blijft er wat langer staan. Iemand zegt dat het toch efficiënt was, zo'n overzicht. Een ander merkt op dat het vooral efficiënt was voor degene die het las.",
        ],
      },
      {
        kop: "Verderop wordt het ongemakkelijk",
        tekst: [
          "De volgende zaal is gewijd aan de motivatiebrief. Zeshonderd exemplaren, netjes ingelijst, en bijna allemaal beginnend met dezelfde zin over het enthousiasme waarmee de afzender reageert op de vacature. Van de zeshonderd zijn er vier tot een gesprek geleid. De reden waarom juist die vier is nooit vastgesteld.",
          "Daarachter komt de zaal die de meeste bezoekers even te veel vinden. Eén wand, van vloer tot plafond volgehangen met hetzelfde bericht: helaas gaan we verder met andere kandidaten. Duizenden keren dezelfde tekst, allemaal aan iemand gestuurd die had zitten wachten. In het midden staat een bankje. Dat blijkt geen grap te zijn.",
          "Wat de zaal zo raar maakt is niet de afwijzing zelf. Het is dat er nergens staat waarom. Bij geen enkele.",
        ],
      },
      {
        kop: "Bij de uitgang staat een vraag",
        tekst: [
          "De laatste ruimte is bijna leeg. Op de muur staat één vraag: wat wil jij eigenlijk worden? Daaronder hangt een formulier van vier stappen. Geen cv, geen brief, geen vakje voor je opleidingsniveau.",
          "Het gekke is dat dit het enige object in het museum is waar bezoekers echt bij stil blijven staan. Alsof niemand ze die vraag eerder zo direct heeft gesteld, en ze even moeten nadenken over het antwoord.",
          "Dat formulier bestaat trouwens al. Het staat bij ons, invullen kost twee minuten en het is gratis. De rest van dit museum hopen we op termijn ook echt naar de vitrine te kunnen verwijzen.",
        ],
      },
    ],
  },
  {
    slug: "administratief-werk-zonder-diploma",
    titel: "Administratief werk zonder diploma: zo ga je aan de slag",
    tag: "Zonder diploma",
    datum: "Augustus 2026",
    lead: "Administratie lijkt van buiten gesloten en is dat van binnen zelden. Wat je nodig hebt is nauwkeurigheid en vertrouwen.",
    voor: "kandidaat",
    beeld: "assets/foto-roaster.jpg",
    secties: [
      {
        kop: "Wat er in de praktijk gevraagd wordt",
        tekst: [
          "Administratief werk gaat over nauwkeurig zijn, overzicht houden en netjes communiceren met mensen die iets van je nodig hebben. Daarnaast moet je snel wegwijs raken in een systeem dat vaak ouder en eigenaardiger is dan je verwacht. Dat laatste leer je nergens anders dan op de werkvloer, want elk bedrijf doet het weer op zijn eigen manier.",
          "Dat is precies waarom de opleidingseis hier zo vaak zacht blijkt. De vaardigheden die het werk echt vragen zijn in weken op te bouwen, niet in jaren. Wat een werkgever wel moet weten is of hij je kan vertrouwen met gegevens, met facturen en met klanten aan de telefoon. Dat is een kwestie van houding.",
          "Een administratieve functie is daarmee vooral een vertrouwenskwestie. En vertrouwen wek je in een gesprek, niet met een diploma bovenaan een cv.",
        ],
      },
      {
        kop: "Zo maak je aannemelijk dat je het kunt",
        tekst: [
          "Zoek naar momenten waarop je al met details en systemen werkte, en wees daar concreet over. Een kassa die je afsloot en die moest kloppen. Een planning die je bijhield voor een team. De administratie van een vereniging. Een webshop of Marktplaats-handeltje van jezelf waarbij je zelf de voorraad en de verzendingen bijhield.",
          'Dat soort voorbeelden doet meer dan het woord "accuraat" op een cv. Ze laten zien dat je het al deed, ook al stond er geen functietitel boven. Vertel er ook bij wat er misging en hoe je dat oploste, want iemand die weet waar het bij administratie fout gaat, kijkt vooruit.',
          "Verwacht wel dat je begint met het werk dat niemand anders wil oppakken. Dat is niet vernederend, dat is hoe je een systeem leert kennen. Wie dat werk goed doet, krijgt binnen een half jaar de dingen die wel interessant zijn.",
        ],
      },
      {
        kop: "Waar de openingen zitten",
        tekst: [
          'Bij grote organisaties met een strak HR-proces kom je zonder diploma moeilijk door de eerste ronde. Bij kleinere bedrijven, installatiebedrijven, zorginstellingen en gemeentes is de druk op de administratie juist hoog en beslist vaak degene die er zelf mee zit. Daar weegt "kan snel beginnen en wil dit echt" zwaarder dan een papiertje.',
          "Het lastige is dat je die werkgevers via een vacaturesite nauwelijks vindt, want zij zoeken vaak eerst in eigen kring. Bij Finkje zet je één keer neer dat je administratief wil werken en waarom dat bij je past. Wij leggen dat voor aan werkgevers met precies die plek open, en zij nemen contact op. Je hoeft niet langs alle vacaturebanken.",
        ],
      },
    ],
  },
  {
    slug: "kantoorbaan-zonder-diploma",
    titel: "Een kantoorbaan zonder diploma: het kan echt",
    tag: "Zonder diploma",
    datum: "Augustus 2026",
    lead: "Binnenkomen op kantoor gaat zelden via de voordeur van de vacaturetekst. Dit zijn de routes die wel werken.",
    voor: "kandidaat",
    beeld: "assets/foto-video.jpg",
    secties: [
      {
        kop: "De eerste selectie is niet de baan",
        tekst: [
          "Bij kantoorfuncties gebeurt de eerste schifting bijna altijd op papier, en vaak niet door de persoon voor wie je zou gaan werken. Iemand van HR of een recruiter kijkt of het gevraagde niveau erbij staat. Kom je daar niet door, dan heeft de leidinggevende jouw naam nooit gezien.",
          "Dat is een belangrijk verschil om te begrijpen. Je bent niet afgewezen voor de baan. Je bent afgewezen door een proces dat is ontworpen om snel van tachtig naar acht te gaan. Wie dat persoonlijk neemt, houdt het na tien pogingen op, en dat is precies de verkeerde conclusie.",
          "De mensen die zonder diploma op kantoor werken, zijn er vrijwel nooit via die route binnengekomen. Bijna altijd kende iemand hun verhaal al: via een uitzendbureau, via iemand die ze kende, of doordat ze eerst iets anders deden binnen hetzelfde bedrijf en doorschoven.",
        ],
      },
      {
        kop: "Kies een rol, geen sfeer",
        tekst: [
          'Wie zegt dat hij "iets op kantoor" zoekt, maakt het voor een werkgever onmogelijk om ja te zeggen. Kantoorwerk is geen vak, het is een plek. Wat je wel kunt doen is kiezen wat je met mensen of met werk wil doen: klantcontact waarbij je problemen oplost, plannen zodat een team weet waar het aan toe is, inkoop waarbij je onderhandelt, of ondersteuning waarbij je zorgt dat anderen door kunnen.',
          "Zulke rollen leunen zwaarder op houding en taalgevoel dan op een opleiding. Wat een werkgever wil weten is of je helder kunt schrijven, of je een boze klant rustig houdt en of je zelf nadenkt als een afspraak niet haalbaar blijkt. Dat kun je in een gesprek laten zien.",
          'Kantoorwerk kost wel inwerktijd, meer dan uitvoerend werk. Een werkgever investeert dus, en wil weten dat die investering ergens landt. Iemand die dit werk zelf heeft uitgekozen en kan uitleggen waarom, is die investering waard. Iemand die "wel iets op kantoor" wil, niet.',
        ],
      },
      {
        kop: "Zo pak je het aan",
        tekst: [
          "Schrijf één keer goed op welke rol je wil, waarom die bij je past en wat je al gedaan hebt dat daarop lijkt. Ook als dat buiten een baan was. Blijf van de neiging af om dat per vacature te herschrijven naar wat er gevraagd wordt, want dan verdwijnt precies het stuk dat je onderscheidt.",
          "Bij Finkje leggen we dat verhaal anoniem voor aan bedrijven die verder kijken dan het cv, en zij nodigen jou uit als het past. Geen eerste selectie op opleidingsniveau, geen stapel afwijzingen, en je gegevens gaan pas naar iemand op het moment dat jij dat wil.",
        ],
      },
    ],
  },
  {
    slug: "werken-in-de-zorg-zonder-diploma",
    titel: "Werken in de zorg zonder diploma: wat zijn de mogelijkheden?",
    tag: "Zorg",
    datum: "Augustus 2026",
    lead: "De zorg zoekt niet alleen verpleegkundigen. Er is minstens zoveel behoefte aan aandacht, rust en betrouwbaarheid.",
    voor: "kandidaat",
    beeld: "assets/foto-leerkracht.jpg",
    secties: [
      {
        kop: "Er is meer werk dan alleen de zorgtaken",
        tekst: [
          "Wie aan de zorg denkt, denkt aan medische handelingen waar een opleiding voor nodig is. Dat is een deel van het werk. Het grootste deel van een dag op een afdeling gaat over iets anders: iemand helpen met opstaan, aandacht geven aan wie de hele dag niemand ziet, zorgen dat er gegeten wordt, opmerken dat iemand stiller is dan gisteren.",
          "Voor dat werk is de drempel veel lager dan mensen denken, en de behoefte veel groter. Sterker nog, het is vaak het eerste dat sneuvelt als een team te dun bezet is. Dan wordt de zorg technisch nog wel gegeven, maar verdwijnt precies het stukje waar het voor de bewoner om gaat.",
          "Als je daar goed in bent, ben je op dit moment in vrijwel elke instelling welkom. Niet als opvulling, maar omdat dat deel van het werk anders niet gebeurt.",
        ],
      },
      {
        kop: "Wat het echt van je vraagt",
        tekst: [
          "Het is eerlijk om te zeggen dat dit geen makkelijk werk is. Je hebt geduld nodig op momenten dat het niet uitkomt, rust als iemand in de war is, en het vermogen om niet weg te kijken als het zwaar wordt. Je maakt achteruitgang mee en soms overlijden. Dat kun je niet aan een diploma zien en het is de belangrijkste reden dat mensen afhaken.",
          "Daar tegenover staat iets wat weinig werk je geeft: aan het eind van je dienst weet je precies voor wie je het deed. Veel mensen die vanuit een andere sector overstappen, noemen dat als de reden dat ze niet meer terug willen.",
          "Wees dus vooral eerlijk tegen jezelf voordat je begint, en eerlijk in het gesprek. Een instelling heeft niets aan iemand die het na drie maanden niet meer volhoudt, en jij hebt daar zelf nog minder aan.",
        ],
      },
      {
        kop: "Opleiden doen ze graag zelf",
        tekst: [
          "Veel zorgorganisaties zijn overgestapt op leren en werken tegelijk. Je begint met begeleiding, doet in het begin de taken waarvoor geen bevoegdheid nodig is, en haalt onderweg je papieren terwijl je wordt doorbetaald. Voor hen is dat de enige manier om aan mensen te komen, dus die deur staat verder open dan je zou denken.",
          "Wat ze bij die trajecten zoeken is niet het beste cv, maar iemand die er echt voor kiest. De uitval is namelijk hoog, en elke opleidingsplek die halverwege stopt kost hen een jaar. Kun je uitleggen waarom je dit wil en waarom het bij jou past, dan is dat het sterkste dat je kunt meenemen.",
          "Bij Finkje meld je je één keer aan en vertel je waarom je in de zorg wil werken. Zorginstellingen die bij ons zoeken kijken naar die motivatie en nodigen jou uit als het past. Gratis, en anoniem tot jij zelf ja zegt.",
        ],
      },
    ],
  },
  {
    slug: "werk-zonder-werkervaring",
    titel: "Werk vinden zonder werkervaring: motivatie wint het van je cv",
    tag: "Eerste stap",
    datum: "Augustus 2026",
    lead: "Zonder ervaring val je op papier altijd af. Dus moet je zorgen dat het gesprek niet op papier begint.",
    voor: "kandidaat",
    beeld: "assets/foto-hero.jpg",
    secties: [
      {
        kop: "Een cv kijkt de verkeerde kant op",
        tekst: [
          "Een cv is een terugblik. Het vat samen wat er achter je ligt. Als dat nog niet veel is, doet het precies het tegenovergestelde van wat je wil: het laat vooral zien wat je nog niet hebt gedaan.",
          "Het rare is dat de vraag van de werkgever helemaal niet achteruit kijkt. Hij wil weten of dit gaat werken. Of je het leuk gaat vinden, of je het oppakt, of je er over een jaar nog zit. Dat zijn allemaal vragen over de toekomst, en daarvoor gebruikt hij bij gebrek aan iets beters jouw verleden als voorspeller.",
          "Dat is dus geen onwil, het is een informatieprobleem. Geef je hem iets beters om op te varen, dan gebruikt hij dat graag. Geef je hem niets, dan blijft het cv over.",
        ],
      },
      {
        kop: "Wat een werkgever echt overtuigt",
        tekst: [
          "Het beste argument dat je hebt, is precies zijn over wat je wil en waarom. Niet een lijstje eigenschappen dat iedereen opschrijft, maar een concrete zin over het werk zelf. Iemand die zegt dat hij met zijn handen wil werken en iets af wil maken aan het eind van de dag, zegt in één zin meer dan een half A4 met vaardigheden. Het maakt ook meteen duidelijk bij welke werkgever hij past.",
          "Wat daar bijkomt is een reden om te geloven dat je doorzet. Dat hoeft geen baan te zijn. Iets waar je lang mee bezig bleef terwijl het moeilijk werd is genoeg, of het nou een sport, een studie of het regelen van iets thuis was.",
          "En wees niet bang om te zeggen wat je nog moet leren. Werkgevers die eerder iemand zonder ervaring hebben aangenomen weten het al: iemand die het echt wil, leert sneller dan iemand met ervaring die het niet meer ziet zitten. Ze hebben alleen een reden nodig om te denken dat jij die eerste bent.",
        ],
      },
      {
        kop: "Zorg dat dat verhaal ergens landt",
        tekst: [
          "Dat verhaal helpt je natuurlijk alleen als iemand het leest. Bij een gewone sollicitatie zit het onderaan, achter de eerste selectie op cv, en komt het dus vaak nooit aan.",
          "Daarom is bij Finkje de motivatie het startpunt en niet de bijlage. Je meldt je één keer aan, wij maken er een anoniem profiel van, en werkgevers die iemand zoeken die het werk echt wil, nodigen jou uit. Aanmelden kost twee minuten, blijft gratis, en je hoort alleen van bedrijven die je willen spreken.",
        ],
      },
    ],
  },
  {
    slug: "van-sector-wisselen-zonder-ervaring",
    titel: "Van sector wisselen zonder ervaring in de nieuwe branche",
    tag: "Omschakelen",
    datum: "Augustus 2026",
    lead: "Overstappen voelt als opnieuw beginnen. Op papier is dat zo, in de praktijk neem je meer mee dan je denkt.",
    voor: "kandidaat",
    beeld: "assets/foto-kunstenaar.jpg",
    secties: [
      {
        kop: "Je begint niet bij nul, het staat alleen onder de verkeerde kop",
        tekst: [
          "Wie jaren in de horeca stond, kan werken onder druk, weet hoe je een boze klant rustig houdt en heeft geleerd om vooruit te denken tijdens een drukke dienst. Wie in de bouw werkte, weet wat het betekent als een afspraak niet wordt nagekomen en hoe je met een ploeg iets af krijgt. Dat is in elke sector waardevol.",
          'Het probleem is dat het op je cv onder een functietitel staat die niets zegt in de nieuwe branche. Iemand leest "medewerker horeca" en denkt: geen ervaring bij ons. Terwijl je vaardigheden grotendeels overdraagbaar zijn en alleen de vakkennis nieuw is.',
          "Jouw werk bij een overstap is dus vooral vertaalwerk. Niet vertellen wat je functie was, maar wat je erin deed en wat daarvan hier bruikbaar is.",
        ],
      },
      {
        kop: "Maak van de reden je sterkste punt",
        tekst: [
          "Bij een sollicitatie wordt een switch vaak gelezen als risico. Waarom gaat iemand weg bij iets waar hij goed in was, en blijft hij dan wel bij ons? Die vraag komt altijd, en in twee regels op een cv kun je hem niet beantwoorden.",
          "Draai het daarom om. Een overstap is geen zwakte, het is een keuze die je hebt gemaakt omdat je nu weet wat je niet wil. Wie dat helder kan uitleggen, en er ook bij zegt wat hij in de nieuwe sector juist zoekt, komt betrouwbaarder over dan iemand die zegt dat hij openstaat voor alles.",
          "Wees ook realistisch over de eerste periode. Je stapt mogelijk een stap terug in verantwoordelijkheid of salaris, en het helpt als je dat zelf benoemt in plaats van het te laten gebeuren. Dat laat zien dat je hebt nagedacht en niet impulsief zit te switchen.",
        ],
      },
      {
        kop: "Eén keer uitleggen in plaats van twintig keer",
        tekst: [
          "Het vermoeiende aan een overstap is dat je hetzelfde verhaal bij elke sollicitatie opnieuw moet opbouwen, en dat je bij de meeste nooit hoort of het overkwam.",
          "Bij Finkje schrijf je het één keer. Wat je wil gaan doen, waarom je overstapt en wat je meeneemt. Werkgevers uit de sector waar je naartoe wil zien dat en nodigen je uit als het past. Zij weten dan al waarom je er zit, dus dat gesprek begint een stuk verder dan bij een gewone sollicitatie.",
        ],
      },
    ],
  },
  {
    slug: "eerste-baan-na-werkloosheid",
    titel: "Je eerste baan na een periode van werkloosheid",
    tag: "Herstart",
    datum: "Augustus 2026",
    lead: "Een gat in je cv is uit te leggen. Het lastige is dat je bij een sollicitatie zelden de ruimte krijgt om dat te doen.",
    voor: "kandidaat",
    beeld: "assets/foto-fotograaf.jpg",
    secties: [
      {
        kop: "Het gat is minder bijzonder dan het voelt",
        tekst: [
          "Ziekte, mantelzorg, een burn-out, een reorganisatie, of gewoon een periode waarin het niet lukte. Dat overkomt heel veel mensen, en de meeste werkgevers weten dat ook. Toch voelt het alsof jij de enige bent, omdat je er in een sollicitatieproces steeds op wordt teruggebracht.",
          "Wat het moeilijk maakt, is dat het gat vaak het eerste is waar iemand naar kijkt en het laatste waar je over mag praten. Je krijgt twee regels in een brief, en die gebruik je dan aan uitleggen in plaats van aan vertellen wat je wil.",
          "Dat is precies de verkeerde verdeling. Het gat is een feit dat je in één zin kunt afhandelen. Wat je nu wil gaan doen is het gesprek waard.",
        ],
      },
      {
        kop: "Begin bij wat je nu wil",
        tekst: [
          "Wees kort en eerlijk over de periode. Je hoeft er geen medisch dossier bij te leveren en je hoeft je ook niet te verontschuldigen. Eén zin over wat er was en één zin over waarom het nu anders is, is genoeg. Wie er langer over doorpraat, maakt het groter dan het is.",
          "Besteed je energie daarna aan de toekomst. Wat wil je gaan doen, waarom nu wel, en wat heb je in die tussentijd geleerd over wat je zoekt. Veel mensen komen uit zo'n periode met een scherper beeld van wat ze willen dan de gemiddelde sollicitant. Dat is een voordeel, gebruik het.",
          "Wees daarbij ook eerlijk over wat je nodig hebt. Rustig opstarten, vaste uren, een werkgever die het weet: als je dat vooraf benoemt, voorkom je dat het na twee maanden alsnog wringt.",
        ],
      },
      {
        kop: "Zoek de werkgevers die dit al eerder zagen",
        tekst: [
          "Ze bestaan, en het zijn er meer dan je denkt. Vaak zijn het bedrijven die zelf iemand hebben zien terugkomen na een moeilijke tijd, en die weten dat zo iemand loyaler kan zijn dan wie ook. Die werkgevers vragen niet naar het gat, maar naar de motivatie.",
          "Bij Finkje vragen we in het aanmeldformulier ook waar je tegenaan loopt. Niet om je af te wijzen, maar omdat het helpt om je bij de juiste werkgever te krijgen. Je meldt je één keer aan en hoort alleen van bedrijven die je willen spreken. Geen stapel afwijzingen meer in je inbox, en anoniem tot jij zelf ja zegt.",
        ],
      },
    ],
  },
  {
    slug: "studenten",
    titel: "Werk vinden als student: zo val je op zonder werkervaring",
    tag: "Studenten",
    datum: "Augustus 2026",
    lead: "Weinig ervaring, weinig tijd en veel concurrentie. Precies daarom werkt het niet om hetzelfde te doen als de rest.",
    voor: "kandidaat",
    beeld: "assets/foto-dj.jpg",
    secties: [
      {
        kop: "Waarom je op papier niet opvalt",
        tekst: [
          "Op een studentenbaan reageren makkelijk tweehonderd mensen, en hun cv's lijken op elkaar. Dezelfde leeftijd, dezelfde studie, dezelfde bijbaan in de supermarkt. Voor de werkgever is er dus weinig te kiezen, dus kiest hij op iets anders: wie het snelst reageerde, wie op zaterdag kan, of wie hij ergens van kent.",
          "Dat betekent dat je energie in een mooier cv nauwelijks iets oplevert. Je concurreert niet op kwaliteit, je concurreert op onderscheid, en dat zit niet in je opleiding.",
          "Het zit in twee dingen: wat je precies wil doen, en hoe duidelijk je bent over wanneer je kan. Dat tweede wordt vaak onderschat. Voor een werkgever die een rooster moet vullen, is duidelijkheid over je beschikbaarheid een van de waardevolste dingen die je kunt geven.",
        ],
      },
      {
        kop: "Kies een bijbaan die ergens naartoe leidt",
        tekst: [
          "De meeste studenten zoeken werk op basis van uurloon en reisafstand. Begrijpelijk, maar het laat iets liggen. Een bijbaan in de richting van wat je later wil doen, is dubbel waard: je verdient nu en je bouwt aan het verhaal dat je straks nodig hebt.",
          "Dat hoeft niet perfect te passen. Wil je later met mensen werken, dan is elke baan met klantcontact bruikbaar. Wil je iets met organiseren, dan leert een baan waarin je diensten of voorraad regelt je meer dan vakken vullen.",
          "Denk ook aan wat je overhoudt aan de manier waarop je het doet. Wie ergens twee jaar blijft en verantwoordelijkheid krijgt, heeft daar bij zijn eerste echte sollicitatie meer aan dan wie vier keer een half jaar iets deed.",
        ],
      },
      {
        kop: "Laat werkgevers jou vinden",
        tekst: [
          "Wat de meeste tijd kost aan werk zoeken als student is niet het gesprek, het is het zoeken zelf. Elke week vacatures langsgaan naast je tentamens houdt niemand vol.",
          "Bij Finkje meld je je één keer aan, geef je aan wat je wil doen en hoeveel uur je kwijt kan, en leggen wij dat voor aan werkgevers die studenten zoeken. Zij nemen contact op als het past, dus je hoeft er niet elke week achteraan. Het is gratis en je aanmelding blijft staan, ook als je nu nog niet met spoed iets nodig hebt.",
        ],
      },
    ],
  },
  {
    slug: "nieuwe-medewerker-zonder-werkervaring",
    titel: "Nieuwe medewerker aannemen zonder werkervaring: zo werkt het",
    tag: "Voor werkgevers",
    datum: "Augustus 2026",
    lead: "Iemand zonder ervaring aannemen voelt als een risico nemen. Met de juiste selectie is het vaak de veiligere keuze.",
    voor: "werkgever",
    beeld: "assets/foto-werkervaring.png",
    secties: [
      {
        kop: "Ervaring voorspelt minder dan je hoopt",
        tekst: [
          "Twee jaar ervaring vertelt je dat iemand dit werk eerder deed. Het vertelt je niet of hij het graag deed, of hij het goed deed, of hoe lang hij bleef. Toch is het in de meeste selecties het zwaarst wegende criterium, simpelweg omdat het het makkelijkst te controleren is.",
          "Kijk je naar wat een aanname duur maakt, dan is dat zelden een gebrek aan vakkennis. Het is verloop. Iemand die na vijf maanden vertrekt, kost je de inwerkperiode, de aandacht van het team en een nieuwe wervingsronde. En verloop hangt veel sterker samen met de vraag of iemand dit werk eigenlijk wel wilde doen dan met zijn cv.",
          "Dat maakt motivatie geen zachte factor maar de belangrijkste voorspeller die je hebt. Het probleem is dat motivatie in een gewone sollicitatie juist het moeilijkst te meten is.",
        ],
      },
      {
        kop: "Waarom de vacaturetekst je in de weg zit",
        tekst: [
          "Zodra iemand een functietitel en een lijst eisen leest, gaat hij zich daarnaar schrijven. Dat is geen oneerlijkheid, dat is precies wat wij mensen leren: sluit aan bij wat er gevraagd wordt. Het gevolg is dat je in de brief het antwoord terugleest dat je zelf hebt voorgezegd, en dat je na de eerste ronde nog niets weet over wat die persoon zelf wil.",
          "Daarom laten wij jouw vacature niet zien. Bij Finkje schrijven mensen eerst op wat ze willen worden en waarom, zonder dat er een vacature in zicht is. Wat daaruit komt is niet aangepast aan jou, en dat maakt het bruikbaar.",
          "Past jouw functie op wat iemand zelf al had opgeschreven, dan spreek je iemand die er ja tegen had gezegd voordat de vacature bestond. Dat gesprek gaat over het werk in plaats van over het cv, en je merkt binnen tien minuten of het klopt.",
        ],
      },
      {
        kop: "Zo verklein je het risico in de praktijk",
        tekst: [
          "Selecteer op wil en houding, en maak de inwerkperiode daarna expliciet. Wie leidt op, wat moet iemand na vier weken zelfstandig kunnen, wanneer evalueer je. Dat is voor beide kanten eerlijk en het haalt de onzekerheid uit de beslissing: je weet binnen een maand of het werkt in plaats van na een half jaar.",
          "Zet er ook één iemand in het team op die de begeleiding echt oppakt. De meeste mislukte aannames zonder ervaring gaan daar mis en niet bij de selectie.",
          "Wil je zien wie er nu al staat: de profielen bij ons zijn vrij te bekijken, ook zonder dat je een vacature plaatst. Plaats je er wel een, dan komt die nergens openbaar en hoor je binnen één werkdag of we iemand hebben. Zo niet, dan houden we hem intern actief tot je sluitingsdatum.",
        ],
      },
    ],
  },
  {
    slug: "gratis-personeel-vinden",
    titel: "Gratis personeel vinden, zonder vacaturekosten of bureau",
    tag: "Voor werkgevers",
    datum: "Augustus 2026",
    lead: "Wervingskosten lopen hard op, en het duurste zit niet in de plaatsing. Het zit in de mismatch.",
    voor: "werkgever",
    beeld: "assets/foto-oprichters.jpeg",
    secties: [
      {
        kop: "Waar het geld normaal blijft",
        tekst: [
          "Een vacature plaatsen kost geld, en een bureau kost een percentage van het jaarsalaris. Dat zijn de kosten die je ziet. Daarnaast zit er een rekening die zelden wordt opgeteld: de uren die je eigen mensen kwijt zijn aan het lezen van tientallen reacties waarvan de meeste niet passen, en de weken die verstrijken terwijl het werk blijft liggen.",
          "De grootste kostenpost is echter de mismatch. Gaat iemand binnen het jaar weg, dan betaal je de hele ronde opnieuw, plus de inwerktijd die je al hebt geïnvesteerd. Bij een startsalaris van rond de dertigduizend euro loopt dat snel op tot een veelvoud van wat de plaatsing kostte.",
          "Als je daar iets aan wil doen, is korten op de plaatsingskosten niet de oplossing. Beter selecteren is dat wel.",
        ],
      },
      {
        kop: "Begin bij motivatie in plaats van bij een vacature",
        tekst: [
          "Bij Finkje meldt iedereen zich uit eigen beweging aan en schrijft op wat hij wil worden en waarom, zonder dat er een vacature tegenover staat. Dat verandert wat je te zien krijgt. Je leest geen tekst die naar jouw eisen is toegeschreven, maar wat iemand zelf zocht.",
          "Die profielen zijn vrij te bekijken, ook als je op dit moment geen vacature hebt. Voor veel werkgevers is dat het nuttigste stuk: je ziet welke mensen jouw soort werk zoeken en tegen welke voorwaarden, nog voordat je iets plaatst.",
          "Wil je iemand spreken, dan stuur je een uitnodiging via ons. Naam en contactgegevens komen vrij zodra die persoon ja zegt, en daarna doen wij niets meer. Het gesprek is van jullie samen.",
        ],
      },
      {
        kop: "En wat het kost",
        tekst: [
          "Op dit moment niets. Geen plaatsingskosten, geen abonnement en geen fee bij een match. Dat is geen introductietruc met kleine lettertjes: wij bouwen aan het netwerk en hebben werkgevers nodig die de eerste mensen aannemen, dus die uitwisseling is voor nu eerlijk in beide richtingen.",
          "Plaats je een vacature, dan komt die nergens openbaar te staan. Wij leggen hem intern voor aan iedereen die past. Binnen één werkdag laten we weten of we iemand hebben, en zo niet houden we hem actief tot je sluitingsdatum, zodat mensen die zich daarna aanmelden nog kunnen aansluiten.",
        ],
      },
    ],
  },
];

// Local photo overrides: which blogs have a real dropped photo (from the
// Claude Design image-slot sidecar) vs. falling back to their `beeld` asset.
const localImage: Record<string, string> = {
  "werken-zonder-diploma": "/images/blogfoto-werken-zonder-diploma.webp",
  "waarom-steeds-meer-mensen-werken-zonder-diploma":
    "/images/blogfoto-waarom-steeds-meer-mensen-werken-zonder-diploma.jpg",
  "werken-zonder-ervaring-dit-is-hoe-je-start":
    "/images/blogfoto-werken-zonder-ervaring-dit-is-hoe-je-start.jpg",
  "museum-voor-het-cv": "/images/blogfoto-museum-voor-het-cv.jpg",
  "administratief-werk-zonder-diploma":
    "/images/blogfoto-administratief-werk-zonder-diploma.webp",
  "kantoorbaan-zonder-diploma": "/images/blogfoto-kantoorbaan-zonder-diploma.webp",
  "werken-in-de-zorg-zonder-diploma":
    "/images/blogfoto-werken-in-de-zorg-zonder-diploma.jpg",
  "werk-zonder-werkervaring": "/images/blogfoto-werk-zonder-werkervaring.jpg",
  "van-sector-wisselen-zonder-ervaring":
    "/images/blogfoto-van-sector-wisselen-zonder-ervaring.webp",
  "eerste-baan-na-werkloosheid": "/images/blogfoto-eerste-baan-na-werkloosheid.webp",
  studenten: "/images/blogfoto-studenten.webp",
  "nieuwe-medewerker-zonder-werkervaring":
    "/images/blogfoto-nieuwe-medewerker-zonder-werkervaring.webp",
  "gratis-personeel-vinden": "/images/blogfoto-gratis-personeel-vinden.jpg",
};

export function blogImage(slug: string): string {
  return localImage[slug] ?? "/images/finkje-waarom.webp";
}

export function getBlog(slug: string): Blog | undefined {
  return blogs.find((b) => b.slug === slug);
}
