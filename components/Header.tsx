import Link from "next/link";
import Image from "next/image";

const links = [
  { href: "/hoe-het-werkt", label: "Hoe het werkt" },
  { href: "/blog", label: "Blog" },
  { href: "/onze-visie", label: "Onze visie" },
  { href: "/contact", label: "Contact & FAQ" },
  { href: "/voor-werkgevers", label: "Voor werkgevers" },
];

export default function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-black/10 bg-white/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-[1360px] items-center gap-6 px-6 py-4">
        <Link href="/" className="flex shrink-0 items-center">
          <Image
            src="/images/finkje-wordmark-b.png"
            alt="Finkje"
            width={110}
            height={22}
            className="h-[22px] w-auto"
            priority
          />
        </Link>
        <nav className="ml-auto flex flex-wrap items-center justify-end gap-1.5 text-[15px] font-medium">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="rounded-full px-3.5 py-2.5 text-black/65 transition-colors hover:bg-black/5 hover:text-black"
            >
              {l.label}
            </Link>
          ))}
          <Link
            href="/aanmelden"
            className="ml-2 rounded-full bg-accent px-[22px] py-3 font-semibold text-white transition-colors hover:bg-black"
          >
            Meld je aan
          </Link>
        </nav>
      </div>
    </header>
  );
}
