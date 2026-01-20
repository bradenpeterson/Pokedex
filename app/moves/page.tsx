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
      <h1 className="text-4xl font-bold mb-6 bg-gradient-to-r from-yellow-600 to-orange-600 dark:from-yellow-400 dark:to-orange-400 bg-clip-text text-transparent">
        Moves
      </h1>
      <MoveListWithError initialMoves={moves} initialError={error} />
    </div>
  );
}
