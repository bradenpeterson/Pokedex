import { PokemonDetail as PokemonDetailType } from '@/lib/types/pokemon';
import { PokemonSprites } from './PokemonSprites';
import { PokemonStats } from './PokemonStats';
import { PokemonMoves } from './PokemonMoves';
import { PokemonLocations } from './PokemonLocations';

interface PokemonDetailProps {
  pokemon: PokemonDetailType;
}

function formatPokemonName(name: string): string {
  return name
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

function formatTypes(types: Array<{ type: { name: string } }>): string {
  return types.map((t) => t.type.name.charAt(0).toUpperCase() + t.type.name.slice(1)).join(', ');
}

export function PokemonDetail({ pokemon }: PokemonDetailProps) {
  const formattedName = formatPokemonName(pokemon.name);
  const types = formatTypes(pokemon.types);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-red-50 to-blue-50 dark:from-gray-800 dark:to-gray-700 rounded-xl p-6 border-2 border-red-200 dark:border-red-900 shadow-lg">
        <h1 className="text-3xl font-bold mb-2 bg-gradient-to-r from-red-600 to-blue-600 dark:from-red-400 dark:to-blue-400 bg-clip-text text-transparent">
          {formattedName}
        </h1>
        <div className="flex flex-wrap items-center gap-4 text-sm font-medium">
          <span className="px-3 py-1 bg-red-600 text-white rounded-full">#{pokemon.id}</span>
          {types && <span className="text-gray-700 dark:text-gray-300">Type: <span className="font-bold">{types}</span></span>}
          <span className="text-gray-700 dark:text-gray-300">Height: {(pokemon.height / 10).toFixed(1)} m</span>
          <span className="text-gray-700 dark:text-gray-300">Weight: {(pokemon.weight / 10).toFixed(1)} kg</span>
        </div>
      </div>

      {/* Sprites */}
      <PokemonSprites sprites={pokemon.sprites} pokemonName={formattedName} />

      {/* Stats */}
      <PokemonStats stats={pokemon.stats} />

      {/* Moves */}
      <PokemonMoves moves={pokemon.moves} />

      {/* Locations */}
      <PokemonLocations pokemon={pokemon} />
    </div>
  );
}
