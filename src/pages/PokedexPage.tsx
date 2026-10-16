import PokemonDetails from "../components/PokemonDetails";

import type {
  PokemonSummary,
} from "../types/pokemon";

interface PokedexPageProps {
  selectedPokemon:
    | PokemonSummary
    | null;
}

export default function PokedexPage({
  selectedPokemon,
}: PokedexPageProps) {
  return (
    <PokemonDetails
      pokemon={selectedPokemon}
    />
  );
}