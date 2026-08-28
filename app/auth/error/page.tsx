import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Er ging iets mis — Finkje",
};

export default async function AuthErrorPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const params = await searchParams;
  // `error` comes from the URL, so it is attacker-controlled. Render it only
  // when it looks like a Supabase error code, never as free text someone can
  // choose.
  const code = params?.error;
  const isErrorCode = typeof code === "string" && /^[a-z0-9_]{1,64}$/.test(code);

  return (
    <section className="mx-auto max-w-[640px] px-6 pt-20 pb-28">
      <div className="flex flex-col gap-5.5 rounded-[28px] bg-sand p-10">
        <span className="text-xs font-semibold tracking-[0.16em] text-accent uppercase">Inloggen</span>
        <h1 className="m-0 font-display text-[clamp(30px,5vw,48px)] leading-[0.98] font-extrabold tracking-[-0.04em]">
          Er ging iets mis.
        </h1>
        <p className="m-0 max-w-[46ch] text-lg leading-relaxed text-black/62">
          {isErrorCode
            ? `De link is niet meer geldig of al gebruikt (code: ${code}). Probeer het opnieuw.`
            : "De link is niet meer geldig of al gebruikt. Probeer het opnieuw."}
        </p>
        <Link
          href="/inloggen"
          className="self-start rounded-full bg-accent px-7 py-4 font-semibold text-white transition-colors hover:bg-black"
        >
          Terug naar inloggen
        </Link>
      </div>
    </section>
  );
}
