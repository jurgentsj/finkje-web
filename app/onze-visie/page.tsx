import type { Metadata } from "next";
import { VisionStorySaaS } from "@/components/VisionStorySaaS";

export const metadata: Metadata = {
  title: "Onze visie",
  description: "De visie achter Finkje: werk begint bij willen.",
};

export default function OnzeVisiePage() {
  return (
    <VisionStorySaaS />
  );
}
