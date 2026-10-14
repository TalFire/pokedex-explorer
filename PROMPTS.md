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
TODO — verify API loading, Pokémon selection, and that the Console has no errors.

## Task 4 — Add Pokémon search
Prompt:
Help me add a search box that filters the Pokémon list by name.

Agent did:
Added a SearchBar component, search state in App, and filtered the Pokémon list using filter().

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

## Task 6 — Functional cleanup and edge cases
Prompt:
Help me review the current Pokédex features and identify the important functional and error cases to test before final styling.

Agent did:
Provided a checklist for search, selection, API loading, error handling, details loading, and Console errors.

I checked:
Tested the application behavior, including an intentional failed API request, and verified that the main features work without Console errors.

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