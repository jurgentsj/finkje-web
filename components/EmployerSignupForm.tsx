"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { completeAuthProfile } from "@/lib/complete-auth-profile";

type FormState = {
  naam: string;
  email: string;
  wachtwoord: string;
  bedrijfsnaam: string;
  contactpersoon: string;
  sector: string;
  bedrijfsgrootte: string;
  website: string;
  telefoon: string;
};

const emptyForm: FormState = {
  naam: "",
  email: "",
  wachtwoord: "",
  bedrijfsnaam: "",
  contactpersoon: "",
  sector: "",
  bedrijfsgrootte: "",
  website: "",
  telefoon: "",
};

const bedrijfsgrootteOpties = ["1-10", "11-50", "51-200", "201-1000", "1000+"];

export default function EmployerSignupForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const next = searchParams.get("next");

  const [stap, setStap] = useState<1 | 2>(1);
  const [form, setForm] = useState<FormState>(emptyForm);
  const [fout, setFout] = useState("");
  const [bezig, setBezig] = useState(false);
  const [klaar, setKlaar] = useState(false);
  const [wachtOpCode, setWachtOpCode] = useState(false);
  const [code, setCode] = useState("");

  const setField = (key: keyof FormState) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((f) => ({ ...f, [key]: e.target.value }));
  };

  const handleNext = (e: React.FormEvent) => {
    e.preventDefault();
    setFout("");
    if (!form.naam.trim() || !/.+@.+\..+/.test(form.email)) {
      return setFout("Vul je naam en een geldig e-mailadres in.");
    }
    setStap(2);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFout("");
    if (!form.bedrijfsnaam.trim() || !form.contactpersoon.trim()) {
      return setFout("Bedrijfsnaam en contactpersoon zijn verplicht.");
    }

    setBezig(true);
    try {
      const supabase = createClient();
      const { data, error } = await supabase.auth.signInWithOtp({
        email: form.email,
        options: {
          shouldCreateUser: true,
          data: {
            role: "werkgever",
            naam: form.naam,
            bedrijfsnaam: form.bedrijfsnaam,
            contactpersoon: form.contactpersoon,
            sector: form.sector,
            bedrijfsgrootte: form.bedrijfsgrootte,
            website: form.website,
            telefoon: form.telefoon,
          },
        },
      });

      if (error) {
        console.error("[v0] Employer signup OTP failed:", { code: error.code, message: error.message, status: error.status });
        setBezig(false);
        const message = error.message.toLowerCase();
        if (message.includes("rate limit") || message.includes("too many requests")) {
          setFout("Supabase blokkeert tijdelijk nieuwe e-mails. Wacht even en probeer daarna opnieuw.");
        } else {
          setFout(`Supabase: ${error.message}`);
        }
        return;
      }

      if (data.session && data.user) {
        await completeAuthProfile(supabase, data.user);
        setBezig(false);
        setKlaar(true);
        return;
      }

      setBezig(false);
      setWachtOpCode(true);
    } catch {
      setBezig(false);
      setFout("Registreren lukt nu niet. Probeer het nog een keer.");
    }
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

    const destination = await completeAuthProfile(supabase, data.user);
    setBezig(false);
    router.replace(next || destination);
  };

  if (klaar) {
    return (
      <div className="flex flex-col gap-6 rounded-[28px] bg-sand p-8 sm:p-10" role="status">
        <div className="flex flex-col gap-3">
          <span className="text-base font-semibold text-accent">Gelukt</span>
          <h2 className="m-0 font-display text-[clamp(26px,3vw,36px)] leading-tight font-bold tracking-[-0.03em]">
            Je account is aangemaakt.
          </h2>
          <p className="m-0 text-lg leading-relaxed text-black/60">Je bent ingelogd en kunt direct verder.</p>
        </div>
        <Link
          href="/werkgever/dashboard"
          className="self-start rounded-full bg-accent px-7 py-4 text-[16px] font-bold text-white transition-colors hover:bg-black"
        >
          Naar jouw dashboard →
        </Link>
      </div>
    );
  }

  if (wachtOpCode) {
    return (
      <form onSubmit={bevestigCode} className="flex flex-col gap-6 rounded-[28px] bg-sand p-8 sm:p-10">
        <div className="flex flex-col gap-3">
          <span className="text-base font-semibold text-accent">Check je inbox</span>
          <h2 className="m-0 font-display text-[clamp(26px,3vw,36px)] leading-tight font-bold tracking-[-0.03em]">
            Vul je inlogcode in.
          </h2>
          <p className="m-0 text-lg leading-relaxed text-black/60">
            We hebben een 6-cijferige code gestuurd naar <strong className="font-semibold text-black">{form.email}</strong>.
          </p>
        </div>
        <label className="flex flex-col gap-2.5">
          <span className="text-base font-semibold">Inlogcode</span>
          <input
            type="text"
            inputMode="numeric"
            autoComplete="one-time-code"
            maxLength={6}
            value={code}
            onChange={(e) => setCode(e.target.value.replace(/\D/g, ""))}
            placeholder="123456"
            className="rounded-2xl border border-black/15 bg-white px-4.5 py-4 text-center text-2xl tracking-[0.3em] text-[#111] outline-none focus:border-accent"
          />
        </label>
        {fout && <p className="m-0 text-[14px] font-medium text-red-600">{fout}</p>}
        <div className="flex items-center justify-between border-t border-black/10 pt-5">
          <button
            type="button"
            onClick={() => {
              setWachtOpCode(false);
              setCode("");
              setFout("");
            }}
            className="text-[15px] font-semibold text-accent underline-offset-4 hover:underline"
          >
            ← Terug
          </button>
          <button
            type="submit"
            disabled={bezig}
            className="rounded-full bg-accent px-7 py-4 text-[16px] font-bold text-white transition-colors hover:bg-black disabled:opacity-60"
          >
            {bezig ? "Even geduld…" : "Bevestigen →"}
          </button>
        </div>
      </form>
    );
  }

  return (
    <form
      onSubmit={stap === 1 ? handleNext : handleSubmit}
      className="flex flex-col gap-6 rounded-[28px] bg-sand p-8 sm:p-10"
    >
      <div className="flex flex-col gap-2 border-b border-black/10 pb-6">
        <div className="flex items-center justify-between gap-4">
          <span className="text-[13px] font-semibold text-accent">Stap {stap} van 2</span>
          <span className="text-[13px] text-black/45">Gratis account</span>
        </div>
        <h1 className="m-0 font-display text-[clamp(26px,3.4vw,36px)] leading-tight font-bold tracking-[-0.03em]">
          {stap === 1 ? "Eerst je e-mailadres" : "Je bedrijfsgegevens"}
        </h1>
        <p className="m-0 text-[15px] leading-relaxed text-black/55">
          {stap === 1 ? "Je maakt gratis een account aan. Je ontvangt daarna een eenmalige inlogcode." : "Nog twee gegevens en je kunt direct profielen bekijken."}
        </p>
      </div>

      {stap === 1 ? (
        <div className="flex flex-col gap-5">
          <label className="flex flex-col gap-2">
            <span className="text-[11px] font-semibold tracking-[0.12em] text-black/55 uppercase">Jouw naam</span>
            <input
              type="text"
              value={form.naam}
              onChange={setField("naam")}
              placeholder="Voor- en achternaam"
              className="rounded-2xl border border-black/15 bg-white px-4.5 py-4 text-lg text-[#111] outline-none focus:border-accent"
            />
          </label>
          <label className="flex flex-col gap-2">
            <span className="text-[11px] font-semibold tracking-[0.12em] text-black/55 uppercase">Zakelijk e-mailadres</span>
            <input
              type="email"
              value={form.email}
              onChange={setField("email")}
              placeholder="naam@bedrijf.nl"
              className="rounded-2xl border border-black/15 bg-white px-4.5 py-4 text-lg text-[#111] outline-none focus:border-accent"
            />
          </label>
        </div>
      ) : (
        <div className="flex flex-col gap-5">
          <p className="m-0 text-[14px] leading-relaxed text-black/50">
            Nog een paar gegevens, daarna kun je direct profielen bekijken en reageren.
          </p>
          <label className="flex flex-col gap-2">
            <span className="text-[11px] font-semibold tracking-[0.12em] text-black/55 uppercase">Bedrijfsnaam</span>
            <input
              type="text"
              value={form.bedrijfsnaam}
              onChange={setField("bedrijfsnaam")}
              placeholder="Bedrijfsnaam B.V."
              className="rounded-2xl border border-black/15 bg-white px-4.5 py-4 text-lg text-[#111] outline-none focus:border-accent"
            />
          </label>
          <label className="flex flex-col gap-2">
            <span className="text-[11px] font-semibold tracking-[0.12em] text-black/55 uppercase">Contactpersoon</span>
            <input
              type="text"
              value={form.contactpersoon}
              onChange={setField("contactpersoon")}
              placeholder="Wie is het aanspreekpunt?"
              className="rounded-2xl border border-black/15 bg-white px-4.5 py-4 text-lg text-[#111] outline-none focus:border-accent"
            />
          </label>
          <div className="hidden grid-cols-1 gap-5 sm:grid-cols-2">
            <label className="flex flex-col gap-2">
              <span className="text-[11px] font-semibold tracking-[0.12em] text-black/55 uppercase">Sector</span>
              <input
                type="text"
                value={form.sector}
                onChange={setField("sector")}
                placeholder="Bijv. Zorg, Bouw, IT"
                className="rounded-2xl border border-black/15 bg-white px-4.5 py-4 text-lg text-[#111] outline-none focus:border-accent"
              />
            </label>
            <label className="flex flex-col gap-2">
              <span className="text-[11px] font-semibold tracking-[0.12em] text-black/55 uppercase">Bedrijfsgrootte</span>
              <select
                value={form.bedrijfsgrootte}
                onChange={(e) => setForm((f) => ({ ...f, bedrijfsgrootte: e.target.value }))}
                className="rounded-2xl border border-black/15 bg-white px-4.5 py-4 text-lg text-[#111] outline-none focus:border-accent"
              >
                <option value="">Kies een optie</option>
                {bedrijfsgrootteOpties.map((o) => (
                  <option key={o} value={o}>
                    {o} medewerkers
                  </option>
                ))}
              </select>
            </label>
          </div>
          <div className="hidden grid-cols-1 gap-5 sm:grid-cols-2">
            <label className="flex flex-col gap-2">
              <span className="text-[11px] font-semibold tracking-[0.12em] text-black/55 uppercase">Website (optioneel)</span>
              <input
                type="text"
                value={form.website}
                onChange={setField("website")}
                placeholder="www.bedrijf.nl"
                className="rounded-2xl border border-black/15 bg-white px-4.5 py-4 text-lg text-[#111] outline-none focus:border-accent"
              />
            </label>
            <label className="flex flex-col gap-2">
              <span className="text-[11px] font-semibold tracking-[0.12em] text-black/55 uppercase">Telefoon (optioneel)</span>
              <input
                type="text"
                value={form.telefoon}
                onChange={setField("telefoon")}
                placeholder="06-12345678"
                className="rounded-2xl border border-black/15 bg-white px-4.5 py-4 text-lg text-[#111] outline-none focus:border-accent"
              />
            </label>
          </div>
        </div>
      )}

      {fout && <p className="m-0 text-[14px] font-medium text-red-600">{fout}</p>}

      <div className="flex items-center justify-between border-t border-black/10 pt-5">
        {stap === 2 ? (
          <button
            type="button"
            onClick={() => setStap(1)}
            className="text-[14px] font-semibold text-black/50 transition-colors hover:text-black"
          >
            ← Terug
          </button>
        ) : (
          <Link href="/account/inloggen-werkgever" className="text-[14px] font-semibold text-black/50 transition-colors hover:text-black">
            Al een account?
          </Link>
        )}
        <button
          type="submit"
          disabled={bezig}
          className="rounded-full bg-accent px-7 py-4 text-[17px] font-semibold text-white transition-colors hover:bg-black disabled:opacity-60"
        >
          {stap === 1 ? "Verder →" : bezig ? "Account wordt aangemaakt…" : "Gratis account aanmaken"}
        </button>
      </div>
      {next && <input type="hidden" name="next" value={next} />}
    </form>
  );
}
