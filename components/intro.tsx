"use client";

import Image from "next/image";
import React, { useEffect } from "react";
import selfie from "@/public/selfie.jpg";
import { motion } from "framer-motion";
import Link from "next/link";
import { BsArrowRight, BsLinkedin } from "react-icons/bs";
import { HiDownload } from "react-icons/hi";
import { FaGithubSquare } from "react-icons/fa";
import { useInView } from "react-intersection-observer";
import { useActiveSectionContext } from "@/context/active-section-context";
import { useSectionInView } from "@/lib/hooks";

import styles from "@/scss/intro.module.scss";
import SliderAnimation from "./slider-animation";

export default function Intro() {
  const { ref } = useSectionInView("Home", 0.5);
  const { setActiveSection, setTimeOfLastClick } = useActiveSectionContext();

  return (
    <section ref={ref} id="home" className={styles.sectionContainer}>
      <div className={styles.sliderAnimationContainer}>
        <SliderAnimation />
      </div>

      <div>
        <motion.div
          className={styles.buttonsContainer}
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            delay: 0.1,
          }}
        >
          <Link
            href="#contact"
            className="group bg-accent text-white px-7 py-3 flex items-center gap-2 rounded-full outline-none focus:scale-110 hover:bg-accent-dark hover:scale-105 active:scale-105 transition"
            onClick={() => {
              setActiveSection("Contact");
              setTimeOfLastClick(Date.now());
            }}
          >
            Contact me here
            <BsArrowRight className="opacity-80 group-hover:translate-x-2 transition" />
          </Link>

          <a
            className="group bg-secondary bg-opacity-80 px-7 py-3 flex items-center gap-2 rounded-full outline-none focus:scale-110 hover:bg-secondary hover:scale-105 text-white active:scale-105 transition borderBlack"
            href="/Ethan Flores_Resume.pdf"
            download
            target="_blank"
          >
            Download CV{" "}
            <HiDownload className="opacity-60 group-hover:translate-y-1.5 transition group-hover:text-white group-hover:opacity-100" />
          </a>

          <Link
            className="linkedin-btn bg-zinc-300 text-gray-700 px-7 py-3 flex items-center gap-2 rounded-full focus:scale-110 hover:bg-slate-50 hover:scale-[1.15] active:scale-105 transition borderBlack group-hover:opacity-100"
            href="https://www.linkedin.com/in/ethanf-flores"
            target="_blank"
          >
            <BsLinkedin />
          </Link>

          <Link
            className="bg-zinc-300 text-gray-700 px-7 py-3 flex items-center gap-2 rounded-full focus:scale-110 hover:bg-slate-50 hover:scale-[1.15] active:scale-105 transition borderBlack  group-hover:opacity-100"
            href="https://www.github.com/radodd"
            target="_blank"
          >
            <FaGithubSquare />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
