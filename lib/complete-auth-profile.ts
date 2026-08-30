import type { SupabaseClient, User } from "@supabase/supabase-js";

/**
 * After a user verifies their one-time login code, this writes the shared
 * `profiles` row plus the role-specific profile (jobseeker or employer),
 * using the metadata staged at signup. Mirrors what /auth/callback used to
 * do for magic links, but runs client-side right after verifyOtp succeeds.
 * Returns the dashboard path the user should land on.
 */
export async function completeAuthProfile(supabase: SupabaseClient, user: User): Promise<string> {
  const meta = user.user_metadata ?? {};
  const { data: profile } = await supabase.from("profiles").select("role").eq("id", user.id).maybeSingle();
  // The metadata staged at this signup reflects the role the user just chose
  // (werkzoekende vs werkgever), so it must take priority over any role
  // stored on an older profile row for the same account.
  const role = meta.role ?? profile?.role;

  if (role !== "werkzoekende" && role !== "werkgever") {
    return "/";
  }

  await supabase.from("profiles").upsert(
    {
      id: user.id,
      role,
      naam: meta.naam ?? meta.contactpersoon ?? "",
      email: user.email ?? "",
    },
    { onConflict: "id" },
  );

  if (role === "werkzoekende") {
    const { data: existing } = await supabase
      .from("jobseeker_profiles")
      .select("id")
      .eq("id", user.id)
      .maybeSingle();
    if (!existing) {
      await supabase.from("jobseeker_profiles").insert({
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
      });
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
