'use client';

import React, { useState } from 'react';
import Link from 'next/link'; 
import Image from 'next/image';
import nievoHubwhite from '@/../public/assets/others/NievoHub white.png';
import tuneCoins from '@/../public/assets/others/Tune Coins.png';
import { Menu, X } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <nav className="relative w-full flex items-center justify-between px-8 py-4 bg-black/50 backdrop-blur-md sticky top-0 z-50 gap-8">
      <div className="flex items-center gap-2">
        <Link href="/" className="text-xl font-bold text-white tracking-tighter">
          <Image src={nievoHubwhite} alt="Logo" width={100} height={30} />
        </Link>
      </div>

      {/* Desktop Links (Hidden on Mobile)*/}
      <ul className="hidden md:flex gap-8 text-lg font-medium">
        <li>
          <Link href="/tune-coins-calculator" className="hover:text-blue-400 transition-colors flex gap-2">
            <Image src={tuneCoins} alt="Logo" width={28} height={28} />
            Tune Coins Calculator
          </Link>
        </li>
        {/* <li><Link href="/tune-coins-calculator" onClick={toggleMenu}>link 1</Link></li>
        <li><Link href="/tune-coins-calculator" onClick={toggleMenu}>link 2</Link></li>
        <li><Link href="/tune-coins-calculator" onClick={toggleMenu}>link 3</Link></li> */}
      </ul>

      {/* Mobile Dropdown Menu */}
      <div className={`
        absolute top-full left-0 w-full bg-black backdrop-blur-lg md:hidden transition-all duration-300 ease-in-out z-[100]
        ${isOpen ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible -translate-y-2'}
      `}>
        <ul className="flex flex-col gap-4 px-6 pb-6 text-base border-t border-white/10 pt-4">
          <li>
            <Link href="/tune-coins-calculator" onClick={toggleMenu} className="flex gap-2">
              <Image src={tuneCoins} alt="Logo" width={14} height={14} className="max-h-8 w-auto" />
              Tune Coins Calculator
            </Link>
          </li>
          {/* <li><Link href="/tune-coins-calculator" onClick={toggleMenu}>link 1</Link></li>
          <li><Link href="/tune-coins-calculator" onClick={toggleMenu}>link 2</Link></li>
          <li><Link href="/tune-coins-calculator" onClick={toggleMenu}>link 3</Link></li> */}
        </ul>
      </div>

      {/* Burger Button (Hidden on Desktop) */}
      <button 
        onClick={toggleMenu}
        className="md:hidden p-2 text-gray-300 hover:text-white transition-colors cursor-pointer"
      >
        {isOpen ? <X size={28} /> : <Menu size={28} />}
      </button>
    </nav>
  );
};

export default Navbar;
