import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Navigation } from "./components/Navigation";
import { NoisyLines } from "./components/NoisyLines";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Ben Rutledge - Front-End Developer",
  description: "Portfolio and personal site of Ben Rutledge, a front-end developer",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {/* Fixed background noise lines across all pages */}
        <div className="fixed inset-0 z-0">
          <NoisyLines />
        </div>
        
        <Navigation />
        {children}
      </body>
    </html>
  );
}
