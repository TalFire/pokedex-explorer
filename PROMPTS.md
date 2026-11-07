# PROMPTS

## Task 1 — Show the Pokémon list

Prompt:

Help me create a local Pokémon JSON file and display the list using React map and a unique key.

Agent did:

Helped create `pokemon.json`, `PokemonList.jsx`, and connect the data through `App.jsx`.

I checked:

The first import path was wrong. I fixed the JSON file location and verified that the Pokémon list displayed correctly.

---

## Task 2 — Select a Pokémon and show its details

Prompt:

Help me use React state so clicking a Pokémon shows its details in a separate component.

Agent did:

Helped add `useState`, `PokemonDetails.jsx`, and pass the selected Pokémon using props.

I checked:

The page was blank because `setSelectedPokemon` was not defined. I added the missing state declaration and verified that clicking different Pokémon updates the details correctly.

---

## Task 3 — Connect to PokéAPI

Prompt:

Help me replace the local JSON with PokéAPI using `fetch` inside `useEffect`, including loading and error states.

Agent did:

Helped add `pokemon`, `loading`, and `error` state and explained where `useEffect` should be placed in `App.jsx`.

I checked:

Verified that the API loads correctly, Pokémon can be selected, loading and error states work, and the main application runs without Console errors.

---

## Task 4 — Add Pokémon search

Prompt:

Help me add a search box that filters the Pokémon list by name.

Agent did:

Added a SearchBar component, search state in App, and filtered the Pokémon list using `filter()`.

I checked:

I tested several searches, verified that clearing the search restores the full list, checked the no-results message, and confirmed there are no Console errors.

---

## Task 5 — Expand Pokémon details

Prompt:

Help me load and display full details for the selected Pokémon, including image, types, height, weight, abilities, and stats.

Agent did:

Updated PokemonDetails to fetch the selected Pokémon URL and display its full API data.

I checked:

I selected several Pokémon, verified that their details and images change correctly, and confirmed there are no Console errors.

---

## Task 6 — Functional cleanup and edge cases

Prompt:

Help me review the current Pokédex features and identify the important functional and error cases to test before final styling.

Agent did:

Provided a checklist for search, selection, API loading, error handling, details loading, and Console errors.

I checked:

Tested the application behavior, including an intentional failed API request, and verified that the main features work without Console errors.

---

## Task 7 — Pokédex UI/UX redesign

Prompt:

Redesign the existing Pokédex as a polished Pokémon-inspired digital device while preserving the current React architecture and functionality.

Agent did:

Created a responsive Pokédex-style interface, added PokemonListItem, type colors, artwork scanner, stat bars, accessibility states, and improved loading/error/empty states.

I checked:

Verified the redesigned interface, Pokémon selection, search, responsive layout, and the main Pokémon details. The project builds successfully with no lint errors.

---

## Enhancement — Random Pokémon

Prompt:

Help me add a Random Scan feature that selects a random Pokémon while preserving the existing Pokédex architecture and UI.

Agent did:

Added a random selection function that reuses the existing selectedPokemon state and integrated a Random Scan button into the Pokédex interface.

I checked:

Tested repeated random selections, verified that the selected Pokémon and full details update correctly, and confirmed that an active search is cleared when Random Scan is used.

---

## Enhancement — Pokémon of the Day

Prompt:

Help me add a Pokémon of the Day feature that displays the same Pokémon for the entire calendar day and changes automatically on a new day.

Agent did:

Added a deterministic daily Pokémon calculation based on the current date and integrated it into the Pokédex discovery panel.

I checked:

Verified that the same Pokémon remains after refresh, opens correctly in the scanner, clears an active search, and displays correctly in the responsive Pokédex UI.

---

## Enhancement — Battle Profile

Prompt:

Help me add a Battle Profile that calculates Pokémon strengths, weaknesses, resistances, and immunities from PokéAPI type data.

Agent did:

Added a BattleProfile component that fetches type damage relations and calculates combined defensive multipliers for dual-type Pokémon, as well as offensive type advantages.

I checked:

Tested single-type and dual-type Pokémon, verified ×2 and combined multipliers such as ×4 and ×0.5, confirmed Random Scan and Pokémon of the Day update the profile correctly, and verified the project builds and lints successfully.

---

## Task — Migrate the Pokédex to TypeScript

Prompt:

Help me migrate the existing React Pokédex from JavaScript/JSX to TypeScript/TSX without rebuilding the application from scratch.

Agent did:

Converted the React source files to TypeScript, created reusable Pokémon and PokéAPI interfaces, added TypeScript configuration, and added a typecheck script.

I checked:

Verified that all application source files were migrated to `.ts` and `.tsx`, fixed TypeScript configuration issues, restarted the development server after stale HMR references, and confirmed that typecheck completed successfully.

---

## Task — Add React Router

Prompt:

Help me add React Router so every Pokémon has its own URL while preserving the existing master-detail Pokédex interface.

Agent did:

Wrapped the application with BrowserRouter, added route handling, created PokemonPage and PokedexPage, and connected Pokémon selection to `/pokemon/:id`.

I checked:

Verified direct navigation to Pokémon routes, refresh on routes such as `/pokemon/25`, list selection, Random Scan navigation, and Pokémon of the Day navigation.

---

## Task — Add additional routed pages

Prompt:

Help me turn Pokémon of the Day and Random Discovery into separate React Router pages while preserving the existing Pokédex master-detail interface.

Agent did:

Added `/daily` and `/discover`, created DailyPage and DiscoverPage, added Pokédex navigation, and connected both pages to the existing Pokémon routes.

I checked:

Verified direct navigation, active navigation states, Random Discovery, Pokémon of the Day, full entry navigation, TypeScript validation, lint, and production build.

---

## Task — Vitest unit tests and final TypeScript validation

Prompt:

Help me add meaningful Vitest unit tests and make sure the TypeScript configuration validates the real application code.

Agent did:

Extracted reusable Pokémon logic into TypeScript utilities, added Vitest tests for search, PokéAPI ID parsing, Pokémon of the Day, and Random Discovery, and fixed the TypeScript/Vite configuration.

I checked:

Ran typecheck, Vitest, lint, and production build successfully and verified that the routed Pokédex pages still work correctly.

---

## Enhancement — Evolution Chain

Prompt:

Help me add Pokémon evolution chains using PokéAPI species and evolution-chain data while preserving the existing React, TypeScript, Router, and Pokédex UI architecture.

Agent did:

Added an EvolutionChain component that loads species data, follows the evolution-chain endpoint, displays evolution stages and evolution conditions, and supports branched evolution structures.

I checked:

Tested evolution chains for several Pokémon and identified a visual issue with branched evolution paths.

---

## Enhancement — Fix evolution branches and expand the Pokédex

Prompt:

Help me fix branched evolution chains so alternative evolutions are shown as separate branches, and expand the database beyond the first 60 Pokémon.

Agent did:

Changed the main database to use the PokéAPI species endpoint, allowing the application to load more than one thousand Pokémon species.

Updated EvolutionChain so branching evolutions are displayed as parallel alternatives instead of appearing as a single linear chain.

I checked:

Verified Poliwag → Poliwhirl branching into Poliwrath and Politoed, checked other evolution chains, searched for Pokémon beyond number 60, and verified direct Pokémon routes.

---

## Enhancement — Clickable evolutions and improved desktop layout

Prompt:

Help me make every Pokémon in the Evolution Chain clickable and improve the desktop layout so long Pokémon details do not create large unused areas.

Agent did:

Made evolution cards navigate to their corresponding `/pokemon/:id` routes.

Added a desktop Pokédex layout where the Pokémon database and details scanner use the available viewport height and scroll independently.

I checked:

Verified navigation between Pokémon using evolution cards, tested several evolution chains, confirmed the database list uses the available space correctly, and checked that the mobile layout keeps the normal document flow.

---

## Final review

Prompt:

Review the final GitHub repository against the project requirements and identify anything that still needs to be completed before the final commit and project defense.

Agent did:

Reviewed the repository structure, React and TypeScript architecture, Router, tests, package scripts, Git history, documentation, Evolution Chain, expanded database, and current project requirements.

I checked:

Confirmed that the required technical features are present and identified documentation updates needed to match the final version of the project.