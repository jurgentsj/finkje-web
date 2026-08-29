import type { Metadata } from "next";
import { Suspense } from "react";
import EmployerSignupForm from "@/components/EmployerSignupForm";

export const metadata: Metadata = {
  title: "Werkgeversaccount aanmaken — Finkje",
  description: "Maak een werkgeversaccount aan om profielen te bekijken en te reageren.",
};

export default function WerkgeverRegistrerenPage() {
  return (
    <main className="mx-auto grid max-w-[1440px] gap-12 px-6 py-16 lg:grid-cols-[minmax(0,1fr)_minmax(440px,0.92fr)] lg:items-start lg:gap-20 lg:px-10 lg:py-24">
      <section className="flex flex-col gap-7 pt-2 lg:pt-10">
        <p className="m-0 text-sm font-bold tracking-[0.16em] text-accent uppercase">Voor werkgevers</p>
        <h1 className="m-0 max-w-[9ch] font-display text-[clamp(56px,8vw,112px)] leading-[0.88] font-extrabold tracking-[-0.06em] text-balance">Kijk wie er klaarstaat</h1>
        <p className="m-0 max-w-[40ch] text-[clamp(19px,2.2vw,27px)] leading-relaxed text-black/60">Achter je account vind je iedereen die zich heeft aangemeld, met zijn eigen verhaal. Ook het reageren is gratis.</p>
        <div className="mt-4 flex max-w-[620px] flex-col">
          {["Alle profielen doorzoeken en filteren", "Gratis reageren, zo vaak je wil", "Contactgegevens zodra iemand ja zegt"].map((item) => (
            <div key={item} className="flex items-center gap-6 border-b border-black/10 py-6 text-lg sm:text-xl">
              <span aria-hidden="true" className="text-2xl font-bold text-accent">✓</span><span>{item}</span>
            </div>
          ))}
        </div>
        <p className="m-0 text-lg text-black/50">Gratis. Geen abonnement, geen kosten.</p>
      </section>
      <section className="rounded-[30px] bg-[#f5f4f1] p-6 sm:p-10 lg:p-12">
        <Suspense fallback={null}><EmployerSignupForm /></Suspense>
      </section>
    </main>
  );
}
