"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { GradientCursorProps, Lerp, MoveCircleProps } from "@/lib/types";

const colors = ["#C32D27", "#F5C63F", "#457EC4", "#356FDB"];

const GradientCursor = ({ isHovered, distance }: GradientCursorProps) => {
  // Config
  const delay = isHovered ? 0.015 : 0.005;

  //   Refs for mutable state
  const animatedSize = useRef(0);
  const circles = useRef<(HTMLDivElement | null)[]>([]);
  const mouse = useRef({
    x: 0,
    y: 0,
  });
  const delayedMouse = useRef({
    x: 0,
    y: 0,
  });

  //   Utility: linear interpolation
  const lerp: Lerp = (x, y, a) => x * (1 - a) + y * a;

  const manageMouseMove = (e: MouseEvent) => {
    const { clientX, clientY } = e;

    mouse.current = {
      x: clientX,
      y: clientY,
    };
  };

  //   Update circle positions and sizes using GSAP
  const moveCircle = ({ x, y }: MoveCircleProps) => {
    circles.current.forEach((circle) => {
      gsap.set(circle, {
        x,
        y,
        xPercent: -50,
        yPercent: -50,
        width: animatedSize.current,
        height: animatedSize.current,
      });
    });
  };

  //   Linear interpolation of circle size
  const targetSize = isHovered ? Math.max(5, 300 - distance / 0.85) : 0;
  animatedSize.current = lerp(animatedSize.current, targetSize, 0.15);

  const animate = () => {
    // Linear interpolation of circle position
    const { x, y } = delayedMouse.current;
    delayedMouse.current = {
      x: lerp(x, mouse.current.x, 0.075),
      y: lerp(y, mouse.current.y, 0.075),
    };

    window.requestAnimationFrame(animate);

    moveCircle(delayedMouse.current);
  };

  useEffect(() => {
    if (window.innerWidth <= 640) {
      return;
    } else {
      animate();
      window.addEventListener("mousemove", manageMouseMove);
      return () => window.removeEventListener("mousemove", manageMouseMove);
    }
  }, []);

  return (
    <>
      {colors.map((color, i, array) => (
        <div
          key={i}
          ref={(ref) => (circles.current[i] = ref)}
          className="fixed top-0 left-0 rounded-full mix-blend-difference pointer-events-none"
          style={{
            backgroundColor: color,
            filter: `blur(${isHovered ? 20 : 2}px)`,
            transition: `height 0.3s ease-out, width 0.3s ease-out, filter 0.3s ease-out, transform ${
              (array.length - i) * delay
            }s ease-in`,
          }}
        />
      ))}
    </>
  );
};

export default GradientCursor;
