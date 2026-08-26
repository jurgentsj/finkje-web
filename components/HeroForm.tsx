"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { phrases } from "@/lib/data";
import { saveHeroDraft, submitHeroDraft } from "@/lib/leads";

export default function HeroForm() {
  const router = useRouter();
  const [wil, setWil] = useState("");
  const [phraseIdx, setPhraseIdx] = useState(0);
  const [draftId, setDraftId] = useState<string | null>(null);
  const draftTimer = useRef<number | null>(null);

  useEffect(() => {
    const id = setInterval(() => {
      setPhraseIdx((i) => (i + 1) % phrases.length);
    }, 2600);
    return () => clearInterval(id);
  }, []);

  const handleWilChange = (value: string) => {
    setWil(value);
    if (!value.trim()) return;
    if (draftTimer.current) window.clearTimeout(draftTimer.current);
    draftTimer.current = window.setTimeout(async () => {
      if (!draftId) {
        const id = await saveHeroDraft(value.trim());
        setDraftId(id);
      }
    }, 700);
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (wil.trim() && draftId) await submitHeroDraft(draftId, wil.trim());
      router.push(wil.trim() ? `/aanmelden?wil=${encodeURIComponent(wil.trim())}` : "/aanmelden");
    } catch {
      router.push(wil.trim() ? `/aanmelden?wil=${encodeURIComponent(wil.trim())}` : "/aanmelden");
    }
  };

  return (
    <form onSubmit={submit} className="mt-11 max-w-[900px]">
      <div className="flex flex-col gap-3 rounded-3xl border border-black/10 bg-sand p-4 sm:flex-row sm:flex-wrap sm:items-center sm:gap-3.5 sm:rounded-full sm:py-2.5 sm:pr-2.5 sm:pl-7">
        <div className="flex min-w-0 items-center gap-2.5 sm:contents">
          <span className="shrink-0 font-display text-xl font-semibold tracking-[-0.02em] whitespace-nowrap sm:text-[clamp(19px,2.4vw,30px)]">
            Ik wil
          </span>
          <input
            value={wil}
            onChange={(e) => handleWilChange(e.target.value)}
            placeholder={phrases[phraseIdx]}
            className="min-w-0 flex-1 border-0 bg-transparent py-2 font-display text-xl font-bold tracking-[-0.02em] text-accent outline-none sm:min-w-[180px] sm:py-2.5 sm:text-[clamp(19px,2.4vw,30px)]"
          />
        </div>
        <button
          type="submit"
          className="flex w-full shrink-0 items-center justify-center gap-2.5 rounded-full bg-accent px-7 py-3.5 text-base font-semibold text-white transition-colors hover:bg-black sm:w-auto sm:py-4 sm:text-[17px]"
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
