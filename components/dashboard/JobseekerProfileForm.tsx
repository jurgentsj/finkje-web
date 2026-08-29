"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { dienstverbandOpties, omgevingOpties, overOpties, sectorOpties, handKleuren } from "@/lib/data";

export type JobseekerProfileData = {
  naam: string;
  email: string;
  droombaan: string | null;
  waarom: string | null;
  sterk: string | null;
  tegenaan: string | null;
  hkleur: string | null;
  dienstverband: string | null;
  beschikbaarheid: string | null;
  locatie: string | null;
  reisafstand: string | null;
  sector: string | null;
  ervaring: string | null;
  telefoon: string | null;
  overs: string[];
  omgevingen: string[];
};

function toggle(list: string[], value: string) {
  return list.includes(value) ? list.filter((v) => v !== value) : [...list, value];
}

export default function JobseekerProfileForm({ userId, initial }: { userId: string; initial: JobseekerProfileData }) {
  const [form, setForm] = useState(initial);
  const [status, setStatus] = useState<"idle" | "saving" | "saved" | "error">("idle");

  const field =
    (key: keyof JobseekerProfileData) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
      setForm((f) => ({ ...f, [key]: e.target.value }));

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("saving");
    const supabase = createClient();

    const { error: profileError } = await supabase.from("profiles").update({ naam: form.naam }).eq("id", userId);
    const { error: jobseekerError } = await supabase.from("jobseeker_profiles").upsert({
      id: userId,
      droombaan: form.droombaan,
      waarom: form.waarom,
      sterk: form.sterk,
      tegenaan: form.tegenaan,
      hkleur: form.hkleur,
      dienstverband: form.dienstverband,
      beschikbaarheid: form.beschikbaarheid,
      locatie: form.locatie,
      reisafstand: form.reisafstand,
      sector: form.sector,
      ervaring: form.ervaring,
      telefoon: form.telefoon,
      overs: form.overs,
      omgevingen: form.omgevingen,
      updated_at: new Date().toISOString(),
    });

    setStatus(profileError || jobseekerError ? "error" : "saved");
  };

  const inputClass =
    "rounded-2xl border border-black/15 bg-white px-4.5 py-3.5 text-[16px] text-[#111] outline-none focus:border-accent";
  const label = "text-xs font-semibold tracking-[0.1em] text-black/50 uppercase";

  return (
    <form onSubmit={submit} className="flex flex-col gap-9">
      <div className="rounded-[28px] bg-white p-7 sm:p-9">
        <h2 className="m-0 mb-6 font-display text-xl font-bold tracking-[-0.02em]">Jouw gegevens</h2>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <label className="flex flex-col gap-2">
            <span className={label}>Naam</span>
            <input type="text" value={form.naam} onChange={field("naam")} className={inputClass} />
          </label>
          <label className="flex flex-col gap-2">
            <span className={label}>E-mail</span>
            <input type="email" value={form.email} disabled className={`${inputClass} opacity-60`} />
          </label>
          <label className="flex flex-col gap-2">
            <span className={label}>Telefoon</span>
            <input type="text" value={form.telefoon ?? ""} onChange={field("telefoon")} className={inputClass} />
          </label>
          <label className="flex flex-col gap-2">
            <span className={label}>Locatie</span>
            <input type="text" value={form.locatie ?? ""} onChange={field("locatie")} className={inputClass} />
          </label>
        </div>
      </div>

      <div className="rounded-[28px] bg-white p-7 sm:p-9">
        <h2 className="m-0 mb-6 font-display text-xl font-bold tracking-[-0.02em]">Jouw droombaan</h2>
        <div className="flex flex-col gap-5">
          <label className="flex flex-col gap-2">
            <span className={label}>Waar droom je van?</span>
            <textarea value={form.droombaan ?? ""} onChange={field("droombaan")} rows={2} className={inputClass} />
          </label>
          <label className="flex flex-col gap-2">
            <span className={label}>Waarom wil je dat?</span>
            <textarea value={form.waarom ?? ""} onChange={field("waarom")} rows={2} className={inputClass} />
          </label>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <label className="flex flex-col gap-2">
              <span className={label}>Waar ben je goed in?</span>
              <textarea value={form.sterk ?? ""} onChange={field("sterk")} rows={2} className={inputClass} />
            </label>
            <label className="flex flex-col gap-2">
              <span className={label}>Waar loop je tegenaan?</span>
              <textarea value={form.tegenaan ?? ""} onChange={field("tegenaan")} rows={2} className={inputClass} />
            </label>
          </div>
        </div>
      </div>

      <div className="rounded-[28px] bg-white p-7 sm:p-9">
        <h2 className="m-0 mb-6 font-display text-xl font-bold tracking-[-0.02em]">Voorkeuren</h2>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <label className="flex flex-col gap-2">
            <span className={label}>Dienstverband</span>
            <select value={form.dienstverband ?? ""} onChange={field("dienstverband")} className={inputClass}>
              <option value="">Kies een optie</option>
              {dienstverbandOpties.map((o) => (
                <option key={o} value={o}>
                  {o}
                </option>
              ))}
            </select>
          </label>
          <label className="flex flex-col gap-2">
            <span className={label}>Sector</span>
            <select value={form.sector ?? ""} onChange={field("sector")} className={inputClass}>
              <option value="">Kies een optie</option>
              {sectorOpties.map((o) => (
                <option key={o} value={o}>
                  {o}
                </option>
              ))}
            </select>
          </label>
          <label className="flex flex-col gap-2">
            <span className={label}>Beschikbaarheid</span>
            <input type="text" value={form.beschikbaarheid ?? ""} onChange={field("beschikbaarheid")} className={inputClass} />
          </label>
          <label className="flex flex-col gap-2">
            <span className={label}>Reisafstand</span>
            <input type="text" value={form.reisafstand ?? ""} onChange={field("reisafstand")} className={inputClass} />
          </label>
          <label className="flex flex-col gap-2 sm:col-span-2">
            <span className={label}>Ervaring</span>
            <textarea value={form.ervaring ?? ""} onChange={field("ervaring")} rows={2} className={inputClass} />
          </label>
        </div>

        <div className="mt-7 flex flex-col gap-3">
          <span className={label}>Sta open voor</span>
          <div className="flex flex-wrap gap-2.5">
            {overOpties.map((o) => (
              <button
                key={o}
                type="button"
                onClick={() => setForm((f) => ({ ...f, overs: toggle(f.overs, o) }))}
                className={`rounded-full border px-4 py-2 text-[14.5px] font-medium transition-colors ${
                  form.overs.includes(o)
                    ? "border-accent bg-accent text-white"
                    : "border-black/15 text-black/65 hover:border-black/30"
                }`}
              >
                {o}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-7 flex flex-col gap-3">
          <span className={label}>Werkomgeving</span>
          <div className="flex flex-wrap gap-2.5">
            {omgevingOpties.map((o) => (
              <button
                key={o}
                type="button"
                onClick={() => setForm((f) => ({ ...f, omgevingen: toggle(f.omgevingen, o) }))}
                className={`rounded-full border px-4 py-2 text-[14.5px] font-medium transition-colors ${
                  form.omgevingen.includes(o)
                    ? "border-accent bg-accent text-white"
                    : "border-black/15 text-black/65 hover:border-black/30"
                }`}
              >
                {o}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-7 flex flex-col gap-3">
          <span className={label}>Jouw kleur</span>
          <div className="flex flex-wrap gap-2.5">
            {handKleuren.map((k) => (
              <button
                key={k.naam}
                type="button"
                onClick={() => setForm((f) => ({ ...f, hkleur: k.naam }))}
                className={`flex items-center gap-2 rounded-full border px-4 py-2 text-[14.5px] font-medium transition-colors ${
                  form.hkleur === k.naam ? "border-black bg-black text-white" : "border-black/15 text-black/65 hover:border-black/30"
                }`}
              >
                <span className="h-3 w-3 rounded-full" style={{ backgroundColor: k.hex }} />
                {k.naam}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-4">
        <button
          type="submit"
          disabled={status === "saving"}
          className="rounded-full bg-accent px-8 py-4 text-lg font-bold text-white transition-colors hover:bg-black disabled:opacity-60"
        >
          {status === "saving" ? "Opslaan…" : "Wijzigingen opslaan"}
        </button>
        {status === "saved" && <span className="text-[15px] font-semibold text-[#1E7A52]">Opgeslagen.</span>}
        {status === "error" && <span className="text-[15px] font-semibold text-[#C42A00]">Opslaan is niet gelukt.</span>}
      </div>
    </form>
  );
}
