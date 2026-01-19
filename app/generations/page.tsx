import { Metadata } from 'next';
import { getAllGenerations } from '@/lib/api/generations';
import { GenerationList } from '@/components/ui/GenerationList';
import { GenerationListItem } from '@/lib/types/generations';

export const metadata: Metadata = {
  title: 'Generations | Pokedex',
  description: 'Browse all Pokemon generations in the Pokedex',
};

export default async function GenerationsListPage() {
  let generations: GenerationListItem[] = [];
  let error: string | null = null;

  try {
    generations = await getAllGenerations();
  } catch (err) {
    error = err instanceof Error ? err.message : 'Failed to load generations';
  }

  if (error) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-red-200 dark:border-red-800">
        <h1 className="text-2xl font-bold mb-4 text-gray-900 dark:text-gray-100">Generations</h1>
        <p className="text-red-600 dark:text-red-400">Error: {error}</p>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6 text-gray-900 dark:text-gray-100">Generations</h1>
      <GenerationList items={generations} />
    </div>
  );
}
