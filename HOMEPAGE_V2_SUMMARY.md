# Homepage v2 — Summary

Branch: `homepage-v2`. The homepage is now exactly **5 sections**, ordered by visitor
intent instead of internal taxonomy. No other page, the navbar, the footer, design
tokens, or SEO infrastructure was touched.

---

## Sections — before → after

| # | v2 section | What happened |
|---|---|---|
| 1 | **Hero** | H1 + eyebrow untouched. New one-line subheadline. CTAs replaced: primary → `/solutions` ("Explore the Systems"), secondary → `/products` ("Browse Products"). The "Let's Talk / تحدّث معنا" hero button is gone (still in navbar + Section 5). |
| 2 | **Start From Your Need** *(new)* | Replaces the four system cards. 4 question/outcome/CTA cards in a responsive 2×2 grid (1 column on mobile). Cards 1–2 → `/products`, cards 3–4 → `/solutions`. |
| 3 | **Selected Work** | Moved up from position 5 to position 3. Component and content reused **as-is** — reorder only, zero content change. |
| 4 | **The systems problem** | Merger of the old "Why ASCENDRA" + "What Changes" sections into one. H2 kept, two paragraphs + blockquote replaced by a single 3-sentence body, outcome cards cut from six to three (Clarity / Efficiency / Scalability). |
| 5 | **Final CTA** | New heading + body. Buttons unchanged. WhatsApp prefill is now locale-aware. |

### Removed from the homepage (underlying pages untouched)
- **Featured Products strip** (Feasibility Study / Personal Brand Website / Business Website) — content still lives on `/products`.
- **Four system cards** (Foundation / Operations / Performance / Custom) — content still lives on `/solutions`, which renders them from its own `solutionsPage.systems` keys. No component was deleted.

---

## Message keys

All copy lives in `messages/en.json` and `messages/ar.json`. No locale ternaries in JSX
(the only `locale === "ar"` check left is the decorative arrow glyph `→`/`←`, which is
direction, not copy — the pre-existing pattern used across the site).

### Added
| Key | Notes |
|---|---|
| `startFromNeed.label` | Section eyebrow — "Where To Start" / "من أين تبدأ" |
| `startFromNeed.heading` | "Start from what you need." / "ابدأ من احتياجك." |
| `startFromNeed.items[0..3]` | Each: `question`, `answer`, `cta`, `href` |
| `hero.ctaPrimary` | "Explore the Systems" / "استكشف الأنظمة" |
| `insight.body` | The new 3-sentence body |
| `contactCta.whatsappText` | Per-locale WhatsApp prefill |

### Changed
- `hero.keyMessage` — new one-line subheadline.
- `hero.ctaSecondary` — was "Explore the Systems", now "Browse Products" / "المنتجات الجاهزة".
- `insight.headline` — see judgment call #1 below.
- `outcomes.items` — trimmed to three; Clarity and Efficiency wording updated to the specified text (EN Clarity, AR Clarity, AR Efficiency each changed slightly; EN Efficiency and both Scalability lines already matched).
- `contactCta.heading`, `contactCta.body` — new copy.

### Removed (verified unreferenced across the whole codebase before deleting)
- `coreSystems` (entire namespace) — the homepage four-card strip.
- `homeProducts` (entire namespace) — the homepage Featured Products strip.
- `hero.cta` — the removed "Let's Talk" hero button.
- `hero.subtext` — already orphaned; nothing rendered it.
- `insight.body1`, `body2`, `body3`, `emphasis1`, `emphasis2`, `emphasis3`,
  `digitalCardLabel`, `digitalCardBody`, `consultingCardLabel`, `consultingCardBody`.
- `outcomes.label`, `outcomes.title`, and the three dropped cards (Visibility, Better
  Decisions, Confidence).

---

## Judgment calls

1. **The Section 4 H2 was not actually unchanged in EN.** The brief said to keep the H2 as
   *"Most growing companies don't have a growth problem — they have a systems problem."*
   The file held *"Most growing businesses don't have a growth problem. They have a systems
   problem."* I used the brief's exact wording, since it was written out explicitly. The
   Arabic string in the brief matched the file exactly and is unchanged.

2. **CTA link labels in Section 2 weren't specified.** The brief gave each card a question,
   an outcome line, and a destination, but no link text. Used destination-consistent labels:
   "View the products" / "استعرض المنتجات" for cards 1–2, "Explore the systems" /
   "استكشف الأنظمة" for cards 3–4.

3. **Section 2 eyebrow label.** Every other section on the page has a small gold uppercase
   eyebrow. Added one ("Where To Start" / "من أين تبدأ") for visual consistency; it wasn't
   requested and is a one-line removal if unwanted.

4. **Merged Section 4 has one heading, not two.** Because "Why ASCENDRA" and "What Changes"
   became a single section, the old `outcomes.label` eyebrow and `outcomes.title` sub-heading
   were dropped rather than stacked under the kept H2. The three outcome cards now sit
   directly under the 3-sentence body. The "Why ASCENDRA" eyebrow was kept as the section's
   single label.

5. **`hero.trustLine` was kept.** The brief specified "exactly two CTA buttons" — the trust
   line is a caption, not a button, and wasn't mentioned, so it stays.

6. **WhatsApp prefill implementation.** `LINKS.whatsappMsg` is a hardcoded English URL shared
   by `/contact`, `/solutions`, and the floating WhatsApp button. Rather than change that
   shared constant (out of scope), the homepage now builds its own href from
   `contactCta.whatsappText` using the same pattern `components/ProductDetail.tsx` already
   uses. EN prefill is byte-identical to before; AR is the new text. The other three call
   sites are untouched.

7. **Pre-existing orphaned namespaces left in place.** `digital`, `bridge`, `capabilities`,
   `philosophy`, `team`, and `approach` are unreferenced anywhere in the codebase — leftovers
   from homepage versions predating this brief. They were not orphaned by *this* change, so
   removing them would have widened the scope. Flagging them here as safe deletion candidates
   for a follow-up.

8. **Section backgrounds** were re-alternated after the reorder (navy → white → light-gray →
   white → navy) so no two adjacent sections share a background. Uses existing tokens only.

---

## Verification

- `npx tsc --noEmit` — clean.
- `npm run build` — passes, all 14 routes prerendered.
- Both locales served from a production build and inspected:
  - EN renders `dir="ltr"`, AR renders `dir="rtl"`.
  - Section order confirmed: Hero → Start from what you need → Selected Work → systems problem → Final CTA.
  - All 12 homepage links resolve correctly and are locale-prefixed (`/solutions` on EN, `/ar/solutions` on AR). No broken or unprefixed hrefs.
  - Arrow glyphs flip to `←` under RTL; the 2×2 grid is direction-agnostic (Tailwind logical flow) and card CTAs use `self-start`, which resolves to the right edge in RTL.
  - AR WhatsApp URL decodes to "مرحبًا، أودّ بدء جلسة تقييم مع ASCENDRA."; EN decodes to the original "Hi, I'd like to start a business diagnosis with ASCENDRA."
  - No "Let's Talk", Featured Products, or four-system-card markup remains on the homepage.

## Note on the old branch

The brief said to delete any earlier `homepage-trim` branch. **No such branch existed**
locally or on the remote — nothing to delete. The only other branch present is
`fix/i18n-nav-seo-cleanup`, which is unrelated and was left alone.
