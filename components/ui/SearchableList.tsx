'use client';

import { useState, useMemo, useEffect, useRef } from 'react';
import { useVirtualizer } from '@tanstack/react-virtual';
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

  // Virtual scrolling setup for large lists (500+ items)
  const parentRef = useRef<HTMLDivElement>(null);
  const useVirtualScrolling = filteredItems.length >= 500;

  const virtualizer = useVirtualizer({
    count: filteredItems.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 150, // Estimated item height in pixels
    overscan: 10, // Render 10 extra items outside viewport
    enabled: useVirtualScrolling,
  });

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
        <div className="mb-4">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder={placeholder}
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            aria-label="Search input"
          />
        </div>
        <div className="text-center py-12 text-gray-500 dark:text-gray-400">
          {emptyMessage}
        </div>
      </div>
    );
  }

  // Render with virtual scrolling for large lists
  if (useVirtualScrolling) {
    return (
      <div className={className}>
        <div className="mb-4">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder={placeholder}
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            aria-label="Search input"
          />
          <div className="mt-2 text-sm text-gray-500 dark:text-gray-400">
            Showing {filteredItems.length} result{filteredItems.length !== 1 ? 's' : ''}
          </div>
        </div>
        <div
          ref={parentRef}
          className="overflow-auto"
          style={{ height: '600px' }} // Fixed height container for virtual scrolling
        >
          <div
            style={{
              height: `${virtualizer.getTotalSize()}px`,
              width: '100%',
              position: 'relative',
            }}
          >
            {virtualizer.getVirtualItems().map((virtualItem) => (
              <div
                key={virtualItem.key}
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: `${virtualItem.size}px`,
                  transform: `translateY(${virtualItem.start}px)`,
                }}
              >
                <div className="p-2">
                  {renderItem(filteredItems[virtualItem.index])}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Render regular grid for smaller lists
  return (
    <div className={className}>
      <div className="mb-4">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder={placeholder}
          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
          grid gap-4
          grid-cols-1
          sm:grid-cols-2
          lg:grid-cols-3
          xl:grid-cols-4
          ${gridClassName}
        `}
      >
        {filteredItems.map((item, index) => (
          <div key={index}>{renderItem(item)}</div>
        ))}
      </div>
    </div>
  );
}
