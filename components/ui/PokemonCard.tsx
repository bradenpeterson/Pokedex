import Link from 'next/link';
import Image from 'next/image';
import { PokemonListItem } from '@/lib/types/pokemon';
import { formatPokemonName } from '@/lib/utils/formatting';

interface PokemonCardProps {
  pokemon: PokemonListItem;
}

export function PokemonCard({ pokemon }: PokemonCardProps) {
  const pokemonId = pokemon.id || pokemon.url.match(/\/pokemon\/(\d+)\//)?.[1];
  const spriteUrl = pokemonId
    ? `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonId}.png`
    : null;

  const formattedName = formatPokemonName(pokemon.name);

  return (
    <Link
      href={`/pokemon/${encodeURIComponent(pokemon.name)}`}
      className="block w-full p-6 bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 rounded-xl hover:shadow-xl hover:border-red-500 dark:hover:border-red-500 hover:scale-105 transition-all duration-200 group h-full min-h-[240px]"
    >
      <div className="flex flex-col items-center text-center h-full justify-between w-full min-w-0">
        <div className="flex-1 flex items-center justify-center min-h-[128px] w-full">
          {spriteUrl ? (
            <div className="relative w-32 h-32 flex-shrink-0">
              <Image
                src={spriteUrl}
                alt={formattedName}
                fill
                className="object-contain group-hover:scale-110 transition-transform duration-200"
                sizes="128px"
              />
            </div>
          ) : (
            <div className="w-32 h-32 bg-gray-100 dark:bg-gray-700 rounded flex items-center justify-center flex-shrink-0">
              <span className="text-gray-400 dark:text-gray-500 text-sm">No Image</span>
            </div>
          )}
        </div>
        <div className="w-full mt-3 min-w-0 px-2">
          <h3 className="font-bold text-gray-900 dark:text-gray-100 text-base sm:text-lg group-hover:text-red-600 dark:group-hover:text-red-400 transition-colors break-words overflow-hidden line-clamp-2">
            {formattedName}
          </h3>
          {pokemonId && (
            <p className="text-sm font-semibold text-red-600 dark:text-red-400 mt-1">#{pokemonId}</p>
          )}
        </div>
      </div>
    </Link>
  );
}
