import { MoveDetail as MoveDetailType } from '@/lib/types/moves';
import { MoveFlavorText } from './MoveFlavorText';
import { PokemonLearners } from './PokemonLearners';

interface MoveDetailProps {
  move: MoveDetailType;
}

function formatMoveName(name: string): string {
  return name
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

function formatTypeName(name: string): string {
  return name.charAt(0).toUpperCase() + name.slice(1);
}

export function MoveDetail({ move }: MoveDetailProps) {
  const formattedName = formatMoveName(move.name);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
        <h1 className="text-3xl font-bold mb-4 text-gray-900 dark:text-gray-100">
          {formattedName}
        </h1>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400">Type</p>
            <p className="text-lg font-semibold text-gray-900 dark:text-gray-100">
              {formatTypeName(move.type.name)}
            </p>
          </div>
          {move.power !== null && (
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Power</p>
              <p className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                {move.power}
              </p>
            </div>
          )}
          {move.accuracy !== null && (
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Accuracy</p>
              <p className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                {move.accuracy}%
              </p>
            </div>
          )}
          {move.pp !== null && (
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">PP</p>
              <p className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                {move.pp}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Flavor Text */}
      <MoveFlavorText flavorTextEntries={move.flavor_text_entries} />

      {/* Pokemon Learners */}
      {move.learned_by_pokemon && move.learned_by_pokemon.length > 0 && (
        <PokemonLearners pokemon={move.learned_by_pokemon} />
      )}
    </div>
  );
}
