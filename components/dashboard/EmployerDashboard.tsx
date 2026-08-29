"use client";

import Link from "next/link";
import { useState } from "react";
import { createClient } from "@/lib/supabase/client";

type EmployerInitial = {
  id: string;
  naam: string;
  email: string;
  bedrijfsnaam: string;
  plaats: string;
  website: string;
  telefoon: string;
};

type Vacancy = { id: number; titel: string; plaats: string; uren: string; omschrijving: string; status: "Online" | "Op pauze" };

const demoVacancies: Vacancy[] = [
  { id: 1, titel: "Interieuradviseur", plaats: "Eindhoven", uren: "Fulltime", omschrijving: "Je helpt klanten met het kiezen van een interieur dat bij hen past.", status: "Online" },
  { id: 2, titel: "Medewerker klantenservice", plaats: "Tilburg", uren: "Parttime", omschrijving: "Je bent het eerste aanspreekpunt voor onze klanten.", status: "Op pauze" },
];

export default function EmployerDashboard({ initial }: { initial: EmployerInitial }) {
  const [section, setSection] = useState<"vacatures" | "reacties" | "bedrijf" | "profielen">("vacatures");
  const [form, setForm] = useState(initial);
  const [vacancies, setVacancies] = useState(demoVacancies);
  const [vacancy, setVacancy] = useState({ titel: "", plaats: "", uren: "Fulltime", omschrijving: "" });
  const [editing, setEditing] = useState<number | null>(null);
  const [saved, setSaved] = useState(false);

  const update = (key: keyof typeof form) => (event: React.ChangeEvent<HTMLInputElement>) => setForm((current) => ({ ...current, [key]: event.target.value }));
  const updateVacancy = (key: keyof typeof vacancy) => (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => setVacancy((current) => ({ ...current, [key]: event.target.value }));

  const saveCompany = async (event: React.FormEvent) => {
    event.preventDefault();
    setSaved(false);
    const supabase = createClient();
    await supabase.from("profiles").update({ naam: form.naam }).eq("id", initial.id);
    await supabase.from("employer_profiles").upsert({ id: initial.id, bedrijfsnaam: form.bedrijfsnaam, contactpersoon: form.naam, website: form.website || null, telefoon: form.telefoon || null, plaats: form.plaats || null, updated_at: new Date().toISOString() });
    setSaved(true);
  };

  const saveVacancy = (event: React.FormEvent) => {
    event.preventDefault();
    if (!vacancy.titel.trim()) return;
    if (editing) setVacancies((current) => current.map((item) => item.id === editing ? { ...item, ...vacancy } : item));
    else setVacancies((current) => [...current, { id: Date.now(), ...vacancy, status: "Online" }]);
    setVacancy({ titel: "", plaats: "", uren: "Fulltime", omschrijving: "" });
    setEditing(null);
  };

  const editVacancy = (item: Vacancy) => { setEditing(item.id); setVacancy({ titel: item.titel, plaats: item.plaats, uren: item.uren, omschrijving: item.omschrijving }); setSection("vacatures"); };
  const toggleVacancy = (id: number) => setVacancies((current) => current.map((item) => item.id === id ? { ...item, status: item.status === "Online" ? "Op pauze" : "Online" } : item));

  const menu = (key: typeof section, label: string, sub = false) => <button type="button" onClick={() => setSection(key)} className={`w-full border-0 border-l-2 bg-transparent py-2.5 text-left text-[15px] font-medium ${sub ? "pl-6" : "pl-3"} ${section === key ? "border-black font-semibold text-[#111]" : "border-transparent text-black/55 hover:text-[#111]"}`}>{label}</button>;

  return <div className="min-h-screen bg-[#f8f8f7] text-[#111]">
    <div className="mx-auto flex min-h-screen max-w-[1360px] flex-col gap-8 px-5 py-8 md:flex-row md:gap-12 md:px-8 lg:px-12">
      <aside className="flex w-full shrink-0 flex-col md:sticky md:top-8 md:h-[calc(100vh-4rem)] md:max-w-[240px]">
        <p className="m-0 mb-8 text-[13px] text-black/45">Welkom, {form.naam || "Willer"}.</p>
        <p className="m-0 mb-3 text-[11.5px] font-bold tracking-[0.13em] text-black/35 uppercase">Mijn bedrijf</p>
        <div className="flex flex-col">{menu("vacatures", `Vacatures (${vacancies.length})`)}{menu("reacties", "Mijn reacties (0)", true)}{menu("bedrijf", "Bedrijfsinfo", true)}</div>
        <div className="my-5 border-t border-black/10" />
        {menu("profielen", "Profielen bekijken")}
        <button type="button" onClick={() => createClient().auth.signOut()} className="mt-auto border-0 bg-transparent px-3 py-2 text-left text-[14.5px] text-black/42">Uitloggen</button>
      </aside>
      <main className="min-w-0 max-w-[920px] flex-1">
        {section === "vacatures" && <div className="flex flex-col gap-3.5"><Card eyebrow={editing ? "Vacature wijzigen" : "Nieuwe vacature"}><form onSubmit={saveVacancy} className="flex flex-col gap-5"><div className="grid grid-cols-1 gap-4 sm:grid-cols-2"><Field label="Functietitel" value={vacancy.titel} onChange={updateVacancy("titel")} /><Field label="Plaats" value={vacancy.plaats} onChange={updateVacancy("plaats")} /><label className="flex flex-col gap-2 text-[15px] font-semibold text-black/72"><span>Uren</span><select value={vacancy.uren} onChange={updateVacancy("uren")} className="rounded-[10px] border border-black/16 bg-white px-3.5 py-3 text-[15.5px] font-normal outline-none"><option>Fulltime</option><option>Parttime</option><option>Flexibel</option></select></label></div><label className="flex flex-col gap-2 text-[15px] font-semibold text-black/72"><span>Wat ga je doen?</span><textarea value={vacancy.omschrijving} onChange={updateVacancy("omschrijving")} rows={4} className="resize-y rounded-[10px] border border-black/16 bg-white px-3.5 py-3 text-[15.5px] font-normal outline-none" /></label><div><PrimaryButton>{editing ? "Wijziging opslaan" : "Vacature plaatsen →"}</PrimaryButton></div></form></Card><Card eyebrow="Bestaande vacatures"><div className="flex flex-col gap-3">{vacancies.map((item) => <article key={item.id} className="border-b border-black/10 py-2 last:border-0"><div className="flex flex-wrap items-start justify-between gap-3"><div><div className="mb-2 flex flex-wrap items-center gap-2"><h3 className="m-0 text-[17px] font-semibold">{item.titel}</h3><Badge tone={item.status === "Online" ? "green" : "gray"}>{item.status}</Badge></div><div className="flex gap-2 text-xs text-black/55"><span className="rounded bg-black/5 px-2 py-1">{item.plaats}</span><span className="rounded bg-black/5 px-2 py-1">{item.uren}</span></div></div><div className="flex flex-wrap gap-3 text-[13px] font-semibold"><button type="button" onClick={() => editVacancy(item)} className="border-0 bg-transparent p-0">Wijzigen</button><button type="button" onClick={() => toggleVacancy(item.id)} className="border-0 bg-transparent p-0 text-black/55">{item.status === "Online" ? "Op pauze zetten" : "Online zetten"}</button><button type="button" onClick={() => setVacancies((current) => current.filter((vacancyItem) => vacancyItem.id !== item.id))} className="border-0 bg-transparent p-0 text-black/55">Verwijderen</button></div></div></article>)}</div></Card></div>}
        {section === "reacties" && <Card eyebrow="Mijn reacties"><div className="flex flex-col gap-2"><h2 className="m-0 text-[17px] font-semibold">Je hebt nog niemand benaderd.</h2><p className="m-0 text-[15.5px] leading-relaxed text-black/55">Bekijk profielen en stuur iemand een bericht als je een goede match ziet.</p><Link href="/werkgever/dashboard/profielen" className="mt-3 self-start rounded-full bg-[#FF5A00] px-7 py-4 text-[16.5px] font-semibold text-white">Bekijk de profielen →</Link></div></Card>}
        {section === "bedrijf" && <form onSubmit={saveCompany} className="flex flex-col gap-3.5"><Card eyebrow="Je bedrijf"><div className="grid grid-cols-1 gap-4 sm:grid-cols-2"><Field label="Bedrijfsnaam" value={form.bedrijfsnaam} onChange={update("bedrijfsnaam")} /><Field label="Plaats" value={form.plaats} onChange={update("plaats")} /><Field label="Website (optioneel)" value={form.website} onChange={update("website")} /></div></Card><Card eyebrow="Contact"><p className="m-0 mb-5 text-[14.5px] text-black/55">Deze gegevens sturen we mee als je op iemand reageert.</p><div className="grid grid-cols-1 gap-4 sm:grid-cols-2"><Field label="Naam contactpersoon" value={form.naam} onChange={update("naam")} /><Field label="E-mail" value={form.email} onChange={() => undefined} /><Field label="Telefoon (optioneel)" value={form.telefoon} onChange={update("telefoon")} /></div></Card><div className="flex items-center gap-4"><PrimaryButton>Wijzigingen opslaan</PrimaryButton>{saved && <span className="text-sm text-black/55">Opgeslagen.</span>}</div></form>}
        {section === "profielen" && <div><Link href="/werkgever/dashboard/profielen" className="text-[15px] font-semibold underline underline-offset-4">Profielen bekijken →</Link></div>}
      </main>
    </div>
  </div>;
}

function Card({ eyebrow, children }: { eyebrow: string; children: React.ReactNode }) { return <section className="rounded-[6px] border border-black/14 bg-white p-7"><div className="mb-6 flex items-center gap-4 border-b border-black/10 pb-3"><h1 className="m-0 text-[12px] font-bold tracking-[0.13em] text-black/45 uppercase">{eyebrow}</h1></div>{children}</section>; }
function Field({ label, value, onChange }: { label: string; value: string; onChange: (event: React.ChangeEvent<HTMLInputElement>) => void }) { return <label className="flex flex-col gap-2 text-[15px] font-semibold text-black/72"><span>{label}</span><input value={value} onChange={onChange} className="rounded-[10px] border border-black/16 bg-white px-3.5 py-3 text-[15.5px] font-normal outline-none focus:border-[#FF5A00]" /></label>; }
function Badge({ tone, children }: { tone: "green" | "gray"; children: React.ReactNode }) { return <span className={`rounded-[3px] px-2 py-1 text-[12px] font-bold tracking-[0.08em] uppercase ${tone === "green" ? "bg-[#e5f4ec] text-[#18754d]" : "bg-[#eeeeec] text-black/50"}`}>{children}</span>; }
function PrimaryButton({ children }: { children: React.ReactNode }) { return <button type="submit" className="rounded-full bg-[#FF5A00] px-7 py-4 text-[16.5px] font-semibold text-white">{children}</button>; }
