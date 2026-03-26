// Preserved for FlipperAnimation (commented out in intro.tsx — for future iteration)
export const lines = Array(200).fill("WEB DEVELOPER") as string[];

export const links = [
  {
    name: "Home",
    hash: "#home",
  },
  {
    name: "About",
    hash: "#about",
  },
  {
    name: "Projects",
    hash: "#projects",
  },
  {
    name: "Experience",
    hash: "#experience",
  },
  {
    name: "Contact",
    hash: "#contact",
  },
] as const;

export const experiencesData = [
  {
    company: "Chainlift / LiftKit",
    role: "Front-End Engineer",
    companyDescription:
      "LiftKit—a design system based on the golden ratio. At its core, LiftKit is powered by a set of formulas that drive a global scaling system, making it unique in how it scales design elements",
    roleDescription:
      "I contributed to developing the component library for LiftKit—a design system based on the golden ratio. ",
    image1: "/liftkit.mov",
    image2: "/liftkit-docs.mov",
    button1: {
      label: "Checkout Chainlift.is",
      href: "https://www.chainlift.io/",
    },
    button2: {
      label: "Read LiftKit Docs",
      href: "https://www.chainlift.io/liftkit",
    },
  },
  {
    company: "Madasa Collection",
    role: "Lead Web Developer",
    companyDescription:
      "A digital product studio that helps businesses launch to their full potential",
    roleDescription:
      "Directed the development process, working alongside a senior designer, coordinating with clients, and mentoring a fellow engineer",
    image1: "/madasa.mov",
    image2: "/madasa-team.mov",
    button1: {
      label: "Checkout MadasaCollective.com",
      href: "https://www.madasacollective.com/",
    },
    button2: {
      label: "View Business Proposal",
      href: "https://www.canva.com/design/DAF-mBhPfaA/i8H6H6r_sPlcZJUq6ZRH8g/view?utm_content=DAF-mBhPfaA&utm_campaign=designshare&utm_medium=link&utm_source=editor",
    },
  },
] as const;

export const projectsData = [
  {
    eyebrow: "American Youth Dance Theater",
    title: "Studio Registration Portal",
    description:
      "Replaced a $15,000/year SaaS platform consuming ~80% of net profit with a purpose-built system the studio owns outright, cutting annual costs to $780–$1,908 and projecting $44,100 in savings over five years.",
    tags: [
      { name: "Next.js", color: "#e86a20" },
      { name: "TypeScript", color: "#5888c8" },
      { name: "Supabase", color: "#3ecf8e" },
      { name: "Tailwind", color: "#7aa4d8" },
      { name: "Sass", color: "#c83488" },
    ],
    imageUrl: "/aydt-portal-hero.png",
    href: "https://github.com/radodd/aydt-registration-admin-portal",
    hrefLabel: "View on GitHub →",
    comingSoon: "May 2026",
    featured: true,
    slug: "american-youth-dance-theater",
  },
  {
    eyebrow: "MRC Rock & Sand",
    title: "Natural Stone Quote Platform",
    description:
      "Grew organic clicks 14× and moved from position 21.8 to 5.1 on Google Search, with a 6.64% CTR nearly triple the pre-launch baseline, for a family-owned natural stone supplier replacing a fragmented multi-brand identity.",
    tags: [
      { name: "Next.js", color: "#e86a20" },
      { name: "TypeScript", color: "#5888c8" },
      { name: "Tailwind", color: "#7aa4d8" },
      { name: "Sass", color: "#c83488" },
      { name: "Node.js", color: "#68a063" },
      { name: "Supabase", color: "#3ecf8e" },
    ],
    imageUrl: "/case_study_mrc_desktop.png",
    href: "https://www.stonesuppliers.net/",
    slug: "mrc-rock-and-sand",
  },
  {
    eyebrow: "Jen Fulton Consultancy",
    title: "Private Practice Platform",
    description:
      "+68% consultation requests and 3.2× mobile session duration in the first 60 days, for a dual-practice provider serving therapy clients and high-performance athletes from a single site.",
    tags: [
      { name: "Next.js", color: "#e86a20" },
      { name: "TypeScript", color: "#5888c8" },
      { name: "Tailwind", color: "#7aa4d8" },
      { name: "Sass", color: "#c83488" },
    ],
    imageUrl: "/case_study_gen_mobile.png",
    href: "https://genfulton.com",
    slug: "coaching-consulting-website",
  },
  {
    eyebrow: "Madasa Collective",
    title: "Digital Studio & Agency Site",
    description:
      "Reached page-one placement organically, ranking top 6 for brand queries and position 4.1 on the /projects page, with a perfect 100 Lighthouse score and zero paid campaigns.",
    tags: [
      { name: "Next.js", color: "#e86a20" },
      { name: "TypeScript", color: "#5888c8" },
      { name: "Tailwind", color: "#7aa4d8" },
      { name: "Sass", color: "#c83488" },
    ],
    imageUrl: "/case_study_madasa_mobile.png",
    href: "https://www.madasacollective.com",
    slug: "madasa-collective",
  },
] as const;

// ─── PROJECT DETAIL DATA ───────────────────────────────────────

export interface ProjectDetailFeature {
  icon: string;
  title: string;
  body: string;
  color: "blue" | "orange" | "pink";
}

export interface ProjectDetailStep {
  title: string;
  body: string;
}

export interface ProjectColorSwatch {
  hex: string;
  name: string;
  role: string;
}

export interface ProjectColorPalette {
  label?: string; // only used when a project has multiple palettes
  rationale: string;
  swatches: ProjectColorSwatch[];
}

export interface ProjectDetail {
  slug: string;
  year: string;
  role: string;
  type: string;
  integrations: string[];
  eyebrowCategory: string;
  heroLine1: string;
  heroLine2: string;
  liveUrl?: string;
  codeUrl?: string;
  mockUrl: string;
  adminMock?: {
    imageUrl: string;
    mockUrl: string;
  };
  overview: {
    title: string;
    body: string[];
  };
  challenge: {
    title: string;
    steps: ProjectDetailStep[];
  };
  solution: {
    title: string;
    body: string[];
    features: ProjectDetailFeature[];
  };
  colorPalette: ProjectColorPalette;
  colorPalettes?: ProjectColorPalette[]; // replaces colorPalette when a project has multiple surfaces
  outcomes: {
    num: string;
    label: string;
    sub: string;
  }[];
  nextProject: {
    slug: string;
    label: string;
    title: string;
    sub: string;
  };
}

export const projectDetailData: ProjectDetail[] = [
  {
    slug: "coaching-consulting-website",
    year: "2024",
    role: "Freelance Developer",
    type: "Coaching & Consulting Website",
    integrations: ["Calendly", "Google Analytics 4", "Google Tag Manager"],
    eyebrowCategory: "Web Design & Development",
    heroLine1: "Gen Fulton",
    heroLine2: "Consultancy",
    liveUrl: "https://genfulton.com",
    mockUrl: "genfulton.com",
    overview: {
      title: "A private practice built around the client's story",
      body: [
        "Designed and developed a full client-facing website for Gen Fulton — a licensed psychotherapist and performance coach whose practice spans two very different audiences: individuals and couples seeking therapy for trauma, burnout, and relationship issues, and high-performing athletes and executives seeking a competitive mental edge.",
        "The client needed a site that could speak authentically to both groups simultaneously — warm and approachable enough for someone in emotional distress, credible and results-oriented enough for a professional athlete. That required <strong>intentional copy architecture and audience routing</strong>, not just visual polish.",
      ],
    },
    challenge: {
      title: "Trust-first, conversion-second",
      steps: [
        {
          title: "Establishing Credibility",
          body: "Potential clients research providers carefully. The site needed to communicate expertise and warmth simultaneously, without generic stock photography or boilerplate copy.",
        },
        {
          title: "Mobile Conversion Paths",
          body: "The majority of the client base discovers services on mobile. Booking flows had to be prominent without feeling pushy — soft CTAs with clear affordances.",
        },
        {
          title: "Content Architecture",
          body: "A trauma client and a PGA Tour athlete landing on the same page carry completely different needs and emotional states. The service areas — sports performance coaching, stress/burnout, couples counseling, trauma/PTSD — each required distinct messaging and tone, without forking the site into separate experiences.",
        },
      ],
    },
    solution: {
      title: "Three decisions, each answering a specific problem",
      body: [
        "Credibility for a dual-practice provider isn't just about listing credentials — it's about <strong>when and how you surface them</strong>. The intro section leads with Gen's voice and approach, not her titles. Qualifications are present but tucked behind a collapsible panel, available for the visitor who needs that reassurance without front-loading the experience for those who don't.",
        "The core routing problem — serving a trauma client and a professional athlete on the same page — was solved with <strong>four question-framed expertise cards</strong> (Sports Performance, Stress/Burnout, Relationship, Trauma/PTSD). Each card opens with a direct prompt ('Do you need help focusing under pressure?') so visitors self-identify without the site having to assume who they are.",
        "Booking on mobile was designed to be present without being aggressive. A single CTA — <em>Free Consultation</em> — persists in the nav at every scroll depth, framed as an invitation. The conversion step routes to a Calendly embed so it feels like scheduling, not committing.",
      ],
      features: [
        {
          icon: "layers",
          title: "Layered credibility",
          body: "Credentials surface on demand via a collapsible panel — reassurance is available without dominating the first impression.",
          color: "blue",
        },
        {
          icon: "git-branch",
          title: "Audience self-routing",
          body: "Question-led expertise cards let visitors identify their own need and route into the right service track naturally.",
          color: "orange",
        },
        {
          icon: "calendar",
          title: "Frictionless booking",
          body: "Persistent mobile CTA and a Calendly-backed entry point reduce the conversion step to a scheduling action.",
          color: "pink",
        },
      ],
    },
    colorPalette: {
      rationale:
        "A deep teal anchors the site in calm authority — the same palette register as medical and wellness institutions, but warmer than corporate blue. Violet CTAs were chosen deliberately over teal-adjacent hues to create a moment of contrast that draws the eye without aggression. The warm cream background keeps the reading experience soft and inviting, while the dark navy grounds typography and prevents the lightness from reading as cheap.",
      swatches: [
        {
          hex: "#1d5068",
          name: "Teal Deep",
          role: "Hero & section backgrounds — calm authority",
        },
        {
          hex: "#7255bd",
          name: "Soft Violet",
          role: "CTAs — gentle urgency without pressure",
        },
        {
          hex: "#ede8de",
          name: "Warm Cream",
          role: "Content backgrounds — approachable warmth",
        },
        {
          hex: "#1a2535",
          name: "Dark Navy",
          role: "Typography — grounded, legible authority",
        },
      ],
    },
    outcomes: [
      {
        num: "+68%",
        label: "Consultation Requests",
        sub: "Compared to the prior provider site, measured over the first 60 days post-launch.",
      },
      {
        num: "3.2×",
        label: "Mobile Session Duration",
        sub: "Average time-on-site nearly tripled on mobile vs. the previous site.",
      },
      {
        num: "98",
        label: "Lighthouse Score",
        sub: "Performance, accessibility, and SEO scores across desktop and mobile.",
      },
    ],
    nextProject: {
      slug: "mrc-rock-and-sand",
      label: "Next Project · E-Commerce",
      title: "MRC Rock & Sand",
      sub: "Natural stone e-commerce platform — Next.js · TypeScript · Tailwind · Sass · Supabase",
    },
  },
  {
    slug: "mrc-rock-and-sand",
    year: "2024",
    role: "Freelance Developer",
    type: "E-Commerce & Catalog Platform",
    integrations: ["Resend", "Google Tag Manager", "Google Analytics 4", "Schema Markup", "Sentry", "Upstash Redis"],
    eyebrowCategory: "E-Commerce",
    heroLine1: "MRC",
    heroLine2: "Rock & Sand",
    liveUrl: "https://www.stonesuppliers.net/",
    mockUrl: "stonesuppliers.net",
    overview: {
      title: "Building one platform for a business that was three",
      body: [
        "Built a full-scale e-commerce and catalog platform for MRC Rock & Sand — a family-owned natural stone materials supplier operating under multiple brands simultaneously, including Santa Paula Materials and the emerging Stoneyard umbrella. The platform lives at stonesuppliers.net.",
        "Beyond the catalog itself, the engagement required helping the client consolidate their identity into something a customer could actually understand. The platform needed to serve two distinct audiences: <strong>contractors placing bulk orders</strong> and landscapers sourcing materials for client projects — each with different browsing intent, vocabulary, and conversion needs. Equally important was ensuring the new interface didn't disrupt the existing customer base — the goal was to build toward the existing clientele, making the transition to the new platform as seamless as possible for them.",
      ],
    },
    challenge: {
      title: "Catalog scale meets consumer-grade UX",
      steps: [
        {
          title: "Brand Identity Consolidation",
          body: "The client operated under three names simultaneously — MRC Rock & Sand, Santa Paula Materials, and the emerging Stoneyard brand — with no clear internal hierarchy. Building toward a unified identity while the business itself was still defining that identity required constant communication and scope decisions we hadn't originally planned for.",
        },
        {
          title: "Material Data Complexity",
          body: "~50 SKUs across material types, colors, textures, and use-cases needed a filterable, browsable interface that didn't require a manual.",
        },
        {
          title: "Dual Audience Routing",
          body: "Landscapers need material specs and project suitability; contractors need bulk ordering and availability. Navigation had to serve both without forking the experience or leaving existing customers behind.",
        },
      ],
    },
    solution: {
      title: "Design for where they're going, not where they were",
      body: [
        "Rather than trying to represent all three operating names equally, we committed to <strong>MRC Rock & Sand</strong> as the visual anchor — establishing a consistent design language across color, typography, and layout that the business could grow into as the rebrand progressed. That decision drove almost every subsequent design choice and gave the client a platform with a clear identity rather than one that hedged.",
        "The materials catalog handles browsability through <strong>faceted, persistent filtering</strong> across category, color, texture, and use-case — so contractors can narrow inventory without a manual. Navigation serves both audiences from the same structure: landscapers can browse by material aesthetics and project suitability, while contractors can filter by specs and availability, without forking the experience or leaving existing customers behind.",
      ],
      features: [
        {
          icon: "layers",
          title: "MRC Rock & Sand-first identity",
          body: "Committed to MRC Rock & Sand as the visual anchor — unified color system, typography, and layout across all three operating names.",
          color: "blue",
        },
        {
          icon: "zap",
          title: "Faceted material filtering",
          body: "~50 SKUs browsable by category, color, texture, and application type — persistent filter state across the full catalog.",
          color: "orange",
        },
        {
          icon: "database",
          title: "One nav, two audiences",
          body: "Landscapers and contractors share the same navigation and catalog pages — material detail pages carry specs for both browsing intents without forking the experience.",
          color: "pink",
        },
      ],
    },
    colorPalette: {
      rationale:
        "The founders are Croatian. One look at the Adriatic and the palette makes complete sense. That heritage drove the color direction entirely. The deep teal navy and lighter brand teal are both a nod to that origin. The off-white cream grounds the catalog in the materials themselves — warm, natural, tactile. Dark charcoal type keeps everything readable and trade-appropriate.",
      swatches: [
        {
          hex: "#1d3d52",
          name: "Deep Teal Navy",
          role: "Brand — hero backdrop & primary depth",
        },
        {
          hex: "#1b7a88",
          name: "Brand Teal",
          role: "Accent — headings, CTAs & interactive elements",
        },
        {
          hex: "#f8f6f2",
          name: "Natural Stone",
          role: "Background — warm material cream",
        },
        {
          hex: "#2a2a2a",
          name: "Charcoal",
          role: "Typography — high contrast",
        },
      ],
    },
    outcomes: [
      {
        num: "14×",
        label: "Organic Click Growth",
        sub: "Monthly clicks climbed from 7 to 99 over 12 months — entirely driven by search visibility gains post-launch.",
      },
      {
        num: "Top 5",
        label: "Avg. Search Position",
        sub: "Site moved from position 21.8 to 5.1 on Google Search, landing on page one for key local queries.",
      },
      {
        num: "6.64%",
        label: "Click-Through Rate",
        sub: "CTR nearly tripled from 2.46% to 6.64%, reflecting content and metadata that matches real user intent.",
      },
    ],
    nextProject: {
      slug: "madasa-collective",
      label: "Next Project · Agency Website",
      title: "Madasa Collective",
      sub: "Digital product studio — Next.js · TypeScript · Tailwind · Sass",
    },
  },
  {
    slug: "madasa-collective",
    year: "2024",
    role: "Lead Web Developer",
    type: "Agency Website",
    integrations: ["Resend", "Google Tag Manager", "Google Analytics 4"],
    eyebrowCategory: "Web Design",
    heroLine1: "Madasa",
    heroLine2: "Collective",
    liveUrl: "https://www.madasacollective.com",
    mockUrl: "madasacollective.com",
    overview: {
      title: "The studio behind the work",
      body: [
        "Madasa Collective is the digital product studio I built through — the business behind Gen Fulton Consultancy, MRC Rock & Sand, and the other client work in this portfolio. I was the lead developer and, for most engagements, the only developer on the team, working alongside two designers.",
        "Building our own site meant solving the same problem our clients come to us with: <strong>before you can build anything, you have to know who you are.</strong> The website was the last thing we made — and the most personal.",
      ],
    },
    challenge: {
      title: "Identity before interface",
      steps: [
        {
          title: "Defining the brand",
          body: "Before a single component was written, the team had to answer harder questions: who is Madasa Collective, what do we stand for, and who are we trying to attract? The branding process wasn't a phase — it was the challenge.",
        },
        {
          title: "Presenting a small team as a studio",
          body: "Three people across two disciplines needed to read as a cohesive creative force, not a collection of freelancers. The site structure and visual language had to do that work without overstating what we were.",
        },
        {
          title: "Attracting the right clients",
          body: "The site needed to filter for clients who valued craft and intentionality — not just convert whoever landed on it. Tone and restraint were as important as layout.",
        },
      ],
    },
    solution: {
      title: "A palette worth building around",
      body: [
        "The color system is what I'm most proud of on this project. Orange, electric blue, and vivid magenta on a near-black background — energizing without being chaotic, creative without being loud. It communicates exactly what a studio that builds things for a living should communicate.",
        "I liked it so much it <strong>became the DNA for this portfolio</strong>. The same hue relationships, the same dark-mode-first logic. When a palette is strong enough to carry two separate brands, that's not a coincidence — that's a design decision that held.",
      ],
      features: [
        {
          icon: "palette",
          title: "Color-led identity",
          body: "The orange–blue–magenta triad became the studio's visual signature — and later, the foundation for this portfolio's palette.",
          color: "blue",
        },
        {
          icon: "users",
          title: "Small team, cohesive brand",
          body: "Three people across two disciplines presented as a unified studio — the site structure and visual language did the heavy lifting.",
          color: "orange",
        },
        {
          icon: "zap",
          title: "Craft as proof of concept",
          body: "The studio site is the pitch. Every layout decision, animation, and typographic choice is an argument for what we can do for a client.",
          color: "pink",
        },
      ],
    },
    colorPalette: {
      rationale:
        "A warm peach canvas keeps the site approachable and human — this is a studio that works with people, not a cold tech product. Orange leads as the energy color: it anchors the hero, the testimonials section, and the primary CTA. Blue carries the work — the portfolio section lives in it. Magenta is the conversion color, reserved for the 'Schedule a Call' button so it never competes with anything else on screen. The same orange–blue–magenta hue family later became the DNA for this portfolio, remapped onto a dark canvas.",
      swatches: [
        {
          hex: "#fce8d0",
          name: "Warm Peach",
          role: "Background — approachable, human warmth",
        },
        {
          hex: "#e86a20",
          name: "Brand Orange",
          role: "Hero, testimonials & primary energy",
        },
        {
          hex: "#5080c8",
          name: "Cornflower Blue",
          role: "Portfolio section — work & credibility",
        },
        {
          hex: "#c83488",
          name: "Vivid Magenta",
          role: "CTA only — conversion without competition",
        },
      ],
    },
    outcomes: [
      {
        num: "Top 6",
        label: "Avg. Search Position",
        sub: "Ranks in the top 6 for brand queries organically, peaking at position 5.6 without a paid campaign.",
      },
      {
        num: "4.1",
        label: "Projects Page Rank",
        sub: "The /projects page reached position 4.1 — page-one placement with no dedicated SEO work.",
      },
      {
        num: "100",
        label: "Lighthouse Score",
        sub: "Perfect performance, accessibility, best practices, and SEO scores.",
      },
    ],
    nextProject: {
      slug: "american-youth-dance-theater",
      label: "Next Project · Performing Arts",
      title: "American Youth Dance Theater",
      sub: "Nonprofit performing arts website — Next.js · TypeScript · Tailwind · Sass",
    },
  },
  {
    slug: "american-youth-dance-theater",
    year: "2026",
    role: "Freelance Developer",
    type: "Custom Registration Portal",
    integrations: ["Twilio SMS", "Resend", "Elevon", "Sentry", "Upstash Redis"],
    eyebrowCategory: "Full-Stack Application",
    heroLine1: "American Youth",
    heroLine2: "Dance Theater",
    liveUrl: "https://www.aydance.org",
    mockUrl: "aydance.org",
    overview: {
      title: "A platform fee consuming 80% of net profit",
      body: [
        "American Youth Dance Theater — a NYC dance studio operating since 1996 across two locations (Upper East Side and Washington Heights) — had been running their entire enrollment operation on Active, a registration platform built for outdoor recreational events like camping and sports leagues. The $15,000 annual license fee represented <strong>nearly 80% of the studio's net profit</strong>. It had no native concept of dance divisions, recital cycles, or per-class fee conditions — and its volume-based pricing model was designed to scale costs upward as AYDT grew.",
        "The project brief was clear: build a simple, affordable, purpose-built replacement. Not another SaaS subscription. A <strong>platform AYDT owns outright</strong> — with full control over its UX, its data, and its operating costs. The result is a dual-surface system: a consumer-facing enrollment portal for families and a full admin operations dashboard for studio staff, both powered by a single Supabase backend.",
      ],
    },
    challenge: {
      title: "Four problems Active created",
      steps: [
        {
          title: "A Cost Structure That Scaled Against Growth",
          body: "At $15,000/year — nearly 80% of net profit — Active's volume-based pricing meant the more AYDT grew, the more they'd pay. There was no path to profitability without replacing the platform. The studio needed a cost model it could forecast and a system it owned.",
        },
        {
          title: "An Archaic, Non-Mobile Platform",
          body: "Active was built for desktop and designed for outdoor recreational event management — camps, sports leagues, community programs. It wasn't mobile-friendly, and it had no domain model for dance: no divisions, no recital cycles, no multi-dancer family accounts, no class-level fee conditions. Every AYDT workflow required a workaround.",
        },
        {
          title: "No Analytics or UX Control",
          body: "AYDT had no visibility into how families moved through the registration flow — no engagement data, no conversion tracking, no marketing performance. The platform owned the experience and the data. Switching systems meant reclaiming both.",
        },
      ],
    },
    solution: {
      title: "Ownership, forecastability, and a schema built for dance",
      body: [
        "The build was structured around three goals from the proposal: <strong>complete ownership</strong> (eliminate recurring license fees with a system the studio controls), <strong>forecastability</strong> (open-source infrastructure with transparent, stable costs), and <strong>reclaiming the UX and data layer</strong> (full analytics visibility via Google Analytics 4 and Sentry). The decision to build a custom solution rather than renew Active's license pays for itself immediately. Running on Vercel, Supabase, and Resend, AYDT's infrastructure costs fall from $15,000/year to an estimated <strong>$780–$1,908/year</strong> — the same capability at a fraction of the price.",
        "The backend is a <strong>65-table Supabase schema</strong> modeled around how a dance studio actually operates. The fee engine is the most complex component: enrollment cost is resolved server-side by evaluating a conditional rule chain — division, class count, semester type, multi-dancer family discounts, and coupons — in sequence. Automatic fees (registration, recital, costume) attach or detach based on class properties, not user input. Data migration from Active runs as a three-step pipeline: clean and archive inactive records from Active, populate the Supabase database, then seed Resend with user data and trigger welcome emails — executable at any time without interrupting the existing system.",
      ],
      features: [
        {
          icon: "database",
          title: "65-table domain model",
          body: "Schema purpose-built for dance studio operations — divisions, recital cycles, multi-dancer family accounts, and class-level fee structures all modeled correctly.",
          color: "blue",
        },
        {
          icon: "zap",
          title: "Server-side fee engine",
          body: "Enrollment cost resolved via conditional rule chain: division → class count → semester → family discounts → coupons, all calculated before the cart confirms.",
          color: "orange",
        },
        {
          icon: "layers",
          title: "Zero-to-ownership cost model",
          body: "$15k/year license replaced with $780–$1,908/year in infrastructure — on free-tier services the studio owns outright, with no volume-based scaling.",
          color: "pink",
        },
      ],
    },
    colorPalette: {
      rationale: "",
      swatches: [],
    },
    colorPalettes: [
      {
        label: "Client Portal",
        rationale:
          "The client portal leads with a near-black hero — it reads as a stage before the first word registers, placing the studio's 30-year identity front and center. The violet-to-rose gradient on 'Center Stage' is the only decorative moment; it earns that prominence by being the only color that isn't load-bearing. Below the hero, the portal content lives on a cool lavender-tinted off-white — not pure white, but close enough to feel neutral while still belonging to the same color family as the hero.",
        swatches: [
          {
            hex: "#18141c",
            name: "Stage Black",
            role: "Hero background — theatrical depth, immediate authority",
          },
          {
            hex: "#b89af0",
            name: "Stage Violet",
            role: "Gradient start — left side of the 'Center Stage' heading",
          },
          {
            hex: "#e882c2",
            name: "Stage Rose",
            role: "Gradient end — right side, warmth paired with performing arts identity",
          },
          {
            hex: "#f4f2f9",
            name: "Portal Surface",
            role: "Content background — lavender-tinted off-white for enrollment flows",
          },
        ],
      },
      {
        label: "Admin Portal",
        rationale:
          "The admin surface flips to a light, high-contrast environment — staff spending hours in the dashboard need legibility over atmosphere. Deep crimson anchors the primary actions: warm enough to feel branded without competing with the data-dense tables and registration lists that dominate the screen. Light bone grounds the table backgrounds; dark slate keeps operational data readable across long work sessions.",
        swatches: [
          {
            hex: "#8b1a2c",
            name: "Deep Crimson",
            role: "Primary actions — branded authority in a data-dense surface",
          },
          {
            hex: "#f5f4f1",
            name: "Light Bone",
            role: "Table backgrounds — calm foundation for dense data views",
          },
          {
            hex: "#1e2530",
            name: "Dark Slate",
            role: "Data typography — maximum contrast for operational clarity",
          },
          {
            hex: "#ffffff",
            name: "Clean White",
            role: "Content surfaces — base for forms, panels, and modals",
          },
        ],
      },
    ],
    adminMock: {
      imageUrl: "/aydt-admin-hero.png",
      mockUrl: "admin.aydance.org",
    },
    outcomes: [
      {
        num: "$44,100",
        label: "5-Year Savings (Projected)",
        sub: "Worst-case analysis: $75k with Active vs. $30,900 with the custom portal over 5 years. Break-even in Year 3.",
      },
      {
        num: "~80%",
        label: "of Net Profit Freed",
        sub: "Active's $15k annual fee represented nearly 80% of AYDT's net profit. The new platform costs $780–$1,908/year.",
      },
      {
        num: "Apr 30",
        label: "Launch Target",
        sub: "19-week build: Discovery → Backend → Portal → Admin → Email & Analytics → QA → Launch & data migration.",
      },
    ],
    nextProject: {
      slug: "coaching-consulting-website",
      label: "Back to First · Web Design",
      title: "Coaching & Consulting",
      sub: "Private practice website — Next.js · TypeScript · Tailwind · Sass",
    },
  },
];
