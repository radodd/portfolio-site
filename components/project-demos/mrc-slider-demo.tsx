"use client";

import { useEffect, useRef, useState } from "react";
import styles from "@/scss/mrc-slider-demo.module.scss";

// Defined outside component so the array reference is always stable
const COMPANIES = ["Stoneyard", "MRC Rock & Sand", "Santa Paula Materials"];
// 3 real items + clone of first for seamless wrap-around
const ITEMS = [...COMPANIES, COMPANIES[0]];

// ─── Clone-and-snap slider ─────────────────────────────────────
function CompanySlider() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const sliderRef = useRef<HTMLDivElement>(null);
  const currentIndexRef = useRef(0); // always-current mirror of state
  const isResetting = useRef(false);

  // Keep ref in sync so the native event listener never reads stale state
  useEffect(() => {
    currentIndexRef.current = currentIndex;
  });

  // Advance one step every 2s
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => prev + 1);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  // Apply transform whenever index changes
  useEffect(() => {
    const el = sliderRef.current;
    if (!el) return;
    el.style.transform = `translateY(-${(currentIndex / ITEMS.length) * 100}%)`;
    if (isResetting.current) {
      isResetting.current = false;
      // Double rAF: ensure the snap frame paints before re-enabling transition
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          if (sliderRef.current) sliderRef.current.style.transition = "";
        });
      });
    }
  }, [currentIndex]);

  // Native listener — reads from ref so it's never stale across renders
  useEffect(() => {
    const el = sliderRef.current;
    if (!el) return;
    const onTransitionEnd = () => {
      if (currentIndexRef.current === ITEMS.length - 1) {
        isResetting.current = true;
        el.style.transition = "none";
        setCurrentIndex(0);
      }
    };
    el.addEventListener("transitionend", onTransitionEnd);
    return () => el.removeEventListener("transitionend", onTransitionEnd);
  }, []); // mount/unmount only — ref always has the latest index

  return (
    <div className={styles.sliderContainer}>
      <div className={styles.slider} ref={sliderRef}>
        {ITEMS.map((item, i) => (
          <div key={i} className={styles.sliderLine}>
            {item}
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Demo wrapper ──────────────────────────────────────────────
export default function MrcSliderDemo() {
  return (
    <div className={styles.demo}>
      <div className={styles.heroContext}>
        <p className={styles.hello}>Hello!</p>
        <div className={styles.weAreRow}>
          <span className={styles.weAre}>We are</span>
          <CompanySlider />
        </div>
        <p className={styles.description}>
          We are a collection of companies here to service your construction needs.
        </p>
      </div>

      <div className={styles.demoHint}>
        ↑ Live — clone-and-snap technique cycles all three brand names with no DOM bloat or jump
      </div>
    </div>
  );
}
