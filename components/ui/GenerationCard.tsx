import Link from 'next/link';
import { GenerationListItem } from '@/lib/types/generations';
import { formatGenerationName } from '@/lib/utils/generations';

interface GenerationCardProps {
  generation: GenerationListItem;
}

export function GenerationCard({ generation }: GenerationCardProps) {
  const formattedName = formatGenerationName(generation.name);
  
  // Extract generation number from URL for display
  const generationNumber = generation.url.match(/\/generation\/(\d+)\//)?.[1];

  return (
    <Link
      href={`/generations/${encodeURIComponent(generation.name)}`}
      className="block p-6 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg hover:shadow-lg hover:border-blue-500 dark:hover:border-blue-400 transition-all duration-200 group"
    >
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <h3 className="font-semibold text-gray-900 dark:text-gray-100 text-base sm:text-lg group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
            {formattedName}
          </h3>
          {generationNumber && (
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              Generation {generationNumber}
            </p>
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
