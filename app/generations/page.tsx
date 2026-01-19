import { Metadata } from 'next';
import { getAllGenerations } from '@/lib/api/generations';
import { GenerationListWithError } from '@/components/ui/GenerationListWithError';
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

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6 text-gray-900 dark:text-gray-100">Generations</h1>
      <GenerationListWithError initialGenerations={generations} initialError={error} />
    </div>
  );
}
