"use client";

import styles from "@/scss/double.module.scss";
import Image from "next/image";
import { useRef } from "react";

interface ProjectsDataTypes {
  projectsData: {
    title: string;
    description: string;
    tags: readonly string[];
    imageUrl: string;
    href: string;
  }[];
  reversed?: boolean;
}

const Double = ({ projectsData, reversed }: ProjectsDataTypes) => {
  const firstImage = useRef<HTMLDivElement | null>(null);
  const secondImage = useRef<HTMLDivElement | null>(null);
  let xPercent = reversed ? 100 : 0;
  let requestAnimationFrameId: number | null = null;
  let currentXPercent = reversed ? 100 : 0;
  let speed = 0.15;

  const manageMouseMove = (e: any) => {
    const { clientX } = e;
    console.log("clientX:", clientX);
    xPercent = (clientX / window.innerWidth) * 100;
    console.log("xPercent:", xPercent);

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
    <div
      className={styles.double}
      onMouseMove={(e) => {
        manageMouseMove(e);
      }}
    >
      <div ref={firstImage} className={styles.imageContainer}>
        <div className={styles.stretchyContainer}>
          <Image src={projectsData[0].imageUrl} fill={true} alt={"image"} />
        </div>

        <div className={styles.body}>
          <h3>{projectsData[0].title}</h3>
          <p>{projectsData[0].description}</p>
          <div className={styles.tagContainer}>
            {projectsData[0].tags.map((i, index) => (
              <span key={index}>{i}</span>
            ))}
          </div>
        </div>
      </div>
      <div ref={secondImage} className={styles.imageContainer}>
        <div className={styles.stretchyContainer}>
          <Image src={projectsData[1].imageUrl} fill={true} alt={"image"} />
        </div>

        <div className={styles.body}>
          <h3>{projectsData[1].title}</h3>
          <p>{projectsData[1].description}</p>
          <div className={styles.tagContainer}>
            {projectsData[1].tags.map((i, index) => (
              <span key={index}>{i}</span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Double;
