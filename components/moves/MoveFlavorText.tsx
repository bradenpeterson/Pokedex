import { FlavorTextEntry } from '@/lib/types/moves';
import { groupFlavorTextByVersion, formatVersionGroupName } from '@/lib/utils/flavor-text';

interface MoveFlavorTextProps {
  flavorTextEntries: FlavorTextEntry[];
}

export function MoveFlavorText({ flavorTextEntries }: MoveFlavorTextProps) {
  const groupedFlavorText = groupFlavorTextByVersion(flavorTextEntries);

  if (groupedFlavorText.length === 0) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border-2 border-gray-200 dark:border-gray-700 shadow-md">
        <h2 className="text-xl font-bold mb-4 text-yellow-600 dark:text-yellow-400">
          Flavor Text
        </h2>
        <p className="text-gray-500 dark:text-gray-400">No flavor text available</p>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border-2 border-gray-200 dark:border-gray-700 shadow-md">
      <h2 className="text-xl font-bold mb-4 text-yellow-600 dark:text-yellow-400">
        Flavor Text
      </h2>
      <div className="space-y-4">
        {groupedFlavorText.map((entry, index) => (
          <div
            key={`${entry.version_group.name}-${index}`}
            className="border-l-4 border-yellow-500 dark:border-yellow-400 pl-4 py-2 bg-yellow-50 dark:bg-yellow-900/10 rounded-r-lg"
          >
            <p className="font-medium text-gray-900 dark:text-gray-100 mb-1">
              {formatVersionGroupName(entry.version_group.name)}
            </p>
            <p className="text-gray-700 dark:text-gray-300 italic">
              &ldquo;{entry.flavor_text}&rdquo;
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
