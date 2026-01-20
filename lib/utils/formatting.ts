/**
 * Centralized formatting utilities for Pokemon-related names
 */

/**
 * Formats a name by capitalizing each word separated by hyphens
 * Example: "pikachu-rock-star" -> "Pikachu Rock Star"
 */
export function formatName(name: string): string {
  return name
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

/**
 * Formats a Pokemon name
 * Alias for formatName for semantic clarity
 */
export function formatPokemonName(name: string): string {
  return formatName(name);
}

/**
 * Formats a move name
 * Alias for formatName for semantic clarity
 */
export function formatMoveName(name: string): string {
  return formatName(name);
}

/**
 * Formats a location name
 * Alias for formatName for semantic clarity
 */
export function formatLocationName(name: string): string {
  return formatName(name);
}

/**
 * Formats a type name (single word, capitalizes first letter)
 * Example: "electric" -> "Electric"
 */
export function formatTypeName(name: string): string {
  return name.charAt(0).toUpperCase() + name.slice(1);
}

/**
 * Formats a region name
 * Alias for formatName for semantic clarity
 */
export function formatRegionName(name: string): string {
  return formatName(name);
}

/**
 * Formats an encounter method name
 * Alias for formatName for semantic clarity
 */
export function formatMethodName(methodName: string): string {
  return formatName(methodName);
}
