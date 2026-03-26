"use client";

import { useEffect, useRef, useState } from "react";
import GradientCursor from "./gradient-cursor";
import { useSectionInView } from "@/lib/hooks";
import { motion } from "framer-motion";

import styles from "@/scss/about.module.scss";

const About = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [distance, setDistance] = useState(0);
  const headingRef = useRef<HTMLHeadingElement | null>(null);
  const { ref } = useSectionInView("About");

  useEffect(() => {
    const manageMouseMove = (e: MouseEvent) => {
      if (!headingRef.current) return;

      const rect = headingRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const dx = e.clientX - centerX;
      const dy = e.clientY - centerY;

      setDistance(Math.sqrt(dx * dx + dy * dy));
    };

    window.addEventListener("mousemove", manageMouseMove);
    return () => window.removeEventListener("mousemove", manageMouseMove);
  }, []);

  return (
    <div ref={headingRef} className={styles.container}>
      <motion.section
        ref={ref}
        id="about"
        className={styles.section}
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        viewport={{ once: true }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <p className={styles.originStory}>
          US Army Veteran turned Front End Engineer — striving to make the web
          a more{" "}
          <span className={styles.beautiful}>&nbsp;beautiful&nbsp;</span> place
          one {"<div>"} at a time.
        </p>
      </motion.section>
      <GradientCursor isHovered={isHovered} distance={distance} />
    </div>
  );
};

export default About;
