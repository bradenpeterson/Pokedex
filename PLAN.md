# Pokedex Application - Step-by-Step Implementation Plan

## Overview

Build a comprehensive Pokedex application using Next.js 16 App Router and PokeAPI v2. The application will feature searchable lists, detailed views, and tab navigation across Pokemon, Locations, Moves, and Generations pages.

## Implementation Steps

### Phase 1: Project Foundation & Type Definitions

#### Step 1.1: Create Directory Structure
- [x] Create `components/` directory with subdirectories: `ui/`, `pokemon/`, `locations/`, `moves/`, `generations/`
- [x] Create `lib/` directory with subdirectories: `api/`, `types/`, `utils/`

#### Step 1.2: Define TypeScript Types for PokeAPI Responses
- [x] Create `lib/types/api.ts` with base API response types
- [x] Create `lib/types/pokemon.ts` with Pokemon-related types:
  - Pokemon list item type
  - Pokemon detail type (includes stats, sprites, moves, location_areas)
  - Pokemon stats type
  - Pokemon sprite type
- [x] Create `lib/types/locations.ts` with Location-related types:
  - Location list item type
  - Location detail type (includes region, areas)
  - Location area type (includes Pokemon encounters)
- [x] Create `lib/types/moves.ts` with Move-related types:
  - Move list item type
  - Move detail type (includes accuracy, PP, power, flavor_text_entries, learned_by_pokemon)
- [x] Create `lib/types/generations.ts` with Generation-related types:
  - Generation list item type
  - Generation detail type (includes main_region, pokemon_species)

### Phase 2: PokeAPI Integration Layer

#### Step 2.1: Create API Utility Functions
- [x] Create `lib/api/pokemon.ts`:
  - `getAllPokemon()` - Fetch all Pokemon (limit=1300)
  - `getPokemonByName(name: string)` - Fetch Pokemon detail by name
  - `getPokemonSpecies(name: string)` - Fetch Pokemon species data
  - Include proper error handling and TypeScript types
  - Use Next.js fetch with appropriate caching (revalidate: 86400 for static data)

- [x] Create `lib/api/locations.ts`:
  - `getAllLocations()` - Fetch all locations
  - `getLocationByName(name: string)` - Fetch location detail by name
  - `getLocationArea(id: number)` - Fetch location area with Pokemon encounters
  - Include proper error handling and TypeScript types

- [x] Create `lib/api/moves.ts`:
  - `getAllMoves()` - Fetch all moves
  - `getMoveByName(name: string)` - Fetch move detail by name
  - Include proper error handling and TypeScript types

- [x] Create `lib/api/generations.ts`:
  - `getAllGenerations()` - Fetch all generations
  - `getGenerationByName(name: string)` - Fetch generation detail by name
  - Include proper error handling and TypeScript types

#### Step 2.2: Create Helper Utilities
- [x] Create `lib/utils/search.ts`:
  - `filterBySearch<T>(items: T[], searchTerm: string, getSearchableText: (item: T) => string)` - Generic search filter function
  - Use case-insensitive matching

- [x] Create `lib/utils/pokemon.ts`:
  - `extractMainLocations(pokemon: Pokemon)` - Extract and deduplicate main location names from Pokemon's location_area data
  - Function should: fetch location areas from Pokemon's location_area_encounters URLs, extract main location from each location_area.location.url, deduplicate by location name, return unique location names/IDs

- [x] Create `lib/utils/generations.ts`:
  - `formatGenerationName(name: string): string` - Format generation name from API format (e.g., "generation-i") to display format (e.g., "Generation I")
  - Use Roman numeral mapping: i → I, ii → II, iii → III, iv → IV, v → V, vi → VI, vii → VII, viii → VIII, ix → IX

- [x] Create `lib/utils/encounters.ts`:
  - `groupEncountersByMethod(encounters: Encounter[])` - Group Pokemon encounters by encounter method (walking, surfing, fishing, etc.)
  - Return organized structure for display

- [x] Create `lib/utils/flavor-text.ts`:
  - `groupFlavorTextByVersion(entries: FlavorTextEntry[])` - Group flavor text entries by version group (e.g., "red-blue", "yellow", "sword-shield")
  - Return one entry per version group for display

### Phase 3: Core UI Components

#### Step 3.1: Tab Navigation Component
- [x] Create `components/ui/TabNavigation.tsx`:
  - Client Component with `"use client"` directive
  - Use `usePathname()` from `next/navigation` to detect active route
  - Four tabs: Pokemon, Locations, Moves, Generations
  - Links to `/pokemon`, `/locations`, `/moves`, `/generations`
  - Active tab styling (highlight current route)
  - Mobile-responsive: horizontal scroll on small screens
  - Accessible: proper ARIA labels and keyboard navigation

#### Step 3.2: Back Button Component
- [x] Create `components/ui/BackButton.tsx`:
  - Client Component with `"use client"` directive
  - Smart back button that tries `router.back()` first
  - If no browser history available, navigate to parent route:
    - `/pokemon/[name]` → `/pokemon`
    - `/locations/[name]` → `/locations`
    - `/moves/[name]` → `/moves`
    - `/generations/[name]` → `/generations`
  - Accept optional `fallbackPath?: string` prop for custom fallback
  - Styled button with back arrow icon
  - Accessible with ARIA label
  - Mobile-friendly touch target (44x44px minimum)

#### Step 3.3: Searchable List Component
- [x] Create `components/ui/SearchableList.tsx`:
  - Client Component with `"use client"` directive
  - Generic component accepting:
    - `items: T[]` - Array of items to display
    - `renderItem: (item: T) => React.ReactNode` - Render function for each item
    - `getSearchText: (item: T) => string` - Function to extract searchable text
    - `placeholder?: string` - Search input placeholder
  - Search input with debouncing (300ms delay)
  - Use `useMemo` to memoize filtered results for performance
  - Implement virtual scrolling for lists with 500+ items (using library like `react-window` or `@tanstack/react-virtual`)
  - Responsive grid/list layout:
    - Mobile: single column stack
    - Tablet: 2 columns
    - Desktop: 3-4 columns
  - Empty state when no results found
  - Loading state support

### Phase 4: List Item Card Components

#### Step 4.1: Pokemon Card Component
- [x] Create `components/ui/PokemonCard.tsx`:
  - Display Pokemon name and sprite
  - Link to `/pokemon/[name]`
  - Responsive card design

#### Step 4.2: Location Card Component
- [x] Create `components/ui/LocationCard.tsx`:
  - Display location name
  - Link to `/locations/[name]`
  - Responsive card design

#### Step 4.3: Move Card Component
- [x] Create `components/ui/MoveCard.tsx`:
  - Display move name and type (if available)
  - Link to `/moves/[name]`
  - Responsive card design

#### Step 4.4: Generation Card Component
- [x] Create `components/ui/GenerationCard.tsx`:
  - Display generation name formatted using `formatGenerationName()` utility
  - Format: "Generation I", "Generation II", "Generation III", etc. (with Roman numerals)
  - Link to `/generations/[name]`
  - Responsive card design

### Phase 5: Detail Page Components

#### Step 5.1: Pokemon Detail Components
- [x] Create `components/pokemon/PokemonSprites.tsx`:
  - Display normal and shiny sprites side by side
  - Use Next.js Image component for optimization
  - Label each sprite type

- [x] Create `components/pokemon/PokemonStats.tsx`:
  - Display all 6 base stats (HP, Attack, Defense, Sp. Atk, Sp. Def, Speed)
  - Visual stat bars or list format
  - Accessible stat names

- [x] Create `components/pokemon/PokemonMoves.tsx`:
  - Display Pokemon moves organized by category:
    - Level-up moves (show level learned)
    - TM/HM moves
    - Egg moves
    - Tutor moves (if applicable)
  - Each move category should have a heading
  - Each move should be clickable and link to `/moves/[name]`
  - Show move learning method/level where applicable

- [x] Create `components/pokemon/PokemonLocations.tsx`:
  - Display main locations where Pokemon can be found (not sub-areas)
  - Use `extractMainLocations()` utility to get deduplicated main location names
  - Each location should be clickable and link to `/locations/[name]`
  - Handle case where Pokemon has no locations

- [x] Create `components/pokemon/PokemonDetail.tsx`:
  - Main component orchestrating Pokemon detail display
  - Integrate PokemonSprites, PokemonStats, PokemonMoves, and PokemonLocations
  - Handle loading and error states
  - Fetch Pokemon data, location areas (for main location extraction), and move details

#### Step 5.2: Location Detail Components
- [x] Create `components/locations/SubAreaList.tsx`:
  - Display list of sub-areas for a location
  - For each sub-area, display Pokemon that can be found there
  - Group Pokemon encounters by encounter method using `groupEncountersByMethod()` utility:
    - Walking/overworld encounters
    - Surfing encounters
    - Fishing encounters
    - Other methods (show method name)
  - Each Pokemon should be clickable and link to detail pages
  - Show encounter method labels/sections for clarity
  - Handle empty states (no Pokemon found)

- [x] Create `components/locations/LocationDetail.tsx`:
  - Display location name and region
  - Integrate SubAreaList component
  - Handle loading and error states

#### Step 5.3: Move Detail Components
- [x] Create `components/moves/PokemonLearners.tsx`:
  - Display list of Pokemon that can learn the move
  - Clickable Pokemon links to detail pages
  - Responsive grid layout

- [x] Create `components/moves/MoveFlavorText.tsx`:
  - Display flavor text entries using `groupFlavorTextByVersion()` utility
  - Show one entry per version group (e.g., one for "red-blue", one for "yellow", one for "sword-shield")
  - Format version group names nicely (e.g., "Red/Blue", "Yellow", "Sword/Shield")
  - Display in a readable list or card format
  - Handle cases where move has no flavor text

- [x] Create `components/moves/MoveDetail.tsx`:
  - Display move name, accuracy, PP, power
  - Integrate MoveFlavorText and PokemonLearners components
  - For PokemonLearners: Only display if `learned_by_pokemon` data is available in the API response (skip section if missing)
  - Handle loading and error states

#### Step 5.4: Generation Detail Component
- [x] Create `components/generations/GenerationDetail.tsx`:
  - Display generation name and primary region
  - Display list of Pokemon in that generation
  - Clickable Pokemon links to detail pages
  - Responsive grid layout
  - Handle loading and error states

### Phase 6: Page Routes - List Pages

#### Step 6.1: Root Layout Update
- [x] Update `app/layout.tsx`:
  - Import TabNavigation component
  - Add TabNavigation to layout (above children)
  - Update metadata (title, description for Pokedex)

#### Step 6.2: Home Page
- [x] Update `app/page.tsx`:
  - Server Component
  - Use `redirect('/pokemon')` from `next/navigation`
  - This handles automatic Pokemon tab selection on app load

#### Step 6.3: Pokemon List Page
- [x] Create `app/pokemon/page.tsx`:
  - Server Component
  - Fetch all Pokemon using `getAllPokemon()` from API utilities
  - Pass Pokemon data to SearchableList component
  - Use PokemonCard for rendering each item
  - Handle loading and error states
  - Set appropriate metadata

#### Step 6.4: Locations List Page
- [x] Create `app/locations/page.tsx`:
  - Server Component
  - Fetch all locations using `getAllLocations()` from API utilities
  - Pass location data to SearchableList component
  - Use LocationCard for rendering each item
  - Handle loading and error states
  - Set appropriate metadata

#### Step 6.5: Moves List Page
- [x] Create `app/moves/page.tsx`:
  - Server Component
  - Fetch all moves using `getAllMoves()` from API utilities
  - Pass move data to SearchableList component
  - Use MoveCard for rendering each item
  - Handle loading and error states
  - Set appropriate metadata

#### Step 6.6: Generations List Page
- [x] Create `app/generations/page.tsx`:
  - Server Component
  - Fetch all generations using `getAllGenerations()` from API utilities
  - Pass generation data to SearchableList component
  - Use GenerationCard for rendering each item
  - Handle loading and error states
  - Set appropriate metadata

### Phase 7: Page Routes - Detail Pages

#### Step 7.1: Pokemon Detail Page
- [ ] Create `app/pokemon/[name]/page.tsx`:
  - Server Component
  - Extract `name` from route params (decode URL if needed for special characters)
  - Fetch Pokemon detail using `getPokemonByName(name)`
  - Fetch location areas from Pokemon's location_area_encounters URLs (for main location extraction)
  - Use PokemonDetail component (which handles location extraction via utility)
  - Move details are included in Pokemon response, no additional fetching needed
  - Add BackButton component at top with fallback to `/pokemon`
  - Handle not found errors using `notFound()` from `next/navigation` (triggers not-found.tsx)
  - Set appropriate metadata with Pokemon name
- [ ] Create `app/pokemon/[name]/not-found.tsx`:
  - Custom 404 page for Pokemon not found
  - Show friendly error message
  - Include link back to Pokemon list

#### Step 7.2: Location Detail Page
- [ ] Create `app/locations/[name]/page.tsx`:
  - Server Component
  - Extract `name` from route params (decode URL if needed)
  - Fetch location detail using `getLocationByName(name)`
  - Fetch location areas for each area in the location (parallel fetching)
  - For each location area, Pokemon encounters are included in the location area response
  - Use LocationDetail component (which handles encounter grouping)
  - Add BackButton component at top with fallback to `/locations`
  - Handle not found errors using `notFound()` from `next/navigation`
  - Set appropriate metadata with location name
- [ ] Create `app/locations/[name]/not-found.tsx`:
  - Custom 404 page for location not found
  - Show friendly error message
  - Include link back to locations list

#### Step 7.3: Move Detail Page
- [ ] Create `app/moves/[name]/page.tsx`:
  - Server Component
  - Extract `name` from route params (decode URL if needed)
  - Fetch move detail using `getMoveByName(name)`
  - Use MoveDetail component (which handles flavor text grouping and Pokemon learners display)
  - Add BackButton component at top with fallback to `/moves`
  - Handle not found errors using `notFound()` from `next/navigation`
  - Set appropriate metadata with move name
- [ ] Create `app/moves/[name]/not-found.tsx`:
  - Custom 404 page for move not found
  - Show friendly error message
  - Include link back to moves list

#### Step 7.4: Generation Detail Page
- [ ] Create `app/generations/[name]/page.tsx`:
  - Server Component
  - Extract `name` from route params (decode URL if needed)
  - Fetch generation detail using `getGenerationByName(name)`
  - Use GenerationDetail component (which formats generation name using utility)
  - Add BackButton component at top with fallback to `/generations`
  - Handle not found errors using `notFound()` from `next/navigation`
  - Set appropriate metadata with formatted generation name
- [ ] Create `app/generations/[name]/not-found.tsx`:
  - Custom 404 page for generation not found
  - Show friendly error message
  - Include link back to generations list

### Phase 8: Styling & Responsive Design

#### Step 8.1: Global Styling Updates
- [ ] Update `app/globals.css`:
  - Ensure Tailwind is properly configured
  - Add any necessary custom utility classes
  - Verify dark mode support works correctly

#### Step 8.2: Component Styling
- [ ] Style all components with Tailwind CSS:
  - Mobile-first responsive design
  - Consistent spacing and typography
  - Proper color contrast for accessibility
  - Hover and focus states for interactive elements
  - Loading and error state styling

#### Step 8.3: Mobile Responsiveness Testing
- [ ] Test all pages at mobile breakpoint (320px width):
  - Verify tabs scroll horizontally if needed
  - Verify cards stack in single column
  - Verify touch targets are adequate (44x44px minimum)
  - Verify text is readable and not cut off
  - Test search functionality on mobile

- [ ] Test all pages at tablet breakpoint (768px width):
  - Verify 2-column layouts work correctly
  - Verify spacing and alignment

- [ ] Test all pages at desktop breakpoint (1024px+ width):
  - Verify multi-column layouts
  - Verify hover states work
  - Verify optimal use of screen space

### Phase 9: Error Handling & Edge Cases

#### Step 9.1: API Error Handling
- [ ] Add error handling in API utility functions for:
  - Network failures - return error state, show inline error messages on pages
  - 404 errors - use `notFound()` to trigger not-found.tsx pages
  - Invalid API responses - validate response structure, show error messages
  - Rate limiting (if encountered) - implement retry logic with exponential backoff
- [ ] Create inline error components for network/API errors:
  - Display user-friendly error messages
  - Include retry buttons for network errors
  - Show helpful guidance (e.g., "Check your connection" or "Try again later")

#### Step 9.2: Edge Cases
- [ ] Handle Pokemon with missing data:
  - No sprites: Show placeholder image or hide sprite section
  - No moves: Show "No moves available" message
  - No locations: Show "No location data available" message
- [ ] Handle locations with no sub-areas: Show appropriate empty state message
- [ ] Handle moves with no flavor text: Show "No flavor text available" or hide section
- [ ] Handle Pokemon learners missing from move data: Skip PokemonLearners section (as specified)
- [ ] Handle generations with no Pokemon (shouldn't happen, but handle gracefully): Show empty state
- [ ] Handle empty search results with helpful message: "No results found. Try a different search term."
- [ ] Handle special characters in names: Properly encode/decode URLs using `encodeURIComponent()` and `decodeURIComponent()`
  - PokeAPI uses hyphenated lowercase (e.g., "farfetchd", "mr-mime", "nidoran-f")
  - Test edge cases: apostrophes, hyphens, gender symbols

### Phase 10: Performance Optimization

#### Step 10.1: Image Optimization
- [ ] Ensure all Pokemon sprites use Next.js Image component
- [ ] Set appropriate width/height or use `fill` prop where needed
- [ ] Update `next.config.ts` to configure remote image patterns:
  ```typescript
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'raw.githubusercontent.com',
      },
      {
        protocol: 'https',
        hostname: 'pokeapi.co',
      },
    ],
  }
  ```
- [ ] Verify images are properly optimized
- [ ] Add proper alt text for all images (e.g., "Pokemon sprite of Charizard")

#### Step 10.2: Caching Strategy
- [ ] Review fetch caching strategies:
  - Static data (generations): long cache (86400 seconds)
  - Semi-static data (Pokemon, moves): medium cache (3600 seconds)
  - More dynamic data: shorter cache or revalidation

#### Step 10.3: Bundle Size Optimization
- [ ] Verify Server Components are used where possible
- [ ] Check that Client Components are only where needed
- [ ] Run build and check bundle sizes

### Phase 11: Testing & Quality Assurance

#### Step 11.1: Functional Testing
- [ ] Test navigation between all pages
- [ ] Test search functionality on all list pages
- [ ] Test back button on all detail pages
- [ ] Test clicking Pokemon links from detail pages
- [ ] Test clicking location links from Pokemon detail
- [ ] Test clicking move links from Pokemon detail
- [ ] Verify all external links work correctly

#### Step 11.2: Visual Testing
- [ ] Verify UI looks correct on all breakpoints
- [ ] Test dark mode (if implemented)
- [ ] Verify images load correctly
- [ ] Check for layout shifts during loading

#### Step 11.3: Accessibility Testing
- [ ] Verify keyboard navigation works
- [ ] Test with screen reader (if available)
- [ ] Verify ARIA labels are present where needed
- [ ] Check color contrast ratios
- [ ] Verify focus indicators are visible

### Phase 12: Deployment Preparation

#### Step 12.1: Build Verification
- [ ] Run `npm run build` and verify no errors
- [ ] Check for TypeScript errors
- [ ] Check for linting errors (`npm run lint`)
- [ ] Verify all routes build correctly

#### Step 12.2: Vercel Configuration
- [ ] Ensure `next.config.ts` is properly configured
- [ ] Verify environment variables (if any) are set
- [ ] Check that API routes don't require special configuration
- [ ] Verify static asset paths are correct

#### Step 12.3: Final Checks
- [ ] Update README.md with project information
- [ ] Verify all requirements are met:
  - [x] Tab navigation on all pages
  - [x] Home redirects to /pokemon
  - [x] Searchable lists for all major resources
  - [x] Detail pages for all resources
  - [x] Back button on all detail pages
  - [x] Mobile responsive design
  - [x] Links between related resources work

## Data Fetching Strategy

### PokeAPI Endpoints Used:

1. **Pokemon:**
   - List: `GET https://pokeapi.co/api/v2/pokemon?limit=1300`
   - Detail: `GET https://pokeapi.co/api/v2/pokemon/{name}`
   - Species: `GET https://pokeapi.co/api/v2/pokemon-species/{name}`

2. **Locations:**
   - List: `GET https://pokeapi.co/api/v2/location?limit=1000`
   - Detail: `GET https://pokeapi.co/api/v2/location/{name}`
   - Area: `GET https://pokeapi.co/api/v2/location-area/{id}`

3. **Moves:**
   - List: `GET https://pokeapi.co/api/v2/move?limit=1000`
   - Detail: `GET https://pokeapi.co/api/v2/move/{name}`

4. **Generations:**
   - List: `GET https://pokeapi.co/api/v2/generation?limit=100`
   - Detail: `GET https://pokeapi.co/api/v2/generation/{name}`

## Technical Notes

- All data fetching happens in Server Components for better performance
- Client Components are only used for interactive UI (search, tabs, back button, virtual scrolling)
- Search is client-side only (PokeAPI doesn't support server-side search) with debouncing, memoization, and virtual scrolling
- Use Next.js Image component for all Pokemon sprites with proper remote domain configuration
- Implement proper loading states and error boundaries
- All links use Next.js Link component for client-side navigation
- Route params are properly typed and validated
- Use Next.js `notFound()` function to trigger custom not-found.tsx pages for 404s
- Network errors display inline with retry functionality
- Parallel data fetching where possible (location areas, etc.)
- URL encoding/decoding for Pokemon names with special characters
- Utility functions for data transformation (location extraction, generation formatting, encounter grouping, flavor text grouping)