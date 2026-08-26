"use client";

import { useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { saveLead } from "@/lib/leads";
import {
  dienstverbandOpties,
  omgevingOpties,
  overOpties,
  sectorOpties,
  handKleuren,
  handFonts,
  handWoorden,
} from "@/lib/data";

type FormState = {
  droombaan: string;
  waarom: string;
  sterk: string;
  tegenaan: string;
  hwoord: string;
  hkleur: string;
  hfont: string;
  dienstverband: string;
  beschikbaarheid: string;
  locatie: string;
  reisafstand: string;
  sector: string;
  ervaring: string;
  naam: string;
  email: string;
  telefoon: string;
};

const emptyForm: FormState = {
  droombaan: "",
  waarom: "",
  sterk: "",
  tegenaan: "",
  hwoord: "",
  hkleur: "",
  hfont: "",
  dienstverband: "",
  beschikbaarheid: "",
  locatie: "",
  reisafstand: "",
  sector: "",
  ervaring: "",
  naam: "",
  email: "",
  telefoon: "",
};

const ervaringOpties = ["Geen ervaring in deze sector", "Minder dan 1 jaar", "1–3 jaar", "3–5 jaar", "5–10 jaar", "10+ jaar"];

export default function SignupForm() {
  const searchParams = useSearchParams();
  const wilFromHero = searchParams.get("wil") || "";

  const [stap, setStap] = useState(1);
  const [form, setForm] = useState<FormState>({ ...emptyForm, droombaan: wilFromHero });
  const [overs, setOvers] = useState<string[]>([]);
  const [omgevingen, setOmgevingen] = useState<string[]>([]);
  const [fout, setFout] = useState("");
  const [klaar, setKlaar] = useState(false);

  const setField =
    (key: keyof FormState) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
      setForm((f) => ({ ...f, [key]: e.target.value }));
      setFout("");
    };

  const kiesHand = (key: "hwoord" | "hkleur" | "hfont", waarde: string) => () => {
    setForm((f) => ({ ...f, [key]: waarde }));
    setFout("");
  };

  const toggle = (list: string[], setList: (v: string[]) => void, label: string) => () => {
    setList(list.includes(label) ? list.filter((x) => x !== label) : [...list, label]);
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (stap === 1) {
      if (!form.droombaan.trim()) return setFout("Vertel eerst wat voor baan je wil.");
      setStap(2);
      setFout("");
      return;
    }
    if (stap === 2) {
      if (!form.sterk.trim()) return setFout("Vertel waar je sterk in bent — één regel is genoeg.");
      setStap(3);
      setFout("");
      return;
    }
    if (stap === 3) {
      if (!form.hwoord || !form.hkleur || !form.hfont) return setFout("Kies een woord, een lettertype en een kleur.");
      setStap(4);
      setFout("");
      return;
    }
    if (stap === 4) {
      setStap(5);
      setFout("");
      return;
    }
    if (stap === 5) {
      setStap(6);
      setFout("");
      return;
    }
    if (!form.naam.trim() || !/.+@.+\..+/.test(form.email)) {
      return setFout("Vul je naam en een geldig e-mailadres in.");
    }
    try {
      await saveLead("signup", { ...form, overs, omgevingen });
      setKlaar(true);
      setFout("");
    } catch {
      setFout("Opslaan lukt nu niet. Probeer het nog een keer.");
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (klaar) {
    return (
      <div className="flex flex-col gap-5.5 rounded-[32px] bg-black p-14 text-white">
        <h1 className="m-0 font-display text-[clamp(34px,6vw,76px)] leading-[0.92] font-extrabold tracking-[-0.05em]">
          Je staat erop. Welkom, Willer.
        </h1>
        <p className="m-0 max-w-[46ch] text-lg leading-relaxed text-white/70">
          Je hoeft nu niets meer te doen. Zodra een werkgever een vacature neerzet die aansluit op jouw wil en
          voorkeuren, laten wij het weten.
        </p>
        <Link
          href="/"
          className="self-start rounded-full bg-accent px-7 py-4 font-semibold text-white transition-colors hover:bg-white hover:text-[#111]"
        >
          Terug naar home
        </Link>
      </div>
    );
  }

  const inputClass =
    "rounded-2xl border border-black/15 bg-white px-4.5 py-4 text-lg text-[#111] outline-none focus:border-accent";
  const pillInputClass =
    "rounded-full border border-black/15 bg-white px-5 py-4 text-[17px] text-[#111] outline-none focus:border-accent";
  const chipClass = (active: boolean) =>
    `rounded-full border px-5 py-3 text-[17px] font-medium transition-colors ${
      active ? "border-accent bg-accent text-white" : "border-black/15 bg-white text-[#111]"
    }`;

  return (
    <div>
      <h1 className="m-0 font-display text-[clamp(36px,7vw,96px)] leading-[0.9] font-extrabold tracking-[-0.05em]">
        Wat is je droombaan?
      </h1>
      <p className="mt-6 mb-10 max-w-[56ch] text-lg leading-snug text-black/62">
        In zes stappen naar jouw droombaan. Kies zorgvuldig en voel dat jouw hart er sneller van gaat kloppen.
      </p>

      <div className="mb-10 flex gap-2">
        {[1, 2, 3, 4, 5, 6].map((n) => (
          <span
            key={n}
            className={`h-[5px] flex-1 rounded-full transition-colors ${n <= stap ? "bg-accent" : "bg-black/10"}`}
          />
        ))}
      </div>

      <form onSubmit={submit} className="flex flex-col gap-8.5 rounded-[28px] bg-sand p-8.5">
        {stap === 1 && (
          <div className="flex flex-col gap-8">
            <span className="text-xs font-semibold tracking-[0.16em] text-accent uppercase">Stap 1 — de Functie</span>
            <label className="flex flex-col gap-3">
              <span className="font-display text-[clamp(22px,3vw,36px)] leading-tight font-bold tracking-[-0.035em]">
                Wat wil je graag doen?
              </span>
              <input
                value={form.droombaan}
                onChange={setField("droombaan")}
                placeholder="bv. meubelmaker"
                className="rounded-2xl border border-black/15 bg-white px-4.5 py-4 font-display text-[clamp(20px,2.6vw,30px)] font-bold tracking-[-0.03em] text-accent outline-none focus:border-accent"
              />
            </label>
            <label className="flex flex-col gap-3">
              <span className="font-display text-[clamp(22px,3vw,36px)] leading-tight font-bold tracking-[-0.035em]">
                Waarom juist dat?
              </span>
              <textarea
                value={form.waarom}
                onChange={setField("waarom")}
                rows={3}
                placeholder="In je eigen woorden, dit blijft tussen ons."
                className={`resize-y font-body ${inputClass}`}
              />
            </label>
          </div>
        )}

        {stap === 2 && (
          <div className="flex flex-col gap-8">
            <span className="text-xs font-semibold tracking-[0.16em] text-accent uppercase">Stap 2 — OVER JOU</span>
            <label className="flex flex-col gap-3">
              <span className="font-display text-[clamp(22px,3vw,36px)] leading-tight font-bold tracking-[-0.035em]">
                Waar ben je sterk in?
              </span>
              <textarea
                value={form.sterk}
                onChange={setField("sterk")}
                rows={3}
                placeholder="Waar mensen je om vragen, waar je goed in bent — ook buiten werk."
                className={`resize-y font-body ${inputClass}`}
              />
            </label>
            <label className="flex flex-col gap-3">
              <span className="font-display text-[clamp(22px,3vw,36px)] leading-tight font-bold tracking-[-0.035em]">
                Waar loop je tegenaan?
              </span>
              <textarea
                value={form.tegenaan}
                onChange={setField("tegenaan")}
                rows={3}
                placeholder="Omdat dat vaak het echte verhaal is: geen diploma, een gat in je cv, taal of gezondheid."
                className={`resize-y font-body ${inputClass}`}
              />
              <span className="text-sm text-black/50">Dit gebruiken we om je te helpen, niet om je af te wijzen.</span>
            </label>
          </div>
        )}

        {stap === 3 && (
          <div className="flex flex-col gap-7.5">
            <div className="flex flex-col gap-2.5">
              <span className="text-xs font-semibold tracking-[0.16em] text-accent uppercase">
                Stap 3 — Persoonlijk tintje
              </span>
              <span className="font-display text-[clamp(22px,3vw,36px)] leading-tight font-bold tracking-[-0.035em]">
                Geef je aanmelding een persoonlijk tintje
              </span>
              <span className="max-w-[56ch] text-[16.5px] leading-snug text-black/60">
                Kies een woord, een lettertype en een kleur dat bij je past. Er is geen goed of fout. Kies wat het
                beste bij je past en denk er niet te lang over na.
              </span>
            </div>

            <div className="flex flex-col gap-3">
              <span className="text-xs font-semibold tracking-[0.14em] text-black/50 uppercase">
                Kies het woord dat het meest bij je past
              </span>
              <div className="flex flex-wrap gap-2.5">
                {handWoorden.map((w) => (
                  <button
                    key={w}
                    type="button"
                    onClick={kiesHand("hwoord", w)}
                    className={`rounded-full border px-5 py-3 text-base font-semibold transition-colors ${
                      form.hwoord === w ? "border-black bg-black text-white" : "border-black/14 bg-white text-[#111]"
                    }`}
                  >
                    {w}
                  </button>
                ))}
              </div>
              <Link href="/handschrift" className="text-[14.5px] font-semibold">
                Wat betekenen deze woorden? →
              </Link>
            </div>

            <div className="flex flex-col gap-3">
              <span className="text-xs font-semibold tracking-[0.14em] text-black/50 uppercase">Lettertype</span>
              <div className="flex flex-wrap gap-2.5">
                {handFonts.map((f) => (
                  <button
                    key={f.font}
                    type="button"
                    onClick={kiesHand("hfont", f.font)}
                    style={{ fontFamily: `'${f.font}', sans-serif` }}
                    className={`flex-1 basis-40 rounded-2xl border px-5 py-4 text-left text-[22px] font-bold text-[#111] transition-colors ${
                      form.hfont === f.font ? "border-2 border-black" : "border border-black/14"
                    }`}
                  >
                    {f.naam}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-3">
              <span className="text-xs font-semibold tracking-[0.14em] text-black/50 uppercase">Kleur</span>
              <div className="flex flex-wrap gap-3">
                {handKleuren.map((k) => (
                  <button
                    key={k.hex}
                    type="button"
                    onClick={kiesHand("hkleur", k.hex)}
                    aria-label={k.naam}
                    title={k.naam}
                    style={{ background: k.hex }}
                    className={`h-14 w-14 rounded-full transition-shadow ${
                      form.hkleur === k.hex ? "shadow-[0_0_0_3px_#fff_inset] ring-3 ring-black" : "ring-0"
                    }`}
                  />
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-2.5">
              <span className="text-xs font-semibold tracking-[0.14em] text-black/50 uppercase">Jouw voorbeeld</span>
              <div className="max-w-[380px] overflow-hidden rounded-3xl border border-black/12 bg-white">
                <div
                  className="flex h-11.5 min-w-45 items-center rounded-tl-[24px] rounded-br-[18px] px-4 text-[18px] font-bold text-white"
                  style={{
                    background: form.hkleur || "rgba(17,17,17,0.15)",
                    fontFamily: `'${form.hfont || "Bricolage Grotesque"}', sans-serif`,
                    letterSpacing: form.hfont === "Instrument Serif" ? "0.03em" : "normal",
                  }}
                >
                  {form.hwoord || "Jouw woord"}
                </div>
                <div className="px-5.5 pt-3.5 pb-6 font-display text-3xl leading-[0.98] font-extrabold tracking-[-0.04em]">
                  {form.droombaan || "Jouw baan"}
                </div>
              </div>
            </div>
          </div>
        )}

        {stap === 4 && (
          <div className="flex flex-col gap-9">
            <span className="text-xs font-semibold tracking-[0.16em] text-accent uppercase">
              Stap 4 — Jouw ideale werkomgeving
            </span>

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

        {stap === 5 && (
          <div className="flex flex-col gap-9">
            <span className="text-xs font-semibold tracking-[0.16em] text-accent uppercase">
              Stap 5 — Wanneer en waar
            </span>

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

            <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,190px),1fr))] gap-4.5">
              <label className="flex min-w-0 flex-col gap-2.5">
                <span className="text-xs font-semibold tracking-[0.14em] text-black/50 uppercase">
                  Beschikbaarheid
                </span>
                <select value={form.beschikbaarheid} onChange={setField("beschikbaarheid")} className={pillInputClass}>
                  <option value="">Kies…</option>
                  <option value="Per direct">Per direct</option>
                  <option value="Binnen een maand">Binnen een maand</option>
                  <option value="Binnen drie maanden">Binnen drie maanden</option>
                  <option value="Ik kijk rond">Ik kijk rond</option>
                </select>
              </label>
              <label className="flex flex-col gap-2.5">
                <span className="text-xs font-semibold tracking-[0.14em] text-black/50 uppercase">Woonplaats</span>
                <input
                  value={form.locatie}
                  onChange={setField("locatie")}
                  placeholder="bijv. Rotterdam"
                  className={pillInputClass}
                />
              </label>
              <label className="flex flex-col gap-2.5">
                <span className="text-xs font-semibold tracking-[0.14em] text-black/50 uppercase">
                  Max. reisafstand
                </span>
                <select value={form.reisafstand} onChange={setField("reisafstand")} className={pillInputClass}>
                  <option value="">Kies…</option>
                  <option value="Tot 10 km">Tot 10 km</option>
                  <option value="Tot 25 km">Tot 25 km</option>
                  <option value="Tot 50 km">Tot 50 km</option>
                  <option value="Maakt me niet uit">Maakt me niet uit</option>
                </select>
              </label>
            </div>
          </div>
        )}

        {stap === 6 && (
          <div className="flex flex-col gap-6.5">
            <span className="text-xs font-semibold tracking-[0.16em] text-accent uppercase">
              Stap 6 — Hoe bereiken we je?
            </span>
            <label className="flex flex-col gap-2.5">
              <span className="text-xs font-semibold tracking-[0.14em] text-black/50 uppercase">Naam</span>
              <input
                value={form.naam}
                onChange={setField("naam")}
                placeholder="Je naam"
                className="rounded-2xl border border-black/15 bg-white px-4.5 py-4 text-[19px] text-[#111] outline-none focus:border-accent"
              />
            </label>
            <label className="flex flex-col gap-2.5">
              <span className="text-xs font-semibold tracking-[0.14em] text-black/50 uppercase">E-mail</span>
              <input
                type="email"
                value={form.email}
                onChange={setField("email")}
                placeholder="jij@voorbeeld.nl"
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
                placeholder="06 …"
                className="rounded-2xl border border-black/15 bg-white px-4.5 py-4 text-[19px] text-[#111] outline-none focus:border-accent"
              />
            </label>
            <p className="m-0 max-w-[52ch] text-[15px] leading-relaxed text-black/50">
              Je naam en contactgegevens zijn nooit zichtbaar voor werkgevers, totdat jij beslist om in gesprek te
              gaan.
            </p>
          </div>
        )}

        {fout && <p className="m-0 text-base font-semibold text-[#C42A00]">{fout}</p>}

        <div className="flex flex-col-reverse gap-3 border-t border-black/10 pt-6.5 sm:flex-row sm:items-center">
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
            className="w-full rounded-full bg-accent px-8.5 py-4 text-base font-bold whitespace-nowrap text-white transition-colors hover:bg-black sm:ml-auto sm:w-auto sm:py-4.5 sm:text-lg"
          >
            {stap === 6 ? "Zet me erop →" : "Verder →"}
          </button>
        </div>
      </form>
    </div>
  );
}
