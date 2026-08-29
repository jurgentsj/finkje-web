import type { Metadata } from "next";
import AccountPortal from "@/components/account/AccountPortal";

export const metadata: Metadata = {
  title: "Inloggen voor werkgevers — Finkje",
  description: "Log in op je werkgeversaccount bij Finkje.",
};

export default function WerkgeversLoginPage() {
  return <AccountPortal mode="employer-login" />;
}
