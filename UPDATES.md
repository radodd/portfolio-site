# Portfolio Update Log

All UI, design, and animation changes are logged here chronologically.
Each entry includes the date, scope, and a description of what changed.

---

## [2026-03-26] — Case Study Layout: Side-by-Side Mocks + Outcomes Promoted

**Scope:** `app/projects/[slug]/page.tsx`, `scss/project-detail.module.scss`

**Changes:**
- AYDT mock frames are now side-by-side (`.mockSideBySide` 2-col grid, 380px height each) instead of stacked, so both the client portal and admin portal read as one dual-surface project at a glance.
- Outcomes section promoted to immediately after the mock frames for all projects. Previously sat after Color Palette near the bottom.
- New section order: Preview → Outcomes → Metadata → Overview/Challenge → Solution → Color Palette → Backend/Motion → Next Project.
- `AYDTMock` and `AYDTAdminMock` now accept an optional `height` prop (default 560) to support the reduced side-by-side height without a wrapper override.

---

## [2026-03-26] — Project Cards: Eyebrow + Functional Title Restructure

**Scope:** `lib/data.ts`, `components/projects.tsx`, `scss/projects.module.scss`

**Change:** Project cards now lead with the project type as the main title, with the client/company name as an eyebrow label above it. Added `eyebrow` field to the `Project` interface and `projectsData`. Added `.co2Eyebrow` SCSS class (mono, uppercase, orange) matching the existing `featuredEyebrow` style. The `FeaturedCard` now renders `project.eyebrow` instead of hardcoded "Featured Project" text.

**Cards updated:**
- AYDT → eyebrow: "American Youth Dance Theater" / title: "Studio Registration Portal"
- MRC Rock & Sand → eyebrow: "MRC Rock & Sand" / title: "Natural Stone Quote Platform"
- Gen Fulton → eyebrow: "Jen Fulton Consultancy" / title: "Private Practice Platform"
- Madasa Collective → eyebrow: "Madasa Collective" / title: "Digital Studio & Agency Site"

---

## [2026-03-25] — AYDT Case Study: Full 65-Table Schema Constellation

**Scope:** `components/project-demos/aydt-backend-showcase.tsx`, `app/projects/[slug]/page.tsx`

**Changes:**
- Replaced the 8-table `AydtSchemaDemo` with `AydtSchemaConstellationDemo` — a full 870×740px schema map showing all 65 tables organized into 10 color-coded domain clusters.
- Cluster layout (3 rows): Row 1: Identity & Accounts (4), Semester & Program (9), Class Structure (13), Requirements & Access (7). Row 2: Enrollment & Registration (6), Auditions & Waitlist (3). Row 3: Discounts & Pricing (7), Payments (4), Email & Comms (10), Media (2).
- 8 SVG bezier connections trace major cross-domain FK flows between clusters, each labeled with an FK count badge: Semester→Classes (5), Classes→Requirements (4), Identity→Enrollment (6), Classes→Enrollment (4), Classes→Auditions (3), Enrollment→Payments (4), Semester→Discounts (4), Discounts→Enrollment (3). Semester→Discounts path routes left of Identity to avoid passing through the Enrollment card.
- Legend above canvas shows all 10 domain colors.

---

## [2026-03-25] — AYDT Case Study: Schema Constellation replaces Migration Pipeline

**Scope:** `components/project-demos/aydt-backend-showcase.tsx`, `app/projects/[slug]/page.tsx`

**Changes:**
- Replaced "Data Migration Pipeline" demo card with "Schema — Enrollment & Season Cluster": a node-graph visualization of 8 tables from the 65-table schema (families, dancers, seasons, divisions, classes, fee_rules, enrollments, fees).
- Tables are positioned in 3 rows representing data flow. SVG cubic bezier curves trace each FK relationship, color-coded by domain: enrollment (blue), season structure (orange), fee system (pink). Arrowheads point to the referenced table. Foreign key columns are visually distinguished from regular columns inside each card.
- Canvas is 750×522px, overflows horizontally on mobile.

---

## [2026-03-25] — AYDT Case Study: Dual Mock Frames, Split Color Palettes, Backend Showcase

**Scope:** `lib/data.ts`, `app/projects/[slug]/page.tsx`, `components/project-demos/aydt-backend-showcase.tsx`

**Changes:**
- Added `adminMock` field to `ProjectDetail` interface; AYDT now renders two browser mock frames — Consumer Portal (`aydt-portal-hero.png`) and Admin Portal (`aydt-admin-hero.png`). The admin hero image was previously in `animationImageUrl`; moved to the proper mock section.
- Added `colorPalettes` array field to `ProjectDetail` interface for projects with multiple surfaces. AYDT now has two labeled palettes: Consumer Portal (Stage Black, Soft Lavender, Blossom Pink, Clean White) and Admin Portal (Deep Crimson, Light Bone, Dark Slate, Clean White).
- Replaced the animation/product showcase section for AYDT with a Backend section. Two new demo cards: "Server-Side Fee Engine" (visualizes the 6-layer conditional rule chain) and "Data Migration Pipeline" (3-phase Clean → Seed → Email flow). Both use a new `AydtFeeEngineDemo` / `AydtMigrationDemo` component pair in `aydt-backend-showcase.tsx`.

---

## [2026-03-25] — Madasa Case Study: Service Card Flip Demo Added

**Scope:** `components/project-demos/madasa-card-flip-demo.tsx`, `scss/madasa-card-flip-demo.module.scss`, `app/projects/[slug]/page.tsx`

**Changes:**
- Created `MadasaCardFlipDemo` component — 3 interactive CSS 3D flip cards (Branding, Product Design, Development)
- Cards use `transform-style: preserve-3d`, `perspective: 700px`, `rotateY(180deg)` on hover, and `backface-visibility: hidden` on both faces
- Matches Madasa brand colors (orange front face accent, colored back faces per service)
- Added as **Demo 02** in the Madasa Collective case study animation showcase section
- Hint bar describes the CSS technique used

---

## [2026-03-25] — MRC Case Study: Real SEO Outcomes Added

**Scope:** `lib/data.ts` — MRC Rock & Sand project outcomes

**Changes:**
- Replaced placeholder outcome cards with real Google Search Console data (Nov 2024 – Mar 2026)
- **14×** organic click growth (7 → 99 monthly clicks)
- **Top 5** average search position (up from 21.8)
- **6.64%** peak CTR (up from 2.46%)

---

## [2026-03-24] — Design System v4 Full Rewrite

**Scope:** Full component-by-component rewrite implementing Design System v4.

### Foundation

- **`app/globals.css`** — Replaced legacy styles with DS v4 CSS custom properties: color palette (`--ds-bg`, `--ds-orange`, `--ds-pink`, `--ds-blue`, etc.), shadow scale, glow tokens, glass variables. Added Switzer font via fontshare CDN `@import`. Body now uses `var(--font-body)` and `var(--ds-bg)` (#0d1020 dark navy).
- **`tailwind.config.js`** — Updated color palette to DS v4 values (navy background, orange/blue/pink accent triad). Added `fontFamily.display` and `fontFamily.mono` CSS variable references.
- **`app/layout.tsx`** — Added `Fraunces` (variable serif, optical size axis) and `DM_Mono` (400/500) via `next/font/google`. Exposed as `--font-display` and `--font-mono` CSS variables. Un-commented `<Header />`. Updated body background to DS navy.

### Cleanup / Removals

- **`lib/data.ts`** — Removed all skill icon imports (HTML, CSS, JS, React, etc.) and `skillsData` export. Removed "Skills" from nav `links` array (auto-removes from `SectionName` type). Preserved `lines` array for `FlipperAnimation`.
- **`components/skills.tsx`** — Deleted entirely.

### Navigation (Header)

- **`components/header.tsx`** — Full rewrite. Replaced basic gray pill nav with animated floating glass pill nav: `backdrop-filter: blur(16px)`, dark navy bg, subtle border. Active-section indicator is an orange glow pill that slides to the active link by measuring `offsetLeft / offsetWidth` on section change.
- **`scss/header.module.scss`** — New styles for `.header`, `.navPill`, `.activePill`, `.navLink` / `.active`.

### Hero Section (Intro)

- **`components/intro.tsx`** — Full rewrite. `FlipperAnimation` commented out (preserved for future iteration). New DS v4 hero layout: DM Mono eyebrow label with leading line, large italic Fraunces name ("Ethan / Flores") where "Flores" uses the brand gradient (`--ds-grad`), italic Fraunces role line, muted tagline, two CTA buttons (primary gradient + liquid-fill outline), LinkedIn + GitHub social icon buttons. Three ambient color blobs (orange, pink, blue) animate in the background.
- **`scss/intro.module.scss`** — New styles for `.hero`, `.blob1/2/3` with float keyframes, `.eyebrow`, `.heroName`, `.heroNameGrad`, `.heroRole`, `.heroDesc`, `.heroBtns`, `.btnPrimary` (gradient glass-overlay + shimmer sweep), `.btnLiquid` (liquid fill from bottom), `.socialBtn`.

### About Section

- **`components/cursor/about.tsx`** — Removed location-highlight JSX (Guam, Hawaii, SoCal, Raleigh) entirely. Fixed `beautiful` to use `styles.beautiful` (proper CSS module scoping). Animation changed from `animate` to `whileInView` with `viewport: once`.
- **`scss/about.module.scss`** — Removed all location highlight keyframes (`highlightGuam`, `highlightHawaii`, `highlightSoCal`, `highlightRaleigh`). Restyled `.originStory` to use Fraunces italic at `clamp(1.75rem, 4vw, 3.25rem)`, light weight, `var(--ds-text-dim)`. `.beautiful` shimmer now uses brand palette (orange → pink → blue) instead of rainbow gradient.

### Section Utilities

- **`components/section-heading.tsx`** — Added optional `eyebrow` prop (renders DM Mono uppercase label above heading). Added gradient rule (`--ds-grad`) below heading.
- **`scss/section-heading.module.scss`** — New `.container`, `.text` (Fraunces 700), `.eyebrow` (DM Mono), `.rule` (gradient bar).
- **`components/section-divider.tsx`** — Changed from plain gray bar to gradient glow bar (orange → pink → blue) with `box-shadow` brand glow. Animation changed to `scaleY` reveal on scroll.
- **`scss/section-divider.module.scss`** — Updated `.divider` with `background: var(--ds-grad)` and orange/pink glow shadow.

### Projects

- **`components/projects.tsx`** — Full rewrite. Removed mouse-tracking width animation. New `cardStyle: "co2" | "mt2"` prop controls which card type renders.
  - **CO2 cards** (row 1 — Coaching & Consulting, MRC Rock & Sand): Image-heavy horizontal layout, 62% image / 38% info. Hover: `translateY(-4px)` lift, orange glow inset border, image scale. "View project →" link fades + slides in on hover.
  - **MT2 cards** (row 2 — Madasa Collective, Uber App): Minimal editorial card with DM Mono numbered index, Fraunces title, muted description. Hover: surface fill expands from bottom-right corner. "View →" link fades in.
- **`scss/projects.module.scss`** — New styles for `.co2Grid`, `.co2Card`, `.co2ImageWrap`, `.co2Info`, `.co2Tag`, `.co2ViewLink`, `.mt2Grid`, `.mt2Card`, `.mt2Num`, `.mt2Title`, `.mt2Bot`, `.mt2ViewLink`.

### Experience

- **`components/experience.tsx`** — Restyled with DS v4 tokens. Added `SectionHeading` with eyebrow "Career". Company name now uses Fraunces italic at large scale. Role uses DM Mono uppercase eyebrow. Gradient rule separator between role and description text. Buttons rewritten as primary gradient + liquid-fill outline matching hero/hero styles. `DoubleY` video component preserved.
- **`components/doubleY.tsx`** — Updated to use `flex` instead of `height` for mouse-driven animation (works with new flexbox layout). Class references updated to new SCSS module names.
- **`scss/experience.module.scss`** — Rewrote `.container`, `.textContainer` (`.company`, `.role`, `.desc`, `.rule`), `.btnRow`, `.btnPrimary`, `.btnOutline`, `.double` / `.imageContainer` / `.stretchyContainer`.

### Contact

- **`components/contact.tsx`** — Removed stray `import { format } from "path"`. Replaced `SubmitBtn` with inline styled button. Added `SectionHeading` with eyebrow. Form fields wrapped in `.field` containers for gradient-border focus effect.
- **`scss/contact.module.scss`** — New `.field` wrapper with `::before` gradient ring that scales in on `focus-within`. `.accentBar` — 3px orange left accent that animates top/bottom to fill on focus. `.input` / `.textarea` use `var(--ds-surface2)` bg, `var(--ds-text)` color. `.submitBtn` uses same primary gradient style as hero CTA.

### Background Layer

- **`components/blob-layer.tsx`** — Simplified to two fixed-position blobs using SCSS module classes.
- **`scss/bloblayer.module.scss`** — Updated blob colors to DS v4 (`--ds-orange`, `--ds-accent`). Larger radii, softer opacity (0.05), smoother `blobDrift` keyframe paths. Blobs are now `position: fixed` (follow scroll).

### Page Structure

- **`app/page.tsx`** — Removed `<AboutButtons />` (CTA buttons moved into Intro hero). Updated `<Projects>` calls to pass `cardStyle="co2"` and `cardStyle="mt2"`. `SectionHeading` now receives `eyebrow="Selected Work"` prop.
- **`scss/home.module.scss`** — Increased gap between sections (`5rem` mobile, `9rem` desktop).

---

## [2026-03-24] — DoubleY Animation Refactor

**Scope:** `components/doubleY.tsx`

- **Animation state** moved from module-level `let` variables to `useRef` — fixes shared-state bug where values were reset on re-render and could race across multiple instances on the page.
- **Flex target computation** now uses each card's `getBoundingClientRect()` center rather than raw `clientY / window.innerHeight`. The interaction is now card-local: cursor at card 1's center maximizes card 1, cursor at card 2's center maximizes card 2, regardless of scroll position.
- **`onMouseLeave` handler** added — smoothly eases the flex split back to its default `2 / 1` resting state when the cursor exits the component.
- **RAF cleanup** added via `useEffect` return — cancels any in-flight animation frame on unmount to prevent memory leaks.
- **Settle logic** upgraded from `Math.round()` comparison to an `EPSILON = 0.0008` threshold with exact snap, eliminating potential micro-jitter at rest.
- **Soft cubic easing** applied to the normalized cursor position before mapping to flex, giving a more organic feel than the previous linear mapping.
- **`preload="auto"`** added consistently to both video elements (was missing from the second video).

---

## [2026-03-24] — DoubleY Symmetry Fix + Parallax Zoom

**Scope:** `components/doubleY.tsx`, `scss/experience.module.scss`

### Problem
The two video cards within each experience row were behaving asymmetrically. Card 1 started at `flex: 2` and card 2 at `flex: 1`, meaning card 1 had nearly double the flex headroom — it could grow to 98% of panel height while card 2 could only reach 65%. Additionally, the parallax zoom was being applied to the wrong card in both cases (inverted `t` sign), and an implicit `min-height: auto` on the flex items was preventing card 1 from collapsing far enough to give card 2 room to expand.

### Changes
- **`DEFAULT_F1` changed `2 → 1.5`** — equal starting split so both cards begin at 50% of panel height and have identical flex headroom in each direction.
- **`FLEX_RANGE` changed `0.95 → 1.1`** — with a symmetric default, the safe max is now 1.5. 1.1 gives each card a range of `[0.4 → 2.6]` flex (13% to 87% of panel height) — the same range, mirrored.
- **Parallax `t` sign corrected** — `scale1` and `scale2` were using inverted `Math.max(0, -t)` / `Math.max(0, t)` selectors, causing each card to zoom when the *other* card was dominant. Swapped so each card zooms only when it is the focal point.
- **`min-height: 0`** added to `.imageContainer` in SCSS — removes the browser's implicit `min-height: auto` on flex items, allowing either card to fully collapse when the other expands.
- **CSS nth-of-type defaults updated** to `flex: 1.5` for both cards, matching the new JS default.

## [2026-03-24] — DoubleY Parallax Zoom Pass

**Scope:** `components/doubleY.tsx`, `scss/experience.module.scss`

- **`FLEX_RANGE` increased** `0.85 → 0.95` — card 2 now grows from 33% → 65% of total panel height at cursor extreme (up from 62%), giving it a range that feels proportionally comparable to card 1's 66% → 95%.
- **Parallax zoom added** — `.stretchyContainer` now receives a `scale + translateY` transform driven by the same lerped flex value. At each cursor extreme:
  - Card 1 (cursor at top): `scale(1.07) translateY(+5%)` — zooms in and shifts video down, revealing top content.
  - Card 2 (cursor at bottom): `scale(1.07) translateY(-5%)` — zooms in and shifts video up, revealing bottom content.
  - Both transitions smooth out through the same SPEED/EPSILON lerp loop; no separate RAF needed.
  - `.imageContainer`'s existing `overflow: hidden` clips the scaled content, keeping the zoom within bounds.
- **`will-change: transform`** added to `.stretchyContainer` in SCSS — promotes the layer for GPU compositing ahead of the animation.

---

## [2026-03-24] — Project Detail View + Case Study Navigation

**Scope:** New dynamic route, detail page component, reveal animation system, project card button.

### New Files
- **`app/projects/[slug]/page.tsx`** — Dynamic route for project detail pages. Server component with `generateStaticParams` for all 4 project slugs. Sections: hero (blobs + gradient title + CTA buttons), mock browser frame, 4-column metadata row (year/role/type/stack), overview + challenge two-column layout, solution with feature highlight cards, outcomes grid (3 stat cards), and "Up Next" navigation card linking to the next project in sequence.
- **`components/reveal-wrapper.tsx`** — Lightweight client component wrapping `IntersectionObserver` to reveal sections on scroll. Uses `data-reveal` / `data-reveal="visible"` attribute toggle. Avoids CSS Modules dependency — works with any styled child.
- **`scss/project-detail.module.scss`** — Full style module for the detail page. Maps HTML template design tokens to DS v4 CSS variables. Classes: `.hero`, `.heroTitle`, `.heroLine1/2` (gradient), `.metaPill`, `.btn{Primary,Ghost}`, `.gradRule`, `.sectionEye`, `.mockFrame`, `.detailCard`, `.tag{Blue,Orange,Pink,Neutral}`, `.twoCol`, `.threeCol`, `.fourCol`, `.prose`, `.processStep`, `.featureCard`, `.outcomeCard`, `.nextCard`.

### Mock Browser Frames
- **Coaching & Consulting** — Dark-mode simulated hero split with "Dr. Gen Fulton" nav, sports coaching headline in Fraunces italic, two skeleton phone cards on the right.
- **MRC Rock & Sand** — Light-mode product detail page showing "Mojave" material entry with category/color/texture metadata and a placeholder image panel.
- **All others** — Gradient text placeholder rendering the project title in italic serif.

### Data Changes
- **`lib/data.ts`** — Added `slug` field to all 4 entries in `projectsData`. Added `projectDetailData` array (typed `ProjectDetail[]`) with full case study content for all 4 projects: overview, challenge steps, solution prose + features, outcomes, and next-project link.

### UI Changes
- **`components/projects.tsx`** — Added optional `slug` to `Project` interface. `Co2Card` now renders a `.co2Actions` row with a persistent **"Case Study →"** pill button (links to `/projects/[slug]`) alongside the existing hover-reveal "View project →" link.
- **`scss/projects.module.scss`** — Added `.co2Actions` flex row, `.co2CaseStudyLink` pill button (always visible, orange hover state). Removed `margin-top` from `.co2ViewLink` (now contained in `.co2Actions`).

### Scroll Reveal
- **`app/globals.css`** — Added `[data-reveal]` / `[data-reveal="visible"]` global selector pair — `opacity: 0; transform: translateY(20px)` → revealed state on `IntersectionObserver` trigger (threshold 0.08).

---

## [2026-03-24] — Hero Name Gradient Clip Fix

**Scope:** `scss/intro.module.scss` — `.heroNameGrad`

- **Root cause identified:** The `<span>` wrapping "Flores" is `inline` by default. With `-webkit-background-clip: text`, the background only paints inside the element's layout box. Italic fonts visually slant *beyond* that box on the right side — the computer does not count the slant as part of the computed width — so the gradient had no coverage over the trailing "s" glyph, rendering it transparent.
- **Fix:** Added `display: inline-block` so the element's box properly wraps the full text width before the clip is applied. Added `padding-right: 0.12em` (scales with font size) to extend the background box past the italic overhang, ensuring the gradient covers the full visual extent of the letterforms at every `clamp` breakpoint.

---

## [2026-03-24] — Project Detail Page: Nav Removal, Full-Width Hero, Color Palette & Animation Sections

**Scope:** `components/header.tsx`, `app/projects/[slug]/page.tsx`, `lib/data.ts`, `scss/project-detail.module.scss`

### Header
- **`components/header.tsx`** — Added `usePathname` import. Returns `null` when `pathname.startsWith("/projects/")` — nav is fully hidden on detail pages.

### Hero Full-Width
- **`app/projects/[slug]/page.tsx`** — Restructured page layout. Hero section is now a sibling to the `.page` div (not inside it), allowing it to span 100% viewport width like the home intro. `<section className={styles.heroSection}>` wraps blobs + `heroInner` — the inner div is max-width constrained and uses `justify-content: space-between` to place the back link at the top and the title/CTA block at the bottom. The back link no longer needs a `margin-top` offset for the fixed header.
- **`scss/project-detail.module.scss`** — Replaced `.hero` with `.heroSection` (100% width, `min-height: 100vh`, `overflow: hidden`) and `.heroInner` (max-width constrained, `flex-direction: column`, `justify-content: space-between`, `padding: 2.5rem 2.5rem 4.5rem`). `.backLink` changed from `margin-top: 6.5rem` to `align-self: flex-start`.

### New Sections
- **Color Palette** (`colorPalette`) — New section between Solution and Outcomes. Shows a design rationale paragraph + 4-swatch grid. Each swatch: colored rectangle, name, role description, hex value. Added `.swatchGrid`, `.swatchCard`, `.swatchColor`, `.swatchInfo`, `.swatchName`, `.swatchRole`, `.swatchHex` SCSS classes.
- **Animation Showcase** (`animationImageUrl`) — Placeholder section between Solution and Outcomes. Renders an `<Image>` when `animationImageUrl` is set in the project data; otherwise shows a dotted-border frame with "Animation Showcase — screenshot coming soon" placeholder. Added `.animationFrame`, `.animationImage`, `.animationPlaceholder`, `.animationPlaceholderLabel`, `.animationPlaceholderTitle` SCSS classes.

### Data
- **`lib/data.ts`** — Added `ProjectColorSwatch` interface. Added `colorPalette: { rationale, swatches }` and optional `animationImageUrl` to `ProjectDetail`. Populated `colorPalette` for all 4 projects with design rationale copy and 4 swatches each.

### GSAP Note
- Flagged by user — GSAP issue of unknown origin (home page or detail page). Saved to memory (`project_gsap_issue.md`) for follow-up investigation.

---

## [2026-03-24] — Coaching Project: Live Animation Demo (Blobs + See More)

**Scope:** New `components/project-demos/coaching-animation-demo.tsx`, new `scss/coaching-demo.module.scss`, updated `app/projects/[slug]/page.tsx` and `scss/project-detail.module.scss`

### New Component
- **`components/project-demos/coaching-animation-demo.tsx`** — `"use client"` component that embeds a live, interactive preview of the Gen Fulton coaching site's intro section. Contains:
  - **3 animated CSS blobs** using `motion.div` with organic `border-radius` shapes, `filter: blur(64px)`, and framer-motion float animation (3s/4s/5s `mirror` repeat, matching the original). Blues match the client's `#5888c8` palette.
  - **Intro content** using the real text from the client's `constants.ts` (greeting, bio paragraph).
  - **Interactive "See More" button** that expands/collapses the qualifications section (Education, Professional Experience, Specialized Training) via a `max-height` / `opacity` framer-motion animation.
  - **Hint bar** at the bottom: "Live interaction — click 'See More' to expand".

### Demo Card Structure
- **`scss/project-detail.module.scss`** — Replaced single `.animationFrame` with a scalable `.demoCard` pattern: `.demoCardHeader` (numbered badge, title, sub-description, "Interactive" pill badge) + `.animationFrame` inner content. Supports adding multiple demo cards per project by stacking `.demoCard + .demoCard`.

### Page Routing
- **`app/projects/[slug]/page.tsx`** — Animation Showcase section now routes on `detail.slug`: coaching project renders `<CoachingAnimationDemo />`, all other projects fall back to image or placeholder. Structure is ready for additional project-specific demo components.

---

## [2026-03-24] — MRC Case Study: Color Palette & Demo Corrected to Actual Brand Colors

**Scope:** MRC Rock & Sand case study — color palette section and animation demo background.

### Color Palette (`lib/data.ts`)

- **MRC `colorPalette.swatches`** — Replaced incorrect forest-green palette with actual brand colors extracted from site screenshots:
  - `#1d3d52` "Deep Teal Navy" (was `#4a7c49` "Stone Green") — hero backdrop & primary depth
  - `#1b7a88` "Brand Teal" (was `#8b6f47` "Mojave Sand") — headings, CTAs & interactive elements
  - `#f8f6f2` "Natural Stone" — unchanged
  - `#2a2a2a` "Charcoal" — unchanged
- **`colorPalette.rationale`** — Rewrote to reflect the teal-navy brand identity rather than forest green.

### Animation Demo (`scss/mrc-slider-demo.module.scss`)

- **`.demo::before` gradient** — Changed from dark forest-green (`#1e3d2a → #2a5a3e → #172e20`) to dark teal-navy (`#1d3d52 → #245f7a → #13293a`) to match the actual MRC/Stoneyard hero palette.

---

## [2026-03-25] — MRC Case Study: Target Audience & Existing Customer Copy Update

**Scope:** `lib/data.ts` — MRC Rock & Sand project detail (`mrc-rock-and-sand`)

### Overview
- **Second audience corrected** — "homeowners browsing material options" replaced with "landscapers sourcing materials for client projects" (landscapers were the actual secondary target audience, not homeowners).
- **Existing customer continuity added** — New sentence appended to the overview body: the new interface was built to not disrupt the existing customer base, with the goal of making the transition as seamless as possible for existing clientele.

### Challenge
- **"Dual Audience Routing" step updated** — Body copy changed from "Homeowners need inspiration; contractors need specs and ordering" to "Landscapers need material specs and project suitability; contractors need bulk ordering and availability." Added note about not leaving existing customers behind.

---

## [2026-03-25] — AYDT Case Study: Full Rewrite + Portal Architecture

**Scope:** `lib/data.ts`, `app/projects/[slug]/page.tsx`

**Changes:**
- Full rewrite of AYDT `projectDetailData` to reflect actual project: custom registration portal replacing Active software ($17k+/year), NYC dance studio, Est. 1996, two locations
- Updated `projectsData` description and tags — added Supabase (`#3ecf8e`), corrected href to `aydance.org`
- Type changed: "Performing Arts Website" → "Custom Registration Portal"
- eyebrowCategory changed: "Non-Profit & Arts" → "Full-Stack Application"
- Year updated to 2026 (audit April 1, launch May 1)
- Case study now reflects two-surface architecture: consumer enrollment portal + admin operations dashboard
- Tech stack documented: Next.js, TypeScript, Supabase (65 tables), Tailwind, Sass, Supabase Auth, Elevan payments, Resend emails
- Fee engine documented in solution copy: 4 fee types (automatic, registration, recital, costume), multi-dancer discounts, coupons, server-side rule chain
- Outcomes reframed for pre-launch: $17k+ projected savings, 65-table schema scale, May 2026 launch target
- `animationImageUrl` set to `/aydt-admin-hero.png` — admin dashboard shown in Product showcase section
- Added `AYDTMock` component to `page.tsx` using `/aydt-portal-hero.png` for mock browser frame
- Showcase section label conditionally renders "Product / Admin Portal" for AYDT instead of "Motion Design / Animation & Interactions"
- **Pending:** `/aydt-portal-hero.png` and `/aydt-admin-hero.png` need to be added to `public/`

---

## [2026-03-25] — New Case Study: American Youth Dance Theater

**Scope:** `lib/data.ts`

**Changes:**
- Added `"american-youth-dance-theater"` entry to `projectsData` (5th project card — MT2 row)
- Added full `projectDetailData` entry with all required sections: overview, challenge (3 steps), solution (3 features), color palette (4 swatches + rationale), outcomes (3 metrics), and nextProject link
- Updated `uber-app` `nextProject` to route to AYDT (previously looped back to coaching-consulting-website)
- AYDT `nextProject` loops back to `coaching-consulting-website`, completing the circuit
- Hero image (`/case_study_aydt_mobile.png`) not yet added — detail page falls back to animated placeholder until screenshot is provided

**Content Summary:**
- Year: 2025 · Role: Freelance Developer · Type: Performing Arts Website
- Stack: Next.js, TypeScript, Tailwind, Sass
- Color palette: Stage Charcoal `#1a1a2e`, Warm Ivory `#f5f0e8`, Spotlight Rose `#e05c6e`, Stage Gold `#c9963a`
- Outcomes: +52% online enrollment, 2× advance ticket sales, 96 Lighthouse score

---

*Log maintained by Claude Code. Updated automatically with each UI/design/animation change.*
