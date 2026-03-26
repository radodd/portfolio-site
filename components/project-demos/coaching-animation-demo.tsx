"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import styles from "@/scss/coaching-demo.module.scss";

// ─── Client's actual content (from genfulton.com/constants) ──
const greeting = "Hi, I'm Gen Fulton.";
const bio =
  "My approach to therapy is collaborative to help you reduce stress and prevent burnout. I use motivational neuroscience to help you re-regulate your nervous system, build resilience, and perform with clarity in high-stakes situations. This process empowers you to navigate life's uncertainties with greater ease, fostering hope, harmony and well-being.";

const qualifications = [
  {
    title: "Education",
    highlights: [
      "MA Counseling Psychology, John F. Kennedy University, 2018",
      "Graduate Certificate in Sport Psychology 2016",
    ],
  },
  {
    title: "Professional Experience",
    highlights: [
      "Worked in non-profit settings, sliding scale clinics, and private practice settings seeing individuals and couples. Experience includes stress management, burnout, depression, anxiety, PTSD, and coaching professional athletes for sports performance.",
    ],
  },
  {
    title: "Specialized Training",
    highlights: [
      "Somatic Experiencing Practitioner Certificate 2019 — Somatic Experiencing Trauma Institute",
      "Emotionally Focused Therapy Externship 2019",
      "Level I Coaching Certificate 2023 — Mental Performance Golf Academy",
    ],
  },
];

// ─── Component ────────────────────────────────────────────────
export default function CoachingAnimationDemo() {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className={styles.demo}>

      {/* ── Blob layer — above the ::before background ── */}
      <div className={styles.blobLayer} aria-hidden>
        <motion.img
          src="/blob-1.svg"
          alt=""
          className={styles.blobImg}
          style={{ right: 0 }}
          initial={{ x: 3, y: -8 }}
          animate={{ x: 35, y: -15 }}
          transition={{ repeat: Infinity, repeatType: "mirror", duration: 4, ease: "easeInOut" }}
        />
        <motion.img
          src="/blob-2.svg"
          alt=""
          className={styles.blobImg}
          style={{ right: "10%" }}
          initial={{ x: 15, y: -4 }}
          animate={{ x: 50, y: -50 }}
          transition={{ repeat: Infinity, repeatType: "mirror", duration: 5, ease: "easeInOut" }}
        />
        <motion.img
          src="/blob-3.svg"
          alt=""
          className={styles.blobImg}
          style={{ right: 0, top: "-120px" }}
          initial={{ x: 9, y: 1 }}
          animate={{ x: 15, y: -50 }}
          transition={{ repeat: Infinity, repeatType: "mirror", duration: 3, ease: "easeInOut" }}
        />
      </div>

      {/* ── Intro content ── */}
      <div className={styles.content}>
        <div className={styles.introRow}>

          {/* Gen Fulton selfie */}
          <div className={styles.avatar}>
            <Image
              src="/selfie.jpg"
              alt="Gen Fulton"
              fill
              sizes="80px"
              style={{ objectFit: "cover", objectPosition: "top center" }}
              className={styles.avatarImg}
            />
          </div>

          {/* Text column */}
          <div className={styles.textCol}>
            <h3 className={styles.greeting}>{greeting}</h3>
            <p className={styles.bio}>{bio}</p>

            <button
              className={styles.seeMoreBtn}
              onClick={() => setExpanded((v) => !v)}
            >
              {expanded ? "See Less" : "See More"}
            </button>
          </div>
        </div>

        {/* ── Expanded qualifications ── */}
        <motion.div
          initial={false}
          animate={{
            maxHeight: expanded ? 600 : 0,
            opacity: expanded ? 1 : 0,
          }}
          transition={{ duration: 0.42, ease: [0.25, 0.46, 0.45, 0.94] }}
          style={{ overflow: "hidden" }}
        >
          <div className={styles.qualInner}>
            {qualifications.map((q) => (
              <div key={q.title} className={styles.qualSection}>
                <h4 className={styles.qualTitle}>{q.title}</h4>
                {q.highlights.map((h, i) => (
                  <p key={i} className={styles.qualText}>{h}</p>
                ))}
              </div>
            ))}
            <button
              className={`${styles.seeMoreBtn} ${styles.seeMoreBtnUp}`}
              onClick={() => setExpanded(false)}
            >
              See Less ↑
            </button>
          </div>
        </motion.div>
      </div>

      {/* ── Interaction hint ── */}
      <div className={styles.demoHint}>
        ↑ Live interaction — click &ldquo;See More&rdquo; to expand
      </div>
    </div>
  );
}
