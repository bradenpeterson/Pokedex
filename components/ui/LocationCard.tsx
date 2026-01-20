import Link from 'next/link';
import { LocationListItem } from '@/lib/types/locations';

interface LocationCardProps {
  location: LocationListItem;
}

export function LocationCard({ location }: LocationCardProps) {
  const formattedName = location.name
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');

  return (
    <Link
      href={`/locations/${encodeURIComponent(location.name)}`}
      className="block w-full p-8 bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 rounded-xl hover:shadow-xl hover:border-blue-500 dark:hover:border-blue-500 hover:scale-105 transition-all duration-200 group h-full min-h-[240px]"
    >
      <div className="flex items-center justify-center h-full w-full min-w-0">
        <h3 className="font-bold text-gray-900 dark:text-gray-100 text-lg sm:text-xl group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors text-center break-words overflow-hidden line-clamp-3 w-full px-2">
          {formattedName}
        </h3>
      </div>
    </Link>
  );
}
