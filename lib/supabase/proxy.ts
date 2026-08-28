import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

const werkzoekendeOnly = ["/werkzoekende/dashboard"];
const werkgeverOnly = ["/werkgever/dashboard"];
const werkgeverMuur = ["/mensen", "/profiel"];

function startsWithAny(pathname: string, prefixes: string[]) {
  return prefixes.some((p) => pathname === p || pathname.startsWith(`${p}/`));
}

export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({ request });

  // With Fluid compute, don't put this client in a global environment
  // variable. Always create a new one on each request.
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookieOptions: { secure: process.env.NODE_ENV === "production" },
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value));
          supabaseResponse = NextResponse.next({ request });
          cookiesToSet.forEach(({ name, value, options }) => supabaseResponse.cookies.set(name, value, options));
        },
      },
    },
  );

  // Do not run code between createServerClient and supabase.auth.getUser().
  // IMPORTANT: If you remove getUser() and use server-side rendering with the
  // Supabase client, your users may be randomly logged out.
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { pathname } = request.nextUrl;
  const needsJobseeker = startsWithAny(pathname, werkzoekendeOnly);
  const needsEmployer = startsWithAny(pathname, werkgeverOnly) || startsWithAny(pathname, werkgeverMuur);

  if (needsJobseeker || needsEmployer) {
    if (!user) {
      const url = request.nextUrl.clone();
      if (startsWithAny(pathname, werkgeverMuur)) {
        url.pathname = "/werkgever/registreren";
      } else {
        url.pathname = "/inloggen";
      }
      url.searchParams.set("next", pathname);
      return NextResponse.redirect(url);
    }

    const { data: profile } = await supabase.from("profiles").select("role").eq("id", user.id).maybeSingle();
    const role = profile?.role;

    if (needsJobseeker && role !== "werkzoekende") {
      const url = request.nextUrl.clone();
      url.pathname = role === "werkgever" ? "/werkgever/dashboard" : "/inloggen";
      url.search = "";
      return NextResponse.redirect(url);
    }

    if (needsEmployer && role !== "werkgever") {
      const url = request.nextUrl.clone();
      if (startsWithAny(pathname, werkgeverMuur)) {
        url.pathname = "/werkgever/registreren";
        url.searchParams.set("next", pathname);
      } else {
        url.pathname = role === "werkzoekende" ? "/werkzoekende/dashboard" : "/inloggen";
        url.search = "";
      }
      return NextResponse.redirect(url);
    }
  }

  // IMPORTANT: You *must* return the supabaseResponse object as it is.
  return supabaseResponse;
}
