import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import "@fontsource/bangers/index.css";
import "@fontsource/comic-neue/index.css";
import CustomCursor from "@/components/CustomCursor";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Pankaj OS",
  description: "Pankaj Bhatta's interactive portfolio and terminal experience.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased font-comic-neue`}
        style={{ fontFamily: 'var(--font-comic-neue)' }}
      >
        <CustomCursor enabled={true} />
        {children}
      </body>
    </html>
  );
}
