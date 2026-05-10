"use client";

import { useState } from 'react';
import Image from 'next/image';
import { FaTwitch, FaYoutube } from 'react-icons/fa';
import { MdEmail } from 'react-icons/md';
import { SiKofi } from 'react-icons/si';
import { ListOrdered } from 'lucide-react';
import { LinkCard } from '@/app/components/LinkCard';
import nievoAvatar from '@/../public/assets/others/nievo-profile_image.jpeg';

const socialLinks = [
  {
    name: 'Twitch',
    url: 'https://twitch.tv/nievo',
    icon: <FaTwitch />,
    displayText: 'Follow me on Twitch',
    brandColor: 'bg-[#9146FF]',
    glow: 'shadow-[#9146FF]/20'
  },
  {
    name: 'YouTube',
    url: 'https://youtube.com/@nievo96',
    icon: <FaYoutube />,
    displayText: 'Subscribe on Youtube',
    brandColor: 'bg-[#FF0000]',
    glow: 'shadow-[#FF0000]/20'
  },
  {
    name: 'Ko-fi',
    url: 'https://ko-fi.com/nievo',
    icon: <SiKofi />,
    displayText: 'Support me on Ko-fi',
    brandColor: 'bg-[#29ABE2]',
    glow: 'shadow-[#29ABE2]/20'
  },
  {
    name: 'Email',
    url: 'mailto:nievo496@gmail.com',
    icon: <MdEmail color="black" />,
    displayText: 'Contact me via Email',
    brandColor: 'bg-white',
    glow: 'shadow-white/10'
  },
];

const resourceLinks = [
  {
    name: 'All racers vs Supercharged',
    url: 'https://tiermaker.com/create/disney-speedstorm-racers-18181074',
    icon: <ListOrdered size={24} color="white" />,
    displayText: 'Rank all racers',
    brandColor: 'bg-[#FF7F50]',
    glow: 'shadow-[#FF7F50]/20'
  },
  {
    name: 'Supercharged Tier List',
    url: 'https://tiermaker.com/create/disney-speedstorm-supercharged-racers-season-17-18181074',
    icon: <ListOrdered size={24} color="white" />,
    displayText: 'Rank Supercharged racers',
    brandColor: 'bg-[#FF7F50]',
    glow: 'shadow-[#FF7F50]/20'
  },
];

export default function LinksPage() {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <main className="flex flex-col items-center justify-start min-h-screen p-4 pt-8">
      <div className="w-full max-w-lg space-y-4">
        <h1 className="text-3xl font-bold text-center mb-4 text-white">Social Links</h1>
        <h2 className="text-xl font-semibold text-center mb-4 text-white">
          <Image
            src={nievoAvatar}
            alt="Nievo Avatar"
            width={44}
            height={44}
            className="inline-block mr-4 rounded-full"
          />
          Nievo
        </h2>

        <div className="bg-white/5 border border-white/10 rounded-2xl p-5 mb-6">
          <p className={`text-slate-300 text-sm leading-relaxed transition-all duration-300 ${!isExpanded ? 'line-clamp-3' : ''}`}>
            Hey, I'm Nievo! I’m a competitive gamer and developer dedicated to helping 
            the community through data and expertise. Whether I’m streaming Disney Speedstorm 
            and Rocket League or sharing guides and clips on YouTube, my goal is to help you race smarter. 
            <br /><br />
            I built NievoHub to make optimization easy for everyone—if the dashboard or my 
            videos have helped you out, consider supporting my work on Ko-fi. Have a 
            feature idea or found a bug? Drop me an email; I’d love to hear your feedback!
          </p>
          
          <button 
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-white hover:text-blue-300 text-xs font-bold mt-2 transition-colors cursor-pointer"
          >
            {isExpanded ? 'Show less' : 'Show more...'}
          </button>
        </div>


        <div className="space-y-3">
          {socialLinks.map((link) => (
            <LinkCard key={link.name} {...link} />
          ))}
          
          <div className="pt-8 pb-2">
            <h3 className="text-sm font-bold text-slate-500 uppercase tracking-widest text-center">
              Tier List Templates
            </h3>
          </div>

          {resourceLinks.map((link) => (
            <LinkCard key={link.name} {...link} />
          ))}
        </div>        
      </div>
    </main>
  );
}
