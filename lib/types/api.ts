/**
 * Base API response types for PokeAPI v2
 */

export interface NamedAPIResource {
  name: string;
  url: string;
}

export interface APIResource {
  url: string;
}

export interface NamedAPIResourceList {
  count: number;
  next: string | null;
  previous: string | null;
  results: NamedAPIResource[];
}

export interface PaginatedResponse<T> {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
}
