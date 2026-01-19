import { Metadata } from 'next';
import { getAllPokemon } from '@/lib/api/pokemon';
import { PokemonList } from '@/components/ui/PokemonList';
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

  if (error) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-red-200 dark:border-red-800">
        <h1 className="text-2xl font-bold mb-4 text-gray-900 dark:text-gray-100">Pokemon</h1>
        <p className="text-red-600 dark:text-red-400">Error: {error}</p>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6 text-gray-900 dark:text-gray-100">Pokemon</h1>
      <PokemonList items={pokemon} />
    </div>
  );
}
