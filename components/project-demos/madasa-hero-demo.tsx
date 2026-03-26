"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import styles from "@/scss/madasa-hero-demo.module.scss";
import {
  customWidthByIndexMadasa,
  customHeightByIndexMadasa,
  customWidthByIndex,
  customHeightByIndex,
} from "@/lib/CustomDimensions";

const MADASA_LETTERS = [
  { src: "/M.png", alt: "M" },
  { src: "/A.png", alt: "A" },
  { src: "/D.png", alt: "D" },
  { src: "/A.png", alt: "A" },
  { src: "/S.png", alt: "S" },
  { src: "/A.png", alt: "A" },
];

const COLLECTIVE_LETTERS = [
  { src: "/C.png", alt: "C" },
  { src: "/O.png", alt: "O" },
  { src: "/L.png", alt: "L" },
  { src: "/L.png", alt: "L" },
  { src: "/E.png", alt: "E" },
  { src: "/C.png", alt: "C" },
  { src: "/T.png", alt: "T" },
  { src: "/I.png", alt: "I" },
  { src: "/V.png", alt: "V" },
  { src: "/E.png", alt: "E" },
];

// Exact spring config from the original Hero component
const letterVariants = {
  initial: { opacity: 0, y: 100 },
  animate: (index: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      type: "spring" as const,
      stiffness: 300,
      damping: 18,
      delay: 0.05 * index,
    },
  }),
};

// Scale all letter dimensions down by ~1/3 for the demo context
const sc = (n: number) => Math.round(n * 0.67);

export default function MadasaHeroDemo() {
  const [animKey, setAnimKey] = useState(0);
  const [isTablet, setIsTablet] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsTablet(window.innerWidth <= 1280);
      setIsMobile(window.innerWidth <= 744);
    };
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className={styles.demo}>
      <div className={styles.bgPattern} aria-hidden />

      {/* key remounts the motion tree — cleanest replay mechanism */}
      <div className={styles.scene} key={animKey}>
        <div className={styles.circle}>
          {/* MADASA — letters 0–5 */}
          <ul className={styles.letterRow} aria-label="MADASA">
            {MADASA_LETTERS.map((letter, i) => (
              <motion.li
                key={i}
                className={styles.letterItem}
                variants={letterVariants}
                initial="initial"
                animate="animate"
                custom={i}
              >
                <Image
                  src={letter.src}
                  alt={letter.alt}
                  width={sc(customWidthByIndexMadasa(i, isMobile, isTablet))}
                  height={sc(customHeightByIndexMadasa(i, isMobile, isTablet))}
                />
              </motion.li>
            ))}
          </ul>

          {/* COLLECTIVE — stagger resets to 0, independent of MADASA */}
          <ul className={styles.letterRowCollective} aria-label="COLLECTIVE">
            {COLLECTIVE_LETTERS.map((letter, i) => (
              <motion.li
                key={i}
                className={styles.letterItem}
                variants={letterVariants}
                initial="initial"
                animate="animate"
                custom={i}
              >
                <Image
                  src={letter.src}
                  alt={letter.alt}
                  width={sc(customWidthByIndex(i, isMobile, isTablet))}
                  height={sc(customHeightByIndex(i, isMobile, isTablet))}
                />
              </motion.li>
            ))}
          </ul>

          <motion.p
            className={styles.tagline}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{
              delay: 0.05 * (COLLECTIVE_LETTERS.length - 1) + 0.3,
              duration: 0.5,
            }}
          >
            We create digital products that launch businesses to their full potential.
          </motion.p>
        </div>
      </div>

      <div className={styles.hintBar}>
        <button
          className={styles.replayBtn}
          onClick={() => setAnimKey((k) => k + 1)}
          aria-label="Replay animation"
        >
          ↺ Replay
        </button>
        <span className={styles.hintText}>
          Spring stagger · stiffness 300 · damping 18 · 50 ms per letter
        </span>
      </div>
    </div>
  );
}
