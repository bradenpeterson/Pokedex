'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { LocationListItem } from '@/lib/types/locations';
import { LocationList } from './LocationList';
import { ErrorDisplay } from './ErrorDisplay';

interface LocationListWithErrorProps {
  initialLocations: LocationListItem[];
  initialError: string | null;
}

export function LocationListWithError({
  initialLocations,
  initialError,
}: LocationListWithErrorProps) {
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
        title="Failed to load locations"
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

  return <LocationList items={initialLocations} />;
}
