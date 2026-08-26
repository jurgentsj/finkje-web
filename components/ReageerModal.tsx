"use client";

import type { ReageerVelden } from "@/lib/reageer-context";

export default function ReageerModal({
  titel,
  klaar,
  fout,
  r,
  zet,
  sluiten,
  versturen,
}: {
  titel: string;
  klaar: boolean;
  fout: string;
  r: ReageerVelden;
  zet: (key: keyof ReageerVelden) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  sluiten: () => void;
  versturen: (e: React.FormEvent) => void;
}) {
  return (
    <div
      className="fixed inset-0 z-[200] flex items-start justify-center overflow-y-auto bg-black/45 p-6"
      onClick={sluiten}
    >
      <div
        className="m-auto flex w-full max-w-[620px] flex-col gap-5 rounded-[28px] bg-white p-6 sm:p-8"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-4">
          <div className="flex flex-col gap-1.5">
            <span className="text-xs font-semibold tracking-[0.16em] text-black/50 uppercase">Reageren op</span>
            <span className="font-display text-[clamp(24px,3.4vw,32px)] leading-tight font-extrabold tracking-[-0.04em]">
              {titel}
            </span>
          </div>
          <button
            type="button"
            onClick={sluiten}
            aria-label="Sluiten"
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-black/14 text-xl text-[#111] transition-colors hover:border-black"
          >
            ×
          </button>
        </div>

        {klaar ? (
          <div className="flex flex-col gap-3.5 border-t border-black/10 pt-5.5">
            <span className="font-display text-2xl font-extrabold tracking-[-0.03em] text-accent">Verstuurd</span>
            <p className="m-0 text-[17px] leading-relaxed text-black/70">
              We leggen jouw uitnodiging voor aan deze persoon. Zegt diegene ja, dan sturen we naam en
              contactgegevens naar het opgegeven e-mailadres, meestal binnen één werkdag.
            </p>
            <button
              type="button"
              onClick={sluiten}
              className="self-start rounded-full bg-black px-6.5 py-3.5 text-base font-semibold text-white"
            >
              Sluiten
            </button>
          </div>
        ) : (
          <form onSubmit={versturen} className="flex flex-col gap-4 border-t border-black/10 pt-5.5">
            <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,220px),1fr))] gap-3.5">
              <label className="flex flex-col gap-1.5">
                <span className="text-[13.5px] font-semibold text-black/65">Jouw naam</span>
                <input
                  value={r.naam}
                  onChange={zet("naam")}
                  placeholder="Voor- en achternaam"
                  className="rounded-[14px] border border-black/16 px-4 py-3.5 text-base outline-none focus:border-accent"
                />
              </label>
              <label className="flex flex-col gap-1.5">
                <span className="text-[13.5px] font-semibold text-black/65">Bedrijf</span>
                <input
                  value={r.bedrijf}
                  onChange={zet("bedrijf")}
                  placeholder="Bedrijfsnaam"
                  className="rounded-[14px] border border-black/16 px-4 py-3.5 text-base outline-none focus:border-accent"
                />
              </label>
              <label className="flex flex-col gap-1.5">
                <span className="text-[13.5px] font-semibold text-black/65">E-mail</span>
                <input
                  type="email"
                  value={r.email}
                  onChange={zet("email")}
                  placeholder="naam@bedrijf.nl"
                  className="rounded-[14px] border border-black/16 px-4 py-3.5 text-base outline-none focus:border-accent"
                />
              </label>
              <label className="flex flex-col gap-1.5">
                <span className="text-[13.5px] font-semibold text-black/65">
                  Telefoon <span className="font-normal text-black/40">optioneel</span>
                </span>
                <input
                  value={r.tel}
                  onChange={zet("tel")}
                  placeholder="06 12 34 56 78"
                  className="rounded-[14px] border border-black/16 px-4 py-3.5 text-base outline-none focus:border-accent"
                />
              </label>
            </div>
            <label className="flex flex-col gap-1.5">
              <span className="text-[13.5px] font-semibold text-black/65">
                Link naar de vacature <span className="font-normal text-black/40">optioneel, of plak de tekst hieronder</span>
              </span>
              <input
                value={r.link}
                onChange={zet("link")}
                placeholder="https://"
                className="rounded-[14px] border border-black/16 px-4 py-3.5 text-base outline-none focus:border-accent"
              />
            </label>
            <label className="flex flex-col gap-1.5">
              <span className="text-[13.5px] font-semibold text-black/65">
                Vacaturetekst <span className="font-normal text-black/40">optioneel</span>
              </span>
              <textarea
                value={r.tekst}
                onChange={zet("tekst")}
                rows={3}
                placeholder="Korte omschrijving van het werk, uren en voorwaarden."
                className="resize-y rounded-[14px] border border-black/16 px-4 py-3.5 text-base leading-relaxed outline-none focus:border-accent"
              />
            </label>
            <label className="flex flex-col gap-1.5">
              <span className="text-[13.5px] font-semibold text-black/65">Bericht aan deze persoon</span>
              <textarea
                value={r.bericht}
                onChange={zet("bericht")}
                rows={5}
                className="resize-y rounded-[14px] border border-black/16 px-4 py-3.5 text-base leading-relaxed outline-none focus:border-accent"
              />
              <span className="text-[13px] text-black/45">Alvast voor je ingevuld. Versturen kan zo, aanpassen mag altijd.</span>
            </label>
            <label className="flex items-start gap-2.5 text-[15px] leading-snug text-black/70">
              <input
                type="checkbox"
                checked={r.akkoord}
                onChange={zet("akkoord")}
                className="mt-0.5 h-5 w-5 shrink-0 accent-accent"
              />
              <span>
                Ik ga akkoord met de algemene voorwaarden en begrijp dat Finkje deze uitnodiging eerst aan de
                kandidaat voorlegt.
              </span>
            </label>
            {fout && <span className="text-[15px] font-semibold text-[#C1121F]">{fout}</span>}
            <div className="flex flex-wrap items-center gap-3">
              <button
                type="submit"
                className="rounded-full bg-accent px-7 py-4 text-base font-semibold text-white transition-colors hover:bg-black"
              >
                Verstuur reactie
              </button>
              <span className="text-sm text-black/45">Gratis, geen account nodig.</span>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
