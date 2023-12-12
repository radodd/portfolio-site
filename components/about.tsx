"use client";

import React, { useEffect } from "react";
import { motion } from "framer-motion";
import SectionHeading from "./section-heading";
import { useSectionInView } from "@/lib/hooks";

export default function About() {
  const { ref } = useSectionInView("About");

  return (
    <motion.section
      ref={ref}
      id="about"
      className="mb-28 max-w[45rem] text-center leading-8 ms:mb-40 scroll-mt-28"
      initial={{ opacity: 0, y: 100 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.175 }}
    >
      <SectionHeading>About Me</SectionHeading>
      <p className="mb-3">
        I am a <span className="font-medium">software engineer</span> with a
        non-traditional background. I am naturally curious and proactive with an
        eagerness to learn. I pride myself on my work ethic and always
        collaborate with a "can-do" mindset. Currently, as a{" "}
        <span className="underline">Freelance Web Developer</span> I have had
        the opportunity to collaborate with non-profit organizations and with
        clients who are active in the healthcare sector.
      </p>
      <p className="mb-3">
        I hold a B.S. in{" "}
        <span className="font-medium">
          Health Science, Pre-Physical Therapy,{" "}
        </span>
        I am a veteran of the{" "}
        <span className="font-medium">US Army Officer Corps</span> and Guam
        native.
      </p>

      <p>
        Enrolling into the{" "}
        <span className="font-medium">Hack Reactor by Galvanize</span> coding
        bootcamp was the start of my career. As I continue to grow my skills I
        intend to continue to work in the web development space and collaborate
        with non-profit organizations with the{" "}
        <span className="italic">goal</span> of eroding the barriers to
        equitable healthcare access. My core stack is{" "}
        <span className="font-medium">
          React, Redux, Next.js, Tailwind, TypeScript.
        </span>
      </p>
    </motion.section>
  );
}
