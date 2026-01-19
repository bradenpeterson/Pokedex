import { Metadata } from 'next';
import { getAllLocations } from '@/lib/api/locations';
import { LocationList } from '@/components/ui/LocationList';
import { LocationListItem } from '@/lib/types/locations';

export const metadata: Metadata = {
  title: 'Locations | Pokedex',
  description: 'Browse all game locations in the Pokedex',
};

export default async function LocationsListPage() {
  let locations: LocationListItem[] = [];
  let error: string | null = null;

  try {
    locations = await getAllLocations();
  } catch (err) {
    error = err instanceof Error ? err.message : 'Failed to load locations';
  }

  if (error) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-red-200 dark:border-red-800">
        <h1 className="text-2xl font-bold mb-4 text-gray-900 dark:text-gray-100">Locations</h1>
        <p className="text-red-600 dark:text-red-400">Error: {error}</p>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6 text-gray-900 dark:text-gray-100">Locations</h1>
      <LocationList items={locations} />
    </div>
  );
}
