import Link from 'next/link';
import { GenerationDetail as GenerationDetailType } from '@/lib/types/generations';
import { formatGenerationName } from '@/lib/utils/generations';

interface GenerationDetailProps {
  generation: GenerationDetailType;
}

function formatRegionName(name: string): string {
  return name
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

function formatPokemonName(name: string): string {
  return name
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

export function GenerationDetail({ generation }: GenerationDetailProps) {
  const formattedGenerationName = formatGenerationName(generation.name);
  const regionName = generation.main_region
    ? formatRegionName(generation.main_region.name)
    : null;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
        <h1 className="text-3xl font-bold mb-2 text-gray-900 dark:text-gray-100">
          {formattedGenerationName}
        </h1>
        {regionName && (
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Primary Region: {regionName}
          </p>
        )}
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
          {generation.pokemon_species.length} Pokemon species
        </p>
      </div>

      {/* Pokemon List */}
      {generation.pokemon_species.length > 0 ? (
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-gray-100">
            Pokemon
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
            {generation.pokemon_species.map((pokemon) => (
              <Link
                key={pokemon.name}
                href={`/pokemon/${encodeURIComponent(pokemon.name)}`}
                className="p-3 bg-gray-50 dark:bg-gray-900 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors text-sm font-medium text-gray-900 dark:text-gray-100 text-center"
              >
                {formatPokemonName(pokemon.name)}
              </Link>
            ))}
          </div>
        </div>
      ) : (
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
          <p className="text-gray-500 dark:text-gray-400">No Pokemon in this generation</p>
        </div>
      )}
    </div>
  );
}
