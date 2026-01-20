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
      <h1 className="text-4xl font-bold mb-6 bg-gradient-to-r from-green-600 to-emerald-600 dark:from-green-400 dark:to-emerald-400 bg-clip-text text-transparent">
        Generations
      </h1>
      <GenerationListWithError initialGenerations={generations} initialError={error} />
    </div>
  );
}
