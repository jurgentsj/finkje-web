import type { Metadata } from "next";
import { Suspense } from "react";
import EmployerSignupForm from "@/components/EmployerSignupForm";

export const metadata: Metadata = {
  title: "Werkgeversaccount aanmaken — Finkje",
  description: "Maak een werkgeversaccount aan om profielen te bekijken en te reageren.",
};

export default function WerkgeverRegistrerenPage() {
  return (
    <main className="mx-auto grid max-w-[1280px] gap-16 px-6 py-14 lg:grid-cols-[minmax(0,0.92fr)_minmax(420px,0.8fr)] lg:items-start lg:gap-24 lg:px-10 lg:py-24">
      <section className="flex flex-col gap-6 pt-2 lg:pt-12">
        <p className="m-0 text-sm font-bold tracking-[0.16em] text-accent uppercase">Voor werkgevers</p>
        <h1 className="m-0 max-w-[11ch] font-display text-[clamp(40px,4.5vw,62px)] leading-[0.98] font-semibold tracking-[-0.055em] text-balance">Vind de juiste mensen voor je team.</h1>
        <p className="m-0 max-w-[40ch] text-[clamp(19px,2.2vw,27px)] leading-relaxed text-black/60">Maak gratis een account aan en ontdek kandidaten die zelf hebben aangegeven dat ze openstaan voor iets nieuws.</p>
        <div className="mt-4 flex max-w-[620px] flex-col">
          {["Alle profielen doorzoeken en filteren", "Gratis reageren, zo vaak je wil", "Contactgegevens zodra iemand ja zegt"].map((item) => (
            <div key={item} className="flex items-center gap-6 border-b border-black/10 py-6 text-lg sm:text-xl">
              <span aria-hidden="true" className="text-xl font-bold text-accent">✓</span><span>{item}</span>
            </div>
          ))}
        </div>
        <p className="m-0 text-lg text-black/50">Gratis. Geen abonnement, geen kosten.</p>
      </section>
      <section>
        <Suspense fallback={null}><EmployerSignupForm /></Suspense>
      </section>
    </main>
  );
}
