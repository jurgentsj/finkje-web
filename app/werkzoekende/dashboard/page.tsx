import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import DashboardShell from "@/components/dashboard/DashboardShell";
import JobseekerProfileForm from "@/components/dashboard/JobseekerProfileForm";

export const metadata: Metadata = {
  title: "Mijn dashboard — Finkje",
};

const navItems = [{ href: "/werkzoekende/dashboard", label: "Mijn profiel" }];

export default async function WerkzoekendeDashboardPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/inloggen?next=/werkzoekende/dashboard");

  const { data: profile } = await supabase.from("profiles").select("naam, email, role").eq("id", user.id).maybeSingle();

  if (profile?.role !== "werkzoekende") redirect("/werkgever/dashboard");

  const { data: jobseeker } = await supabase
    .from("jobseeker_profiles")
    .select(
      "droombaan, waarom, sterk, tegenaan, hkleur, dienstverband, beschikbaarheid, locatie, reisafstand, sector, ervaring, telefoon, overs, omgevingen",
    )
    .eq("id", user.id)
    .maybeSingle();

  return (
    <DashboardShell variant="werkzoekende" naam={profile?.naam ?? null} navItems={navItems}>
      <p className="m-0 mb-1 text-xs font-semibold tracking-[0.16em] text-accent uppercase">Mijn profiel</p>
      <h1 className="m-0 mb-8 font-display text-[clamp(30px,4vw,42px)] leading-tight font-extrabold tracking-[-0.04em]">
        Hoi {profile?.naam || "daar"}, hier kun je jouw gegevens aanpassen.
      </h1>
      <JobseekerProfileForm
        userId={user.id}
        initial={{
          naam: profile?.naam ?? "",
          email: profile?.email ?? user.email ?? "",
          droombaan: jobseeker?.droombaan ?? null,
          waarom: jobseeker?.waarom ?? null,
          sterk: jobseeker?.sterk ?? null,
          tegenaan: jobseeker?.tegenaan ?? null,
          hkleur: jobseeker?.hkleur ?? null,
          dienstverband: jobseeker?.dienstverband ?? null,
          beschikbaarheid: jobseeker?.beschikbaarheid ?? null,
          locatie: jobseeker?.locatie ?? null,
          reisafstand: jobseeker?.reisafstand ?? null,
          sector: jobseeker?.sector ?? null,
          ervaring: jobseeker?.ervaring ?? null,
          telefoon: jobseeker?.telefoon ?? null,
          overs: jobseeker?.overs ?? [],
          omgevingen: jobseeker?.omgevingen ?? [],
        }}
      />
    </DashboardShell>
  );
}
