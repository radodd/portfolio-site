"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import styles from "@/scss/coaching-expertise-demo.module.scss";

// ─── Data (from genfulton.com/constants) ─────────────────────
const expertise = [
  {
    title: "Sports Performance",
    service: "(Coaching)",
    icon: "/icon-sports.svg",
    blob: "/card-blob-1.svg",
    description: "Do you need help focusing or performing under pressure?",
    expanded:
      "Gen has a graduate certificate in Sport Psychology and the Mental Performance Golf Academy coaching certification.",
  },
  {
    title: "Stress/Burnout",
    service: "(Coaching)",
    icon: "/icon-stress.svg",
    blob: "/card-blob-2.svg",
    description:
      "Are you feeling post-covid burnout and difficulty asserting boundaries?",
    expanded:
      "Gen is a Somatic Experiencing Practitioner, a mind-body approach to reducing reactivity to stress in both individuals and couples.",
  },
  {
    title: "Relationship",
    service: "(Counseling)",
    icon: "/icon-relationship.svg",
    blob: "/card-blob-3.svg",
    description:
      "Do you and your partner need help with your communication?",
    expanded:
      "Gen has been working with couples for over 4 years and has specific training in Sue Johnson's Emotionally Focused Therapy technique.",
  },
  {
    title: "Trauma/PTSD",
    service: "(Counseling)",
    icon: "/icon-trauma.svg",
    blob: "/card-blob-4.svg",
    description:
      "Do you need help to increase stress resilience and promote hope?",
    expanded:
      "Gen is a Somatic Experiencing practitioner which utilizes mindfulness and a slow and steady exposure to stressors.",
  },
];

// ─── Single card ──────────────────────────────────────────────
function ExpertiseCard({
  title,
  service,
  icon,
  blob,
  description,
  expanded,
}: (typeof expertise)[number]) {
  const [open, setOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const check = () => setIsMobile(window.matchMedia("(max-width: 835px)").matches);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["0 1", "1.33 1"],
  });
  const scale = useTransform(scrollYProgress, [0, 1], [0.7, 1]);
  const opacity = useTransform(scrollYProgress, [0, 1], [0.7, 1]);

  return (
    <motion.div
      ref={ref}
      style={{ scale, opacity }}
      animate={{ height: open ? 340 : 260 }}
      transition={{ duration: 0.3 }}
      className={styles.card}
    >
      {/* Icon + blob with diverging hover */}
      <motion.div
        className={styles.iconWrap}
        whileHover={isMobile ? undefined : "hovered"}
      >
        {/* Blob layer */}
        <motion.img
          src={blob}
          alt=""
          className={styles.blob}
          variants={{ hovered: { x: -15, y: 8, rotate: -6 } }}
          transition={{ type: "spring", stiffness: 260, damping: 18 }}
        />
        {/* Icon layer */}
        <motion.img
          src={icon}
          alt={title}
          className={styles.iconCircle}
          variants={{ hovered: { x: 15, y: -8, rotate: 6 } }}
          transition={{ type: "spring", stiffness: 260, damping: 18 }}
        />
      </motion.div>

      <div className={styles.cardTitle}>{title}</div>
      <div className={styles.cardService}>{service}</div>
      <p className={styles.cardDesc}>{description}</p>

      {/* Expanded text */}
      <motion.div
        initial={false}
        animate={{ maxHeight: open ? 120 : 0, opacity: open ? 1 : 0 }}
        transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
        style={{ overflow: "hidden" }}
      >
        <p className={styles.cardExpanded}>{expanded}</p>
      </motion.div>

      <button className={styles.seeMoreBtn} onClick={() => setOpen((v) => !v)}>
        {open ? "See Less" : "See More"}
      </button>
    </motion.div>
  );
}

// ─── Section wrapper ──────────────────────────────────────────
export default function CoachingExpertiseDemo() {
  return (
    <div className={styles.demo}>
      <div className={styles.header}>
        <h2 className={styles.sectionTitle}>Areas of Expertise</h2>
      </div>

      <div className={styles.grid}>
        {expertise.map((item) => (
          <ExpertiseCard key={item.title} {...item} />
        ))}
      </div>

      <div className={styles.demoHint}>
        ↑ Hover cards to see blob/icon diverge · click &ldquo;See More&rdquo; to expand
      </div>
    </div>
  );
}
