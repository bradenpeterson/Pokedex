'use client';

import { GenerationListItem } from '@/lib/types/generations';
import { SearchableList } from './SearchableList';
import { GenerationCard } from './GenerationCard';

interface GenerationListProps {
  items: GenerationListItem[];
}

export function GenerationList({ items }: GenerationListProps) {
  return (
    <SearchableList
      items={items}
      renderItem={(generation) => <GenerationCard generation={generation} />}
      getSearchText={(generation) => generation.name}
      getItemKey={(generation) => generation.name}
      placeholder="Search generations..."
      emptyMessage="No generations found. Try a different search term."
    />
  );
}
