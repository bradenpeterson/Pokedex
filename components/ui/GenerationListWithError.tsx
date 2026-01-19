'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { GenerationListItem } from '@/lib/types/generations';
import { GenerationList } from './GenerationList';
import { ErrorDisplay } from './ErrorDisplay';

interface GenerationListWithErrorProps {
  initialGenerations: GenerationListItem[];
  initialError: string | null;
}

export function GenerationListWithError({
  initialGenerations,
  initialError,
}: GenerationListWithErrorProps) {
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
        title="Failed to load generations"
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

  return <GenerationList items={initialGenerations} />;
}
