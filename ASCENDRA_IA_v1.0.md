# ASCENDRA INFORMATION ARCHITECTURE v1.0
### Website Structure — Based on ASCENDRA_MASTER_BRIEF_v2.0

**Status:** Active · **Version:** 1.0 · **Owner:** Hossam H. Emam, Founder & Managing Director
**Source of Truth:** ASCENDRA_MASTER_BRIEF_v2.0.md

---

## SECTION 1 — FULL SITEMAP

```
ascendrabyhosam.com
│
├── / ──────────────────── redirects to /en (or /ar via browser language detection)
│
├── /en/
│   ├── (root)             Home
│   ├── /about             About ASCENDRA
│   ├── /services          Services — Digital & Consulting
│   ├── /work              Work — Portfolio
│   └── /contact           Contact
│
├── /ar/
│   ├── (root)             الرئيسية
│   ├── /about             عنّا
│   ├── /services          الخدمات
│   ├── /work              أعمالنا
│   └── /contact           تواصل معنا
│
└── System
    ├── /sitemap.xml       10 URLs (5 pages × 2 locales)
    └── /robots.txt
```

**Total indexable URLs:** 10
**Total pages:** 5
**Languages:** English (LTR) · Arabic MSA (RTL)

---

## SECTION 2 — NAVIGATION STRUCTURE

### 2.1 Primary Navigation (Header)

Present on all pages. Sticky on scroll.

```
[ASCENDRA logo + wordmark]          [Services]  [Work]  [About]  [Let's Talk ▶]  [EN | AR]
```

| Item | Label EN | Label AR | Destination | Type |
|---|---|---|---|---|
| Logo | — | — | /home | Brand link |
| Services | Services | الخدمات | /services | Page link |
| Work | Work | أعمالنا | /work | Page link |
| About | About | عنّا | /about | Page link |
| CTA | Let's Talk | تحدّث معنا | /contact | Primary CTA button |
| Language | EN / AR | EN / AR | Toggle locale | Locale switcher |

**Active state:** Current page link is highlighted (gold underline or color change).
**CTA button:** Gold background, navy text — distinct from nav links.

---

### 2.2 Mobile Navigation

Hamburger icon (right side, LTR · left side, RTL) opens a full-width drawer.

```
Drawer:
  ASCENDRA [close ✕]
  ─────────────────
  Services
  Work
  About
  ─────────────────
  Let's Talk →
  ─────────────────
  EN | AR
```

Tap outside or close button dismisses. Links close the drawer on selection.

---

### 2.3 Footer Navigation

```
Column 1 — Brand          Column 2 — Pages           Column 3 — Connect
ASCENDRA by Hossam        Home                       Instagram
Built to Ascend.          Services                   LinkedIn
                          Work                       Facebook
                          About                      WhatsApp
                          Contact

Bottom bar: © 2025 ASCENDRA. All rights reserved. · ascendrabyhosam.com
```

---

### 2.4 In-Page Anchor Navigation

Used only on long pages (About, Services) to allow jump-navigation within the page.

**About page anchors:**
`#story` · `#vision-mission` · `#values` · `#method` · `#founder` · `#network`

**Services page anchors:**
`#digital` · `#consulting` · `#capabilities`

---

## SECTION 3 — PAGE HIERARCHY

```
Level 0 — Domain Root
└── ascendrabyhosam.com

Level 1 — Primary Pages (all equal weight)
├── Home            — Entry point, brand, problem, proof
├── About           — Who, how, why ASCENDRA exists
├── Services        — What ASCENDRA builds and delivers
├── Work            — Portfolio evidence
└── Contact         — Conversion

No Level 2 sub-pages exist in this version.
All pages are top-level. No parent-child relationships.
```

**Hierarchy note:** Home is the entry point, not the parent. All five pages are siblings. The relationship between them is defined by user journey (Section 4), not structural hierarchy.

---

## SECTION 4 — USER JOURNEY

### 4.1 The 5-Second Test

Within 5 seconds of landing on any page, a first-time visitor must be able to answer:

1. **What does ASCENDRA do?** → Digital Systems & Business Consulting
2. **Who does ASCENDRA serve?** → SMEs and growing companies in Saudi Arabia & the GCC
3. **Why is ASCENDRA different?** → Builds both the digital layer and the operational foundation — together
4. **How do I contact ASCENDRA?** → "Let's Talk" — visible in the top-right corner on every page

These four answers are delivered by the Hero section of every page — not just Home.

---

### 4.2 Primary User Journeys

#### Journey A — Brand-Aware Visitor
*The visitor knows ASCENDRA or was referred by someone.*

```
Entry: Home (Hero)
↓
Confirms: "Yes, this is what I need"
↓
Reviews: Work (social proof)
↓
Reads: About (trust-building — method, founder)
↓
Converts: Contact
```

**Conversion driver:** Trust. They arrived willing — the site must not lose them.

---

#### Journey B — Problem-Aware Visitor
*The visitor has a specific problem (no CRM, broken process, outdated site) and is evaluating options.*

```
Entry: Home (The Problem section)
↓
Recognition: "This is exactly my situation"
↓
Explores: Services (what specifically gets built)
↓
Validates: Work (has ASCENDRA solved this before?)
↓
Converts: Contact
```

**Conversion driver:** Specificity. The more precisely ASCENDRA names their problem, the faster they move.

---

#### Journey C — Portfolio-First Visitor
*The visitor was linked to a specific project or found the Work page through search.*

```
Entry: Work (specific project)
↓
Explores: Other projects in the same tier
↓
Asks: "Who built this?" → About
↓
Asks: "What else can they do?" → Services
↓
Converts: Contact
```

**Conversion driver:** Evidence. The work must stand on its own — no need to read the whole site.

---

#### Journey D — Arabic-Language Visitor
*The visitor navigates to /ar — same journeys as above, same page structure, RTL layout.*

All journeys mirror A, B, C above. Arabic copy is native MSA — not translated. The experience must feel identical in depth and quality.

---

### 4.3 Drop-Off Points to Defend

| Point | Risk | Defense |
|---|---|---|
| Hero | Unclear positioning — visitor bounces | One declarative headline, no ambiguity |
| Services | Feels like a service catalogue — not a partner | Frame around the client's problem, not a feature list |
| Work | Projects look thin without context | Every entry has at minimum: what it was, why it was built |
| Contact | Form friction — visitor abandons | Short form, WhatsApp as alternative, reassurance list |

---

## SECTION 5 — HOME PAGE STRUCTURE

**Purpose:** Brand introduction. The problem. The two pillars. Why ASCENDRA exists. Drive to Contact.

**Principle:** Every visitor who reads Home should feel described by it — not sold to.

---

### 5.1 Hero Section

**Position:** First viewport. Full height. No scroll required to see CTA.

**Content:**
```
[Eyebrow label]      BUILT TO ASCEND.

[H1 Headline]        We Build the Digital Systems
                     Your Business Needs to
                     Operate and Grow.

[Sub-headline]       Digital products, built on real operational consulting.
                     Two pillars. One system.

[Body]               Websites · CRM · ERP · Dashboards · Automation · AI ·
                     Branding · Process Design · KPI Systems · Growth Planning

[Trust line]         Business Transformation · Riyadh, KSA

[CTAs]               [Let's Talk →]    [See What We Build]
```

**5-second guarantee:** All four required answers (what, who, why, how) are legible in the hero alone.

---

### 5.2 The Problem — Bridge Section

**Purpose:** Make the visitor feel seen before selling anything.

**Content:**
```
[Statement]          Most businesses have a digital gap —
                     and a deeper systems problem behind it.

[Two-line summary]
  ASCENDRA Digital   builds the digital products your business runs on.
  ASCENDRA Consulting builds the systems that help it grow steadily.
```

**No CTA here.** This section exists only to create recognition.

---

### 5.3 ASCENDRA Digital — Service Overview

**Purpose:** Show the scope of what gets built.

**Content:**
```
[Eyebrow]            ASCENDRA Digital
[H2]                 What We Build.
[Subtitle]           Digital solutions designed around your business goals —
                     built, delivered, and measured.

[Three service groups — card layout]
  Websites & E-Commerce    CRM & ERP Systems    Automation, Dashboards & AI
  [description]            [description]        [description]
  [4 item list]            [4 item list]        [4 item list]
```

---

### 5.4 ASCENDRA Consulting — Service Overview

**Purpose:** Show the operational depth that differentiates ASCENDRA from a digital agency.

**Content:**
```
[Eyebrow]            ASCENDRA Consulting
[H2]                 Business Consulting.
[Subtitle]           The operational foundation beneath every digital system we build.

[Six consulting service items — list/card layout]
  Business Analysis · Data Analysis · Process Design ·
  KPI Systems · Operations Improvement · Growth Consulting
  [Each with one-sentence description]
```

---

### 5.5 Why ASCENDRA — The Insight Section

**Purpose:** Name the exact scenario the ideal client is living through.

**Content:**
```
[Eyebrow]            Why ASCENDRA

[H2]                 Most businesses have the ambition to grow.
                     They are missing the digital foundation to do it.

[Body — two paragraphs]
  P1: The pattern at plateau — outdated website, no CRM, spreadsheet reports,
      founder is the only person who knows where anything stands.

  P2: The instinct is to push harder or hire more people. The constraint is
      rarely talent. It is the absence of digital infrastructure.

[Emphasis lines]
  "The solution is rarely more effort."
  "It is better systems."
  "Systems that create clarity, improve execution, and make growth repeatable."

[Body]               ASCENDRA starts with the digital project —
                     website, CRM, ERP, automation, or AI — and builds
                     the operational foundation that makes it work.

[Two-pillar cards]
  ASCENDRA Digital ——————————  ASCENDRA Consulting
  [card body]                  [card body]
```

---

### 5.6 The ASCENDRA Method — Abbreviated

**Purpose:** Prove there is a structured methodology behind every engagement.
**Full version lives on: /about#method**

**Content:**
```
[Eyebrow]            Transformation Approach
[H2]                 The ASCENDRA System

[Five-step horizontal or vertical sequence]
  01 Assess     02 Design     03 Build     04 Measure     05 Scale
  [one-line desc per step]

[Link]               → See the full methodology on the About page
```

---

### 5.7 Business Outcomes

**Purpose:** Name what changes — not what gets delivered.

**Content:**
```
[Eyebrow]            Business Outcomes
[H2]                 What changes after ASCENDRA.

[Four outcome metrics]
  ↑ Operational Clarity
  ↑ Leadership Bandwidth
  ↑ Execution Velocity
  ↑ Scalable Growth
  [Each with one-sentence description]
```

---

### 5.8 Conviction — Philosophy Statement

**Purpose:** One sentence that embeds the worldview.

**Content:**
```
[Pullquote / centered statement]
  "Most businesses don't fail because of bad ideas.
  They fail because the systems needed to execute those ideas were never built."
```

No CTA. No attribution. The sentence stands alone.

---

### 5.9 Contact CTA — Inline Prompt

**Purpose:** Convert visitors who are ready after reading Home. Do not require them to scroll back up.

**Content:**
```
[Eyebrow]            Start Your Transformation
[H2]                 Tell us where your business is today.

[Body]               We will identify the gap and build the path forward.

[CTA]                [Let's Talk →]

[Secondary]          Or reach us directly on WhatsApp
```

**Links to:** /contact

---

### 5.10 Home Page Section Order

```
1   Hero
2   The Problem (Bridge)
3   ASCENDRA Digital
4   ASCENDRA Consulting
5   Why ASCENDRA
6   The ASCENDRA Method (abbreviated)
7   Business Outcomes
8   Conviction Statement
9   Contact CTA
```

---

## SECTION 6 — ABOUT PAGE STRUCTURE

**Purpose:** Depth page. Answers: Who is behind ASCENDRA and how does it work?
**Primary audience:** Visitors who have already decided ASCENDRA is relevant — now building trust.

---

### 6.1 Page Hero

```
[Eyebrow]            About ASCENDRA
[H1]                 Built by practitioners, not advisors.

[Sub-headline]       Over seven years of building scalable systems,
                     digital infrastructure, and operational frameworks
                     for businesses in Saudi Arabia and the GCC.
```

---

### 6.2 Story

**Anchor:** `#story`

**Content:**
```
[Eyebrow]            The Foundation
[H2]                 Why ASCENDRA exists.

[Body — 2–3 paragraphs]
  - The pattern observed across businesses at the growth ceiling
  - The gap between digital tools and operational reality
  - The conviction that both must be solved together
  - How ASCENDRA was built to close that gap
```

---

### 6.3 Vision & Mission

**Anchor:** `#vision-mission`

```
[Vision]
  To become the trusted partner for sustainable business transformation
  across Saudi Arabia and the GCC, through systems, strategy, and execution.

[Mission]
  To close the gap between where a business is and where it needs to be —
  by building the digital infrastructure and operational systems that allow
  it to operate with clarity, execute with consistency, and grow with confidence.
```

Displayed side by side on desktop. Stacked on mobile.

---

### 6.4 Values

**Anchor:** `#values`

```
[Eyebrow]            What we believe
[H2]                 Five principles that govern every engagement.

[Five value blocks]
  Precision over Speed
  Execution over Advice
  Systems over Workarounds
  Clarity over Complexity
  Partnership over Transactions

[Each value: title + 2–3 sentence explanation]
```

---

### 6.5 The ASCENDRA Method — Full Version

**Anchor:** `#method`

**This is the full version.** Home shows the abbreviated version with a link here.

```
[Eyebrow]            How We Work
[H2]                 The ASCENDRA Method.

[Intro]              Every ASCENDRA engagement — Digital or Consulting —
                     follows the same five-phase methodology.
                     The phases never change. The output is always
                     specific to the business.

[Five phases — full treatment]

  01 — ASSESS
  [Full description]
  Map the operations, the commercial reality, and the constraint.
  Identify the root problem, not just its visible symptoms.
  Define what success looks like and what would prevent it.

  02 — DESIGN
  [Full description]
  Design the solution against the specific business — its size,
  structure, sector, and stage of growth. No templates.
  Every design decision is justified against a business requirement.

  03 — BUILD
  [Full description]
  Implement the systems, digital products, and operational frameworks
  that solve the diagnosed problem. Every ASCENDRA engagement ends
  with something operating — not a document.

  04 — MEASURE
  [Full description]
  Install the KPIs, dashboards, and visibility systems that make
  performance observable. Decisions are driven by data from day one.

  05 — SCALE
  [Full description]
  Remain engaged through the growth curve. Refine, optimize, and
  ensure the system continues to serve the business as it grows —
  not just at launch.
```

---

### 6.6 Founder

**Anchor:** `#founder`

```
[Eyebrow]            The Founder
[H2]                 Hossam H. Emam

[Role]               Founder & Managing Director

[Photo or symbol]    [Founder image or brand symbol]

[Bio — 2 paragraphs]
  P1: Over seven years of hands-on experience building scalable
      business operations across competitive sectors in Saudi Arabia
      and the GCC.

  P2: Expertise across: Operational Systems Design · Business Process
      Engineering · Data-Driven Growth Infrastructure.

[Conviction line]    ASCENDRA is not a consultancy that hands over reports.
                     It builds and implements.

[Link]               → Explore the Founder's Profile [external]
```

---

### 6.7 Our Network of Specialists

**Anchor:** `#network`

```
[Eyebrow]            How We Work
[H2]                 Our Network of Specialists.

[Body — 2 paragraphs]
  P1: ASCENDRA operates through a trusted network of specialized
      experts, consultants, and strategic partners. Every project
      is assembled with the right expertise for that specific challenge.

  P2: Rather than relying on a one-size-fits-all internal team,
      ASCENDRA builds the right team around the right challenge —
      drawing from a curated network of specialists across digital
      development, automation, data, business strategy, and operations.

[The principle — pullquote]
  "The right experts for the right challenge —
  assembled deliberately, not allocated by availability."

[Three supporting points]
  • ASCENDRA leads every engagement as the strategic and delivery authority.
  • The client interface is always ASCENDRA — not individual specialists.
  • The network is curated, not crowdsourced — every specialist
    has been evaluated against ASCENDRA's standards.
```

---

### 6.8 About Page CTA

```
[H2]                 Ready to build?
[Body]               Tell us where your business is today.
[CTA]                [Let's Talk →]          → /contact
[Secondary]          [See What We Build →]   → /services
```

---

### 6.9 About Page Section Order

```
1   Page Hero
2   Story
3   Vision & Mission
4   Values
5   The ASCENDRA Method (full)
6   Founder
7   Our Network of Specialists
8   Page CTA
```

---

## SECTION 7 — SERVICES PAGE STRUCTURE

**Purpose:** Offering page. Answers: Exactly what does ASCENDRA do?
**Primary audience:** Visitors evaluating whether ASCENDRA can solve their specific problem.

---

### 7.1 Page Hero

```
[Eyebrow]            Services
[H1]                 Digital Systems & Business Consulting.

[Sub-headline]       Two pillars. One integrated system.
                     Built around your business — not a service menu.

[Two-pillar summary]
  ASCENDRA Digital ——————————  ASCENDRA Consulting
  The digital products your     The operational systems that
  business runs on.             help it grow steadily.
```

---

### 7.2 ASCENDRA Digital — Full Section

**Anchor:** `#digital`

```
[Eyebrow]            ASCENDRA Digital
[H2]                 What We Build.
[Subtitle]           Digital systems, platforms, and infrastructure
                     built around business goals — not trends.

[Nine service lines — expanded treatment]

  Business Websites
  Corporate sites, personal brands, landing pages built to convert and represent.

  Platforms
  Custom digital platforms designed around specific business operations.

  CRM Systems
  Client relationship management systems tailored to sales and service workflows.

  ERP Systems
  Enterprise resource planning implementations that unify internal operations.

  Dashboards
  Business intelligence interfaces that surface real performance data.

  Automation
  Workflow automation that eliminates manual processes and reduces human error.

  AI Solutions
  Applied AI integrations that give operations a measurable competitive edge.

  Branding & Identity
  Brand systems, visual identity, and design infrastructure.

  Digital Infrastructure
  The underlying technical architecture that supports all digital operations.

[Footer note]
  All digital work is designed alongside the operational reality of the business.
  Technology that doesn't serve a business process is not a product — it is a liability.
```

---

### 7.3 ASCENDRA Consulting — Full Section

**Anchor:** `#consulting`

```
[Eyebrow]            ASCENDRA Consulting
[H2]                 Business Consulting.
[Subtitle]           Operational and strategic frameworks that make
                     digital systems perform and businesses grow.

[Six service lines — expanded treatment]

  Business Analysis
  A structured assessment of your business model, commercial gaps, and operational
  constraints — delivered as an actionable roadmap.

  KPI Design
  Defining what performance looks like, building the measurement framework, and
  installing the visibility systems that keep teams aligned.

  Process Design
  Documented, structured, accountable workflows that allow teams to execute
  consistently at scale.

  Process Optimization
  Identifying where time and money are lost inside existing operations
  and removing it systematically.

  Operational Excellence
  Implementing the structural standards that allow a business to deliver
  consistent quality regardless of volume or team size.

  Growth Planning
  Commercial strategy, market expansion planning, and the operational
  foundations required to acquire and retain clients at scale.

[Footer note]
  Consulting engagements are not delivered as reports.
  They are delivered as implemented systems, installed processes, and
  operational frameworks that remain in place after the engagement ends.
```

---

### 7.4 How the Two Pillars Work Together

```
[H2]                 Two pillars. One system.

[Body]               The defining characteristic of ASCENDRA's approach is
                     that Digital and Consulting are designed together.

[The Sequence — four steps]
  1  A Consulting engagement diagnoses the operational reality.
  2  Digital work is scoped and designed against that reality.
  3  Implementation proceeds with both layers in view.
  4  Measurement is built in from the start.

[Closing line]       When a client comes with a digital need, ASCENDRA begins
                     by understanding the business — not just the technical requirement.
                     This is not a method. It is the standard.
```

---

### 7.5 Capabilities Reference

**Anchor:** `#capabilities`

```
[Eyebrow]            Selected Capabilities
[H2]                 What We Deliver.

[Grid — 12 items]
  Corporate Websites · E-Commerce Stores · Landing Pages ·
  CRM Systems · ERP Implementation · Business Dashboards ·
  Workflow Automation · AI Solutions · Mobile Applications ·
  Analytics & Reporting · Process Design · KPI Systems
```

---

### 7.6 Services Page CTA

```
[H2]                 Not sure which service applies?
[Body]               Tell us what's holding your business back.
                     We will identify the gap and propose the right approach.
[CTA]                [Let's Talk →]         → /contact
[Secondary]          [See Our Work →]       → /work
```

---

### 7.7 Services Page Section Order

```
1   Page Hero
2   ASCENDRA Digital (full)
3   ASCENDRA Consulting (full)
4   How the Two Pillars Work Together
5   Capabilities Reference (grid)
6   Page CTA
```

---

## SECTION 8 — WORK PAGE STRUCTURE

**Purpose:** Evidence page. Answers: Has ASCENDRA done this before?
**Primary audience:** Visitors who need proof before committing to a conversation.

---

### 8.1 Page Hero

```
[Eyebrow]            Work
[H1]                 What we have built.

[Sub-headline]       Digital products, platforms, and operational systems —
                     built, implemented, and measured.
```

---

### 8.2 Tier 1 — Featured Product

**One entry. Flagship treatment. Full-width or visually dominant.**

```
[Tier label]         FEATURED PRODUCT

PharmacyOS
─────────────────────────────────────────────
[Type]               Proprietary Digital Platform
[Category]           Healthcare Operations

[Description]
  A purpose-built operational management system for pharmacies.
  Covers inventory management, prescription tracking, supplier
  management, and reporting — designed to replace manual and
  fragmented workflows with a single integrated platform.

[ASCENDRA pillars used]
  ASCENDRA Digital ✓   ASCENDRA Consulting ✓

[Status]             Proprietary · Built by ASCENDRA

[Visual]             Platform screenshot or brand mark
```

---

### 8.3 Tier 2 — Featured Case Studies

**Two entries. Card treatment. Each card opens to a case study detail view (future).**

```
[Tier label]         CASE STUDIES

┌─────────────────────────────┐  ┌─────────────────────────────┐
│ Taghreed Academy            │  │ ASCENDRA Website            │
│ ─────────────────────────── │  │ ─────────────────────────── │
│ [Sector / Type]             │  │ [Sector / Type]             │
│ Education                   │  │ Digital Systems & Consulting │
│                             │  │                             │
│ [What was built]            │  │ [What was built]            │
│ [Short description]         │  │ The ASCENDRA website is     │
│                             │  │ a case study in our own     │
│ [Challenge]                 │  │ methodology — positioning,  │
│ [Approach]                  │  │ bilingual execution, and    │
│ [Outcome]                   │  │ digital infrastructure      │
│                             │  │ applied to our own brand.   │
│ [Pillars used]              │  │                             │
│ Digital ✓  Consulting ✓     │  │ Digital ✓  Consulting ✓     │
└─────────────────────────────┘  └─────────────────────────────┘
```

---

### 8.4 Tier 3 — Digital Presence Projects

**Three entries. Smaller card treatment. Grid layout.**

```
[Tier label]         DIGITAL PRESENCE

┌───────────────────┐  ┌───────────────────┐  ┌───────────────────┐
│ WIN Solutions     │  │ Dr Hossam Website │  │ Dr Mohamed Karam  │
│ ───────────────── │  │ ───────────────── │  │ ───────────────── │
│ [Type]            │  │ [Type]            │  │ [Type]            │
│ [Short desc]      │  │ Founder personal  │  │ [Short desc]      │
│                   │  │ brand & digital   │  │                   │
│                   │  │ presence          │  │                   │
│ Digital ✓         │  │ Digital ✓         │  │ Digital ✓         │
└───────────────────┘  └───────────────────┘  └───────────────────┘
```

---

### 8.5 Work Page CTA

```
[H2]                 Have a project in mind?
[Body]               Tell us what you are building — or what is
                     holding your business back from building it.
[CTA]                [Let's Talk →]          → /contact
[Secondary]          [See Our Services →]    → /services
```

---

### 8.6 Work Page Section Order

```
1   Page Hero
2   Tier 1 — Featured Product (PharmacyOS)
3   Tier 2 — Case Studies (Taghreed Academy · ASCENDRA Website)
4   Tier 3 — Digital Presence Projects (WIN · Dr Hossam · Dr Mohamed Karam)
5   Page CTA
```

---

## SECTION 9 — CONTACT PAGE STRUCTURE

**Purpose:** Conversion page. One clear path to start a conversation.
**Design principle:** Navy background. No distractions. No sidebar content. No links away from the page (except header/footer).

---

### 9.1 Page Hero (Short)

```
[H1]                 Start Your Transformation.

[Body]               Tell us where your business is today — we will identify
                     the digital or operational gaps holding it back
                     and build the path forward.
```

No eyebrow label. No secondary button. The page is the CTA.

---

### 9.2 Two-Column Layout

Left column: Form
Right column: Direct contact + Reassurance

---

### 9.3 Contact Form (Left Column)

```
Fields:
  Full Name          [text input]          Required
  Work Email         [email input]         Required
  Phone Number       [tel input, dir=ltr]  Optional
  What is the challenge?  [textarea]       Required

[Submit button]      Let's Talk            [Gold · full width]

[Success state]      Message Received.
                     We will review your submission and be in touch
                     within 1–2 business days.
```

---

### 9.4 Direct Contact + Reassurance (Right Column)

```
Or connect directly:
  [WhatsApp button]  WhatsApp →
                     +966 56 332 8225

─────────────────────────────
  ✓  A real human reviews every request
  ✓  We identify the gap before we propose anything
  ✓  No obligation, no sales pressure
```

---

### 9.5 Contact Page Section Order

```
1   Page Hero (short — H1 + one-sentence body)
2   Two-column layout
    Left:  Contact Form
    Right: Direct Contact (WhatsApp) + Reassurance List
```

No footer CTA on this page — the page itself is the CTA.

---

## SECTION 10 — CTA STRATEGY

### 10.1 CTA Hierarchy

Three levels of CTA intensity across the site.

| Level | Label | Treatment | Destination |
|---|---|---|---|
| Primary | Let's Talk | Gold button, navy text | /contact |
| Secondary | See What We Build | Ghost/outline button | /work or /services |
| Tertiary | Explore [topic] | Text link with arrow | Internal anchor or page |

---

### 10.2 CTA by Page

| Page | Primary CTA | Secondary CTA | Tertiary CTA |
|---|---|---|---|
| Home | Let's Talk → /contact | See What We Build → /work | Explore the Method → /about#method |
| About | Let's Talk → /contact | See What We Build → /services | Founder Profile → external |
| Services | Let's Talk → /contact | See Our Work → /work | — |
| Work | Let's Talk → /contact | See Our Services → /services | — |
| Contact | [Form submit: Let's Talk] | WhatsApp direct | — |

---

### 10.3 CTA Placement Rules

- **Header:** Primary CTA ("Let's Talk") always present, top-right.
- **Hero section (every page):** Primary CTA + one secondary CTA maximum.
- **Mid-page:** At most one CTA per major section. Never two adjacent sections both ending with a CTA.
- **Page footer section:** Every page ends with a CTA block before the footer — except Contact.
- **Contact page:** No CTA block at bottom. The page itself is the conversion point.

---

### 10.4 CTA Copy Rules

- Never: "Get Started," "Learn More," "Click Here," "Discover"
- Always: Direct, action-specific, outcome-oriented
- "Let's Talk" — the primary CTA is conversational, not transactional
- "See What We Build" — evidence invitation, not a command
- Arabic primary: "تحدّث معنا" (not "ابدأ الآن" / "انقر هنا")

---

## SECTION 11 — INTERNAL LINKING STRATEGY

### 11.1 Page-to-Page Link Map

```
Home
  → /services        (from: ASCENDRA Digital section, ASCENDRA Consulting section)
  → /work            (from: "See What We Build" CTA)
  → /about           (from: Method section teaser link)
  → /contact         (from: Hero CTA, inline CTA, page CTA block)

About
  → /services        (from: page CTA block — "See What We Build")
  → /contact         (from: page CTA block — "Let's Talk")
  → [external]       (from: Founder section — Founder personal site)

Services
  → /work            (from: page CTA block — "See Our Work")
  → /contact         (from: Hero CTA, page CTA block — "Let's Talk")
  → /about#method    (optional — if referencing the methodology)

Work
  → /services        (from: page CTA block — "See Our Services")
  → /contact         (from: Hero CTA, page CTA block — "Let's Talk")

Contact
  → [no outbound internal links]   (conversion page — no exits)
  → [WhatsApp]       (from: direct contact — external)
```

---

### 11.2 Anchor Link Map (Within-Page)

| Page | Anchor | Triggered From |
|---|---|---|
| /about | #story | Footer nav, potential Home teaser |
| /about | #vision-mission | — |
| /about | #values | — |
| /about | #method | Home Method section teaser link |
| /about | #founder | Footer "The Founder" link |
| /about | #network | — |
| /services | #digital | Home Digital section CTA |
| /services | #consulting | Home Consulting section CTA |
| /services | #capabilities | — |

---

### 11.3 Footer Link Coverage

The footer provides access to all five pages from every page. It also surfaces:
- Brand tagline (secondary touch)
- Social channels (Instagram, LinkedIn, Facebook, WhatsApp)
- Copyright and domain

Every page is reachable from every other page in at most two clicks (current page → footer → destination).

---

### 11.4 Schema.org Internal Structure

`ProfessionalService` schema included on all pages with:
- `url` — canonical page URL
- `sameAs` — all four social channels
- `serviceType` — full list of service types
- `areaServed` — SA

---

### 11.5 Cross-Page Consistency Checklist

These elements must be identical across all pages:

| Element | Consistent Across |
|---|---|
| Header nav (labels, order, CTA) | All 5 pages |
| Footer structure + social links | All 5 pages |
| Brand tagline: "Built to Ascend." | All 5 pages (footer) |
| Schema.org JSON-LD | All 5 pages |
| Language switcher position | All 5 pages |
| Mobile nav structure | All 5 pages |

---

## APPENDIX — QUICK IA REFERENCE

### Page Count
5 pages × 2 locales = 10 indexed URLs

### Section Count by Page
| Page | Section count |
|---|---|
| Home | 9 sections |
| About | 8 sections |
| Services | 7 sections |
| Work | 6 sections |
| Contact | 2 sections |

### 5-Second Test (Every Page)
1. What ASCENDRA does → Answered in H1
2. Who ASCENDRA serves → Answered in subheadline or trust line
3. Why ASCENDRA is different → Answered in sub-headline (two pillars)
4. How to contact ASCENDRA → "Let's Talk" — top-right on every page

### Content Ownership
All copy → sourced from `messages/en.json` and `messages/ar.json`
All positioning → governed by `ASCENDRA_MASTER_BRIEF_v2.0.md`
All visual rules → governed by Brand Rules (Part Three of Master Brief)

---

*ASCENDRA INFORMATION ARCHITECTURE v1.0*
*For use as the structural blueprint for all web development, content creation, and design work.*
*All decisions about page structure, navigation, and user flow defer to this document.*
*All decisions about positioning, copy, and brand identity defer to ASCENDRA_MASTER_BRIEF_v2.0.md.*
