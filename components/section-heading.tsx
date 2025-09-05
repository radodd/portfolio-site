import styles from "@/scss/section-heading.module.scss";

type SectionHeadingProps = {
  children: React.ReactNode;
};

export default function SectionHeading({ children }: SectionHeadingProps) {
  return <h2 className={styles.container}>{children}</h2>;
}
