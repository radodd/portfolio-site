"use client";

import Link from "next/link";
import { BsArrowRight } from "react-icons/bs";
import { FaBookOpen } from "react-icons/fa";
import { motion } from "framer-motion";
import { useSectionInView } from "@/lib/hooks";
import SectionHeading from "./section-heading";
import DoubleY from "./doubleY";

import styles from "@/scss/experience.module.scss";

interface ExperiencesDataTypes {
  experiencesData: {
    company: string;
    role: string;
    companyDescription: string;
    roleDescription: string;
    image1: string;
    image2: string;
    button1: { label: string; href: string };
    button2: { label: string; href: string };
  }[];
}

const Experience = ({ experiencesData }: ExperiencesDataTypes) => {
  const { ref } = useSectionInView("Experience", 0.3);

  return (
    <section
      ref={ref}
      id="experience"
      className="flex flex-col items-center gap-20 w-full"
    >
      <SectionHeading eyebrow="Career">Work Experience</SectionHeading>

      {experiencesData.map((exp, i) => (
        <motion.div
          key={i}
          className={styles.container}
          initial={{ opacity: 0, y: 48 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
          viewport={{ once: true }}
        >
          <div className={styles.textContainer}>
            <p className={styles.role}>{exp.role}</p>
            <h3 className={styles.company}>{exp.company}</h3>
            <div className={styles.rule} />
            <p className={styles.desc}>{exp.companyDescription}</p>
            <p className={styles.desc}>{exp.roleDescription}</p>

            <div className={styles.btnRow}>
              <Link
                href={exp.button1.href}
                target="_blank"
                className={styles.btnPrimary}
              >
                <span>{exp.button1.label}</span>
                <BsArrowRight className="opacity-80 group-hover:translate-x-1 transition" />
              </Link>
              <Link
                href={exp.button2.href}
                target="_blank"
                className={styles.btnOutline}
              >
                <span>{exp.button2.label}</span>
                <FaBookOpen className="opacity-80" />
              </Link>
            </div>
          </div>

          <DoubleY image1={exp.image1} image2={exp.image2} />
        </motion.div>
      ))}
    </section>
  );
};

export default Experience;
