# Pokédex Explorer Tasks

## Task 1 — Build the first Pokémon list

Create a small local Pokémon dataset and display it using React.

Done when:

The application displays several Pokémon using `map` and a unique `key`.

Status:

Completed.

---

## Task 2 — Add Pokémon selection and details

Allow the user to select a Pokémon and display its information in a separate component.

Done when:

Clicking a Pokémon changes the selected Pokémon and updates the details panel.

Status:

Completed.

---

## Task 3 — Connect to PokéAPI

Replace the local sample data with Pokémon data loaded from PokéAPI.

Done when:

The application loads Pokémon using `fetch` inside `useEffect` and includes loading and error states.

Status:

Completed.

---

## Task 4 — Add Pokémon search

Add a search field that filters Pokémon by name.

Done when:

Typing a Pokémon name displays only matching entries and a no-results state appears when nothing matches.

Status:

Completed.

---

## Task 5 — Expand Pokémon details and UI

Load detailed Pokémon information and create a polished Pokédex-style interface.

Features added:

- official artwork
- types
- height
- weight
- abilities
- base stats
- responsive layout
- Battle Profile
- Random Scan
- Pokémon of the Day

Done when:

The Pokédex experience is functional, responsive, and visually complete.

Status:

Completed.

---

## Task 6 — Migrate the project to TypeScript

Convert the existing JavaScript React project to TypeScript.

Add reusable types for:

- Pokémon summaries
- Pokémon details
- PokéAPI responses
- component props

Done when:

The application code uses `.ts` and `.tsx` files and TypeScript validation completes successfully.

Status:

Completed.

---

## Task 7 — Add React Router and multiple pages

Add React Router and create dedicated routes.

Routes:

    /
    /pokemon/:id
    /daily
    /discover

Done when:

- every Pokémon has its own URL
- direct refresh on a Pokémon route works
- Pokémon of the Day has its own page
- Random Discovery has its own page
- navigation between routes works correctly

Status:

Completed.

---

## Task 8 — Add Vitest and prepare the project for submission

Extract reusable logic into TypeScript utility functions and add unit tests using Vitest.

Tests include:

- PokéAPI Pokémon ID parsing
- search filtering
- Pokémon of the Day
- random Pokémon selection

Final validation commands:

    npm run typecheck
    npm test
    npm run lint
    npm run build

Done when:

All validation commands complete successfully and the project documentation matches the final application.

Status:

In progress.