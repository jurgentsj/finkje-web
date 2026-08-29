"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export default function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const next = searchParams.get("next") || "";

  const [email, setEmail] = useState("");
  const [fout, setFout] = useState("");
  const [bezig, setBezig] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFout("");
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
          process.env.NEXT_PUBLIC_DEV_SUPABASE_REDIRECT_URL ?? `${window.location.origin}/auth/callback`,
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
    setFout("Een eenmalige inloglink is naar je e-mailadres gestuurd. Klik op de link om verder te gaan.");
  };

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
      <div className="flex flex-col-reverse gap-3 border-t border-black/10 pt-6.5 sm:flex-row sm:items-center sm:justify-between">
        <span className="text-[15px] text-black/55">
          Nog geen account?{" "}
          <Link href="/aanmelden" className="font-semibold text-accent">
            Meld je aan
          </Link>{" "}
          of{" "}
          <Link href="/werkgever/registreren" className="font-semibold text-accent">
            registreer als werkgever
          </Link>
          .
        </span>
        <button
          type="submit"
          disabled={bezig}
          className="w-full rounded-full bg-accent px-8.5 py-4.5 text-lg font-bold whitespace-nowrap text-white transition-colors hover:bg-black disabled:opacity-60 sm:w-auto"
        >
          {bezig ? "Link versturen…" : "Stuur mij een inloglink →"}
        </button>
      </div>
    </form>
  );
}
