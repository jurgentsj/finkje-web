import type { Metadata } from "next";
import { Fragment } from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { blogImage, blogs, getBlog } from "@/lib/blogs";

export function generateStaticParams() {
  return blogs.map((b) => ({ slug: b.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const blog = getBlog(slug);
  if (!blog) return {};
  return {
    title: blog.titel,
    description: blog.lead,
    alternates: { canonical: `/${blog.slug}` },
    openGraph: {
      type: "article",
      title: blog.titel,
      description: blog.lead,
      url: `https://finkje.nl/${blog.slug}`,
      images: [{ url: blogImage(blog.slug), alt: blog.titel }],
    },
  };
}

export default async function BlogPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const blog = getBlog(slug);
  if (!blog) notFound();

  const voorWerkgever = blog.voor === "werkgever";
  const andere = blogs.filter((b) => b.slug !== blog.slug).slice(0, 4);
  const inlineCta =
    blog.slug === "gratis-personeel-vinden"
      ? "Gratis personeel vinden zonder vacaturekosten of bureau →"
      : blog.slug === "nieuwe-medewerker-zonder-werkervaring"
        ? "Nieuwe medewerker aannemen zonder werkervaring? Zo werkt het →"
        : "Vind werk zonder vacatures →";

  return (
    <article className="mx-auto max-w-[780px] px-6 pt-18">
      <Link href="/blog" className="text-[15px] font-semibold text-black/55 hover:text-[#111]">
        ← Alle artikelen
      </Link>
      <p className="mt-7.5 mb-4 text-[11px] font-semibold tracking-[0.16em] text-accent uppercase">{blog.tag}</p>
      <h1 className="m-0 font-display text-[clamp(34px,5.6vw,68px)] leading-[0.94] font-extrabold tracking-[-0.05em]">
        {blog.titel}
      </h1>
      <p className="mt-6 text-[clamp(18px,2.1vw,23px)] leading-snug text-black/64">{blog.lead}</p>
      <p className="mt-5 text-sm text-black/42">{blog.datum}</p>

      <div className="relative mt-11 aspect-video w-full overflow-hidden rounded-3xl bg-black/5">
        <Image src={blogImage(blog.slug)} alt={blog.titel} fill sizes="780px" className="object-cover" />
      </div>

      <div className="mt-13 flex flex-col gap-10">
        {blog.secties.map((s, i) => (
          <Fragment key={s.kop}>
            <div className="flex flex-col gap-3.5">
              <h2 className="m-0 font-display text-[clamp(24px,3vw,34px)] leading-tight font-bold tracking-[-0.035em]">
                {s.kop}
              </h2>
              {s.tekst.map((p) => (
                <p key={p} className="m-0 text-lg leading-relaxed text-black/76">
                  {p}
                </p>
              ))}
            </div>
            {(blog.slug === "administratief-werk-zonder-diploma" ? i === 0 : i === 1) ? (
              <Link
                href="/aanmelden"
                className="self-start text-[15px] font-semibold text-accent underline decoration-accent/55 underline-offset-4 transition-colors hover:text-black"
              >
                {inlineCta}
              </Link>
            ) : null}
          </Fragment>
        ))}
      </div>

      {!voorWerkgever ? (
        <div className="mt-15 flex flex-col gap-4.5 rounded-3xl bg-sand p-8 sm:p-11">
          <h2 className="m-0 max-w-[20ch] font-display text-[clamp(24px,3vw,36px)] leading-none font-extrabold tracking-[-0.04em]">
            Vind werk met je motivatie
          </h2>
          <p className="m-0 max-w-[44ch] text-[17px] leading-snug text-black/66">
            Vertel ons wat je zoekt en laat werkgevers naar jou toe komen. Gratis, en anoniem tot jij ja zegt.
          </p>
          <div className="flex flex-wrap items-center gap-3">
            <Link
              href="/aanmelden"
              className="rounded-full bg-accent px-7.5 py-4 text-[17px] font-bold text-white transition-colors hover:bg-black"
            >
              Meld je gratis aan →
            </Link>
            <Link
              href="/hoe-het-werkt"
              className="rounded-full border border-black/15 px-5.5 py-4 text-base font-semibold text-[#111] transition-colors hover:bg-black/5"
            >
              Hoe het werkt
            </Link>
          </div>
        </div>
      ) : (
        <div className="mt-15 flex flex-col gap-4.5 rounded-3xl bg-black p-8 text-white sm:p-11">
          <h2 className="m-0 max-w-[22ch] font-display text-[clamp(24px,3vw,36px)] leading-none font-extrabold tracking-[-0.04em]">
            Bekijk wie jouw werk al wil doen.
          </h2>
          <p className="m-0 max-w-[46ch] text-[17px] leading-snug text-white/72">
            De profielen zijn vrij te bekijken, ook zonder vacature. Of plaats je vacature: die komt nergens
            openbaar en je hoort binnen één werkdag of we iemand hebben.
          </p>
          <div className="flex flex-wrap items-center gap-3">
            <Link
              href="/motivatiebrief"
              className="rounded-full bg-accent px-7.5 py-4 text-[17px] font-bold text-white transition-colors hover:bg-white hover:text-[#111]"
            >
              Plaats je vacature →
            </Link>
            <Link
              href="/mensen"
              className="rounded-full border border-white/28 px-5.5 py-4 text-base font-semibold text-white transition-colors hover:bg-white/10"
            >
              Bekijk de mensen
            </Link>
          </div>
        </div>
      )}

      <div className="mt-18 border-t border-black/10 pt-9 pb-24">
        <p className="m-0 mb-5 text-xs font-semibold tracking-[0.16em] text-black/42 uppercase">Meer lezen</p>
        <div className="flex flex-col">
          {andere.map((b) => (
            <Link
              key={b.slug}
              href={`/${b.slug}`}
              className="flex flex-col gap-1 border-t border-black/10 py-4.5 text-[#111] transition-opacity hover:opacity-60"
            >
              <span className="text-[11px] font-semibold tracking-[0.14em] text-accent uppercase">{b.tag}</span>
              <span className="font-display text-[19px] leading-tight font-bold tracking-[-0.03em]">{b.titel}</span>
            </Link>
          ))}
        </div>
      </div>
    </article>
  );
}
