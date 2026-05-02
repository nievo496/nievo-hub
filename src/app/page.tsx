import Image from "next/image";
import Link from 'next/link';
import Script from 'next/script';
import speedstormCover from '../../public/assets/others/Home page cover.webp';
import nievoHubwhite from '@/../public/assets/others/NievoHub white.png';
import tuneCoins from '@/../public/assets/currencies/Tune Coins.png';

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "NievoHub",
  "description": "The ultimate Disney Speedstorm dashboard with useful tools like Tune Coins Calculator.",
  "applicationCategory": "GameApplication",
  "operatingSystem": "Web",
  "url": "https://nievo-hub.vercel.app",
  "author": {
    "@type": "Person",
    "name": "Nievo"
  }
};

export default function Home() {
  return (
    <>
      <Script
        id="structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="flex flex-col flex-1 items-center justify-center font-sans h-full">
        <main className="flex flex-1 w-full h-full flex-col items-center sm:items-start">
          <div className="text-lg mx-auto p-8">
            <Image src={nievoHubwhite} alt="NievoHub Logo" width={160} height={24} priority className="mx-auto mb-2" />
            <h1>Welcome to NievoHub The Ultimate Disney Speedstorm Dashboard</h1>
          </div>
          <Link href="/tune-coins-calculator" className="mx-auto my-8 text-lg font-medium transition-opacity hover:opacity-80 shadow-md rounded-2xl">
            <div className="bg-white/10 px-6 py-10 rounded-3xl border border-white/5 text-center flex items-center justify-center gap-4">
              <span className="relative self-center">
                <Image src={tuneCoins} alt="Disney Speedstorm Tune Coins" width={20} height={20} />
              </span>
              Tune Coins Calculator
            </div>
          </Link>
          <div className="text-md mx-auto p-6">
            More tools coming soon!
          </div>
          <Image
            src={speedstormCover}
            alt="Disney Speedstorm cover"
            width={1920}
            height={1080}
            className="w-full max-w-full landscape:max-w-[50%] lg:max-w-[60rem] self-end absolute bottom-0 pointer-events-none select-none"
          />
        </main>
      </div>
    </>
  );
}
