import Link from 'next/link';
import { PokemonMove } from '@/lib/types/pokemon';

interface PokemonMovesProps {
  moves: PokemonMove[];
}

interface CategorizedMoves {
  levelUp: Array<{ move: string; level: number }>;
  tmHm: Array<{ move: string }>;
  egg: Array<{ move: string }>;
  tutor: Array<{ move: string }>;
}

function categorizeMoves(moves: PokemonMove[]): CategorizedMoves {
  const categorized: CategorizedMoves = {
    levelUp: [],
    tmHm: [],
    egg: [],
    tutor: [],
  };

  moves.forEach((pokemonMove) => {
    const moveName = pokemonMove.move.name;
    
    // Check all version group details for learning methods
    pokemonMove.version_group_details.forEach((detail) => {
      const method = detail.move_learn_method.name;

      if (method === 'level-up') {
        // Only add if not already added (avoid duplicates)
        if (!categorized.levelUp.find((m) => m.move === moveName)) {
          categorized.levelUp.push({
            move: moveName,
            level: detail.level_learned_at,
          });
        }
      } else if (method === 'machine') {
        if (!categorized.tmHm.find((m) => m.move === moveName)) {
          categorized.tmHm.push({ move: moveName });
        }
      } else if (method === 'egg') {
        if (!categorized.egg.find((m) => m.move === moveName)) {
          categorized.egg.push({ move: moveName });
        }
      } else if (method === 'tutor') {
        if (!categorized.tutor.find((m) => m.move === moveName)) {
          categorized.tutor.push({ move: moveName });
        }
      }
    });
  });

  // Sort level-up moves by level
  categorized.levelUp.sort((a, b) => a.level - b.level);

  return categorized;
}

function formatMoveName(name: string): string {
  return name
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

export function PokemonMoves({ moves }: PokemonMovesProps) {
  const categorized = categorizeMoves(moves);
  const hasAnyMoves =
    categorized.levelUp.length > 0 ||
    categorized.tmHm.length > 0 ||
    categorized.egg.length > 0 ||
    categorized.tutor.length > 0;

  if (!hasAnyMoves) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
        <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-gray-100">
          Moves
        </h2>
        <p className="text-gray-500 dark:text-gray-400">No moves available</p>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border-2 border-gray-200 dark:border-gray-700 shadow-md">
      <h2 className="text-xl font-bold mb-4 text-yellow-600 dark:text-yellow-400">
        Moves
      </h2>
      <div className="space-y-6">
        {/* Level-up Moves */}
        {categorized.levelUp.length > 0 && (
          <div>
            <h3 className="text-lg font-bold mb-3 text-red-600 dark:text-red-400">
              Level-up Moves
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
              {categorized.levelUp.map(({ move, level }) => (
                <Link
                  key={move}
                  href={`/moves/${encodeURIComponent(move)}`}
                  className="flex items-center justify-between p-2 bg-gray-50 dark:bg-gray-900 rounded-lg border border-transparent hover:border-yellow-400 hover:bg-yellow-50 dark:hover:bg-yellow-900/20 transition-all"
                >
                  <span className="text-sm font-medium text-gray-900 dark:text-gray-100 hover:text-yellow-600 dark:hover:text-yellow-400 transition-colors">
                    {formatMoveName(move)}
                  </span>
                  <span className="text-xs font-semibold text-yellow-600 dark:text-yellow-400 ml-2">
                    Lv. {level}
                  </span>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* TM/HM Moves */}
        {categorized.tmHm.length > 0 && (
          <div>
            <h3 className="text-lg font-bold mb-3 text-blue-600 dark:text-blue-400">
              TM/HM Moves
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
              {categorized.tmHm.map(({ move }) => (
                <Link
                  key={move}
                  href={`/moves/${encodeURIComponent(move)}`}
                  className="p-2 bg-gray-50 dark:bg-gray-900 rounded-lg border border-transparent hover:border-yellow-400 hover:bg-yellow-50 dark:hover:bg-yellow-900/20 transition-all text-sm font-medium text-gray-900 dark:text-gray-100 hover:text-yellow-600 dark:hover:text-yellow-400"
                >
                  {formatMoveName(move)}
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Egg Moves */}
        {categorized.egg.length > 0 && (
          <div>
            <h3 className="text-lg font-bold mb-3 text-green-600 dark:text-green-400">
              Egg Moves
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
              {categorized.egg.map(({ move }) => (
                <Link
                  key={move}
                  href={`/moves/${encodeURIComponent(move)}`}
                  className="p-2 bg-gray-50 dark:bg-gray-900 rounded-lg border border-transparent hover:border-yellow-400 hover:bg-yellow-50 dark:hover:bg-yellow-900/20 transition-all text-sm font-medium text-gray-900 dark:text-gray-100 hover:text-yellow-600 dark:hover:text-yellow-400"
                >
                  {formatMoveName(move)}
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Tutor Moves */}
        {categorized.tutor.length > 0 && (
          <div>
            <h3 className="text-lg font-bold mb-3 text-orange-600 dark:text-orange-400">
              Tutor Moves
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
              {categorized.tutor.map(({ move }) => (
                <Link
                  key={move}
                  href={`/moves/${encodeURIComponent(move)}`}
                  className="p-2 bg-gray-50 dark:bg-gray-900 rounded-lg border border-transparent hover:border-yellow-400 hover:bg-yellow-50 dark:hover:bg-yellow-900/20 transition-all text-sm font-medium text-gray-900 dark:text-gray-100 hover:text-yellow-600 dark:hover:text-yellow-400"
                >
                  {formatMoveName(move)}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
