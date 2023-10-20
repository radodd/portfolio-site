import React from "react";
import { MdMilitaryTech } from "react-icons/md";
import { FaReact } from "react-icons/fa";
import { LiaToothSolid } from "react-icons/lia";
// import { LuGraduationCap } from "react-icons/lu";
// import { CgWorkAlt } from "react-icons/cg";
// import { FaReact } from "react-icons/fa";
import corpcommentImg from "@/public/corpcomment.png";
import rmtdevImg from "@/public/rmtdev.png";
import wordanalyticsImg from "@/public/wordanalytics.png";

export const links = [
  {
    name: "Home",
    hash: "#home",
  },
  {
    name: "About",
    hash: "#about",
  },
  {
    name: "Projects",
    hash: "#projects",
  },
  {
    name: "Skills",
    hash: "#skills",
  },
  {
    name: "Experience",
    hash: "#experience",
  },
  {
    name: "Contact",
    hash: "#contact",
  },
] as const;

export const experiencesData = [
  {
    title: "US Army Officer, Combat Engineer",
    location: "Schofield Barracks, HI",
    description:
      "I led and executed combat engineering operations, specializing in mobility support, route clearance, and countermobility. I also was responsible for the forecasting, planning, and coordination of engineering training requirements and objectives.",
    icon: React.createElement(MdMilitaryTech),
    date: "2016-2021",
  },
  {
    title: "Dental Front Office",
    location: "Santa Barbara, CA",
    description:
      "Supported administrative services for Spanish-speaking, Native American, and low-income patients.",
    icon: React.createElement(LiaToothSolid),
    date: "2022-2023",
  },
  {
    title: "Hack Reactor Bootcamp",
    location: "Remote",
    description: "Created and deployed fullstack web applications.",
    icon: React.createElement(FaReact),
    date: "2023",
  },
] as const;

export const projectsData = [
  {
    title: "CorpComment",
    description:
      "I worked as a full-stack developer on this startup project for 2 years. Users can give public feedback to companies.",
    tags: ["React", "Next.js", "MongoDB", "Tailwind", "Prisma"],
    imageUrl: corpcommentImg,
  },
  {
    title: "rmtDev",
    description:
      "Job board for remote developer jobs. I was the front-end developer. It has features like filtering, sorting and pagination.",
    tags: ["React", "TypeScript", "Next.js", "Tailwind", "Redux"],
    imageUrl: rmtdevImg,
  },
  {
    title: "Word Analytics",
    description:
      "A public web app for quick analytics on text. It shows word count, character count and social media post limits.",
    tags: ["React", "Next.js", "SQL", "Tailwind", "Framer"],
    imageUrl: wordanalyticsImg,
  },
] as const;

export const skillsData = [
  "HTML",
  "CSS",
  "JavaScript",
  "TypeScript",
  "React",
  "Next.js",
  "Node.js",
  "Git",
  "Tailwind",
  "Prisma",
  "MongoDB",
  "Redux",
  "GraphQL",
  "Apollo",
  "Express",
  "PostgreSQL",
  "Python",
  "Django",
  "Framer Motion",
] as const;
