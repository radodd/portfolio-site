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
  let yPercent = 100;
  let requestAnimationFrameId: number | null = null;
  let currentYPercent = 100;
  let speed = 0.15;

  console.log("FirstImage:", firstImage);
  console.log("SecondImage:", secondImage);
  console.log("Requested ID:", requestAnimationFrameId);

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

    console.log("Delta Y Percent:", deltaYPercent);

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
      <div
        ref={firstImage}
        className={styles.imageContainer}
        // style={{ height: "66.66%" }}
      >
        <div className={styles.stretchyContainer}>
          {/* <Image src={image1} alt="image" fill={true} /> */}
          <video
            autoPlay
            muted
            loop
            width="100%"
            controls={false}
            // onClick={redirect}
            // quality={95}
          >
            <source src={image1} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      </div>

      <div ref={secondImage} className={styles.imageContainer}>
        <div className={styles.stretchyContainer}>
          {/* <Image src={image2} alt="image" fill={true} />
           */}
          <video
            autoPlay
            muted
            loop
            width="100%"
            controls={false}

            // quality={95}
          >
            <source src={image2} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      </div>
    </div>
  );
};

export default DoubleY;
