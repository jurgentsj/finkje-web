import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import EmployerDashboard from "@/components/dashboard/EmployerDashboard";
import { isPreviewDemo } from "@/lib/demo-mode";

export const metadata: Metadata = { title: "Werkgeversdashboard" };

export default async function WerkgeverDashboardPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  const demo = isPreviewDemo() && !user;
  if (!user && !demo) redirect("/inloggen?next=/werkgever/dashboard");
  const id = user?.id ?? "00000000-0000-0000-0000-000000000000";
  const profile = demo ? { naam: "Demo werkgever", email: "demo@finkje.nl", role: "werkgever" } : (await supabase.from("profiles").select("naam, email, role").eq("id", id).maybeSingle()).data;
  if (profile?.role !== "werkgever") redirect("/werkzoekende/dashboard");
  const [employerResult, vacanciesResult, profilesResult, tokenResult] = await Promise.all([
    supabase.from("employer_profiles").select("bedrijfsnaam").eq("id", id).maybeSingle(),
    supabase.from("vacancies").select("id, titel, plaats, uren, omschrijving, status").eq("employer_id", id).order("created_at", { ascending: false }),
    supabase.from("profiles").select("id, naam, email, jobseeker_profiles(droombaan, sector, locatie, ervaring, beschikbaarheid, status)").eq("role", "werkzoekende"),
    supabase.from("employer_token_accounts").select("balance").eq("employer_id", id).maybeSingle(),
  ]);
  const profiles = (profilesResult.data ?? []).map((item) => ({ id: item.id, naam: item.naam ?? "", email: item.email ?? "", ...(Array.isArray(item.jobseeker_profiles) ? item.jobseeker_profiles[0] : item.jobseeker_profiles) })) as never[];
  return <EmployerDashboard initial={{ id, naam: profile?.naam ?? "", email: profile?.email ?? user?.email ?? "", bedrijfsnaam: employerResult.data?.bedrijfsnaam ?? "", vacancies: (vacanciesResult.data ?? []) as never[], profiles, tokens: tokenResult.data?.balance ?? 1 }} />;
}
