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
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
        <h1 className="text-3xl font-bold mb-2 text-gray-900 dark:text-gray-100">
          {formattedName}
        </h1>
        <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
          <span>#{pokemon.id}</span>
          {types && <span>Type: {types}</span>}
          <span>Height: {(pokemon.height / 10).toFixed(1)} m</span>
          <span>Weight: {(pokemon.weight / 10).toFixed(1)} kg</span>
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
