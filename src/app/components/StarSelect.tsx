'use client';

import React from 'react';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';

interface StarSelectProps {
  value: number;
  onChange: (val: number) => void;
}

export const StarSelect = ({ value, onChange }: StarSelectProps) => (
  <Select value={value.toString()} onValueChange={(v) => onChange(parseInt(v))}>
    <SelectTrigger className="w-[160px] min-w-[160px] bg-zinc-800 border-white/10 text-white">
      <SelectValue placeholder="Stars" />
    </SelectTrigger>
    <SelectContent className="bg-zinc-900 text-white border-white/10">
      {[0, 1, 2, 3, 4, 5, 6].map((num) => (
        <SelectItem key={num} value={num.toString()}>
          <div className="flex items-center gap-2">
            <span>{num === 0 ? '0 Stars' : "⭐".repeat(num)}</span>
          </div>
        </SelectItem>
      ))}
    </SelectContent>
  </Select>
);
