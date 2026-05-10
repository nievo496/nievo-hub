import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";
import { cn } from "@/lib/utils";
import { Analytics } from '@vercel/analytics/next';

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
  title: "NievoHub | Disney Speedstorm Tune Coins Calculator & Dashboard",
  description: "The ultimate Disney Speedstorm dashboard. Calculate your Tune Coins and Racer Shards costs for upgrading your racers.",
  appleWebApp: {
    title: "NievoHub",
    statusBarStyle: "black-translucent",
    capable: true,
  },
  keywords: ["NievoHub", "Nievo Hub", "Nievo calculator", "Speedstorm upgrades", "Speedstorm tune coins", "Disney Speedstorm", "Dashboard", "Tune Coins Calculator"],
  icons: {
    icon: "/assets/others/icon-blue.png",
    apple: '/assets/others/apple-touch-icon.png',
  },
  verification: {
    google: 'DyW04xI3ikNMsgCcZf9omsyTyhqCrETpTl3zcXPrUQM',
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
        <div className="relative z-10 flex flex-col w-full h-full text-white">
          <Navbar />
          <div className="flex-1 w-full">
            {children}
          </div>
        </div>
        <Analytics />
      </body>
    </html>
  );
}
