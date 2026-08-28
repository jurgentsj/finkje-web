import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import DashboardShell from "@/components/dashboard/DashboardShell";
import MensenExplorer from "@/components/MensenExplorer";

export const metadata: Metadata = {
  title: "Profielen bekijken — Finkje",
};

const navItems = [
  { href: "/werkgever/dashboard", label: "Bedrijfsprofiel" },
  { href: "/werkgever/dashboard/profielen", label: "Profielen bekijken" },
];

export default async function WerkgeverProfielenPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/inloggen?next=/werkgever/dashboard/profielen");

  const { data: profile } = await supabase.from("profiles").select("naam, role").eq("id", user.id).maybeSingle();

  if (profile?.role !== "werkgever") redirect("/werkzoekende/dashboard");

  return (
    <DashboardShell variant="werkgever" naam={profile?.naam ?? null} navItems={navItems}>
      <p className="m-0 mb-1 text-xs font-semibold tracking-[0.08em] text-black/40 uppercase">Profielen</p>
      <h1 className="m-0 mb-8 font-display text-[clamp(24px,3vw,32px)] leading-tight font-bold tracking-[-0.03em]">
        Onze mensen
      </h1>
      <MensenExplorer />
    </DashboardShell>
  );
}
