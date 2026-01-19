import { NamedAPIResourceList } from '../types/api';
import { LocationDetail, LocationListItem, LocationArea } from '../types/locations';

const POKEAPI_BASE_URL = 'https://pokeapi.co/api/v2';

/**
 * Fetch all locations from PokeAPI
 * @returns Promise with list of location items
 */
export async function getAllLocations(): Promise<LocationListItem[]> {
  try {
    const response = await fetch(`${POKEAPI_BASE_URL}/location?limit=1000`, {
      next: { revalidate: 86400 }, // Cache for 24 hours
    });

    if (!response.ok) {
      if (response.status === 404) {
        throw new Error('Locations list not found');
      }
      throw new Error(`Failed to fetch locations list: ${response.statusText}`);
    }

    const data: NamedAPIResourceList = await response.json();
    
    return data.results.map((item) => ({
      name: item.name,
      url: item.url,
    }));
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Error fetching locations list: ${error.message}`);
    }
    throw new Error('Unknown error occurred while fetching locations list');
  }
}

/**
 * Fetch location detail by name
 * @param name - Location name
 * @returns Promise with location detail
 */
export async function getLocationByName(name: string): Promise<LocationDetail> {
  try {
    const response = await fetch(`${POKEAPI_BASE_URL}/location/${encodeURIComponent(name.toLowerCase())}`, {
      next: { revalidate: 3600 }, // Cache for 1 hour
    });

    if (!response.ok) {
      if (response.status === 404) {
        throw new Error(`Location "${name}" not found`);
      }
      throw new Error(`Failed to fetch location: ${response.statusText}`);
    }

    const data: LocationDetail = await response.json();
    return data;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Error fetching location "${name}": ${error.message}`);
    }
    throw new Error(`Unknown error occurred while fetching location "${name}"`);
  }
}

/**
 * Fetch location area with Pokemon encounters by ID
 * @param id - Location area ID
 * @returns Promise with location area data including Pokemon encounters
 */
export async function getLocationArea(id: number): Promise<LocationArea> {
  try {
    const response = await fetch(`${POKEAPI_BASE_URL}/location-area/${id}`, {
      next: { revalidate: 3600 }, // Cache for 1 hour
    });

    if (!response.ok) {
      if (response.status === 404) {
        throw new Error(`Location area with ID "${id}" not found`);
      }
      throw new Error(`Failed to fetch location area: ${response.statusText}`);
    }

    const data: LocationArea = await response.json();
    return data;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Error fetching location area "${id}": ${error.message}`);
    }
    throw new Error(`Unknown error occurred while fetching location area "${id}"`);
  }
}

/**
 * Fetch location area by URL
 * @param url - Full URL to location area resource
 * @returns Promise with location area data
 */
export async function getLocationAreaByUrl(url: string): Promise<LocationArea> {
  try {
    const response = await fetch(url, {
      next: { revalidate: 3600 }, // Cache for 1 hour
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch location area: ${response.statusText}`);
    }

    const data: LocationArea = await response.json();
    return data;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Error fetching location area from URL: ${error.message}`);
    }
    throw new Error('Unknown error occurred while fetching location area');
  }
}
