'use client';

import { PokemonListItem } from '@/lib/types/pokemon';
import { SearchableList } from './SearchableList';
import { PokemonCard } from './PokemonCard';

interface PokemonListProps {
  items: PokemonListItem[];
}

export function PokemonList({ items }: PokemonListProps) {
  return (
    <SearchableList
      items={items}
      renderItem={(pokemon) => <PokemonCard pokemon={pokemon} />}
      getSearchText={(pokemon) => pokemon.name}
      placeholder="Search Pokemon..."
      emptyMessage="No Pokemon found. Try a different search term."
    />
  );
}
