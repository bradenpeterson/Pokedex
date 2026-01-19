'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const tabs = [
  { name: 'Pokemon', href: '/pokemon' },
  { name: 'Locations', href: '/locations' },
  { name: 'Moves', href: '/moves' },
  { name: 'Generations', href: '/generations' },
] as const;

export function TabNavigation() {
  const pathname = usePathname();

  return (
    <nav
      className="border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-black"
      role="tablist"
      aria-label="Main navigation"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex space-x-8 overflow-x-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
          {tabs.map((tab) => {
            const isActive = pathname.startsWith(tab.href);
            return (
              <Link
                key={tab.name}
                href={tab.href}
                className={`
                  whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm
                  transition-colors duration-200
                  ${
                    isActive
                      ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300'
                  }
                  focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded-t-md
                  min-w-[44px] min-h-[44px] flex items-center justify-center
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
