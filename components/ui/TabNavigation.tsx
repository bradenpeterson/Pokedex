'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

const tabs = [
  { name: 'Pokemon', href: '/pokemon', color: 'red' },
  { name: 'Locations', href: '/locations', color: 'blue' },
  { name: 'Moves', href: '/moves', color: 'yellow' },
  { name: 'Generations', href: '/generations', color: 'green' },
] as const;

export function TabNavigation() {
  const pathname = usePathname();
  const isHome = pathname === '/pokemon' || pathname === '/';

  return (
    <nav
      className="border-b-4 border-gray-200 dark:border-gray-800 bg-gradient-to-r from-red-100 via-blue-100 to-yellow-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 shadow-lg relative"
      role="tablist"
      aria-label="Main navigation"
    >
      {/* Subtle pattern overlay */}
      <div className="absolute inset-0 opacity-5 dark:opacity-10 bg-[radial-gradient(circle_at_1px_1px,_currentColor_1px,_transparent_0)] bg-[length:20px_20px]" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="flex items-end space-x-2 sm:space-x-4 overflow-x-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] min-h-[64px]">
          {/* Home Button - Just the Logo */}
          <Link
            href="/pokemon"
            className="flex items-end justify-center pb-1 hover:opacity-80 transition-opacity duration-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 rounded self-end mr-6 sm:mr-8"
            aria-label="Home - Pokemon List"
          >
            <div className="relative w-52 h-24 flex-shrink-0">
              <Image
                src="/pokemon-logo.svg"
                alt="Pokemon Logo"
                fill
                className="object-contain"
                sizes="192px"
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
                  whitespace-nowrap py-3 px-4 border-b-4 font-bold text-sm
                  transition-all duration-300 rounded-t-xl relative
                  ${isActive ? colors.active : colors.inactive}
                  focus:outline-none focus:ring-2 ${focusColors[tab.color]} focus:ring-offset-2
                  min-w-[44px] min-h-[44px] flex items-center justify-center
                  rounded-b-none
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
