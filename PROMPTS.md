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