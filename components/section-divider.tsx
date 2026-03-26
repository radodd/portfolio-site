"use client";

import { motion } from "framer-motion";
import styles from "@/scss/section-divider.module.scss";

export default function SectionDivider() {
  return (
    <motion.div
      className={styles.divider}
      initial={{ opacity: 0, scaleY: 0 }}
      whileInView={{ opacity: 1, scaleY: 1 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      viewport={{ once: true }}
    />
  );
}
