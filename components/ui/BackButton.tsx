'use client';

import { useRouter, usePathname } from 'next/navigation';

interface BackButtonProps {
  fallbackPath?: string;
  className?: string;
}

export function BackButton({ fallbackPath, className = '' }: BackButtonProps) {
  const router = useRouter();
  const pathname = usePathname();

  const handleBack = () => {
    // Check if there's browser history
    if (window.history.length > 1) {
      router.back();
    } else {
      // No history, navigate to fallback path or parent route
      const path = fallbackPath || getParentRoute(pathname);
      router.push(path);
    }
  };

  // Helper function to get parent route from current pathname
  const getParentRoute = (path: string): string => {
    const segments = path.split('/').filter(Boolean);
    
    // If we're on a detail page (has at least 2 segments), go to parent list
    if (segments.length >= 2) {
      return `/${segments[0]}`;
    }
    
    // Default fallback to home (which redirects to /pokemon)
    return '/pokemon';
  };

  return (
    <button
      onClick={handleBack}
      className={`
        inline-flex items-center gap-2 px-4 py-2
        text-sm font-medium text-gray-700 dark:text-gray-300
        bg-white dark:bg-gray-800
        border border-gray-300 dark:border-gray-700
        rounded-md
        hover:bg-gray-50 dark:hover:bg-gray-700
        focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
        transition-colors duration-200
        min-w-[44px] min-h-[44px]
        ${className}
      `}
      aria-label="Go back to previous page"
      type="button"
    >
      <svg
        className="w-5 h-5"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M15 19l-7-7 7-7"
        />
      </svg>
      <span>Back</span>
    </button>
  );
}
