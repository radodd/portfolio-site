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
        I am <span className="underline">passionate</span> about contributing to
        the development of innovative products and services that address
        critical issues such as affordable healthcare accessibility, equitable
        community empowerment, and sustainable positive enduring change for
        individuals and the environment{" "}
      </p>{" "}
      <p>
        After graduating with a degree in{" "}
        <span className="font-medium">
          Health Science, Pre-Physical Therapy
        </span>{" "}
        . I proudly served as a Combat Engineer in the
        <span className="font-medium"> US Army Officer Corps</span> for five
        years. This experience instilled a strong sense of discipline, time
        management, task prioritization and the ability to effectively delegate
        responsibilites withing a team. All skills that have proven invaluable
        in my software engineering career.
      </p>
      <p>
        {" "}
        I enrolled in a coding bootcamp and learned{" "}
        <span className="font-medium">full-stack web development</span>.{" "}
        <span className="italic">My favorite part of programming</span> is its
        need for complex problem-solving. My core stack is{" "}
        <span className="font-medium">
          React, Redux, Node.js, Next.js, and MongoDB
        </span>
        . I continue to challenge myself with certifications from Google, Meta,
        and AWS. I am currently looking for a{" "}
        <span className="font-medium">full-time position</span> as a software
        developer.
      </p>
    </motion.section>
  );
}
