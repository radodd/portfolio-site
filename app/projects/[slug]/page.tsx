import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Layers, GitBranch, Calendar, Smartphone, MousePointer2, Zap, Database, Palette, Users } from "lucide-react";
import { projectDetailData, projectsData } from "@/lib/data";
import styles from "@/scss/project-detail.module.scss";
import RevealWrapper from "@/components/reveal-wrapper";
import CoachingAnimationDemo from "@/components/project-demos/coaching-animation-demo";
import CoachingExpertiseDemo from "@/components/project-demos/coaching-expertise-demo";
import MrcSliderDemo from "@/components/project-demos/mrc-slider-demo";
import MadasaHeroDemo from "@/components/project-demos/madasa-hero-demo";
import MadasaCardFlipDemo from "@/components/project-demos/madasa-card-flip-demo";
import { AydtFeeEngineDemo, AydtSchemaConstellationDemo } from "@/components/project-demos/aydt-backend-showcase";

// ─── Tag color helper ─────────────────────────────────────────
function tagClass(color: string) {
  if (color === "#e86a20") return styles.tagOrange;
  if (color === "#c83488") return styles.tagPink;
  return styles.tagBlue;
}

// ─── Feature icon lookup ──────────────────────────────────────
const featureIcons: Record<string, React.ReactNode> = {
  "layers":          <Layers size={15} strokeWidth={1.5} />,
  "git-branch":      <GitBranch size={15} strokeWidth={1.5} />,
  "calendar":        <Calendar size={15} strokeWidth={1.5} />,
  "smartphone":      <Smartphone size={15} strokeWidth={1.5} />,
  "mouse-pointer-2": <MousePointer2 size={15} strokeWidth={1.5} />,
  "zap":             <Zap size={15} strokeWidth={1.5} />,
  "database":        <Database size={15} strokeWidth={1.5} />,
  "palette":         <Palette size={15} strokeWidth={1.5} />,
  "users":           <Users size={15} strokeWidth={1.5} />,
};

// ─── Mock frame content per project ──────────────────────────
function CoachingMock() {
  return (
    <div style={{ position: "relative", overflow: "hidden", height: 560 }}>
      <Image
        src="/genfulton-hero.png"
        alt="Gen Fulton Consultancy website hero section"
        fill
        style={{ objectFit: "cover", objectPosition: "top center" }}
        sizes="(max-width: 768px) 100vw, 72rem"
        priority
      />
    </div>
  );
}

function MRCMock() {
  return (
    <div style={{ position: "relative", overflow: "hidden", height: 560 }}>
      <Image
        src="/stoneyard-hero.png"
        alt="Stoneyard — stonesuppliers.net homepage screenshot"
        fill
        style={{ objectFit: "cover", objectPosition: "top center" }}
        sizes="(max-width: 768px) 100vw, 72rem"
        priority
      />
    </div>
  );
}

function MadasaMock() {
  return (
    <div style={{ position: "relative", overflow: "hidden", height: 560 }}>
      <Image
        src="/madasa-hero.png"
        alt="Madasa Collective — madasacollective.com homepage screenshot"
        fill
        style={{ objectFit: "cover", objectPosition: "top center" }}
        sizes="(max-width: 768px) 100vw, 72rem"
        priority
      />
    </div>
  );
}

function AYDTMock({ height = 560 }: { height?: number }) {
  return (
    <div style={{ position: "relative", overflow: "hidden", height }}>
      <Image
        src="/aydt-portal-hero.png"
        alt="American Youth Dance Theater — enrollment portal homepage"
        fill
        style={{ objectFit: "cover", objectPosition: "top center" }}
        sizes="(max-width: 768px) 100vw, 72rem"
        priority
      />
    </div>
  );
}

function AYDTAdminMock({ height = 560 }: { height?: number }) {
  return (
    <div style={{ position: "relative", overflow: "hidden", height }}>
      <Image
        src="/aydt-admin-hero.png"
        alt="American Youth Dance Theater — admin operations dashboard"
        fill
        style={{ objectFit: "cover", objectPosition: "top center" }}
        sizes="(max-width: 768px) 100vw, 72rem"
      />
    </div>
  );
}

function MockContent({ slug, heroLine1, heroLine2 }: { slug: string; heroLine1: string; heroLine2: string }) {
  if (slug === "coaching-consulting-website") {
    return <CoachingMock />;
  }
  if (slug === "mrc-rock-and-sand") {
    return <MRCMock />;
  }
  if (slug === "madasa-collective") {
    return <MadasaMock />;
  }
  if (slug === "american-youth-dance-theater") {
    return <AYDTMock />;
  }
  return (
    <div className={styles.mockBody}>
      <div className={styles.mockInnerGlow} />
      <div className={styles.mockPlaceholder}>{heroLine1} {heroLine2}</div>
    </div>
  );
}

// ─── Static params ────────────────────────────────────────────
export function generateStaticParams() {
  return projectDetailData.map((p) => ({ slug: p.slug }));
}

// ─── Page ─────────────────────────────────────────────────────
export default function ProjectDetailPage({ params }: { params: { slug: string } }) {
  const detail = projectDetailData.find((p) => p.slug === params.slug);
  const project = projectsData.find((p) => p.slug === params.slug);

  if (!detail || !project) notFound();

  return (
    <>
      {/* ══ HERO — full viewport width ══════════════════════════ */}
      <section className={styles.heroSection}>
        <div className={styles.heroBg}>
          <div className={`${styles.heroBlob} ${styles.heroBlob1}`} />
          <div className={`${styles.heroBlob} ${styles.heroBlob2}`} />
          <div className={`${styles.heroBlob} ${styles.heroBlob3}`} />
          <div className={styles.heroNoise} />
        </div>

        <div className={styles.heroInner}>
          {/* Back link sits at the top */}
          <Link href="/#projects" className={styles.backLink}>
            All Projects
          </Link>

          {/* Hero content pushed to the bottom */}
          <div className={styles.heroContent}>
            <div className={styles.heroEyebrow}>
              <span>Selected Work</span>
              <span className={styles.heroEyebrowSep} />
              <span>{detail.year}</span>
              <span className={styles.heroEyebrowSep} />
              <span>{detail.eyebrowCategory}</span>
            </div>
            <h1 className={styles.heroTitle}>
              <span className={styles.heroLine1}>{detail.heroLine1}</span>
              <span className={styles.heroLine2}>{detail.heroLine2}</span>
            </h1>
            <div className={styles.heroMeta}>
              <span className={`${styles.metaPill} ${styles.metaPillAccent}`}>
                {detail.role === "Personal Project" ? "Personal" : "Freelance"}
              </span>
              <span className={styles.metaDot} />
              {project.tags.map((tag) => (
                <span key={tag.name} className={styles.metaPill}>{tag.name}</span>
              ))}
            </div>
            <div className={styles.heroCTARow}>
              {detail.liveUrl && (
                <a href={detail.liveUrl} target="_blank" rel="noopener noreferrer" className={`${styles.btn} ${styles.btnPrimary}`}>
                  <span>View Live Site</span>
                  <span>↗</span>
                </a>
              )}
              {detail.codeUrl && (
                <a href={detail.codeUrl} target="_blank" rel="noopener noreferrer" className={`${styles.btn} ${styles.btnGhost}`}>
                  <span>View Code</span>
                </a>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ══ REST OF CONTENT — max-width constrained ═════════════ */}
      <div className={styles.page}>

        <div className={styles.gradRule} />

        {/* ── MOCK FRAME(S) ───────────────────────────────────── */}
        <RevealWrapper className={styles.section}>
          {detail.adminMock ? (
            <div className={styles.mockSideBySide}>
              <div>
                <div className={styles.sectionEye} style={{ marginBottom: 12 }}>Client Portal</div>
                <div className={styles.mockFrame}>
                  <div className={styles.mockChrome}>
                    <div className={styles.mockDots}>
                      <div className={`${styles.mockDot} ${styles.mockDotR}`} />
                      <div className={`${styles.mockDot} ${styles.mockDotY}`} />
                      <div className={`${styles.mockDot} ${styles.mockDotG}`} />
                    </div>
                    <div className={styles.mockUrl}>{detail.mockUrl}</div>
                  </div>
                  <AYDTMock height={380} />
                </div>
              </div>
              <div>
                <div className={styles.sectionEye} style={{ marginBottom: 12 }}>Admin Portal</div>
                <div className={styles.mockFrame}>
                  <div className={styles.mockChrome}>
                    <div className={styles.mockDots}>
                      <div className={`${styles.mockDot} ${styles.mockDotR}`} />
                      <div className={`${styles.mockDot} ${styles.mockDotY}`} />
                      <div className={`${styles.mockDot} ${styles.mockDotG}`} />
                    </div>
                    <div className={styles.mockUrl}>{detail.adminMock.mockUrl}</div>
                  </div>
                  <AYDTAdminMock height={380} />
                </div>
              </div>
            </div>
          ) : (
            <div className={styles.mockFrame}>
              <div className={styles.mockChrome}>
                <div className={styles.mockDots}>
                  <div className={`${styles.mockDot} ${styles.mockDotR}`} />
                  <div className={`${styles.mockDot} ${styles.mockDotY}`} />
                  <div className={`${styles.mockDot} ${styles.mockDotG}`} />
                </div>
                <div className={styles.mockUrl}>{detail.mockUrl}</div>
              </div>
              <MockContent
                slug={detail.slug}
                heroLine1={detail.heroLine1}
                heroLine2={detail.heroLine2}
              />
            </div>
          )}
        </RevealWrapper>

        {/* ── OUTCOMES ─────────────────────────────────────────── */}
        <RevealWrapper className={styles.section}>
          <div className={styles.sectionEye}>Outcomes</div>
          <h2 className={styles.sectionTitle} style={{ marginBottom: 8 }}>Results after launch</h2>
          <div className={styles.sectionRule} style={{ marginBottom: 36 }} />
          <div className={styles.threeCol}>
            {detail.outcomes.map((outcome, i) => (
              <div key={i} className={styles.outcomeCard}>
                <div className={styles.outcomeNum}>{outcome.num}</div>
                <div className={styles.outcomeLabel}>{outcome.label}</div>
                <div className={styles.outcomeSub}>{outcome.sub}</div>
              </div>
            ))}
          </div>
        </RevealWrapper>

        {/* ── METADATA ROW ────────────────────────────────────── */}
        <RevealWrapper className={`${styles.section} ${styles.threeCol}`}>
          <div className={styles.detailCard}>
            <div className={styles.detailLabel}>Type</div>
            <div className={styles.detailValue}>{detail.type}</div>
          </div>
          <div className={styles.detailCard}>
            <div className={styles.detailLabel}>Stack</div>
            <div className={styles.tagRow}>
              {project.tags.map((tag) => (
                <span key={tag.name} className={`${styles.tag} ${tagClass(tag.color)}`}>
                  {tag.name}
                </span>
              ))}
            </div>
          </div>
          <div className={styles.detailCard}>
            <div className={styles.detailLabel}>Third-Party Integrations</div>
            <div className={styles.tagRow}>
              {detail.integrations.map((name) => (
                <span key={name} className={`${styles.tag} ${styles.tagBlue}`}>
                  {name}
                </span>
              ))}
            </div>
          </div>
        </RevealWrapper>

        {/* ── OVERVIEW + CHALLENGE ────────────────────────────── */}
        <RevealWrapper className={`${styles.section} ${styles.twoCol}`}>
          <div>
            <div className={styles.sectionEye}>Overview</div>
            <h2 className={styles.sectionTitle}>{detail.overview.title}</h2>
            <div className={styles.sectionRule} style={{ marginBottom: 24 }} />
            {detail.overview.body.map((para, i) => (
              <p key={i} className={styles.prose} dangerouslySetInnerHTML={{ __html: para }} />
            ))}
          </div>
          <div>
            <div className={styles.sectionEye}>Challenge</div>
            <h2 className={styles.sectionTitle}>{detail.challenge.title}</h2>
            <div className={styles.sectionRule} style={{ marginBottom: 24 }} />
            <div className={styles.processList}>
              {detail.challenge.steps.map((step, i) => (
                <div key={i} className={styles.processStep}>
                  <div className={styles.processNum}>{String(i + 1).padStart(2, "0")}</div>
                  <div>
                    <div className={styles.processTitle}>{step.title}</div>
                    <div className={styles.processBody}>{step.body}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </RevealWrapper>

        {/* ── SOLUTION ────────────────────────────────────────── */}
        <RevealWrapper className={styles.section}>
          <div className={styles.sectionEye}>Solution</div>
          <h2 className={styles.sectionTitle} style={{ maxWidth: 560, marginBottom: 8 }}>
            {detail.solution.title}
          </h2>
          <div className={styles.sectionRule} style={{ marginBottom: 40 }} />
          <div className={styles.twoCol}>
            <div>
              {detail.solution.body.map((para, i) => (
                <p key={i} className={styles.prose} dangerouslySetInnerHTML={{ __html: para }} />
              ))}
            </div>
            <div className={styles.featureStack}>
              {detail.solution.features.map((feat, i) => (
                <div key={i} className={styles.featureCard}>
                  <div className={styles.featureIconWrap}>
                    {featureIcons[feat.icon] ?? feat.icon}
                  </div>
                  <div>
                    <div className={styles.featureTitle}>{feat.title}</div>
                    <div className={styles.featureBody}>{feat.body}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </RevealWrapper>

        {/* ── ANIMATION SHOWCASE / BACKEND ─────────────────────── */}
        <RevealWrapper className={styles.section}>
          <div className={styles.sectionEye}>{detail.slug === "american-youth-dance-theater" ? "Backend" : "Motion Design"}</div>
          <h2 className={styles.sectionTitle} style={{ marginBottom: 8 }}>{detail.slug === "american-youth-dance-theater" ? "Architecture & Fee Engine" : "Animation & Interactions"}</h2>
          <div className={styles.sectionRule} style={{ marginBottom: 32 }} />

          {/* Demo 01 — Coaching intro blobs + See More */}
          {detail.slug === "coaching-consulting-website" && (
            <div className={styles.demoCard}>
              <div className={styles.demoCardHeader}>
                <span className={styles.demoCardNum}>01</span>
                <div className={styles.demoCardInfo}>
                  <div className={styles.demoCardTitle}>Intro Section Organic Forms & Credentials Panel</div>
                  <div className={styles.demoCardSub}>A snapshot of the homepage intro as it appears on the live site. Inviting organic forms drift slowly in the background — motion intentionally tuned to feel ambient and calming, not attention-grabbing. The "See More" button progressively reveals Gen's credentials without overwhelming the first impression.</div>
                </div>
                <span className={styles.demoCardBadge}>Interactive</span>
              </div>
              <div className={styles.animationFrame}>
                <CoachingAnimationDemo />
              </div>
            </div>
          )}

          {/* Demo 02 — Expertise cards: scroll scale + blob/icon hover diverge + See More */}
          {detail.slug === "coaching-consulting-website" && (
            <div className={styles.demoCard}>
              <div className={styles.demoCardHeader}>
                <span className={styles.demoCardNum}>02</span>
                <div className={styles.demoCardInfo}>
                  <div className={styles.demoCardTitle}>Expertise Cards Section</div>
                  <div className={styles.demoCardSub}>A snapshot of the Areas of Expertise section. Cards scale in on scroll as they enter the viewport, and on hover the blob and icon pull apart in opposite directions — the goal was tactile energy that signals interactivity without competing with the content or feeling restless.</div>
                </div>
                <span className={styles.demoCardBadge}>Interactive</span>
              </div>
              <div className={styles.animationFrame}>
                <CoachingExpertiseDemo />
              </div>
            </div>
          )}

          {/* Demo 01 — MRC hero slider */}
          {detail.slug === "mrc-rock-and-sand" && (
            <div className={styles.demoCard}>
              <div className={styles.demoCardHeader}>
                <span className={styles.demoCardNum}>01</span>
                <div className={styles.demoCardInfo}>
                  <div className={styles.demoCardTitle}>Hero Company Name Slider</div>
                  <div className={styles.demoCardSub}>The landing page hero cycles through all three brand names — Stoneyard, MRC Rock & Sand, and Santa Paula Materials — using a clone-and-snap technique. A single clone of the first item appended to the end allows a seamless infinite loop with only 4 DOM nodes and no visible jump.</div>
                </div>
                <span className={styles.demoCardBadge}>Interactive</span>
              </div>
              <div className={styles.animationFrame}>
                <MrcSliderDemo />
              </div>
            </div>
          )}

          {/* Demo 01 — Madasa hero letter stagger */}
          {detail.slug === "madasa-collective" && (
            <div className={styles.demoCard}>
              <div className={styles.demoCardHeader}>
                <span className={styles.demoCardNum}>01</span>
                <div className={styles.demoCardInfo}>
                  <div className={styles.demoCardTitle}>Hero Letter Stagger Animation</div>
                  <div className={styles.demoCardSub}>Each letter of "MADASA" and "COLLECTIVE" enters independently on a spring — stiffness 300, damping 18, with a 50 ms stagger per letter. The continuous index across both words means "COLLECTIVE" starts where "MADASA" left off, so the whole sequence reads as one fluid motion.</div>
                </div>
                <span className={styles.demoCardBadge}>Interactive</span>
              </div>
              <div className={styles.animationFrame}>
                <MadasaHeroDemo />
              </div>
            </div>
          )}

          {/* Demo 02 — Madasa service card flip */}
          {detail.slug === "madasa-collective" && (
            <div className={styles.demoCard}>
              <div className={styles.demoCardHeader}>
                <span className={styles.demoCardNum}>02</span>
                <div className={styles.demoCardInfo}>
                  <div className={styles.demoCardTitle}>Service Cards 3D Flip</div>
                  <div className={styles.demoCardSub}>Each service card is a two-sided 3D surface using CSS <code>transform-style: preserve-3d</code> and a <code>perspective</code> of 700 px on the parent. On hover the card rotates 180° on the Y-axis — the back face is pre-rotated so it appears right-reading when the flip completes. <code>backface-visibility: hidden</code> keeps each face invisible while it faces away from the viewer.</div>
                </div>
                <span className={styles.demoCardBadge}>Interactive</span>
              </div>
              <div className={styles.animationFrame}>
                <MadasaCardFlipDemo />
              </div>
            </div>
          )}

          {/* AYDT — Backend showcases */}
          {detail.slug === "american-youth-dance-theater" && (
            <>
              <div className={styles.demoCard}>
                <div className={styles.demoCardHeader}>
                  <span className={styles.demoCardNum}>01</span>
                  <div className={styles.demoCardInfo}>
                    <div className={styles.demoCardTitle}>Server-Side Fee Engine</div>
                    <div className={styles.demoCardSub}>Enrollment cost is resolved server-side by evaluating a 6-layer conditional rule chain — division, class count, semester type, family discounts, coupons, and automatic fees — in sequence, before the cart ever confirms.</div>
                  </div>
                  <span className={styles.demoCardBadge}>Backend</span>
                </div>
                <div className={styles.animationFrame}>
                  <AydtFeeEngineDemo />
                </div>
              </div>

              <div className={styles.demoCard}>
                <div className={styles.demoCardHeader}>
                  <span className={styles.demoCardNum}>02</span>
                  <div className={styles.demoCardInfo}>
                    <div className={styles.demoCardTitle}>Full Schema — 65 Tables, 10 Domain Clusters</div>
                    <div className={styles.demoCardSub}>Every table in the schema, organized by domain. 8 cross-domain FK flows shown as bezier curves — each connecting two clusters with an FK count badge. Scroll right on smaller screens.</div>
                  </div>
                  <span className={styles.demoCardBadge}>Schema</span>
                </div>
                <div className={styles.animationFrame}>
                  <AydtSchemaConstellationDemo />
                </div>
              </div>
            </>
          )}
        </RevealWrapper>

        {/* ── COLOR PALETTE ────────────────────────────────────── */}
        <RevealWrapper className={styles.section}>
          <div className={styles.sectionEye}>Color System</div>
          <h2 className={styles.sectionTitle} style={{ marginBottom: 8 }}>Palette & Design Rationale</h2>
          <div className={styles.sectionRule} style={{ marginBottom: 24 }} />

          {detail.colorPalettes ? (
            detail.colorPalettes.map((palette, i) => (
              <div key={i} style={{ marginBottom: i < detail.colorPalettes!.length - 1 ? 48 : 0 }}>
                {palette.label && (
                  <div className={styles.sectionEye} style={{ marginBottom: 12 }}>
                    {palette.label}
                  </div>
                )}
                <p className={styles.prose}>{palette.rationale}</p>
                <div className={styles.swatchGrid}>
                  {palette.swatches.map((swatch) => (
                    <div key={swatch.hex} className={styles.swatchCard}>
                      <div className={styles.swatchColor} style={{ backgroundColor: swatch.hex }} />
                      <div className={styles.swatchInfo}>
                        <div className={styles.swatchName}>{swatch.name}</div>
                        <div className={styles.swatchRole}>{swatch.role}</div>
                        <div className={styles.swatchHex}>{swatch.hex}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))
          ) : (
            <>
              <p className={styles.prose}>{detail.colorPalette.rationale}</p>
              <div className={styles.swatchGrid}>
                {detail.colorPalette.swatches.map((swatch) => (
                  <div key={swatch.hex} className={styles.swatchCard}>
                    <div className={styles.swatchColor} style={{ backgroundColor: swatch.hex }} />
                    <div className={styles.swatchInfo}>
                      <div className={styles.swatchName}>{swatch.name}</div>
                      <div className={styles.swatchRole}>{swatch.role}</div>
                      <div className={styles.swatchHex}>{swatch.hex}</div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </RevealWrapper>

        <div className={styles.gradRule} />

        {/* ── NEXT PROJECT ─────────────────────────────────────── */}
        <RevealWrapper className={styles.section}>
          <div className={styles.sectionEye} style={{ marginBottom: 20 }}>Up Next</div>
          <Link href={`/projects/${detail.nextProject.slug}`} className={styles.nextCard}>
            <div className={styles.nextCardGlow} />
            <div>
              <div className={styles.nextCardLabel}>{detail.nextProject.label}</div>
              <div className={styles.nextCardTitle}>{detail.nextProject.title}</div>
              <div className={styles.nextCardSub}>{detail.nextProject.sub}</div>
            </div>
            <div className={styles.nextArrow}>→</div>
          </Link>
        </RevealWrapper>

      </div>
    </>
  );
}
