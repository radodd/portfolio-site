import About from "@/components/about";
import Contact from "@/components/contact";
import Cursor from "@/components/cursor/cursor";
import GradientCursor from "@/components/cursor/gradient-cursor";
import Scene1 from "@/components/cursor/scene1";
import Scene2 from "@/components/cursor/scene2";
import Double from "@/components/double";
import Experience from "@/components/experience";
import Experience2 from "@/components/experience2";
import Intro from "@/components/intro";
import Painter from "@/components/painter";
import Projects from "@/components/projects";
import SectionDivider from "@/components/section-divider";
import SectionHeading from "@/components/section-heading";
import Skills from "@/components/skills";
import { projectsData } from "@/lib/data";

export default function Home() {
  return (
    <main className="flex flex-col ">
      <Intro />
      {/* <About /> */}
      {/* <Cursor /> */}

      {/* <Scene1 /> */}
      <Scene2 />
      {/* <Painter /> */}
      {/* <Projects /> */}
      <div className="flex flex-col items-center">
        <SectionDivider />
        <SectionHeading>Completed Projects</SectionHeading>
        <Double projectsData={[projectsData[0], projectsData[1]]} />
        <Double
          projectsData={[projectsData[2], projectsData[3]]}
          reversed={true}
        />
      </div>

      <div className="flex justify-center mt-[15rem]">
        <Skills />
      </div>

      {/* <Experience /> */}
      <Experience2 />
      <Contact />
    </main>
  );
}
