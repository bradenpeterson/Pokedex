import { PokemonDetail } from '../types/pokemon';
import { LocationArea } from '../types/locations';
import { getLocationAreaByUrl } from '../api/locations';
import { NamedAPIResource } from '../types/api';

/**
 * Extract and deduplicate main location names from Pokemon's location_area data
 * @param pokemon - Pokemon detail object
 * @returns Promise with array of unique main location names
 */
export async function extractMainLocations(
  pokemon: PokemonDetail
): Promise<NamedAPIResource[]> {
  if (!pokemon.location_area_encounters) {
    return [];
  }

  try {
    // Fetch location areas from the encounters URL
    const response = await fetch(pokemon.location_area_encounters, {
      next: { revalidate: 3600 }, // Cache for 1 hour
    });

    if (!response.ok) {
      return [];
    }

    const locationAreas: Array<{ location_area: NamedAPIResource }> = await response.json();

    // Fetch each location area to get the main location
    const locationPromises = locationAreas.map(async ({ location_area }) => {
      try {
        const areaData: LocationArea = await getLocationAreaByUrl(location_area.url);
        return areaData.location;
      } catch (error) {
        // If fetching fails, return null
        return null;
      }
    });

    const locations = await Promise.all(locationPromises);
    
    // Filter out nulls and deduplicate by name
    const uniqueLocationsMap = new Map<string, NamedAPIResource>();
    
    locations.forEach((location) => {
      if (location) {
        uniqueLocationsMap.set(location.name, location);
      }
    });

    return Array.from(uniqueLocationsMap.values());
  } catch (error) {
    // Return empty array on error
    return [];
  }
}
