import { FlavorTextEntry, GroupedFlavorText } from '../types/moves';

/**
 * Group flavor text entries by version group
 * Returns one entry per version group (typically the most recent or first English entry)
 * @param entries - Array of flavor text entries
 * @returns Array of grouped flavor text entries
 */
export function groupFlavorTextByVersion(
  entries: FlavorTextEntry[]
): GroupedFlavorText[] {
  // Filter for English entries only (or you can modify to support other languages)
  const englishEntries = entries.filter(
    (entry) => entry.language.name === 'en'
  );

  // Group by version group name
  const versionGroupMap = new Map<string, FlavorTextEntry>();

  englishEntries.forEach((entry) => {
    const versionGroupName = entry.version_group.name;
    
    // If we haven't seen this version group, add it
    // If we have, keep the first one (or you could prioritize by version order)
    if (!versionGroupMap.has(versionGroupName)) {
      versionGroupMap.set(versionGroupName, entry);
    }
  });

  // Convert map to array and transform to GroupedFlavorText
  return Array.from(versionGroupMap.values()).map((entry) => ({
    version_group: entry.version_group,
    flavor_text: entry.flavor_text,
    language: entry.language,
  }));
}

/**
 * Format version group name for display
 * @param versionGroupName - Version group name from API (e.g., "red-blue", "sword-shield")
 * @returns Formatted version name (e.g., "Red/Blue", "Sword/Shield")
 */
export function formatVersionGroupName(versionGroupName: string): string {
  return versionGroupName
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join('/');
}
