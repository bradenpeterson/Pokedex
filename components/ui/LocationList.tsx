'use client';

import { LocationListItem } from '@/lib/types/locations';
import { SearchableList } from './SearchableList';
import { LocationCard } from './LocationCard';

interface LocationListProps {
  items: LocationListItem[];
}

export function LocationList({ items }: LocationListProps) {
  return (
    <SearchableList
      items={items}
      renderItem={(location) => <LocationCard location={location} />}
      getSearchText={(location) => location.name}
      getItemKey={(location) => location.name}
      placeholder="Search locations..."
      emptyMessage="No locations found. Try a different search term."
    />
  );
}
