import React from 'react';

interface LinkCardProps {
  name: string;
  url: string;
  icon: React.ReactNode;
  displayText: string;
  brandColor: string;
  glow: string;
}

export const LinkCard = ({ name, url, icon, displayText, brandColor, glow }: LinkCardProps) => (
  <a
    href={url}
    target="_blank"
    rel="noopener noreferrer"
    className="flex items-center p-3 bg-white/5 border border-white/10 rounded-2xl hover:bg-white/10 transition-all hover:scale-[1.02] active:scale-[0.98] group"
  >
    <div className={`flex items-center justify-center min-w-[48px] h-12 rounded-xl text-xl mr-4 shadow-lg transition-transform group-hover:rotate-6 ${brandColor} ${glow}`}>
      {icon}
    </div>
    <div className="flex-1">
      <div className="text-white/70 text-sm">{displayText}</div>
    </div>
    <div className="text-white/20 group-hover:text-white/50 transition-colors pr-2">
      →
    </div>
  </a>
);
