"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";

export type EmployerProfileData = {
  naam: string;
  email: string;
  bedrijfsnaam: string;
  contactpersoon: string;
  sector: string | null;
  bedrijfsgrootte: string | null;
  website: string | null;
  telefoon: string | null;
};

const bedrijfsgrootteOpties = ["1-10", "11-50", "51-200", "201-1000", "1000+"];

export default function EmployerProfileForm({ userId, initial }: { userId: string; initial: EmployerProfileData }) {
  const [form, setForm] = useState(initial);
  const [status, setStatus] = useState<"idle" | "saving" | "saved" | "error">("idle");

  const field = (key: keyof EmployerProfileData) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
    setForm((f) => ({ ...f, [key]: e.target.value }));

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const honeypot = new FormData(e.currentTarget as HTMLFormElement).get("website_confirmation");
    if (typeof honeypot === "string" && honeypot.trim()) return;
    setStatus("saving");
    const supabase = createClient();

    const { error: profileError } = await supabase.from("profiles").update({ naam: form.naam }).eq("id", userId);
    const { error: employerError } = await supabase.from("employer_profiles").upsert({
      id: userId,
      bedrijfsnaam: form.bedrijfsnaam,
      contactpersoon: form.contactpersoon,
      sector: form.sector,
      bedrijfsgrootte: form.bedrijfsgrootte,
      website: form.website,
      telefoon: form.telefoon,
      updated_at: new Date().toISOString(),
    });

    setStatus(profileError || employerError ? "error" : "saved");
  };

  const inputClass =
    "rounded-xl border border-black/15 bg-white px-4 py-3 text-[15.5px] text-[#111] outline-none focus:border-black";
  const label = "text-xs font-semibold tracking-[0.08em] text-black/45 uppercase";

  return (
    <form onSubmit={submit} className="flex flex-col gap-8">
      <label htmlFor="website_confirmation" className="absolute -left-[9999px] h-px w-px overflow-hidden">Website</label>
      <input id="website_confirmation" name="website_confirmation" tabIndex={-1} autoComplete="off" aria-hidden="true" className="absolute -left-[9999px] h-px w-px opacity-0" />
      <div className="rounded-2xl border border-black/10 bg-white p-7 sm:p-8">
        <h2 className="m-0 mb-6 font-display text-lg font-bold tracking-[-0.02em]">Contactgegevens</h2>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <label className="flex flex-col gap-2">
            <span className={label}>Contactpersoon</span>
            <input type="text" value={form.contactpersoon} onChange={field("contactpersoon")} className={inputClass} />
          </label>
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
        </div>
      </div>

      <div className="rounded-2xl border border-black/10 bg-white p-7 sm:p-8">
        <h2 className="m-0 mb-6 font-display text-lg font-bold tracking-[-0.02em]">Bedrijfsprofiel</h2>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <label className="flex flex-col gap-2">
            <span className={label}>Bedrijfsnaam</span>
            <input type="text" value={form.bedrijfsnaam} onChange={field("bedrijfsnaam")} className={inputClass} />
          </label>
          <label className="flex flex-col gap-2">
            <span className={label}>Sector</span>
            <input type="text" value={form.sector ?? ""} onChange={field("sector")} className={inputClass} />
          </label>
          <label className="flex flex-col gap-2">
            <span className={label}>Bedrijfsgrootte</span>
            <select value={form.bedrijfsgrootte ?? ""} onChange={field("bedrijfsgrootte")} className={inputClass}>
              <option value="">Kies een optie</option>
              {bedrijfsgrootteOpties.map((o) => (
                <option key={o} value={o}>
                  {o} medewerkers
                </option>
              ))}
            </select>
          </label>
          <label className="flex flex-col gap-2">
            <span className={label}>Website</span>
            <input type="text" value={form.website ?? ""} onChange={field("website")} className={inputClass} />
          </label>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-4">
        <button
          type="submit"
          disabled={status === "saving"}
          className="rounded-xl bg-black px-6 py-3 text-[15px] font-semibold text-white transition-colors hover:bg-black/80 disabled:opacity-60"
        >
          {status === "saving" ? "Opslaan…" : "Wijzigingen opslaan"}
        </button>
        {status === "saved" && <span className="text-[14px] font-semibold text-[#1E7A52]">Opgeslagen.</span>}
        {status === "error" && <span className="text-[14px] font-semibold text-red-600">Opslaan is niet gelukt.</span>}
      </div>
    </form>
  );
}
