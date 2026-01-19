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
      <h1 className="text-3xl font-bold mb-6 text-gray-900 dark:text-gray-100">Locations</h1>
      <LocationListWithError initialLocations={locations} initialError={error} />
    </div>
  );
}
