"use client";

import { useState } from "react";

type Item = { vraag: string; antwoord: string };

export default function Faq({ items }: { items: Item[] }) {
  const [open, setOpen] = useState(0);

  return (
    <div className="flex flex-col gap-2">
      {items.map((q, i) => {
        const isOpen = open === i;
        return (
          <div
            key={q.vraag}
            className={`overflow-hidden rounded-[20px] border transition-colors ${
              isOpen ? "border-black/15 bg-sand" : "border-black/10 bg-white"
            }`}
          >
            <button
              type="button"
              onClick={() => setOpen(isOpen ? -1 : i)}
              className="flex w-full items-center justify-between gap-6 px-7 py-6 text-left font-display text-[26px] font-medium tracking-[-0.045em] text-[#111]"
            >
              <span
                className={
                  q.vraag === "Zie ik namen en cv’s?" ||
                  q.vraag === "Waarom komt mijn vacature niet online?" ||
                  q.vraag === "Werkt dit ook voor ervaren functies?"
                    ? "font-medium"
                    : undefined
                }
              >
                {q.vraag}
              </span>
              <span
                className={`shrink-0 text-[28px] leading-none text-accent transition-transform duration-200 ${
                  isOpen ? "rotate-45" : ""
                }`}
              >
                +
              </span>
            </button>
            {isOpen && (
              <p className="m-0 max-w-[66ch] px-7 pb-7 text-[16px] leading-relaxed text-black/70">
                {q.antwoord}
              </p>
            )}
          </div>
        );
      })}
    </div>
  );
}
