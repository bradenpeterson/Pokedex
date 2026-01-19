import { NamedAPIResource } from './api';

/**
 * Generation-related types for PokeAPI v2
 */

/**
 * Generation list item (simplified for list views)
 */
export interface GenerationListItem {
  name: string;
  url: string;
}

/**
 * Generation detail response from PokeAPI
 */
export interface GenerationDetail {
  id: number;
  name: string;
  abilities: NamedAPIResource[];
  main_region: NamedAPIResource;
  moves: NamedAPIResource[];
  names: Array<{
    name: string;
    language: NamedAPIResource;
  }>;
  pokemon_species: NamedAPIResource[]; // List of Pokemon species in this generation
  types: NamedAPIResource[];
  version_groups: NamedAPIResource[];
}
