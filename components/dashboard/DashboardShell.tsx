"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

type NavItem = { href: string; label: string };

export default function DashboardShell({
  variant,
  naam,
  navItems,
  children,
}: {
  variant: "werkzoekende" | "werkgever";
  naam: string | null;
  navItems: NavItem[];
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [loggingOut, setLoggingOut] = useState(false);

  const isWerkgever = variant === "werkgever";

  const uitloggen = async () => {
    setLoggingOut(true);
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/");
    router.refresh();
  };

  const menuBase = isWerkgever
    ? "rounded-xl px-4 py-3 text-[15px] font-medium transition-colors"
    : "rounded-2xl px-4 py-3.5 text-[15.5px] font-semibold transition-colors";

  const menuActive = isWerkgever ? "bg-black text-white" : "bg-accent text-white";
  const menuInactive = isWerkgever ? "text-black/65 hover:bg-black/5 hover:text-black" : "text-black/70 hover:bg-sand";

  return (
    <div className={isWerkgever ? "bg-white" : "bg-sand"}>
      <div className="mx-auto flex max-w-[1360px] flex-col gap-6 px-6 py-8 lg:flex-row lg:gap-10 lg:py-12">
        {/* Mobile top bar */}
        <div className="flex items-center justify-between lg:hidden">
          <span className="font-display text-xl font-extrabold tracking-[-0.03em]">
            {isWerkgever ? "Werkgeversdashboard" : "Mijn dashboard"}
          </span>
          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            aria-label="Open menu"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-black/15"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <line x1="3" y1="6" x2="21" y2="6" />
              <line x1="3" y1="12" x2="21" y2="12" />
              <line x1="3" y1="18" x2="21" y2="18" />
            </svg>
          </button>
        </div>

        {/* Sidebar */}
        <aside
          className={`flex-col gap-1 lg:sticky lg:top-24 lg:flex lg:h-fit lg:w-64 lg:shrink-0 ${open ? "flex" : "hidden"}`}
        >
          <div className={`mb-2 flex flex-col gap-0.5 px-4 pt-2 ${isWerkgever ? "" : "pb-2"}`}>
            <span className="text-[13px] font-semibold text-black/40 uppercase tracking-[0.1em]">
              {isWerkgever ? "Werkgever" : "Welkom"}
            </span>
            <span className="truncate font-display text-lg font-bold tracking-[-0.02em]">{naam || "—"}</span>
          </div>
          {navItems.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className={`${menuBase} ${active ? menuActive : menuInactive}`}
              >
                {item.label}
              </Link>
            );
          })}
          <button
            type="button"
            onClick={uitloggen}
            disabled={loggingOut}
            className={`${menuBase} ${menuInactive} mt-2 border-t border-black/10 pt-4 text-left disabled:opacity-50`}
          >
            {loggingOut ? "Uitloggen…" : "Uitloggen"}
          </button>
        </aside>

        {/* Content */}
        <div className="min-w-0 flex-1">{children}</div>
      </div>
    </div>
  );
}
