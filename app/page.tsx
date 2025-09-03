import About from "@/components/about";
import Contact from "@/components/contact";
import Cursor from "@/components/cursor/cursor";
import GradientCursor from "@/components/cursor/gradient-cursor";
import Scene1 from "@/components/cursor/scene1";
import Scene2 from "@/components/cursor/scene2";
import Experience from "@/components/experience";

import Intro from "@/components/intro";
import Painter from "@/components/painter";

import SectionDivider from "@/components/section-divider";
import SectionHeading from "@/components/section-heading";
import Skills from "@/components/skills";
import { experiencesData, projectsData } from "@/lib/data";
import Projects from "@/components/projects";

export default function Home() {
  return (
    <main className="flex flex-col ">
      <Intro />
      {/* <About /> */}
      {/* <Cursor /> */}

      {/* <Scene1 /> */}
      <Scene2 />
      {/* <Painter /> */}

      <div className="flex flex-col items-center">
        <Projects projectsData={[projectsData[0], projectsData[1]]} />
        <Projects
          projectsData={[projectsData[2], projectsData[3]]}
          reversed={true}
        />
      </div>

      {/* <div className="flex justify-center mt-[15rem]">
        <Skills />
      </div> */}

      {/* <Experience /> */}
      <Experience experiencesData={[experiencesData[0], experiencesData[1]]} />
      <Contact />
    </main>
  );
}
