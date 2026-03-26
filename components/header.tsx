"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { usePathname } from "next/navigation";
import { links } from "@/lib/data";
import { useActiveSectionContext } from "@/context/active-section-context";
import styles from "@/scss/header.module.scss";
import clsx from "clsx";

export default function Header() {
  const pathname = usePathname();
  const { activeSection, setActiveSection, setTimeOfLastClick } =
    useActiveSectionContext();

  if (pathname.startsWith("/projects/")) return null;

  const navRef = useRef<HTMLDivElement>(null);
  const [pillStyle, setPillStyle] = useState({ left: 0, width: 0 });

  useEffect(() => {
    if (!navRef.current) return;
    const activeEl = navRef.current.querySelector(`.${styles.active}`) as HTMLElement | null;
    if (activeEl) {
      setPillStyle({
        left: activeEl.offsetLeft,
        width: activeEl.offsetWidth,
      });
    }
  }, [activeSection]);

  return (
    <motion.header
      className={styles.header}
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
    >
      <nav className={styles.navPill} ref={navRef}>
        <div
          className={styles.activePill}
          style={{ left: pillStyle.left, width: pillStyle.width }}
        />
        {links.map((link) => (
          <Link
            key={link.hash}
            href={link.hash}
            className={clsx(styles.navLink, {
              [styles.active]: activeSection === link.name,
            })}
            onClick={() => {
              setActiveSection(link.name);
              setTimeOfLastClick(Date.now());
            }}
          >
            {link.name}
          </Link>
        ))}
      </nav>
    </motion.header>
  );
}
