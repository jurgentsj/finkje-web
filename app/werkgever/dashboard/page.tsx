import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import EmployerDashboard from "@/components/dashboard/EmployerDashboard";
import { isPreviewDemo } from "@/lib/demo-mode";

type Vacancy = { id: string; titel: string; plaats: string; uren: string; omschrijving: string; status: "Online" | "Op pauze" };

export const metadata: Metadata = {
  title: "Werkgeversdashboard",
};

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

  const { data: vacancies = [] } = demo
    ? { data: [] }
    : await supabase.from("vacancies").select("id, titel, plaats, uren, omschrijving, status").eq("employer_id", user!.id).order("created_at", { ascending: false });

  return <EmployerDashboard initial={{
    id: user?.id ?? demoUserId,
    naam: employer?.contactpersoon ?? profile?.naam ?? "",
    email: profile?.email ?? user?.email ?? "",
    bedrijfsnaam: employer?.bedrijfsnaam ?? "",
    plaats: "",
    website: employer?.website ?? "",
    telefoon: employer?.telefoon ?? "",
    vacancies: vacancies as Vacancy[],
  }} />;
}
