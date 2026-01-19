import { NamedAPIResourceList } from '../types/api';
import { GenerationDetail, GenerationListItem } from '../types/generations';

const POKEAPI_BASE_URL = 'https://pokeapi.co/api/v2';

/**
 * Fetch all generations from PokeAPI
 * @returns Promise with list of generation items
 */
export async function getAllGenerations(): Promise<GenerationListItem[]> {
  try {
    const response = await fetch(`${POKEAPI_BASE_URL}/generation?limit=100`, {
      next: { revalidate: 86400 }, // Cache for 24 hours (generations are very static)
    });

    if (!response.ok) {
      if (response.status === 404) {
        throw new Error('Generations list not found');
      }
      throw new Error(`Failed to fetch generations list: ${response.statusText}`);
    }

    const data: NamedAPIResourceList = await response.json();
    
    return data.results.map((item) => ({
      name: item.name,
      url: item.url,
    }));
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Error fetching generations list: ${error.message}`);
    }
    throw new Error('Unknown error occurred while fetching generations list');
  }
}

/**
 * Fetch generation detail by name
 * @param name - Generation name (e.g., "generation-i", "generation-ii")
 * @returns Promise with generation detail
 */
export async function getGenerationByName(name: string): Promise<GenerationDetail> {
  try {
    const response = await fetch(`${POKEAPI_BASE_URL}/generation/${encodeURIComponent(name.toLowerCase())}`, {
      next: { revalidate: 86400 }, // Cache for 24 hours (generations are very static)
    });

    if (!response.ok) {
      if (response.status === 404) {
        throw new Error(`Generation "${name}" not found`);
      }
      throw new Error(`Failed to fetch generation: ${response.statusText}`);
    }

    const data: GenerationDetail = await response.json();
    return data;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Error fetching generation "${name}": ${error.message}`);
    }
    throw new Error(`Unknown error occurred while fetching generation "${name}"`);
  }
}
