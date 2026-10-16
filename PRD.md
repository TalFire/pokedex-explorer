# Pokédex Explorer — PRD

## 1. One-sentence pitch

Pokédex Explorer is an interactive Pokémon exploration application that allows users to browse, search, discover, and inspect Pokémon through a Pokédex-inspired interface.

## 2. Who it is for

The application is designed for Pokémon fans who want a simple, visual, and interactive way to explore Pokémon information.

## 3. Main Pages

### Pokémon Database

The user can browse and search the Pokémon database.

Route:

    /

### Pokémon Details

Each Pokémon has its own dedicated page and URL.

Example:

    /pokemon/25

The page displays detailed information about the selected Pokémon.

### Pokémon of the Day

The application selects one Pokémon based on the current calendar day.

Route:

    /daily

The same Pokémon remains active throughout the day.

### Random Discovery

The user can discover a random Pokémon.

Route:

    /discover

The discovered Pokémon can then be opened in its full Pokédex entry.

## 4. Must-have Features

- Load Pokémon data from PokéAPI.
- Search Pokémon by name.
- Display a Pokémon list using React components.
- Open a dedicated route for every Pokémon.
- Display Pokémon artwork.
- Display types.
- Display height and weight.
- Display abilities.
- Display base stats.
- Display loading, error, and empty states.
- Use React Router.
- Use TypeScript.
- Include Vitest unit tests.
- Include at least two additional pages.
- Work correctly on desktop and narrow screens.

## 5. Acceptance Criteria

- When I open the application, I see the Pokémon database.
- When I search for a Pokémon name, I see only matching entries.
- When I click a Pokémon, the URL changes to `/pokemon/:id`.
- When I refresh a Pokémon URL directly, the same Pokémon page loads again.
- When I open `/daily`, I see the Pokémon of the Day.
- When I refresh `/daily` on the same day, the daily Pokémon remains the same.
- When I open `/discover`, I can generate a random Pokémon.
- When I open a discovered Pokémon, I am taken to its dedicated Pokémon route.
- When Pokémon data is loading, I see a loading state.
- When an API request fails, I see an error state.
- When the application is used on a narrow screen, the interface remains usable.

## 6. Additional Features

The current version also includes:

- Pokédex-inspired device UI
- Random Discovery
- Pokémon of the Day
- Battle Profile
- Strengths
- Weaknesses
- Resistances
- Immunities
- Type effectiveness multipliers

## 7. Not Now

Possible future improvements:

- Evolution chains
- Pokémon species information
- Game appearances
- Favorites
- Pokémon comparison
- Additional filters
- More Pokémon generations
- Who's That Pokémon mini-game

## 8. Data

Public API:

    https://pokeapi.co/

Main Pokémon list:

    https://pokeapi.co/api/v2/pokemon?limit=60

Data currently used includes:

- id
- name
- artwork
- types
- height
- weight
- abilities
- stats
- type damage relations