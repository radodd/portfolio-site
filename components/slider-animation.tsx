"use client";

import { Bebas_Neue } from "next/font/google";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef } from "react";

import styles from "@/scss/slider-animation.module.scss";

const bebas_neue = Bebas_Neue({
  subsets: ["latin"],
  weight: "400",
});

const SliderAnimation = () => {
  const firstText = useRef(null);
  const secondText = useRef(null);
  const slider = useRef(null);
  let xPercent = 0;
  let direction = 1;

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    requestAnimationFrame(animation);

    gsap.to(slider.current, {
      scrollTrigger: {
        trigger: document.documentElement,
        start: 0,
        end: window.innerWidth,
        scrub: 0.5,
        onUpdate: (e) => (direction = e.direction * -1),
      },
      x: "-=300xp",
    });
  }, []);

  const animation = () => {
    if (xPercent <= -100) {
      xPercent = 0;
    }
    if (xPercent > 0) {
      xPercent = -100;
    }
    gsap.set(firstText.current, { xPercent: xPercent });
    gsap.set(secondText.current, { xPercent: xPercent });
    xPercent += 0.1 * direction;
    requestAnimationFrame(animation);
  };

  return (
    <div className={styles.main}>
      <Image
        fill={true}
        src="/selfie2.png"
        alt="image"
        className={styles.image}
      />

      <div className={styles.sliderContainer}>
        <div
          ref={slider}
          className={`${styles.slider} ${bebas_neue.className}`}
        >
          <p ref={firstText}>
            Freelance Developer - Freelance Developer -&nbsp;
          </p>
          <p ref={secondText}>Freelance Developer - FreeLance Developer -</p>
        </div>
      </div>
    </div>
  );
};

export default SliderAnimation;
