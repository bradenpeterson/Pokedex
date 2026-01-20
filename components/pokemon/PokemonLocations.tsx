'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { PokemonDetail } from '@/lib/types/pokemon';
import { NamedAPIResource } from '@/lib/types/api';
import { extractMainLocations } from '@/lib/utils/pokemon';
import { formatLocationName } from '@/lib/utils/formatting';

interface PokemonLocationsProps {
  pokemon: PokemonDetail;
}

export function PokemonLocations({ pokemon }: PokemonLocationsProps) {
  const [locations, setLocations] = useState<NamedAPIResource[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchLocations() {
      try {
        setLoading(true);
        const mainLocations = await extractMainLocations(pokemon);
        setLocations(mainLocations);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load locations');
      } finally {
        setLoading(false);
      }
    }

    fetchLocations();
  }, [pokemon]);

  if (loading) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border-2 border-gray-200 dark:border-gray-700 shadow-md">
        <h2 className="text-xl font-bold mb-4 text-blue-600 dark:text-blue-400">
          Locations
        </h2>
        <p className="text-gray-500 dark:text-gray-400">Loading locations...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border-2 border-gray-200 dark:border-gray-700 shadow-md">
        <h2 className="text-xl font-bold mb-4 text-blue-600 dark:text-blue-400">
          Locations
        </h2>
        <p className="text-red-500 dark:text-red-400">Error: {error}</p>
      </div>
    );
  }

  if (locations.length === 0) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border-2 border-gray-200 dark:border-gray-700 shadow-md">
        <h2 className="text-xl font-bold mb-4 text-blue-600 dark:text-blue-400">
          Locations
        </h2>
        <p className="text-gray-500 dark:text-gray-400">No location data available</p>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border-2 border-gray-200 dark:border-gray-700 shadow-md">
      <h2 className="text-xl font-bold mb-4 text-blue-600 dark:text-blue-400">
        Locations
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {locations.map((location) => (
          <Link
            key={location.name}
            href={`/locations/${encodeURIComponent(location.name)}`}
            className="p-3 bg-gray-50 dark:bg-gray-900 rounded-lg border border-transparent hover:border-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all text-sm font-medium text-gray-900 dark:text-gray-100 hover:text-blue-600 dark:hover:text-blue-400"
          >
            {formatLocationName(location.name)}
          </Link>
        ))}
      </div>
    </div>
  );
}
