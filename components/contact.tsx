"use client";

import React from "react";
import SectionHeading from "./section-heading";
import { FaPaperPlane } from "react-icons/fa";
import { motion } from "framer-motion";
import { useSectionInView } from "@/lib/hooks";
import { format } from "path";
import { sendEmail } from "@/actions/sendEmail";

export default function Contact() {
  const { ref } = useSectionInView("Contact");

  return (
    <motion.section
      ref={ref}
      id="contact"
      className="mb-20 sm:mb-28 w-[min(100%,38rem)] text-center"
      initial={{
        opacity: 0,
      }}
      whileInView={{
        opacity: 1,
      }}
      transition={{
        duration: 1,
      }}
      viewport={{
        once: true,
      }}
    >
      <SectionHeading>Contact Me</SectionHeading>
      <p className="text-gray-700 -mt-4">
        Please contact me directly at{" "}
        <a className="underline" href="mailto:ethan.flores.js@gmail.com">
          ethan.flores.js@gmail.com
        </a>{" "}
        or via this form.
      </p>
      <form
        className="mt-10 flex flex-col"
        action={async (formData) => {
          await sendEmail(formData);
        }}
      >
        <input
          className="h-14 px-4 rounded-lg border borderBlack"
          name="senderEmail"
          type="email"
          required
          maxLength={500}
          placeholder="Your email"
        />
        <textarea
          className="h-52 my-3 rounded-lg borderBlack p-4"
          name="message"
          placeholder="Your message"
          required
          maxLength={500}
        />
        <button
          className="group flex items-center justify-center gap-2 h-[3rem] w-[8rem] bg-gray-900 text-white rounded-full outline-none transition-all focus:scale-110 hover:scale-110 active:scale-105"
          type="submit"
        >
          Submit{" "}
          <FaPaperPlane className="text-xs opacity-80 transition-all group-hover:translate-x-2 group-hover:-translate-y-1" />
        </button>
      </form>
    </motion.section>
  );
}
