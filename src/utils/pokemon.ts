import type {
  PokemonSummary,
} from "../types/pokemon";

export function getPokemonIdFromUrl(
  url: string
): number {
  const lastPart = url
    .split("/")
    .filter(Boolean)
    .pop();

  const id = Number(lastPart);

  if (!Number.isInteger(id)) {
    throw new Error(
      "Unable to read Pokémon ID from URL"
    );
  }

  return id;
}

export function filterPokemonByName(
  pokemon: PokemonSummary[],
  searchTerm: string
): PokemonSummary[] {
  const normalizedSearch =
    searchTerm
      .trim()
      .toLowerCase();

  if (!normalizedSearch) {
    return pokemon;
  }

  return pokemon.filter((item) =>
    item.name
      .toLowerCase()
      .includes(normalizedSearch)
  );
}

export function getPokemonOfTheDay(
  pokemon: PokemonSummary[],
  dayNumber: number
): PokemonSummary | null {
  if (pokemon.length === 0) {
    return null;
  }

  const dailyIndex =
    dayNumber % pokemon.length;

  return pokemon[dailyIndex] ?? null;
}

export function chooseRandomPokemon(
  pokemon: PokemonSummary[],
  currentPokemonId: number | null = null,
  randomValue: number = Math.random()
): PokemonSummary | null {
  if (pokemon.length === 0) {
    return null;
  }

  const availablePokemon =
    currentPokemonId === null
      ? pokemon
      : pokemon.filter(
          (item) =>
            item.id !== currentPokemonId
        );

  if (availablePokemon.length === 0) {
    return null;
  }

  const safeRandomValue = Math.min(
    Math.max(randomValue, 0),
    0.999999999
  );

  const randomIndex = Math.floor(
    safeRandomValue *
      availablePokemon.length
  );

  return (
    availablePokemon[randomIndex] ??
    null
  );
}