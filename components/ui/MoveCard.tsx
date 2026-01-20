import Link from 'next/link';
import { MoveListItem } from '@/lib/types/moves';
import { formatMoveName } from '@/lib/utils/formatting';

interface MoveCardProps {
  move: MoveListItem;
}

export function MoveCard({ move }: MoveCardProps) {
  const formattedName = formatMoveName(move.name);

  // Extract move ID from URL to potentially get type later
  const moveId = move.url.match(/\/move\/(\d+)\//)?.[1];

  return (
    <Link
      href={`/moves/${encodeURIComponent(move.name)}`}
      className="block w-full p-8 bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 rounded-xl hover:shadow-xl hover:border-yellow-500 dark:hover:border-yellow-500 hover:scale-105 transition-all duration-200 group h-full min-h-[240px]"
    >
      <div className="flex flex-col items-center justify-center h-full text-center w-full min-w-0">
        <h3 className="font-bold text-gray-900 dark:text-gray-100 text-lg sm:text-xl group-hover:text-yellow-600 dark:group-hover:text-yellow-400 transition-colors break-words overflow-hidden line-clamp-3 w-full px-2">
          {formattedName}
        </h3>
        {moveId && (
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">Move #{moveId}</p>
        )}
      </div>
    </Link>
  );
}
