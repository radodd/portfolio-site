import React from "react";
import { MdMilitaryTech } from "react-icons/md";
import { FaReact } from "react-icons/fa";
import { LiaToothSolid } from "react-icons/lia";
import { FaCode } from "react-icons/fa";
import animosImg from "@/public/animos.png";
import autovantageImg from "@/public/autovantage.png";
import HTML from "@/public/HTML.png";
import CSS from "@/public/CSS.png";
import JS from "@/public/JS.png";
import ReactJs from "@/public/ReactJs.png";
import Redux from "@/public/Redux.png";
import NextJs from "@/public/NextJs.png";
import Node from "@/public/Node.png";
import Git from "@/public/Git.png";
import TailwindCSS from "@/public/TailwindCSS.png";
import Mongo from "@/public/Mongo.png";
import FastAPI from "@/public/FastAPI.png";
import PostgreSQL from "@/public/PostgreSQL.png";
import Python from "@/public/Python.png";
import Django from "@/public/Django.png";
import FramerMotion from "@/public/FramerMotion.png";
import TypeScript from "@/public/TypeScript.png";
import TherapistSite from "@/public/TherapistSite.png";
import FriendshipCenter from "@/public/FriendshipCenter.png";
import test from "@/public/test.mp4";
import recording from "@/public/recording.mp4";

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
    title: "Freelance Web Development and Design",
    location: "Remote",
    description:
      "Collaborated with a senior product designer, UX/UI designer, and fellow engineer to ideate, design, develop, and deploy a sophisticated website. Created a seamless communication workflow that allowed for real-time responses and proper prioritization of painpoints, edgecases, and issues that resulted in the generation of effective solutions.",
    icon: React.createElement(FaCode),
    date: "2023-Present",
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
    title: "US Army Officer, Combat Engineer",
    location: "Schofield Barracks, HI",
    description:
      "I led and executed combat engineering operations, specializing in mobility support, route clearance, and countermobility. I also was responsible for the forecasting, planning, and coordination of engineering training requirements and objectives.",
    icon: React.createElement(MdMilitaryTech),
    date: "2016-2021",
  },
  {
    title: "Hack Reactor by Galvanize",
    location: "Remote",
    description:
      "Studied the fundamentals of full-stack software engineering, covering Python and Django, HTML/CSS, databases, and collaboration in project development. Familiarized with data management and cloud-based development, including WebSockets, GitHub Copilot, and DevSecOps practices, culminating in a personal project that replicates professional software development processes",
    icon: React.createElement(FaReact),
    date: "2023",
  },
] as const;

export const projectsData = [
  // {
  //   title: "Coaching and Consulting Website",
  //   description:
  //     "A personalized website for a private practice with an emphasis of mental health and wellness",
  //   tags: ["Next.js", "React", "Tailwind", "TypeScript"],
  //   imageUrl: "",
  //   // video: test,
  //   href: "https://genfulton.com",
  // },
  {
    title: "Friendship Center Santa Barbara",
    description:
      "A non-profit organization offering adult day program services to elder clients. I provided insight on a effective UX/UI while maintaining the principles of accessability",
    tags: ["SEO", "Google Analytics", "CMS"],
    // imageUrl: FriendshipCenter.src,
    imageUrl: "/FriendshipCenter.png",
    href: "https://www.friendshipcentersb.org/",
  },
  {
    title: "Animos",
    description:
      "A social media web application that connects users and their pets with other pet owns and allows users to schedule, promote, and publicize pet-friendly meet-ups at pet-friendly locations.",
    tags: ["Python", "JavaScript", "React", "Redux", "FastAPI", "MongoDB"],
    // imageUrl: animosImg.src,
    imageUrl: "/animos.png",
    href: "https://github.com/radodd/animos",
  },
  // {
  //   title: "Animos",
  //   description:
  //     "A social media web application that connects users and their pets with other pet owns and allows users to schedule, promote, and publicize pet-friendly meet-ups at pet-friendly locations.",
  //   tags: ["Python", "JavaScript", "React", "Redux", "FastAPI", "MongoDB"],
  //   // imageUrl: animosImg.src,
  //   imageUrl: "/animos.png",
  //   href: "https://github.com/radodd/animos",
  // },
  // {
  // title: "AutoVantage",
  // description:
  //   "Auto shop management portal that allows users to track inventory, sales, and services or all vehicles.",
  // tags: [
  //   "Python",
  //   "JavaScript",
  //   "Django",
  //   "Bootstrap",
  //   "PostgreSQL",
  //   "Insomnia",
  // ],
  // imageUrl: autovantageImg.src,
  // href: "https://github.com/radodd/AutoVantage",
  // },
  // {
  //   title: "Word Analytics",
  //   description:
  //     "A public web app for quick analytics on text. It shows word count, character count and social media post limits.",
  //   tags: ["React", "Next.js", "SQL", "Tailwind", "Framer"],
  //   imageUrl: wordanalyticsImg,
  // },
] as const;

export const skillsData = [
  HTML,
  CSS,
  JS,
  ReactJs,
  Redux,
  NextJs,
  Node,
  Git,
  TailwindCSS,
  Mongo,
  FastAPI,
  PostgreSQL,
  Python,
  Django,
  FramerMotion,
  TypeScript,
] as const;
