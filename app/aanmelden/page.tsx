import type { Metadata } from "next";
import { Suspense } from "react";
import SignupForm from "@/components/SignupForm";

export const metadata: Metadata = {
  title: "Meld je aan",
  description: "In zes stappen naar jouw droombaan. Gratis en anoniem tot jij ja zegt.",
};

export default function AanmeldenPage() {
  return (
    <section className="mx-auto max-w-[940px] px-6 py-20">
      <Suspense fallback={null}>
        <SignupForm />
      </Suspense>
    </section>
  );
}
