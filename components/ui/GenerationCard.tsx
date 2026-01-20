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
      className="block w-full p-8 bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 rounded-xl hover:shadow-xl hover:border-green-500 dark:hover:border-green-500 hover:scale-105 transition-all duration-200 group h-full min-h-[240px]"
    >
      <div className="flex flex-col items-center justify-center h-full text-center w-full min-w-0">
        <h3 className="font-bold text-gray-900 dark:text-gray-100 text-lg sm:text-xl group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors break-words overflow-hidden line-clamp-3 w-full px-2">
          {formattedName}
        </h3>
        {generationNumber && (
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
            Generation {generationNumber}
          </p>
        )}
      </div>
    </Link>
  );
}
