
import React from 'react';
import { FacebookIcon, PenToolIcon } from './IconComponents';

export const Header: React.FC = () => {
  return (
    <header className="text-center">
        <div className="inline-flex items-center gap-4">
            <FacebookIcon className="h-12 w-12 text-sky-400" />
            <span className="text-4xl font-bold text-slate-400">+</span>
            <PenToolIcon className="h-12 w-12 text-teal-400" />
        </div>
      <h1 className="mt-4 text-4xl md:text-5xl font-bold tracking-tight bg-gradient-to-r from-slate-200 to-slate-400 bg-clip-text text-transparent">
        Facebook Content Writer
      </h1>
      <p className="mt-3 text-lg text-slate-400 max-w-2xl mx-auto">
        AI-powered content generation for Facebook in Myanmar language. <span className="font-noto-mm">မြန်မာဘာသာဖြင့် Facebook content များကို AI ဖြင့်ဖန်တီးပါ။</span>
      </p>
    </header>
  );
};
