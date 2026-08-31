"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useAuth } from "@/lib/auth-context";

const links = [
  { href: "/hoe-het-werkt", label: "Hoe het werkt" },
  { href: "/onze-visie", label: "Onze visie" },
  { href: "/contact", label: "Contact & FAQ" },
  { href: "/voor-werkgevers", label: "Voor werkgevers" },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const { loading, role } = useAuth();
  const dashboardHref = role === "werkgever" ? "/werkgever/dashboard" : "/werkzoekende/dashboard";

  // Lock background scroll while the drawer is open, and let Escape close it.
  useEffect(() => {
    if (!open) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  return (
    <>
      <header className="z-50 border-b lg:sticky lg:top-0 border-black/10 bg-white/90 backdrop-blur-md">
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

          {/* Desktop nav — unchanged, lg and up only */}
          <nav className="ml-auto hidden flex-wrap items-center justify-end gap-1.5 text-[15px] font-medium lg:flex">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="rounded-full px-3.5 py-2.5 text-[16px] text-black/65 transition-colors hover:bg-black/5 hover:text-black"
              >
                {l.label}
              </Link>
            ))}
            {!loading && role ? (
              <Link
                href={dashboardHref}
                className="ml-2 rounded-full bg-accent px-[22px] py-3 font-semibold text-white transition-colors hover:bg-black"
              >
                Mijn dashboard
              </Link>
            ) : (
              <>
                <div className="flex items-center gap-3">
                  <span aria-hidden="true" className="h-5 w-px bg-black/15" />
                  <Link
                    href="/inloggen"
                    className="rounded-full px-3.5 py-2.5 text-[16px] text-black/65 transition-colors hover:bg-black/5 hover:text-black"
                  >
                    Inloggen
                  </Link>
                </div>
                <Link
                  href="/aanmelden"
                  className="ml-2 rounded-full bg-accent px-[22px] py-3 text-[16px] font-semibold text-white transition-colors hover:bg-black"
                >
                  Aanmelden
                </Link>
              </>
            )}
          </nav>

          {/* Mobile/tablet: hamburger trigger only, below lg */}
          <button
            type="button"
            onClick={() => setOpen(true)}
            aria-label="Open menu"
            aria-expanded={open}
            aria-controls="mobile-nav-drawer"
            className="ml-auto flex h-11 w-11 items-center justify-center rounded-full text-[#111] transition-colors hover:bg-black/5 lg:hidden"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <line x1="3" y1="6" x2="21" y2="6" />
              <line x1="3" y1="12" x2="21" y2="12" />
              <line x1="3" y1="18" x2="21" y2="18" />
            </svg>
          </button>
        </div>
      </header>

      {/*
        Rendered OUTSIDE <header> on purpose: header has backdrop-blur, and
        backdrop-filter establishes a containing block for fixed-position
        descendants — a "fixed inset-0" child of header would only cover
        header's own (~70px) box instead of the full viewport, leaving
        everything below it unclickable.
      */}
      <div
        className={`fixed inset-0 z-[60] bg-black/40 transition-opacity duration-200 lg:hidden ${
          open ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
        }`}
        onClick={() => setOpen(false)}
        aria-hidden={!open}
      >
        <nav
          id="mobile-nav-drawer"
          aria-label="Hoofdmenu"
          onClick={(e) => e.stopPropagation()}
          className={`absolute top-0 right-0 flex h-full w-[min(320px,85vw)] flex-col gap-1 bg-white px-6 pt-5 pb-8 shadow-2xl transition-transform duration-200 ${
            open ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="mb-4 flex items-center justify-between">
            <Image src="/images/finkje-wordmark-b.png" alt="Finkje" width={100} height={20} className="h-5 w-auto" />
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Sluit menu"
              className="flex h-11 w-11 items-center justify-center rounded-full text-[#111] transition-colors hover:bg-black/5"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <line x1="5" y1="5" x2="19" y2="19" />
                <line x1="19" y1="5" x2="5" y2="19" />
              </svg>
            </button>
          </div>
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="rounded-xl px-4 py-3.5 text-lg font-medium text-black/75 transition-colors hover:bg-black/5 hover:text-black"
            >
              {l.label}
            </Link>
          ))}
          {!loading && role ? (
            <Link
              href={dashboardHref}
              onClick={() => setOpen(false)}
              className="mt-3 rounded-full bg-accent px-6 py-4 text-center text-lg font-semibold text-white transition-colors hover:bg-black"
            >
              Mijn dashboard
            </Link>
          ) : (
            <>
              <div className="flex items-center gap-3">
                <span aria-hidden="true" className="h-6 w-px bg-black/15" />
                <Link
                  href="/inloggen"
                  onClick={() => setOpen(false)}
                  className="rounded-xl px-4 py-3.5 text-lg font-medium text-black/75 transition-colors hover:bg-black/5 hover:text-black"
                >
                  Inloggen
                </Link>
              </div>
              <Link
                href="/aanmelden"
                onClick={() => setOpen(false)}
                className="mt-3 rounded-full bg-accent px-6 py-4 text-center text-lg font-semibold text-white transition-colors hover:bg-black"
              >
                Aanmelden
              </Link>
            </>
          )}
        </nav>
      </div>
    </>
  );
}
