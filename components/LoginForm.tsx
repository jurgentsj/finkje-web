"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export default function LoginForm({ employer = false }: { employer?: boolean }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const next = searchParams.get("next") || "";
  const initialEmail = searchParams.get("email") || "";
  const voornaam = searchParams.get("voornaam") || "";
  const nextParam = searchParams.get("next") || "";
  const defaultNext = nextParam || (employer ? "/werkgever/dashboard" : voornaam ? "/werkzoekende/dashboard" : "");
  const callbackUrl = typeof window !== "undefined" && window.location.hostname === "finkje.nl"
    ? `${window.location.origin}/auth/callback`
    : process.env.NEXT_PUBLIC_DEV_SUPABASE_REDIRECT_URL ?? `${window.location.origin}/auth/callback`;

  const [email, setEmail] = useState(initialEmail);
  const [fout, setFout] = useState("");
  const [linkVerstuurd, setLinkVerstuurd] = useState(false);
  const [bezig, setBezig] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFout("");
    setLinkVerstuurd(false);
    if (!/.+@.+\..+/.test(email)) {
      setFout("Vul een geldig e-mailadres in.");
      return;
    }

    setBezig(true);
    const supabase = createClient();
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        shouldCreateUser: false,
        emailRedirectTo:
          `${callbackUrl}${defaultNext ? `?next=${encodeURIComponent(defaultNext)}` : ""}`,
      },
    });

    if (error) {
      setBezig(false);
      if (error.message.toLowerCase().includes("email not confirmed")) {
        setFout("Bevestig eerst je e-mailadres via de link die we je gestuurd hebben.");
      } else if (error.status === 429) {
        setFout("Te veel pogingen. Probeer het over een paar minuten opnieuw.");
      } else {
        setFout("Onjuiste inloggegevens.");
      }
      return;
    }

    setBezig(false);
    setLinkVerstuurd(true);
  };

  if (linkVerstuurd) {
    return (
      <div className="flex flex-col gap-6 rounded-[28px] bg-sand p-8 sm:p-10" role="status">
        <div className="flex flex-col gap-3">
          <span className="text-base font-semibold text-accent">Gelukt</span>
          <h2 className="m-0 font-display text-[clamp(26px,3vw,36px)] leading-tight font-bold tracking-[-0.03em]">
            Check je inbox.
          </h2>
          <p className="m-0 text-lg leading-relaxed text-black/60">
            We hebben een eenmalige loginlink gestuurd naar <strong className="font-semibold text-black">{email}</strong>.
          </p>
        </div>
        <div className="flex items-center gap-2 border-t border-black/10 pt-6 text-base font-semibold text-accent">
          <span className="h-4 w-4 animate-spin rounded-full border-2 border-accent/30 border-t-accent" aria-hidden="true" />
          De loginlink is onderweg.
        </div>
        <div className="border-t border-black/10 pt-6">
          <p className="m-0 text-[15px] leading-relaxed text-black/55">
            Klik op de link in de e-mail om direct naar je {employer ? "werkgeversdashboard" : "dashboard"} te gaan.
          </p>
        </div>
        <button type="button" onClick={() => setLinkVerstuurd(false)} className="self-start text-[15px] font-semibold text-accent underline-offset-4 hover:underline">
          Ander e-mailadres gebruiken
        </button>
      </div>
    );
  }

  const inputClass =
    "rounded-2xl border border-black/15 bg-white px-4.5 py-4 text-lg text-[#111] outline-none focus:border-accent";

  return (
    <form onSubmit={submit} className="flex flex-col gap-6.5 rounded-[28px] bg-sand p-8.5">
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
      <p className="m-0 text-[15px] leading-relaxed text-black/55">Je ontvangt een eenmalige inloglink per e-mail.</p>
      {fout && <p className="m-0 text-base font-semibold text-[#C42A00]">{fout}</p>}
      {linkVerstuurd && (
        <p className="m-0 flex items-center gap-2 text-base font-semibold text-accent" role="status">
          <span className="h-4 w-4 animate-spin rounded-full border-2 border-accent/30 border-t-accent" aria-hidden="true" />
          Check je mail — je eenmalige inloglink is onderweg.
        </p>
      )}
      <div className="flex flex-col-reverse gap-3 border-t border-black/10 pt-6.5 sm:flex-row sm:items-center sm:justify-between">
        <span className="text-[15px] text-black/55">
          {employer ? (
            <>
              Nog geen werkgeversaccount?{" "}
              <Link href="/werkgever/registreren" className="font-semibold text-accent">
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
          ) : linkVerstuurd ? "Opnieuw sturen" : "Stuur mij een inloglink →"}
        </button>
      </div>
    </form>
  );
}
