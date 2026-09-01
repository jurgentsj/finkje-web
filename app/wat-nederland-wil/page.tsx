import type { Metadata } from "next";
import { WillersMap } from "@/components/WillersMap";

export const metadata: Metadata = {
  title: "Wat Nederland Wil | Finkje",
  description: "Ontdek waar de willers van Nederland zitten en wat ze graag willen doen.",
};

export default function WatNederlandWilPage() {
  return <WillersMap />;
}
