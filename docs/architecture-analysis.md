# Portfolio — Architectural Analysis

> Last updated: 2026-03-23
> Stack: Next.js 13.5.6 | React 18.2 | TypeScript 5.1 | Tailwind CSS 3.3 | SCSS Modules | Framer Motion | GSAP | Resend

---

## What's Being Done Well

### 1. Component Architecture

- Clean separation of concerns — each UI section (Intro, About, Projects, Experience, Contact, Skills) is its own component in `components/`
- Data-driven design — all portfolio content lives in `lib/data.ts` and is passed to components as props. Adding/removing projects or experiences requires zero component changes.
- TypeScript interfaces defined for component props (`ProjectsDataTypes`, `ExperiencesDataTypes`, `DoubleYProps`, `GradientCursorProps`, etc.)
- Shared context for active section tracking via `context/active-section-context.tsx` — clean React pattern with a `createContext`/`useContext` pair and proper null-check error boundary in the consumer hook

### 2. Interactive Animations (Standout Feature)

This is the portfolio's strongest technical differentiator.

- **Gradient Cursor** (`components/cursor/gradient-cursor.tsx`)
  GSAP-powered 4-color gradient blob that follows the mouse and expands on hover over the About section. Uses linear interpolation (`lerp`) for smooth trailing with configurable delay per circle. Disabled on mobile (<=640px). Uses `mix-blend-difference` for visual contrast. This is genuinely impressive and memorable.

- **Mouse-Following Parallax** on projects (`components/projects.tsx`) and experience videos (`components/doubleY.tsx`)
  `requestAnimationFrame`-based smooth interpolation that dynamically adjusts container width/height splits (66/33 ratio) based on mouse position. Clean implementation with proper RAF lifecycle (request on first move, cancel when settled). Includes mobile detection to disable on small screens.

- **Flipper Text Animation** (`components/flipper-animation.tsx`)
  CSS `translateY` ticker cycling through text lines every 2 seconds. Combined with a gradient `mask-shift` keyframe on the text itself that creates a horizontal shimmer effect. Uses Bebas Neue font for visual impact. Background hero image uses CSS `mask-image` with intersecting gradients for edge fade.

- **Animated Background Blobs** (`components/blob-layer.tsx`)
  Two large blurred gradient circles (`bg-secondary` and `bg-accent`) with CSS keyframe float animations at different speeds. Simple but effective ambient background.

- **Framer Motion** used appropriately for entrance animations:
  - About section: fade-in with upward slide (`initial={{ opacity: 0, y: 100 }}`)
  - Skills: staggered reveal with 50ms delay per item
  - AboutButtons: slide-up from below
  - Contact: viewport-triggered fade-in (`whileInView`)
  - Header: drop-in from top

### 3. Server Actions & Contact Form

- `actions/sendEmail.ts` uses Next.js server actions correctly — `"use server"` directive, proper input validation via `validateString()` before hitting the Resend API
- Email template built with `@react-email/components` and `@react-email/tailwind` — professional, maintainable approach (`email/contact-form-email.tsx`)
- Error handling via `getErrorMessage()` utility (`lib/utils.ts`) that gracefully handles `Error` instances, objects with `message` property, plain strings, and unknown types

### 4. Custom Hooks

- **`useSectionInView`** (`lib/hooks.ts`) — clean abstraction combining `react-intersection-observer` with active section context. Includes a 1-second debounce after manual nav clicks (`Date.now() - timeOfLastClick > 1000`) to prevent scroll-triggered section changes from overriding intentional navigation. Well thought out.
- **`useActiveSectionContext`** (`context/active-section-context.tsx`) — proper context hook with null-check guard that throws a descriptive error if used outside the provider

### 5. Styling System

- SCSS modules for component-specific styles — good encapsulation, no class name collisions
- Shared breakpoint system in `scss/queries.scss` with reusable mixins: `from-small-up` (641px+), `mid-break` (768-1024px), `large-break` (1024px+), plus custom breakpoints
- Reusable `section-padding` mixin for consistent spacing
- Color palette centralized in SCSS (`$colors` map in `queries.scss`) and Tailwind config
- Mobile-first responsive approach with dedicated breakpoint handling

### 6. Deployment & Analytics

- Vercel-ready (standard Next.js deployment)
- `@vercel/analytics` integrated in layout
- Google Tag Manager (GTM-K9SLWTD2) with both script and noscript fallback
- Resume PDF hosted at `/Ethan Flores_Resume.pdf` and downloadable via CTA button

---

## What Needs Improvement

### 1. Disabled/Broken Features

| Issue | File | Line(s) | Severity |
|-------|------|---------|----------|
| Header navigation commented out | `app/layout.tsx` | 40 | **Critical** — visitors have no way to navigate except scrolling |
| Skills section commented out | `app/page.tsx` | 30-32 | **High** — complete component hidden for no apparent reason |
| Header styled for light theme | `components/header.tsx`, `scss/header.module.scss` | — | **High** — uncommenting without restyling will look broken on `bg-slate-800` |

**Header color mismatch details:**
- Background: `rgba(255, 255, 255, 0.7)` — white glass, needs to be dark
- Nav text: `text-gray-500` with `hover:text-gray-950` — dark text on dark bg = invisible
- Active pill: `bg-gray-200` — light gray won't read on dark background
- Border: `rgba(255, 255, 255, 0.4)` — too bright for dark theme

### 2. Code Quality Issues

| Issue | File | Line(s) |
|-------|------|---------|
| 154 identical `"WEB DEVELOPER"` strings in `lines` array | `lib/data.ts` | 45-199 |
| Dangling JSX at module scope (outside component) | `components/blob-layer.tsx` | 20-25 |
| Dead component — never rendered | `components/painter.tsx` | entire file |
| Dead component — imported but commented out | `components/slider-animation.tsx` | entire file |
| `SliderAnimation` imported but commented out | `components/intro.tsx` | 4, 15 |
| Unused import: `format` from `"path"` | `components/contact.tsx` | 7 |
| Commented-out import | `actions/sendEmail.ts` | 5 |
| `experimental_useFormStatus` alias | `components/submit-btn.tsx` | 3 |
| Commented-out multi-instance refs/effects | `components/flipper-animation.tsx` | 17-18, 22-23, 31-36, 56-71 |
| Large blocks of commented-out Shadcn CSS variables | `tailwind.config.js` | 29-70 |
| Dead CSS boilerplate at top of file | `app/globals.css` | 1-27 |
| Commented-out Shadcn base layer | `app/globals.css` | 101-108 |
| `components.json` configured for Shadcn but zero Shadcn components exist | `components.json` | — |

### 3. Data & Content Gaps

- **Only 4 projects showcased.** All except Uber share identical tech tags (Next.js, TypeScript, Tailwind, Sass). No full-stack projects visible.
- **AYDT is missing entirely.** This is the most technically impressive project — full-stack Next.js 16 + React 19 + Supabase app with admin portal, multi-step registration wizard, waitlist management, email broadcasts, payment planning. Not represented anywhere.
- **Project descriptions are marketing copy, not engineering accomplishments.** They describe what the product *is* rather than what the developer *built*. Example: "An e-commerce platform that specializes in providing natural stone products..." tells an interviewer nothing about technical skills.
- **Hero says "WEB DEVELOPER"** but `layout.tsx` metadata says "full-stack developer" — inconsistent positioning.
- **About section text undersells skills.** Says "Front End Engineer" despite demonstrating full-stack capabilities. The journey story (Guam → Hawaii → SoCal → Raleigh) has fully built SCSS keyframe animations for each location (`about.module.scss:40-57`, keyframes at lines 76-160) but is commented out in the JSX (`about.tsx:49-59`).

### 4. Styling Inconsistencies

- **No documented convention for Tailwind vs SCSS.** Some components use Tailwind exclusively (`header.tsx`, `about-buttons.tsx`, `contact.tsx`, `skills.tsx`), others use SCSS modules (`projects.tsx`, `experience.tsx`, `flipper-animation.tsx`), several mix both. This creates confusion about which approach to use for new components.

- **Color values drift between systems:**
  | Color | SCSS (`queries.scss`) | Tailwind (`tailwind.config.js`) |
  |-------|----------------------|-------------------------------|
  | secondary | `#467ad4` | `#56B7CB` |
  | All others | Match | Match |

  Plus hardcoded one-off colors: `#fdfbf6` (about text), `#C32D27`/`#F5C63F`/`#457EC4`/`#356FDB` (gradient cursor), `#515260` (tag backgrounds).

- **Body text color is near-black on dark background.** `layout.tsx:27` sets `text-gray-950` on `bg-slate-800`. Works only because every component overrides it — any unstyled text would be invisible.

- **`liftkit` in Tailwind content paths** (`tailwind.config.js:8`) — `"./liftkit/**/*.{js,ts,jsx,tsx,mdx}"` — but no `liftkit/` directory exists. Leftover from Chainlift work.

### 5. Performance Concerns

**Static assets total ~76MB.** Many are unused.

| File | Size | Used? |
|------|------|-------|
| `recording.mp4` | 16MB | No |
| `case_study_mrc_mobile[not used].png` | 11MB | No (name says so) |
| `madasa-team.mov` | 11MB | Yes (experience section) |
| `case_study_gen_desktop.png` | 7.8MB | No (mobile variant used instead) |
| `case_study_mrc_hero_mrc.png` | 6.9MB | No |
| `case_study_madasa_mobile.png` | 6.8MB | Yes |
| `case_study_mrc_desktop.png` | 5.8MB | Yes |
| `selfie2.png` | 4.3MB | Yes (hero background) |
| `case_study_gen_mobile.png` | 3.3MB | Yes |
| `case_study_madasa_desktop.png` | 2.1MB | No |
| `madasa.mov` | 2.4MB | Yes (experience section) |
| `mockup-gen2.png` | 1.5MB | No |
| `liftkit.mov` | 1.4MB | Yes (experience section) |
| `autovantage.png` | 1.2MB | No |

**Used images that need compression:** `selfie2.png` (4.3MB), `case_study_madasa_mobile.png` (6.8MB), `case_study_mrc_desktop.png` (5.8MB), `case_study_gen_mobile.png` (3.3MB). All should be under 500KB for web delivery. Even with `next/image` optimization, the source files are served to the build pipeline at full size.

**Other performance notes:**
- `react` is missing from `package.json` dependencies — only `react-dom` is listed. Works because Next.js bundles React, but is technically incorrect.
- Custom webpack `file-loader` config in `next.config.js` for `.mp4/.webm` — Next.js 13+ handles static assets natively. This is a legacy workaround.

### 6. Missing Features (For Interview Readiness)

- **No footer.** The page ends abruptly after the contact form.
- **No 404 page.**
- **`alert()` for contact form feedback** (`contact.tsx:48-51`). `react-hot-toast` is installed in `package.json` but never imported or used. `alert()` blocks the UI thread and looks unprofessional.
- **No SEO optimization.** Metadata is generic (`"Ethan | Personal Portfolio"`, `"Ethan is a full-stack developer."`). No Open Graph tags for social sharing previews. No structured data.
- **No visible accessibility effort.** No skip-to-content link, no ARIA labels on the interactive gradient cursor or parallax sections, form inputs use `placeholder` instead of proper `<label>` elements.

### 7. Architecture Decisions to Revisit

- **Single-page with no sub-routes.** Everything renders on `app/page.tsx`. Adding the AYDT case study page will be the first real route — there's currently no layout system or shared navigation for sub-pages.
- **`experimental: { serverActions: true }`** in `next.config.js` — required on 13.5.6, but signals outdated config to anyone reviewing. Server actions became stable in Next.js 14.
- **Type packages in `dependencies` instead of `devDependencies`:** `@types/node`, `@types/react`, `@types/react-dom` are build-time only.
- **No `.env.example` file.** The project requires `RESEND_API_KEY` but there's no documentation of this for anyone cloning the repo.
- **`react-vertical-timeline-component` + `@types/react-vertical-timeline-component`** are installed but completely unused — leftover from an abandoned timeline-style experience section (commented-out data at `lib/data.ts:320-353`).

---

## File-by-File Status

| File | Status | Notes |
|------|--------|-------|
| `app/layout.tsx` | Needs fixes | Header commented out, body text color wrong for dark bg, generic metadata |
| `app/page.tsx` | Needs fixes | Skills section commented out, project layout needs restructuring for 4 projects |
| `app/globals.css` | Needs cleanup | Dead CSS boilerplate (lines 1-27), unused Shadcn variables (lines 45-108) |
| `lib/data.ts` | Needs major work | 154 duplicate lines, missing AYDT, weak project descriptions, stale commented code (lines 320-353) |
| `lib/hooks.ts` | Good | Clean, well-designed `useSectionInView` hook |
| `lib/types.ts` | Good | Properly typed — `SectionName`, `Lerp`, `GradientCursorProps`, `MoveCircleProps` |
| `lib/utils.ts` | Good | Solid `validateString` and `getErrorMessage` utilities |
| `lib/useWindow.ts` | Unused | Only imported by `painter.tsx` which is itself unused |
| `components/header.tsx` | Needs restyle | Fully built but colors designed for light theme |
| `components/intro.tsx` | Minor cleanup | Dead `SliderAnimation` import on line 4 |
| `components/flipper-animation.tsx` | Has debt | Heavy commented-out code for multi-instance feature (lines 17-23, 31-36, 56-71) |
| `components/cursor/about.tsx` | Needs content update | Journey story commented out (lines 49-59), "Front End" should be "Full-Stack" |
| `components/cursor/gradient-cursor.tsx` | Good | Impressive GSAP implementation, clean code |
| `components/projects.tsx` | Needs enhancement | No entrance animations, all links forced to `target="_blank"` |
| `components/experience.tsx` | Good | Clean data-driven layout |
| `components/doubleY.tsx` | Good | Solid RAF-based mouse-following animation |
| `components/skills.tsx` | Good | Ready to uncomment — staggered Framer Motion reveal already works |
| `components/about-buttons.tsx` | Good | Clean CTA buttons with proper hover/focus states |
| `components/contact.tsx` | Needs fixes | Uses `alert()` instead of toast, unused `format` import |
| `components/submit-btn.tsx` | Minor | `experimental_useFormStatus` alias |
| `components/section-heading.tsx` | Good | Simple reusable heading |
| `components/section-divider.tsx` | Good | Animated divider with Framer Motion |
| `components/blob-layer.tsx` | Needs cleanup | Dangling JSX outside component export (lines 20-25) |
| `components/painter.tsx` | Delete | Unused canvas drawing component |
| `components/slider-animation.tsx` | Delete | Unused alternative to FlipperAnimation |
| `actions/sendEmail.ts` | Minor cleanup | Commented import on line 5 |
| `email/contact-form-email.tsx` | Good | Clean React Email template |
| `context/active-section-context.tsx` | Good | Proper context pattern with error guard |
| `scss/queries.scss` | Good | Well-organized breakpoints, color map, reusable mixins |
| `scss/about.module.scss` | Good | Impressive per-location highlight keyframes (ready for journey story) |
| `scss/projects.module.scss` | Good | Solid responsive layout with parallax support |
| `scss/experience.module.scss` | Good | Clean layout with video container styling |
| `scss/header.module.scss` | Needs restyle | `background-color: rgba(255,255,255,0.7)` won't work on dark page |
| `scss/flipper-animation.module.scss` | Good | Creative animation system with mask-shift keyframe |
| `scss/home.module.scss` | Good | Simple flex container with responsive gap |
| `scss/intro.module.scss` | Has debt | Multiple commented-out properties |
| `scss/bloblayer.module.scss` | Good | Float keyframe animations |
| `scss/contact.module.scss` | Good | Contact text styling |
| `scss/section-divider.module.scss` | Good | Divider animation |
| `scss/section-heading.module.scss` | Good | Heading styling |
| `scss/slider-animation.module.scss` | Delete | Matches unused component |
| `tailwind.config.js` | Needs cleanup | Dead Shadcn config (lines 29-70), phantom `liftkit` content path |
| `next.config.js` | Minor | `experimental` flag, legacy `file-loader` webpack config |
| `package.json` | Needs cleanup | Missing `react`, unused packages, types in wrong section |
| `components.json` | Decision needed | Shadcn configured but zero components used |
| `public/` | Needs major work | ~76MB of assets, many unused, active images need compression |

---

## Priority Matrix

| Priority | Category | Items |
|----------|----------|-------|
| **P0 — Broken** | Navigation, content | Uncomment header (+ restyle for dark), uncomment Skills |
| **P1 — Content** | Portfolio value | Add AYDT project, rewrite project descriptions, update About text |
| **P2 — Cleanup** | Code quality | Remove dead code/components, fix `lines` array, clean globals.css + tailwind config |
| **P3 — Polish** | UX | Toast notifications, footer, entrance animations, image compression |
| **P4 — Technical** | Maintenance | Remove unused deps, add `.env.example`, fix package.json, unify color system |
| **P5 — Stretch** | SEO/A11y | Open Graph tags, proper form labels, skip-to-content, 404 page |
