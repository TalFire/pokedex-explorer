import {
  describe,
  expect,
  it,
} from "vitest";

import type {
  PokemonSummary,
} from "../types/pokemon";

import {
  chooseRandomPokemon,
  filterPokemonByName,
  getPokemonIdFromUrl,
  getPokemonOfTheDay,
} from "./pokemon";

const pokemon: PokemonSummary[] = [
  {
    id: 1,
    name: "bulbasaur",
    url: "https://pokeapi.co/api/v2/pokemon/1/",
  },
  {
    id: 4,
    name: "charmander",
    url: "https://pokeapi.co/api/v2/pokemon/4/",
  },
  {
    id: 25,
    name: "pikachu",
    url: "https://pokeapi.co/api/v2/pokemon/25/",
  },
];

describe(
  "getPokemonIdFromUrl",
  () => {
    it(
      "extracts the Pokémon ID from a PokéAPI URL",
      () => {
        expect(
          getPokemonIdFromUrl(
            "https://pokeapi.co/api/v2/pokemon/25/"
          )
        ).toBe(25);
      }
    );

    it(
      "throws when the URL does not contain a valid ID",
      () => {
        expect(() =>
          getPokemonIdFromUrl(
            "https://pokeapi.co/api/v2/pokemon/not-a-number/"
          )
        ).toThrow();
      }
    );
  }
);

describe(
  "filterPokemonByName",
  () => {
    it(
      "filters Pokémon by name ignoring case",
      () => {
        const result =
          filterPokemonByName(
            pokemon,
            "PIKA"
          );

        expect(result).toHaveLength(
          1
        );

        expect(
          result[0]?.name
        ).toBe("pikachu");
      }
    );

    it(
      "returns the complete list for an empty search",
      () => {
        expect(
          filterPokemonByName(
            pokemon,
            ""
          )
        ).toEqual(pokemon);
      }
    );

    it(
      "returns an empty array when nothing matches",
      () => {
        expect(
          filterPokemonByName(
            pokemon,
            "mewtwo"
          )
        ).toEqual([]);
      }
    );
  }
);

describe(
  "getPokemonOfTheDay",
  () => {
    it(
      "returns the same Pokémon for the same day number",
      () => {
        const first =
          getPokemonOfTheDay(
            pokemon,
            100
          );

        const second =
          getPokemonOfTheDay(
            pokemon,
            100
          );

        expect(first).toEqual(
          second
        );
      }
    );

    it(
      "cycles through the list based on the day number",
      () => {
        expect(
          getPokemonOfTheDay(
            pokemon,
            0
          )?.name
        ).toBe("bulbasaur");

        expect(
          getPokemonOfTheDay(
            pokemon,
            1
          )?.name
        ).toBe("charmander");

        expect(
          getPokemonOfTheDay(
            pokemon,
            2
          )?.name
        ).toBe("pikachu");

        expect(
          getPokemonOfTheDay(
            pokemon,
            3
          )?.name
        ).toBe("bulbasaur");
      }
    );

    it(
      "returns null for an empty list",
      () => {
        expect(
          getPokemonOfTheDay(
            [],
            50
          )
        ).toBeNull();
      }
    );
  }
);

describe(
  "chooseRandomPokemon",
  () => {
    it(
      "returns null for an empty list",
      () => {
        expect(
          chooseRandomPokemon(
            [],
            null,
            0.5
          )
        ).toBeNull();
      }
    );

    it(
      "selects a predictable entry when a random value is supplied",
      () => {
        const result =
          chooseRandomPokemon(
            pokemon,
            null,
            0
          );

        expect(result?.name).toBe(
          "bulbasaur"
        );
      }
    );

    it(
      "does not select the currently displayed Pokémon",
      () => {
        const result =
          chooseRandomPokemon(
            pokemon,
            1,
            0
          );

        expect(result?.id).not.toBe(
          1
        );

        expect(result?.name).toBe(
          "charmander"
        );
      }
    );
  }
);