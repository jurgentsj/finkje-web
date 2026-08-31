// Finkje — account, inloggen en dashboards.
// Losse component: alleen React, geen Tailwind of andere dependencies.
// In v0: nieuw bestand aanmaken, dit erin plakken, en <FinkjeAccount /> renderen.

import React, { useState } from "react";

/* ---------- tokens ---------- */
const ACCENT = "#FF5A00";
const INK = "#111111";
const ZAND = "#F6F5F2";
const LIJN = "rgba(17,17,17,0.14)";
const FONT = "'Inter', system-ui, -apple-system, sans-serif";
const DISPLAY = "'Montserrat', " + FONT;

const veld = {
  background: "#fff",
  border: "1px solid rgba(17,17,17,0.16)",
  borderRadius: 10,
  padding: "13px 14px",
  fontSize: 15.5,
  fontFamily: "inherit",
  color: INK,
  width: "100%",
  boxSizing: "border-box",
};
const label = { fontSize: 15, fontWeight: 600, color: "rgba(17,17,17,0.72)" };
const kaart = {
  border: "1px solid " + LIJN,
  borderRadius: 6,
  background: "#fff",
  padding: 28,
  display: "flex",
  flexDirection: "column",
  gap: 22,
};
const kaartKop = {
  fontSize: 12,
  fontWeight: 700,
  letterSpacing: "0.13em",
  textTransform: "uppercase",
  color: "rgba(17,17,17,0.45)",
  paddingBottom: 16,
  borderBottom: "1px solid rgba(17,17,17,0.1)",
};
const knop = {
  background: ACCENT,
  color: "#fff",
  border: 0,
  borderRadius: 999,
  padding: "16px 28px",
  fontSize: 16.5,
  fontWeight: 600,
  fontFamily: "inherit",
  cursor: "pointer",
};
const knopStil = {
  ...knop,
  background: "none",
  color: INK,
  border: "1px solid rgba(17,17,17,0.2)",
};

/* ---------- keuzelijsten (één bron voor formulier én dashboard) ---------- */
const SECTOREN = ["", "Zorg & welzijn", "Techniek & bouw", "Horeca & retail", "Logistiek & transport", "Kantoor & administratie", "Creatief & design", "Onderwijs & kinderopvang", "Maakt me niet uit"];
const ERVARING = ["", "Geen ervaring in deze sector", "Minder dan 1 jaar", "1–3 jaar", "3–5 jaar", "5–10 jaar", "10+ jaar", "Zeg ik liever niet"];
const REISAFSTAND = ["", "Tot 10 km", "Tot 25 km", "Tot 50 km", "Maakt me niet uit"];
const OPZEGTERMIJN = ["", "Per direct", "Binnen een maand", "Binnen drie maanden", "Ik kijk rond"];
const OMGEVINGEN = ["Startup", "MKB", "Corporate", "Non-profit / NGO", "Publieke sector", "Ik vind alles wel leuk"];
const OVER_HEB_JE = ["Verhuizen", "Verder reizen", "Omscholen", "Avonddiensten", "Weekenden", "Fysiek werk", "Snel starten", "Opleiding volgen"];
const STATUSSEN = ["Ik ben actief op zoek", "Ik sta open voor mijn droombaan", "Nu even niet"];
const UREN_OPTIES = ["Fulltime", "Parttime", "Flexibel"];

const LEEG_KANDIDAAT = {
  droombaan: "", sterk: "", tegenaan: "",
  omgevingen: [], overs: [], sector: "", ervaring: "",
  naam: "", locatie: "", reisafstand: "", email: "", telefoon: "",
  beschikbaarheid: "", uren: 32,
};
const LEEG_BEDRIJF = {
  naam: "", plaats: "", website: "",
  contactpersoon: "", email: "", telefoon: "",
};

/* ---------- kleine bouwstenen ---------- */
function Veld({ titel, waarde, zet, type, placeholder }) {
  return (
    <label style={{ display: "flex", flexDirection: "column", gap: 7, minWidth: 0 }}>
      <span style={label}>{titel}</span>
      <input type={type || "text"} value={waarde} placeholder={placeholder} onChange={(e) => zet(e.target.value)} style={veld} />
    </label>
  );
}

function Tekstvak({ titel, waarde, zet, rijen, hint }) {
  return (
    <label style={{ display: "flex", flexDirection: "column", gap: 7 }}>
      <span style={label}>{titel}</span>
      <textarea rows={rijen || 3} value={waarde} onChange={(e) => zet(e.target.value)} style={{ ...veld, lineHeight: 1.6, resize: "vertical" }} />
      {hint ? <span style={{ fontSize: 13, color: "rgba(17,17,17,0.45)" }}>{hint}</span> : null}
    </label>
  );
}

function Keuze({ titel, waarde, zet, opties }) {
  return (
    <label style={{ display: "flex", flexDirection: "column", gap: 7, minWidth: 0 }}>
      <span style={label}>{titel}</span>
      <select value={waarde} onChange={(e) => zet(e.target.value)} style={veld}>
        {opties.map((o) => (
          <option key={o} value={o}>{o || "Kies…"}</option>
        ))}
      </select>
    </label>
  );
}

function Chips({ titel, opties, gekozen, wissel }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 9 }}>
      <span style={label}>{titel}</span>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 7 }}>
        {opties.map((o) => {
          const aan = gekozen.indexOf(o) !== -1;
          return (
            <button key={o} type="button" onClick={() => wissel(o)} style={{
              border: "1px solid " + (aan ? ACCENT : "rgba(17,17,17,0.16)"),
              background: aan ? ACCENT : "#fff",
              color: aan ? "#fff" : INK,
              padding: "11px 20px", borderRadius: 999,
              fontSize: 15, fontWeight: 600, fontFamily: "inherit", cursor: "pointer",
            }}>{o}</button>
          );
        })}
      </div>
    </div>
  );
}

function ZijNav({ titel, actief, klik, sub }) {
  return (
    <button onClick={klik} style={{
      textAlign: "left", border: 0,
      borderLeft: "2px solid " + (actief ? INK : "transparent"),
      padding: sub ? "10px 12px 10px 24px" : "10px 12px",
      fontSize: 15, fontWeight: actief ? 600 : 500,
      fontFamily: "inherit", cursor: "pointer",
      background: "transparent",
      color: actief ? INK : "rgba(17,17,17,0.55)",
    }}>{titel}</button>
  );
}

function Pil({ soort }) {
  const kleuren = {
    nieuw: ["#fff", ACCENT],
    match: ["#1E7A52", "rgba(30,122,82,0.12)"],
    wacht: ["rgba(17,17,17,0.6)", "rgba(17,17,17,0.08)"],
    online: ["#1E7A52", "rgba(30,122,82,0.12)"],
    pauze: ["rgba(17,17,17,0.6)", "rgba(17,17,17,0.08)"],
  }[soort] || ["rgba(17,17,17,0.6)", "rgba(17,17,17,0.08)"];
  const tekst = { nieuw: "Nieuw", match: "Gekoppeld", wacht: "Wacht op antwoord", online: "Online", pauze: "Op pauze" }[soort] || soort;
  return (
    <span style={{
      fontSize: 12, fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase",
      padding: "4px 10px", borderRadius: 3, color: kleuren[0], background: kleuren[1],
    }}>{tekst}</span>
  );
}

/* ---------- account aanmaken / inloggen ---------- */
function Poort({ soort, gaNaar, klaar }) {
  const [naam, setNaam] = useState("");
  const [email, setEmail] = useState("");
  const [ww, setWw] = useState("");
  const [fout, setFout] = useState("");

  const isLogin = soort === "login";
  const isWerkgever = soort === "registreerwg";
  const [rol, setRol] = useState("mens");

  const teksten = {
    registreer: {
      kicker: "Aanmelden",
      titel: "Wat is jouw droombaan?",
      punten: ["Werken met je motivatie: doen wat je leuk vindt", "Één keer aanmelden, geen brief of cv nodig", "Jij beslist: werkgevers reageren op jou"],
      knop: "Maak mijn account →",
    },
    registreerwg: {
      kicker: "Voor werkgevers",
      titel: "Kijk wie er klaarstaat",
      punten: ["Alle profielen doorzoeken en filteren", "Gratis reageren, zo vaak je wil", "Contactgegevens zodra iemand ja zegt"],
      knop: "Maak bedrijfsaccount →",
    },
    login: {
      kicker: "Inloggen",
      titel: "Welkom terug",
      punten: ["Je aanmelding of vacatures beheren", "Reacties op één plek", "Je gegevens blijven van jou"],
      knop: "Inloggen →",
    },
  }[soort];

  function verstuur(e) {
    e.preventDefault();
    if (isWerkgever && !naam.trim()) return setFout("Vul je bedrijfsnaam in.");
    if (!/.+@.+\..+/.test(email)) return setFout("Vul een geldig e-mailadres in.");
    if (ww.length < 8) return setFout("Je wachtwoord heeft minimaal 8 tekens.");
    setFout("");
    klaar({
      rol: isLogin ? rol : isWerkgever ? "bedrijf" : "mens",
      nieuw: !isLogin,
      naam: naam.trim(),
      email: email,
    });
  }

  return (
    <section style={{ maxWidth: 1180, margin: "0 auto", padding: "64px 24px 112px", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 320px), 1fr))", gap: 56, alignItems: "stretch" }}>
      <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
        <p style={{ fontSize: 12, fontWeight: 600, letterSpacing: "0.16em", textTransform: "uppercase", color: ACCENT, margin: 0 }}>{teksten.kicker}</p>
        <h1 style={{ fontFamily: DISPLAY, fontSize: "clamp(38px, 6.2vw, 76px)", fontWeight: 800, letterSpacing: "-0.05em", lineHeight: 0.94, margin: 0, maxWidth: "18ch" }}>{teksten.titel}</h1>
        <ul style={{ margin: 0, padding: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: 14 }}>
          {teksten.punten.map((p) => (
            <li key={p} style={{ display: "flex", gap: 14, alignItems: "flex-start", fontSize: 17, lineHeight: 1.5, paddingBottom: 14, borderBottom: "1px solid rgba(17,17,17,0.09)" }}>
              <span style={{ flexShrink: 0, color: ACCENT, fontSize: 15, fontWeight: 700, lineHeight: 1.65 }}>✓</span>
              <span>{p}</span>
            </li>
          ))}
        </ul>
        <p style={{ margin: 0, fontSize: 15, color: "rgba(17,17,17,0.5)" }}>Gratis. Geen abonnement, geen kosten.</p>
      </div>

      <div style={{ background: ZAND, borderRadius: 32, padding: 32, alignSelf: "stretch", display: "flex", flexDirection: "column", justifyContent: "center" }}>
        {isLogin ? (
          <div style={{ display: "flex", gap: 6, background: "#fff", border: "1px solid rgba(17,17,17,0.12)", borderRadius: 999, padding: 6, marginBottom: 22 }}>
            {[["mens", "Ik zoek werk"], ["bedrijf", "Ik zoek mensen"]].map(([v, t]) => (
              <button key={v} type="button" onClick={() => setRol(v)} style={{
                flex: 1, border: 0, borderRadius: 999, padding: "14px 18px",
                fontSize: 16, fontWeight: 600, fontFamily: "inherit", cursor: "pointer",
                background: rol === v ? ACCENT : "transparent",
                color: rol === v ? "#fff" : "rgba(17,17,17,0.6)",
              }}>{t}</button>
            ))}
          </div>
        ) : null}

        <form onSubmit={verstuur} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          {isWerkgever ? <Veld titel="Bedrijfsnaam" waarde={naam} zet={setNaam} placeholder="bijv. Van Dijk Techniek" /> : null}
          <Veld titel="E-mailadres" waarde={email} zet={setEmail} type="email" placeholder="naam@voorbeeld.nl" />
          <Veld titel="Wachtwoord" waarde={ww} zet={setWw} type="password" placeholder="Minimaal 8 tekens" />
          {fout ? <p style={{ margin: 0, fontSize: 15.5, color: "#A32020" }}>{fout}</p> : null}
          <button type="submit" style={{ ...knop, marginTop: 4 }}>{teksten.knop}</button>
        </form>

        <div style={{ marginTop: 20, display: "flex", flexDirection: "column", gap: 10 }}>
          {soort !== "login" ? <a href="#" onClick={(e) => { e.preventDefault(); gaNaar("login"); }} style={{ fontSize: 15, fontWeight: 600, color: "rgba(17,17,17,0.6)", textDecoration: "none" }}>› Ik heb al een account — inloggen</a> : null}
          {soort !== "registreer" ? <a href="#" onClick={(e) => { e.preventDefault(); gaNaar("registreer"); }} style={{ fontSize: 15, fontWeight: 600, color: "rgba(17,17,17,0.6)", textDecoration: "none" }}>› Account aanmaken als werkzoekende</a> : null}
          {soort !== "registreerwg" ? <a href="#" onClick={(e) => { e.preventDefault(); gaNaar("registreerwg"); }} style={{ fontSize: 15, fontWeight: 600, color: "rgba(17,17,17,0.6)", textDecoration: "none" }}>› Account aanmaken voor werkgevers</a> : null}
        </div>
      </div>
    </section>
  );
}

/* ---------- Mijn Finkje (kandidaat) ---------- */
function MijnFinkje({ form, zetForm, status, zetStatus, reacties, antwoord, uitloggen }) {
  const [tab, setTab] = useState("droombaan");
  const zet = (key) => (v) => zetForm({ ...form, [key]: v });
  const wissel = (key) => (v) => {
    const lijst = form[key] || [];
    zetForm({ ...form, [key]: lijst.indexOf(v) === -1 ? lijst.concat([v]) : lijst.filter((x) => x !== v) });
  };
  const voornaam = String(form.naam || "").trim().split(" ")[0] || "Willer";
  const nieuw = reacties.filter((r) => r.status === "nieuw").length;

  return (
    <section style={{ maxWidth: 1080, margin: "0 auto", padding: "40px 24px 112px", display: "flex", flexWrap: "wrap", gap: 52, alignItems: "stretch" }}>
      <aside style={{ flex: "1 1 210px", maxWidth: 240, minWidth: 195, alignSelf: "stretch", display: "flex", flexDirection: "column", gap: 2, minHeight: 470 }}>
        <span style={{ fontSize: 13, fontWeight: 600, color: "rgba(17,17,17,0.45)", padding: "0 12px 4px" }}>Welkom, {voornaam}.</span>
        <span style={{ fontSize: 11.5, fontWeight: 700, letterSpacing: "0.13em", textTransform: "uppercase", color: "rgba(17,17,17,0.35)", padding: "18px 12px 8px" }}>Mijn aanmelding</span>
        <ZijNav titel="Mijn droombaan" actief={tab === "droombaan"} klik={() => setTab("droombaan")} />
        <ZijNav titel="Mijn werkomgeving" actief={tab === "werkomgeving"} klik={() => setTab("werkomgeving")} sub />
        <ZijNav titel="Over mij" actief={tab === "overmij"} klik={() => setTab("overmij")} sub />
        <ZijNav titel="Status" actief={tab === "status"} klik={() => setTab("status")} sub />
        <span style={{ height: 1, background: "rgba(17,17,17,0.1)", margin: "16px 12px" }} />
        <ZijNav titel={nieuw ? "Reacties (" + nieuw + " nieuw)" : "Reacties"} actief={tab === "reacties"} klik={() => setTab("reacties")} />
        <a href="#" onClick={(e) => { e.preventDefault(); uitloggen(); }} style={{ marginTop: "auto", padding: "11px 12px", fontSize: 14.5, fontWeight: 600, color: "rgba(17,17,17,0.42)", textDecoration: "none" }}>Uitloggen</a>
      </aside>

      <div style={{ flex: "999 1 min(100%, 440px)", display: "flex", flexDirection: "column", gap: 14, minWidth: 0 }}>
        <div style={{ border: "1px solid " + LIJN, borderRadius: 6, background: "#fff", padding: "22px 26px", display: "flex", flexWrap: "wrap", alignItems: "flex-end", gap: 20 }}>
          <span style={{ display: "flex", flexDirection: "column", gap: 6, minWidth: 0 }}>
            <span style={{ fontSize: 11.5, fontWeight: 700, letterSpacing: "0.13em", textTransform: "uppercase", color: "rgba(17,17,17,0.42)" }}>Mijn droombaan</span>
            <span style={{ fontSize: "clamp(23px, 3vw, 32px)", fontWeight: 600, letterSpacing: "-0.02em", lineHeight: 1.15 }}>{form.droombaan || "Nog niet ingevuld"}</span>
          </span>
          <span style={{ marginLeft: "auto", display: "flex", flexDirection: "column", gap: 5, alignItems: "flex-end" }}>
            <span style={{ fontSize: 11.5, fontWeight: 700, letterSpacing: "0.13em", textTransform: "uppercase", color: "rgba(17,17,17,0.42)" }}>Status</span>
            <span style={{ fontSize: 15.5, fontWeight: 600 }}>{status}</span>
          </span>
        </div>

        {tab === "droombaan" ? (
          <div style={kaart}>
            <span style={kaartKop}>Mijn droombaan</span>
            <label style={{ display: "flex", flexDirection: "column", gap: 7 }}>
              <span style={label}>Wat is je droombaan?</span>
              <input value={form.droombaan} onChange={(e) => zet("droombaan")(e.target.value)} placeholder="bijv. meubelmaker"
                style={{ ...veld, padding: "16px", fontSize: 21, fontWeight: 600, letterSpacing: "-0.015em" }} />
            </label>
            <Tekstvak titel="Waar ben je sterk in?" waarde={form.sterk} zet={zet("sterk")} />
            <Tekstvak titel="Wat zou een werkgever over het hoofd zien als hij alleen naar je cv keek?" waarde={form.tegenaan} zet={zet("tegenaan")} hint="Dit gebruiken we om je te helpen, niet om je af te wijzen." />
          </div>
        ) : null}

        {tab === "werkomgeving" ? (
          <div style={kaart}>
            <span style={kaartKop}>Mijn werkomgeving</span>
            <Chips titel="In wat voor omgeving werk je het liefst?" opties={OMGEVINGEN} gekozen={form.omgevingen} wissel={wissel("omgevingen")} />
            <Chips titel="Wat heb je ervoor over?" opties={OVER_HEB_JE} gekozen={form.overs} wissel={wissel("overs")} />
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 200px), 1fr))", gap: 16 }}>
              <Keuze titel="Sector" waarde={form.sector} zet={zet("sector")} opties={SECTOREN} />
              <Keuze titel="Jaren ervaring" waarde={form.ervaring} zet={zet("ervaring")} opties={ERVARING} />
            </div>
          </div>
        ) : null}

        {tab === "overmij" ? (
          <div style={kaart}>
            <span style={kaartKop}>Over mij</span>
            <p style={{ margin: "-10px 0 0", fontSize: 14.5, lineHeight: 1.6, color: "rgba(17,17,17,0.55)", maxWidth: "56ch" }}>Werkgevers zien je naam en contactgegevens pas als jij een reactie accepteert.</p>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 180px), 1fr))", gap: 16 }}>
              <Veld titel="Naam" waarde={form.naam} zet={zet("naam")} />
              <Veld titel="Woonplaats" waarde={form.locatie} zet={zet("locatie")} placeholder="bijv. Utrecht" />
              <Keuze titel="Max. reisafstand" waarde={form.reisafstand} zet={zet("reisafstand")} opties={REISAFSTAND} />
              <Veld titel="E-mail" waarde={form.email} zet={zet("email")} type="email" />
              <Veld titel="Telefoon" waarde={form.telefoon} zet={zet("telefoon")} />
              <Keuze titel="Opzegtermijn" waarde={form.beschikbaarheid} zet={zet("beschikbaarheid")} opties={OPZEGTERMIJN} />
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              <div style={{ display: "flex", alignItems: "baseline", gap: 10 }}>
                <span style={label}>Hoeveel uur wil je werken?</span>
                <span style={{ marginLeft: "auto", fontSize: 19, fontWeight: 600, letterSpacing: "-0.015em" }}>{form.uren} uur per week</span>
              </div>
              <input type="range" min={8} max={40} step={2} value={form.uren}
                onChange={(e) => zet("uren")(Number(e.target.value))}
                style={{ width: "100%", accentColor: ACCENT, height: 26, cursor: "pointer" }} />
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12.5, color: "rgba(17,17,17,0.42)" }}>
                <span>8 uur</span><span>40 uur</span>
              </div>
            </div>
          </div>
        ) : null}

        {tab === "status" ? (
          <div style={kaart}>
            <span style={kaartKop}>Status</span>
            <Keuze titel="Waar sta je nu?" waarde={status} zet={zetStatus} opties={STATUSSEN} />
            <p style={{ margin: 0, fontSize: 14.5, lineHeight: 1.6, color: "rgba(17,17,17,0.55)", maxWidth: "56ch" }}>
              {status === "Nu even niet"
                ? "Je profiel staat op pauze: werkgevers zien je niet en je krijgt geen reacties. Je aanmelding blijft bewaard."
                : "Werkgevers zien je verhaal, nog niet je naam of gegevens. Die krijgen ze pas als jij een reactie accepteert."}
            </p>
          </div>
        ) : null}

        {tab === "reacties" ? (
          reacties.length === 0 ? (
            <div style={{ border: "1px dashed rgba(17,17,17,0.2)", borderRadius: 6, padding: 36, display: "flex", flexDirection: "column", gap: 8 }}>
              <span style={{ fontSize: 17, fontWeight: 600 }}>Nog geen reacties.</span>
              <span style={{ fontSize: 15.5, lineHeight: 1.6, color: "rgba(17,17,17,0.58)", maxWidth: "48ch" }}>Zodra een werkgever op jouw verhaal reageert, staat het hier. Je hoort het ook per mail.</span>
            </div>
          ) : (
            reacties.map((r) => (
              <div key={r.id} style={kaart}>
                <div style={{ display: "flex", flexWrap: "wrap", alignItems: "baseline", gap: 12 }}>
                  <span style={{ fontSize: 18, fontWeight: 600, letterSpacing: "-0.015em" }}>{r.bedrijf}</span>
                  <span style={{ fontSize: 15.5, color: "rgba(17,17,17,0.55)" }}>{r.rol}</span>
                  <Pil soort={r.status} />
                </div>
                <p style={{ margin: 0, fontSize: 15.5, lineHeight: 1.65, color: "rgba(17,17,17,0.74)" }}>{r.bericht}</p>
                {r.status === "nieuw" ? (
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
                    <button onClick={() => antwoord(r.id, true)} style={{ ...knop, background: INK, padding: "13px 24px", fontSize: 15 }}>Deel mijn gegevens</button>
                    <button onClick={() => antwoord(r.id, false)} style={{ ...knopStil, padding: "13px 24px", fontSize: 15 }}>Past niet</button>
                  </div>
                ) : null}
                {r.status === "match" ? (
                  <div style={{ background: ZAND, borderRadius: 10, padding: "16px 18px", display: "flex", flexDirection: "column", gap: 4 }}>
                    <span style={{ fontSize: 15, fontWeight: 600 }}>Jullie zijn gekoppeld.</span>
                    <span style={{ fontSize: 15, lineHeight: 1.5, color: "rgba(17,17,17,0.6)" }}>{r.contact}</span>
                  </div>
                ) : null}
              </div>
            ))
          )
        ) : null}
      </div>
    </section>
  );
}

/* ---------- Dashboard werkgever ---------- */
function Werkgeverdashboard({ bedrijf, zetBedrijf, vacatures, zetVacatures, verzonden, trekIn, uitloggen }) {
  const [tab, setTab] = useState("reacties");
  const [vac, setVac] = useState({ id: "", titel: "", plaats: "", uren: "Fulltime", omschrijving: "" });
  const [fout, setFout] = useState("");
  const zet = (key) => (v) => zetBedrijf({ ...bedrijf, [key]: v });
  const voornaam = String(bedrijf.contactpersoon || bedrijf.naam || "").trim().split(" ")[0] || "Willer";

  function bewaar() {
    if (!vac.titel.trim()) return setFout("Vul een functietitel in.");
    if (!vac.plaats.trim()) return setFout("Vul een plaats in.");
    setFout("");
    zetVacatures(vac.id
      ? vacatures.map((v) => (v.id === vac.id ? { ...v, ...vac } : v))
      : vacatures.concat([{ ...vac, id: "vac-" + Date.now(), actief: true }]));
    setVac({ id: "", titel: "", plaats: "", uren: "Fulltime", omschrijving: "" });
  }

  return (
    <section style={{ maxWidth: 1080, margin: "0 auto", padding: "40px 24px 112px", display: "flex", flexWrap: "wrap", gap: 52, alignItems: "stretch" }}>
      <aside style={{ flex: "1 1 210px", maxWidth: 240, minWidth: 195, alignSelf: "stretch", display: "flex", flexDirection: "column", gap: 2, minHeight: 470 }}>
        <span style={{ fontSize: 13, fontWeight: 600, color: "rgba(17,17,17,0.45)", padding: "0 12px 4px" }}>Welkom, {voornaam}.</span>
        <span style={{ fontSize: 11.5, fontWeight: 700, letterSpacing: "0.13em", textTransform: "uppercase", color: "rgba(17,17,17,0.35)", padding: "18px 12px 8px" }}>Mijn bedrijf</span>
        <ZijNav titel={"Mijn reacties (" + verzonden.length + ")"} actief={tab === "reacties"} klik={() => setTab("reacties")} />
        <ZijNav titel={"Vacatures (" + vacatures.length + ")"} actief={tab === "vacatures"} klik={() => setTab("vacatures")} sub />
        <ZijNav titel="Bedrijfsinfo" actief={tab === "info"} klik={() => setTab("info")} sub />
        <a href="#" onClick={(e) => { e.preventDefault(); uitloggen(); }} style={{ marginTop: "auto", padding: "11px 12px", fontSize: 14.5, fontWeight: 600, color: "rgba(17,17,17,0.42)", textDecoration: "none" }}>Uitloggen</a>
      </aside>

      <div style={{ flex: "999 1 min(100%, 440px)", display: "flex", flexDirection: "column", gap: 14, minWidth: 0 }}>
        {tab === "reacties" ? (
          verzonden.length === 0 ? (
            <div style={{ border: "1px dashed rgba(17,17,17,0.2)", borderRadius: 6, padding: 36, display: "flex", flexDirection: "column", gap: 8 }}>
              <span style={{ fontSize: 17, fontWeight: 600 }}>Je hebt nog niemand benaderd.</span>
              <span style={{ fontSize: 15.5, lineHeight: 1.6, color: "rgba(17,17,17,0.58)", maxWidth: "48ch" }}>Ga naar de profielen en reageer op iemand wiens verhaal je aanspreekt.</span>
            </div>
          ) : (
            verzonden.map((v) => (
              <div key={v.id} style={kaart}>
                <div style={{ display: "flex", flexWrap: "wrap", alignItems: "baseline", gap: 12 }}>
                  <span style={{ fontSize: 18, fontWeight: 600, letterSpacing: "-0.015em" }}>{v.wil}</span>
                  <span style={{ fontSize: 15, color: "rgba(17,17,17,0.5)" }}>{v.code}</span>
                  <Pil soort={v.status === "match" ? "match" : "wacht"} />
                </div>
                <p style={{ margin: 0, fontSize: 15.5, lineHeight: 1.65, color: "rgba(17,17,17,0.74)" }}>{v.bericht}</p>
                {v.status === "match" ? (
                  <div style={{ background: ZAND, borderRadius: 10, padding: "16px 18px", display: "flex", flexDirection: "column", gap: 4 }}>
                    <span style={{ fontSize: 15, fontWeight: 600 }}>{v.naam}</span>
                    <span style={{ fontSize: 15, color: "rgba(17,17,17,0.6)" }}>{v.contact}</span>
                  </div>
                ) : (
                  <button onClick={() => trekIn(v.id)} style={{ ...knopStil, alignSelf: "flex-start", padding: "12px 22px", fontSize: 15 }}>Reactie intrekken</button>
                )}
              </div>
            ))
          )
        ) : null}

        {tab === "vacatures" ? (
          <>
            <div style={kaart}>
              <span style={kaartKop}>{vac.id ? "Vacature wijzigen" : "Nieuwe vacature"}</span>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 200px), 1fr))", gap: 16 }}>
                <Veld titel="Functietitel" waarde={vac.titel} zet={(v) => setVac({ ...vac, titel: v })} placeholder="bijv. junior monteur" />
                <Veld titel="Plaats" waarde={vac.plaats} zet={(v) => setVac({ ...vac, plaats: v })} placeholder="bijv. Utrecht" />
                <Keuze titel="Uren" waarde={vac.uren} zet={(v) => setVac({ ...vac, uren: v })} opties={UREN_OPTIES} />
              </div>
              <Tekstvak titel="Wat ga je doen?" waarde={vac.omschrijving} zet={(v) => setVac({ ...vac, omschrijving: v })} rijen={4} />
              {fout ? <p style={{ margin: 0, fontSize: 15.5, color: "#A32020" }}>{fout}</p> : null}
              <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
                <button onClick={bewaar} style={{ ...knop, padding: "14px 26px", fontSize: 16 }}>{vac.id ? "Wijziging opslaan" : "Vacature plaatsen →"}</button>
                {vac.id ? <button onClick={() => setVac({ id: "", titel: "", plaats: "", uren: "Fulltime", omschrijving: "" })} style={{ ...knopStil, padding: "14px 26px", fontSize: 16 }}>Annuleren</button> : null}
              </div>
            </div>

            {vacatures.length === 0 ? (
              <div style={{ border: "1px dashed rgba(17,17,17,0.2)", borderRadius: 6, padding: 36, display: "flex", flexDirection: "column", gap: 8 }}>
                <span style={{ fontSize: 17, fontWeight: 600 }}>Nog geen vacatures.</span>
                <span style={{ fontSize: 15.5, lineHeight: 1.6, color: "rgba(17,17,17,0.58)", maxWidth: "48ch" }}>Zet er een neer en we melden het zodra iemand zich aanmeldt die erop aansluit. Reageren kan ook zonder vacature.</span>
              </div>
            ) : vacatures.map((v) => (
              <div key={v.id} style={kaart}>
                <div style={{ display: "flex", flexWrap: "wrap", alignItems: "baseline", gap: 12 }}>
                  <span style={{ fontSize: 18, fontWeight: 600, letterSpacing: "-0.015em" }}>{v.titel}</span>
                  <Pil soort={v.actief ? "online" : "pauze"} />
                </div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                  {[v.plaats, v.uren].map((t) => (
                    <span key={t} style={{ fontSize: 14.5, padding: "7px 14px", borderRadius: 999, background: ZAND, color: "rgba(17,17,17,0.72)", fontWeight: 500 }}>{t}</span>
                  ))}
                </div>
                {v.omschrijving ? <p style={{ margin: 0, fontSize: 15.5, lineHeight: 1.6, color: "rgba(17,17,17,0.72)", maxWidth: "62ch" }}>{v.omschrijving}</p> : null}
                <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
                  <button onClick={() => setVac({ id: v.id, titel: v.titel, plaats: v.plaats, uren: v.uren, omschrijving: v.omschrijving })} style={{ ...knopStil, padding: "12px 22px", fontSize: 15 }}>Wijzigen</button>
                  <button onClick={() => zetVacatures(vacatures.map((x) => (x.id === v.id ? { ...x, actief: !x.actief } : x)))} style={{ ...knopStil, padding: "12px 22px", fontSize: 15 }}>{v.actief ? "Op pauze zetten" : "Weer online"}</button>
                  <button onClick={() => zetVacatures(vacatures.filter((x) => x.id !== v.id))} style={{ background: "none", border: 0, padding: "12px 6px", fontSize: 15, fontWeight: 600, color: "rgba(17,17,17,0.5)", cursor: "pointer", fontFamily: "inherit" }}>Verwijderen</button>
                </div>
              </div>
            ))}
          </>
        ) : null}

        {tab === "info" ? (
          <>
            <div style={kaart}>
              <span style={kaartKop}>Je bedrijf</span>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 200px), 1fr))", gap: 16 }}>
                <Veld titel="Bedrijfsnaam" waarde={bedrijf.naam} zet={zet("naam")} />
                <Veld titel="Plaats" waarde={bedrijf.plaats} zet={zet("plaats")} />
                <Veld titel="Website (optioneel)" waarde={bedrijf.website} zet={zet("website")} placeholder="www.jouwbedrijf.nl" />
              </div>
            </div>
            <div style={kaart}>
              <span style={kaartKop}>Contact</span>
              <p style={{ margin: "-10px 0 0", fontSize: 14.5, lineHeight: 1.6, color: "rgba(17,17,17,0.55)", maxWidth: "56ch" }}>Deze gegevens sturen we mee als je op iemand reageert.</p>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 180px), 1fr))", gap: 16 }}>
                <Veld titel="Naam contactpersoon" waarde={bedrijf.contactpersoon} zet={zet("contactpersoon")} />
                <Veld titel="E-mail" waarde={bedrijf.email} zet={zet("email")} type="email" />
                <Veld titel="Telefoon (optioneel)" waarde={bedrijf.telefoon} zet={zet("telefoon")} />
              </div>
            </div>
          </>
        ) : null}
      </div>
    </section>
  );
}

/* ---------- schil: routering tussen de schermen ---------- */
export default function FinkjeAccount() {
  const [pagina, setPagina] = useState("registreer"); // registreer | registreerwg | login | mijn | dash
  const [rol, setRol] = useState("mens");
  const [ingelogd, setIngelogd] = useState(false);

  const [form, setForm] = useState(LEEG_KANDIDAAT);
  const [bedrijf, setBedrijf] = useState(LEEG_BEDRIJF);
  const [status, setStatus] = useState("Ik ben actief op zoek");
  const [vacatures, setVacatures] = useState([]);

  const [inbox, setInbox] = useState([
    { id: "i1", bedrijf: "Van Dijk Techniek", rol: "Junior monteur", status: "nieuw",
      bericht: "Wij hebben een plek open als junior monteur en jouw verhaal past daar goed bij. Wil je een keer langskomen voor een gesprek zonder verplichtingen?",
      contact: "Marit van Dijk — marit@vandijktechniek.nl — 030 123 45 67" },
  ]);
  const [verzonden, setVerzonden] = useState([
    { id: "v1", wil: "Support engineer", code: "W-0431", status: "wachten",
      bericht: "Wij hebben een plek open als support engineer en jouw verhaal past daar goed bij.", naam: "", contact: "" },
  ]);

  function naBinnenkomst({ rol, nieuw, naam, email }) {
    setRol(rol);
    setIngelogd(true);
    if (rol === "mens" && nieuw) setForm({ ...form, email: email });
    if (rol === "bedrijf" && nieuw) setBedrijf({ ...bedrijf, naam: naam || bedrijf.naam, email: email });
    setPagina(rol === "mens" ? "mijn" : "dash");
    window.scrollTo({ top: 0 });
  }

  function uitloggen() {
    setIngelogd(false);
    setForm(LEEG_KANDIDAAT);
    setBedrijf(LEEG_BEDRIJF);
    setVacatures([]);
    setPagina("login");
    window.scrollTo({ top: 0 });
  }

  return (
    <div style={{ fontFamily: FONT, background: "#fff", color: INK, minHeight: "100vh" }}>
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700;800&family=Inter:wght@400;500;600;700&display=swap" />

      <header style={{ borderBottom: "1px solid rgba(17,17,17,0.1)", background: "rgba(255,255,255,0.94)", position: "sticky", top: 0, zIndex: 20 }}>
        <div style={{ maxWidth: 1180, margin: "0 auto", padding: "16px 24px", display: "flex", alignItems: "center", gap: 16 }}>
          <span style={{ fontFamily: DISPLAY, fontSize: 22, fontWeight: 800, letterSpacing: "-0.04em" }}>finkje</span>
          <a href="#" onClick={(e) => { e.preventDefault(); setPagina(ingelogd ? (rol === "mens" ? "mijn" : "dash") : "registreer"); }}
            style={{ marginLeft: "auto", background: ACCENT, color: "#fff", padding: "12px 22px", borderRadius: 999, fontWeight: 600, fontSize: 15, textDecoration: "none" }}>
            {ingelogd ? (rol === "mens" ? "Mijn Finkje" : "Mijn dashboard") : "Account aanmaken"}
          </a>
        </div>
      </header>

      {!ingelogd ? (
        <Poort soort={pagina === "login" || pagina === "registreerwg" ? pagina : "registreer"} gaNaar={setPagina} klaar={naBinnenkomst} />
      ) : rol === "mens" ? (
        <MijnFinkje
          form={form} zetForm={setForm}
          status={status} zetStatus={setStatus}
          reacties={inbox}
          antwoord={(id, ja) => setInbox(inbox.map((r) => (r.id === id ? { ...r, status: ja ? "match" : "afgewezen" } : r)))}
          uitloggen={uitloggen}
        />
      ) : (
        <Werkgeverdashboard
          bedrijf={bedrijf} zetBedrijf={setBedrijf}
          vacatures={vacatures} zetVacatures={setVacatures}
          verzonden={verzonden} trekIn={(id) => setVerzonden(verzonden.filter((v) => v.id !== id))}
          uitloggen={uitloggen}
        />
      )}
    </div>
  );
}
