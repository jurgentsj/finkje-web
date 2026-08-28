import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import DashboardShell from "@/components/dashboard/DashboardShell";
import { mensenData } from "@/lib/data";
import ProfielInvite from "@/components/ProfielInvite";

const navItems = [
  { href: "/werkgever/dashboard", label: "Bedrijfsprofiel" },
  { href: "/werkgever/dashboard/profielen", label: "Profielen bekijken" },
];

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const m = mensenData.find((x) => x.id === id);
  return {
    title: m ? `${m.wil} — Finkje` : "Profiel — Finkje",
    description: m?.intro,
  };
}

export default async function WerkgeverProfielDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect(`/inloggen?next=/werkgever/dashboard/profielen/${id}`);

  const { data: profile } = await supabase.from("profiles").select("naam, role").eq("id", user.id).maybeSingle();

  if (profile?.role !== "werkgever") redirect("/werkzoekende/dashboard");

  const m = mensenData.find((x) => x.id === id);
  if (!m) notFound();

  const antwoorden = [
    { vraag: "Waar ik sterk in ben", tekst: m.sterk || "Helaas, geen invoer." },
    { vraag: "Waar ik tegenaan loop", tekst: m.tegenaan || "Helaas, geen invoer." },
    { vraag: "Wat heb ik ervoor over?", tekst: m.over || "Helaas, geen invoer." },
  ];
  const praktisch = [
    { label: "Beschikbaar", waarde: m.start },
    { label: "Dienstverband", waarde: m.dienstverband },
    { label: "Reisafstand", waarde: m.reisafstand },
    { label: "Werkomgeving", waarde: m.omgeving },
  ];

  return (
    <DashboardShell variant="werkgever" naam={profile?.naam ?? null} navItems={navItems}>
      <Link
        href="/werkgever/dashboard/profielen"
        className="text-[14px] font-semibold text-black/50 transition-colors hover:text-black"
      >
        ← Alle profielen
      </Link>
      <div className="mt-6 grid grid-cols-[repeat(auto-fit,minmax(min(100%,300px),1fr))] items-start gap-9">
        <div className="flex flex-col gap-5">
          <span className="text-xs font-semibold tracking-[0.1em] text-black/45 uppercase">
            {m.regio || "Door heel Nederland"} · profiel {m.id.toUpperCase()}
          </span>
          <h1 className="m-0 font-display text-[clamp(28px,4vw,44px)] leading-[0.98] font-extrabold tracking-[-0.04em]">
            {m.wil}
          </h1>
          <p className="m-0 max-w-[58ch] text-[16.5px] leading-relaxed text-black/72">{m.intro}</p>
          <div className="flex flex-wrap gap-2">
            {[m.dienstverband, m.start, m.omgeving, m.sector].filter(Boolean).map((chip) => (
              <span key={chip} className="rounded-full bg-black/5 px-3.5 py-2 text-sm font-medium text-black/70">
                {chip}
              </span>
            ))}
          </div>
          <div className="mt-2 flex flex-col">
            {antwoorden.map((a) => (
              <div key={a.vraag} className="flex flex-col gap-2 border-t border-black/10 py-6">
                <span className="text-xs font-semibold tracking-[0.1em] text-black/45 uppercase">{a.vraag}</span>
                <span className="max-w-[62ch] text-[16.5px] leading-relaxed">{a.tekst}</span>
              </div>
            ))}
          </div>
        </div>

        <ProfielInvite id={m.id} wil={m.wil} praktisch={praktisch} />
      </div>
    </DashboardShell>
  );
}
