# Pokédex Explorer

Pokédex Explorer is a React + Vite + TypeScript application for browsing, searching, discovering, and exploring Pokémon through a Pokédex-inspired interface.

The project is front-end only and uses the free public PokéAPI.

No backend, database, authentication, paid service, or API key is required.

---

## Features

The current version includes:

- Pokémon database loaded from PokéAPI
- More than 1,000 Pokémon species
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
- Evolution chains
- Branched evolution paths
- Clickable evolution stages
- Pokémon of the Day
- Random Discovery mode
- Loading states
- Error states
- Empty states
- Responsive Pokédex-inspired UI
- Independent desktop scrolling for the database and scanner panels

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
- Oxlint
- Custom CSS
- PokéAPI

---

## API

The project uses the free public PokéAPI:

    https://pokeapi.co/

The main database is loaded from:

    https://pokeapi.co/api/v2/pokemon-species?limit=2000

The application then creates the corresponding Pokémon detail URLs using each species ID.

Additional requests are made for:

- Pokémon details
- Type damage relations
- Pokémon species information
- Evolution chains

No API key is required.

---

## Project Structure

    src/
    ├── components/
    │   ├── BattleProfile.tsx
    │   ├── EvolutionChain.tsx
    │   ├── EvolutionChain.css
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
    ├── PokedexLayout.css
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

The current test suite includes 11 tests covering:

- Extracting Pokémon IDs from PokéAPI URLs
- Invalid Pokémon ID handling
- Pokémon search filtering
- Case-insensitive search
- Empty search behavior
- Pokémon of the Day calculation
- Daily Pokémon cycling
- Empty-list handling
- Random Pokémon selection
- Predictable random selection for testing
- Preventing Random Discovery from immediately selecting the same Pokémon again

---

## Application Architecture

`main.tsx` is the application entry point.

It renders the React application and wraps `App` with `BrowserRouter`, which enables client-side routing.

`App.tsx` owns the main application state, including:

- the Pokémon database
- the selected Pokémon
- the search term
- loading state
- error state

The initial Pokémon database is loaded from PokéAPI using `fetch` inside `useEffect`.

The data is stored in React state and passed to child components using props.

React Router controls navigation between the database, individual Pokémon pages, Pokémon of the Day, and Random Discovery.

When an individual Pokémon is opened, `PokemonDetails` fetches the full information for that Pokémon.

`BattleProfile` uses the Pokémon's types to request type damage relations and calculate weaknesses, resistances, immunities, and offensive advantages.

`EvolutionChain` uses the Pokémon species endpoint and evolution-chain endpoint to display the complete evolution structure. Evolution cards can be clicked to navigate directly to the corresponding Pokémon route.

Reusable application logic such as search, Pokémon ID parsing, daily selection, and random selection is stored in `src/utils/pokemon.ts` so that it can be unit tested independently from the UI.

---

## AI-Assisted Development

AI coding tools were used during the project for planning, implementation, debugging, UI/UX improvements, TypeScript migration, routing, testing, and later feature enhancements.

The development process is documented in `PROMPTS.md`.

The project was developed gradually with separate Git commits for major stages and features.

The codebase was reviewed and tested during development, and the project owner is responsible for understanding the project architecture, components, state flow, routing, API usage, TypeScript types, and tests.