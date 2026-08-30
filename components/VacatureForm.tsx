"use client";

import Link from "next/link";
import { useState } from "react";
import { saveLead } from "@/lib/leads";
import { createClient } from "@/lib/supabase/client";

type VacState = {
  titel: string;
  omschrijving: string;
  datum: string;
  bedrijf: string;
  plaats: string;
  contactpersoon: string;
  email: string;
  akkoord: boolean;
};

const empty: VacState = {
  titel: "",
  omschrijving: "",
  datum: "",
  bedrijf: "",
  plaats: "",
  contactpersoon: "",
  email: "",
  akkoord: false,
};

export default function VacatureForm({ initial }: { initial?: Partial<Pick<VacState, "bedrijf" | "plaats" | "contactpersoon" | "email">> }) {
  const [vac, setVac] = useState<VacState>({ ...empty, ...initial });
  const [fout, setFout] = useState("");
  const [verzonden, setVerzonden] = useState(false);

  const set =
    (key: keyof VacState) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const value = key === "akkoord" ? (e.target as HTMLInputElement).checked : e.target.value;
      setVac((v) => ({ ...v, [key]: value as never }));
      setFout("");
    };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const honeypot = new FormData(e.currentTarget as HTMLFormElement).get("website_confirmation");
    if (typeof honeypot === "string" && honeypot.trim()) return;
    if (!vac.titel.trim()) return setFout("Vul een functietitel in.");
    if (!/.+@.+\..+/.test(vac.email)) return setFout("Vul een geldig e-mailadres in.");
    if (!vac.akkoord) return setFout("Ga akkoord met de voorwaarden om te plaatsen.");
    try {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        const { error } = await supabase.from("vacancies").insert({
          employer_id: user.id,
          titel: vac.titel,
          plaats: vac.plaats || "Onbekend",
          uren: "Fulltime",
          omschrijving: vac.omschrijving,
          status: "Online",
        });
        if (error) throw error;
      }
      await saveLead("vacancy", vac);
      setFout("");
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch {
      setFout("Opslaan lukt nu niet. Probeer het nog een keer.");
    }
  };

  if (verzonden) {
    return (
      <div className="flex flex-col gap-5.5 rounded-[32px] bg-black p-14 text-white">
        <h1 className="m-0 font-display text-[clamp(34px,6vw,76px)] leading-[0.92] font-extrabold tracking-[-0.05em]">
          Vacature staat bij ons.
        </h1>
        <p className="m-0 max-w-[48ch] text-lg leading-relaxed text-white/70">
          Je vacature komt nergens openbaar te staan. We kijken eerst wie er al op zit te wachten en houden je
          vacature actief tot jouw sluitingsdatum.
        </p>
        <div className="flex flex-wrap gap-3">
          <Link
            href="/"
            className="self-start rounded-full border border-white/30 px-7 py-4 font-semibold text-white transition-colors hover:border-white hover:bg-white/10"
          >
            Terug naar home
          </Link>
        </div>
        <div className="mt-2 flex flex-col gap-2.5 rounded-2xl bg-white/10 p-6.5">
          <span className="font-display text-xl leading-tight font-bold tracking-[-0.02em]">
            Maak een werkgeversaccount aan om te reageren op profielen
          </span>
          <p className="m-0 max-w-[48ch] text-[15.5px] leading-relaxed text-white/70">
            Met een account bekijk je de profielen van onze mensen, reageer je rechtstreeks en beheer je je
            vacature.
          </p>
          <Link
            href="/werkgever/registreren"
            className="mt-1 self-start rounded-full bg-accent px-6.5 py-3.5 font-semibold text-white transition-colors hover:bg-white hover:text-[#111]"
          >
            Werkgeversaccount aanmaken →
          </Link>
        </div>
      </div>
    );
  }

  const inputClass =
    "rounded-2xl border border-black/15 bg-white px-4.5 py-4 text-lg text-[#111] outline-none focus:border-accent";

  return (
    <form onSubmit={submit} className="flex flex-col gap-6.5 rounded-[28px] bg-sand p-8.5">
      <label htmlFor="website_confirmation" className="absolute -left-[9999px] h-px w-px overflow-hidden">Website</label>
      <input id="website_confirmation" name="website_confirmation" tabIndex={-1} autoComplete="off" aria-hidden="true" className="absolute -left-[9999px] h-px w-px opacity-0" />
      <label className="flex flex-col gap-2.5">
        <span className="text-base font-semibold">Functietitel</span>
        <input value={vac.titel} onChange={set("titel")} placeholder="bijv. Interieuradviseur" className={inputClass} />
      </label>
      <label className="flex flex-col gap-2.5">
        <span className="text-base font-semibold">Omschrijving</span>
        <textarea
          value={vac.omschrijving}
          onChange={set("omschrijving")}
          rows={5}
          placeholder="Vertel kort waaruit de functie bestaat, wat je biedt en wat je zoekt in iemand."
          className={`resize-y font-body ${inputClass}`}
        />
      </label>
      <label className="flex max-w-[280px] flex-col gap-2.5">
        <span className="text-base font-semibold">Sluitingsdatum</span>
        <input type="date" value={vac.datum} onChange={set("datum")} className={inputClass} />
      </label>
      <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,220px),1fr))] gap-6">
        <label className="flex flex-col gap-2.5">
          <span className="text-base font-semibold">Bedrijfsnaam</span>
          <input value={vac.bedrijf} onChange={set("bedrijf")} placeholder="Naam van je bedrijf" className={inputClass} />
        </label>
      <label className="flex flex-col gap-2.5">
        <span className="text-base font-semibold">Plaats</span>
        <input value={vac.plaats} onChange={set("plaats")} placeholder="Plaats van de vacature" className={inputClass} />
      </label>
      <label className="flex flex-col gap-2.5">
        <span className="text-base font-semibold">Contactpersoon</span>
          <input
            value={vac.contactpersoon}
            onChange={set("contactpersoon")}
            placeholder="Voor- en achternaam"
            className={inputClass}
          />
        </label>
      </div>
      <label className="flex flex-col gap-2.5">
        <span className="text-base font-semibold">E-mail</span>
        <input type="email" value={vac.email} onChange={set("email")} placeholder="naam@bedrijf.nl" className={inputClass} />
      </label>
      <label className="flex cursor-pointer items-start gap-3 text-base leading-snug">
        <input
          type="checkbox"
          checked={vac.akkoord}
          onChange={set("akkoord")}
          className="mt-0.5 h-5 w-5 accent-accent"
        />
        <span>
          Ik ga akkoord met de{" "}
          <Link href="/algemene-voorwaarden" className="text-accent">
            algemene voorwaarden
          </Link>{" "}
          en het{" "}
          <Link href="/privacybeleid" className="text-accent">
            privacybeleid
          </Link>{" "}
          van Finkje.
        </span>
      </label>
      {fout && <p className="m-0 text-base font-semibold text-[#C42A00]">{fout}</p>}
      <div className="flex flex-col gap-4 border-t border-black/10 pt-6.5 sm:flex-row sm:items-center sm:justify-between">
        <span className="text-[14.5px] leading-snug text-black/50">
          Geen account nodig om te plaatsen. Wil je ook reageren op profielen? Maak na het plaatsen gratis een
          werkgeversaccount aan.
        </span>
        <button
          type="submit"
          className="self-end rounded-full bg-accent px-8.5 py-4.5 text-lg font-bold whitespace-nowrap text-white transition-colors hover:bg-black sm:self-auto"
        >
          Vacature plaatsen →
        </button>
      </div>
    </form>
  );
}
