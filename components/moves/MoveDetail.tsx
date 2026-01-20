import { MoveDetail as MoveDetailType } from '@/lib/types/moves';
import { formatMoveName, formatTypeName } from '@/lib/utils/formatting';
import { MoveFlavorText } from './MoveFlavorText';
import { PokemonLearners } from './PokemonLearners';

interface MoveDetailProps {
  move: MoveDetailType;
}

export function MoveDetail({ move }: MoveDetailProps) {
  const formattedName = formatMoveName(move.name);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-gray-800 dark:to-gray-700 rounded-xl p-6 border-2 border-yellow-200 dark:border-yellow-900 shadow-lg">
        <h1 className="text-3xl font-bold mb-4 bg-gradient-to-r from-yellow-600 to-orange-600 dark:from-yellow-400 dark:to-orange-400 bg-clip-text text-transparent">
          {formattedName}
        </h1>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div>
            <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Type</p>
            <p className="text-lg font-bold text-yellow-600 dark:text-yellow-400">
              {formatTypeName(move.type.name)}
            </p>
          </div>
          {move.power !== null && (
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Power</p>
              <p className="text-lg font-bold text-orange-600 dark:text-orange-400">
                {move.power}
              </p>
            </div>
          )}
          {move.accuracy !== null && (
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Accuracy</p>
              <p className="text-lg font-bold text-blue-600 dark:text-blue-400">
                {move.accuracy}%
              </p>
            </div>
          )}
          {move.pp !== null && (
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">PP</p>
              <p className="text-lg font-bold text-green-600 dark:text-green-400">
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
