import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Image from "next/image";
import backgroundImage from '../../public/assets/others/Blue Background.jpg';
import nievoProfileIamge from '../../public/assets/others/nievo-profile_image.jpeg';
import nievoHubwhite from '../../public/assets/others/NievoHub white.png';

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
    icon: "/assets/others/icon-white.png"
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
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
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
        <div className="z-1 flex h-16 my-8 mx-8 position-relative flex gap-4">
          <Image
            src={nievoProfileIamge}
            alt="Nievo Profile Image"
            width={64}
            height={64}
            className="rounded-full"
          />
          <Image
            src={nievoHubwhite}
            alt="Speedstorm Logo"
            width={1000}
            height={300}
            priority
            className="h-full w-auto"
          />
        </div>
        <div className="z-1 w-full h-full">
          {children}
        </div>
      </body>
    </html>
  );
}
