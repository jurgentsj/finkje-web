"use client";

import { useReageer } from "@/lib/reageer-context";

export default function ProfielInvite({
  id,
  wil,
  praktisch,
}: {
  id: string;
  wil: string;
  praktisch: { label: string; waarde: string }[];
}) {
  const { reageerOp, heeftGereageerd } = useReageer();
  const gereageerd = heeftGereageerd(id);

  return (
    <div className="sticky top-25 flex flex-col gap-4 rounded-[28px] border border-black/12 bg-white p-7.5">
      <span className="font-display text-[26px] leading-tight font-extrabold tracking-[-0.035em]">
        Deze persoon uitnodigen
      </span>
      <p className="m-0 text-base leading-relaxed text-black/66">
        Je stuurt een uitnodiging via Finkje. Wij leggen die voor. Zegt deze persoon ja, dan krijg je naam en
        contactgegevens, zonder cv-ronde ertussen.
      </p>
      <div className="flex flex-col gap-3.5 border-t border-black/10 pt-4.5">
        {praktisch.map((v) => (
          <span key={v.label} className="flex justify-between gap-3.5 text-[15.5px]">
            <span className="text-black/55">{v.label}</span>
            <span className="text-right font-semibold">{v.waarde}</span>
          </span>
        ))}
      </div>
      {gereageerd ? (
        <span className="border-t border-black/10 pt-4.5 text-base leading-relaxed text-black/66">
          <strong className="text-accent">Reactie verstuurd.</strong> Je hoort binnen één werkdag of deze persoon
          in gesprek wil.
        </span>
      ) : (
        <button
          type="button"
          onClick={() => reageerOp(id, wil)}
          className="rounded-full bg-accent px-6 py-4 text-[16.5px] font-semibold text-white transition-colors hover:bg-black"
        >
          Reageer op dit profiel
        </button>
      )}
      <span className="text-[13.5px] text-black/45">Gratis. Geen abonnement, geen account nodig.</span>
    </div>
  );
}
