"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { phrases } from "@/lib/data";
import { saveLead } from "@/lib/leads";

export default function HeroForm() {
  const router = useRouter();
  const [wil, setWil] = useState("");
  const [phraseIdx, setPhraseIdx] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setPhraseIdx((i) => (i + 1) % phrases.length);
    }, 2600);
    return () => clearInterval(id);
  }, []);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const honeypot = new FormData(e.currentTarget as HTMLFormElement).get("website_confirmation");
    if (typeof honeypot === "string" && honeypot.trim()) return;
    const value = wil.trim();
    if (value) {
      try {
        await saveLead("hero", { wil: value });
      } catch {
        return;
      }
    }
    router.push(value ? `/aanmelden?wil=${encodeURIComponent(value)}` : "/aanmelden");
  };

  return (
    <form onSubmit={submit} className="w-full max-w-[900px]">
      <label htmlFor="website_confirmation" className="absolute -left-[9999px] h-px w-px overflow-hidden">Website</label>
      <input id="website_confirmation" name="website_confirmation" tabIndex={-1} autoComplete="off" aria-hidden="true" className="absolute -left-[9999px] h-px w-px opacity-0" />
      <div className="flex flex-col gap-3 rounded-3xl border border-black/10 bg-sand p-4 sm:flex-row sm:flex-wrap sm:items-center sm:gap-3.5 sm:rounded-full sm:py-2.5 sm:pr-2.5 sm:pl-7">
        <div className="flex min-w-0 items-center gap-2.5 sm:contents">
          <span className="shrink-0 font-display text-[27px] font-semibold leading-tight tracking-[-0.02em] whitespace-nowrap sm:text-[clamp(24px,2.4vw,30px)]">
            Ik wil
          </span>
          <input
            value={wil}
            onChange={(e) => setWil(e.target.value)}
            placeholder={phrases[phraseIdx]}
            className="min-w-0 flex-1 border-0 bg-transparent py-2 font-display !text-[28px] !font-semibold leading-tight tracking-[-0.02em] text-accent outline-none placeholder:text-accent/80 sm:min-w-[180px] sm:py-2.5 sm:text-[clamp(24px,2.4vw,30px)]"
          />
        </div>
        <button
          type="submit"
          className="flex w-full shrink-0 items-center justify-center gap-2.5 rounded-full bg-accent px-7 py-3.5 !text-[24px] !font-semibold leading-tight text-white transition-colors hover:bg-black sm:w-auto sm:py-4 sm:text-[clamp(20px,2vw,24px)]"
        >
          Zet me erop <span className="text-xl">→</span>
        </button>
      </div>
      <p className="mt-3.5 ml-1 text-sm text-black/45 sm:ml-7">
        Weet je nog niet wat je wil? Denk er over na en kom dan later bij ons terug.
      </p>
    </form>
  );
}
