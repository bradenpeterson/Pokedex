import { NamedAPIResource, APIResource } from './api';

/**
 * Move-related types for PokeAPI v2
 */

/**
 * Move list item (simplified for list views)
 */
export interface MoveListItem {
  name: string;
  url: string;
}

/**
 * Move detail response from PokeAPI
 */
export interface MoveDetail {
  id: number;
  name: string;
  accuracy: number | null;
  effect_chance: number | null;
  pp: number | null;
  priority: number;
  power: number | null;
  contest_combos: {
    normal: {
      use_before: NamedAPIResource[] | null;
      use_after: NamedAPIResource[] | null;
    } | null;
    super: {
      use_before: NamedAPIResource[] | null;
      use_after: NamedAPIResource[] | null;
    } | null;
  } | null;
  contest_type: NamedAPIResource | null;
  contest_effect: APIResource | null;
  damage_class: NamedAPIResource;
  effect_entries: Array<{
    effect: string;
    short_effect: string;
    language: NamedAPIResource;
  }>;
  effect_changes: Array<{
    version_group: NamedAPIResource;
    effect_entries: Array<{
      effect: string;
      language: NamedAPIResource;
    }>;
  }>;
  flavor_text_entries: FlavorTextEntry[];
  generation: NamedAPIResource;
  machines: Array<{
    machine: APIResource;
    version_group: NamedAPIResource;
  }>;
  meta: {
    ailment: NamedAPIResource;
    ailment_chance: number;
    category: NamedAPIResource;
    crit_rate: number;
    drain: number;
    flinch_chance: number;
    healing: number;
    max_hits: number | null;
    max_turns: number | null;
    min_hits: number | null;
    min_turns: number | null;
    stat_chance: number;
  } | null;
  names: Array<{
    name: string;
    language: NamedAPIResource;
  }>;
  past_values: Array<{
    accuracy: number | null;
    effect_chance: number | null;
    effect_entries: Array<{
      effect: string;
      language: NamedAPIResource;
    }>;
    power: number | null;
    pp: number | null;
    type: NamedAPIResource | null;
    version_group: NamedAPIResource;
  }>;
  stat_changes: Array<{
    change: number;
    stat: NamedAPIResource;
  }>;
  super_contest_effect: APIResource | null;
  target: NamedAPIResource;
  type: NamedAPIResource;
  learned_by_pokemon?: NamedAPIResource[]; // Optional - may not be in all responses
}

/**
 * Flavor text entry for a move
 */
export interface FlavorTextEntry {
  flavor_text: string;
  language: NamedAPIResource;
  version_group: NamedAPIResource;
}

/**
 * Grouped flavor text by version group
 */
export interface GroupedFlavorText {
  version_group: NamedAPIResource;
  flavor_text: string;
  language: NamedAPIResource;
}
