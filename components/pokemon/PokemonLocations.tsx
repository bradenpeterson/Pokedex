'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { PokemonDetail } from '@/lib/types/pokemon';
import { NamedAPIResource } from '@/lib/types/api';
import { extractMainLocations } from '@/lib/utils/pokemon';

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

  function formatLocationName(name: string): string {
    return name
      .split('-')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  }

  if (loading) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
        <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-gray-100">
          Locations
        </h2>
        <p className="text-gray-500 dark:text-gray-400">Loading locations...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
        <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-gray-100">
          Locations
        </h2>
        <p className="text-red-500 dark:text-red-400">Error: {error}</p>
      </div>
    );
  }

  if (locations.length === 0) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
        <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-gray-100">
          Locations
        </h2>
        <p className="text-gray-500 dark:text-gray-400">No location data available</p>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
      <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-gray-100">
        Locations
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {locations.map((location) => (
          <Link
            key={location.name}
            href={`/locations/${encodeURIComponent(location.name)}`}
            className="p-3 bg-gray-50 dark:bg-gray-900 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors text-sm font-medium text-gray-900 dark:text-gray-100"
          >
            {formatLocationName(location.name)}
          </Link>
        ))}
      </div>
    </div>
  );
}
