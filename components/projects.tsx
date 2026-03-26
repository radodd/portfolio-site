"use client";

import Image from "next/image";
import Link from "next/link";
import { useSectionInView } from "@/lib/hooks";
import styles from "@/scss/projects.module.scss";

interface Project {
  eyebrow?: string;
  title: string;
  description: string;
  tags: readonly { name: string; color: string }[];
  imageUrl: string;
  href: string;
  slug?: string;
  comingSoon?: string;
  featured?: boolean;
  hrefLabel?: string;
}

interface ProjectsProps {
  projectsData: readonly Project[];
  cardStyle: "co2" | "mt2";
}

/* ── Featured card: full-width hero card ── */
function FeaturedCard({ project }: { project: Project }) {
  return (
    <div className={styles.featuredCard}>
      <div className={styles.featuredImageWrap}>
        <div className={styles.featuredImageInner}>
          <Image
            src={project.imageUrl}
            alt={project.title}
            fill
            style={{ objectFit: "cover", objectPosition: "top center" }}
            sizes="100vw"
            priority
          />
        </div>
      </div>
      <div className={styles.featuredInfo}>
        <div className={styles.featuredEyebrow}>{project.eyebrow ?? "Featured Project"}</div>
        <h3 className={styles.featuredTitle}>{project.title}</h3>
        <p className={styles.featuredDesc}>{project.description}</p>
        <div className={styles.co2Tags}>
          {project.tags.map((tag) => (
            <span
              key={tag.name}
              className={styles.co2Tag}
              style={{
                background: `${tag.color}1a`,
                color: tag.color,
                border: `1px solid ${tag.color}40`,
              }}
            >
              {tag.name}
            </span>
          ))}
        </div>
        {project.comingSoon && (
          <p className={styles.featuredComingSoon}>
            🚀 Live deployment: {project.comingSoon}
          </p>
        )}
        <div className={styles.co2Actions}>
          {project.slug && (
            <Link
              href={`/projects/${project.slug}`}
              className={styles.co2CaseStudyLink}
              onClick={(e) => e.stopPropagation()}
            >
              Case Study →
            </Link>
          )}
          <Link
            href={project.href}
            target="_blank"
            className={styles.co2ViewLink}
            onClick={(e) => e.stopPropagation()}
          >
            {project.hrefLabel ?? "View project →"}
          </Link>
        </div>
      </div>
    </div>
  );
}

/* ── CO2 card: image-heavy ── */
function Co2Card({ project, index }: { project: Project; index: number }) {
  return (
    <div className={styles.co2Card}>
      <div className={styles.co2ImageWrap}>
        <div className={styles.co2ImageInner}>
          <Image
            src={project.imageUrl}
            alt={project.title}
            fill
            style={{ objectFit: "cover" }}
            sizes="(max-width: 640px) 100vw, 62vw"
          />
        </div>
      </div>
      <div className={styles.co2Info}>
        {project.eyebrow && <p className={styles.co2Eyebrow}>{project.eyebrow}</p>}
        <h3 className={styles.co2Title}>{project.title}</h3>
        <p className={styles.co2Desc}>{project.description}</p>
        <div className={styles.co2Tags}>
          {project.tags.map((tag) => (
            <span
              key={tag.name}
              className={styles.co2Tag}
              style={{
                background: `${tag.color}1a`,
                color: tag.color,
                border: `1px solid ${tag.color}40`,
              }}
            >
              {tag.name}
            </span>
          ))}
        </div>
        {project.comingSoon && (
          <p style={{ fontSize: "0.72rem", color: "#a0a0a0", margin: "0 0 10px", letterSpacing: "0.04em" }}>
            🚀 Live deployment: {project.comingSoon}
          </p>
        )}
        <div className={styles.co2Actions}>
          {project.slug && (
            <Link
              href={`/projects/${project.slug}`}
              className={styles.co2CaseStudyLink}
              onClick={(e) => e.stopPropagation()}
            >
              Case Study →
            </Link>
          )}
          <Link
            href={project.href}
            target="_blank"
            className={styles.co2ViewLink}
            onClick={(e) => e.stopPropagation()}
          >
            {"hrefLabel" in project ? project.hrefLabel : "View project →"}
          </Link>
        </div>
      </div>
    </div>
  );
}

/* ── MT2 card: minimal editorial ── */
function Mt2Card({ project, index }: { project: Project; index: number }) {
  const num = String(index + 1).padStart(2, "0");

  return (
    <Link href={project.href} target="_blank" className={styles.mt2Card}>
      <p className={styles.mt2Num}>{num}</p>
      <h3 className={styles.mt2Title}>{project.title}</h3>
      <p className={styles.mt2Desc}>{project.description}</p>
      <div className={styles.mt2Bot}>
        <div className={styles.mt2Tags}>
          {project.tags.map((tag) => (
            <span key={tag.name} className={styles.mt2Tag}>
              {tag.name}
            </span>
          ))}
        </div>
        <span className={styles.mt2ViewLink}>View →</span>
      </div>
    </Link>
  );
}

/* ── Projects section ── */
const Projects = ({ projectsData, cardStyle }: ProjectsProps) => {
  const { ref } = useSectionInView("Projects", 0.2);

  return (
    <div ref={ref} id="projects" className={styles.projectsSection}>
      {cardStyle === "co2" ? (
        <div className={styles.co2Grid}>
          {projectsData.map((project, i) =>
            project.featured ? (
              <FeaturedCard key={project.title} project={project} />
            ) : (
              <Co2Card key={project.title} project={project} index={i} />
            )
          )}
        </div>
      ) : (
        <div className={styles.mt2Grid}>
          {projectsData.map((project, i) => (
            <Mt2Card key={project.title} project={project} index={i} />
          ))}
        </div>
      )}

    </div>
  );
};

export default Projects;
