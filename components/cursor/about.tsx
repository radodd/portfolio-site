"use client";

import { useEffect, useRef, useState } from "react";
import GradientCursor from "./gradient-cursor";
import { useSectionInView } from "@/lib/hooks";
import { motion } from "framer-motion";
import SectionDivider from "../section-divider";

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
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1 }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <p>
          Making the web a more
          <span>&nbsp; beautiful &nbsp;</span>
          place.
        </p>
      </motion.section>
      <GradientCursor isHovered={isHovered} distance={distance} />
    </div>
  );
};

export default About;
