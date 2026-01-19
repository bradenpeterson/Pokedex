import { PokemonEncounter, GroupedEncounters } from '../types/locations';

/**
 * Group Pokemon encounters by encounter method
 * @param encounters - Array of Pokemon encounters from a location area
 * @returns Array of grouped encounters organized by method
 */
export function groupEncountersByMethod(
  encounters: PokemonEncounter[]
): GroupedEncounters[] {
  const methodMap = new Map<string, GroupedEncounters>();

  encounters.forEach((encounter) => {
    encounter.version_details.forEach((versionDetail) => {
      versionDetail.encounter_details.forEach((detail) => {
        const methodName = detail.method.name;
        
        if (!methodMap.has(methodName)) {
          methodMap.set(methodName, {
            method: detail.method,
            pokemon: [],
          });
        }

        const group = methodMap.get(methodName)!;
        
        // Check if this Pokemon is already in this method group
        const existingPokemon = group.pokemon.find(
          (p) => p.pokemon.name === encounter.pokemon.name
        );

        if (!existingPokemon) {
          // Add new Pokemon to this method group
          // Use the first encounter detail's level range and chance
          group.pokemon.push({
            pokemon: encounter.pokemon,
            min_level: detail.min_level,
            max_level: detail.max_level,
            chance: detail.chance,
          });
        } else {
          // Update level range if this encounter has different levels
          if (detail.min_level < existingPokemon.min_level) {
            existingPokemon.min_level = detail.min_level;
          }
          if (detail.max_level > existingPokemon.max_level) {
            existingPokemon.max_level = detail.max_level;
          }
          // Update chance if higher (more likely)
          if (detail.chance > existingPokemon.chance) {
            existingPokemon.chance = detail.chance;
          }
        }
      });
    });
  });

  return Array.from(methodMap.values());
}
