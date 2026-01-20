import Link from 'next/link';
import { NamedAPIResource } from '@/lib/types/api';
import { formatPokemonName } from '@/lib/utils/formatting';

interface PokemonLearnersProps {
  pokemon: NamedAPIResource[];
}

export function PokemonLearners({ pokemon }: PokemonLearnersProps) {
  if (pokemon.length === 0) {
    return null;
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border-2 border-gray-200 dark:border-gray-700 shadow-md">
      <h2 className="text-xl font-bold mb-4 text-red-600 dark:text-red-400">
        Pokemon That Learn This Move
      </h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
        {pokemon.map((pokemonItem) => (
          <Link
            key={pokemonItem.name}
            href={`/pokemon/${encodeURIComponent(pokemonItem.name)}`}
            className="p-3 bg-gray-50 dark:bg-gray-900 rounded-lg border border-transparent hover:border-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-all text-sm font-medium text-gray-900 dark:text-gray-100 hover:text-red-600 dark:hover:text-red-400 text-center"
          >
            {formatPokemonName(pokemonItem.name)}
          </Link>
        ))}
      </div>
    </div>
  );
}
