import styles from "@/scss/experience.module.scss";
import { useRef, useEffect, MouseEvent } from "react";

interface DoubleYProps {
  image1: string;
  image2: string;
}

// ─── CONSTANTS ──────────────────────────────────────────────────────────────
const TOTAL_FLEX     = 3;

// Equal default split so both cards have identical flex headroom in each direction.
const DEFAULT_F1     = 1.5;

// With DEFAULT_F1 = 1.5, safe max before either card hits 0 is 1.5.
// 1.1 gives each card a range of [0.4, 2.6] — 13% to 87% of panel height.
const FLEX_RANGE     = 1.1;

const SPEED          = 0.11;
const EPSILON        = 0.0008;

// Parallax zoom: how much to scale the video wrapper at full cursor extreme.
// 0.07 = 7% zoom — visible but not jarring.
const PARALLAX_SCALE = 0.07;

// Parallax pan: how far (in %) to shift the video vertically at full extreme.
// Positive → reveal top of video; negative → reveal bottom.
const PARALLAX_Y     = 5;

// ─── COMPONENT ──────────────────────────────────────────────────────────────
const DoubleY = ({ image1, image2 }: DoubleYProps) => {
  const containerRef  = useRef<HTMLDivElement>(null);
  const firstRef      = useRef<HTMLDivElement>(null);
  const secondRef     = useRef<HTMLDivElement>(null);

  // Refs for the stretchyContainer divs — transforms are applied here so the
  // zoom/pan is clipped by imageContainer's overflow:hidden.
  const firstWrapRef  = useRef<HTMLDivElement>(null);
  const secondWrapRef = useRef<HTMLDivElement>(null);

  const targetFlex1  = useRef(DEFAULT_F1);
  const currentFlex1 = useRef(DEFAULT_F1);
  const rafId        = useRef<number | null>(null);

  // ── Core: map clientY → target flex for card 1 ───────────────────────────
  const computeTarget = (clientY: number): number => {
    const el1 = firstRef.current;
    const el2 = secondRef.current;
    if (!el1 || !el2) return DEFAULT_F1;

    const r1 = el1.getBoundingClientRect();
    const r2 = el2.getBoundingClientRect();

    const center1 = r1.top + r1.height / 2;
    const center2 = r2.top + r2.height / 2;
    const span    = Math.abs(center2 - center1) || 1;

    const t       = (clientY - center1) / span;
    const tClamped = Math.max(-1, Math.min(1, t));
    const tEased   = tClamped * (1 - 0.28 * tClamped * tClamped);

    const flex1 = DEFAULT_F1 - tEased * FLEX_RANGE;
    return Math.max(DEFAULT_F1 - FLEX_RANGE, Math.min(DEFAULT_F1 + FLEX_RANGE, flex1));
  };

  // ── RAF animation loop ────────────────────────────────────────────────────
  const animate = () => {
    const delta = targetFlex1.current - currentFlex1.current;

    if (Math.abs(delta) < EPSILON) {
      currentFlex1.current = targetFlex1.current;
      applyFlex(currentFlex1.current);
      rafId.current = null;
      return;
    }

    currentFlex1.current += delta * SPEED;
    applyFlex(currentFlex1.current);
    rafId.current = requestAnimationFrame(animate);
  };

  // ── Apply flex + parallax transforms ─────────────────────────────────────
  const applyFlex = (f1: number) => {
    if (firstRef.current)  firstRef.current.style.flex  = String(f1);
    if (secondRef.current) secondRef.current.style.flex = String(TOTAL_FLEX - f1);

    // Normalised cursor position derived from the lerped flex value.
    // computeTarget uses flex1 = DEFAULT_F1 - tEased*FLEX_RANGE, so f1 increases
    // when cursor moves toward card 1 and decreases toward card 2.
    //   +1 → card 1 dominant (cursor at card 1 center)
    //   -1 → card 2 dominant (cursor at card 2 center)
    const t = (f1 - DEFAULT_F1) / FLEX_RANGE;

    // Card 1 zooms when it is dominant (t > 0).
    // Positive translateY shifts video down → reveals top content.
    const scale1 = 1 + Math.max(0, t) * PARALLAX_SCALE;
    const ty1    = Math.max(0, t) * PARALLAX_Y;

    // Card 2 zooms when it is dominant (t < 0).
    // Negative translateY shifts video up → reveals bottom content.
    const scale2 = 1 + Math.max(0, -t) * PARALLAX_SCALE;
    const ty2    = -Math.max(0, -t) * PARALLAX_Y;

    if (firstWrapRef.current) {
      firstWrapRef.current.style.transform = `scale(${scale1}) translateY(${ty1}%)`;
    }
    if (secondWrapRef.current) {
      secondWrapRef.current.style.transform = `scale(${scale2}) translateY(${ty2}%)`;
    }
  };

  const startAnimation = () => {
    if (!rafId.current) {
      rafId.current = requestAnimationFrame(animate);
    }
  };

  // ── Event handlers ────────────────────────────────────────────────────────
  const handleMouseMove = (e: MouseEvent) => {
    targetFlex1.current = computeTarget(e.clientY);
    startAnimation();
  };

  const handleMouseLeave = () => {
    targetFlex1.current = DEFAULT_F1;
    startAnimation();
  };

  useEffect(() => {
    return () => {
      if (rafId.current) cancelAnimationFrame(rafId.current);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={styles.double}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div ref={firstRef} className={styles.imageContainer}>
        <div ref={firstWrapRef} className={styles.stretchyContainer}>
          <video
            autoPlay
            playsInline
            muted
            loop
            width="100%"
            controls={false}
            preload="auto"
          >
            <source src={image1} type="video/mp4" />
          </video>
        </div>
      </div>

      <div ref={secondRef} className={styles.imageContainer}>
        <div ref={secondWrapRef} className={styles.stretchyContainer}>
          <video
            autoPlay
            playsInline
            muted
            loop
            width="100%"
            controls={false}
            preload="auto"
          >
            <source src={image2} type="video/mp4" />
          </video>
        </div>
      </div>
    </div>
  );
};

export default DoubleY;
