"use client";

import { useEffect, useRef, useState } from "react";
import GradientCursor from "./gradient-cursor";
import { useSectionInView } from "@/lib/hooks";
import { motion } from "framer-motion";
import SectionDivider from "../section-divider";
import SectionHeading from "../section-heading";

const Scene2 = () => {
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
  console.log("DISTANCE:", distance);
  return (
    <div
      ref={headingRef}
      className="h-full flex items-center justify-center border border-pink-400"
    >
      <motion.section
        ref={ref}
        id="about"
        className="z-10 mb-28  text-center leading-8 sm:mb-40 scroll-mt-28 flex flex-col items-center"
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.175 }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <SectionDivider />
        <SectionHeading>About Me</SectionHeading>
        <p className="z-10 mb-3 text-neutral-300">
          I am a <span className="font-medium">software engineer</span> with a
          non-traditional background. I am naturally curious and proactive with
          an eagerness to learn. I pride myself on my work ethic and always
          collaborate with a "can-do" mindset. Currently, as a{" "}
          <span className="underline">Freelance Web Developer</span> I have had
          the opportunity to collaborate with non-profit organizations and with
          clients who are active in the healthcare sector.
        </p>
        <p className="z-10 mb-3 text-neutral-300">
          I hold a B.S. in{" "}
          <span className="font-medium">
            Health Science, Pre-Physical Therapy,{" "}
          </span>
          I am a veteran of the{" "}
          <span className="font-medium">US Army Officer Corps</span> and Guam
          native.
        </p>

        <p className="z-10 text-neutral-300">
          Enrolling into the{" "}
          <span className="font-medium">Hack Reactor by Galvanize</span> coding
          bootcamp was the start of my career. As I continue to grow my skills I
          intend to continue to work in the web development space and
          collaborate with non-profit organizations with the{" "}
          <span className="italic">goal</span> of eroding the barriers to
          equitable healthcare access. My core stack is{" "}
          <span className="font-medium">
            React, Redux, Next.js, Tailwind, TypeScript.
          </span>
        </p>
      </motion.section>
      <GradientCursor isHovered={isHovered} distance={distance} />
    </div>
  );
};

export default Scene2;
