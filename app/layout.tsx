import "./globals.css";
import { Fraunces, DM_Mono } from "next/font/google";
import Header from "@/components/header";
import ActiveSectionContextProvider from "@/context/active-section-context";
import GoogleTagManager from "./google-tag-manager";
import { Analytics } from "@vercel/analytics/react";
import BlobLayer from "@/components/blob-layer";

const fraunces = Fraunces({
  subsets: ["latin"],
  axes: ["opsz"],
  variable: "--font-display",
  display: "swap",
});

const dmMono = DM_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata = {
  title: "Ethan Flores | Front-End Engineer",
  description: "Army veteran turned front-end engineer — building beautiful, performant web experiences.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`!scroll-smooth ${fraunces.variable} ${dmMono.variable}`}>
      <GoogleTagManager />
      <body className="bg-background text-ds-text relative">
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-K9SLWTD2"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          ></iframe>
        </noscript>

        <BlobLayer />
        <ActiveSectionContextProvider>
          <Header />
          {children}
          <Analytics />
        </ActiveSectionContextProvider>
      </body>
    </html>
  );
}
