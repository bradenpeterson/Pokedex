import { Metadata } from 'next';
import { getAllMoves } from '@/lib/api/moves';
import { MoveList } from '@/components/ui/MoveList';
import { MoveListItem } from '@/lib/types/moves';

export const metadata: Metadata = {
  title: 'Moves | Pokedex',
  description: 'Browse all moves in the Pokedex',
};

export default async function MovesListPage() {
  let moves: MoveListItem[] = [];
  let error: string | null = null;

  try {
    moves = await getAllMoves();
  } catch (err) {
    error = err instanceof Error ? err.message : 'Failed to load moves';
  }

  if (error) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-red-200 dark:border-red-800">
        <h1 className="text-2xl font-bold mb-4 text-gray-900 dark:text-gray-100">Moves</h1>
        <p className="text-red-600 dark:text-red-400">Error: {error}</p>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6 text-gray-900 dark:text-gray-100">Moves</h1>
      <MoveList items={moves} />
    </div>
  );
}
