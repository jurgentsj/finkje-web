import Image from "next/image";
import Link from "next/link";

export default function NotFound() {
  return (
    <main className="mx-auto flex min-h-[70vh] max-w-[1100px] flex-col items-center justify-center gap-10 px-6 py-16 text-center sm:flex-row sm:text-left">
      <div className="flex max-w-[460px] flex-col gap-5">
        <p className="m-0 text-sm font-semibold uppercase tracking-[0.16em] text-accent">404 — deze pagina is even zoek</p>
        <h1 className="m-0 font-display text-[clamp(48px,8vw,88px)] leading-[0.9] font-semibold tracking-[-0.06em]">Oeps. Verkeerd afgeslagen.</h1>
        <p className="m-0 text-lg leading-relaxed text-black/60">Geen paniek. Zelfs de beste zoekers staan soms op de verkeerde plek.</p>
        <Link href="/" className="w-fit rounded-full bg-accent px-6 py-3.5 font-semibold text-white transition-colors hover:bg-black">Terug naar huis →</Link>
      </div>
      <div className="w-full max-w-[440px] overflow-hidden rounded-[32px]">
        <Image src="/images/404-finkje.png" alt="Een lege bureaustoel met een speels 404-bordje" width={880} height={590} className="h-auto w-full object-cover" priority />
      </div>
    </main>
  );
}
