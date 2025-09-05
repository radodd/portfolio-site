import Contact from "@/components/contact";
import Experience from "@/components/experience";
import Intro from "@/components/intro";
import { experiencesData, projectsData } from "@/lib/data";
import Projects from "@/components/projects";
import About from "@/components/cursor/about";

import styles from "@/scss/home.module.scss";
import SectionDivider from "@/components/section-divider";
import SectionHeading from "@/components/section-heading";

export default function Home() {
  return (
    <main className={styles.container}>
      <Intro />
      <SectionDivider />
      <About />
      <SectionDivider />
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
      <SectionDivider />

      <Experience experiencesData={[experiencesData[0], experiencesData[1]]} />
      <Contact />
    </main>
  );
}
