"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

const STORAGE_KEY = "finkje-cookie-keuze";

export default function CookieBanner() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const keuze = window.localStorage.getItem(STORAGE_KEY);
    if (!keuze) setOpen(true);
  }, []);

  function kies(waarde: "alles" | "alleen-noodzakelijk") {
    window.localStorage.setItem(STORAGE_KEY, waarde);
    setOpen(false);
  }

  if (!open) return null;

  return (
    <div className="fixed inset-x-4 bottom-4 z-[100] flex justify-end sm:inset-x-auto sm:right-6 sm:bottom-6">
      <div className="max-h-[calc(100vh-2rem)] w-full max-w-[380px] overflow-y-auto rounded-[20px] bg-white p-5 shadow-[0_30px_80px_rgba(0,0,0,0.25)] sm:p-6">
        <p className="m-0 mb-2 text-[11px] font-semibold tracking-[0.16em] text-accent uppercase">Cookies</p>
        <h2 className="m-0 mb-2 font-display text-[18px] leading-tight font-bold tracking-[-0.02em]">
          Jouw privacy, onze verantwoordelijkheid
        </h2>
        <p className="m-0 mb-4 text-[13.5px] leading-relaxed text-black/65">
          Finkje gebruikt cookies om de website goed te laten functioneren en te analyseren. Noodzakelijke cookies
          staan altijd aan; analytische en functionele cookies alleen met jouw toestemming.
        </p>

        <div className="flex flex-col gap-2">
          <button
            type="button"
            onClick={() => kies("alles")}
            className="rounded-full bg-accent px-5 py-2.5 text-center text-[14px] font-semibold text-white transition-colors hover:bg-black"
          >
            Prima, akkoord
          </button>
          <button
            type="button"
            onClick={() => kies("alleen-noodzakelijk")}
            className="rounded-full bg-black/5 px-5 py-2.5 text-center text-[14px] font-semibold text-black transition-colors hover:bg-black/10"
          >
            Alleen noodzakelijk
          </button>
        </div>

        <p className="m-0 mt-3 text-[12px] leading-relaxed text-black/45">
          Lees meer in ons{" "}
          <Link href="/privacybeleid" className="text-black/55 underline hover:text-accent">
            privacybeleid
          </Link>
          .
        </p>
      </div>
    </div>
  );
}
