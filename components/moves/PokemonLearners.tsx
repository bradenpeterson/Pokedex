import Link from 'next/link';
import { NamedAPIResource } from '@/lib/types/api';

interface PokemonLearnersProps {
  pokemon: NamedAPIResource[];
}

function formatPokemonName(name: string): string {
  return name
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

export function PokemonLearners({ pokemon }: PokemonLearnersProps) {
  if (pokemon.length === 0) {
    return null;
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
      <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-gray-100">
        Pokemon That Learn This Move
      </h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
        {pokemon.map((pokemonItem) => (
          <Link
            key={pokemonItem.name}
            href={`/pokemon/${encodeURIComponent(pokemonItem.name)}`}
            className="p-3 bg-gray-50 dark:bg-gray-900 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors text-sm font-medium text-gray-900 dark:text-gray-100 text-center"
          >
            {formatPokemonName(pokemonItem.name)}
          </Link>
        ))}
      </div>
    </div>
  );
}
