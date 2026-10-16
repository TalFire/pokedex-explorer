# Pokédex Explorer

Pokédex Explorer is a React + Vite + TypeScript application for browsing, searching, discovering, and exploring Pokémon through a Pokédex-inspired interface.

The project is front-end only and uses the free public PokéAPI.

No backend, database, authentication, paid service, or API key is required.

---

## Features

The current version includes:

- Pokémon database loaded from PokéAPI
- Search by Pokémon name
- Dedicated route for every Pokémon
- Official Pokémon artwork
- Pokémon types
- Height and weight
- Abilities
- Base stats
- Battle Profile
- Strengths and weaknesses
- Resistances and immunities
- Type effectiveness multipliers
- Pokémon of the Day
- Random Discovery mode
- Loading states
- Error states
- Empty states
- Responsive Pokédex-inspired UI

---

## Routes

### Main Database

Route:

    /

Displays the Pokémon database, search interface, and discovery controls.

### Pokémon Details

Route:

    /pokemon/:id

Example:

    /pokemon/25

Opens Pikachu's dedicated Pokédex page.

Every Pokémon in the current database has its own route.

### Pokémon of the Day

Route:

    /daily

Displays the Pokémon selected for the current calendar day.

### Random Discovery

Route:

    /discover

Allows the user to discover a random Pokémon and open its full Pokédex entry.

---

## Technology

The project uses:

- React
- Vite
- TypeScript
- React Router
- Vitest
- Custom CSS
- PokéAPI

---

## API

The project uses the free public PokéAPI:

    https://pokeapi.co/

Main Pokémon list:

    https://pokeapi.co/api/v2/pokemon?limit=60

Additional Pokémon information is loaded from URLs returned by PokéAPI.

No API key is required.

---

## Project Structure

    src/
    ├── components/
    │   ├── BattleProfile.tsx
    │   ├── PokemonDetails.tsx
    │   ├── PokemonList.tsx
    │   ├── PokemonListItem.tsx
    │   └── SearchBar.tsx
    │
    ├── pages/
    │   ├── DailyPage.tsx
    │   ├── DiscoverPage.tsx
    │   ├── PokedexPage.tsx
    │   └── PokemonPage.tsx
    │
    ├── types/
    │   └── pokemon.ts
    │
    ├── utils/
    │   ├── pokemon.ts
    │   └── pokemon.test.ts
    │
    ├── App.tsx
    ├── App.css
    ├── index.css
    ├── main.tsx
    └── vite-env.d.ts

---

## How to Run

Install dependencies:

    npm install

Start the development server:

    npm run dev

Vite will display the local development URL, usually:

    http://localhost:5173/

---

## Validation

Run TypeScript validation:

    npm run typecheck

Run unit tests:

    npm test

Run lint:

    npm run lint

Create a production build:

    npm run build

---

## Unit Tests

Vitest is used for unit testing reusable application logic.

The current tests cover:

- Extracting Pokémon IDs from PokéAPI URLs
- Pokémon search filtering
- Pokémon of the Day calculation
- Random Pokémon selection
- Preventing Random Discovery from immediately selecting the same Pokémon again

---

## Application Architecture

`App.tsx` loads the main Pokémon database and owns the main application state.

The Pokémon list is rendered using reusable React components.

Data is passed between components through props.

React Router controls navigation between pages and provides a separate URL for every Pokémon.

Detailed Pokémon information is loaded from PokéAPI when a Pokémon entry is opened.

Reusable application logic is stored separately in TypeScript utility functions so that it can also be unit tested.

---

## AI-Assisted Development

AI coding tools were used during the project for planning, implementation, debugging, UI/UX improvements, TypeScript migration, routing, and testing.

The AI-assisted development process is documented in the repository.

The codebase was reviewed and tested during development, and the project owner is responsible for understanding the project architecture, components, state flow, routing, API usage, and tests.