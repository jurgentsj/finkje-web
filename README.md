# Finkje

Marketing site for Finkje — a Dutch platform that flips the job board: candidates say what
they want to become, employers respond to them instead of the other way around.

Implemented from a [Claude Design](https://claude.ai/design) prototype (`.dc.html`) as a
production Next.js + Tailwind CSS project, structured to import cleanly into
[v0.dev](https://v0.dev).

## Stack

- **Next.js 16** (App Router, TypeScript)
- **Tailwind CSS v4**
- Fonts: Bricolage Grotesque (display) + Instrument Sans (body), loaded via Google Fonts
- No backend — all forms (signup, contact, job posting) are client-side only with a
  local "success" state and no submission endpoint. Wire them up to your backend/API
  of choice before going live.

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

```bash
npm run build   # production build
npm run lint    # eslint
```

## Project structure

```
app/
  layout.tsx              Root layout: fonts, Header, Footer
  page.tsx                Home
  hoe-het-werkt/           "How it works"
  onze-visie/              "Our vision"
  contact/                 Contact + FAQ
  aanmelden/                4-step candidate signup form
  plaats-je-vacature/       Employer job-posting form
  mensen/                   Candidate directory (filters + expandable cards)
  voor-werkgevers/          Employer landing page
  algemene-voorwaarden/     Terms of service
  privacybeleid/            Privacy policy
  blog/                     Blog index
  [slug]/                   Individual blog article (13 posts, generateStaticParams)
components/                 Header, Footer, forms, FAQ accordion, photo carousel, etc.
lib/
  data.ts                   Candidate profiles, FAQ copy, step/benefit content
  blogs.ts                  All 13 blog posts (ported verbatim from the source bundle)
public/images/               Photography (extracted from the design bundle's asset store)
```

## Content notes

- All copy is in Dutch, ported verbatim from the original design.
- The accent color is `#FF5A00`, defined as a CSS variable (`--accent`) in
  `app/globals.css` and exposed to Tailwind as `bg-accent` / `text-accent` — change it in
  one place to re-theme the whole site.
- Candidate/job data in `lib/data.ts` is illustrative seed content from the design
  phase — swap in real data or an API before launch.

## Importing into v0.dev

This is a standard Next.js App Router project, so it can be imported directly:
push this repo to GitHub and use v0's "Import from GitHub" flow, or paste individual
files into a v0 chat to iterate on them further.
