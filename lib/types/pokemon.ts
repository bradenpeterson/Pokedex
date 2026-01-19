import { NamedAPIResource } from './api';

/**
 * Pokemon-related types for PokeAPI v2
 */

export interface PokemonStat {
  base_stat: number;
  effort: number;
  stat: NamedAPIResource;
}

export interface PokemonType {
  slot: number;
  type: NamedAPIResource;
}

export interface PokemonSprite {
  front_default: string | null;
  front_shiny: string | null;
  front_female: string | null;
  front_shiny_female: string | null;
  back_default: string | null;
  back_shiny: string | null;
  back_female: string | null;
  back_shiny_female: string | null;
}

export interface PokemonMoveVersion {
  level_learned_at: number;
  move_learn_method: NamedAPIResource;
  version_group: NamedAPIResource;
}

export interface PokemonMove {
  move: NamedAPIResource;
  version_group_details: PokemonMoveVersion[];
}

export interface PokemonLocationArea {
  location_area: NamedAPIResource;
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
 * Pokemon list item (simplified for list views)
 */
export interface PokemonListItem {
  name: string;
  url: string;
  id?: number;
}

/**
 * Full Pokemon detail response from PokeAPI
 */
export interface PokemonDetail {
  id: number;
  name: string;
  base_experience: number;
  height: number;
  weight: number;
  is_default: boolean;
  order: number;
  abilities: Array<{
    ability: NamedAPIResource;
    is_hidden: boolean;
    slot: number;
  }>;
  forms: NamedAPIResource[];
  game_indices: Array<{
    game_index: number;
    version: NamedAPIResource;
  }>;
  held_items: Array<{
    item: NamedAPIResource;
    version_details: Array<{
      version: NamedAPIResource;
      rarity: number;
    }>;
  }>;
  location_area_encounters: string; // URL to fetch location areas
  moves: PokemonMove[];
  species: NamedAPIResource;
  sprites: PokemonSprite;
  stats: PokemonStat[];
  types: PokemonType[];
}

/**
 * Simplified Pokemon stats for display
 */
export interface PokemonStats {
  hp: number;
  attack: number;
  defense: number;
  specialAttack: number;
  specialDefense: number;
  speed: number;
}
