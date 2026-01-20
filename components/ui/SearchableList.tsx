'use client';

import { useState, useMemo, useEffect } from 'react';
import { filterBySearch } from '@/lib/utils/search';

interface SearchableListProps<T> {
  items: T[];
  renderItem: (item: T) => React.ReactNode;
  getSearchText: (item: T) => string;
  placeholder?: string;
  className?: string;
  gridClassName?: string;
  emptyMessage?: string;
  loading?: boolean;
}

export function SearchableList<T>({
  items,
  renderItem,
  getSearchText,
  placeholder = 'Search...',
  className = '',
  gridClassName = '',
  emptyMessage = 'No results found',
  loading = false,
}: SearchableListProps<T>) {
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('');

  // Debounce search input (300ms delay)
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 300);

    return () => clearTimeout(timer);
  }, [searchTerm]);

  // Memoize filtered results
  const filteredItems = useMemo(() => {
    if (!debouncedSearchTerm.trim()) {
      return items;
    }
    return filterBySearch(items, debouncedSearchTerm, getSearchText);
  }, [items, debouncedSearchTerm, getSearchText]);

  // Render loading state
  if (loading) {
    return (
      <div className={`flex items-center justify-center py-12 ${className}`}>
        <div className="text-gray-500 dark:text-gray-400">Loading...</div>
      </div>
    );
  }

  // Render empty state
  if (filteredItems.length === 0) {
    return (
      <div className={className}>
        <div className="mb-8">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder={placeholder}
            className="w-full px-4 py-2 border-2 border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors"
            aria-label="Search input"
          />
        </div>
        <div className="text-center py-12 text-gray-500 dark:text-gray-400">
          {emptyMessage}
        </div>
      </div>
    );
  }

  // Render grid layout (removed virtual scrolling for natural page scrolling)
  return (
    <div className={className}>
      <div className="mb-8">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder={placeholder}
          className="w-full px-4 py-2 border-2 border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors"
          aria-label="Search input"
        />
        {filteredItems.length !== items.length && (
          <div className="mt-2 text-sm text-gray-500 dark:text-gray-400">
            Showing {filteredItems.length} of {items.length} result
            {filteredItems.length !== 1 ? 's' : ''}
          </div>
        )}
      </div>
      <div
        className={`
          grid gap-6
          grid-cols-1
          sm:grid-cols-2
          md:grid-cols-3
          lg:grid-cols-4
          ${gridClassName}
        `}
      >
        {filteredItems.map((item, index) => (
          <div key={index} className="w-full h-full min-w-0">{renderItem(item)}</div>
        ))}
      </div>
    </div>
  );
}
