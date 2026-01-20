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
      <div className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-gray-800 dark:to-gray-700 rounded-xl p-6 border-2 border-green-200 dark:border-green-900 shadow-lg">
        <h1 className="text-3xl font-bold mb-2 bg-gradient-to-r from-green-600 to-emerald-600 dark:from-green-400 dark:to-emerald-400 bg-clip-text text-transparent">
          {formattedGenerationName}
        </h1>
        {regionName && (
          <p className="text-lg font-semibold text-gray-700 dark:text-gray-300">
            Primary Region: <span className="text-green-600 dark:text-green-400">{regionName}</span>
          </p>
        )}
        <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mt-2">
          {generation.pokemon_species.length} Pokemon species
        </p>
      </div>

      {/* Pokemon List */}
      {generation.pokemon_species.length > 0 ? (
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border-2 border-gray-200 dark:border-gray-700 shadow-md">
          <h2 className="text-xl font-bold mb-4 text-green-600 dark:text-green-400">
            Pokemon
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
            {generation.pokemon_species.map((pokemon) => (
              <Link
                key={pokemon.name}
                href={`/pokemon/${encodeURIComponent(pokemon.name)}`}
                className="p-3 bg-gray-50 dark:bg-gray-900 rounded-lg border border-transparent hover:border-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-all text-sm font-medium text-gray-900 dark:text-gray-100 hover:text-red-600 dark:hover:text-red-400 text-center"
              >
                {formatPokemonName(pokemon.name)}
              </Link>
            ))}
          </div>
        </div>
      ) : (
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border-2 border-gray-200 dark:border-gray-700 shadow-md">
          <p className="text-gray-500 dark:text-gray-400">No Pokemon in this generation</p>
        </div>
      )}
    </div>
  );
}
