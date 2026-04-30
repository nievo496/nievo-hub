import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter } from "next/font/google";
import "./globals.css";
import Image from "next/image";
import backgroundImage from '../../public/assets/others/Blue Background.jpg';
import Navbar from "./components/Navbar";
import { cn } from "@/lib/utils";

const inter = Inter({subsets:['latin'],variable:'--font-sans'});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "NievoHub",
  description: "The ultimate Disney Speedstorm dashboard",
  icons: {
    icon: "/assets/others/icon-blue.png"
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={cn("h-full", "antialiased", geistSans.variable, geistMono.variable, "font-sans", inter.variable)}
      suppressHydrationWarning
    >
      <body className="min-h-full h-full flex flex-col position-relative">
        <Image
          src={backgroundImage}
          alt="Blue Background"
          placeholder="blur"
          quality={80}
          fill
          sizes="100vw"
          priority
          className="object-cover"
        />
        <div className="relative z-10 flex flex-col w-full h-full text-white">
          <Navbar />
          <div className="flex-1 w-full">
            {children}
          </div>
        </div>
      </body>
    </html>
  );
}
