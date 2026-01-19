import { NamedAPIResource } from './api';

/**
 * Location-related types for PokeAPI v2
 */

/**
 * Location list item (simplified for list views)
 */
export interface LocationListItem {
  name: string;
  url: string;
}

/**
 * Location detail response from PokeAPI
 */
export interface LocationDetail {
  id: number;
  name: string;
  region: NamedAPIResource | null;
  names: Array<{
    name: string;
    language: NamedAPIResource;
  }>;
  game_indices: Array<{
    game_index: number;
    generation: NamedAPIResource;
  }>;
  areas: NamedAPIResource[]; // Location areas (sub-areas)
}

/**
 * Location area (sub-area of a location)
 */
export interface LocationArea {
  id: number;
  name: string;
  game_index: number;
  encounter_method_rates: Array<{
    encounter_method: NamedAPIResource;
    version_details: Array<{
      rate: number;
      version: NamedAPIResource;
    }>;
  }>;
  location: NamedAPIResource; // Reference to parent location
  names: Array<{
    name: string;
    language: NamedAPIResource;
  }>;
  pokemon_encounters: PokemonEncounter[];
}

/**
 * Pokemon encounter in a location area
 */
export interface PokemonEncounter {
  pokemon: NamedAPIResource;
  version_details: Array<{
    version: NamedAPIResource;
    max_chance: number;
    encounter_details: Array<{
      min_level: number;
      max_level: number;
      condition_values: NamedAPIResource[];
      chance: number;
      method: NamedAPIResource;
    }>;
  }>;
}

/**
 * Encounter method grouping for display
 */
export interface GroupedEncounters {
  method: NamedAPIResource;
  pokemon: Array<{
    pokemon: NamedAPIResource;
    min_level: number;
    max_level: number;
    chance: number;
  }>;
}
