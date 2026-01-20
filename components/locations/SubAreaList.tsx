'use client';

import Link from 'next/link';
import { LocationArea } from '@/lib/types/locations';
import { formatPokemonName, formatMethodName } from '@/lib/utils/formatting';
import { groupEncountersByMethod } from '@/lib/utils/encounters';

interface SubAreaListProps {
  locationAreas: LocationArea[];
}

export function SubAreaList({ locationAreas }: SubAreaListProps) {
  if (locationAreas.length === 0) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
        <p className="text-gray-500 dark:text-gray-400">No sub-areas available</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {locationAreas.map((area) => {
        const groupedEncounters = groupEncountersByMethod(area.pokemon_encounters);

        if (groupedEncounters.length === 0) {
          return (
            <div
              key={area.id}
              className="bg-white dark:bg-gray-800 rounded-xl p-6 border-2 border-gray-200 dark:border-gray-700 shadow-md"
            >
              <h3 className="text-lg font-bold mb-4 text-blue-600 dark:text-blue-400">
                {formatPokemonName(area.name)}
              </h3>
              <p className="text-gray-500 dark:text-gray-400">No Pokemon found here</p>
            </div>
          );
        }

        return (
          <div
            key={area.id}
            className="bg-white dark:bg-gray-800 rounded-xl p-6 border-2 border-gray-200 dark:border-gray-700 shadow-md"
          >
            <h3 className="text-lg font-bold mb-4 text-blue-600 dark:text-blue-400">
              {formatPokemonName(area.name)}
            </h3>
            <div className="space-y-4">
              {groupedEncounters.map((group) => (
                <div key={group.method.name}>
                  <h4 className="text-sm font-bold text-blue-600 dark:text-blue-400 mb-2">
                    {formatMethodName(group.method.name)}
                  </h4>
                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2">
                    {group.pokemon.map((encounter) => (
                      <Link
                        key={encounter.pokemon.name}
                        href={`/pokemon/${encodeURIComponent(encounter.pokemon.name)}`}
                        className="p-2 bg-gray-50 dark:bg-gray-900 rounded-lg border border-transparent hover:border-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-all text-sm font-medium text-gray-900 dark:text-gray-100 hover:text-red-600 dark:hover:text-red-400"
                      >
                        {formatPokemonName(encounter.pokemon.name)}
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}
