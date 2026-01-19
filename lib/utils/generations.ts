/**
 * Format generation name from API format to display format
 * @param name - Generation name from API (e.g., "generation-i", "generation-ii")
 * @returns Formatted generation name (e.g., "Generation I", "Generation II")
 */
export function formatGenerationName(name: string): string {
  const romanNumerals: Record<string, string> = {
    'i': 'I',
    'ii': 'II',
    'iii': 'III',
    'iv': 'IV',
    'v': 'V',
    'vi': 'VI',
    'vii': 'VII',
    'viii': 'VIII',
    'ix': 'IX',
  };

  const match = name.match(/generation-([ivx]+)/i);
  if (match) {
    const roman = match[1].toLowerCase();
    if (romanNumerals[roman]) {
      return `Generation ${romanNumerals[roman]}`;
    }
  }

  // Fallback: capitalize and format
  return name
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}
