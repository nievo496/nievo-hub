'use client';

import React, { useState, useMemo, useEffect, Suspense } from 'react';
import Image from 'next/image';
import { Info, ArrowRight } from 'lucide-react';
import { StarSelect, FragmentSelect } from '@/app/components';
import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import tuneCoins from '@/../public/assets/currencies/Tune Coins.png';
import commonShard from '@/../public/assets/currencies/Common shard.webp';
import rareShard from '@/../public/assets/currencies/Rare shard.webp';
import epicShard from '@/../public/assets/currencies/Epic shard.webp';
import { UpgradeTable } from '@/app/components/UpgradeTable';
import { useSearchParams } from 'next/navigation';

const SHARDS_MATRIX = [
  [5, 5, 5, 5, 8, 28],
  [6, 6, 6, 6, 10, 34],
  [7, 7, 7, 7, 12, 40],
  [8, 8, 8, 8, 14, 46],
  [9, 9, 9, 9, 16, 52],
  [10, 10, 10, 10, 20, 60]
];

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

const SHARD_IMAGES = [
  { src: commonShard, alt: "Common Shard", color: "text-sky-300" },
  { src: rareShard, alt: "Rare Shard", color: "text-purple-300" },
  { src: epicShard, alt: "Epic Shard", color: "text-yellow-300" }
];

type CalcMode = 'BY_TARGET' | 'BY_RESOURCES';
type ResourceType = 'SHARDS' | 'COINS';

const TuneCoinsCalculatorContent = () => {
  const searchParams = useSearchParams();
  const initialTab = searchParams.get('tab') === 'max-level' ? 'BY_RESOURCES' : 'BY_TARGET';

  const [calcMode, setCalcMode] = useState<CalcMode>(initialTab);
  const [resourceType, setResourceType] = useState<ResourceType>('SHARDS');
  const [resourceAmount, setResourceAmount] = useState<number>(0);

  const [fromStar, setFromStar] = useState(0);
  const [fromFrag, setFromFrag] = useState(0);
  
  const [toStar, setToStar] = useState(6);
  const [toFrag, setToFrag] = useState(0);
  
  const [shardIndex, setShardIndex] = useState(0);

  const targetTotals = useMemo(() => {
    const startIndex = fromStar * 5 + fromFrag;
    const endIndex = toStar * 5 + toFrag;

    if (endIndex <= startIndex) return { tuneCoins: 0, shards: 0 };

    const tuneCoinsTotal = TUNE_COINS_COSTS.slice(startIndex, endIndex).reduce((acc, cost) => acc + cost, 0);
    const shardsTotal = RACER_SHARDS_COSTS.slice(startIndex, endIndex).reduce((acc, cost) => acc + cost, 0);

    return { tuneCoins: tuneCoinsTotal, shards: shardsTotal };
  }, [fromStar, fromFrag, toStar, toFrag]);

  const resourceResults = useMemo(() => {
    let currentAbsIndex = fromStar * 5 + fromFrag;
    let budget = resourceAmount;
    const costArray = resourceType === 'SHARDS' ? RACER_SHARDS_COSTS : TUNE_COINS_COSTS;

    while (currentAbsIndex < costArray.length && budget >= costArray[currentAbsIndex]) {
      budget -= costArray[currentAbsIndex];
      currentAbsIndex++;
    }

    const finalStar = Math.floor(currentAbsIndex / 5);
    const finalFrag = currentAbsIndex % 5;
    
    const hasNextUpgrade = currentAbsIndex < costArray.length;
    const nextCost = hasNextUpgrade ? costArray[currentAbsIndex] : 0;

    return {
      star: finalStar,
      frag: finalFrag,
      leftover: budget,
      nextCost,
      hasNextUpgrade
    };
  }, [fromStar, fromFrag, resourceType, resourceAmount]);

  const handleResourceInputChange = (val: string) => {
    const parsed = parseInt(val.replace(/,/g, ''), 10);
    setResourceAmount(isNaN(parsed) ? 0 : parsed);
  };

  const handleTabChange = (mode: CalcMode) => {
    setCalcMode(mode);

    const url = new URL(window.location.href);
    if (mode === 'BY_RESOURCES') {
      url.searchParams.set('tab', 'max-level');
    } else {
      url.searchParams.delete('tab');
    }

    window.history.pushState(null, '', url.toString());
  };

  const highlightParams = useMemo(() => {
    if (calcMode === 'BY_TARGET') {
      return { toStar, toFrag };
    } else {
      return { toStar: resourceResults.star, toFrag: resourceResults.frag };
    }
  }, [calcMode, toStar, toFrag, resourceResults.star, resourceResults.frag]);

  useEffect(() => {
    const interval = setInterval(() => {
      setShardIndex((prev) => (prev + 1) % SHARD_IMAGES.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handlePopState = () => {
      const params = new URLSearchParams(window.location.search);
      const tabParam = params.get('tab');

      if (tabParam === 'max-level') {
        setCalcMode('BY_RESOURCES');
      } else {
        setCalcMode('BY_TARGET');
      }
    };

    handlePopState();

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  useEffect(() => {
    const tab = searchParams.get('tab');
    if (tab === 'max-level') {
      setCalcMode('BY_RESOURCES');
    } else {
      setCalcMode('BY_TARGET');
    }
  }, [searchParams]);

  return (
    <div className="flex flex-col flex-1 font-sans h-full px-8 py-6 md:px-16 gap-4 md:gap-8 text-sky-100">
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight drop-shadow-sm">
          Disney Speedstorm - Tune Coins Calculator
        </h1>
        <p className="text-sm">Optimize your racer upgrades by calculating star and fragment progression.</p>
      </div>

      {/* Tabs Switcher */}
      <div className="flex border-b border-white/10 max-w-4xl mx-auto w-full">
        <button
          onClick={() => handleTabChange('BY_TARGET')}
          className={cn(
            "py-3 px-6 text-sm font-bold transition-all border-b-2 cursor-pointer",
            calcMode === 'BY_TARGET' 
              ? "border-sky-400 text-sky-300 drop-shadow-[0_0_8px_rgba(56,189,248,0.4)]" 
              : "border-transparent hover:text-blue-100/90"
          )}
        >
          Calculate Upgrade Costs
        </button>
        <button
          onClick={() => handleTabChange('BY_RESOURCES')}
          className={cn(
            "py-3 px-6 text-sm font-bold transition-all border-b-2 cursor-pointer",
            calcMode === 'BY_RESOURCES' 
              ? "border-sky-400 text-sky-300 drop-shadow-[0_0_8px_rgba(56,189,248,0.4)]" 
              : "border-transparent hover:text-blue-100/90"
          )}
        >
          Max Level Finder
        </button>
      </div>

      <div className="flex flex-col gap-4 md:gap-8">
        <div className="flex flex-col md:flex-row gap-4 md:gap-6 justify-center items-center md:p-10 md:bg-white/[0.03] rounded-2xl md:border border-white/10 w-full max-w-4xl md:min-w-3xl mx-auto shadow-2xl backdrop-blur-md">
          
          <Card className="p-4 md:p-6 bg-white/5 border-sky-400/20 backdrop-blur-md w-full max-w-sm md:min-w-xs shadow-lg">
            <h3 className="text-sky-300 font-bold md:mb-4 text-xs uppercase tracking-widest">Current</h3>
            <div className="flex flex-col xs:flex-row gap-3">
              <StarSelect value={fromStar} onChange={setFromStar} />
              {fromStar < 6 && <FragmentSelect value={fromFrag} onChange={setFromFrag} />}
            </div>
          </Card>

          <ArrowRight className="hidden md:block" size={40} />

          {calcMode === 'BY_TARGET' ? (
            <Card className="p-4 md:p-6 bg-white/5 border-emerald-400/20 backdrop-blur-md w-full max-w-sm md:min-w-xs shadow-lg">
              <h3 className="text-emerald-300 font-bold md:mb-4 text-xs uppercase tracking-widest">Target</h3>
              <div className="flex flex-col xs:flex-row gap-3">
                <StarSelect value={toStar} onChange={setToStar} />
                {toStar < 6 && <FragmentSelect value={toFrag} onChange={setToFrag} />}
              </div>
            </Card>
          ) : (
            <Card className="p-4 md:p-6 bg-white/5 border-purple-400/20 backdrop-blur-md w-full max-w-sm md:min-w-xs flex flex-col gap-3 shadow-lg">
              <div className="flex justify-between items-center">
                <h3 className="text-purple-300 font-bold text-xs uppercase tracking-widest">Your Inventory</h3>
                <div className="flex rounded-lg bg-black/30 p-0.5 border border-white/10 text-xs">
                  <button 
                    onClick={() => { setResourceType('SHARDS'); setResourceAmount(0); }} 
                    className={cn("px-2.5 py-1 rounded-md transition-all font-semibold", resourceType === 'SHARDS' ? "bg-blue-400 text-white shadow" : "text-sky-200/60 hover:text-white")}
                  >
                    Shards
                  </button>
                  <button 
                    onClick={() => { setResourceType('COINS'); setResourceAmount(0); }} 
                    className={cn("px-2.5 py-1 rounded-md transition-all font-semibold", resourceType === 'COINS' ? "bg-blue-400 text-white shadow" : "text-sky-200/60 hover:text-white")}
                  >
                    Tune Coins
                  </button>
                </div>
              </div>
              <div className="relative flex items-center">
                <input
                  type="text"
                  value={resourceAmount === 0 ? "" : resourceAmount.toLocaleString()}
                  onChange={(e) => handleResourceInputChange(e.target.value)}
                  placeholder="Enter inventory amount..."
                  className="w-full bg-black/20 border border-white/10 rounded-lg p-2.5 text-white text-sm focus:outline-none focus:border-purple-400 pr-10 placeholder-sky-200/30 font-medium"
                />
                <div className="absolute right-3 flex items-center pointer-events-none">
                  <Image 
                    src={resourceType === 'SHARDS' ? SHARD_IMAGES[shardIndex].src : tuneCoins} 
                    alt="Resource Type" 
                    width={20}
                    className="h-auto"
                  />
                </div>
              </div>
            </Card>
          )}
        </div>

        {/* Result Layer */}
        <div className="mx-auto w-full max-w-sm space-y-4">
          {calcMode === 'BY_TARGET' ? (
            <div className="bg-white/5 p-6 md:p-8 rounded-3xl border border-white/10 text-center flex flex-col items-center justify-center gap-6 shadow-xl backdrop-blur-md">
              <div>
                <p className="text-sky-200/70 text-xs tracking-widest mb-2 uppercase font-bold">Total Tune Coins</p>
                <div className="flex items-center gap-3 justify-center">
                  <Image src={tuneCoins} width={36} height={36} alt="Tune Coins" className={targetTotals.tuneCoins > 0 ? "animate-pulse" : ""} />
                  <span className="text-4xl font-black text-yellow-300 drop-shadow-[0_0_12px_rgba(253,224,71,0.3)]">
                    {targetTotals.tuneCoins.toLocaleString()}
                  </span>
                </div>
              </div>
              <div>
                <p className="text-sky-200/70 text-xs tracking-widest mb-2 uppercase font-bold">Total Shards</p>
                <div className="flex items-center gap-3 justify-center">
                  <Image src={SHARD_IMAGES[shardIndex].src} width={36} alt="Racer Shards" className={cn("h-auto", targetTotals.shards > 0 ? "animate-pulse" : "")} />
                  <span className={cn("text-4xl", "font-black", "drop-shadow-[0_0_12px_rgba(125,211,252,0.3)]", SHARD_IMAGES[shardIndex].color)}>
                    {targetTotals.shards.toLocaleString()}
                  </span>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-white/5 p-6 md:p-8 rounded-3xl border border-white/10 text-center flex flex-col items-center justify-center gap-4 shadow-xl backdrop-blur-md">
              <div>
                <p className="text-sky-200/70 text-xs tracking-widest mb-2 uppercase font-bold">Available Level</p>
                <div className="text-2xl">
                  {Array.from({length: resourceResults.star}).map((_, i) => (
                    <Image
                      key={i}
                      src={`/assets/stars/5 Star Fragments.png`}
                      alt={`Disney Speedstorm 5 Star Fragments number ${i + 1}`}
                      width={28}
                      height={28}
                      className="object-contain inline"
                    />
                  ))}
                  {resourceResults.frag > 0 && (
                    <Image
                      src={`/assets/stars/${resourceResults.frag} Star Fragments.png`}
                      alt={`Disney Speedstorm ${resourceResults.frag} Star Fragments`}
                      width={28}
                      height={28}
                      className="object-contain inline"
                    />
                  )}
                </div>
              </div>

              <div className="w-full border-t border-white/10 pt-3 text-sm text-sky-200/60 space-y-1.5">
                <div className="flex justify-between">
                  <span>Leftover {resourceType === 'SHARDS' ? 'Shards' : 'Tune Coins'}:</span>
                  <span className="text-white font-bold">{resourceResults.leftover.toLocaleString()}</span>
                </div>
                {resourceResults.hasNextUpgrade && resourceType === 'SHARDS' && (
                  <div className="flex justify-between text-sky-200/40">
                    <span>Next Fragment Progress:</span>
                    <span>
                      <span className="text-purple-300 font-bold">{resourceResults.leftover}</span> / {resourceResults.nextCost} Shards
                    </span>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {calcMode === 'BY_TARGET' && targetTotals.tuneCoins === 0 && (fromStar > toStar || (fromStar === toStar && fromFrag >= toFrag)) && (fromStar !== 0 || fromFrag !== 0 || toStar !== 0 || toFrag !== 0) && (
          <p className="text-rose-400 text-xs text-center font-semibold tracking-wide bg-rose-500/10 border border-rose-500/20 py-2 rounded-lg max-w-sm mx-auto">
            Target level must be higher than current level!
          </p>
        )}
      </div>

      {/* Tables Section */}
      <div className="flex justify-between gap-4 md:gap-8 flex-col lg:flex-row w-full max-w-6xl mx-auto">
        <UpgradeTable 
          title="Tune Coins Costs Table"
          currencyIcon={tuneCoins}
          currencyAlt="Tune Coins"
          multiplier={100}
          baseMatrix={SHARDS_MATRIX}
          fromStar={fromStar}
          fromFrag={fromFrag}
          toStar={highlightParams.toStar}
          toFrag={highlightParams.toFrag}
        />
        
        <UpgradeTable 
          title="Racer Shards Costs Table"
          currencyIcon={commonShard}
          currencyAlt="Racer Shards"
          multiplier={1}
          baseMatrix={SHARDS_MATRIX}
          fromStar={fromStar}
          fromFrag={fromFrag}
          toStar={highlightParams.toStar}
          toFrag={highlightParams.toFrag}
        />
      </div>

      {/* Information Disclaimer */}
      <div className="flex items-start gap-3 p-4 bg-white/[0.02] border border-white/5 rounded-xl max-w-4xl mx-auto w-full backdrop-blur-sm">
        <Info size={16} className="text-sky-400/50 mt-0.5 flex-shrink-0" />
        <div className="text-xs text-sky-200/60 leading-relaxed">
          <span className="block sm:hidden">
            Upgrade costs are sourced directly from Gameloft. See the full article on the{' '}
            <a href="https://disneyspeedstorm.com/news/disney-speedstorm-new-racer-progression" target="_blank" rel="noopener noreferrer" className="text-sky-300 underline font-semibold hover:text-sky-200 transition-colors">Official News Article</a>.
          </span>
          <span className="hidden sm:block">
            <strong>Data Reference:</strong> The upgrade shard and currency costs displayed on this page are sourced directly from the official racer progression data published by Gameloft. For the full economy breakdown article, visit the{' '}
            <a href="https://disneyspeedstorm.com/news/disney-speedstorm-new-racer-progression" target="_blank" rel="noopener noreferrer" className="text-sky-300 hover:text-sky-200 underline transition-colors font-semibold">Official Disney Speedstorm News Article</a>.
          </span>
        </div>
      </div>
    </div>
  );
}

const TuneCoinsCalculatorPage = () => {
  return (
    <Suspense fallback={<div className="p-8 text-center text-sky-200">Loading calculator...</div>}>
      <TuneCoinsCalculatorContent />
    </Suspense>
  );
}

export default TuneCoinsCalculatorPage;
