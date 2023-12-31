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
// import guamflagImg from "@/public/guamflag.png";
// import flag3Img from "@/public/flag3.png";
import flagsqImg from "@/public/flagsq.png";
// import CV.pdf from "@/public/CV.pdf";

export default function Intro() {
  const { ref } = useSectionInView("Home", 0.5);
  const { setActiveSection, setTimeOfLastClick } = useActiveSectionContext();

  return (
    <section
      ref={ref}
      id="home"
      className="mb-28 max-w-[50rem] text-center sm:mb-0 scroll-mt-[100rem]"
    >
      <div className="flex items-center justify-center">
        <div className="relative">
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              type: "tween",
              duration: 0.2,
            }}
          >
            <Image
              src="/selfie.jpg"
              alt="profile picture"
              width="192"
              height="192"
              quality="100"
              priority={true}
              className="h-36 w-36 rounded-full object-cover  border-[0.35rem] border-white shadow-xl"
            />
            <motion.span
              className="absolute bottom-0 right-0 text-4xl"
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                type: "spring",
                stiffness: 125,
                delay: 0.1,
                duration: 0.7,
              }}
            >
              <Image
                src="/flagsq.png"
                alt="guam"
                width="50"
                height="40"
                quality="100"
              />
            </motion.span>
          </motion.div>
        </div>
      </div>
      <motion.h1
        className="mb-10 mt-4 px-4 text-2xl font-medium !leading-[1.5] sm:text-4xl"
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <span className="font-bold">Hi, I'm Ethan Flores.</span> I am a{" "}
        <span className="font-bold underline">full-stack engineer</span> based
        in Santa Barbara, CA.
      </motion.h1>
      <motion.div
        className="flex flex-col sm:flex-row items-center justify-center gap-2 px-4 text-lg font-medium"
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          delay: 0.1,
        }}
      >
        <Link
          href="#contact"
          className="group bg-gray-900 text-white px-7 py-3 flex items-center gap-2 rounded-full outline-none focus:scale-110 hover:bg-gray-950 hover:scale-105 active:scale-105 transition"
          onClick={() => {
            setActiveSection("Contact");
            setTimeOfLastClick(Date.now());
          }}
        >
          Contact me here
          <BsArrowRight className="opacity-80 group-hover:translate-x-2 transition" />
        </Link>

        <a
          className="group bg-white px-7 py-3 flex items-center gap-2 rounded-full outline-none focus:scale-110 hover:bg-violet-950 hover:scale-105 hover:text-white active:scale-105 transition borderBlack"
          href="/Ethan Flores - Software Engineer - Resume.pdf"
          download
        >
          Download CV{" "}
          <HiDownload className="opacity-60 group-hover:translate-y-1.5 transition group-hover:text-white group-hover:opacity-100" />
        </a>

        <a
          className="linkedin-btn bg-white text-gray-700 px-7 py-3 flex items-center gap-2 rounded-full focus:scale-110 hover:bg-violet-950 hover:scale-[1.15] active:scale-105 transition borderBlack hover:text-white group-hover:opacity-100"
          href="https://www.linkedin.com/in/ethanf-flores"
          target="_blank"
        >
          <BsLinkedin />
        </a>

        <a
          className="bg-white text-gray-700 px-7 py-3 flex items-center gap-2 rounded-full focus:scale-110 hover:bg-violet-950 hover:scale-[1.15] active:scale-105 transition borderBlack hover:text-white group-hover:opacity-100"
          href="https://www.github.com/radodd"
          target="_blank"
        >
          <FaGithubSquare />
        </a>
      </motion.div>
    </section>
  );
}
