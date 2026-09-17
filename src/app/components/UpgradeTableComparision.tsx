import React from 'react';
import Image, { StaticImageData } from 'next/image';

interface UpgradeTableComparisionProps {
  title: string;
  currencyIcon: StaticImageData;
  currencyAlt: string;
  multiplier: number; // 1 for shards, 100 for tune coins
  baseMatrix1: number[][];
  baseMatrix2: number[][];
  fromStar: number;
  fromFrag: number;
  toStar: number;
  toFrag: number;
}

export const UpgradeTableComparision = ({ title, currencyIcon, currencyAlt, multiplier, baseMatrix1, baseMatrix2, fromStar, fromFrag, toStar, toFrag }: UpgradeTableComparisionProps) => {
  // 5 fragments + 1 total column = 6 value columns
  const headers = [
    { text: "Stars" },
    { text: "1st Frag", imageSrc: "/assets/stars/1 Star Fragments.png" },
    { text: "2nd Frag", imageSrc: "/assets/stars/2 Star Fragments.png" },
    { text: "3rd Frag", imageSrc: "/assets/stars/3 Star Fragments.png" },
    { text: "4th Frag", imageSrc: "/assets/stars/4 Star Fragments.png" },
    { text: "5th Frag", imageSrc: "/assets/stars/5 Star Fragments.png" },
    { text: "Total" }
  ];

  return (
    <div className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 shadow-xl backdrop-blur-sm overflow-hidden">
      <div className="flex items-center gap-2 mb-4 border-b border-white/10 pb-2">
        <Image src={currencyIcon} alt={currencyAlt} width={24} className="object-contain h-auto" />
        <h3 className="text-lg font-bold text-white">{title}</h3>
      </div>

      <div className="overflow-x-auto rounded-xl border border-white/5">
        <table className="w-full border-collapse text-left text-sm">
          <thead>
            <tr className="bg-white/10 text-slate-300 font-semibold border-b border-white/10">
              {headers.map((header, idx) => (
                <th key={idx} className="p-3 text-center whitespace-nowrap">
                  {header.imageSrc ? (
                    <Image src={header.imageSrc} alt={header.text} width={24} height={24} className="object-contain mx-auto" />
                  ) : (
                    header.text
                  )}
                </th>
              ))}
              <th></th>
            </tr>
          </thead>

          <tbody className="divide-y divide-white/5 text-white">
            {baseMatrix1.map((row, rowIndex) => {
              const targetStarDisplay = rowIndex + 1;
              
              return (
                <tr 
                  key={targetStarDisplay} 
                  className="hover:bg-white/10 transition-colors bg-transparent"
                >
                  <td className="p-3 font-bold text-yellow-400 text-center bg-white-[0.02]">
                    {targetStarDisplay - 1} →  {targetStarDisplay} ★
                  </td>
                  {/* ★⭐ */}

                  {row.map((baseValue, colIndex) => {
                    const finalValue1 = baseValue * multiplier;
                    const finalValue2 = baseMatrix2[rowIndex][colIndex] * multiplier;
                    const isTotalColumn = colIndex === row.length - 1;
                    let isActive = false;

                    if (!isTotalColumn
                      && !(fromStar === 0 && fromFrag === 0 && toStar === 6 && toFrag === 0)
                    ) {
                      const currentCellIndex = (rowIndex * 5) + colIndex;
                      const userStartIndex = (fromStar * 5) + fromFrag;
                      const userEndIndex = toStar === 6 ? 30 : (toStar * 5) + toFrag;

                      isActive = currentCellIndex >= userStartIndex && currentCellIndex < userEndIndex;
                    }

                    return (
                      <td 
                        key={colIndex} 
                        className={`p-3 text-center transition-all duration-300 ${
                          isActive 
                            ? 'bg-blue-500/30 text-blue-300 font-semibold border border-blue-400/30 shadow-[inset_0_0_12px_rgba(59,130,246,0.2)]' 
                            : isTotalColumn 
                              // ? 'font-bold text-yellow-400 bg-yellow-500/3' 
                              ? 'font-bold border-l border-r border-white/50' 
                              : 'text-slate-200'
                        }`}
                      >
                        <span className={`text-sm ${finalValue1 > finalValue2 ? 'text-red-400' : finalValue1 < finalValue2 ? 'text-green-400' : 'text-slate-200'}`}>
                          {finalValue1.toLocaleString()}
                        </span>
                        <hr className="border-white/25" />
                        {/* <span className={`text-xs ${finalValue2 > finalValue1 ? 'text-red-400' : finalValue2 < finalValue1 ? 'text-green-400' : 'text-slate-200'}`}> */}
                        <span className={`text-xs`}>
                          {finalValue2.toLocaleString()}
                        </span>
                      </td>
                    );
                  })}
                  <td className="text-center">
                    <span className="text-sm">Now</span>
                    <hr className="border-white/25" />
                    <span className="text-xs">Season 22</span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};
