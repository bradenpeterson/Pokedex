import { NamedAPIResourceList } from '../types/api';
import { MoveDetail, MoveListItem } from '../types/moves';

const POKEAPI_BASE_URL = 'https://pokeapi.co/api/v2';

/**
 * Fetch all moves from PokeAPI
 * @returns Promise with list of move items
 */
export async function getAllMoves(): Promise<MoveListItem[]> {
  try {
    const response = await fetch(`${POKEAPI_BASE_URL}/move?limit=1000`, {
      next: { revalidate: 86400 }, // Cache for 24 hours
    });

    if (!response.ok) {
      if (response.status === 404) {
        throw new Error('Moves list not found');
      }
      throw new Error(`Failed to fetch moves list: ${response.statusText}`);
    }

    const data: NamedAPIResourceList = await response.json();
    
    return data.results.map((item) => ({
      name: item.name,
      url: item.url,
    }));
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Error fetching moves list: ${error.message}`);
    }
    throw new Error('Unknown error occurred while fetching moves list');
  }
}

/**
 * Fetch move detail by name
 * @param name - Move name
 * @returns Promise with move detail
 */
export async function getMoveByName(name: string): Promise<MoveDetail> {
  try {
    const response = await fetch(`${POKEAPI_BASE_URL}/move/${encodeURIComponent(name.toLowerCase())}`, {
      next: { revalidate: 3600 }, // Cache for 1 hour
    });

    if (!response.ok) {
      if (response.status === 404) {
        throw new Error(`Move "${name}" not found`);
      }
      throw new Error(`Failed to fetch move: ${response.statusText}`);
    }

    const data: MoveDetail = await response.json();
    return data;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Error fetching move "${name}": ${error.message}`);
    }
    throw new Error(`Unknown error occurred while fetching move "${name}"`);
  }
}
