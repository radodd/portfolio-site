import Contact from "@/components/contact";
import Experience from "@/components/experience";
import Intro from "@/components/intro";
import { experiencesData, projectsData } from "@/lib/data";
import Projects from "@/components/projects";
import About from "@/components/cursor/about";
import SectionHeading from "@/components/section-heading";
import SectionDivider from "@/components/section-divider";

import styles from "@/scss/home.module.scss";

export default function Home() {
  return (
    <main className={styles.container}>
      <Intro />

      <About />

      <div className="flex flex-col items-center w-full gap-0">
        <SectionHeading eyebrow="Selected Work">Completed Projects</SectionHeading>
        <Projects
          projectsData={[projectsData[0], projectsData[1], projectsData[2], projectsData[3]]}
          cardStyle="co2"
        />
      </div>

      <Experience experiencesData={[experiencesData[0], experiencesData[1]]} />

      <Contact />
    </main>
  );
}
