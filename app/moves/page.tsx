import { Metadata } from 'next';
import { getAllMoves } from '@/lib/api/moves';
import { MoveListWithError } from '@/components/ui/MoveListWithError';
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

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6 text-gray-900 dark:text-gray-100">Moves</h1>
      <MoveListWithError initialMoves={moves} initialError={error} />
    </div>
  );
}
