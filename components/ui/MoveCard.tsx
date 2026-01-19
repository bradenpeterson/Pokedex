import Link from 'next/link';
import { MoveListItem } from '@/lib/types/moves';

interface MoveCardProps {
  move: MoveListItem;
}

export function MoveCard({ move }: MoveCardProps) {
  const formattedName = move.name
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');

  // Extract move ID from URL to potentially get type later
  const moveId = move.url.match(/\/move\/(\d+)\//)?.[1];

  return (
    <Link
      href={`/moves/${encodeURIComponent(move.name)}`}
      className="block p-4 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg hover:shadow-lg hover:border-blue-500 dark:hover:border-blue-400 transition-all duration-200 group"
    >
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <h3 className="font-semibold text-gray-900 dark:text-gray-100 text-sm sm:text-base group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
            {formattedName}
          </h3>
          {moveId && (
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Move #{moveId}</p>
          )}
        </div>
        <svg
          className="w-5 h-5 text-gray-400 group-hover:text-blue-500 dark:group-hover:text-blue-400 transition-colors flex-shrink-0 ml-2"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 5l7 7-7 7"
          />
        </svg>
      </div>
    </Link>
  );
}
