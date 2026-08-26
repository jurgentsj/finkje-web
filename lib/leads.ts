import { createClient } from "@/lib/supabase/client";

export type LeadKind = "signup" | "contact" | "reaction" | "vacancy" | "hero";

export async function saveLead(kind: LeadKind, payload: Record<string, unknown>, status: "draft" | "submitted" = "submitted") {
  const { error } = await createClient().from("lead_submissions").insert({ kind, status, payload });
  if (error) {
    console.error("[v0] Lead submission failed:", { kind, code: error.code, message: error.message });
    throw error;
  }

  try {
    const notificationResponse = await fetch("/api/telegram", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ kind, status, payload }),
    });

    if (!notificationResponse.ok) {
      const errorBody = await notificationResponse.text();
      console.error("[v0] Telegram notification failed:", {
        status: notificationResponse.status,
        body: errorBody,
      });
    }
  } catch (notificationError) {
    console.error("[v0] Telegram notification request failed:", notificationError);
  }
}

