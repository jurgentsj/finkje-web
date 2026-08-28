import type { Metadata } from "next";
import { Suspense } from "react";
import EmployerSignupForm from "@/components/EmployerSignupForm";

export const metadata: Metadata = {
  title: "Werkgeversaccount aanmaken — Finkje",
  description: "Maak een werkgeversaccount aan om profielen te bekijken en te reageren.",
};

export default function WerkgeverRegistrerenPage() {
  return (
    <section className="mx-auto max-w-[640px] px-6 py-20">
      <Suspense fallback={null}>
        <EmployerSignupForm />
      </Suspense>
    </section>
  );
}
