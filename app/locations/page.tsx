import { Metadata } from 'next';
import { getAllLocations } from '@/lib/api/locations';
import { LocationListWithError } from '@/components/ui/LocationListWithError';
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

  return (
    <div>
      <h1 className="text-4xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-cyan-600 dark:from-blue-400 dark:to-cyan-400 bg-clip-text text-transparent">
        Locations
      </h1>
      <LocationListWithError initialLocations={locations} initialError={error} />
    </div>
  );
}
