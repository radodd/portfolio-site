import Contact from "@/components/contact";
import Experience from "@/components/experience";
import Intro from "@/components/intro";
import { experiencesData, projectsData } from "@/lib/data";
import Projects from "@/components/projects";
import About from "@/components/cursor/about";
import SectionHeading from "@/components/section-heading";

import styles from "@/scss/home.module.scss";
import AboutButtons from "@/components/about-buttons";

export default function Home() {
  return (
    <main className={styles.container}>
      <Intro />

      <About />
      <AboutButtons />
      <div className="flex flex-col items-center">
        <SectionHeading>Completed Projects</SectionHeading>
        <Projects projectsData={[projectsData[0], projectsData[1]]} />
        <Projects
          projectsData={[projectsData[2], projectsData[3]]}
          reversed={true}
        />
      </div>

      {/* <div className="flex justify-center mt-[15rem]">
        <Skills />
      </div> */}

      <Experience experiencesData={[experiencesData[0], experiencesData[1]]} />
      <Contact />
    </main>
  );
}
