"use client";

import { useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { dienstverbandOpties, omgevingOpties, overOpties, sectorOpties } from "@/lib/data";

type FormState = {
  droombaan: string;
  waarom: string;
  sterk: string;
  tegenaan: string;
  dienstverband: string;
  beschikbaarheid: string;
  locatie: string;
  reisafstand: string;
  reisbereidheid: string;
  sector: string;
  naam: string;
  email: string;
  telefoon: string;
};

const emptyForm: FormState = {
  droombaan: "",
  waarom: "",
  sterk: "",
  tegenaan: "",
  dienstverband: "",
  beschikbaarheid: "",
  locatie: "",
  reisafstand: "",
  reisbereidheid: "",
  sector: "",
  naam: "",
  email: "",
  telefoon: "",
};

export default function SignupForm() {
  const searchParams = useSearchParams();
  const wilFromHero = searchParams.get("wil") || "";

  const [stap, setStap] = useState(1);
  const [form, setForm] = useState<FormState>({ ...emptyForm, droombaan: wilFromHero });
  const [overs, setOvers] = useState<string[]>([]);
  const [omgevingen, setOmgevingen] = useState<string[]>([]);
  const [fout, setFout] = useState("");
  const [klaar, setKlaar] = useState(false);

  const setField = (key: keyof FormState) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm((f) => ({ ...f, [key]: e.target.value }));
    setFout("");
  };

  const toggle = (list: string[], setList: (v: string[]) => void, label: string) => () => {
    setList(list.includes(label) ? list.filter((x) => x !== label) : [...list, label]);
  };

  const submit = (e: React.FormEvent) => {
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
      setStap(4);
      setFout("");
      return;
    }
    if (!form.naam.trim() || !/.+@.+\..+/.test(form.email)) {
      return setFout("Vul je naam en een geldig e-mailadres in.");
    }
    setKlaar(true);
    setFout("");
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
        In vier stappen naar jouw droombaan. Kies zorgvuldig en voel dat jouw hart er sneller van gaat kloppen.
      </p>

      <div className="mb-10 flex gap-2">
        {[1, 2, 3, 4].map((n) => (
          <span
            key={n}
            className={`h-[5px] flex-1 rounded-full transition-colors ${n <= stap ? "bg-accent" : "bg-black/10"}`}
          />
        ))}
      </div>

      <form onSubmit={submit} className="flex flex-col gap-8.5 rounded-[28px] bg-sand p-8.5">
        {stap === 1 && (
          <div className="flex flex-col gap-8">
            <span className="text-xs font-semibold tracking-[0.16em] text-accent uppercase">Stap 1 — Je wil</span>
            <label className="flex flex-col gap-3">
              <span className="font-display text-[clamp(22px,3vw,36px)] leading-tight font-bold tracking-[-0.035em]">
                Wat voor baan wil jíj?
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
                Waarom wil je dat?
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
            <span className="text-xs font-semibold tracking-[0.16em] text-accent uppercase">Stap 2 — Jij</span>
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
          <div className="flex flex-col gap-9">
            <span className="text-xs font-semibold tracking-[0.16em] text-accent uppercase">
              Stap 3 — Je voorkeuren
            </span>

            <div className="flex flex-col gap-3">
              <span className="text-xs font-semibold tracking-[0.14em] text-black/50 uppercase">Dienstverband</span>
              <div className="flex flex-wrap gap-1.5 rounded-2xl border border-black/15 bg-white p-1.5 sm:rounded-full">
                {dienstverbandOpties.map((label) => {
                  const on = form.dienstverband === label;
                  return (
                    <button
                      key={label}
                      type="button"
                      onClick={() => setForm((f) => ({ ...f, dienstverband: label }))}
                      className={`min-w-0 flex-1 rounded-full px-3 py-3 text-[15px] font-semibold transition-colors sm:px-4.5 sm:py-3.5 sm:text-[17px] ${
                        on ? "bg-accent text-white" : "bg-transparent text-black/70"
                      }`}
                      style={{ flexBasis: "120px" }}
                    >
                      {label}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,220px),1fr))] gap-6">
              <label className="flex flex-col gap-2.5">
                <span className="text-xs font-semibold tracking-[0.14em] text-black/50 uppercase">
                  Beschikbaarheid
                </span>
                <select value={form.beschikbaarheid} onChange={setField("beschikbaarheid")} className="rounded-full border border-black/15 bg-white px-5 py-4 text-[17px] text-[#111] outline-none focus:border-accent">
                  <option value="">Kies…</option>
                  <option value="Per direct">Per direct</option>
                  <option value="Binnen een maand">Binnen een maand</option>
                  <option value="Binnen drie maanden">Binnen drie maanden</option>
                  <option value="Ik kijk rond">Ik kijk rond</option>
                </select>
              </label>
              <label className="flex flex-col gap-2.5">
                <span className="text-xs font-semibold tracking-[0.14em] text-black/50 uppercase">Locatie</span>
                <input
                  value={form.locatie}
                  onChange={setField("locatie")}
                  placeholder="bijv. Rotterdam e.o."
                  className="rounded-full border border-black/15 bg-white px-5 py-4 text-[17px] text-[#111] outline-none focus:border-accent"
                />
              </label>
              <label className="flex flex-col gap-2.5">
                <span className="text-xs font-semibold tracking-[0.14em] text-black/50 uppercase">
                  Max. reisafstand
                </span>
                <select value={form.reisafstand} onChange={setField("reisafstand")} className="rounded-full border border-black/15 bg-white px-5 py-4 text-[17px] text-[#111] outline-none focus:border-accent">
                  <option value="">Kies…</option>
                  <option value="Tot 10 km">Tot 10 km</option>
                  <option value="Tot 25 km">Tot 25 km</option>
                  <option value="Tot 50 km">Tot 50 km</option>
                  <option value="Maakt me niet uit">Maakt me niet uit</option>
                </select>
              </label>
              <label className="flex flex-col gap-2.5">
                <span className="text-xs font-semibold tracking-[0.14em] text-black/50 uppercase">
                  Reisbereidheid <span className="font-normal tracking-normal normal-case opacity-70">(optioneel)</span>
                </span>
                <input
                  value={form.reisbereidheid}
                  onChange={setField("reisbereidheid")}
                  placeholder="bijv. liefst dichtbij"
                  className="rounded-full border border-black/15 bg-white px-5 py-4 text-[17px] text-[#111] outline-none focus:border-accent"
                />
              </label>
            </div>

            <div className="flex flex-col gap-3">
              <span className="text-xs font-semibold tracking-[0.14em] text-black/50 uppercase">Werkomgeving</span>
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

            <label className="flex flex-col gap-2.5">
              <span className="text-xs font-semibold tracking-[0.14em] text-black/50 uppercase">Sectorvoorkeur</span>
              <select value={form.sector} onChange={setField("sector")} className="rounded-full border border-black/15 bg-white px-5 py-4 text-[17px] text-[#111] outline-none focus:border-accent">
                <option value="">Kies een sector…</option>
                {sectorOpties.map((s) => (
                  <option key={s} value={s}>
                    {s === "Maakt me niet uit" ? "Ik heb niet echt een type..." : s}
                  </option>
                ))}
              </select>
            </label>

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

        {stap === 4 && (
          <div className="flex flex-col gap-6.5">
            <span className="text-xs font-semibold tracking-[0.16em] text-accent uppercase">
              Stap 4 — Hoe bereiken we je?
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

        <div className="flex flex-col-reverse items-stretch gap-3 border-t border-black/10 pt-6.5 sm:flex-row sm:items-center">
          {stap > 1 && (
            <button
              type="button"
              onClick={() => {
                setStap((s) => Math.max(1, s - 1));
                setFout("");
              }}
              className="w-full rounded-full border border-black/20 px-5 py-3.5 text-base font-semibold text-[#111] transition-colors hover:border-black sm:w-auto sm:px-6.5 sm:py-4"
            >
              ← Terug
            </button>
          )}
          <button
            type="submit"
            className="w-full rounded-full bg-accent px-6 py-4 text-base font-bold text-white transition-colors hover:bg-black sm:ml-auto sm:w-auto sm:px-8.5 sm:py-4.5 sm:text-lg"
          >
            {stap === 4 ? "Zet me erop →" : "Verder →"}
          </button>
        </div>
      </form>
    </div>
  );
}
