'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

const tabs = [
  { name: 'Pokemon', href: '/pokemon', color: 'red' },
  { name: 'Locations', href: '/locations', color: 'blue' },
  { name: 'Moves', href: '/moves', color: 'yellow' },
  { name: 'Generations', href: '/generations', color: 'green' },
] as const;

export function TabNavigation() {
  const pathname = usePathname();
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Show nav bar when scrolling up or at the top
      // Hide nav bar when scrolling down
      if (currentScrollY < lastScrollY || currentScrollY < 10) {
        setIsVisible(true);
      } else if (currentScrollY > lastScrollY && currentScrollY > 10) {
        setIsVisible(false);
      }
      
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  return (
    <nav
      className={`sticky top-0 z-50 border-b-4 border-gray-200 dark:border-gray-800 bg-gradient-to-r from-red-100 via-blue-100 to-yellow-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 shadow-lg transition-transform duration-300 ease-in-out ${
        isVisible ? 'translate-y-0' : '-translate-y-full'
      }`}
      role="tablist"
      aria-label="Main navigation"
    >
      {/* Subtle pattern overlay */}
      <div className="absolute inset-0 opacity-5 dark:opacity-10 bg-[radial-gradient(circle_at_1px_1px,_currentColor_1px,_transparent_0)] bg-[length:20px_20px]" />
      
      <div className="max-w-7xl mx-auto px-2 sm:px-4 md:px-6 lg:px-8 relative">
        <div className="flex items-end space-x-1 sm:space-x-2 md:space-x-4 min-h-[80px] sm:min-h-[64px] py-2.5 sm:py-2">
          {/* Home Button - Just the Logo */}
          <Link
            href="/pokemon"
            className="flex items-end justify-center pb-1 hover:opacity-80 transition-opacity duration-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 rounded self-end mr-1 sm:mr-3 md:mr-6 lg:mr-8 flex-shrink-0"
            aria-label="Home - Pokemon List"
          >
            <div className="relative w-24 h-11 sm:w-32 sm:h-14 md:w-40 md:h-18 lg:w-52 lg:h-24 flex-shrink-0">
              <Image
                src="/pokemon-logo.svg"
                alt="Pokemon Logo"
                fill
                className="object-contain"
                sizes="(max-width: 640px) 96px, (max-width: 768px) 128px, (max-width: 1024px) 160px, 192px"
                priority
              />
            </div>
          </Link>

          {/* Navigation Tabs */}
          {tabs.map((tab) => {
            const isActive = pathname.startsWith(tab.href);
            const colorClasses = {
              red: {
                active: 'border-red-600 text-red-600 dark:text-red-400 bg-white dark:bg-gray-800 shadow-lg',
                inactive: 'border-transparent text-gray-700 hover:text-red-600 hover:border-red-300 dark:text-gray-300 dark:hover:text-red-400 hover:bg-white/50 dark:hover:bg-gray-800/50',
              },
              blue: {
                active: 'border-blue-600 text-blue-600 dark:text-blue-400 bg-white dark:bg-gray-800 shadow-lg',
                inactive: 'border-transparent text-gray-700 hover:text-blue-600 hover:border-blue-300 dark:text-gray-300 dark:hover:text-blue-400 hover:bg-white/50 dark:hover:bg-gray-800/50',
              },
              yellow: {
                active: 'border-yellow-500 text-yellow-600 dark:text-yellow-400 bg-white dark:bg-gray-800 shadow-lg',
                inactive: 'border-transparent text-gray-700 hover:text-yellow-600 hover:border-yellow-300 dark:text-gray-300 dark:hover:text-yellow-400 hover:bg-white/50 dark:hover:bg-gray-800/50',
              },
              green: {
                active: 'border-green-600 text-green-600 dark:text-green-400 bg-white dark:bg-gray-800 shadow-lg',
                inactive: 'border-transparent text-gray-700 hover:text-green-600 hover:border-green-300 dark:text-gray-300 dark:hover:text-green-400 hover:bg-white/50 dark:hover:bg-gray-800/50',
              },
            };

            const colors = colorClasses[tab.color];
            const focusColors = {
              red: 'focus:ring-red-500',
              blue: 'focus:ring-blue-500',
              yellow: 'focus:ring-yellow-500',
              green: 'focus:ring-green-500',
            };

            return (
              <Link
                key={tab.name}
                href={tab.href}
                className={`
                  whitespace-nowrap py-2 px-1.5 sm:py-2 sm:px-2 md:py-3 md:px-4 border-b-[5px] sm:border-b-4 font-bold text-[12px] sm:text-xs md:text-sm
                  transition-all duration-300 rounded-t-xl relative
                  ${isActive ? colors.active : colors.inactive}
                  focus:outline-none focus:ring-2 ${focusColors[tab.color]} focus:ring-offset-2
                  min-w-[46px] min-h-[46px] sm:min-w-[44px] sm:min-h-[44px] flex items-center justify-center
                  rounded-b-none flex-shrink-0
                `}
                role="tab"
                aria-selected={isActive}
                aria-controls={`${tab.name.toLowerCase()}-panel`}
              >
                {tab.name}
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
