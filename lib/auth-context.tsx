"use client";

import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { createClient } from "@/lib/supabase/client";

export type SessionRole = "werkzoekende" | "werkgever";

type Ctx = {
  loading: boolean;
  userId: string | null;
  naam: string | null;
  email: string | null;
  role: SessionRole | null;
};

const AuthContext = createContext<Ctx>({ loading: true, userId: null, naam: null, email: null, role: null });

export function useAuth() {
  return useContext(AuthContext);
}

export default function AuthProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<Ctx>({ loading: true, userId: null, naam: null, email: null, role: null });

  useEffect(() => {
    const supabase = createClient();
    let active = true;

    const load = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        if (active) setState({ loading: false, userId: null, naam: null, email: null, role: null });
        return;
      }

      const { data: profile } = await supabase.from("profiles").select("role, naam").eq("id", user.id).maybeSingle();

      if (active) {
        setState({
          loading: false,
          userId: user.id,
          naam: profile?.naam ?? null,
          email: user.email ?? null,
          role: (profile?.role as SessionRole) ?? null,
        });
      }
    };

    load();

    const { data: listener } = supabase.auth.onAuthStateChange(() => {
      load();
    });

    return () => {
      active = false;
      listener.subscription.unsubscribe();
    };
  }, []);

  return <AuthContext.Provider value={state}>{children}</AuthContext.Provider>;
}
