'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Menu } from 'lucide-react';

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";

import nievoHubwhite from '@/../public/assets/others/NievoHub white.png';
import tuneCoins from '@/../public/assets/others/Tune Coins.png';
import { cn } from '@/lib/utils';

const NAV_LINKS = [
  {
    name: "Tune Coins Calculator",
    href: "/tune-coins-calculator",
    icon: tuneCoins
  },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-white/10 bg-black/50 backdrop-blur-md px-8 py-4">
      <div className="flex items-center justify-between gap-8 max-w-7xl mx-auto">
        
        <div className="flex items-center">
          <Link href="/" className="transition-opacity hover:opacity-80">
            <Image src={nievoHubwhite} alt="NievoHub Logo" width={120} height={36} priority />
          </Link>
        </div>

        {/* DESKTOP NAV (Hidden on mobile) */}
        <div className="hidden md:block">
          <NavigationMenu>
            <NavigationMenuList className="gap-2">
              {NAV_LINKS.map((link) => (
                <NavigationMenuItem>
                  <Link key={link.name} href={link.href} passHref>
                    <NavigationMenuLink
                      className={cn(
                        navigationMenuTriggerStyle(),
                        "bg-transparent text-white hover:bg-white/10 hover:text-blue-400",
                        "flex items-baseline gap-2"
                      )}
                    >
                      {link.icon && (
                        <span className="relative self-center">
                          <Image src={link.icon} alt="" width={20} height={20} />
                        </span>
                      )}
                      {link.name}
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>
        </div>

        {/* MOBILE NAV (Hidden on desktop) */}
        <div className="md:hidden">
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger className="p-2 text-gray-300 hover:text-white transition-colors">
              <Menu size={28} />
            </SheetTrigger>
            <SheetContent side="right" className="bg-zinc-950 text-white border-white/10 w-[300px]">
              <SheetHeader className="text-left mb-8">
                <SheetTitle>
                  <Link href="/" onClick={() => setIsOpen(false)}>
                    <Image src={nievoHubwhite} alt="Logo" width={100} height={30} />
                  </Link>
                </SheetTitle>
              </SheetHeader>
              
              <div className="flex flex-col gap-6 px-4">
                {NAV_LINKS.map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className="flex items-center gap-3 text-lg font-medium hover:text-blue-400 transition-colors"
                  >
                    {link.icon && <Image src={link.icon} alt={`${link.name} Icon`} width={20} height={20} />}
                    {link.name}
                  </Link>
                ))}
              </div>
            </SheetContent>
          </Sheet>
        </div>

      </div>
    </nav>
  );
};

export default Navbar;
