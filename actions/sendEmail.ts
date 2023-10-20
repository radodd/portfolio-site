"use server";

import React from "react";
import { Resend } from "resend";
// import { InvalidatedProjectKind } from "typescript";
import { validateString, getErrorMessage } from "@/lib/utils";
import ContactFormEmail from "@/email/contact-form-email";

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendEmail = async (formData: FormData) => {
  const senderEmail = formData.get("senderEmail");
  const message = formData.get("message");

  //   server-side validation
  if (!validateString(senderEmail, 500)) {
    return {
      error: "Invalid sender email",
    };
  }
  if (!validateString(message, 5000)) {
    return {
      error: "Invalid message",
    };
  }

  // "as string" asserts the inputs have been validated and are strings.
  // must be explicitly stated because typescript does not pick up on the helper function (server-side)
  // or the user-side validations

  let data;
  try {
    await resend.emails.send({
      from: "Contact from Portfolio Site<onboarding@resend.dev>",
      to: "ethan.flores.js@gmail.com",
      subject: "message from contact form",
      text: message as string,
      reply_to: senderEmail as string,
      // react: React.createElement(ContactFormEmail, {
      //   message: message as string,
      //   senderEmail: senderEmail as string,
      // }),
    });
  } catch (error: unknown) {
    return {
      error: getErrorMessage(error),
    };
  }
  return {
    data,
  };
};
