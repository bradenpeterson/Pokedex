import { Metadata } from 'next';
import { getAllPokemon } from '@/lib/api/pokemon';
import { PokemonListWithError } from '@/components/ui/PokemonListWithError';
import { PokemonListItem } from '@/lib/types/pokemon';

export const metadata: Metadata = {
  title: 'Pokemon | Pokedex',
  description: 'Browse all Pokemon in the Pokedex',
};

export default async function PokemonListPage() {
  let pokemon: PokemonListItem[] = [];
  let error: string | null = null;

  try {
    pokemon = await getAllPokemon();
  } catch (err) {
    error = err instanceof Error ? err.message : 'Failed to load Pokemon';
  }

  return (
    <div>
      <h1 className="text-4xl font-bold mb-6 bg-gradient-to-r from-red-600 to-orange-600 dark:from-red-400 dark:to-orange-400 bg-clip-text text-transparent">
        Pokemon
      </h1>
      <PokemonListWithError initialPokemon={pokemon} initialError={error} />
    </div>
  );
}
