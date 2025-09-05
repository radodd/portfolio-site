import styles from "@/scss/experience.module.scss";
import Image from "next/image";
import { useRef, MouseEvent } from "react";

interface DoubleYProps {
  image1: string;
  image2: string;
}
const DoubleY = ({ image1, image2 }: DoubleYProps) => {
  const firstImage = useRef<HTMLDivElement>(null);
  const secondImage = useRef<HTMLDivElement>(null);
  let yPercent = 0;
  let requestAnimationFrameId: number | null = null;
  let currentYPercent = 0;
  let speed = 0.15;

  const manageMouseMove = (e: MouseEvent) => {
    const { clientY } = e;

    yPercent = (clientY / window.innerHeight) * 100;

    if (!requestAnimationFrameId) {
      requestAnimationFrameId = requestAnimationFrame(animate);
    } else {
      return null;
    }
  };

  const animate = () => {
    const deltaYPercent = yPercent - currentYPercent;
    currentYPercent = currentYPercent + deltaYPercent * speed;

    if (firstImage.current && secondImage.current) {
      firstImage.current.style.height = 66.66 - currentYPercent * 0.33 + "%";
      secondImage.current.style.height = 33.33 + currentYPercent * 0.33 + "%";
    }

    if (Math.round(currentYPercent) === Math.round(yPercent)) {
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
          <video
            autoPlay
            playsInline
            muted
            loop
            width="100%"
            controls={false}
            preload="auto"
          >
            <source src={image1} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      </div>

      <div ref={secondImage} className={styles.imageContainer}>
        <div className={styles.stretchyContainer}>
          <video autoPlay playsInline muted loop width="100%" controls={false}>
            <source src={image2} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      </div>
    </div>
  );
};

export default DoubleY;
