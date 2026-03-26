"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { BsLinkedin } from "react-icons/bs";
import { FaGithubSquare } from "react-icons/fa";
import { HiDownload } from "react-icons/hi";
import { useSectionInView } from "@/lib/hooks";
import { useActiveSectionContext } from "@/context/active-section-context";

import styles from "@/scss/intro.module.scss";

/*
 * FlipperAnimation — preserved for future iteration.
 * import FlipperAnimation from "./flipper-animation";
 */

export default function Intro() {
  const { ref } = useSectionInView("Home", 0.5);
  const { setActiveSection, setTimeOfLastClick } = useActiveSectionContext();

  return (
    <section ref={ref} id="home" className={styles.hero}>
      {/* Ambient blobs */}
      <div className={styles.blob1} />
      <div className={styles.blob2} />
      <div className={styles.blob3} />

      {/* Eyebrow */}
      <motion.div
        className={styles.eyebrow}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.6 }}
      >
        <span className={styles.eyebrowLine} />
        Front-End Engineer
      </motion.div>

      {/* Name */}
      <motion.h1
        className={styles.heroName}
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      >
        Ethan
        <br />
        <span className={styles.heroNameGrad}>Flores</span>
      </motion.h1>

      {/* Role */}
      <motion.p
        className={styles.heroRole}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.6 }}
      >
        Full-Stack Engineer & Army Veteran
      </motion.p>

      {/* Tagline */}
      <motion.p
        className={styles.heroDesc}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.6 }}
      >
        Engineering solutions with code.
      </motion.p>

      {/* CTA Buttons */}
      <motion.div
        className={styles.heroBtns}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.65, duration: 0.6 }}
      >
        <Link
          href="#contact"
          className={styles.btnPrimary}
          onClick={() => {
            setActiveSection("Contact");
            setTimeOfLastClick(Date.now());
          }}
        >
          <span>Contact me</span>
        </Link>

        <a
          href="/Ethan Flores_Resume.pdf"
          download
          target="_blank"
          className={styles.btnLiquid}
        >
          <span className={styles.lt}>Download CV</span>
        </a>

        <Link
          href="https://www.linkedin.com/in/ethanf-flores"
          target="_blank"
          className={styles.socialBtn}
          aria-label="LinkedIn"
        >
          <BsLinkedin />
        </Link>

        <Link
          href="https://www.github.com/radodd"
          target="_blank"
          className={styles.socialBtn}
          aria-label="GitHub"
        >
          <FaGithubSquare />
        </Link>
      </motion.div>

      {/*
       * FlipperAnimation — commented out for future iteration.
       * <div>
       *   <FlipperAnimation />
       * </div>
       */}
    </section>
  );
}
