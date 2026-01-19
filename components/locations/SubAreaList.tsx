'use client';

import Link from 'next/link';
import { LocationArea } from '@/lib/types/locations';
import { groupEncountersByMethod } from '@/lib/utils/encounters';

interface SubAreaListProps {
  locationAreas: LocationArea[];
}

function formatPokemonName(name: string): string {
  return name
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

function formatMethodName(methodName: string): string {
  return methodName
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
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
              className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700"
            >
              <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-gray-100">
                {formatPokemonName(area.name)}
              </h3>
              <p className="text-gray-500 dark:text-gray-400">No Pokemon found here</p>
            </div>
          );
        }

        return (
          <div
            key={area.id}
            className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700"
          >
            <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-gray-100">
              {formatPokemonName(area.name)}
            </h3>
            <div className="space-y-4">
              {groupedEncounters.map((group) => (
                <div key={group.method.name}>
                  <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    {formatMethodName(group.method.name)}
                  </h4>
                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2">
                    {group.pokemon.map((encounter) => (
                      <Link
                        key={encounter.pokemon.name}
                        href={`/pokemon/${encodeURIComponent(encounter.pokemon.name)}`}
                        className="p-2 bg-gray-50 dark:bg-gray-900 rounded hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors text-sm text-gray-900 dark:text-gray-100"
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
