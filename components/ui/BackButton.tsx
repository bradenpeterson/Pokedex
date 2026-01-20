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

  // Determine color based on pathname
  const getColorClasses = () => {
    if (pathname.startsWith('/pokemon')) {
      return {
        bg: 'bg-gradient-to-r from-red-600 to-red-700',
        border: 'border-red-700',
        hover: 'hover:from-red-700 hover:to-red-800',
        focus: 'focus:ring-red-500',
      };
    } else if (pathname.startsWith('/locations')) {
      return {
        bg: 'bg-gradient-to-r from-blue-600 to-blue-700',
        border: 'border-blue-700',
        hover: 'hover:from-blue-700 hover:to-blue-800',
        focus: 'focus:ring-blue-500',
      };
    } else if (pathname.startsWith('/moves')) {
      return {
        bg: 'bg-gradient-to-r from-yellow-600 to-orange-600',
        border: 'border-orange-700',
        hover: 'hover:from-yellow-700 hover:to-orange-700',
        focus: 'focus:ring-yellow-500',
      };
    } else if (pathname.startsWith('/generations')) {
      return {
        bg: 'bg-gradient-to-r from-green-600 to-green-700',
        border: 'border-green-700',
        hover: 'hover:from-green-700 hover:to-green-800',
        focus: 'focus:ring-green-500',
      };
    } else {
      // Default red for home/other pages
      return {
        bg: 'bg-gradient-to-r from-red-600 to-red-700',
        border: 'border-red-700',
        hover: 'hover:from-red-700 hover:to-red-800',
        focus: 'focus:ring-red-500',
      };
    }
  };

  const colors = getColorClasses();

  return (
    <button
      onClick={handleBack}
      className={`
        inline-flex items-center gap-2 px-4 py-2
        text-sm font-medium text-white
        ${colors.bg}
        border ${colors.border}
        rounded-lg shadow-md
        ${colors.hover}
        focus:outline-none focus:ring-2 ${colors.focus} focus:ring-offset-2
        transition-all duration-200
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
