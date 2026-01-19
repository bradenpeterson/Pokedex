import { NamedAPIResourceList } from '../types/api';
import { PokemonDetail, PokemonListItem } from '../types/pokemon';

const POKEAPI_BASE_URL = 'https://pokeapi.co/api/v2';

/**
 * Fetch all Pokemon from PokeAPI (handles pagination)
 * @returns Promise with list of all Pokemon items
 */
export async function getAllPokemon(): Promise<PokemonListItem[]> {
  try {
    // First, fetch the initial page to get the total count
    const firstResponse = await fetch(`${POKEAPI_BASE_URL}/pokemon?limit=1`, {
      next: { revalidate: 86400 }, // Cache for 24 hours
    });

    if (!firstResponse.ok) {
      if (firstResponse.status === 404) {
        throw new Error('Pokemon list not found');
      }
      throw new Error(`Failed to fetch Pokemon list: ${firstResponse.statusText}`);
    }

    const firstData: NamedAPIResourceList = await firstResponse.json();
    const totalCount = firstData.count;

    // Now fetch all Pokemon using the total count as the limit
    const response = await fetch(`${POKEAPI_BASE_URL}/pokemon?limit=${totalCount}`, {
      next: { revalidate: 86400 }, // Cache for 24 hours
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch all Pokemon: ${response.statusText}`);
    }

    const data: NamedAPIResourceList = await response.json();
    
    // Transform to PokemonListItem with ID extraction
    return data.results.map((item) => {
      const idMatch = item.url.match(/\/pokemon\/(\d+)\//);
      return {
        name: item.name,
        url: item.url,
        id: idMatch ? parseInt(idMatch[1], 10) : undefined,
      };
    });
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Error fetching Pokemon list: ${error.message}`);
    }
    throw new Error('Unknown error occurred while fetching Pokemon list');
  }
}

/**
 * Fetch Pokemon detail by name
 * @param name - Pokemon name (can be ID or name string)
 * @returns Promise with Pokemon detail
 */
export async function getPokemonByName(name: string): Promise<PokemonDetail> {
  try {
    const response = await fetch(`${POKEAPI_BASE_URL}/pokemon/${encodeURIComponent(name.toLowerCase())}`, {
      next: { revalidate: 3600 }, // Cache for 1 hour
    });

    if (!response.ok) {
      if (response.status === 404) {
        throw new Error(`Pokemon "${name}" not found`);
      }
      throw new Error(`Failed to fetch Pokemon: ${response.statusText}`);
    }

    const data: PokemonDetail = await response.json();
    return data;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Error fetching Pokemon "${name}": ${error.message}`);
    }
    throw new Error(`Unknown error occurred while fetching Pokemon "${name}"`);
  }
}

/**
 * Fetch Pokemon species data by name
 * @param name - Pokemon species name
 * @returns Promise with Pokemon species data
 */
export async function getPokemonSpecies(name: string): Promise<Record<string, unknown>> {
  try {
    const response = await fetch(`${POKEAPI_BASE_URL}/pokemon-species/${encodeURIComponent(name.toLowerCase())}`, {
      next: { revalidate: 3600 }, // Cache for 1 hour
    });

    if (!response.ok) {
      if (response.status === 404) {
        throw new Error(`Pokemon species "${name}" not found`);
      }
      throw new Error(`Failed to fetch Pokemon species: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Error fetching Pokemon species "${name}": ${error.message}`);
    }
    throw new Error(`Unknown error occurred while fetching Pokemon species "${name}"`);
  }
}
