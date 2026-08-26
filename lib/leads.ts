import { createClient } from "@/lib/supabase/client";

export type LeadKind = "signup" | "contact" | "reaction" | "vacancy" | "hero";

export async function saveLead(kind: LeadKind, payload: Record<string, unknown>, status: "draft" | "submitted" = "submitted") {
  const { error } = await createClient().from("lead_submissions").insert({ kind, status, payload });
  if (error) throw error;
}

export async function saveHeroDraft(text: string) {
  const { data, error } = await createClient()
    .from("lead_submissions")
    .insert({ kind: "hero", status: "draft", payload: { wil: text } })
    .select("id")
    .single();
  if (error) throw error;
  return data.id as string;
}

export async function submitHeroDraft(id: string, text: string) {
  const { error } = await createClient()
    .from("lead_submissions")
    .update({ status: "submitted", payload: { wil: text }, updated_at: new Date().toISOString() })
    .eq("id", id)
    .eq("kind", "hero");
  if (error) throw error;
}
