"use client";

import { useEffect, useRef } from "react";
import SectionHeading from "./section-heading";
import useWindow from "@/lib/useWindow";

type Lerp = (x: number, y: number, a: number) => number;

const Painter = () => {
  return (
    <div className=" flex w-full h-screen items-center justify-center">
      <div className="absolute">
        <SectionHeading>About Me</SectionHeading>
        <p className="mb-3 text-neutral-300 ">
          I am a <span className="font-medium">software engineer</span> with a
          non-traditional background. I am naturally curious and proactive with
          an eagerness to learn. I pride myself on my work ethic and always
          collaborate with a "can-do" mindset. Currently, as a{" "}
          <span className="underline">Freelance Web Developer</span> I have had
          the opportunity to collaborate with non-profit organizations and with
          clients who are active in the healthcare sector.
        </p>
      </div>

      <Scene />
    </div>
  );
};

const Scene = () => {
  const { dimension } = useWindow();
  const canvas = useRef<HTMLCanvasElement | null>(null);
  const prevPosition = useRef<{ x: number; y: number } | null>(null);

  useEffect(() => {
    if (dimension.width > 0) init();
  }, [dimension]);

  const init = () => {
    if (canvas.current !== null) {
      const ctx = canvas.current.getContext("2d");
      if (ctx) {
        ctx.fillStyle = "#1e293b";
        ctx.fillRect(0, 0, dimension.width, dimension.height);
        ctx.globalCompositeOperation = "destination-out";
      }
    }
  };
  const lerp: Lerp = (x, y, a) => x * (1 - a) + y * a;
  const manageMouseMove: React.MouseEventHandler<HTMLCanvasElement> = (e) => {
    const { clientX, clientY, movementX, movementY } = e;

    const nbOfCircles = Math.max(Math.abs(movementX), Math.abs(movementY)) / 10;
    console.log(nbOfCircles);

    if (prevPosition.current) {
      const { x, y } = prevPosition.current;
      for (let i = 0; i < nbOfCircles; i++) {
        const targetX = lerp(x, clientX, (1 / nbOfCircles) * i);
        const targetY = lerp(y, clientY, (1 / nbOfCircles) * i);
        drawCircle(targetX, targetY, 20);
      }
    }

    prevPosition.current = {
      x: clientX,
      y: clientY,
    };
  };

  const drawCircle = (x: number, y: number, radius: number) => {
    if (canvas.current) {
      const ctx = canvas.current.getContext("2d");
      if (ctx) {
        ctx.beginPath();
        ctx.fillStyle = "red";
        ctx.arc(x, y, radius, 0, 2 * Math.PI);
        ctx.fill();
      }
    }
  };

  return (
    <div className="relative w-full h-full">
      {dimension.width === 0 && (
        <div className="w-full h-full bg-background absolute "> </div>
      )}
      <canvas
        ref={canvas}
        height={dimension.height}
        width={dimension.width}
        onMouseMove={manageMouseMove}
      />
    </div>
  );
};

export default Painter;

{
  /* <p className="mb-3 text-neutral-300">
        I hold a B.S. in{" "}
        <span className="font-medium">
          Health Science, Pre-Physical Therapy,{" "}
        </span>
        I am a veteran of the{" "}
        <span className="font-medium">US Army Officer Corps</span> and Guam
        native.
      </p>

      <p className="text-neutral-300">
        Enrolling into the{" "}
        <span className="font-medium">Hack Reactor by Galvanize</span> coding
        bootcamp was the start of my career. As I continue to grow my skills I
        intend to continue to work in the web development space and collaborate
        with non-profit organizations with the{" "}
        <span className="italic">goal</span> of eroding the barriers to
        equitable healthcare access.
      </p> */
}
