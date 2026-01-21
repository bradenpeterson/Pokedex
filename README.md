# Pokedex Application

A comprehensive Pokedex web application built with Next.js 16, React 19, and TypeScript. This application provides detailed information about Pokemon, locations, moves, and generations from the Pokemon universe, powered by the [PokeAPI](https://pokeapi.co/).

## Live Demo

**View the live application**: [https://pokedex-alpha-teal-94.vercel.app/](https://pokedex-alpha-teal-94.vercel.app/)

## Features

### 📱 Pages & Navigation
- **Home Page** (`/`) - Tab-based navigation with automatic Pokemon tab selection
- **Pokemon List** (`/pokemon`) - Browse all Pokemon with client-side search
- **Pokemon Details** (`/pokemon/[name]`) - View detailed Pokemon information including:
  - Stats and characteristics
  - Normal and shiny sprites
  - Moves categorized by learning method (Level-up, TM/HM, Egg, Tutor)
  - Locations where Pokemon can be found
- **Locations List** (`/locations`) - Browse all game locations with search
- **Location Details** (`/locations/[name]`) - View location information including:
  - Region information
  - Sub-areas with Pokemon encounters grouped by encounter method
- **Moves List** (`/moves`) - Browse all moves with search
- **Move Details** (`/moves/[name]`) - View move information including:
  - Power, accuracy, and PP (Power Points)
  - Flavor text for each game version
  - List of Pokemon that can learn the move
- **Generations List** (`/generations`) - Browse all Pokemon generations with search
- **Generation Details** (`/generations/[name]`) - View generation information including:
  - Primary region
  - All Pokemon species in that generation

### User Experience
- **Client-side Search** - Instant search filtering across all major lists
- **Responsive Design** - Mobile-first approach with responsive grid layouts
- **Dark Mode Support** - Automatic dark mode based on system preferences
- **Smart Navigation** - Hide/show navigation bar on scroll
- **Back Button** - Context-aware back button on all detail pages
- **Pokemon-themed Styling** - Color-coded sections matching Pokemon aesthetics
- **Error Handling** - Graceful error messages with retry functionality
- **Loading States** - Smooth loading indicators throughout the application

## Tech Stack

- **Framework**: [Next.js 16.1.3](https://nextjs.org/) (App Router)
- **React**: 19.2.3
- **TypeScript**: 5.x
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **API**: [PokeAPI v2](https://pokeapi.co/docs/v2)
- **Image Optimization**: Next.js Image component with pixel-perfect rendering

## Running Locally

### Prerequisites

- Node.js 18.x or higher
- npm or yarn package manager

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd pokedex
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

5. Run `npm run dev` to start development server

## Project Structure

```
pokedex/
├── app/                    # Next.js App Router pages
│   ├── pokemon/           # Pokemon pages
│   ├── locations/         # Location pages
│   ├── moves/             # Move pages
│   ├── generations/       # Generation pages
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Home page (redirects to /pokemon)
│   └── globals.css        # Global styles
├── components/            # React components
│   ├── ui/               # Reusable UI components
│   ├── pokemon/          # Pokemon-specific components
│   ├── locations/        # Location-specific components
│   ├── moves/            # Move-specific components
│   └── generations/      # Generation-specific components
├── lib/                   # Utility functions and types
│   ├── api/              # API integration functions
│   ├── types/            # TypeScript type definitions
│   └── utils/            # Utility functions
└── public/                # Static assets
```

## API Integration

This application uses the [PokeAPI v2](https://pokeapi.co/docs/v2) REST API. All API calls are:
- Server-side rendered for optimal performance
- Cached appropriately (24 hours for static data, 1 hour for dynamic data)
- Type-safe with comprehensive TypeScript definitions
- Error-handled with user-friendly error messages

### Data Fetching Strategy

- **List Pages**: Fetch all items on the server and pass to client components for search
- **Detail Pages**: Fetch detailed data on-demand with dynamic metadata generation
- **Nested Data**: Fetch related data in parallel where possible (e.g., location areas)

## Features in Detail

### Search Functionality
All major lists feature client-side search with:
- Debounced input (300ms delay)
- Memoized filtering for performance
- Real-time result count
- Case-insensitive matching

### Image Optimization
Pokemon sprites are rendered with:
- Pixel-perfect scaling using `image-rendering: pixelated`
- Unoptimized mode to preserve sprite quality
- Responsive sizing across all devices

### Navigation
- Sticky navigation bar that hides on scroll down, shows on scroll up
- Color-coded back buttons matching page themes
- Smart fallback navigation for browser history edge cases

### Responsive Design
- Mobile-first approach
- Responsive grid layouts:
  - 1 column on mobile
  - 2 columns on small screens
  - 3 columns on medium screens
  - 4 columns on large screens
- Touch-friendly targets (44x44px minimum)

## License

This project is private and for educational purposes.

## Acknowledgments

- [PokeAPI](https://pokeapi.co/) for providing the comprehensive Pokemon data API
- [Next.js](https://nextjs.org/) for the excellent React framework
- [Tailwind CSS](https://tailwindcss.com/) for the utility-first CSS framework
