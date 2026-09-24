'use client';

import Image from "next/image";
import { ReactNode, useEffect, useState } from "react";
import commonShard from '@/../public/assets/currencies/Common shard.webp';
import rareShard from '@/../public/assets/currencies/Rare shard.webp';
import epicShard from '@/../public/assets/currencies/Epic shard.webp';
import { cn } from "@/lib/utils";

const SHARD_IMAGES = [
  { src: commonShard, alt: "Common Shard", color: "text-sky-300" },
  { src: rareShard, alt: "Rare Shard", color: "text-purple-300" },
  { src: epicShard, alt: "Epic Shard", color: "text-yellow-300" }
];

interface AnimatedShardIconProps {
  className?: string;
  width?: number;
  children?: (currentShard: typeof SHARD_IMAGES[number]) => ReactNode;
}

const AnimatedShardIcon = ({ className = "", width = 20, children }: AnimatedShardIconProps) => {
  const [shardIndex, setShardIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setShardIndex((prev) => (prev + 1) % SHARD_IMAGES.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const currentShard = SHARD_IMAGES[shardIndex];

  if (children) {
    return <>{children(currentShard)}</>;
  }

  return (
    <Image 
      src={currentShard.src} 
      alt={currentShard.alt} 
      width={width} 
      className={cn(className, currentShard.color)}
    />
  );
};

export default AnimatedShardIcon;
