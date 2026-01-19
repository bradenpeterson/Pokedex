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
      <h1 className="text-3xl font-bold mb-6 text-gray-900 dark:text-gray-100">Pokemon</h1>
      <PokemonListWithError initialPokemon={pokemon} initialError={error} />
    </div>
  );
}
