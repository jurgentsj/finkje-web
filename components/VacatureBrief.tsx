"use client";

import Link from "next/link";
import { useState } from "react";

export default function VacatureBrief() {
  const [uitgeklapt, setUitgeklapt] = useState(false);

  return (
    <>
      <div className="flex flex-col gap-5 rounded-3xl bg-sand p-7 sm:p-11">
        <h2 className="m-0 font-display text-[clamp(24px,3vw,34px)] leading-none font-extrabold tracking-[-0.04em]">
          Voordat je doorgaat: onze motivatiebrief.
        </h2>
        <p className="m-0 text-[17.5px] leading-relaxed text-black/78">
          Motivatie zegt alles. Daar zijn wij van overtuigd.
        </p>
        <p className="m-0 text-[17.5px] leading-relaxed text-black/78">
          We zijn selectief. Niet iedereen komt zomaar in aanmerking om bij jouw bedrijf op gesprek te gaan. Daarom
          hebben we bewust drempels gecreëerd die alleen oprecht gemotiveerde mensen nemen.
        </p>
        <p className="m-0 text-[17.5px] leading-relaxed text-black/78">
          Dat begint bij dat we de vacature die jij zo gaat plaatsen niet laten zien. Want de ervaring leert dat
          mensen naar een vacature toe schrijven. Was het intrinsieke motivatie? Of waren het toch de voorwaarden
          in jouw vacaturetekst? Of simpelweg een sollicitatie bij gebrek aan beter?
        </p>
        <div className={`${uitgeklapt ? "flex" : "hidden"} flex-col gap-5 md:flex`}>
          <p className="m-0 text-[17.5px] leading-relaxed text-black/78">
            Wij draaien het om. Onze mensen beschrijven en motiveren hun ideale droombaan. Daarna zoek je zelf tussen
            onze Willers, of laat je dat aan ons over. Past er nu niemand? Dan blijft de vacature openstaan tot de
            einddatum. Zo krijg je mensen die niet proberen te passen, maar het al doen.
          </p>
          <p className="m-0 text-[17.5px] leading-relaxed text-black/78">
            Mensen die doen wat ze echt willen, zijn gelukkiger. En precies die mensen maken uiteindelijk het
            verschil op de werkvloer.
          </p>
        </div>
        {!uitgeklapt && (
          <button type="button" onClick={() => setUitgeklapt(true)} className="self-start text-base font-semibold text-accent md:hidden">
            Lees meer →
          </button>
        )}
        <p className="m-0 text-[17.5px] leading-relaxed text-black/78">
          Vragen over je vacature of onze manier van werken? App of mail ons.
        </p>
        <div className="flex flex-col gap-0.5 pt-1">
          <span className="font-display text-[19px] font-bold tracking-[-0.03em]">Rembt &amp; Jurgen</span>
          <span className="text-[15px] text-black/50">Oprichters van Finkje</span>
        </div>
      </div>

      <div className="flex flex-col gap-3.5 px-1 pt-7">
        <Link
          href="/plaats-je-vacature"
          className="self-start rounded-full bg-black px-7.5 py-4.5 text-[17px] font-semibold text-white transition-colors hover:bg-accent"
        >
          Plaats je vacature →
        </Link>
      </div>
    </>
  );
}
