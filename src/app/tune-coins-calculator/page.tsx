'use client';

import React, { useState, useMemo, useEffect } from 'react';
import Image from 'next/image';
import { StarSelect, FragmentSelect } from '@/app/components';
import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { ArrowRight } from 'lucide-react';
import tuneCoins from '@/../public/assets/currencies/Tune Coins.png';
import commonShard from '@/../public/assets/currencies/Common shard.webp';
import rareShard from '@/../public/assets/currencies/Rare shard.webp';
import epicShard from '@/../public/assets/currencies/Epic shard.webp';

const TUNE_COINS_COSTS = [
  500, 500, 500, 500, 800, 
  600, 600, 600, 600, 1000,
  700, 700, 700, 700, 1200,
  800, 800, 800, 800, 1400,
  900, 900, 900, 900, 1600,
  1000, 1000, 1000, 1000, 2000,
];

const RACER_SHARDS_COSTS = [
  5, 5, 5, 5, 8, 
  6, 6, 6, 6, 10,
  7, 7, 7, 7, 12,
  8, 8, 8, 8, 14,
  9, 9, 9, 9, 16,
  10, 10, 10, 10, 20,
];

const SHARD_IAMGES = [
  { src: commonShard, alt: "Common Shard", color: "text-blue-400" },
  { src: rareShard, alt: "Rare Shard", color: "text-purple-400" },
  { src: epicShard, alt: "Epic Shard", color: "text-yellow-400" }
];

const TuneCoinsCalculatorPage = () => {
  const [fromStar, setFromStar] = useState(0);
  const [fromFrag, setFromFrag] = useState(0);
  const [toStar, setToStar] = useState(6);
  const [toFrag, setToFrag] = useState(0);
  const [shardIndex, setShardIndex] = useState(0);

  const totals = useMemo(() => {
    const startIndex = fromStar * 5 + fromFrag;
    const endIndex = toStar * 5 + toFrag;

    if (endIndex <= startIndex) return { tuneCoins: 0, shards: 0 };

    const tuneCoinsTotal = TUNE_COINS_COSTS.slice(startIndex, endIndex).reduce((acc, cost) => acc + cost, 0);
    const shardsTotal = RACER_SHARDS_COSTS.slice(startIndex, endIndex).reduce((acc, cost) => acc + cost, 0);

    return { tuneCoins: tuneCoinsTotal, shards: shardsTotal };
  }, [fromStar, fromFrag, toStar, toFrag]);

  useEffect(() => {
    const interval = setInterval(() => {
      setShardIndex((prev) => (prev + 1) % SHARD_IAMGES.length);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col flex-1 font-sans h-full px-8 py-6 md:p-16">
      <h1 className="text-2xl md:text-3xl font-bold text-white mb-4 tracking-tight">Disney Speedstorm - Tune Coins Calculator</h1>
      <p className="mb-4 md:mb-8">Calculate the costs for your next upgrade by current and target stars.</p>

      <div className="flex flex-col md:flex-row gap-4 md:gap-6 justify-center items-center md:p-10 md:bg-black/20 rounded-2xl md:border border-white/5 w-full max-w-4xl md:min-w-3xl mx-auto">
        {/* "From" Section */}
        <Card className="p-4 md:p-6 bg-zinc-900/50 border-blue-500/30 backdrop-blur-sm w-full max-w-sm md:min-w-xs">
          <h3 className="text-blue-400 font-semibold md:mb-4 text-sm tracking-wider">Current</h3>
          <div className="flex flex-col xs:flex-row gap-3">
            <StarSelect value={fromStar} onChange={setFromStar} />
            {fromStar < 6 && <FragmentSelect value={fromFrag} onChange={setFromFrag} />}
          </div>
        </Card>

        <ArrowRight className="hidden md:block" size={64} />

        {/* "To" Section */}
        <Card className="p-4 md:p-6 bg-zinc-900/50 border-green-500/30 backdrop-blur-sm w-full max-w-sm md:min-w-xs">
          <h3 className="text-green-400 font-semibold md:mb-4 text-sm tracking-wider">Target</h3>
          <div className="flex flex-col xs:flex-row gap-3">
            <StarSelect value={toStar} onChange={setToStar} />
            {toStar < 6 && <FragmentSelect value={toFrag} onChange={setToFrag} />}
          </div>
        </Card>
      </div>

      {/* RESULT SECTION */}
      <div className="mt-6 md:mt-12 mx-auto w-full max-w-sm space-y-4">
          
        <div className="bg-white/5 p-6 rounded-3xl border border-white/5 text-center flex flex-col items-center justify-center gap-6">
          <div>
            <p className="text-white text-xs tracking-widest mb-3 uppercase">Total Tune Coins</p>
            <div className="flex items-center gap-3 justify-center">
              <Image src={tuneCoins} width={36} height={36} alt="Disney Speedstorm Tune Coins" className={totals.tuneCoins > 0 ? "animate-pulse" : ""} />
              <span className="text-4xl font-black text-yellow-400 drop-shadow-[0_0_10px_rgba(250,204,21,0.2)]">
                {totals.tuneCoins.toLocaleString()}
              </span>
            </div>
          </div>
          <div>
            <p className="text-xs tracking-widest mb-3 uppercase">Total Shards</p>
            <div className="flex items-center gap-3 justify-center">
              <Image src={SHARD_IAMGES[shardIndex].src} width={36} height={36} alt="Disney Speedstorm Racer Shards" className={totals.shards > 0 ? "animate-pulse" : ""} />
              <span className={cn("text-4xl", "font-black", "drop-shadow-[0_0_10px_rgba(192,132,252,0.2)]", SHARD_IAMGES[shardIndex].color)}>
                {totals.shards.toLocaleString()}
              </span>
            </div>
          </div>
        </div>

        {totals.tuneCoins === 0 && (fromStar > toStar || (fromStar === toStar && fromFrag >= toFrag)) && (fromStar !== 0 || fromFrag !== 0 || toStar !== 0 || toFrag !== 0) && (
          <p className="text-red-400 text-xs text-center italic">Target rank must be higher than current rank!</p>
        )}
      </div>
    </div>
  );
}

export default TuneCoinsCalculatorPage;
