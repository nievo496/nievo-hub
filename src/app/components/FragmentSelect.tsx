'use client';

import React from 'react';
import Image from 'next/image';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface FragmentSelectProps {
  value: number,
  onChange: (val: number) => void
}

export const FragmentSelect = ({ value, onChange }: FragmentSelectProps) => (
  <Select value={value.toString()} onValueChange={(v) => onChange(parseInt(v))}>
    <SelectTrigger className="w-[100px] md:w-[140px] bg-zinc-800 border-white/10 text-white">
      <SelectValue placeholder="Frags" />
    </SelectTrigger>
    <SelectContent className="bg-zinc-900 text-white border-white/10">
      {[0, 1, 2, 3, 4].map((num) => (
        <SelectItem key={num} value={num.toString()}>
          <div className="flex items-center gap-2">
            <Image
              src={`/assets/stars/${num} Star Fragments.png`}
              alt={`Disney Speedstorm ${num} Star Fragments`}
              width={20}
              height={20}
              className="object-contain"
            />
            <span>{num}/5</span>
          </div>
        </SelectItem>
      ))}
    </SelectContent>
  </Select>
);
