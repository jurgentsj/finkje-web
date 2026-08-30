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

  const handleNext = async (e: React.FormEvent) => {
    e.preventDefault();
    const honeypot = new FormData(e.currentTarget as HTMLFormElement).get("website_confirmation");
    if (typeof honeypot === "string" && honeypot.trim()) return;
    setFout("");
    if (!/.+@.+\..+/.test(form.email)) {
      return setFout("Vul een geldig e-mailadres in.");
    }

    setBezig(true);
    try {
      const supabase = createClient();
      const { error } = await supabase.auth.signInWithOtp({
        email: form.email,
        options: { shouldCreateUser: true },
      });

      if (error) {
        console.error("[v0] Employer signup OTP failed:", { code: error.code, message: error.message, status: error.status });
        const message = error.message.toLowerCase();
        setFout(
          message.includes("rate limit") || message.includes("too many requests")
            ? "Supabase blokkeert tijdelijk nieuwe e-mails. Wacht even en probeer daarna opnieuw."
            : "De inlogcode kon niet worden verzonden. Probeer het nog een keer.",
        );
        setBezig(false);
        return;
      }

      setBezig(false);
      setWachtOpCode(true);
    } catch {
      setBezig(false);
      setFout("Registreren lukt nu niet. Probeer het nog een keer.");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const honeypot = new FormData(e.currentTarget as HTMLFormElement).get("website_confirmation");
    if (typeof honeypot === "string" && honeypot.trim()) return;
    setFout("");
    if (!form.bedrijfsnaam.trim() || !form.contactpersoon.trim()) {
      return setFout("Bedrijfsnaam en contactpersoon zijn verplicht.");
    }

    setBezig(true);
    try {
      const supabase = createClient();
      const { data, error } = await supabase.auth.getUser();
      if (error || !data.user) {
        setBezig(false);
        setFout("Je sessie is verlopen. Vraag een nieuwe inlogcode aan.");
        return;
      }

      await completeAuthProfile(supabase, data.user, "werkgever");
      setBezig(false);
      router.replace("/werkgever/dashboard");
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

    await supabase.auth.updateUser({
      data: {
        role: "werkgever",
        bedrijfsnaam: form.bedrijfsnaam,
        contactpersoon: form.contactpersoon,
        sector: form.sector,
        bedrijfsgrootte: form.bedrijfsgrootte,
        website: form.website,
        telefoon: form.telefoon,
      },
    });
    setWachtOpCode(false);
    setStap(2);
    setBezig(false);
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
      <form onSubmit={bevestigCode} className="flex flex-col gap-6 rounded-[28px] p-8 sm:p-10">
        <div className="flex flex-col gap-3 border-b border-black/10 pb-6">
          <h1 className="m-0 font-display text-[32px] leading-tight font-normal tracking-[-0.03em]">
            Voer je inlogcode in
          </h1>
          <p className="m-0 text-lg leading-relaxed text-black/60">
            We hebben een inlogcode gestuurd naar <strong className="font-semibold text-black">{form.email}</strong>.
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
            className="rounded-2xl border border-black/15 bg-white px-4.5 py-4 text-center text-2xl font-bold tracking-[0.3em] text-accent outline-none placeholder:font-normal placeholder:text-black/25 focus:border-accent"
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
className="flex flex-col gap-6 rounded-[28px] p-8 sm:p-10"
    >
      <label htmlFor="website_confirmation" className="absolute -left-[9999px] h-px w-px overflow-hidden">Website</label>
      <input id="website_confirmation" name="website_confirmation" tabIndex={-1} autoComplete="off" aria-hidden="true" className="absolute -left-[9999px] h-px w-px opacity-0" />
      <div className="flex flex-col gap-2 border-b border-black/10 pb-6">
        <h1 className="m-0 font-display text-[34px] leading-tight font-normal tracking-[-0.03em]">
          {stap === 1 ? "Creëer je account" : "Je bedrijfsgegevens"}
        </h1>
        <p className="m-0 text-[16px] leading-relaxed text-black/55">
          {stap === 1 ? "Maak je account aan. Je ontvangt daarna een inlogcode per e-mail." : "Vul je bedrijfsgegevens in om verder te gaan."}
        </p>
      </div>

      {stap === 1 ? (
        <div className="flex flex-col gap-5">
          <label className="flex flex-col gap-2">
            <span className="text-[12px] font-semibold tracking-[0.12em] text-black/55 uppercase">Zakelijk e-mailadres</span>
            <input
              type="email"
              value={form.email}
              onChange={setField("email")}
              className="rounded-2xl border border-black/15 bg-white px-4.5 py-4 text-lg text-[#111] outline-none focus:border-accent"
            />
          </label>
        </div>
      ) : (
        <div className="flex flex-col gap-5">
          <label className="flex flex-col gap-2">
            <span className="text-[11px] font-semibold tracking-[0.12em] text-black/55 uppercase">Bedrijfsnaam</span>
            <input
              type="text"
              value={form.bedrijfsnaam}
              onChange={setField("bedrijfsnaam")}
              className="rounded-2xl border border-black/15 bg-white px-4.5 py-4 text-lg text-[#111] outline-none focus:border-accent"
            />
          </label>
          <label className="flex flex-col gap-2">
            <span className="text-[11px] font-semibold tracking-[0.12em] text-black/55 uppercase">Contactpersoon</span>
            <input
              type="text"
              value={form.contactpersoon}
              onChange={setField("contactpersoon")}
              
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
                className="rounded-2xl border border-black/15 bg-white px-4.5 py-4 text-lg text-[#111] outline-none focus:border-accent"
              />
            </label>
            <label className="flex flex-col gap-2">
              <span className="text-[11px] font-semibold tracking-[0.12em] text-black/55 uppercase">Telefoon (optioneel)</span>
              <input
                type="text"
                value={form.telefoon}
                onChange={setField("telefoon")}
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
          {stap === 1 ? "Doorgaan →" : bezig ? "Account wordt aangemaakt…" : "Gratis account aanmaken"}
        </button>
      </div>
      {next && <input type="hidden" name="next" value={next} />}
    </form>
  );
}
