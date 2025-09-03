"use client";

import DoubleY from "./doubleY";
import SectionHeading from "./section-heading";
import SectionDivider from "./section-divider";
import Link from "next/link";
import { BsArrowRight } from "react-icons/bs";
import { FaBookOpen } from "react-icons/fa";

import styles from "@/scss/experience.module.scss";
import { useActiveSectionContext } from "@/context/active-section-context";
import { useSectionInView } from "@/lib/hooks";

interface ExperiencesDataTypes {
  experiencesData: {
    company: string;
    role: string;
    companyDescription: string;
    roleDescription: string;
    image1: string;
    image2: string;
    button1: {
      label: string;
      href: string;
    };
    button2: {
      label: string;
      href: string;
    };
  }[];
}

const Experience = ({ experiencesData }: ExperiencesDataTypes) => {
  const { ref } = useSectionInView("Experience", 0.5);

  return (
    <section ref={ref} id="experience" className="flex flex-col items-center">
      <SectionDivider />
      <SectionHeading>Work Experience</SectionHeading>
      {experiencesData.map((exp, i) => (
        <div key={i} className={styles.container}>
          <div className={styles.textContainer}>
            <h1>{exp.company}</h1>
            <span>{exp.role}</span>
            <p>{exp.companyDescription}</p>
            <p>{exp.roleDescription}</p>
            <div className="flex gap-4 flex-wrap">
              <Link
                href={exp.button1.href}
                target="_blank"
                className="group w-fit bg-accent text-white px-7 py-3 flex items-center gap-2 rounded-full outline-none focus:scale-110 hover:bg-accent-dark hover:scale-105 active:scale-105 transition"
              >
                {exp.button1.label}
                <BsArrowRight className="opacity-80 group-hover:translate-x-2 transition" />
              </Link>
              <Link
                href={exp.button2.href}
                target="_blank"
                className="group w-fit bg-transparent border border-accent text-white px-7 py-3 flex items-center gap-2 rounded-full outline-none focus:scale-110 hover:bg-accent-dark hover:border-accent-dark hover:scale-105 active:scale-105 transition"
              >
                {exp.button2.label}
                <FaBookOpen className="opacity-80 group-hover:scale-110 transition" />
              </Link>
            </div>
          </div>

          <DoubleY image1={exp.image1} image2={exp.image2} />
        </div>
      ))}
    </section>
  );
};

export default Experience;
