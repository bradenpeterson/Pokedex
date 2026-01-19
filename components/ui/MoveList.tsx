'use client';

import { MoveListItem } from '@/lib/types/moves';
import { SearchableList } from './SearchableList';
import { MoveCard } from './MoveCard';

interface MoveListProps {
  items: MoveListItem[];
}

export function MoveList({ items }: MoveListProps) {
  return (
    <SearchableList
      items={items}
      renderItem={(move) => <MoveCard move={move} />}
      getSearchText={(move) => move.name}
      placeholder="Search moves..."
      emptyMessage="No moves found. Try a different search term."
    />
  );
}
