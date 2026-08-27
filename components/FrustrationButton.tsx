"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { RealtimePostgresChangesPayload } from "@supabase/supabase-js";
import { createClient } from "@/lib/supabase/client";

type FrustrationCounterRow = {
  count: number;
};

type FrustrationButtonProps = {
  heading?: string;
  description?: string;
  note?: string;
  buttonLabel?: string;
  className?: string;
};

const FLUSH_INTERVAL_MS = 450;
const MAX_BATCH_PER_FLUSH = 50;

export default function FrustrationButton({
  heading = "Bewijs dat solliciteren frustreert.",
  description = "Klik zo vaak je wil. Iedere klik bewijst hoeveel mensen vastlopen in het huidige sollicitatiesysteem.",
  note,
  buttonLabel = "Frustratieteller",
  className = "",
}: FrustrationButtonProps) {
  const supabaseRef = useRef(createClient());
  const [count, setCount] = useState<number | null>(null);
  const [bursts, setBursts] = useState<{ id: number; x: number }[]>([]);

  const serverCountRef = useRef(0);
  const pendingConfirmRef = useRef(0);
  const unsentRef = useRef(0);
  const burstIdRef = useRef(0);

  const recompute = useCallback(() => {
    setCount(serverCountRef.current + pendingConfirmRef.current);
  }, []);

  const applyConfirmed = useCallback(
    (newValue: number) => {
      if (newValue > serverCountRef.current) {
        const increase = newValue - serverCountRef.current;
        serverCountRef.current = newValue;
        pendingConfirmRef.current = Math.max(0, pendingConfirmRef.current - increase);
        recompute();
      }
    },
    [recompute],
  );

  useEffect(() => {
    const supabase = supabaseRef.current;
    // Guard against React's dev-mode double-invoke of effects (mount → cleanup
    // → mount again on the same instance): if the effect was already cleaned
    // up by the time our async work resolves, skip creating the subscription
    // so we never call .on()/.subscribe() on a channel nobody will clean up.
    let active = true;
    let channel: ReturnType<typeof supabase.channel> | null = null;

    async function init() {
      const { data } = await supabase.from("frustration_counter").select("count").eq("id", 1).maybeSingle();

      if (!active) return;

      if (data) {
        applyConfirmed(Number(data.count));
      }

      const channelName = `frustration-counter-changes-${Math.random().toString(36).slice(2)}`;
      channel = supabase
        .channel(channelName)
        .on(
          "postgres_changes",
          { event: "UPDATE", schema: "public", table: "frustration_counter" },
          (payload: RealtimePostgresChangesPayload<FrustrationCounterRow>) => {
            const updated = payload.new as FrustrationCounterRow;
            applyConfirmed(Number(updated.count));
          },
        )
        .subscribe();
    }

    init();

    return () => {
      active = false;
      if (channel) supabase.removeChannel(channel);
    };
  }, [applyConfirmed]);

  useEffect(() => {
    const supabase = supabaseRef.current;

    const interval = setInterval(async () => {
      const amount = unsentRef.current;
      if (amount <= 0) return;
      unsentRef.current = 0;

      const { data, error } = await supabase.rpc("increment_frustration_counter", { amount });

      if (error) {
        unsentRef.current += amount;
        return;
      }

      if (typeof data === "number") {
        applyConfirmed(data);
      }
    }, FLUSH_INTERVAL_MS);

    return () => clearInterval(interval);
  }, [applyConfirmed]);

  function handleClick() {
    pendingConfirmRef.current += 1;
    unsentRef.current = Math.min(unsentRef.current + 1, MAX_BATCH_PER_FLUSH);
    recompute();

    const id = burstIdRef.current++;
    const x = Math.round(Math.random() * 56 - 28);
    setBursts((prev) => [...prev, { id, x }]);
    window.setTimeout(() => {
      setBursts((prev) => prev.filter((b) => b.id !== id));
    }, 650);
  }

  return (
    <div
      className={`flex flex-col items-center gap-6 rounded-[32px] bg-black px-8 py-12 text-center text-white sm:px-14 ${className}`}
    >
      <h2 className="m-0 max-w-[22ch] font-display text-[clamp(28px,4vw,52px)] leading-[0.96] font-extrabold tracking-[-0.04em]">
        {heading}
      </h2>
      <p className="m-0 max-w-[44ch] text-[16.5px] leading-relaxed text-white/60">{description}</p>

      <div className="relative mt-2">
        <button
          type="button"
          onClick={handleClick}
          className="relative rounded-full bg-accent px-10 py-6 text-[19px] font-bold text-white transition-transform duration-100 select-none hover:bg-white hover:text-[#111] active:scale-95"
        >
          {buttonLabel}
        </button>
        {bursts.map((b) => (
          <span
            key={b.id}
            className="pointer-events-none absolute top-1 left-1/2 text-sm font-bold text-accent"
            style={{
              "--frustration-x": `${b.x}px`,
              animation: "frustration-float 650ms ease-out forwards",
            } as React.CSSProperties}
          >
            +1
          </span>
        ))}
      </div>

      <div className="flex flex-col items-center gap-1">
        <span className="font-display text-[clamp(34px,5vw,56px)] font-extrabold tracking-[-0.03em] tabular-nums">
          {count === null ? "—" : count.toLocaleString("nl-NL")}
        </span>
        <span className="text-xs font-semibold tracking-[0.14em] text-white/40 uppercase">
          Mensen die net als jij vastlopen
        </span>
      </div>

      {note ? <p className="m-0 max-w-[44ch] text-[15px] leading-relaxed text-white/45">{note}</p> : null}
    </div>
  );
}
