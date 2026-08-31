import type { Metadata } from "next";
import { Suspense } from "react";
import LoginForm from "@/components/LoginForm";

export const metadata: Metadata = {
  title: "Inloggen voor werkgevers",
  description: "Log in op je werkgeversaccount bij Finkje.",
};

export default function WerkgeversLoginPage() {
  return (
    <section className="mx-auto flex min-h-[calc(100vh-7rem)] max-w-[640px] flex-col justify-center px-4 py-8 sm:px-6 sm:py-20">
      <p className="m-0 mb-6 text-xs font-semibold tracking-[0.16em] text-accent uppercase">Inloggen voor werkgevers</p>
      <h1 className="m-0 font-display text-[clamp(52px,7vw,89px)] leading-[0.9] font-medium tracking-[-0.05em]">
        Welkom terug.
      </h1>
      <p className="mt-6 mb-10 max-w-[46ch] text-[clamp(18px,2vw,21px)] leading-snug text-black/62">
        Log in met je e-mailadres via een eenmalige inlogcode.
      </p>
      <Suspense>
        <LoginForm employer />
      </Suspense>
    </section>
  );
}
