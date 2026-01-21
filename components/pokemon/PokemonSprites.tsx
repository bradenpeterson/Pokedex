import Image from 'next/image';
import { PokemonSprite } from '@/lib/types/pokemon';

interface PokemonSpritesProps {
  sprites: PokemonSprite;
  pokemonName: string;
}

export function PokemonSprites({ sprites, pokemonName }: PokemonSpritesProps) {
  const hasSprites = sprites.front_default || sprites.front_shiny;

  if (!hasSprites) {
    return (
      <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-4 text-center text-gray-500 dark:text-gray-400">
        No sprites available
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border-2 border-gray-200 dark:border-gray-700 shadow-md">
      <h2 className="text-xl font-bold mb-4 text-red-600 dark:text-red-400">
        Sprites
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {/* Normal Sprite */}
        {sprites.front_default && (
          <div className="flex flex-col items-center">
            <div className="relative w-64 h-64 bg-gray-50 dark:bg-gray-900 rounded-lg mb-2 flex items-center justify-center">
              <Image
                src={sprites.front_default}
                alt={`${pokemonName} normal sprite`}
                fill
                className="object-contain p-2"
                style={{ imageRendering: 'pixelated' }}
                sizes="256px"
                unoptimized
              />
            </div>
            <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Normal
            </p>
          </div>
        )}

        {/* Shiny Sprite */}
        {sprites.front_shiny && (
          <div className="flex flex-col items-center">
            <div className="relative w-64 h-64 bg-gray-50 dark:bg-gray-900 rounded-lg mb-2 flex items-center justify-center">
              <Image
                src={sprites.front_shiny}
                alt={`${pokemonName} shiny sprite`}
                fill
                className="object-contain p-2"
                style={{ imageRendering: 'pixelated' }}
                sizes="256px"
                unoptimized
              />
            </div>
            <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Shiny
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
