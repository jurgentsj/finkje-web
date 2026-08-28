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
  const [password, setPassword] = useState("");
  const [fout, setFout] = useState("");
  const [bezig, setBezig] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFout("");
    if (!/.+@.+\..+/.test(email) || !password) {
      setFout("Vul een geldig e-mailadres en wachtwoord in.");
      return;
    }

    setBezig(true);
    const supabase = createClient();
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });

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

    const userId = data.user?.id;
    if (!userId) {
      setBezig(false);
      setFout("Er ging iets mis. Probeer het opnieuw.");
      return;
    }

    const { data: profile } = await supabase.from("profiles").select("role").eq("id", userId).maybeSingle();

    const bestemming = next || (profile?.role === "werkgever" ? "/werkgever/dashboard" : "/werkzoekende/dashboard");
    router.push(bestemming);
    router.refresh();
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
      <label className="flex flex-col gap-2.5">
        <span className="text-base font-semibold">Wachtwoord</span>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="••••••••"
          className={inputClass}
          autoComplete="current-password"
        />
      </label>
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
          {bezig ? "Bezig…" : "Inloggen →"}
        </button>
      </div>
    </form>
  );
}
