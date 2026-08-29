import type { Metadata } from "next";
import { Suspense } from "react";
import EmployerSignupForm from "@/components/EmployerSignupForm";

export const metadata: Metadata = {
  title: "Werkgeversaccount aanmaken",
  description: "Maak een werkgeversaccount aan om profielen te bekijken en te reageren.",
};

export default function WerkgeverRegistrerenPage() {
  return (
    <section className="mx-auto max-w-[640px] px-6 pt-14 pb-28 sm:pt-20">
      <p className="m-0 mb-6 text-xs font-semibold tracking-[0.16em] text-accent uppercase">Voor werkgevers</p>
      <h1 className="m-0 font-display text-[clamp(36px,7vw,64px)] leading-[0.94] font-extrabold tracking-[-0.05em]">
        Maak je account aan.
      </h1>
      <p className="mt-6 mb-10 max-w-[46ch] text-lg leading-snug text-black/62">
        Ontdek kandidaten die zelf openstaan voor een nieuwe stap.
      </p>
      <Suspense fallback={null}>
        <EmployerSignupForm />
      </Suspense>
    </section>
  );
}
