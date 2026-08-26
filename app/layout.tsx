import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ReageerProvider from "@/lib/reageer-context";

export const metadata: Metadata = {
  title: "Finkje — Zeg het maar. Wat voor baan wil jíj?",
  description:
    "Finkje draait de arbeidsmarkt om: jij zegt wat je wil worden, wij leggen het voor aan werkgevers. Geen cv, geen motivatiebrief, gratis en anoniem tot jij ja zegt.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="nl">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,400;12..96,600;12..96,700;12..96,800&family=Instrument+Sans:wght@400;500;600&family=Instrument+Serif:ital@0;1&family=Space+Mono:wght@400;700&family=Syne:wght@600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="flex min-h-screen flex-col font-body text-[#111]">
        <ReageerProvider>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </ReageerProvider>
      </body>
    </html>
  );
}
