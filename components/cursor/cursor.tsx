import { useEffect, useRef } from "react";
import gsap from "gsap";
import { Lerp, isHovered } from "@/lib/types";

const Cursor = ({ isHovered }: isHovered) => {
  const size = isHovered ? 300 : 30;
  const circle = useRef(null);
  const mouse = useRef({
    x: 0,
    y: 0,
  });

  const lerp: Lerp = (x, y, a) => x * (1 - a) + y * a;

  const delayedMouse = useRef({
    x: 0,
    y: 0,
  });

  const manageMouseMove = (e) => {
    const { clientX, clientY } = e;

    mouse.current = {
      x: clientX,
      y: clientY,
    };
  };

  const moveCircle = (x, y) => {
    gsap.set(circle.current, { x, y, xPercent: -50, yPercent: -50 });
  };

  const animate = () => {
    const { x, y } = delayedMouse.current;

    delayedMouse.current = {
      x: lerp(x, mouse.current.x, 0.075),
      y: lerp(y, mouse.current.y, 0.075),
    };
    window.requestAnimationFrame(animate);

    moveCircle(delayedMouse.current.x, delayedMouse.current.y);
  };

  useEffect(() => {
    animate();
    window.addEventListener("mousemove", manageMouseMove);
    return () => window.removeEventListener("mousemove", manageMouseMove);
  }, []);

  return (
    <div
      ref={circle}
      className="fixed top-0 left-0 bg-[#BCE4F2] rounded-full mix-blend-difference pointer-events-none"
      style={{
        width: size,
        height: size,
        filter: `blur(${isHovered ? 30 : 0}px)`,
        transition:
          "height 0.3s ease-out, width 0.3s ease-out, filter 0.3s ease-out",
      }}
    />
  );
};

export default Cursor;
