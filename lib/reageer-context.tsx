"use client";

import { createContext, useContext, useState, type ReactNode } from "react";
import ReageerModal from "@/components/ReageerModal";

export type ReageerVelden = {
  naam: string;
  bedrijf: string;
  email: string;
  tel: string;
  link: string;
  tekst: string;
  bericht: string;
  akkoord: boolean;
};

const leeg: ReageerVelden = {
  naam: "",
  bedrijf: "",
  email: "",
  tel: "",
  link: "",
  tekst: "",
  bericht: "",
  akkoord: false,
};

type Ctx = {
  reageerOp: (id: string, wil: string) => void;
  heeftGereageerd: (id: string) => boolean;
};

const ReageerContext = createContext<Ctx | null>(null);

export function useReageer() {
  const ctx = useContext(ReageerContext);
  if (!ctx) throw new Error("useReageer must be used within ReageerProvider");
  return ctx;
}

export default function ReageerProvider({ children }: { children: ReactNode }) {
  const [reacties, setReacties] = useState<string[]>([]);
  const [actief, setActief] = useState<{ id: string; wil: string } | null>(null);
  const [klaar, setKlaar] = useState(false);
  const [fout, setFout] = useState("");
  const [r, setR] = useState<ReageerVelden>(leeg);

  const reageerOp = (id: string, wil: string) => {
    const rol = wil.toLowerCase();
    setActief({ id, wil });
    setKlaar(false);
    setFout("");
    setR({
      ...leeg,
      bericht:
        `Wij hebben een plek open als ${rol} en jouw verhaal past daar goed bij. Wil je een keer langskomen ` +
        `voor een gesprek zonder verplichtingen? Dan vertellen we wat het werk inhoudt en hoor ik graag wat jij zoekt.`,
    });
  };

  const sluiten = () => setActief(null);

  const zet =
    (key: keyof ReageerVelden) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const v = key === "akkoord" ? (e.target as HTMLInputElement).checked : e.target.value;
      setR((s) => ({ ...s, [key]: v }));
    };

  const versturen = (e: React.FormEvent) => {
    e.preventDefault();
    const mailOk = /^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i.test(r.email.trim());
    if (!r.naam.trim() || !r.bedrijf.trim()) return setFout("Vul je naam en bedrijfsnaam in.");
    if (!mailOk) return setFout("Vul een geldig e-mailadres in.");
    if (!r.bericht.trim()) return setFout("Schrijf een kort bericht aan deze persoon.");
    if (!r.akkoord) return setFout("Je moet akkoord gaan met de voorwaarden.");
    if (actief) setReacties((s) => (s.includes(actief.id) ? s : [...s, actief.id]));
    setFout("");
    setKlaar(true);
  };

  return (
    <ReageerContext.Provider value={{ reageerOp, heeftGereageerd: (id) => reacties.includes(id) }}>
      {children}
      {actief && (
        <ReageerModal titel={actief.wil} klaar={klaar} fout={fout} r={r} zet={zet} sluiten={sluiten} versturen={versturen} />
      )}
    </ReageerContext.Provider>
  );
}
