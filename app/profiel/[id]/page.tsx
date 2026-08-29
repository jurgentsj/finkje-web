import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { mensenData } from "@/lib/data";
import ProfielInvite from "@/components/ProfielInvite";

export function generateStaticParams() {
  return mensenData.map((m) => ({ id: m.id }));
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const m = mensenData.find((x) => x.id === id);
  return {
    title: m ? m.wil : "Profiel",
    description: m?.intro,
  };
}

export default async function ProfielPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const m = mensenData.find((x) => x.id === id);
  if (!m) notFound();

  const antwoorden = [
    { vraag: "Waar ik sterk in ben", tekst: m.sterk || "Helaas, geen invoer." },
    { vraag: "Waar ik tegenaan loop", tekst: m.tegenaan || "Helaas, geen invoer." },
    { vraag: "Wat heb ik ervoor over?", tekst: m.over || "Helaas, geen invoer." },
  ];
  const praktisch = [
    { label: "Beschikbaar", waarde: m.start },
    { label: "Dienstverband", waarde: m.dienstverband },
    { label: "Reisafstand", waarde: m.reisafstand },
    { label: "Werkomgeving", waarde: m.omgeving },
  ];

  return (
    <section className="mx-auto max-w-[1360px] px-6 pt-10 pb-24">
      <Link href="/mensen" className="text-[15px] font-semibold text-black/60 transition-colors hover:text-[#111]">
        ← Alle profielen
      </Link>
      <div className="mt-7 grid grid-cols-[repeat(auto-fit,minmax(min(100%,320px),1fr))] items-start gap-9 sm:gap-14">
        <div className="flex flex-col gap-5.5">
          <span className="text-xs font-semibold tracking-[0.16em] text-black/50 uppercase">
            {m.regio || "Door heel Nederland"} · profiel {m.id.toUpperCase()}
          </span>
          <h1 className="m-0 font-display text-[clamp(38px,6vw,78px)] leading-[0.92] font-extrabold tracking-[-0.05em]">
            {m.wil}
          </h1>
          <p className="m-0 max-w-[58ch] text-[clamp(18px,2vw,21px)] leading-relaxed text-black/78">{m.intro}</p>
          <div className="flex flex-wrap gap-2">
            {[m.dienstverband, m.start, m.omgeving, m.sector].filter(Boolean).map((chip) => (
              <span key={chip} className="rounded-full bg-sand px-3.5 py-2 text-sm font-medium text-black/72">
                {chip}
              </span>
            ))}
          </div>
          <div className="mt-3 flex flex-col">
            {antwoorden.map((a) => (
              <div key={a.vraag} className="flex flex-col gap-2.5 border-t border-black/12 py-6.5">
                <span className="text-xs font-semibold tracking-[0.14em] text-accent uppercase">{a.vraag}</span>
                <span className="max-w-[62ch] text-lg leading-relaxed">{a.tekst}</span>
              </div>
            ))}
          </div>
        </div>

        <ProfielInvite id={m.id} wil={m.wil} praktisch={praktisch} />
      </div>
    </section>
  );
}
