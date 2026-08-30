import type { Metadata } from "next";
import { Suspense } from "react";
import EmployerSignupForm from "@/components/EmployerSignupForm";

export const metadata: Metadata = {
  title: "Werkgeversaccount aanmaken",
  description: "Maak een werkgeversaccount aan om profielen te bekijken en te reageren.",
};

export default function WerkgeverRegistrerenPage() {
  return (
    <section className="mx-auto flex min-h-[calc(100vh-9rem)] max-w-[1360px] flex-col gap-16 px-6 py-14 sm:px-10 sm:py-20 lg:grid lg:grid-cols-[minmax(0,1.05fr)_minmax(420px,0.95fr)] lg:items-center lg:gap-24 lg:px-12">
      <div className="flex flex-col justify-between gap-16 lg:min-h-[540px] lg:py-8">
        <p className="m-0 text-lg font-semibold tracking-[-0.03em] text-foreground sm:text-xl">Finkje</p>
        <div className="max-w-[680px]">
          <p className="mt-8 max-w-[46ch] text-lg leading-relaxed font-semibold text-black sm:text-xl">
            Maak uw volgende aanstelling op motivatie. Finkje brengt u in contact met gemotiveerde mensen die weten wat zij willen.
          </p>
        </div>
        <p className="m-0 text-sm text-black/45">© 2026 Finkje</p>
      </div>
      <div className="w-full max-w-[620px] lg:justify-self-end">
        <Suspense fallback={null}>
          <EmployerSignupForm />
        </Suspense>
      </div>
    </section>
  );
}
