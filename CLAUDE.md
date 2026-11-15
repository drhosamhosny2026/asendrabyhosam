# ASCENDRA by Hossam — Website Project

## What this is
The official website for ASCENDRA — an Integrated Business Solutions company (حلول أعمال متكاملة) in Riyadh, with three departments: Consulting, Digital Solutions, Marketing.
Built with Next.js 15 (App Router) + React 19 + TypeScript + Tailwind CSS + next-intl (bilingual EN/AR).

## Brand rules (NON-NEGOTIABLE — the logo is approved and locked)
- **Logo/Symbol**: use ONLY `/public/brand/ascend_symbol_gold.svg`. NEVER redraw, regenerate, or alter its geometry.
- **Colors**: Deep Navy `#0B1D33` · Emerald `#0F5B46` · Soft Gold `#D4AF37` · White `#FFFFFF` · Light Gray `#F0F2F4`. Gold is an ACCENT only — never large fills.
- **Typography**: Space Grotesk (Medium/Semibold/Bold) for wordmark + headings; IBM Plex Sans Arabic for all Arabic text; Inter for body/UI.
  - Wordmark letter-spacing: 0.12em (class `.wordmark`).
- **Category line**: EN "Integrated Business Solutions" / AR "حلول أعمال متكاملة" (shown under the wordmark)
- **Tagline**: "Built to Ascend." (used in both languages, set in LTR)
- **Voice**: Speaks as the company ("we"), never as a person; no founder or team names on the site. Plain, professional Modern Standard Arabic. No hype, no startup clichés, no durations or prices anywhere.

## Architecture
- `app/[locale]/layout.tsx` — locale-aware root layout, loads fonts, sets `dir` (rtl for ar).
- `app/[locale]/page.tsx` — homepage: Hero → Clients → What integrated means → Three departments → How we work → Contact.
- `app/[locale]/{consulting,digital,marketing}` — department pages, all rendered by `components/PillarPage.tsx`.
- `lib/services.ts` — departments and service ids (single source of truth). Adding a service = one id here + its text under `services.<dept>.items.<id>` in both message files; it then appears in the mega menu, the homepage card and the department page.
- `lib/work.ts` — portfolio entries for /work (text under `workPage.projects.<id>`).
- `components/` — Header, Footer (reusable).
- `messages/en.json` & `messages/ar.json` — ALL text lives here. Never hardcode copy in components.
- `i18n.ts`, `middleware.ts` — next-intl routing. Locales: en (default), ar.
- `public/brand/` — approved logo assets.

## How to run
```bash
npm install
npm run dev      # http://localhost:3000  (redirects to /en)
```
Arabic: visit /ar — layout auto-switches to RTL.

## Conventions
- All user-facing text goes through `useTranslations()` keys — add to BOTH en.json and ar.json.
- Keep sections as clearly separated blocks; one concern each.
- Tailwind utility classes; brand colors are registered (`bg-navy`, `text-gold`, etc.).
- Animations: use the `.rise` class with staggered `animationDelay` for load reveals. Keep motion subtle and executive.
- Mobile-first; test both LTR (en) and RTL (ar).

## Roadmap (build with Hossam, step by step)
1. [DONE] Scaffold + homepage sections + bilingual setup.
2. Polish Hero — add the apex-ray background pattern from the brand kit.
3. Build /services detail page (use the 3 sub-brands).
4. Build /work (portfolio) — case study cards + detail pages.
5. Build /insights (blog/thought leadership) — MDX or CMS.
6. Wire the contact form (e.g. Resend, Formspree, or an API route).
7. SEO: metadata per page, sitemap, OG images (use brand assets).
8. Deploy to Vercel.

## Notes for Claude Code
- When adding pages, mirror the `app/[locale]/` structure so both languages work.
- Before changing any logo or color, re-read the Brand rules above.
- The full brand kit (patterns, icons, presentation templates) lives in the separate ASCEND_Brand_Kit folder — pull assets from there as needed.
