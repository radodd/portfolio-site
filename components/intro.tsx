"use client";

import { useSectionInView } from "@/lib/hooks";
import SliderAnimation from "./slider-animation";
import FlipperAnimation from "./flipper-animation";

import styles from "@/scss/intro.module.scss";

export default function Intro() {
  const { ref } = useSectionInView("Home", 0.5);

  return (
    <section ref={ref} id="home" className={styles.sectionContainer}>
      <div className={styles.sliderAnimationContainer}>
        {/* <SliderAnimation /> */}
        <FlipperAnimation />
      </div>
    </section>
  );
}
