import React from "react";
import { MdMilitaryTech } from "react-icons/md";
import { FaReact } from "react-icons/fa";
import { LiaToothSolid } from "react-icons/lia";
// import { LuGraduationCap } from "react-icons/lu";
// import { CgWorkAlt } from "react-icons/cg";
// import { FaReact } from "react-icons/fa";
// import corpcommentImg from "@/public/corpcomment.png";
// import rmtdevImg from "@/public/rmtdev.png";
// import wordanalyticsImg from "@/public/wordanalytics.png";
import animosImg from "@/public/animos.png";
import autovantageImg from "@/public/autovantage.png";

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
    title: "Animos",
    description:
      "A social media web application that connects users and their pets with other pet owns and allows users to schedule, promote, and publicize pet-friendly meet-ups at pet-friendly locations.",
    tags: ["Python", "JavaScript", "React", "Redux", "FastAPI", "MongoDB"],
    imageUrl: animosImg,
  },
  {
    title: "AutoVantage",
    description:
      "Auto shop management portal that allows users to track inventory, sales, and services or all vehicles.",
    tags: [
      "Python",
      "JavaScript",
      "Django",
      "Bootstrap",
      "PostgreSQL",
      "Insomnia",
    ],
    imageUrl: autovantageImg,
  },
  // {
  //   title: "Word Analytics",
  //   description:
  //     "A public web app for quick analytics on text. It shows word count, character count and social media post limits.",
  //   tags: ["React", "Next.js", "SQL", "Tailwind", "Framer"],
  //   imageUrl: wordanalyticsImg,
  // },
] as const;

export const skillsData = [
  "HTML",
  "CSS",
  "JavaScript",
  "React",
  "Redux",
  "Next.js",
  "Node.js",
  "Git",
  "Tailwind",
  "MongoDB",
  "FastAPI",
  "PostgreSQL",
  "Python",
  "Django",
  "Framer Motion",
  "TypeScript",
] as const;
