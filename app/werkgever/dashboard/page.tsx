import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import DashboardShell from "@/components/dashboard/DashboardShell";
import EmployerProfileForm from "@/components/dashboard/EmployerProfileForm";
import { isPreviewDemo } from "@/lib/demo-mode";

export const metadata: Metadata = {
  title: "Werkgeversdashboard — Finkje",
};

const navItems = [
  { href: "/werkgever/dashboard", label: "Bedrijfsprofiel" },
  { href: "/werkgever/dashboard/profielen", label: "Profielen bekijken" },
];

export default async function WerkgeverDashboardPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const demo = isPreviewDemo() && !user;
  if (!user && !demo) redirect("/inloggen?next=/werkgever/dashboard");
  const demoUserId = "00000000-0000-0000-0000-000000000000";

  const { data: profile } = demo
    ? { data: { naam: "Demo werkgever", email: "demo@finkje.nl", role: "werkgever" as const } }
    : await supabase.from("profiles").select("naam, email, role").eq("id", user!.id).maybeSingle();

  if (profile?.role !== "werkgever") redirect("/werkzoekende/dashboard");

  const { data: employer } = await supabase
    .from("employer_profiles")
    .select("bedrijfsnaam, contactpersoon, sector, bedrijfsgrootte, website, telefoon")
    .eq("id", user?.id ?? demoUserId)
    .maybeSingle();

  return (
    <DashboardShell variant="werkgever" naam={employer?.bedrijfsnaam ?? profile?.naam ?? null} navItems={navItems}>
      <p className="m-0 mb-1 text-xs font-semibold tracking-[0.08em] text-black/40 uppercase">Bedrijfsprofiel</p>
      <h1 className="m-0 mb-8 font-display text-[clamp(24px,3vw,32px)] leading-tight font-bold tracking-[-0.03em]">
        Beheer je bedrijfsgegevens
      </h1>
      <EmployerProfileForm
        userId={user?.id ?? demoUserId}
        initial={{
          naam: profile?.naam ?? "",
          email: profile?.email ?? user?.email ?? "",
          bedrijfsnaam: employer?.bedrijfsnaam ?? "",
          contactpersoon: employer?.contactpersoon ?? "",
          sector: employer?.sector ?? null,
          bedrijfsgrootte: employer?.bedrijfsgrootte ?? null,
          website: employer?.website ?? null,
          telefoon: employer?.telefoon ?? null,
        }}
      />
    </DashboardShell>
  );
}
