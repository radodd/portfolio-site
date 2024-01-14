"use client";

import { projectsData } from "@/lib/data";
import { useScroll, useTransform, motion } from "framer-motion";
import Image, { ImageProps, StaticImageData } from "next/image";
import { useRef } from "react";

// type ProjectProps = (typeof projectsData)[number];

type ProjectProps = {
  title: string;
  description: string;
  tags: readonly string[];
  href: string;
  imageUrl: string;
  video?: string;
};

export default function Project({
  title,
  description,
  tags,
  href,
  imageUrl,
  video,
}: ProjectProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["0 1", "1.33 1"],
  });
  const scaleProgress = useTransform(scrollYProgress, [0, 1], [0.8, 1]);
  const opacityProgress = useTransform(scrollYProgress, [0, 1], [0.6, 1]);

  const redirect = () => {
    window.open(href, "_blank");
  };

  // const TiltCard = () => {
  //   const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
  //     const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
  //     const width = rect.width;
  //     const height = rect.height;
  //     const mouseX = e.clientX - rect.left;
  //     const mouseY = e.clientY - rect.top;
  //     console.log({ mouseX, mouseY });
  //   };

  return (
    <motion.div
      ref={ref}
      style={{
        scale: scaleProgress,
        opacity: opacityProgress,
      }}
      className="group mb-3 sm:mb-8 last:mb-0"
    >
      <section
        className="bg-gray-100 max-w-[42rem] border border-black/5 rounded-lg overflow-hidden sm:pr-8 relative sm:h-[20rem] group-odd:pl-8 hover:bg-gray-200 transition flex flex-col md:flex-row"
        // onMouseMove={handleMouseMove}
      >
        <div className="pt-4 pb-7 px-5 sm:pl-10 sm:pr-2 sm:pt-10 sm:max-w-[50%] flex flex-col h-full group-odd:ml-[18rem] group-even:mr-[19rem]">
          <h3 className="text-2xl font-semibold">{title}</h3>
          <p className="mt-2 leading-relaxed text-gray-700">{description}</p>
          <ul className="flex flex-wrap mt-4 gap-2 sm:mt-auto">
            {tags.map((tag, index) => (
              <li
                className="bg-black/[0.7] px-3 py-1 text-[0.7rem] uppercase tracking-wider text-white rounded-full"
                key={index}
              >
                {tag}
              </li>
            ))}
          </ul>
        </div>
        {imageUrl !== "" ? (
          <Image
            src={imageUrl}
            alt={title}
            // quality={98}
            width={452}
            height={100}
            onClick={redirect}
            className="absolute top-8 -right-40 w-[28.25rem] rounded-lg shadow-2xl hover:cursor-pointer transition
          group-hover:scale-[1.04]
          group-hover:-translate-x-3
          group-hover:translate-y-3
          group-hover:-rotate-2

          group-odd:right-[initial]
          group-odd:-left-40

          group-odd:group-hover:translate-x-3
          group-odd:group-hover:translate-y-3
          group-odd:group-hover:rotate-2"
          />
        ) : (
          <video
            autoPlay
            muted
            loop
            width="100%"
            controls={false}
            onClick={redirect}
            // quality={95}
            className="absolute top-8 -right-40 w-[28.25rem] rounded-lg shadow-2xl translate-x-[10px] hover:cursor-pointer transition

            group-hover:scale-[1.04]
            group-hover:-translate-x-3
            group-hover:translate-y-3
            group-hover:-rotate-2

            group-odd:right-[initial]
            group-odd:-left-40

            group-odd:group-hover:translate-x-3
            group-odd:group-hover:translate-y-3
            group-odd:group-hover:rotate-2"
          >
            <source src={video} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        )}
      </section>
    </motion.div>
  );
}
// return <TiltCard />;
