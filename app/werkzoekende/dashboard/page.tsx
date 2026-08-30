import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import DashboardShell from "@/components/dashboard/DashboardShell";
import JobseekerProfileForm from "@/components/dashboard/JobseekerProfileForm";
import { isPreviewDemo } from "@/lib/demo-mode";

export const metadata: Metadata = {
  title: "Mijn dashboard",
};

const navItems = [
  { href: "/werkzoekende/dashboard", label: "Mijn aanmelding" },
  { href: "/werkzoekende/dashboard#droombaan", label: "Droombaan" },
  { href: "/werkzoekende/dashboard#kern", label: "De kern" },
  { href: "/werkzoekende/dashboard#werk", label: "Hoe ik werk" },
  { href: "/werkzoekende/dashboard#eerlijk", label: "Eerlijk beeld" },
  { href: "/werkzoekende/dashboard#ambitie", label: "Ambitie" },
  { href: "/werkzoekende/dashboard#beschikbaarheid", label: "Beschikbaarheid" },
];

export default async function WerkzoekendeDashboardPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const demo = isPreviewDemo() && !user;
  if (!user && !demo) redirect("/inloggen?next=/werkzoekende/dashboard");
  const demoUserId = "00000000-0000-0000-0000-000000000000";

  const { data: profile } = demo
    ? { data: { naam: "Demo werkzoekende", email: "demo@finkje.nl", role: "werkzoekende" as const } }
    : await supabase.from("profiles").select("naam, email, role").eq("id", user!.id).maybeSingle();

  if (profile?.role !== "werkzoekende") redirect("/werkgever/dashboard");

  const { data: jobseeker } = await supabase
    .from("jobseeker_profiles")
    .select(
      "droombaan, waarom, sterk, tegenaan, hkleur, dienstverband, beschikbaarheid, locatie, reisafstand, sector, ervaring, telefoon, overs, omgevingen, updated_at",
    )
    .eq("id", user?.id ?? demoUserId)
    .maybeSingle();

  return (
    <DashboardShell variant="werkzoekende" naam={profile?.naam ?? null} navItems={navItems}>
      <p className="m-0 mb-1 text-xs font-semibold tracking-[0.16em] text-accent uppercase">Mijn profiel</p>
      <h1 className="m-0 mb-8 font-display text-[clamp(30px,4vw,42px)] leading-tight font-extrabold tracking-[-0.04em]">
        Hoi {profile?.naam || "daar"}, hier kun je jouw gegevens aanpassen.
      </h1>
      <JobseekerProfileForm
        userId={user?.id ?? demoUserId}
        initial={{
          naam: profile?.naam ?? "",
          email: profile?.email ?? user?.email ?? "",
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
          updatedAt: jobseeker?.updated_at ?? null,
        }}
      />
      <section className="mt-8 rounded-[28px] bg-white p-7 sm:p-9" aria-labelledby="reacties-heading">
        <p className="m-0 text-xs font-semibold tracking-[0.16em] text-accent uppercase">Reacties</p>
        <h2 id="reacties-heading" className="mt-3 mb-2 font-display text-2xl font-bold tracking-[-0.03em]">Nog geen reacties</h2>
        <p className="m-0 max-w-[54ch] text-base leading-relaxed text-black/60">Dat kan even duren. Je aanmelding blijft actief tot er een match is. Je hoeft zelf niets te doen.</p>
        <a href="/contact" className="mt-5 inline-flex rounded-full border border-black/15 px-5 py-3 font-semibold transition-colors hover:border-accent hover:text-accent">Een vraag? Neem contact op</a>
      </section>
    </DashboardShell>
  );
}
