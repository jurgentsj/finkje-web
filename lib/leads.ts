import { createClient } from "@/lib/supabase/client";

export type LeadKind = "signup" | "contact" | "reaction" | "vacancy" | "hero";

export async function saveLead(kind: LeadKind, payload: Record<string, unknown>, status: "draft" | "submitted" = "submitted") {
  const { error } = await createClient().from("lead_submissions").insert({ kind, status, payload });
  if (error) {
    console.error("[v0] Lead submission failed:", { kind, code: error.code, message: error.message });
    throw error;
  }
}

