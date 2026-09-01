import type { SupabaseClient, User } from "@supabase/supabase-js";

/**
 * After a user verifies their one-time login code, this writes the shared
 * `profiles` row plus the role-specific profile (jobseeker or employer),
 * using the metadata staged at signup. Mirrors what /auth/callback used to
 * do for magic links, but runs client-side right after verifyOtp succeeds.
 * Returns the dashboard path the user should land on.
 */
export async function completeAuthProfile(
  supabase: SupabaseClient,
  user: User,
  requestedRole?: "werkzoekende" | "werkgever",
): Promise<string> {
  const meta = user.user_metadata ?? {};
  const { data: profile } = await supabase.from("profiles").select("role").eq("id", user.id).maybeSingle();
  // The registration flow passes its role explicitly. Never let an older
  // profiles row for the same account override the current registration.
  const role = requestedRole ?? meta.role ?? profile?.role;

  if (role !== "werkzoekende" && role !== "werkgever") {
    return "/";
  }

  const { error: profileError } = await supabase.from("profiles").upsert(
    {
      id: user.id,
      role,
      naam: meta.naam ?? meta.contactpersoon ?? "",
      email: user.email ?? "",
    },
    { onConflict: "id" },
  );
  if (profileError) {
    console.error("[v0] Failed to save auth profile:", { code: profileError.code, message: profileError.message });
    throw profileError;
  }

  if (role === "werkzoekende") {
    const { error: jobseekerError } = await supabase.from("jobseeker_profiles").upsert(
      {
        id: user.id,
        droombaan: meta.droombaan ?? null,
        waarom: meta.waarom ?? null,
        sterk: meta.sterk ?? null,
        tegenaan: meta.tegenaan ?? null,
        hkleur: meta.hkleur ?? null,
        dienstverband: meta.dienstverband ?? null,
        beschikbaarheid: meta.beschikbaarheid ?? null,
        locatie: meta.locatie ?? null,
        reisafstand: meta.reisafstand ?? null,
        sector: meta.sector ?? null,
        ervaring: meta.ervaring ?? null,
        telefoon: meta.telefoon ?? null,
        overs: meta.overs ?? [],
        omgevingen: meta.omgevingen ?? [],
      },
      { onConflict: "id" },
    );
    if (jobseekerError) {
      console.error("[v0] Failed to save jobseeker profile:", { code: jobseekerError.code, message: jobseekerError.message });
      throw jobseekerError;
    }
    return "/werkzoekende/dashboard";
  }

  if (meta.bedrijfsnaam && meta.contactpersoon) {
    await supabase.from("employer_profiles").upsert(
      {
        id: user.id,
        bedrijfsnaam: meta.bedrijfsnaam,
        contactpersoon: meta.contactpersoon,
        sector: meta.sector ?? null,
        bedrijfsgrootte: meta.bedrijfsgrootte ?? null,
        website: meta.website ?? null,
        telefoon: meta.telefoon ?? null,
      },
      { onConflict: "id" },
    );
  }
  return "/werkgever/dashboard";
}
