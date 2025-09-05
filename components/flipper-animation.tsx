"use client";

import { useEffect, useRef, useState } from "react";
import { Bebas_Neue } from "next/font/google";

import styles from "@/scss/flipper-animation.module.scss";
import Image from "next/image";
const lines = [
  "Web",
  "",
  "Creative",
  "",
  "Developer",
  "Creative",
  "Web",
  "Developer",
  "",
  "Web",
  "Developer",
  "Creative",
  "Web",
  "Developer",
  "Creative",
  "Web",
  "Developer",
  "Creative",
  "Web",
  "Developer",
  "Creative",
  "Web",
  "Developer",
  "Creative",
  "Web",
  "Developer",
  "Creative",
  "Web",
  "Developer",
  "Creative",
  "Web",
  "Developer",
  "Creative",
  "Web",
  "Developer",
  "Creative",
  "Web",
  "Developer",
  "Creative",
  "Web",
  "Developer",
  "Creative",
  "Web",
  "Developer",
  "Creative",
  "Web",
  "Developer",
  "Creative",
  "Web",
  "Developer",
  "Creative",
  "Web",
  "Developer",
  "Creative",
  "Web",
  "Developer",
  "Creative",
  "Web",
  "Developer",
  "Creative",
  "Web",
  "Developer",
  "Creative",
  "Web",
  "Developer",
  "Creative",
  "Web",
  "Developer",
  "Creative",
  "Web",
  "Developer",
  "Creative",
  "Web",
  "Developer",
  "Creative",
  "Web",
  "Developer",
  "Creative",
  "Web",
  "Developer",
  "Creative",
  "Web",
  "Developer",
  "Creative",
  "Web",
  "Developer",
  "Creative",
  "Web",
  "Developer",
  "Creative",
  "Web",
  "Developer",
  "Creative",
  "Web",
  "Developer",
  "Creative",
];

const bebas_neue = Bebas_Neue({ subsets: ["latin"], weight: "400" });

const FlipperAnimation = () => {
  const [currentLine, setCurrentLine] = useState(0);
  const sliderRef = useRef<HTMLDivElement | null>(null);
  const sliderRef2 = useRef<HTMLDivElement | null>(null);
  const sliderRef3 = useRef<HTMLDivElement | null>(null);

  const instance = [
    { name: 1, ref: sliderRef },
    { name: 2, ref: sliderRef2 },
    { name: 3, ref: sliderRef3 },
  ];

  useEffect(() => {
    if (sliderRef.current) {
      //   sliderRef.current.style.transform;
      sliderRef.current!.style.visibility = "hidden";
    }
    if (sliderRef2.current) {
      sliderRef2.current!.style.visibility = "hidden";
    }
    if (sliderRef3.current) {
      sliderRef3.current!.style.visibility = "hidden";
    }
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentLine((prev) => (prev + 1) % lines.length);
    }, 2000);

    return () => clearInterval(interval);
  }, [lines.length]);

  useEffect(() => {
    if (sliderRef.current) {
      setTimeout(() => {
        sliderRef.current!.style.transform = `translateY(-${
          currentLine * 1.0416
        }%)`;
        sliderRef.current!.style.visibility = "visible";
      }, 500);
    }
    if (sliderRef2.current) {
      setTimeout(() => {
        sliderRef2.current!.style.transform = `translateY(-${
          currentLine * 1.0416
        }%)`;
        sliderRef2.current!.style.visibility = "visible";
      }, 1000);
    }
    if (sliderRef3) {
      setTimeout(() => {
        sliderRef3.current!.style.transform = `translateY(-${
          currentLine * 1.0416
        }%)`;
        sliderRef3.current!.style.visibility = "visible";
      }, 1500);
    }
  }, [currentLine]);

  return (
    <div className={styles.container}>
      <Image
        fill={true}
        src="/selfie2.png"
        alt="image"
        className={styles.image}
      />
      <div className={styles.slidersContainer}>
        {instance.map((item, i) => (
          <div
            key={i}
            className={`${bebas_neue.className} ${styles.sliderWrapper}`}
            style={{ "--i": i } as React.CSSProperties}
          >
            <div className={styles.slider} ref={item.ref}>
              {lines.map((line, index) => (
                <div key={index} className={styles.line}>
                  {line}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FlipperAnimation;
