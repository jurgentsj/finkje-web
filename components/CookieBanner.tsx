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
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 p-6">
      <div className="w-full max-w-[440px] rounded-[28px] bg-white p-8 shadow-[0_30px_80px_rgba(0,0,0,0.25)]">
        <p className="m-0 mb-4 text-xs font-semibold tracking-[0.16em] text-accent uppercase">Cookies</p>
        <h2 className="m-0 mb-3 font-display text-[26px] leading-tight font-bold tracking-[-0.03em]">
          Wij zijn ook maar mensen (en gebruiken cookies)
        </h2>
        <p className="m-0 mb-7 text-[16px] leading-relaxed text-black/65">
          We gebruiken een paar cookies om Finkje soepel te laten draaien en te snappen wat wel en niet werkt. Geen
          rare toestanden, gewoon een beetje bijhouden. Jij kiest wat oké is.
        </p>

        <div className="flex flex-col gap-2.5">
          <button
            type="button"
            onClick={() => kies("alles")}
            className="rounded-full bg-accent px-6 py-3.5 text-center font-semibold text-white transition-colors hover:bg-black"
          >
            Prima, akkoord
          </button>
          <button
            type="button"
            onClick={() => kies("alleen-noodzakelijk")}
            className="rounded-full bg-black/5 px-6 py-3.5 text-center font-semibold text-black transition-colors hover:bg-black/10"
          >
            Alleen noodzakelijk
          </button>
        </div>

        <p className="m-0 mt-6 text-[13px] leading-relaxed text-black/45">
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
