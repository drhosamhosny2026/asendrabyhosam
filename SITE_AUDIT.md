# SITE AUDIT — ascendrabyhosam.com

**Date:** 2026-07-18 · **Scope:** read-only audit of the repository (no live-site crawling) · **Branch:** `master`
**Stack:** Next.js 15 (App Router) · React 19 · TypeScript · Tailwind CSS 3.4 · next-intl 3.26 · Vercel

---

## PRIORITY-ORDERED ISSUE LIST

### 🔴 Critical

| # | Issue | Where |
|---|-------|-------|
| C1 | **Language switcher always redirects to the homepage.** The switch link is hardcoded to `/${other}` (the other locale's root), so switching language from any inner page loses the user's place. This is the reported language-switching bug. | `components/Header.tsx:53`, `components/Header.tsx:109` |
| C2 | **Every internal English link triggers a middleware redirect.** `localePrefix: "as-needed"` serves English at unprefixed URLs (`/`, `/solutions`), but all internal links are built manually as `/${locale}/…` (`/en/solutions`), which next-intl redirects back to `/solutions` on every click. This causes URL flicker, redirect latency, split analytics, and inconsistent URLs in the wild. | `middleware.ts:7` vs. `components/Header.tsx:21-25`, `app/[locale]/page.tsx:69,75,115,211,223,247`, and every page's CTA links |
| C3 | **Every subpage's canonical URL points at the homepage, and hreflang only covers the homepage.** `generateMetadata` lives only in the locale layout and sets `canonical: ${SITE_URL}/${locale}` + `languages: {en: /en, ar: /ar}` for *all* routes. No page defines its own metadata, so `/en/solutions`, `/ar/work`, etc. all claim `/en` or `/ar` as canonical and share one title/description. Additionally `/en` itself 307-redirects to `/` (because of C2's prefix config), so the canonical/hreflang/sitemap URLs for English are all redirecting URLs. Search engines will treat inner pages as duplicates of the homepage. | `app/[locale]/layout.tsx:24-70` (no `generateMetadata` in any `app/[locale]/*/page.tsx`) |

### 🟠 High

| # | Issue | Where |
|---|-------|-------|
| H1 | **Arabic pages show large amounts of English content by design of the message files.** On `/ar/solutions`, all four system labels ("Foundation System", "Operations System", …) and all ~15 capability bullets ("CRM Systems", "Automation", "Dashboards", …) are English strings inside `ar.json`. Combined with English brand names this is the main driver of the "mixed AR/EN" complaint. 44 values in `ar.json` contain no Arabic at all (list in §1.6). | `messages/ar.json` → `solutionsPage.systems.*`, `coreSystems.items.*.name`, `selectedWork.items.*` |
| H2 | **~24 hardcoded bilingual ternaries bypass the translation system.** `locale === "ar" ? "…" : "…"` strings are embedded in JSX across 5 files (skip link, aria-labels, section headings, placeholder captions, case-study row labels, accordion footer note). They work today but violate the project convention ("ALL text lives in messages/") and will silently drift from the JSON copy. Full list in §1.6. | `components/Header.tsx` (7×), `app/[locale]/services/page.tsx` (7×), `app/[locale]/work/page.tsx` (6×), `app/[locale]/about/page.tsx` (1×), `app/[locale]/layout.tsx` (metadata, 2×) |
| H3 | **Sitemap lists only 2 URLs (the two homepages), one of which redirects.** `/solutions`, `/work`, `/about`, `/contact`, `/services` and all their `/ar` variants are missing; no `alternates.languages` hreflang entries; `lastModified: new Date()` changes on every build. | `app/sitemap.ts:5-10` |
| H4 | **Two overlapping service pages exist: `/solutions` (in nav) and `/services` (orphaned).** The nav links to Solutions, but About and Work pages still CTA-link to `/services`, which carries the old "Two Pillars" framing that commit `f6cc672` removed from the rest of the site. Users can land on contradictory positioning; the Products tab decision needs this resolved first. | `app/[locale]/services/page.tsx`; linked from `app/[locale]/about/page.tsx:251`, `app/[locale]/work/page.tsx:265` |

### 🟡 Medium

| # | Issue | Where |
|---|-------|-------|
| M1 | **`setRequestLocale` missing on Home and Solutions pages.** The layout calls it, but next-intl requires it in every page for static rendering; Work/About/Contact call it, Home and Solutions don't. Those two pages likely render dynamically on every request instead of being statically generated. | `app/[locale]/page.tsx`, `app/[locale]/solutions\page.tsx` (compare `app/[locale]/work/page.tsx:12`) |
| M2 | **Silent English fallback hides missing Arabic keys.** `i18n.ts` deep-merges `en.json` under `ar.json`, so any missing AR key renders English with no error. Good for resilience, but it converts translation gaps into invisible mixed-language content. Currently only `nav.services` is missing in AR — but there is no check to keep it that way. | `i18n.ts:23-30` |
| M3 | **Navigation labels/keys are misaligned.** The About link uses the `nav.insights` key (whose value is "About"/"من نحن"), and `nav.services` is dead in EN and absent in AR. Confusing for the upcoming nav change. | `components/Header.tsx:24`, `messages/en.json` (`nav`), `messages/ar.json` (`nav`) |
| M4 | **Route hrefs stored inside translation files.** `selectedWork.items[*].href` ("work") lives in both JSONs — routing data duplicated per locale that a translator could break. | `messages/en.json`, `messages/ar.json` → `selectedWork.items`; consumed at `app/[locale]/page.tsx:211` |
| M5 | **Six dead message namespaces** from the pre-rebuild homepage: `digital`, `bridge`, `capabilities`, `philosophy`, `team`, `approach` (~duplicated in both JSONs, inflating files that are already 40–52 KB). | `messages/en.json`, `messages/ar.json` |
| M6 | **Contact form is mailto-only.** Submit builds a `mailto:` link and immediately shows "sent" — nothing is actually sent if the visitor has no mail client (most mobile users). The email body labels ("Name:", "Phone:") are English regardless of locale. | `components/ContactForm.tsx:22-33` |

### 🟢 Low

| # | Issue | Where |
|---|-------|-------|
| L1 | WhatsApp button `aria-label="Chat on WhatsApp"` and the prefilled WhatsApp message are English for Arabic users. | `components/WhatsAppButton.tsx:10`, `config/links.ts:3` |
| L2 | Skip-link is pinned `left: 1rem` — not flipped in RTL. | `app/globals.css:27` |
| L3 | Organization JSON-LD schema is English-only and identical for both locales (no `inLanguage`, `description` EN). | `app/[locale]/schema.tsx` |
| L4 | Single shared OG image with English alt text for both locales. | `app/opengraph-image.tsx:3` |
| L5 | `nav` label for the switcher shows "عربي"/"EN" hardcoded (fine functionally, but another string outside messages). | `components/Header.tsx:56,114` |
| L6 | Directional arrows are handled with `locale === "ar" ? "←" : "→"` ternaries in 6+ places instead of a shared component/CSS transform. | `app/[locale]/page.tsx:119,215,227`, `app/[locale]/about/page.tsx:187`, etc. |

---

## 1. INTERNATIONALIZATION (i18n)

### 1.1 Implementation
- **Library:** `next-intl` v3.26 with the App Router plugin (`next.config.mjs` wraps config with `createNextIntlPlugin("./i18n.ts")`).
- **Config:** [i18n.ts](i18n.ts) — locales `["en", "ar"]`, default `en`. Request config loads `messages/{locale}.json`; for AR it **deep-merges English underneath Arabic** as a fallback (`i18n.ts:27-29`).
- **Middleware:** [middleware.ts](middleware.ts) — `createMiddleware({ locales, defaultLocale, localePrefix: "as-needed" })`.

### 1.2 Locale routing
- **Subpath routing** under a single `app/[locale]/` tree.
- Because of `localePrefix: "as-needed"`:
  - English (default) is canonical at **unprefixed** URLs: `/`, `/solutions`, `/work`…
  - Arabic is at `/ar`, `/ar/solutions`, …
  - Requests to `/en/...` are **redirected** by the middleware to the unprefixed path.
- The middleware also does locale detection (next-intl default: `NEXT_LOCALE` cookie, then `Accept-Language`) — a visitor with an Arabic browser hitting `/` gets redirected to `/ar`. This is standard behavior but interacts badly with C2: users bounce between prefixed and unprefixed URLs.
- **Conflict:** every component builds links manually as `` `/${locale}/...` `` using plain `next/link` instead of next-intl's locale-aware navigation APIs (`createNavigation` → `Link`, `usePathname`, `useRouter`). This is the root of issues C1 and C2.

### 1.3 Page-by-page language coverage

All 6 routes exist for **both** locales (one shared `[locale]` tree — nothing is single-language at the routing level). "Mixed" below means visible mixed-language content on the AR version.

| Route | EN | AR | Mixed-language content on AR page |
|---|---|---|---|
| `/` (Home) | ✅ | ✅ | Yes — `coreSystems` card names and `selectedWork` tiers/names are English (from `ar.json`) |
| `/solutions` | ✅ | ✅ | **Yes, heavily** — all 4 system labels + all capability bullets are English (`ar.json` → `solutionsPage.systems`) |
| `/work` | ✅ | ✅ | Partially — product/case names English (intentional branding); row labels come from JSX ternaries |
| `/about` | ✅ | ✅ | Minimal — founder-photo placeholder is a JSX ternary |
| `/contact` | ✅ | ✅ | Minimal — placeholders `your@company.com`, `+966 5X XXX XXXX`; mailto body always English |
| `/services` (orphaned) | ✅ | ✅ | Yes — section headings and footer notes are JSX ternaries; "ASCENDRA Digital/Consulting" labels hardcoded |

Note: much of the English on AR pages is *deliberate brand naming* (PharmacyOS, ASCENDRA Digital). The problem cases are generic taxonomy terms — "Foundation System", "CRM Systems", "Dashboards" — which read as untranslated content, not branding.

### 1.4 Language switcher
- Defined twice in [Header.tsx](components/Header.tsx) (desktop `:52-57`, mobile `:108-115`).
- `href={`/${other}`}` → **always navigates to the other locale's homepage.** It does not preserve the current path. There is no `usePathname` logic anywhere.
- Fix requires next-intl's `createNavigation()` (`Link` + `usePathname`) or a manual path-rewrite; see §4.2.

### 1.5 RTL/LTR handling — mostly correct ✅
- `dir` set correctly per locale on `<html>`: [layout.tsx:79-81](app/[locale]/layout.tsx:79).
- `lang` attribute correct.
- Arabic font (IBM Plex Sans Arabic) swapped in via `[dir="rtl"]` CSS overrides: [globals.css:82-86](app/globals.css:82).
- Logical properties used well throughout (`pe-8`, `border-s-2`, `ps-6`, `end-6`) — good RTL hygiene.
- Gaps: skip-link `left: 1rem` (L2); arrow-direction ternaries instead of a CSS/RTL-aware approach (L6).

### 1.6 Hardcoded strings (bypassing `messages/*.json`)

**JSX ternaries / literals containing user-facing copy:**
- [components/Header.tsx](components/Header.tsx) — lines 32 (skip link), 46, 56, 71-72, 92, 114 (aria-labels + switcher label)
- [app/[locale]/services/page.tsx](app/[locale]/services/page.tsx) — lines 45-46, 57, 60, 63-65, 79, 82, 85-87, 92-96 (section headings, intros, accordion footer, pillar labels)
- [app/[locale]/work/page.tsx](app/[locale]/work/page.tsx) — lines 57-59, 109, 114, 147-148, 173, 183-186 (placeholders, pillar labels, case-study row labels)
- [app/[locale]/about/page.tsx](app/[locale]/about/page.tsx) — line 151 (founder-photo placeholder)
- [app/[locale]/layout.tsx](app/[locale]/layout.tsx) — lines 30-36 (site title + description, bilingual but hardcoded in the file)
- [components/WhatsAppButton.tsx](components/WhatsAppButton.tsx) — line 10 (EN-only aria-label)
- [components/ContactForm.tsx](components/ContactForm.tsx) — lines 26-28 (EN-only mailto subject/body labels)

**English values inside `ar.json`** (44 total; the non-brand ones that read as untranslated): `coreSystems.items[0-3].name`, `solutionsPage.systems[*].label`, `solutionsPage.systems[*].capabilities[*]` (~15 strings), `selectedWork.items[*].tier/name`, `solutionsPage.hero.label` ("Solutions").

**Missing key:** `nav.services` exists in EN only (dead key — nav uses `nav.solutions`).

### 1.7 hreflang / per-locale SEO metadata
- hreflang **exists but only for the homepage pair** and is emitted identically on every page (`alternates.languages` in the layout) — inner pages have no self-referencing hreflang.
- Canonicals are wrong on all inner pages (C3).
- No per-page `generateMetadata` anywhere — all pages share one title/description per locale.
- `x-default` hreflang: missing.
- Sitemap: 2 URLs only, no alternates (H3). robots.txt is fine and points at `/sitemap.xml`.

---

## 2. SITE STRUCTURE

### 2.1 Route map

| Route | File | Purpose | Reachable from nav? |
|---|---|---|---|
| `/[locale]` | [app/[locale]/page.tsx](app/[locale]/page.tsx) | Home: Hero → Core Systems teaser → Why → Outcomes → Selected Work → CTA | ✅ |
| `/[locale]/solutions` | [app/[locale]/solutions/page.tsx](app/[locale]/solutions/page.tsx) | The 4 "systems" offering page (current positioning) | ✅ |
| `/[locale]/work` | [app/[locale]/work/page.tsx](app/[locale]/work/page.tsx) | Portfolio: PharmacyOS flagship, 2 case studies, 3 digital-presence projects | ✅ |
| `/[locale]/about` | [app/[locale]/about/page.tsx](app/[locale]/about/page.tsx) | Story, vision/mission, values, method, founder, network | ✅ (labeled "About", key `nav.insights`) |
| `/[locale]/contact` | [app/[locale]/contact/page.tsx](app/[locale]/contact/page.tsx) | Contact form + WhatsApp | ✅ |
| `/[locale]/services` | [app/[locale]/services/page.tsx](app/[locale]/services/page.tsx) | **Legacy** two-pillar services page (Digital/Consulting accordions) | ❌ orphan — only via CTAs on About & Work |
| `/sitemap.xml` | [app/sitemap.ts](app/sitemap.ts) | Sitemap (homepages only) | — |
| `/opengraph-image` | [app/opengraph-image.tsx](app/opengraph-image.tsx) | Shared OG image | — |

Supporting: [app/[locale]/schema.tsx](app/[locale]/schema.tsx) (JSON-LD, rendered in layout), [app/[locale]/layout.tsx](app/[locale]/layout.tsx) (fonts, dir, metadata, providers). No root `app/layout.tsx` (valid — all routes live under `[locale]`). No custom `not-found.tsx` (unknown locales call `notFound()` → default 404).

### 2.2 Navigation
- **Single source, shared across locales** ✅ — defined once as the `navLinks` array in [Header.tsx:20-26](components/Header.tsx:20); labels come from the `nav` namespace in both JSONs. Not duplicated per locale.
- Desktop and mobile menus map over the same array; adding a nav item = one array entry + 2 JSON keys.
- Footer ([components/Footer.tsx](components/Footer.tsx)) has no page links — only socials/email from [config/links.ts](config/links.ts).

### 2.3 Solutions / Services content structure
- **Solutions page: fully data-driven** ✅ — renders `solutionsPage.systems` (array of `{id, label, problem, system, capabilities[], outcome}`) from the message files via `sp.raw("systems")`; sections are generated in a single `.map()` ([solutions/page.tsx:102-167](app/[locale]/solutions/page.tsx:102)). Anchor nav is generated from the same array. Adding/removing a system is a JSON-only change.
- **Home teasers: data-driven** — `coreSystems.items`, `outcomes.items`, `selectedWork.items` arrays from messages.
- **Legacy services page: hybrid** — Digital accordion groups come from `servicesPage.digitalSection.groups` (data-driven), consulting items from `consulting.items`, but section headings/intros/footers are hardcoded JSX ternaries, and the two pillar labels are literal JSX.
- No CMS; all content lives in `messages/en.json` (40 KB) and `messages/ar.json` (52 KB). Effectively the message files double as a content database — workable at this size, but arrays like `systems` mix copy, routing ids, and structure in a translator-editable file.

---

## 3. CODE HEALTH (brief)

### 3.1 Versions & dependencies
| Package | Version | Note |
|---|---|---|
| next | ^15.5.4 | current major ✅ |
| react / react-dom | 19.0.0 | ✅ |
| next-intl | ^3.26.0 | v4 is out; v3 is fine, but migration would change `i18n.ts` conventions |
| tailwindcss | ^3.4.17 | v3 (v4 exists; no urgency) |
| typescript | ^5.7.2 | ✅ |
| @vercel/analytics | ^2.0.1 | **installed but never imported** — `<Analytics />` is not rendered anywhere; either wire it into the layout or drop the dependency |
| playwright | ^1.61.1 (dev) | present but **no test files or config in the repo** — dead weight or tests live elsewhere |

### 3.2 Component organization
- **Reusable & clean:** `Header`, `Footer`, `ContactForm`, `WhatsAppButton` — used consistently by every page. One shared `[locale]` tree means **zero AR/EN layout duplication** — the architecture is right; the problems are string-level, not structural.
- **Single-use:** `ServicesPillarNav`, `DigitalAccordion`, `ConsultingAccordion` serve only the legacy `/services` page — they leave with it if it's retired.
- **Copy-pasted:** the WhatsApp SVG path is duplicated verbatim in `Footer.tsx`, `WhatsAppButton.tsx`, and `contact/page.tsx` (~1 KB × 3). The apex-lines SVG background pattern is duplicated in Home and Solutions heroes (with a duplicate SVG `id="apex-lines"` if both ever render on one page). The final-CTA section is near-identical across 5 pages.
- **Inconsistent data-fetch pattern:** Home/Solutions use hook-style `useTranslations`/`useLocale` without `setRequestLocale`; Work/About/Contact use async `getTranslations` with it (M1). Pick one pattern.
- `archive/` holds pre-repositioning docs (fine, ignored by build). `.next`, `tsconfig.tsbuildinfo` are tracked/modified in git status — consider gitignoring build artifacts.

---

## 4. RECOMMENDATIONS

### 4.1 i18n problems ranked by user impact
1. **Switcher loses the current page (C1)** — every bilingual visitor hits this; it's the reported bug.
2. **English taxonomy strings across AR pages (H1)** — Arabic visitors see half-English pages on the most important sales page (`/ar/solutions`).
3. **EN link → redirect churn (C2)** — every English visitor's every click; invisible but constant, and it pollutes analytics and shared URLs.
4. **Canonical/hreflang/sitemap defects (C3, H3)** — hurts every visitor who *would have* arrived from search; inner pages are effectively invisible/duplicated for SEO.
5. **Hardcoded ternaries (H2)** — no visible breakage today, but each one is a future drift point and blocks clean translation workflows.
6. **Orphaned `/services` with stale positioning (H4)** — small traffic, big message-consistency risk.

### 4.2 Cleanest fix path for language switching
The canonical next-intl solution, in order (roughly a half-day of work):

1. **Adopt next-intl's navigation APIs.** Create `navigation.ts` exporting `createNavigation({locales, localePrefix})` → `{ Link, usePathname, useRouter, redirect }`. *(In next-intl v3 this also implies moving to the `routing.ts`/`defineRouting` pattern — a small, mechanical refactor of `i18n.ts` + `middleware.ts`.)*
2. **Replace `next/link` + manual `` `/${locale}/…` `` prefixes** with the new `Link` and locale-less hrefs (`/solutions`, `/work`, …) in `Header.tsx`, `Footer` (n/a), and all 6 pages. This kills the `/en/...` redirect churn (C2) automatically — the Link renders the correct per-locale URL.
3. **Fix the switcher** in `Header.tsx`: `const pathname = usePathname();` then `<Link href={pathname} locale={other}>` — preserves the current page in both desktop and mobile menus. (next-intl also sets the `NEXT_LOCALE` cookie on switch, so detection stays consistent.)
4. **Decide the prefix strategy.** Either keep `as-needed` (EN unprefixed — then also fix sitemap/hreflang to use `/` for EN), or switch to `localePrefix: "always"` for symmetric `/en` + `/ar` URLs (simpler mental model, one redirect from `/`). Symmetric URLs make hreflang/sitemap generation trivial; either is defensible — just make sitemap, canonicals, and actual URLs agree.
5. **SEO pass:** add per-page `generateMetadata` (title/description/canonical from a per-page namespace), expand `sitemap.ts` to all 6 routes × 2 locales with `alternates.languages` + `x-default`.
6. **Guardrail:** add a small script (CI or `npm run check:i18n`) that diffs key sets of `en.json`/`ar.json` and flags Latin-only AR values, so the deepMerge fallback (M2) can't hide regressions.

Then content fixes: translate the taxonomy strings in `ar.json` (H1 — decide deliberately which names stay English as branding), and move the ~24 JSX ternaries into the message files (H2).

### 4.3 Adding a "Products" section — difficulty: LOW ✅ (after prerequisites)

The architecture makes this genuinely easy:
- **New route:** `app/[locale]/products/page.tsx` — one file serves both locales automatically (mirror the `work/page.tsx` pattern: async + `setRequestLocale` + `getTranslations`).
- **Nav:** one entry in the `navLinks` array in `Header.tsx:20-26` + `nav.products` key in both JSONs.
- **Content:** add a `productsPage` namespace to both message files; follow the Solutions page's data-driven array pattern (`products: [{id, name, …}]`) so future products are JSON-only edits. PharmacyOS content can seed it from the existing `workPage.pharmacyOS` namespace.
- **SEO:** will inherit the broken canonical behavior (C3) unless per-page metadata lands first.

**Refactor first (in this order):**
1. **C1/C2 — navigation API migration.** Do this *before* adding the tab, or the new page inherits the redirect churn and the broken switcher, and every new link written the old way is one more file to migrate later.
2. **H4 — resolve `/solutions` vs `/services`.** "Products" as a third offering-ish tab next to two overlapping offering pages will confuse the IA. Recommended: fold anything still needed from `/services` into `/solutions`, retire `/services` with a redirect (Vercel/`next.config` redirect), retarget the two CTAs on About/Work, and delete `ServicesPillarNav` + the two accordions (or keep them for reuse on Products).
3. **C3/H3 — per-page metadata + full sitemap**, so Products launches indexable.
4. Nice-to-have alongside: rename `nav.insights` → `nav.about`, delete dead `nav.services` key and the 6 dead namespaces (M3/M5), extract a shared `WhatsAppIcon` and `FinalCta` component while touching those files anyway.

---

*Audit performed read-only; no source files were modified. This report (`SITE_AUDIT.md`) is the only file created.*
