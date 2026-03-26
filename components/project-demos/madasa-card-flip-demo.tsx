"use client";

import Image from "next/image";
import styles from "@/scss/madasa-card-flip-demo.module.scss";

const cards = [
  {
    icon: "/branding.png",
    title: "Branding",
    text: "Your vision is transformed into a brand that reflects your style & values.",
    back: "/branding_back.png",
    alt: "Business branding, logo design, color palette",
  },
  {
    icon: "/product.png",
    title: "Product Design",
    text: "Your needs are prioritized, while ensuring a user-centric design.",
    back: "/product_back.png",
    alt: "Product design, client collaboration, site maps, wire frames",
  },
  {
    icon: "/development.png",
    title: "Development",
    text: "Your digital product is optimized for your use and your company's success.",
    back: "/development_back.png",
    alt: "Web development, web deployment, full stack, SEO",
  },
];

export default function MadasaCardFlipDemo() {
  return (
    <div className={styles.demo}>
      <div className={styles.bgPattern} aria-hidden />

      <div className={styles.scene}>
        {cards.map((card, i) => (
          <div key={i} className={styles.cardWrap}>
            <div className={styles.card}>

              {/* Front — white bg, icon + title */}
              <div className={styles.cardFront}>
                <Image
                  src={card.icon}
                  alt={card.alt}
                  width={256}
                  height={256}
                  sizes="256px"
                  className={styles.iconImg}
                />
                <h3 className={styles.cardTitle}>{card.title}</h3>
              </div>

              {/* Back — full bleed image behind pill text */}
              <div className={styles.cardBack}>
                <Image
                  src={card.back}
                  alt="Custom Madasa Collective designs"
                  fill
                  sizes="(max-width: 768px) 150px, 210px"
                  className={styles.backImg}
                />
                <p className={styles.cardText}>{card.text}</p>
              </div>

            </div>
          </div>
        ))}
      </div>

      <div className={styles.hintBar}>
        <span className={styles.hintText}>
          Hover to flip · cubic-bezier(0.34, 1.2, 0.64, 1) overshoot · preserve-3d · backface-visibility hidden
        </span>
      </div>
    </div>
  );
}
