"use client";

import { useState } from "react";
import { MapPin } from "lucide-react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { saveLead } from "@/lib/leads";
import { createClient } from "@/lib/supabase/client";
import { completeAuthProfile } from "@/lib/complete-auth-profile";
import {
  dienstverbandOpties,
  omgevingOpties,
  overOpties,
  sectorOpties,
  handKleuren,
} from "@/lib/data";

type FormState = {
  droombaan: string;
  waarom: string;
  sterk: string;
  tegenaan: string;
  hkleur: string;
  dienstverband: string;
  beschikbaarheid: string;
  locatie: string;
  reisafstand: string;
  sector: string;
  ervaring: string;
  naam: string;
  email: string;
  telefoon: string;
  wachtwoord: string;
};

const emptyForm: FormState = {
  droombaan: "",
  waarom: "",
  sterk: "",
  tegenaan: "",
  hkleur: "",
  dienstverband: "",
  beschikbaarheid: "",
  locatie: "",
  reisafstand: "",
  sector: "",
  ervaring: "",
  naam: "",
  email: "",
  telefoon: "",
  wachtwoord: "",
};

const ervaringOpties = ["Geen ervaring in deze sector", "Minder dan 1 jaar", "1–3 jaar", "3–5 jaar", "5–10 jaar", "10+ jaar"];
const groteSteden = [
  "Amsterdam",
  "Rotterdam",
  "Den Haag",
  "Utrecht",
  "Eindhoven",
  "Groningen",
  "Tilburg",
  "Almere",
  "Breda",
  "Nijmegen",
  "Enschede",
  "Haarlem",
  "Arnhem",
  "Amersfoort",
  "Leiden",
  "Dordrecht",
  "Zoetermeer",
  "Zwolle",
  "Delft",
  "Alkmaar",
];

export default function SignupForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const wilFromHero = searchParams.get("wil") || "";

  const [stap, setStap] = useState(1);
  const [form, setForm] = useState<FormState>({ ...emptyForm, droombaan: wilFromHero });
  const [overs, setOvers] = useState<string[]>([]);
  const [omgevingen, setOmgevingen] = useState<string[]>([]);
  const [fout, setFout] = useState("");
  const [klaar, setKlaar] = useState(false);
  const [bezig, setBezig] = useState(false);
  const [locatieZoekterm, setLocatieZoekterm] = useState("");
  const [geenVoorkeur, setGeenVoorkeur] = useState(false);
  const [wachtOpCode, setWachtOpCode] = useState(false);
  const [code, setCode] = useState("");
  const [akkoord, setAkkoord] = useState(false);
  const [toonKleurInfo, setToonKleurInfo] = useState(false);

  const setField =
    (key: keyof FormState) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
      setForm((f) => ({ ...f, [key]: e.target.value }));
      setFout("");
    };

  const kiesKleur = (waarde: string) => () => {
    setForm((f) => ({ ...f, hkleur: waarde }));
    setFout("");
  };

  const toggle = (list: string[], setList: (v: string[]) => void, label: string) => () => {
    setList(list.includes(label) ? list.filter((x) => x !== label) : [...list, label]);
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const honeypot = new FormData(e.currentTarget as HTMLFormElement).get("website_confirmation");
    if (typeof honeypot === "string" && honeypot.trim()) return;
    if (stap === 1) {
      if (!form.droombaan.trim()) return setFout("Vertel eerst wat voor baan je wil.");
      setStap(2);
      setFout("");
      return;
    }
    if (stap === 2) {
      if (!geenVoorkeur && !form.locatie.trim()) return setFout("Kies een stad of geef aan dat je geen voorkeur hebt.");
      setStap(3);
      setFout("");
      return;
    }
    if (stap === 3) {
      if (!form.sterk.trim()) return setFout("Vertel waar je sterk in bent — één regel is genoeg.");
      setStap(4);
      setFout("");
      return;
    }
    if (stap === 4) {
      if (!form.hkleur) return setFout("Kies je lievelingskleur.");
      setStap(5);
      setFout("");
      return;
    }
    if (stap === 5) {
      setStap(6);
      setFout("");
      return;
    }
    if (stap === 6) {
      setStap(7);
      setFout("");
      return;
    }
    if (!form.naam.trim() || !/.+@.+\..+/.test(form.email)) {
      return setFout("Vul je naam en een geldig e-mailadres in.");
    }
    if (!akkoord) return setFout("Ga eerst akkoord met de algemene voorwaarden.");
    setBezig(true);
    try {
      await saveLead("signup", { ...form, overs, omgevingen });

      const supabase = createClient();
      const { data, error } = await supabase.auth.signInWithOtp({
        email: form.email,
        options: {
          shouldCreateUser: true,
          data: {
            role: "werkzoekende",
            naam: form.naam,
            droombaan: form.droombaan,
            waarom: form.waarom,
            sterk: form.sterk,
            tegenaan: form.tegenaan,
            hkleur: form.hkleur,
            dienstverband: form.dienstverband,
            beschikbaarheid: form.beschikbaarheid,
            locatie: form.locatie,
            reisafstand: form.reisafstand,
            sector: form.sector,
            ervaring: form.ervaring,
            telefoon: form.telefoon,
            overs,
            omgevingen,
          },
        },
      });

      if (error) {
        console.error("[v0] Signup OTP failed:", { code: error.code, message: error.message, status: error.status });
        setBezig(false);
        const message = error.message.toLowerCase();
        if (message.includes("rate limit") || message.includes("too many requests")) {
          setFout("Supabase blokkeert tijdelijk nieuwe e-mails. Wacht even en probeer daarna opnieuw.");
        } else {
          setFout(`Supabase: ${error.message}`);
        }
        return;
      }

      // If email confirmation is disabled we already have a session — write
      // the jobseeker profile now. Otherwise the user enters the 6-digit code
      // we just emailed them (see bevestigCode below).
      if (data.session && data.user) {
        await completeAuthProfile(supabase, data.user, "werkzoekende");
        setFout("");
        setBezig(false);
        setKlaar(true);
        window.scrollTo({ top: 0, behavior: "smooth" });
        return;
      }

      setFout("");
      setBezig(false);
      setWachtOpCode(true);
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    } catch (error) {
      console.error("[v0] Signup request failed:", error);
      setBezig(false);
      setFout(error instanceof Error ? `Opslaan: ${error.message}` : "Opslaan lukt nu niet. Probeer het nog een keer.");
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const bevestigCode = async (e: React.FormEvent) => {
    e.preventDefault();
    setFout("");
    if (!/^\d{6}$/.test(code)) {
      setFout("Vul de 6-cijferige code uit je e-mail in.");
      return;
    }

    setBezig(true);
    const supabase = createClient();
    const { data, error } = await supabase.auth.verifyOtp({
      email: form.email,
      token: code,
      type: "email",
    });

    if (error || !data.user) {
      setBezig(false);
      setFout("Deze code is onjuist of verlopen. Vraag een nieuwe code aan.");
      return;
    }

    try {
      await completeAuthProfile(supabase, data.user, "werkzoekende");
    } catch (profileError) {
      console.error("[v0] Profile handoff failed after OTP:", profileError);
      setBezig(false);
      setFout("Je account is bevestigd, maar je aanmelding kon nog niet worden opgeslagen. Probeer het opnieuw.");
      return;
    }
    setBezig(false);
    setKlaar(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (klaar) {
    return (
      <div className="flex flex-col gap-5.5 rounded-[32px] bg-black p-14 text-white">
        <h1 className="m-0 font-display text-[clamp(34px,6vw,76px)] leading-[0.92] font-extrabold tracking-[-0.05em]">
          Welkom bij Finkje, {form.naam}!
        </h1>
        <p className="m-0 max-w-[46ch] text-lg leading-relaxed text-white/70">
          Je account is aangemaakt en je bent ingelogd.
        </p>
        <div className="flex flex-wrap gap-3">
          <Link href="/" className="rounded-full border border-white/30 px-7 py-4 font-semibold text-white transition-colors hover:bg-white/10">
            ← Home
          </Link>
          <Link
            href="/werkzoekende/dashboard"
            className="rounded-full bg-accent px-7 py-4 font-semibold text-white transition-colors hover:bg-white hover:text-[#111]"
          >
            Naar jouw dashboard →
          </Link>
        </div>
      </div>
    );
  }

  if (wachtOpCode) {
    return (
      <form onSubmit={bevestigCode} className="flex flex-col gap-5.5 rounded-[32px] bg-black p-14 text-white">
        <div className="flex items-center gap-2.5 text-base font-semibold text-accent">
          <span className="h-4 w-4 animate-spin rounded-full border-2 border-accent/30 border-t-accent" aria-hidden="true" />
          Je inlogcode is onderweg
        </div>
        <h1 className="m-0 font-display text-[clamp(30px,5vw,52px)] leading-[0.95] font-extrabold tracking-[-0.05em]">
          Welkom, {form.naam || "toekomstige Finkje-collega"}!
        </h1>
        <p className="m-0 max-w-[46ch] text-lg leading-relaxed text-white/70">
          We hebben een inlogcode gestuurd naar <strong className="font-semibold text-white">{form.email}</strong>. Vul die hieronder in om je account te bevestigen.
        </p>
        <label className="flex max-w-xs flex-col gap-2.5">
          <span className="text-base font-semibold">Inlogcode</span>
          <input
            type="text"
            inputMode="numeric"
            autoComplete="one-time-code"
            maxLength={6}
            value={code}
            onChange={(e) => setCode(e.target.value.replace(/\D/g, ""))}
            placeholder="123456"
            className="rounded-2xl border border-white/20 bg-white/10 px-4.5 py-4 text-center text-2xl font-bold tracking-[0.3em] text-accent outline-none placeholder:font-normal placeholder:text-white/30 focus:border-accent"
          />
        </label>
        {fout && <p className="m-0 text-base font-semibold text-[#FF8A6B]">{fout}</p>}
        <div className="flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={() => {
              setWachtOpCode(false);
              setCode("");
              setFout("");
            }}
            className="rounded-full border border-white/30 px-7 py-4 font-semibold text-white transition-colors hover:bg-white/10"
          >
            ← Terug
          </button>
          <button
            type="submit"
            disabled={bezig}
            className="rounded-full bg-accent px-7 py-4 font-semibold text-white transition-colors hover:bg-white hover:text-[#111] disabled:opacity-60"
          >
            {bezig ? "Even geduld…" : "Bevestigen →"}
          </button>
        </div>
      </form>
    );
  }

  const inputClass =
    "rounded-2xl border border-black/15 bg-white px-5 py-4 text-lg text-[#111] outline-none transition-colors focus:border-accent";
  const pillInputClass =
    "rounded-xl border border-black/15 bg-white px-5 py-4 text-[17px] text-[#111] outline-none transition-colors focus:border-accent";
  const chipClass = (active: boolean) =>
    `rounded-full border px-5 py-3 text-[17px] font-medium transition-colors ${
      active ? "border-accent bg-accent text-white" : "border-black/15 bg-white text-[#111]"
    }`;

  const stepCopy = {
    1: { title: "Wat is je droombaan?", description: "Kies zorgvuldig en voel dat jouw hart er sneller van gaat kloppen." },
    2: { title: "Waar wil je werken?", description: "Kies de plek die goed voelt en waar jij graag aan de slag wilt." },
    3: { title: "Waar ben je goed in?", description: "Vertel wat jou sterk maakt, ook als het niet op je cv staat." },
    4: { title: "Welke kleur past bij jou?", description: "Kies wat goed voelt. Er is geen goed of fout." },
    5: { title: "Wat voor omgeving past bij jou?", description: "Kies de omgeving waarin jij het beste tot je recht komt." },
    6: { title: "Wanneer wil je beginnen?", description: "Geef aan wanneer en in welke vorm je graag wilt werken." },
    7: { title: "Hoe kunnen we je bereiken?", description: "Nog één stap en we kunnen voor je aan de slag!" },
  }[stap as 1 | 2 | 3 | 4 | 5 | 6 | 7];

  return (
    <div>
      <div className="mb-10 flex items-center justify-between border-b border-black/10 pb-4 text-sm font-semibold text-black/50">
        <span>Stap {stap} van 7</span>
      </div>

      <h1 className="m-0 max-w-[12ch] font-display text-[clamp(42px,7vw,76px)] leading-[0.92] font-semibold tracking-[-0.06em]">
        {stepCopy.title}
      </h1>
      <p className="mt-5 mb-6 max-w-[48ch] text-lg leading-relaxed text-black/60">
        {stepCopy.description}
      </p>

<form onSubmit={submit} className="flex flex-col gap-10 pt-2 sm:gap-12 sm:pt-4">
  <label htmlFor="website_confirmation" className="absolute -left-[9999px] h-px w-px overflow-hidden">Website</label>
  <input id="website_confirmation" name="website_confirmation" tabIndex={-1} autoComplete="off" aria-hidden="true" className="absolute -left-[9999px] h-px w-px opacity-0" />
  {stap === 1 && (
          <div className="flex flex-col gap-8">
            <label className="flex flex-col gap-3">
              <input
                value={form.droombaan}
                onChange={setField("droombaan")}
                placeholder="bv. meubelmaker"
                className="rounded-2xl border border-black/15 bg-white px-4.5 py-4 font-display text-[clamp(28px,3.5vw,40px)] font-semibold leading-tight tracking-[-0.03em] text-accent outline-none placeholder:text-accent/55 focus:border-accent"
              />
            </label>
          </div>
        )}

        {stap === 2 && (
          <div className="flex flex-col gap-7">
            <button type="button" onClick={() => { const next = !geenVoorkeur; setGeenVoorkeur(next); setForm((f) => ({ ...f, locatie: next ? "Maakt mij niet uit" : "" })); setFout(""); }} className={`rounded-2xl border px-5 py-4 text-left text-[17px] font-semibold transition-colors ${geenVoorkeur ? "border-accent bg-accent text-white" : "border-black/15 bg-white text-[#111]"}`}>
              Het maakt mij niet uit, ik wil vooral deze baan
            </button>
            <label className="flex flex-col gap-3">
              <span className="text-xs font-semibold tracking-[0.14em] text-black/50 uppercase">Zoek een stad</span>
              <input value={locatieZoekterm} onChange={(e) => { setLocatieZoekterm(e.target.value); setGeenVoorkeur(false); }} placeholder="Zoek een stad…" className={inputClass} />
            </label>
            <div className="flex items-center justify-between gap-4">
              <span className="text-sm text-black/50">Kies een stad uit de lijst</span>
              <button type="button" onClick={() => navigator.geolocation?.getCurrentPosition(async ({ coords }) => { try { const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${coords.latitude}&lon=${coords.longitude}&zoom=10&addressdetails=1`); const data = await response.json(); const city = data.address?.city || data.address?.town || data.address?.village || data.address?.municipality || "Onbekende locatie"; setForm((f) => ({ ...f, locatie: city })); setLocatieZoekterm(city); setGeenVoorkeur(false); } catch { setFout("Je locatie kon niet worden bepaald."); } }, () => setFout("Je locatie kon niet worden opgehaald."))} className="inline-flex items-center gap-2 font-semibold text-accent"><MapPin aria-hidden="true" className="size-5" strokeWidth={2} />Mijn locatie</button>
            </div>
            <div className="flex flex-wrap gap-2.5">
              {groteSteden.filter((stad) => stad.toLowerCase().includes(locatieZoekterm.toLowerCase())).map((stad) => (
                <button key={stad} type="button" onClick={() => { setForm((f) => ({ ...f, locatie: f.locatie === stad ? "" : stad })); setLocatieZoekterm(stad); setGeenVoorkeur(false); setFout(""); }} className={chipClass(form.locatie === stad)}>{stad}</button>
              ))}
            </div>
            <label className={`flex flex-col gap-3 rounded-2xl border border-black/10 bg-white p-5 transition-opacity ${geenVoorkeur ? "pointer-events-none opacity-35 blur-[3px]" : ""}`}>
              <span className="font-display text-xl font-bold">Maximale reisafstand: {form.reisafstand || "25 km"}</span>
              <input type="range" min="1" max="50" value={form.reisafstand ? Number.parseInt(form.reisafstand) || 25 : 25} onChange={(e) => setForm((f) => ({ ...f, reisafstand: `${e.target.value} km` }))} style={{ background: `linear-gradient(to right, var(--accent) 0%, var(--accent) ${((form.reisafstand ? Number.parseInt(form.reisafstand) || 25 : 25) - 1) / 49 * 100}%, transparent ${((form.reisafstand ? Number.parseInt(form.reisafstand) || 25 : 25) - 1) / 49 * 100}%, transparent 100%)` }} className="location-slider h-3 w-full appearance-none rounded-full border border-black/15 bg-transparent accent-accent" />
              <div className="flex justify-between text-sm text-black/50"><span>1 km</span><span>50 km</span></div>
            </label>
          </div>
        )}

        {stap === 3 && (
          <div className="flex flex-col gap-8">
            <label className="flex flex-col gap-3">
              <textarea
                value={form.sterk}
                onChange={setField("sterk")}
                rows={3}
                placeholder="Waar mensen je om vragen, waar je goed in bent — ook buiten werk."
                className={`resize-y font-body ${inputClass}`}
              />
            </label>
            <label className="flex flex-col gap-3">
              <span className="font-display text-[clamp(22px,3vw,36px)] leading-tight font-semibold tracking-[-0.04em]">
                Wat zou een werkgever over het hoofd zien als hij alleen naar je cv keek?
              </span>
              <textarea
                value={form.tegenaan}
                onChange={setField("tegenaan")}
                rows={3}
                placeholder="Bijvoorbeeld: ik spreek vloeiend Spaans, maar dat staat nergens op papier."
                className={`resize-y font-body ${inputClass}`}
              />
              <span className="text-sm text-black/50">Dit gebruiken we om je te helpen, niet om je af te wijzen.</span>
            </label>
          </div>
        )}

        {stap === 4 && (
          <div className="flex flex-col gap-7.5">
            <div className="flex flex-col gap-2.5">
            </div>

            <div className="flex flex-col gap-3">
              <span className="text-xs font-semibold tracking-[0.14em] text-black/50 uppercase">Kleur</span>
              <div className="flex flex-wrap gap-3">
                {handKleuren.map((k) => (
                  <button
                    key={k.hex}
                    type="button"
                    onClick={kiesKleur(k.hex)}
                    aria-label={k.naam}
                    title={k.naam}
                    style={{ background: k.hex }}
                    className={`h-14 w-14 rounded-full transition-shadow ${
                      form.hkleur === k.hex ? "shadow-[0_0_0_3px_#fff_inset] ring-3 ring-black" : "ring-0"
                    }`}
                  />
                ))}
              </div>
              <button
                type="button"
                onClick={() => setToonKleurInfo((open) => !open)}
                className="self-start text-left text-[14.5px] font-semibold underline underline-offset-4"
                aria-expanded={toonKleurInfo}
              >
                Waarom mijn lievelingskleur? {toonKleurInfo ? "↑" : "→"}
              </button>
              {toonKleurInfo && (
                <div className="max-w-[48ch] rounded-xl border border-black/10 bg-white px-4 py-3 text-sm leading-relaxed text-black/65">
                  Solliciteren moet weer leuk worden. Waar we kunnen proberen we daarom altijd net even anders te zijn. Het vragen naar je favoriete kleur past in dat rijtje.
                </div>
              )}
            </div>

            <div className="flex flex-col gap-2.5">
              <span className="text-xs font-semibold tracking-[0.14em] text-black/50 uppercase">Jouw voorbeeld</span>
              <div className="flex max-w-[380px] items-center gap-3 overflow-hidden rounded-3xl border border-black/12 bg-white px-5.5 py-5">
                <span
                  className="h-9 w-9 shrink-0 rounded-full"
                  style={{ background: form.hkleur || "rgba(17,17,17,0.15)" }}
                />
                <span className="font-display text-2xl leading-[0.98] font-extrabold tracking-[-0.04em]">
                  {form.droombaan || "Jouw baan"}
                </span>
              </div>
            </div>
          </div>
        )}

        {stap === 5 && (
          <div className="flex flex-col gap-9">
            <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,220px),1fr))] gap-4.5">
              <label className="flex min-w-0 flex-col gap-2.5">
                <span className="text-xs font-semibold tracking-[0.14em] text-black/50 uppercase">Sectorvoorkeur</span>
                <select value={form.sector} onChange={setField("sector")} className={pillInputClass}>
                  <option value="">Kies een sector…</option>
                  {sectorOpties.map((s) => (
                    <option key={s} value={s}>
                      {s === "Maakt me niet uit" ? "Ik heb niet echt een type" : s}
                    </option>
                  ))}
                </select>
              </label>
              <label className="flex min-w-0 flex-col gap-2.5">
                <span className="text-xs font-semibold tracking-[0.14em] text-black/50 uppercase">
                  Jaren ervaring in sector
                </span>
                <select value={form.ervaring} onChange={setField("ervaring")} className={pillInputClass}>
                  <option value="">Kies…</option>
                  {ervaringOpties.map((o) => (
                    <option key={o} value={o}>
                      {o}
                    </option>
                  ))}
                </select>
              </label>
            </div>


            <div className="flex flex-col gap-3">
              <span className="text-xs font-semibold tracking-[0.14em] text-black/50 uppercase">
                In wat voor omgeving werk je het liefst?
              </span>
              <div className="flex flex-wrap gap-2.5">
                {omgevingOpties.map((label) => (
                  <button
                    key={label}
                    type="button"
                    onClick={toggle(omgevingen, setOmgevingen, label)}
                    className={chipClass(omgevingen.includes(label))}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {stap === 6 && (
          <div className="flex flex-col gap-9">
            <div className="flex flex-col gap-3">
              <span className="text-xs font-semibold tracking-[0.14em] text-black/50 uppercase">
                Opzegtermijn
              </span>
              <select value={form.beschikbaarheid} onChange={setField("beschikbaarheid")} className={pillInputClass}>
                <option value="">Kies…</option>
                <option value="Per direct">Per direct</option>
                <option value="Binnen een maand">Binnen een maand</option>
                <option value="Binnen drie maanden">Binnen drie maanden</option>
                <option value="Ik kijk rond">Ik kijk rond</option>
              </select>
            </div>

            <div className="flex flex-col gap-3">
              <span className="text-xs font-semibold tracking-[0.14em] text-black/50 uppercase">
                Wat voor dienstverband zoek je?
              </span>
              <div className="grid grid-cols-3 gap-1.5 rounded-full border border-black/15 bg-white p-1.5">
                {dienstverbandOpties.map((label) => {
                  const on = form.dienstverband === label;
                  return (
                    <button
                      key={label}
                      type="button"
                      onClick={() => setForm((f) => ({ ...f, dienstverband: label }))}
                      className={`rounded-full px-2 py-3 text-center text-sm font-semibold whitespace-nowrap transition-colors sm:px-4.5 sm:py-3.5 sm:text-[17px] ${
                        on ? "bg-accent text-white" : "bg-transparent text-black/70"
                      }`}
                    >
                      {label}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="flex flex-col gap-3">
              <span className="text-xs font-semibold tracking-[0.14em] text-black/50 uppercase">
                Wat heb je ervoor over?
              </span>
              <div className="flex flex-wrap gap-2.5">
                {overOpties.map((label) => (
                  <button
                    key={label}
                    type="button"
                    onClick={toggle(overs, setOvers, label)}
                    className={chipClass(overs.includes(label))}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>


          </div>
        )}

        {stap === 7 && (
          <div className="flex flex-col gap-6.5">
            <label className="flex flex-col gap-2.5">
              <span className="text-xs font-semibold tracking-[0.14em] text-black/50 uppercase">Naam</span>
              <input
                value={form.naam}
                onChange={setField("naam")}
                className="rounded-2xl border border-black/15 bg-white px-4.5 py-4 text-[19px] text-[#111] outline-none focus:border-accent"
              />
            </label>
            <label className="flex flex-col gap-2.5">
              <span className="text-xs font-semibold tracking-[0.14em] text-black/50 uppercase">E-mail</span>
              <input
                type="email"
                value={form.email}
                onChange={setField("email")}
                className="rounded-2xl border border-black/15 bg-white px-4.5 py-4 text-[19px] text-[#111] outline-none focus:border-accent"
              />
            </label>
            <label className="flex flex-col gap-2.5">
              <span className="text-xs font-semibold tracking-[0.14em] text-black/50 uppercase">
                Telefoon <span className="font-normal tracking-normal normal-case opacity-70">(optioneel)</span>
              </span>
              <input
                value={form.telefoon}
                onChange={setField("telefoon")}
                className="rounded-2xl border border-black/15 bg-white px-4.5 py-4 text-[19px] text-[#111] outline-none focus:border-accent"
              />
            </label>
            <p className="m-0 max-w-[52ch] text-[15px] leading-relaxed text-black/50">
              We delen je gegevens alleen als jij daar toestemming voor geeft.
            </p>
            <label className="flex items-start gap-3 text-sm leading-relaxed text-black/70">
              <input type="checkbox" checked={akkoord} onChange={(e) => setAkkoord(e.target.checked)} className="mt-1 size-4 accent-accent" />
              <span>Ik ga akkoord met de <Link href="/algemene-voorwaarden" className="font-semibold underline">algemene voorwaarden</Link>.</span>
            </label>
          </div>
        )}

        {fout && <p className="m-0 text-base font-semibold text-[#C42A00]">{fout}</p>}

        <div className="flex flex-col-reverse gap-4 pt-2 sm:flex-row sm:items-center">
          {stap > 1 && (
            <button
              type="button"
              onClick={() => {
                setStap((s) => Math.max(1, s - 1));
                setFout("");
              }}
              className="w-full rounded-full border border-black/20 px-6.5 py-4 text-base font-semibold whitespace-nowrap text-[#111] transition-colors hover:border-black sm:w-auto"
            >
              ← Terug
            </button>
          )}
          <button
            type="submit"
            disabled={bezig}
            className="w-full rounded-full bg-accent px-8 py-4 text-base font-semibold whitespace-nowrap text-white transition-colors hover:bg-black disabled:opacity-60 sm:ml-auto sm:w-auto sm:py-4.5 sm:text-lg"
          >
            {stap === 7 ? (bezig ? "Bezig…" : "Zet me erop →") : "Verder →"}
          </button>
        </div>
      </form>
      <p className="mt-6 m-0 text-[15px] text-black/70">Heb je al een account? <Link href="/inloggen" className="font-bold text-accent underline underline-offset-2 transition-colors hover:text-black">Log hier in.</Link></p>
    </div>
  );
}
