import type { Metadata } from "next";
import ContactForm from "@/components/ContactForm";
import Faq from "@/components/Faq";
import { faqData } from "@/lib/data";

export const metadata: Metadata = {
  title: "Contact & vragen",
  description: "Stuur ons een appje of een mailtje, we reageren binnen één werkdag.",
};

export default function ContactPage() {
  return (
    <>
      <section className="mx-auto grid max-w-[1200px] grid-cols-[repeat(auto-fit,minmax(min(100%,300px),1fr))] items-start gap-14 px-6 pt-20">
        <div>
          <p className="m-0 mb-5.5 text-xs font-semibold tracking-[0.16em] text-accent uppercase">Contact</p>
          <h1 className="m-0 font-display text-[clamp(42px,8vw,70px)] leading-[0.9] font-medium tracking-[-0.071em]">
            Even praten over wat je wil.
          </h1>
          <p className="mt-7 max-w-[40ch] text-[20px] leading-relaxed text-black/64">
            Stuur ons een appje of een mailtje, we reageren binnen één werkdag.
          </p>
          <div className="mt-10 flex flex-col gap-5">
            <div className="flex flex-col gap-1">
              <span className="text-xs tracking-[0.14em] text-black/45 uppercase">Mail</span>
              <a href="mailto:contact@finkje.nl" className="text-xl font-semibold text-[#111]">
                contact@finkje.nl
              </a>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-xs tracking-[0.14em] text-black/45 uppercase">WhatsApp</span>
              <a
                href="https://wa.me/31108906696"
                target="_blank"
                rel="noopener"
                className="text-xl font-semibold text-[#111]"
              >
                010 890 66 96
              </a>
            </div>
          </div>
        </div>
        <ContactForm />
      </section>

      <section className="mx-auto max-w-[1100px] px-6 pt-24 pb-28">
        <h2 className="m-0 mb-13 font-display text-[clamp(40px,8vw,110px)] leading-[0.88] font-extrabold tracking-[-0.05em]">
          Veelgestelde vragen
        </h2>
        <Faq items={faqData} />
      </section>
    </>
  );
}
