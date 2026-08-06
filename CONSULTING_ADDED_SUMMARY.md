# Consulting Section Added — Summary

Branch: `add-consulting-services`, cut from `master` (which already contained the
merged `homepage-v2` work — verified before branching, so nothing is stacked on an
unmerged branch).

Feasibility Study has been reclassified from a Product to a Consulting engagement,
four new consulting offerings were added, and Educational Platform was created as a
new Product.

---

## Step 1 — Inspection findings

**How products are defined.** There is no data file or CMS. Products are defined
entirely in `messages/en.json` / `messages/ar.json`, and routes are hand-written
folders under `app/[locale]/`. Specifically:

- `productsPage.groups[]` drives the `/products` index — an array of category groups,
  each holding `{ name, value, href }` items rendered as cards.
- Each detail page is its own `app/[locale]/products/<slug>/page.tsx`, which is a thin
  ~25-line wrapper: it builds metadata from a `meta.*` namespace and renders the shared
  `components/ProductDetail.tsx` with a `productKey` naming its own top-level namespace.
- `ProductDetail.tsx` is the single template for every detail page (hero → scope →
  delivery → how-it-works → optional add-on → FAQ → CTA). Shared section labels came
  from `productsPage.detail`; the back link and `/products` target were hardcoded.
- The WhatsApp CTA pattern is `${LINKS.whatsapp}?text=${encodeURIComponent(t("whatsappText"))}`
  with `whatsappText` per namespace per locale. Reused exactly.

**Feasibility Study before the change.** Route `app/[locale]/products/feasibility-study/`,
namespace `feasibilityStudy`, metadata `meta.feasibilityStudy`, listed as the only item in
the `productsPage.groups` entry with id `business` (label "Business Products"). Full content:
6 scope lines, 4 how-it-works steps, 4 FAQs, delivery "7–10 business days", plus a WhatsApp
prefill. No add-on.

**Consulting.** No `/consulting` route, nav item, or message namespace existed anywhere.
The word appears only as prose in `app/[locale]/layout.tsx`, `schema.tsx` (`serviceType`
keywords), and the Work page's "ASCENDRA Consulting" pillar label — none of which are routes.

**Educational Platform.** Did not exist — no route, no namespace, no reference anywhere in
the codebase or either message file. Created from scratch (see judgment call #4).

**Footer.** Contains no navigation links at all — only the logo, tagline, four social
icons, email, and copyright. So "add Consulting wherever Products appears (header/footer)"
resolved to the header only. Nothing to change in `Footer.tsx`.

---

## Step 2 — Data structure

`consultingPage` was added as a direct parallel to `productsPage` in both message files:
`hero{label, headline, body1, body2, subLine}`, `cardCta`, `items[]`, and `detail{}`
section labels. Each of the five entries carries `name`, `value` (the one-line
description), and `href`; the detail copy lives in its own top-level namespace exactly
as products do.

`ProductDetail.tsx` was generalized rather than duplicated — two optional props were added:

| Prop | Default | Consulting pages pass |
|---|---|---|
| `labelsKey` | `"productsPage.detail"` | `"consultingPage.detail"` |
| `backHref` | `"/products"` | `"/consulting"` |

Existing product pages were not touched and render byte-identically.

---

## Routes added

| Route (EN / AR) | Namespace | Notes |
|---|---|---|
| `/consulting` · `/ar/consulting` | `consultingPage` | Index, lists all 5 |
| `/consulting/feasibility-study` | `feasibilityStudy` | **Moved**, content unchanged |
| `/consulting/business-digital-assessment` | `businessDigitalAssessment` | New |
| `/consulting/sales-process-optimization` | `salesProcessOptimization` | New |
| `/consulting/operations-design` | `operationsDesign` | New |
| `/consulting/growth-strategy-session` | `growthStrategySession` | New |
| `/products/educational-platform` | `educationalPlatform` | New product |

Route **deleted**: `app/[locale]/products/feasibility-study/page.tsx`.

All twelve new locale-routes plus `/products/educational-platform` were added to
`app/sitemap.ts`; the old feasibility path was removed. Sitemap is now 30 URLs.

## Redirect map

Added to `next.config.mjs` alongside the existing `/services` rules. Verified returning
**308** and resolving to a 200 in both locales.

| From | To | Type |
|---|---|---|
| `/products/feasibility-study` | `/consulting/feasibility-study` | 308 permanent |
| `/ar/products/feasibility-study` | `/ar/consulting/feasibility-study` | 308 permanent |

## Navigation

`nav.consulting` added to both message files ("Consulting" / "الاستشارات"), and a
`/consulting` link inserted into `Header.tsx` between Products and Work. Footer needed
no change (see inspection findings).

---

## Judgment calls

**1. The header overflowed and needed a breakpoint change.** This was a real bug
introduced by the seventh nav item, not a cosmetic preference. Measured with Playwright:
at 768px the nav bar's content was 928px wide against a 768px viewport, forcing horizontal
page scroll (also at 900px in EN, 768px in AR). The desktop nav now switches on at `lg`
(1024px) instead of `md`, with `gap-6 xl:gap-8` instead of `gap-8`. Tablets 768–1023px get
the hamburger menu, which was verified to open and contain all seven links. Re-measured at
390/768/900/1024/1280/1440 in both locales: no overflow anywhere.

**2. The "Business Products" group on `/products` became empty.** Feasibility Study was its
only item. Leaving a single group would have left the two-column grid half-empty, so the
groups were restructured into **Websites** (Personal Brand Website, Business Website) and
**Platforms** (Educational Platform). Group ids changed from `business`/`technology` to
`websites`/`platforms`. The old split was meaningless once the only non-technology product
left the section.

**3. The homepage feasibility card was repointed, not removed.** The brief anticipated a
possibly-empty slot. What I actually found: the "Featured Products" strip no longer exists —
it was removed in the `homepage-v2` work — so the only remaining reference was card 2 of
"Start From Your Need" ("Starting a project and need certainty before you spend? / A
certified feasibility study in 7–10 business days"), which pointed at `/products`. That copy
is still accurate and the card is a strong entry point, so I changed only its `href` to
`/consulting/feasibility-study` rather than deleting it — removing it would have broken the
2×2 grid. **No slot became empty, so Educational Platform was not added to the homepage.**

**4. All Educational Platform copy is mine and needs review.** The brief said to confirm or
add it but supplied no name, description, scope, or detail content — unlike the four
consulting entries, which came with exact copy. I wrote the full page (hero, 8 scope lines,
4 steps, 4 FAQs, CTA, WhatsApp prefill, metadata, and the index one-liner) on the same
template. **Treat every line of it as a draft.** It also uses the placeholder delivery time.

**5. "Fifth Product" doesn't add up, and I did not force it.** The brief calls Educational
Platform "a fifth Product". After Feasibility Study moves out, `/products` holds three:
Personal Brand Website, Business Website, Educational Platform. There were only three
products to begin with. Flagging in case a product you expected is missing.

**6. Arabic naming follows each section's existing convention.** Products keep English names
in the Arabic build ("Business Website", "Educational Platform") because that is what the
existing product entries do. The four new consulting entries use the Arabic names you
supplied. Feasibility Study therefore keeps its English name on the Arabic consulting index,
matching how it looked as a product — consistent with "move as-is".

**7. Consulting index uses a flat list, not groups.** `/products` renders two category
groups; five consulting engagements in one category do not need grouping. The card markup,
spacing, borders, and hover states are identical to the product cards, so the two index
pages read as the same page type.

**8. Two copy lines were adjusted for accuracy, not style.** `meta.products.description`
(both locales) listed "bankable feasibility studies" among the products — corrected to
websites and educational platforms. `productsPage.hero.subLine` promised "a document, a
website, a result" — "a document" referred to the feasibility study, now changed to
"a website, a platform, a result".

**9. Left alone deliberately.** `app/[locale]/schema.tsx` `serviceType` keywords already
cover consulting generically ("Business Consulting", "Operational Systems Design",
"Business Process Design", "Growth Consulting") but do not list "Feasibility Studies" or
"Educational Platforms". Adding them would improve structured-data accuracy but was outside
the brief — flagging as a small follow-up.

---

## ⚠️ Placeholders pending real numbers from Hosam

All four new consulting engagements **and** Educational Platform ship with:

- EN: `"Determined after an initial scoping call"`
- AR: `"يُحدَّد بعد جلسة تقييم أولية"`

No day counts were invented. Feasibility Study keeps its real, existing "7–10 business days".
These five `deliveryValue` keys are the ones to replace once you have real numbers:
`businessDigitalAssessment`, `salesProcessOptimization`, `operationsDesign`,
`growthStrategySession`, `educationalPlatform`.

The FAQs on the four new consulting pages are drafted to be safe — they describe process and
avoid pricing, guarantees, and durations — but they are my wording, not yours, and are worth
a read before this goes to production.

---

## Step 5 — Local verification

- `npx tsc --noEmit` — clean. (One transient error on the first run was a stale
  `.next/types/validator.ts` still referencing the deleted route; the build regenerated it
  and the re-run was clean.)
- `npm run build` — passes. 36 static pages generated, all new routes prerendered in both
  locales.
- Dev server: **all 30 locale-routes returned 200** (old and new, EN and AR).
- Redirects: both old feasibility URLs return **308** to the correct locale-matched target,
  resolving to 200.
- **Zero console errors and zero page errors** across 8 page/viewport combinations.
- Playwright screenshots: `/consulting` and `/consulting/business-digital-assessment`,
  EN + AR, desktop (1440) + mobile (390). RTL verified — cards flow right-to-left in the
  correct order, the gold `border-s-2` sits on the right edge, and the numbered
  how-it-works steps run 01→04 right-to-left.
- Computed-style measurement was used rather than eyeballing for the header overflow issue
  (see judgment call #1).
- Content integrity check: all **19 feasibility-study fields** (hero, 6 scope lines,
  4 steps, 4 FAQs, CTA, delivery) verified present **verbatim** in the rendered HTML at the
  new route, in both locales, plus the WhatsApp prefill. Nothing was rewritten.

## Preview

Stable branch alias (tracks the tip of `add-consulting-services`, updates on every push):

**https://asendrabyhosam-git-add-consul-59542b-drhosamhosny2026s-projects.vercel.app**

Vercel truncates long branch names into a hashed alias, so this is not the literal
`…-git-add-consulting-services-…` form you might expect.

Deployment confirmed Ready before this summary was finalized. Not merged to `master` —
production is untouched.
