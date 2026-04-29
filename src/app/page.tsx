import Image from "next/image";
import speedstormCover from '../../public/assets/others/Home page cover.webp';

export default function Home() {
  return (
    <div className="flex flex-col flex-1 items-center justify-center font-sans h-full">
      <main className="flex flex-1 w-full h-full flex-col items-center justify-between sm:items-start">
        <div className="text-lg mx-auto py-8 px-8">
          Welcome to NievoHub - The Ultimate Disney Speedstorm Dashboard
        </div>
        <Image
          src={speedstormCover}
          alt="Speedstorm cover"
          width={1920}
          height={1080}
          className="w-full max-w-full lg:max-w-[76.25rem] self-end"
        />
      </main>
    </div>
  );
}
