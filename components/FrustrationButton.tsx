"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { createClient } from "@/lib/supabase/client";

type FrustrationButtonProps = {
  eyebrow?: string;
  heading?: string;
  description?: string;
  note?: string;
  buttonLabel?: string;
  className?: string;
};

const FLUSH_INTERVAL_MS = 450;
const MAX_BATCH_PER_FLUSH = 50;

export default function FrustrationButton({
  eyebrow,
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
          (payload) => {
            const updated = payload.new as { count: number };
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
      className={`flex flex-col gap-9 rounded-[28px] border border-black/10 bg-sand px-7 py-8 sm:px-11 sm:py-10 ${className}`}
    >
      <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,260px),1fr))] items-center gap-9">
        <div className="flex flex-col gap-3">
          {eyebrow ? (
            <span className="text-xs font-semibold tracking-[0.16em] text-accent uppercase">{eyebrow}</span>
          ) : null}
          <h2 className="m-0 max-w-[26ch] font-display text-[clamp(22px,2.6vw,32px)] leading-[1.08] font-bold tracking-[-0.02em] text-black">
            {heading}
          </h2>
          <p className="m-0 max-w-[46ch] text-[15.5px] leading-relaxed text-black/60">{description}</p>
        </div>

        <div className="flex flex-col items-start gap-6 sm:items-end">
          <div className="relative">
            <button
              type="button"
              onClick={handleClick}
              className="relative rounded-full bg-black px-8 py-4.5 text-[16px] font-semibold text-white transition-colors duration-100 select-none hover:bg-accent active:scale-95"
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

          <div className="flex flex-col items-start gap-1 sm:items-end">
            <span className="font-display text-[clamp(26px,3.2vw,38px)] font-extrabold tracking-[-0.025em] tabular-nums text-black">
              {count === null ? "—" : count.toLocaleString("nl-NL")}
            </span>
            <span className="text-[11px] font-semibold tracking-[0.14em] text-black/45 uppercase">
              Mensen die net als jij vastlopen
            </span>
          </div>
        </div>
      </div>

      {note ? (
        <p className="m-0 border-t border-black/10 pt-6 text-sm leading-relaxed text-black/55">{note}</p>
      ) : null}
    </div>
  );
}
