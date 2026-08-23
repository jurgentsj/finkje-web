"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { phrases } from "@/lib/data";

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

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    router.push(wil.trim() ? `/aanmelden?wil=${encodeURIComponent(wil.trim())}` : "/aanmelden");
  };

  return (
    <form onSubmit={submit} className="mt-11 max-w-[900px]">
      <div className="flex flex-wrap items-center gap-3.5 rounded-full border border-black/10 bg-sand py-2.5 pr-2.5 pl-7">
        <span className="font-display text-[clamp(19px,2.4vw,30px)] font-semibold tracking-[-0.02em] whitespace-nowrap">
          Ik wil
        </span>
        <input
          value={wil}
          onChange={(e) => setWil(e.target.value)}
          placeholder={phrases[phraseIdx]}
          className="min-w-[180px] flex-1 border-0 bg-transparent py-2.5 font-display text-[clamp(19px,2.4vw,30px)] font-bold tracking-[-0.02em] text-accent outline-none"
        />
        <button
          type="submit"
          className="flex shrink-0 items-center gap-2.5 rounded-full bg-accent px-7 py-4 text-[17px] font-semibold text-white transition-colors hover:bg-black"
        >
          Zet me erop <span className="text-xl">→</span>
        </button>
      </div>
      <p className="mt-3.5 ml-7 text-sm text-black/45">
        Weet je nog niet wat je wil? Denk er over na en kom dan later bij ons terug.
      </p>
    </form>
  );
}
