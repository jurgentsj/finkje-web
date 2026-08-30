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
          <p className="m-0 mb-6 text-xs font-semibold tracking-[0.16em] text-accent uppercase">Voor werkgevers</p>
          <h1 className="m-0 max-w-[12ch] font-display text-[clamp(42px,5.4vw,82px)] leading-[0.94] font-extrabold tracking-[-0.05em]">
            Vind de juiste mensen voor uw organisatie.
          </h1>
          <p className="mt-8 max-w-[46ch] text-lg leading-relaxed text-black/62 sm:text-xl">
            Finkje brengt u in contact met gemotiveerde mensen die weten wat zij willen. U kijkt verder dan het cv en ontdekt kandidaten die bewust voor uw organisatie kiezen.
          </p>
          <ul className="mt-10 flex max-w-[560px] flex-col gap-4 text-base leading-relaxed text-black/62 sm:text-lg">
            <li className="flex gap-3"><span className="mt-3 size-2 shrink-0 rounded-full bg-accent" aria-hidden="true" />Bekijk profielen van gemotiveerde werkzoekenden.</li>
            <li className="flex gap-3"><span className="mt-3 size-2 shrink-0 rounded-full bg-accent" aria-hidden="true" />Neem contact op wanneer u een passende kandidaat ziet.</li>
            <li className="flex gap-3"><span className="mt-3 size-2 shrink-0 rounded-full bg-accent" aria-hidden="true" />Maak uw volgende aanstelling op motivatie.</li>
          </ul>
        </div>
        <p className="m-0 text-sm text-black/45">Werkgevers kiezen op motivatie. Finkje maakt dat mogelijk.</p>
      </div>
      <div className="w-full max-w-[620px] lg:justify-self-end">
        <Suspense fallback={null}>
          <EmployerSignupForm />
        </Suspense>
      </div>
    </section>
  );
}
