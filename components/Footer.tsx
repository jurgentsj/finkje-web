import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="bg-black text-white/70">
      <div className="mx-auto grid max-w-[1360px] grid-cols-[repeat(auto-fit,minmax(190px,1fr))] gap-10 px-6 py-16 pb-8">
        <div className="flex flex-col gap-4.5">
          <Image
            src="/images/finkje-wordmark-a.png"
            alt="Finkje"
            width={100}
            height={20}
            className="h-5 w-auto self-start"
          />
          <p className="m-0 max-w-[26ch] text-[15px] leading-snug text-white/50">Voor de Willers. </p>
        </div>

        <div className="flex flex-col gap-3 text-[15px]">
          <span className="text-xs tracking-[0.14em] text-white/35 uppercase">Voor jou</span>
          <Link href="/aanmelden" className="text-white/75 hover:text-white">
            Zeg wat je wil
          </Link>
          <Link href="/mensen" className="text-white/75 hover:text-white">
            Mensen
          </Link>
          <Link href="/contact" className="text-white/75 hover:text-white">
            Contact &amp; vragen
          </Link>
        </div>

        <div className="flex flex-col gap-3 text-[15px]">
          <span className="text-xs tracking-[0.14em] text-white/35 uppercase">Voor werkgevers</span>
          <Link href="/voor-werkgevers" className="text-white/75 hover:text-white">
            Hoe het werkt
          </Link>
          <Link href="/motivatiebrief" className="text-white/75 hover:text-white">
            Vacature plaatsen
          </Link>
        </div>

        <div className="flex flex-col gap-3 text-[15px]">
          <span className="text-xs tracking-[0.14em] text-white/35 uppercase">Finkje</span>
          <Link href="/onze-visie" className="text-white/75 hover:text-white">
            Onze visie
          </Link>
          <a href="mailto:contact@finkje.nl" className="text-white/75 hover:text-white">
            contact@finkje.nl
          </a>
          <a href="tel:+31108906696" className="text-white/75 hover:text-white">
            010 - 890 66 96
          </a>
          <span className="leading-snug text-white/50">
            Schiedamsesingel 187 E
            <br />
            3012 BB Rotterdam
          </span>
        </div>

        <div className="flex flex-col gap-3 text-[15px]">
          <span className="text-xs tracking-[0.14em] text-white/35 uppercase">Volg ons</span>
          <a
            href="https://www.linkedin.com/company/finkje"
            target="_blank"
            rel="noopener"
            className="text-white/75 hover:text-white"
          >
            LinkedIn
          </a>
          <a
            href="https://www.instagram.com/finkjenl"
            target="_blank"
            rel="noopener"
            className="text-white/75 hover:text-white"
          >
            Instagram
          </a>
          <a
            href="https://www.instagram.com/finkje.werkgevers/"
            target="_blank"
            rel="noopener"
            className="text-white/75 hover:text-white"
          >
            Instagram — werkgevers
          </a>
          <a
            href="https://www.reddit.com/user/Finkjenl/"
            target="_blank"
            rel="noopener"
            className="text-white/75 hover:text-white"
          >
            Reddit
          </a>
        </div>
      </div>
      <div className="mx-auto flex max-w-[1360px] flex-wrap items-center gap-x-7 gap-y-3 border-t border-white/10 px-6 py-6 pb-10 text-[13px] text-white/30">
        <span>© 2026 Finkje — Jouw droom is het beste cv dat je ooit gemaakt hebt.</span>
        <span className="ml-auto flex flex-wrap gap-x-6 gap-y-3">
          <Link href="/algemene-voorwaarden" className="text-white/60 hover:text-white">
            Algemene Voorwaarden
          </Link>
          <Link href="/privacybeleid" className="text-white/60 hover:text-white">
            Privacybeleid
          </Link>
          <span>KvK 95213120</span>
        </span>
      </div>
    </footer>
  );
}
