'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { MoveListItem } from '@/lib/types/moves';
import { MoveList } from './MoveList';
import { ErrorDisplay } from './ErrorDisplay';

interface MoveListWithErrorProps {
  initialMoves: MoveListItem[];
  initialError: string | null;
}

export function MoveListWithError({
  initialMoves,
  initialError,
}: MoveListWithErrorProps) {
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
        title="Failed to load moves"
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

  return <MoveList items={initialMoves} />;
}
