/**
 * Generic search filter utility
 * Filters items based on a search term using case-insensitive matching
 */

/**
 * Filter items by search term
 * @param items - Array of items to filter
 * @param searchTerm - Search term to filter by
 * @param getSearchableText - Function to extract searchable text from each item
 * @returns Filtered array of items
 */
export function filterBySearch<T>(
  items: T[],
  searchTerm: string,
  getSearchableText: (item: T) => string
): T[] {
  if (!searchTerm.trim()) {
    return items;
  }

  const normalizedSearch = searchTerm.toLowerCase().trim();
  
  return items.filter((item) => {
    const searchableText = getSearchableText(item).toLowerCase();
    return searchableText.includes(normalizedSearch);
  });
}
