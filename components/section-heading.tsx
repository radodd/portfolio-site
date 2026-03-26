import styles from "@/scss/section-heading.module.scss";

type SectionHeadingProps = {
  children: React.ReactNode;
  eyebrow?: string;
};

export default function SectionHeading({ children, eyebrow }: SectionHeadingProps) {
  return (
    <div className={styles.container}>
      {eyebrow && <p className={styles.eyebrow}>{eyebrow}</p>}
      <h2 className={styles.text}>{children}</h2>
      <div className={styles.rule} />
    </div>
  );
}
