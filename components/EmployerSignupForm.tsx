"use client";

import { useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

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
  const searchParams = useSearchParams();
  const next = searchParams.get("next");

  const [stap, setStap] = useState<1 | 2>(1);
  const [form, setForm] = useState<FormState>(emptyForm);
  const [fout, setFout] = useState("");
  const [bezig, setBezig] = useState(false);
  const [klaar, setKlaar] = useState(false);

  const setField = (key: keyof FormState) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((f) => ({ ...f, [key]: e.target.value }));
  };

  const handleNext = (e: React.FormEvent) => {
    e.preventDefault();
    setFout("");
    if (!form.naam.trim() || !/.+@.+\..+/.test(form.email)) {
      return setFout("Vul je naam en een geldig e-mailadres in.");
    }
    if (form.wachtwoord.length < 6) {
      return setFout("Kies een wachtwoord van minimaal 6 tekens.");
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
      const { data, error } = await supabase.auth.signUp({
        email: form.email,
        password: form.wachtwoord,
        options: {
          emailRedirectTo:
            process.env.NEXT_PUBLIC_DEV_SUPABASE_REDIRECT_URL ?? `${window.location.origin}/auth/callback`,
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
        setBezig(false);
        if (error.message.toLowerCase().includes("rate limit")) {
          setFout("Te veel pogingen. Probeer het over een paar minuten opnieuw.");
        } else if (error.message.toLowerCase().includes("password")) {
          setFout("Kies een sterker wachtwoord.");
        } else if (error.message.toLowerCase().includes("registered")) {
          setFout("Dit e-mailadres is al in gebruik. Log in of gebruik een ander adres.");
        } else {
          setFout("Registreren lukt nu niet. Probeer het nog een keer.");
        }
        return;
      }

      if (data.session && data.user) {
        await supabase.from("employer_profiles").upsert({
          id: data.user.id,
          bedrijfsnaam: form.bedrijfsnaam,
          contactpersoon: form.contactpersoon,
          sector: form.sector || null,
          bedrijfsgrootte: form.bedrijfsgrootte || null,
          website: form.website || null,
          telefoon: form.telefoon || null,
        });
      }

      setKlaar(true);
      setBezig(false);
    } catch {
      setBezig(false);
      setFout("Registreren lukt nu niet. Probeer het nog een keer.");
    }
  };

  if (klaar) {
    return (
      <div className="flex flex-col gap-4 rounded-2xl border border-black/10 bg-white p-9 text-center sm:p-12">
        <h1 className="m-0 font-display text-[clamp(26px,3.4vw,36px)] leading-tight font-bold tracking-[-0.03em]">
          Account aangemaakt
        </h1>
        <p className="m-0 text-[15.5px] leading-relaxed text-black/60">
          Bevestig je e-mailadres via de link die we je stuurden. Daarna kun je direct inloggen en profielen
          bekijken.
        </p>
        <Link
          href="/inloggen"
          className="mx-auto mt-2 rounded-lg bg-black px-6 py-3 text-[15px] font-semibold text-white transition-colors hover:bg-black/80"
        >
          Naar inloggen
        </Link>
      </div>
    );
  }

  return (
    <form
      onSubmit={stap === 1 ? handleNext : handleSubmit}
      className="flex flex-col gap-7 rounded-2xl border border-black/10 bg-white p-7 sm:p-10"
    >
      <div className="flex items-center justify-between border-b border-black/10 pb-5">
        <h1 className="m-0 font-display text-[clamp(22px,2.8vw,28px)] leading-tight font-bold tracking-[-0.03em]">
          Werkgeversaccount aanmaken
        </h1>
        <span className="text-[13px] font-medium text-black/45">Stap {stap} van 2</span>
      </div>

      {stap === 1 ? (
        <div className="flex flex-col gap-5">
          <label className="flex flex-col gap-2">
            <span className="text-xs font-semibold tracking-[0.1em] text-black/50 uppercase">Jouw naam</span>
            <input
              type="text"
              value={form.naam}
              onChange={setField("naam")}
              placeholder="Voor- en achternaam"
              className="rounded-lg border border-black/15 bg-white px-4 py-3 text-[16px] text-[#111] outline-none focus:border-black"
            />
          </label>
          <label className="flex flex-col gap-2">
            <span className="text-xs font-semibold tracking-[0.1em] text-black/50 uppercase">Zakelijk e-mailadres</span>
            <input
              type="email"
              value={form.email}
              onChange={setField("email")}
              placeholder="naam@bedrijf.nl"
              className="rounded-lg border border-black/15 bg-white px-4 py-3 text-[16px] text-[#111] outline-none focus:border-black"
            />
          </label>
          <label className="flex flex-col gap-2">
            <span className="text-xs font-semibold tracking-[0.1em] text-black/50 uppercase">Wachtwoord</span>
            <input
              type="password"
              value={form.wachtwoord}
              onChange={setField("wachtwoord")}
              placeholder="Minimaal 6 tekens"
              autoComplete="new-password"
              className="rounded-lg border border-black/15 bg-white px-4 py-3 text-[16px] text-[#111] outline-none focus:border-black"
            />
          </label>
        </div>
      ) : (
        <div className="flex flex-col gap-5">
          <p className="m-0 text-[14px] leading-relaxed text-black/50">
            Nodig voor toegang tot de profielen van onze mensen.
          </p>
          <label className="flex flex-col gap-2">
            <span className="text-xs font-semibold tracking-[0.1em] text-black/50 uppercase">Bedrijfsnaam</span>
            <input
              type="text"
              value={form.bedrijfsnaam}
              onChange={setField("bedrijfsnaam")}
              placeholder="Bedrijfsnaam B.V."
              className="rounded-lg border border-black/15 bg-white px-4 py-3 text-[16px] text-[#111] outline-none focus:border-black"
            />
          </label>
          <label className="flex flex-col gap-2">
            <span className="text-xs font-semibold tracking-[0.1em] text-black/50 uppercase">Contactpersoon</span>
            <input
              type="text"
              value={form.contactpersoon}
              onChange={setField("contactpersoon")}
              placeholder="Wie is het aanspreekpunt?"
              className="rounded-lg border border-black/15 bg-white px-4 py-3 text-[16px] text-[#111] outline-none focus:border-black"
            />
          </label>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <label className="flex flex-col gap-2">
              <span className="text-xs font-semibold tracking-[0.1em] text-black/50 uppercase">Sector</span>
              <input
                type="text"
                value={form.sector}
                onChange={setField("sector")}
                placeholder="Bijv. Zorg, Bouw, IT"
                className="rounded-lg border border-black/15 bg-white px-4 py-3 text-[16px] text-[#111] outline-none focus:border-black"
              />
            </label>
            <label className="flex flex-col gap-2">
              <span className="text-xs font-semibold tracking-[0.1em] text-black/50 uppercase">Bedrijfsgrootte</span>
              <select
                value={form.bedrijfsgrootte}
                onChange={(e) => setForm((f) => ({ ...f, bedrijfsgrootte: e.target.value }))}
                className="rounded-lg border border-black/15 bg-white px-4 py-3 text-[16px] text-[#111] outline-none focus:border-black"
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
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <label className="flex flex-col gap-2">
              <span className="text-xs font-semibold tracking-[0.1em] text-black/50 uppercase">Website (optioneel)</span>
              <input
                type="text"
                value={form.website}
                onChange={setField("website")}
                placeholder="www.bedrijf.nl"
                className="rounded-lg border border-black/15 bg-white px-4 py-3 text-[16px] text-[#111] outline-none focus:border-black"
              />
            </label>
            <label className="flex flex-col gap-2">
              <span className="text-xs font-semibold tracking-[0.1em] text-black/50 uppercase">Telefoon (optioneel)</span>
              <input
                type="text"
                value={form.telefoon}
                onChange={setField("telefoon")}
                placeholder="06-12345678"
                className="rounded-lg border border-black/15 bg-white px-4 py-3 text-[16px] text-[#111] outline-none focus:border-black"
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
          <Link href="/inloggen" className="text-[14px] font-semibold text-black/50 transition-colors hover:text-black">
            Al een account?
          </Link>
        )}
        <button
          type="submit"
          disabled={bezig}
          className="rounded-lg bg-black px-6 py-3 text-[15px] font-semibold text-white transition-colors hover:bg-black/80 disabled:opacity-60"
        >
          {stap === 1 ? "Volgende →" : bezig ? "Bezig…" : "Account aanmaken"}
        </button>
      </div>
      {next && <input type="hidden" name="next" value={next} />}
    </form>
  );
}
