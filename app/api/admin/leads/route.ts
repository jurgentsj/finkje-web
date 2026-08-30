import { NextResponse } from "next/server";
import { createClient as createSupabaseClient } from "@supabase/supabase-js";
import { createClient } from "@/lib/supabase/server";

const statuses = ["nieuw", "contact opgenomen", "geplaatst", "afgewezen"] as const;
const kinds = ["signup", "hero", "werkgever", "contact"] as const;

function db() {
  return createSupabaseClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!, { auth: { persistSession: false, autoRefreshToken: false } });
}
async function authorized() {
  const auth = await createClient();
  const { data: { user } } = await auth.auth.getUser();
  if (!user) return false;
  const { data: profile } = await auth.from("profiles").select("role").eq("id", user.id).maybeSingle();
  return user.app_metadata?.is_admin === true || user.app_metadata?.role === "admin" || profile?.role === "admin";
}
function field(payload: unknown, names: string[]) { if (!payload || typeof payload !== "object") return ""; const p = payload as Record<string, unknown>; return names.map((name) => p[name]).find((v) => typeof v === "string") as string || ""; }
function csvCell(value: string) { return `"${value.replaceAll('"', '""')}"`; }

export async function POST(request: Request) {
  if (!(await authorized())) return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  const body = await request.formData();
  const id = String(body.get("id") ?? "");
  const status = String(body.get("status") ?? "");
  if (!id || !statuses.includes(status as (typeof statuses)[number])) return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  const { error } = await db().from("lead_submissions").update({ status, updated_at: new Date().toISOString() }).eq("id", id);
  if (error) return NextResponse.json({ error: "Update failed" }, { status: 500 });
  return NextResponse.redirect(new URL("/admin/leads", request.url), 303);
}

export async function GET(request: Request) {
  if (!(await authorized())) return new NextResponse("Forbidden", { status: 403 });
  const url = new URL(request.url);
  const type = url.searchParams.get("type") ?? "";
  const status = url.searchParams.get("status") ?? "";
  const q = (url.searchParams.get("q") ?? "").trim().toLowerCase();
  const query = db().from("lead_submissions").select("id, kind, status, payload, created_at").order("created_at", { ascending: false }).limit(500);
  if (kinds.includes(type as (typeof kinds)[number])) query.eq("kind", type);
  if (statuses.includes(status as (typeof statuses)[number])) query.eq("status", status);
  const { data, error } = await query;
  if (error) return NextResponse.json({ error: "Load failed" }, { status: 500 });
  const rows = (data ?? []).filter((row) => !q || `${field(row.payload, ["naam", "name", "contactpersoon"])} ${field(row.payload, ["email", "e-mail"])}`.toLowerCase().includes(q));
  if (url.searchParams.get("format") !== "csv") return NextResponse.json(rows);
  const csv = ["Naam,E-mail,Type,Status,Datum", ...rows.map((row) => [field(row.payload, ["naam", "name", "contactpersoon"]), field(row.payload, ["email", "e-mail"]), row.kind, row.status, new Date(row.created_at).toISOString()].map(csvCell).join(","))].join("\n");
  return new NextResponse(csv, { headers: { "content-type": "text/csv; charset=utf-8", "content-disposition": "attachment; filename=leads.csv" } });
}
