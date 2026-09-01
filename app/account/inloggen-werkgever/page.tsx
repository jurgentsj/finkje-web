import type { Metadata } from "next";
import { Suspense } from "react";
import LoginForm from "@/components/LoginForm";

export const metadata: Metadata = {
  title: "Inloggen voor werkgevers",
  description: "Log in op je werkgeversaccount bij Finkje.",
};

export default function WerkgeversLoginPage() {
  return (
    <section className="mx-auto flex min-h-[calc(100vh-7rem)] max-w-[640px] flex-col justify-center px-4 py-8 sm:px-6 sm:py-20">
      <h1 className="m-0 font-display text-[43px] leading-[0.9] font-medium tracking-[-0.05em]">
        Inloggen voor werkgevers.
      </h1>
      <Suspense>
        <LoginForm employer />
      </Suspense>
    </section>
  );
}
