'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { PokemonListItem } from '@/lib/types/pokemon';
import { PokemonList } from './PokemonList';
import { ErrorDisplay } from './ErrorDisplay';

interface PokemonListWithErrorProps {
  initialPokemon: PokemonListItem[];
  initialError: string | null;
}

export function PokemonListWithError({
  initialPokemon,
  initialError,
}: PokemonListWithErrorProps) {
  const router = useRouter();
  const [isRetrying, setIsRetrying] = useState(false);

  const handleRetry = () => {
    setIsRetrying(true);
    router.refresh();
  };

  if (initialError) {
    return (
      <ErrorDisplay
        error={initialError}
        onRetry={handleRetry}
        title="Failed to load Pokemon"
      />
    );
  }

  if (isRetrying) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-gray-500 dark:text-gray-400">Loading...</div>
      </div>
    );
  }

  return <PokemonList items={initialPokemon} />;
}
