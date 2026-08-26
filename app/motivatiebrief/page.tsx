import type { Metadata } from "next";
import VacatureBrief from "@/components/VacatureBrief";

export const metadata: Metadata = {
  title: "Onze motivatiebrief — Finkje",
  description: "Lees waarom Finkje vacatures bewust anders behandelt.",
};

export default function MotivatiebriefPage() {
  return (
    <section className="mx-auto max-w-[940px] px-6 pt-12 pb-28 sm:pt-18">
      <VacatureBrief />
    </section>
  );
}
