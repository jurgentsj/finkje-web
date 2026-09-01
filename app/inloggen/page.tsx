import type { Metadata } from "next";
import { Suspense } from "react";
import LoginForm from "@/components/LoginForm";

export const metadata: Metadata = {
  title: "Inloggen",
  description: "Log in op je Finkje-account.",
};

export default function InloggenPage() {
  return (
    <section className="mx-auto w-full max-w-[640px] px-5 pt-14 pb-28 sm:px-6 sm:pt-20">
      <h1 className="m-0 text-left font-display text-[clamp(52px,7vw,76px)] leading-[0.9] font-medium tracking-[-0.05em]">
        Welkom terug.
      </h1>
      <Suspense>
        <LoginForm />
      </Suspense>
    </section>
  );
}
