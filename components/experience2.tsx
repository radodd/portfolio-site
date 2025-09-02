import { experiencesData } from "@/lib/data";
import Button from "@/liftkit/components-lk/button";
import Image from "next/image";

import styles from "@/scss/experience.module.scss";

const Experience2 = () => {
  return (
    <div>
      {experiencesData.map((exp, i) => (
        <div key={i} className={styles.container}>
          <div className={styles.textContainer}>
            <h1>{exp.company}</h1>
            <span>{exp.role}</span>
            <p>{exp.roleDescription}</p>
            <p>{exp.companyDescription}</p>
            <div className={styles.buttonsContainer}>
              <Button label={exp.button1.label} color="primary" size="lg" />
            </div>
          </div>
          <div className={styles.imagesContainer}>
            <Image src={exp.image1} alt="image" width={200} height={100} />
            <Image src={exp.image2} alt="image" width={200} height={100} />
          </div>
        </div>
      ))}
    </div>
  );
};

export default Experience2;
