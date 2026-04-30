import Image from "next/image";
import Link from 'next/link';
import speedstormCover from '../../public/assets/others/Home page cover.webp';
import nievoHubwhite from '@/../public/assets/others/NievoHub white.png';
import speedstormTitle from '@/../public/assets/others/Speedstorm title.webp';
import tuneCoins from '@/../public/assets/currencies/Tune Coins.png';

export default function Home() {
  return (
    <div className="flex flex-col flex-1 items-center justify-center font-sans h-full">
      <main className="flex flex-1 w-full h-full flex-col items-center sm:items-start">
        <div className="text-lg mx-auto p-8">
          Welcome to 
          <Image src={nievoHubwhite} alt="NievoHub Logo" width={120} height={18} priority className="inline-block align-middle mx-2" />
          The Ultimate Disney
          <Image src={speedstormTitle} alt="Speedstorm Title" width={80} height={18} className="inline-block align-middle mx-2" />
          Dashboard
        </div>
        <Link href="/tune-coins-calculator" className="mx-auto text-lg font-medium transition-opacity hover:opacity-80 shadow-md rounded-2xl">
          <div className="bg-white/10 px-6 py-12 rounded-3xl border border-white/5 text-center flex items-center justify-center gap-4">
            <span className="relative self-center">
              <Image src={tuneCoins} alt="" width={20} height={20} />
            </span>
            Tune Coins Calculator
          </div>
        </Link>
        <div className="text-md mx-auto p-4">
          More tools coming soon!
        </div>
        <Image
          src={speedstormCover}
          alt="Speedstorm cover"
          width={1920}
          height={1080}
          className="w-full max-w-full landscape:max-w-[50%] lg:max-w-[60rem] self-end absolute bottom-0 pointer-events-none select-none"
        />
      </main>
    </div>
  );
}
