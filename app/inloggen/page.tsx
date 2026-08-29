import type { Metadata } from "next";
import { Suspense } from "react";
import LoginForm from "@/components/LoginForm";

export const metadata: Metadata = {
  title: "Inloggen — Finkje",
  description: "Log in op je Finkje-account.",
};

export default function InloggenPage() {
  return (
    <section className="mx-auto max-w-[640px] px-6 pt-14 pb-28 sm:pt-20">
      <p className="m-0 mb-6 text-xs font-semibold tracking-[0.16em] text-accent uppercase">Inloggen</p>
      <h1 className="m-0 font-display text-[clamp(36px,7vw,64px)] leading-[0.94] font-extrabold tracking-[-0.05em]">
        Welkom terug.
      </h1>
      <p className="mt-6 mb-10 max-w-[46ch] text-lg leading-snug text-black/62">
        Log in met je e-mailadres via een eenmalige link.
      </p>
      <Suspense>
        <LoginForm />
      </Suspense>
    </section>
  );
}
