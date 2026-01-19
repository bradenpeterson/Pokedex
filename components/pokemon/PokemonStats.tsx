import { PokemonStat, PokemonStats as PokemonStatsType } from '@/lib/types/pokemon';

interface PokemonStatsProps {
  stats: PokemonStat[];
}

const STAT_NAMES: Record<string, string> = {
  hp: 'HP',
  attack: 'Attack',
  defense: 'Defense',
  'special-attack': 'Sp. Atk',
  'special-defense': 'Sp. Def',
  speed: 'Speed',
};

const MAX_STAT_VALUE = 255;

function getStatValue(stats: PokemonStat[], statName: string): number {
  const stat = stats.find((s) => s.stat.name === statName);
  return stat?.base_stat || 0;
}

function getStatPercentage(value: number): number {
  return (value / MAX_STAT_VALUE) * 100;
}

export function PokemonStats({ stats }: PokemonStatsProps) {
  const statsDisplay: PokemonStatsType = {
    hp: getStatValue(stats, 'hp'),
    attack: getStatValue(stats, 'attack'),
    defense: getStatValue(stats, 'defense'),
    specialAttack: getStatValue(stats, 'special-attack'),
    specialDefense: getStatValue(stats, 'special-defense'),
    speed: getStatValue(stats, 'speed'),
  };

  const statEntries = [
    { key: 'hp' as const, value: statsDisplay.hp },
    { key: 'attack' as const, value: statsDisplay.attack },
    { key: 'defense' as const, value: statsDisplay.defense },
    { key: 'specialAttack' as const, value: statsDisplay.specialAttack },
    { key: 'specialDefense' as const, value: statsDisplay.specialDefense },
    { key: 'speed' as const, value: statsDisplay.speed },
  ];

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
      <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-gray-100">
        Base Stats
      </h2>
      <div className="space-y-4">
        {statEntries.map(({ key, value }) => {
          const statName = STAT_NAMES[key === 'specialAttack' ? 'special-attack' : key === 'specialDefense' ? 'special-defense' : key] || key;
          const percentage = getStatPercentage(value);

          return (
            <div key={key}>
              <div className="flex justify-between items-center mb-1">
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  {statName}
                </span>
                <span className="text-sm font-semibold text-gray-900 dark:text-gray-100">
                  {value}
                </span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                <div
                  className="bg-blue-600 dark:bg-blue-500 h-2.5 rounded-full transition-all duration-300"
                  style={{ width: `${percentage}%` }}
                  role="progressbar"
                  aria-valuenow={value}
                  aria-valuemin={0}
                  aria-valuemax={MAX_STAT_VALUE}
                  aria-label={`${statName}: ${value}`}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
