# FIXES DONE — i18n / navigation / SEO / translation cleanup

**Branch:** `fix/i18n-nav-seo-cleanup` (off `master`)
**Source of work:** [SITE_AUDIT.md](SITE_AUDIT.md)
**Verification:** `tsc --noEmit` → exit 0 · `npm run build` (clean `.next`) → exit 0 · all 10 locale page routes prerender to static HTML (SSG) · runtime checks per step below · adversarial multi-agent review passed (see "Post-review fix").

Each numbered step was implemented and the production build was run before moving on.

---

## Step 1 — Navigation migration (fixes the language switcher)

**What changed**
- **New [routing.ts](routing.ts)** — single source of truth via next-intl's `defineRouting` (`locales`, `defaultLocale: "en"`, `localePrefix: "as-needed"`), plus re-exported `locales`/`defaultLocale`/`Locale`.
- **New [navigation.ts](navigation.ts)** — `createNavigation(routing)` exporting locale-aware `Link`, `redirect`, `usePathname`, `useRouter`, `getPathname`.
- **[middleware.ts](middleware.ts)** — now `createMiddleware(routing)` (was inline config).
- **[i18n.ts](i18n.ts)** — request config now reads `routing.locales`/`routing.defaultLocale`.
- **[app/[locale]/layout.tsx](app/[locale]/layout.tsx)** — imports `routing`/`Locale` from `@/routing`; `notFound` guard + `generateStaticParams` use `routing.locales`.
- **[components/Header.tsx](components/Header.tsx)** — swapped `next/link` → `@/navigation` `Link`; nav hrefs are now locale-less (`/`, `/solutions`, `/work`, `/about`, `/contact`); the **language switcher uses `usePathname()` + `<Link href={pathname} locale={other}>`** so it preserves the current page instead of jumping home. Applied to both the desktop and mobile switchers.
- **[app/[locale]/page.tsx](app/[locale]/page.tsx), [solutions](app/[locale]/solutions/page.tsx), [work](app/[locale]/work/page.tsx), [about](app/[locale]/about/page.tsx)** — all internal `Link` hrefs migrated from `` `/${locale}/…` `` to locale-less paths via `@/navigation`. `solutions/page.tsx` no longer needs `useLocale` (removed).
- Contact page and Footer have no internal page links, so no `Link` migration was required there.

**Verified (production server)**
- `GET /solutions`, `/work` (EN) → **200 directly, no redirect** (fixes the redirect-churn issue C2).
- EN `/solutions` nav hrefs render unprefixed (`/`, `/about`, `/contact`, `/work`); switcher → `/ar/solutions`.
- On `/ar/solutions`, the switcher renders `/en/solutions`, which 307-redirects to the **EN solutions page** (not home). The one redirect is next-intl's intended mechanism for setting the `NEXT_LOCALE` cookie when switching to the unprefixed default locale; the page is preserved either way.

---

## Step 2 — Remove the orphaned /services page

**What changed**
- **Deleted** `app/[locale]/services/page.tsx` and its three exclusive components: `ServicesPillarNav.tsx`, `DigitalAccordion.tsx`, `ConsultingAccordion.tsx` (grep-confirmed used only by the services page).
- **Deleted message keys** in both `messages/en.json` and `messages/ar.json`: the `servicesPage` namespace and the `consulting` namespace (the latter was consumed only by the services page). Removed `nav.services` from `en.json` (dead EN-only key; also satisfies the step-4 note about it).
- **Repointed CTAs**: the "See What We Build" / "Explore the Systems" secondary CTAs on **About** and **Work** now link to `/solutions` (were `/services`).
- **[next.config.mjs](next.config.mjs)** — added permanent (308) redirects: `/services → /solutions` and `/ar/services → /ar/solutions`.

**Verified (production server, curl)**
- `/services` → `308` → `location: /solutions`
- `/ar/services` → `308` → `location: /ar/solutions`
- Build now emits 16 pages (services routes gone).

---

## Step 3 — SEO repair

**What changed**
- **New [lib/seo.ts](lib/seo.ts)** — `SITE_URL`, `pageUrls(path)` (locale-correct absolute URLs respecting `as-needed`: EN unprefixed, AR under `/ar`), and `buildPageMetadata({locale, path, title, description, absoluteTitle})` returning per-page `metadataBase`, `title`, `description`, `alternates` (canonical + `en`/`ar`/`x-default` hreflang), and matching `openGraph`/`twitter`.
- **New `meta` namespace** in both message files — unique `title` + `description` per page (`home`, `solutions`, `work`, `about`, `contact`), in EN and AR.
- **Per-page `generateMetadata`** added to all five pages (`page.tsx`, `solutions`, `work`, `about`, `contact`), pulling copy from `meta.*` via `getTranslations` and delegating to `buildPageMetadata`. Home uses an absolute title; inner pages get the `"%s | ASCENDRA"` template.
- **[layout.tsx](app/[locale]/layout.tsx)** — removed the incorrect homepage-only `alternates` (`canonical: /${locale}`, `languages: {en:/en}`) that had been applied to every route; layout now provides only site-wide defaults (metadataBase, title template/default, description, icons, OG/Twitter defaults). Imports `SITE_URL` from `@/lib/seo`.
- **[app/sitemap.ts](app/sitemap.ts)** — rebuilt to emit all 5 routes × 2 locales (10 URLs) with correct as-needed URLs and per-entry hreflang `alternates`. Dropped `lastModified: new Date()` (it changed every build).

**Verified (production server)**
- EN `/solutions`: canonical `…/solutions`; hreflang en=`…/solutions`, ar=`…/ar/solutions`, x-default=`…/solutions`; og:url/title/locale correct.
- AR `/work`: canonical `…/ar/work`; hreflang en=`…/work` (correctly **unprefixed**), ar=`…/ar/work`, x-default=`…/work`.
- `sitemap.xml`: 10 URLs, EN unprefixed / AR under `/ar`, no `/services`, no redirecting URLs, hreflang alternates on every entry.

---

## Step 4 — Translation cleanup (`messages/ar.json`) + ternaries + i18n fallback

**What changed**
- **Translated all `solutionsPage.systems[*].capabilities` bullets** in `ar.json` (17 strings) using the specified conventions:
  - Kept English (product/system names): the four `*.label` system names, `PharmacyOS`, `ASCENDRA` — unchanged.
  - Bilingual technical terms: `أنظمة إدارة العملاء (CRM)`, `أنظمة تخطيط الموارد (ERP)`, `لوحات المتابعة (Dashboards)`.
  - Pure Arabic: `تصميم العمليات`, `تحسين العمليات`, `التميّز التشغيلي`, `المواقع الاحترافية`, `الهوية والعلامة التجارية`, `الأتمتة`, `تصميم مؤشرات الأداء`, `التقارير والتحليلات`, `تخطيط النمو`, `رؤى مدعومة بالذكاء الاصطناعي`, `منصات مخصّصة`, `حلول قطاعية`.
  - Also translated the `solutionsPage.hero.label` eyebrow `"Solutions"` → `"الحلول"` (aligns with `nav.solutions`; was flagged in the audit as mixed content).
- **Moved the hardcoded `locale === "ar" ? … : …` copy ternaries into the message files** and consumed them via translation keys:
  - Header (`nav.*`): `skip`, `primaryNav`, `mobileNav`, `openMenu`, `closeMenu`, `switchLabel`.
  - Work (`workPage.*`): `pharmacyOS.screenshotsSoon`, `caseStudies.imageSoon`, `caseStudies.{challenge,approach,built,outcome}Label`.
  - About (`aboutPage.founder.photoPlaceholder`).
  - The services-page ternaries were eliminated with that page in step 2 (not migrated).
- **[i18n.ts](i18n.ts)** — replaced the silent deepMerge fallback: it still merges English underneath the target locale (so the UI never renders a raw key), but in **development** it now `console.warn`s the exact list of missing keys via a `findMissingKeys` helper.

**Verified**
- EN/AR key parity: **227 leaf keys each, 0 missing on either side**.
- `/ar/solutions` (production) renders all translated capabilities; **no English capability strings leak**; eyebrow shows `الحلول`.
- Dev mode: `GET /ar/solutions` → 200, no i18n warning (parity complete = silent, as intended). The `findMissingKeys` logic was unit-tested in isolation: returns `[]` for the real files and correctly returns `["nav.contact","solutionsPage.hero.label"]` for a deliberately-broken locale.

---

## Decisions made (not fully specified in the request)

1. **`consulting` namespace deleted too.** Step 2 said delete the services page "and its message keys." `consulting` was consumed *only* by the services page, so it was dead after removal — deleted from both files. (Recoverable from git if a future Products/Services page needs it.)
2. **Three accordion/nav components deleted.** `ServicesPillarNav`, `DigitalAccordion`, `ConsultingAccordion` were used only by the services page. Deleted to avoid dead code; recoverable from git if reused for the planned Products tab.
3. **`i18n.ts` dev-warning landed during step 1, not step 4.** Touching `i18n.ts` for the routing wiring surfaced a *latent* type error (the `deepMerge` result — `Record<string, unknown>` — was never assignable to next-intl's `AbstractIntlMessages`; the original build had only passed because of stale incremental type-check cache). Fixing it cleanly meant writing the final function, so the step-4d dev-warning + an `AbstractIntlMessages` cast were applied then. Behaviorally it is exactly the step-4 requirement.
4. **`localePrefix` kept as `as-needed`** (EN unprefixed, AR `/ar`). All canonical/hreflang/sitemap URLs were made to respect this so no sitemap or canonical points at a redirecting URL. The AR→EN switch therefore incurs one 307 (`/en/… → /…`); this is standard next-intl behavior and also sets the locale cookie.
5. **`meta` namespace for SEO copy** (rather than a hardcoded map in `lib/seo.ts`) — keeps the project's "all user-facing text lives in `messages/`" convention, since titles/descriptions are user-facing.
6. **`PharmacyOS (Flagship Business System)` capability** → `PharmacyOS (نظام الأعمال الرائد)` and **`Digital Infrastructure`** → `البنية التحتية الرقمية`. Neither was in the provided keep-English or translate lists; the product name was preserved and the descriptive parts translated in the same spirit as the rest.
7. **Directional arrows left as-is.** The `locale === "ar" ? "←" : "→"` glyphs in `aria-hidden` spans (home + about) are audit item **L6**, separate from the "~24 copy ternaries" of step 4; they are decorative, already locale-correct, and moving bare glyphs into translation files isn't meaningful localization. The only other remaining `locale === "ar"` expressions are pure logic (`other` locale, `dir` attribute).

## Post-review fix (adversarial multi-agent review)

After completing steps 1–5, an adversarial review (5 reviewers × per-finding verification) was run over the whole diff.
It surfaced **2 confirmed findings, 0 false positives** — both the same real defect, and both were fixed:

- **Home ([app/[locale]/page.tsx](app/[locale]/page.tsx)) and Solutions ([app/[locale]/solutions/page.tsx](app/[locale]/solutions/page.tsx)) were NOT actually being statically generated.** They were synchronous Server Components using `useTranslations()`/`useLocale()` without calling `setRequestLocale(locale)`. In next-intl 3.x that makes the server hooks read `headers()`, which opts the route out of static rendering — so the site's two most important pages (homepage + primary conversion page) were server-rendered on every request. The build route table misleadingly showed `●` for them, but the `.next/prerender-manifest.json` and emitted HTML proved otherwise (no `/en`, `/ar`, `/en/solutions`, `/ar/solutions` prerendered). This is exactly audit item **M1**, which I had deferred; the review's `.next` forensics confirmed it, so I fixed it rather than just correcting the claim.
- **Fix:** converted both pages to the same pattern the other three pages already use — `async` component, `await params`, `setRequestLocale(locale)`, and `getTranslations` instead of `useTranslations`/`useLocale`.
- **Verified after fix:** clean rebuild prerenders all 10 locale page routes (manifest now lists `/en`, `/ar`, `/en/solutions`, `/ar/solutions`, …; `en.html`/`ar.html`/`solutions.html` emitted). Runtime: `GET /` returns `x-nextjs-prerender: 1,1` and `cache-control: s-maxage=31536000` (static + CDN-cached), with home title/canonical/hreflang and AR solutions translations all intact.

## Out of scope (noted, not changed)
- Pre-existing dead message namespaces from before this work — `digital`, `bridge`, `capabilities`, `philosophy`, `team`, `approach` (audit M5) — were left untouched; they weren't part of the services-page removal.
- Low-priority audit items not in the five steps: WhatsApp button English aria-label (L1), skip-link RTL position (L2), English-only JSON-LD (L3), single shared OG image (L4), decorative arrows (L6), mailto-only contact form (M6).
