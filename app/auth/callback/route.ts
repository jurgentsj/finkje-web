import { createClient } from "@/lib/supabase/server";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams, origin } = request.nextUrl;
  const code = searchParams.get("code");
  const next = searchParams.get("next");
  const safeNext = next && next.startsWith("/") && !next.startsWith("//") ? next : null;

  if (code) {
    const supabase = await createClient();
    const { error } = await supabase.auth.exchangeCodeForSession(code);

    if (!error) {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      let destination = safeNext || "/";

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
          if (!safeNext) destination = "/werkzoekende/dashboard";
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
          if (!safeNext) destination = "/werkgever/dashboard";
        }
      }

      return NextResponse.redirect(`${origin}${destination}`);
    }
  }

  const error = searchParams.get("error");
  const errorCode = searchParams.get("error_code");
  const errorDescription = searchParams.get("error_description");
  const errorParams = new URLSearchParams();
  if (error) errorParams.set("error", error);
  if (errorCode) errorParams.set("error_code", errorCode);
  if (errorDescription) errorParams.set("error_description", errorDescription);

  return NextResponse.redirect(`${origin}/auth/error${errorParams.toString() ? `?${errorParams}` : ""}`);
}
