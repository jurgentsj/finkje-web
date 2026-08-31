import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CookieBanner from "@/components/CookieBanner";
import ReageerProvider from "@/lib/reageer-context";
import AuthProvider from "@/lib/auth-context";
import { Analytics } from "@vercel/analytics/next";

export const metadata: Metadata = {
  metadataBase: new URL("https://finkje.nl"),
  title: {
    default: "Finkje | Vind werk met je motivatie",
    template: "%s | Finkje",
  },
  description:
    "Vind werk zonder vacatures. Finkje legt je droombaan voor aan werkgevers die contact opnemen met jou.",
  alternates: { canonical: "/" },
  icons: { icon: "/thumbnail.png" },
  openGraph: {
    type: "website",
    locale: "nl_NL",
    siteName: "Finkje",
    title: "Finkje | Vind werk met je motivatie",
    description: "Vind werk zonder vacatures. Werkgevers reageren op jouw motivatie.",
    url: "https://finkje.nl",
    images: [{ url: "/thumbnail.png", width: 1200, height: 630, alt: "Finkje" }],
  },
  twitter: { card: "summary_large_image", images: ["/thumbnail.png"] },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="nl" className="bg-white">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700;800&family=Inter:wght@400;500;600;700&family=Instrument+Serif:ital@0;1&family=Space+Mono:wght@400;700&family=Syne:wght@600;700;800&display=swap"
          rel="stylesheet"
        />
        <style>{`\n          .finkje-hero-critical { display: block; width: 100%; max-width: 1360px; margin: 0 auto; padding: 46px 24px 0; }\n        `}</style>
      </head>
      <body className="flex min-h-screen flex-col font-body text-[#111]">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "Finkje",
              url: "https://finkje.nl",
              logo: "https://finkje.nl/thumbnail.png",
              description: "Finkje koppelt mensen aan werk op basis van motivatie.",
            }),
          }}
        />
        <AuthProvider>
          <ReageerProvider>
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
            <CookieBanner />
            <Analytics />
          </ReageerProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
