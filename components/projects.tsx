"use client";

import styles from "@/scss/double.module.scss";
import Image from "next/image";
import { MouseEvent, useEffect, useRef, useState } from "react";
import SectionDivider from "./section-divider";
import SectionHeading from "./section-heading";
import Link from "next/link";
import { useSectionInView } from "@/lib/hooks";

interface ProjectsDataTypes {
  projectsData: {
    title: string;
    description: string;
    tags: readonly {
      name: string;
      color: string;
    }[];
    imageUrl: string;
    href: string;
  }[];
  reversed?: boolean;
}

const Projects = ({ projectsData, reversed }: ProjectsDataTypes) => {
  const { ref } = useSectionInView("Projects", 0.5);

  const [isMobile, setIsMobile] = useState(false);
  const firstImage = useRef<HTMLDivElement | null>(null);
  const secondImage = useRef<HTMLDivElement | null>(null);
  let xPercent = reversed ? 100 : 0;
  let requestAnimationFrameId: number | null = null;
  let currentXPercent = reversed ? 100 : 0;
  let speed = 0.15;

  useEffect(() => {
    const checkScreen = () => {
      setIsMobile(window.innerWidth < 743);
    };

    checkScreen();
    window.addEventListener("resize", checkScreen);

    return () => {
      window.removeEventListener("resize", checkScreen);
    };
  }, []);

  const manageMouseMove = (e: MouseEvent) => {
    const { clientX } = e;

    xPercent = (clientX / window.innerWidth) * 100;

    if (!requestAnimationFrameId) {
      requestAnimationFrameId = requestAnimationFrame(animate);
    } else {
      return null;
    }
  };

  const animate = () => {
    const deltaXPercent = xPercent - currentXPercent;
    currentXPercent = currentXPercent + deltaXPercent * speed;

    if (firstImage.current && secondImage.current) {
      firstImage.current.style.width = 66.66 - currentXPercent * 0.33 + "%";
      secondImage.current.style.width = 33.33 + currentXPercent * 0.33 + "%";
      // requestAnimationFrame(animate);
    }
    if (Math.round(currentXPercent) === Math.round(xPercent)) {
      cancelAnimationFrame(requestAnimationFrameId as number);
      requestAnimationFrameId = null;
    } else {
      requestAnimationFrame(animate);
    }
  };

  return (
    <section
      ref={ref}
      id="projects"
      className={styles.double}
      onMouseMove={(e) => {
        if (!isMobile) {
          manageMouseMove(e);
        }
      }}
    >
      <SectionDivider />
      <SectionHeading>Completed Projects</SectionHeading>
      {projectsData.map((project, i) => (
        <div
          key={i}
          ref={i === 0 ? firstImage : secondImage}
          className={styles.imageContainer}
        >
          <div className={styles.stretchyContainer}>
            <Link href={project.href} target="_blank">
              <Image src={project.imageUrl} fill={true} alt={"image"} />
            </Link>
          </div>

          <div className={styles.body}>
            <h3>{project.title}</h3>
            <p>{project.description}</p>
            <div className={styles.tagContainer}>
              {project.tags.map((tag, i) => (
                <span key={i} style={{ color: tag.color }}>
                  {tag.name}
                </span>
              ))}
            </div>
          </div>
        </div>
      ))}
    </section>
  );
};

export default Projects;
