"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { completeAuthProfile } from "@/lib/complete-auth-profile";

export default function LoginForm({ employer = false }: { employer?: boolean }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const nextParam = searchParams.get("next") || "";
  const initialEmail = searchParams.get("email") || "";
  const voornaam = searchParams.get("voornaam") || "";
  const defaultNext = nextParam || (employer ? "/werkgever/dashboard" : voornaam ? "/werkzoekende/dashboard" : "");

  const [email, setEmail] = useState(initialEmail);
  const [code, setCode] = useState("");
  const [fout, setFout] = useState("");
  const [codeVerstuurd, setCodeVerstuurd] = useState(false);
  const [bezig, setBezig] = useState(false);

  const verstuurCode = async (e: React.FormEvent) => {
    e.preventDefault();
    const honeypot = new FormData(e.currentTarget as HTMLFormElement).get("website_confirmation");
    if (typeof honeypot === "string" && honeypot.trim()) return;
    setFout("");
    if (!/.+@.+\..+/.test(email)) {
      setFout("Vul een geldig e-mailadres in.");
      return;
    }

    setBezig(true);
    const supabase = createClient();
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: { shouldCreateUser: false },
    });

    setBezig(false);
    if (error) {
      if (error.message.toLowerCase().includes("email not confirmed")) {
        setFout("Bevestig eerst je e-mailadres via de code die we je gestuurd hebben.");
      } else if (error.status === 429) {
        setFout("Te veel pogingen. Probeer het over een paar minuten opnieuw.");
      } else {
        setFout("Onjuiste inloggegevens.");
      }
      return;
    }

    setCodeVerstuurd(true);
  };

  const bevestigCode = async (e: React.FormEvent) => {
    e.preventDefault();
    const honeypot = new FormData(e.currentTarget as HTMLFormElement).get("website_confirmation");
    if (typeof honeypot === "string" && honeypot.trim()) return;
    setFout("");
    if (!/^\d{6}$/.test(code)) {
      setFout("Vul de 6-cijferige code uit je e-mail in.");
      return;
    }

    setBezig(true);
    const supabase = createClient();
    const { data, error } = await supabase.auth.verifyOtp({
      email,
      token: code,
      type: "email",
    });

    if (error || !data.user) {
      setBezig(false);
      setFout("Deze code is onjuist of verlopen. Vraag een nieuwe code aan.");
      return;
    }

    const destination = await completeAuthProfile(supabase, data.user);
    router.replace(defaultNext || destination);
  };

  if (codeVerstuurd) {
    return (
      <form onSubmit={bevestigCode} className="flex flex-col gap-6 rounded-[28px] bg-sand p-8 sm:p-10">
        <label htmlFor="website_confirmation" className="absolute -left-[9999px] h-px w-px overflow-hidden">Website</label>
        <input id="website_confirmation" name="website_confirmation" tabIndex={-1} autoComplete="off" aria-hidden="true" className="absolute -left-[9999px] h-px w-px opacity-0" />
        <div className="flex flex-col gap-3">
          <span className="text-base font-semibold text-accent">Check je inbox</span>
          <h2 className="m-0 font-display text-[clamp(26px,3vw,36px)] leading-tight font-bold tracking-[-0.03em]">
            Vul je inlogcode in.
          </h2>
          <p className="m-0 text-lg leading-relaxed text-black/60">
            We hebben een inlogcode gestuurd naar <strong className="font-semibold text-black">{email}</strong>.
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
            className="rounded-2xl border border-black/15 bg-white px-4.5 py-4 text-center text-2xl font-bold tracking-[0.3em] text-accent outline-none placeholder:font-normal placeholder:text-black/25 focus:border-accent"
          />
        </label>
        {fout && <p className="m-0 text-base font-semibold text-[#C42A00]">{fout}</p>}
<div className="flex flex-col-reverse gap-3 sm:flex-row sm:items-center sm:justify-between">
          <button
            type="button"
            onClick={() => {
              setCodeVerstuurd(false);
              setCode("");
              setFout("");
            }}
            className="self-start text-[15px] font-semibold text-accent underline-offset-4 hover:underline"
          >
            Ander e-mailadres gebruiken
          </button>
          <button
            type="submit"
            disabled={bezig}
            className="w-full rounded-full bg-accent px-8.5 py-4.5 text-lg font-bold whitespace-nowrap text-white transition-colors hover:bg-black disabled:opacity-60 sm:w-auto"
          >
            {bezig ? (
              <span className="inline-flex items-center gap-2">
                <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" aria-hidden="true" />
                Even geduld…
              </span>
            ) : "Inloggen →"}
          </button>
        </div>
      </form>
    );
  }

  const inputClass =
    "rounded-2xl border border-black/15 bg-white px-4.5 py-4 text-lg text-[#111] outline-none focus:border-accent";

  return (
    <form onSubmit={verstuurCode} className="flex w-full min-w-0 flex-col gap-6.5 rounded-[28px] p-0">
      <label htmlFor="website_confirmation_login" className="absolute -left-[9999px] h-px w-px overflow-hidden">Website</label>
      <input id="website_confirmation_login" name="website_confirmation" tabIndex={-1} autoComplete="off" aria-hidden="true" className="absolute -left-[9999px] h-px w-px opacity-0" />
      <label className="flex flex-col gap-2.5">
        <span className="text-base font-semibold">E-mail</span>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="jij@voorbeeld.nl"
          className={inputClass}
          autoComplete="email"
        />
      </label>
      {fout && <p className="m-0 text-base font-semibold text-[#C42A00]">{fout}</p>}
      <div className="flex flex-col-reverse gap-3 border-t border-black/10 pt-6.5 sm:flex-row sm:items-center sm:justify-between">
        <span className="text-[15px] text-black/55">
          {employer ? (
            <>
              Nog geen werkgeversaccount?{" "}
              <Link href="/werkgever/registreren" className="font-semibold text-black">
                Maak een account aan
              </Link>
              .
            </>
          ) : (
            <>
              Nog geen account?{" "}
              <Link href="/aanmelden" className="font-semibold text-accent">
                Meld je aan
              </Link>{" "}
              of{" "}
              <Link href="/werkgever/registreren" className="font-semibold text-accent">
                registreer als werkgever
              </Link>
              .
            </>
          )}
        </span>
        <button
          type="submit"
          disabled={bezig}
          className="w-full rounded-full bg-accent px-8.5 py-4.5 text-lg font-bold whitespace-nowrap text-white transition-colors hover:bg-black disabled:opacity-60 sm:w-auto"
        >
          {bezig ? (
            <span className="inline-flex items-center gap-2">
              <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" aria-hidden="true" />
              Even geduld…
            </span>
          ) : "Stuur mij een inlogcode →"}
        </button>
      </div>
    </form>
  );
}
