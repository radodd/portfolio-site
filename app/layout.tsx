import "./globals.css";
import { Inter } from "next/font/google";
import Header from "@/components/header";
import ActiveSectionContextProvider from "@/context/active-section-context";
import GoogleTagManager from "./google-tag-manager";
import { Analytics } from "@vercel/analytics/react";
import BlobLayer from "@/components/blob-layer";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Ethan | Personal Portfolio",
  description: "Ethan is a full-stack developer.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="!scroll-smooth">
      <GoogleTagManager />
      <body
        className={`${inter.className} bg-slate-800  text-gray-950 relative pt-28 sm:pt-36`}
      >
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
