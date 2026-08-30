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
  updatedAt?: string | null;
  zoekstatus?: string | null;
};

function toggle(list: string[], value: string) {
  return list.includes(value) ? list.filter((v) => v !== value) : [...list, value];
}

export default function JobseekerProfileForm({ userId, initial }: { userId: string; initial: JobseekerProfileData }) {
  const [form, setForm] = useState(initial);
  const [status, setStatus] = useState<"idle" | "saving" | "saved" | "error">("idle");
  const [bewerken, setBewerken] = useState(false);
  const [bevestigen, setBevestigen] = useState(false);
  const statusOpties = ["Ik ben actief op zoek", "Ik kijk rond", "Nu even niet"];
  const zesMaanden = form.updatedAt ? new Date(new Date(form.updatedAt).setMonth(new Date(form.updatedAt).getMonth() + 6)) : null;
  const magBewerken = !zesMaanden || zesMaanden <= new Date() || bewerken;

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
      status: form.zoekstatus,
      updated_at: new Date().toISOString(),
    });

    setStatus(profileError || jobseekerError ? "error" : "saved");
  };

  const inputClass =
    "rounded-2xl border border-black/15 bg-white px-4.5 py-3.5 text-[16px] text-[#111] outline-none focus:border-accent";
  const label = "text-xs font-semibold tracking-[0.1em] text-black/50 uppercase";

  return (
    <div className="flex flex-col gap-9">
      <section id="droombaan" className="rounded-[28px] border-2 border-accent bg-accent p-7 text-white sm:p-9">
        <p className="m-0 text-xs font-semibold tracking-[0.16em] uppercase">Mijn droombaan</p>
        <div className="mt-4 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <h2 className="m-0 font-display text-[clamp(36px,6vw,72px)] leading-[0.9] font-extrabold tracking-[-0.05em]">{form.droombaan || "Nog niet ingevuld"}</h2>
          {!magBewerken && zesMaanden ? <p className="m-0 max-w-xs text-sm leading-relaxed text-white/80">Je kunt je droombaan weer aanpassen vanaf {zesMaanden.toLocaleDateString("nl-NL")}.</p> : !bewerken && <button type="button" onClick={() => setBevestigen(true)} className="rounded-full bg-white px-5 py-3 font-semibold text-accent">Droombaan bewerken</button>}
        </div>
      </section>
      {bevestigen && <div className="rounded-2xl border border-accent/30 bg-white p-5 shadow-sm" role="alertdialog" aria-label="Droombaan bewerken">
        <p className="m-0 font-display text-lg font-bold">Je kunt dit één keer per zes maanden wijzigen.</p>
        <p className="mt-2 mb-4 text-sm leading-relaxed text-black/65">Na bevestiging kun je je droombaan en de gekoppelde kernvelden de komende zes maanden niet opnieuw aanpassen.</p>
        <div className="flex flex-wrap gap-3"><button type="button" onClick={() => { setBewerken(true); setBevestigen(false); }} className="rounded-full bg-accent px-5 py-3 font-semibold text-white">Ik begrijp het, doorgaan</button><button type="button" onClick={() => setBevestigen(false)} className="rounded-full border border-black/15 px-5 py-3 font-semibold">Annuleren</button></div>
      </div>}
      <section id="status" className="rounded-[28px] bg-white p-7 sm:p-9">
        <p className="m-0 text-xs font-semibold tracking-[0.16em] text-accent uppercase">Status</p>
        <h2 className="mt-3 mb-5 font-display text-2xl font-bold tracking-[-0.03em]">Hoe mogen werkgevers je zien?</h2>
        <div className="flex flex-wrap gap-2.5">
          {statusOpties.map((optie) => <button key={optie} type="button" onClick={() => setForm((f) => ({ ...f, zoekstatus: optie }))} className={`rounded-full border px-4 py-2.5 text-sm font-semibold transition-colors ${form.zoekstatus === optie ? "border-accent bg-accent text-white" : "border-black/15 text-black/65 hover:border-black/30"}`}>{optie}</button>)}
        </div>
      </section>
      <form onSubmit={submit} className="flex flex-col gap-9" aria-disabled={!magBewerken}>
      <fieldset disabled={!magBewerken} className="flex flex-col gap-9 border-0 p-0">
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

      <div id="voorkeuren" className="rounded-[28px] bg-white p-7 sm:p-9">
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
                onClick={() => setForm((f) => ({ ...f, hkleur: k.hex }))}
                className={`flex items-center gap-2 rounded-full border px-4 py-2 text-[14.5px] font-medium transition-colors ${
                  form.hkleur === k.hex ? "border-black bg-black text-white" : "border-black/15 text-black/65 hover:border-black/30"
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
      </fieldset>
    </form>
    </div>
  );
}
