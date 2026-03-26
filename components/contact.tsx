"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import { BsArrowRight } from "react-icons/bs";
import { useSectionInView } from "@/lib/hooks";
import { sendEmail } from "@/actions/sendEmail";
import SectionHeading from "./section-heading";

import styles from "@/scss/contact.module.scss";

export default function Contact() {
  const { ref } = useSectionInView("Contact");

  return (
    <motion.section
      ref={ref}
      id="contact"
      className={styles.section}
      initial={{ opacity: 0, y: 48 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      viewport={{ once: true }}
    >
      <SectionHeading eyebrow="Get in touch">Contact Me</SectionHeading>

      <p className={styles.lead}>
        Reach me directly at{" "}
        <a href="mailto:ethan.flores.js@gmail.com">
          ethan.flores.js@gmail.com
        </a>{" "}
        or via this form.
      </p>

      <form
        className={styles.form}
        action={async (formData) => {
          const { data, error } = await sendEmail(formData);
          if (error) {
            alert(error);
            return;
          }
          alert("Email sent successfully!");
        }}
      >
        <div className={styles.field}>
          <div className={styles.accentBar} />
          <input
            className={styles.input}
            name="senderEmail"
            type="email"
            required
            maxLength={500}
            placeholder="Your email"
          />
        </div>

        <div className={styles.field}>
          <div className={styles.accentBar} />
          <textarea
            className={styles.textarea}
            name="message"
            placeholder="Your message"
            required
            maxLength={5000}
          />
        </div>

        <button type="submit" className={styles.submitBtn}>
          <span>Send message</span>
          <BsArrowRight />
        </button>
      </form>
    </motion.section>
  );
}
