import { redirect } from "next/navigation";
import { createClient as createSupabaseClient } from "@supabase/supabase-js";
import { createClient } from "@/lib/supabase/server";

const kinds = ["signup", "hero", "werkgever", "contact"] as const;
const statuses = ["nieuw", "contact opgenomen", "geplaatst", "afgewezen"] as const;
type SearchParams = Promise<{ type?: string; status?: string; q?: string }>;

function adminClient() {
  return createSupabaseClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!, { auth: { persistSession: false, autoRefreshToken: false } });
}

async function requireAdmin() {
  const auth = await createClient();
  const { data: { user } } = await auth.auth.getUser();
  if (!user) redirect("/inloggen?next=/admin/leads");
  const { data: profile } = await auth.from("profiles").select("role").eq("id", user.id).maybeSingle();
  if (!(user.app_metadata?.is_admin === true || user.app_metadata?.role === "admin" || profile?.role === "admin")) redirect("/");
}

function value(payload: unknown, keys: string[]) {
  if (!payload || typeof payload !== "object") return "—";
  const record = payload as Record<string, unknown>;
  for (const key of keys) if (typeof record[key] === "string" && record[key]) return record[key] as string;
  return "—";
}

export default async function LeadsPage({ searchParams }: { searchParams: SearchParams }) {
  await requireAdmin();
  const params = await searchParams;
  const type = kinds.includes(params.type as (typeof kinds)[number]) ? params.type : "";
  const status = statuses.includes(params.status as (typeof statuses)[number]) ? params.status : "";
  const q = (params.q ?? "").trim().slice(0, 100);
  const db = adminClient();
  let query = db.from("lead_submissions").select("id, kind, status, payload, created_at").order("created_at", { ascending: false }).limit(500);
  if (type) query = query.eq("kind", type);
  if (status) query = query.eq("status", status);
  const { data: rows = [], error } = await query;
  const leads = (rows ?? []).filter((lead) => {
    if (!q) return true;
    const haystack = `${value(lead.payload, ["naam", "name", "contactpersoon"])} ${value(lead.payload, ["email", "e-mail"])}`.toLowerCase();
    return haystack.includes(q.toLowerCase());
  });

  return <main className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-5 py-12 sm:px-8">
    <header className="flex flex-col gap-3"><p className="m-0 text-xs font-semibold tracking-[0.16em] text-accent uppercase">Intern overzicht</p><h1 className="m-0 font-display text-4xl font-extrabold tracking-[-0.05em]">Leads</h1><p className="m-0 text-black/60">Hier staat iedereen die een eerste stap heeft gezet.</p></header>
    <section className="rounded-[28px] bg-sand p-5 sm:p-7">
      <form className="flex flex-wrap items-end gap-3"><label className="flex min-w-56 flex-1 flex-col gap-2 text-sm font-semibold">Zoeken<input name="q" defaultValue={q} placeholder="Naam of e-mail" className="rounded-xl border border-black/15 bg-white px-4 py-3 font-normal outline-none focus:border-accent" /></label><label className="flex flex-col gap-2 text-sm font-semibold">Type<select name="type" defaultValue={type} className="rounded-xl border border-black/15 bg-white px-4 py-3 font-normal"><option value="">Alles</option>{kinds.map((kind) => <option key={kind}>{kind}</option>)}</select></label><label className="flex flex-col gap-2 text-sm font-semibold">Status<select name="status" defaultValue={status} className="rounded-xl border border-black/15 bg-white px-4 py-3 font-normal"><option value="">Alles</option>{statuses.map((item) => <option key={item}>{item}</option>)}</select></label><button className="rounded-full bg-accent px-5 py-3 font-semibold text-white">Filter</button><a href={`/api/admin/leads?format=csv${type ? `&type=${encodeURIComponent(type)}` : ""}${status ? `&status=${encodeURIComponent(status)}` : ""}${q ? `&q=${encodeURIComponent(q)}` : ""}`} className="rounded-full border border-black/15 px-5 py-3 font-semibold">CSV export</a></form>
    </section>
    {error ? <p className="rounded-2xl bg-red-50 p-5 text-red-700">De leads konden niet worden geladen.</p> : <section className="overflow-hidden rounded-[28px] bg-white"><div className="hidden overflow-x-auto md:block"><table className="w-full text-left text-sm"><thead className="border-b border-black/10 text-xs uppercase tracking-[0.12em] text-black/45"><tr><th className="px-6 py-4">Naam</th><th className="px-6 py-4">E-mail</th><th className="px-6 py-4">Type</th><th className="px-6 py-4">Status</th><th className="px-6 py-4">Datum</th></tr></thead><tbody>{leads.map((lead) => <tr key={lead.id} className="border-b border-black/5"><td className="px-6 py-4 font-semibold">{value(lead.payload, ["naam", "name", "contactpersoon"])}</td><td className="px-6 py-4">{value(lead.payload, ["email", "e-mail"])}</td><td className="px-6 py-4">{lead.kind}</td><td className="px-6 py-4"><form action="/api/admin/leads" method="post"><input type="hidden" name="id" value={lead.id} /><select name="status" defaultValue={lead.status} className="rounded-lg border border-black/10 bg-sand px-2 py-1" onChange={(event) => event.currentTarget.form?.requestSubmit()}>{statuses.map((item) => <option key={item}>{item}</option>)}</select></form></td><td className="px-6 py-4 text-black/55">{new Date(lead.created_at).toLocaleDateString("nl-NL")}</td></tr>)}</tbody></table></div><div className="flex flex-col gap-4 p-5 md:hidden">{leads.map((lead) => <article key={lead.id} className="flex flex-col gap-2 rounded-2xl border border-black/10 p-4"><strong>{value(lead.payload, ["naam", "name", "contactpersoon"])}</strong><span className="text-sm text-black/60">{value(lead.payload, ["email", "e-mail"])} · {lead.kind}</span><form action="/api/admin/leads" method="post"><input type="hidden" name="id" value={lead.id} /><select name="status" defaultValue={lead.status} className="w-full rounded-lg border border-black/10 bg-sand px-3 py-2">{statuses.map((item) => <option key={item}>{item}</option>)}</select><button className="mt-2 text-sm font-semibold text-accent">Status opslaan</button></form></article>)}</div>{!leads.length && <p className="p-8 text-black/60">Geen leads gevonden.</p>}</section>}
  </main>;
}
