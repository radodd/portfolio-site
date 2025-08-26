import About from "@/components/about";
import Contact from "@/components/contact";
import Double from "@/components/double";
import Experience from "@/components/experience";
import Intro from "@/components/intro";
import Projects from "@/components/projects";
import SectionDivider from "@/components/section-divider";
import Skills from "@/components/skills";
import { projectsData } from "@/lib/data";

export default function Home() {
  return (
    <main className="flex flex-col items-center px-4">
      <Intro />
      <SectionDivider />
      <About />
      <Projects />
      <Double projectsData={[projectsData[0], projectsData[1]]} />
      {/* <Double projectsData={[projectsData[2], projectsData[3]]} /> */}

      <Skills />
      <Experience />
      <Contact />
    </main>
  );
}
