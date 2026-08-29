"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import type { AuthChangeEvent, Session } from "@supabase/supabase-js";

export default function AuthRedirect() {
  const router = useRouter();

  useEffect(() => {
    const supabase = createClient();
    let active = true;

    const redirectUser = async () => {
      const { data } = await supabase.auth.getSession();
      if (!active || !data.session?.user) return;

      const user = data.session.user;
      const role = user.user_metadata?.role;
      if (role === "werkgever") {
        router.replace("/werkgever/dashboard");
      } else if (role === "werkzoekende") {
        router.replace("/werkzoekende/dashboard");
      }
    };

    redirectUser();
    const { data: listener } = supabase.auth.onAuthStateChange((_event: AuthChangeEvent, session: Session | null) => {
      if (!active || !session?.user) return;
      const role = session.user.user_metadata?.role;
      if (role === "werkgever") router.replace("/werkgever/dashboard");
      if (role === "werkzoekende") router.replace("/werkzoekende/dashboard");
    });

    return () => {
      active = false;
      listener.subscription.unsubscribe();
    };
  }, [router]);

  return null;
}
