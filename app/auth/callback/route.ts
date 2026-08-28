import { createClient } from "@/lib/supabase/server";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams, origin } = request.nextUrl;
  const code = searchParams.get("code");
  const next = searchParams.get("next");

  if (code) {
    const supabase = await createClient();
    const { error } = await supabase.auth.exchangeCodeForSession(code);

    if (!error) {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      let destination = next || "/";

      if (user) {
        const meta = user.user_metadata ?? {};
        const { data: profile } = await supabase.from("profiles").select("role").eq("id", user.id).maybeSingle();
        const role = profile?.role;

        // First confirmation after signup: write the role-specific profile
        // that was staged in user_metadata (see SignupForm / EmployerSignupForm).
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
          if (!next) destination = "/werkzoekende/dashboard";
        } else if (role === "werkgever") {
          const { data: existing } = await supabase
            .from("employer_profiles")
            .select("id")
            .eq("id", user.id)
            .maybeSingle();
          if (!existing && meta.bedrijfsnaam && meta.contactpersoon) {
            await supabase.from("employer_profiles").insert({
              id: user.id,
              bedrijfsnaam: meta.bedrijfsnaam,
              contactpersoon: meta.contactpersoon,
              sector: meta.sector ?? null,
              bedrijfsgrootte: meta.bedrijfsgrootte ?? null,
              website: meta.website ?? null,
              telefoon: meta.telefoon ?? null,
            });
          }
          if (!next) destination = "/werkgever/dashboard";
        }
      }

      return NextResponse.redirect(`${origin}${destination}`);
    }
  }

  return NextResponse.redirect(`${origin}/auth/error`);
}
