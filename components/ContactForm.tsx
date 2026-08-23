"use client";

import { useState } from "react";

export default function ContactForm() {
  const [verzonden, setVerzonden] = useState(false);
  const [form, setForm] = useState({ naam: "", bedrijf: "", email: "", bericht: "" });

  const set = (key: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm((f) => ({ ...f, [key]: e.target.value }));

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    setVerzonden(true);
  };

  return (
    <form onSubmit={submit} className="rounded-[28px] bg-sand p-8.5">
      {verzonden ? (
        <div className="flex flex-col gap-3.5">
          <p className="m-0 font-display text-[32px] font-extrabold tracking-[-0.04em] text-accent">
            Bericht staat erop.
          </p>
          <p className="m-0 text-[17px] leading-relaxed text-black/66">We reageren binnen één werkdag.</p>
        </div>
      ) : (
        <div className="flex flex-col gap-5">
          <label className="flex flex-col gap-2 text-xs font-semibold tracking-[0.12em] text-black/50 uppercase">
            Naam
            <input
              value={form.naam}
              onChange={set("naam")}
              placeholder="Je naam"
              className="rounded-xl border border-black/15 bg-white px-4 py-3.5 text-[17px] font-normal tracking-normal text-[#111] normal-case outline-none focus:border-accent"
            />
          </label>
          <label className="flex flex-col gap-2 text-xs font-semibold tracking-[0.12em] text-black/50 uppercase">
            Bedrijf (optioneel)
            <input
              value={form.bedrijf}
              onChange={set("bedrijf")}
              placeholder="Bedrijfsnaam"
              className="rounded-xl border border-black/15 bg-white px-4 py-3.5 text-[17px] font-normal tracking-normal text-[#111] normal-case outline-none focus:border-accent"
            />
          </label>
          <label className="flex flex-col gap-2 text-xs font-semibold tracking-[0.12em] text-black/50 uppercase">
            E-mail
            <input
              type="email"
              value={form.email}
              onChange={set("email")}
              placeholder="jij@voorbeeld.nl"
              className="rounded-xl border border-black/15 bg-white px-4 py-3.5 text-[17px] font-normal tracking-normal text-[#111] normal-case outline-none focus:border-accent"
            />
          </label>
          <label className="flex flex-col gap-2 text-xs font-semibold tracking-[0.12em] text-black/50 uppercase">
            Bericht
            <textarea
              value={form.bericht}
              onChange={set("bericht")}
              rows={4}
              placeholder="Waar kunnen we bij helpen?"
              className="resize-y rounded-xl border border-black/15 bg-white px-4 py-3.5 font-body text-[17px] font-normal tracking-normal text-[#111] normal-case outline-none focus:border-accent"
            />
          </label>
          <button
            type="submit"
            className="rounded-full bg-accent py-4 text-[17px] font-semibold text-white transition-colors hover:bg-black"
          >
            Versturen →
          </button>
        </div>
      )}
    </form>
  );
}
