import Link from 'next/link';
import Image from 'next/image';
import { PokemonListItem } from '@/lib/types/pokemon';

interface PokemonCardProps {
  pokemon: PokemonListItem;
}

export function PokemonCard({ pokemon }: PokemonCardProps) {
  const pokemonId = pokemon.id || pokemon.url.match(/\/pokemon\/(\d+)\//)?.[1];
  const spriteUrl = pokemonId
    ? `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonId}.png`
    : null;

  const formattedName = pokemon.name
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');

  return (
    <Link
      href={`/pokemon/${encodeURIComponent(pokemon.name)}`}
      className="block p-4 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg hover:shadow-lg hover:border-blue-500 dark:hover:border-blue-400 transition-all duration-200 group"
    >
      <div className="flex flex-col items-center text-center space-y-2">
        {spriteUrl ? (
          <div className="relative w-24 h-24 flex-shrink-0">
            <Image
              src={spriteUrl}
              alt={formattedName}
              fill
              className="object-contain group-hover:scale-110 transition-transform duration-200"
              sizes="96px"
            />
          </div>
        ) : (
          <div className="w-24 h-24 bg-gray-100 dark:bg-gray-700 rounded flex items-center justify-center">
            <span className="text-gray-400 dark:text-gray-500 text-xs">No Image</span>
          </div>
        )}
        <h3 className="font-semibold text-gray-900 dark:text-gray-100 text-sm sm:text-base">
          {formattedName}
        </h3>
        {pokemonId && (
          <p className="text-xs text-gray-500 dark:text-gray-400">#{pokemonId}</p>
        )}
      </div>
    </Link>
  );
}
