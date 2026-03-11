import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Header } from "@/app/components/Header";
import { Footer } from "@/app/components/Footer";
import { NoisyLines } from "@/app/components/NoisyLines";

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
        <Header />
        {/* <div className="fixed inset-0 z-0"> */}
        <div
          style={{
            top: 'var(--header-height)',
            height: 'calc(100vh - var(--header-height))'
          }}
          className="fixed left-0 right-0 bottom-0"
        >
          <NoisyLines />
        </div>
        <main className="relative w-screen min-h-screen z-9">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
