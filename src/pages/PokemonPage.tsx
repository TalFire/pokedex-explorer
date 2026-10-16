import { useParams } from "react-router-dom";

import PokemonDetails from "../components/PokemonDetails";

import type {
  PokemonSummary,
} from "../types/pokemon";

interface PokemonPageProps {
  pokemon: PokemonSummary[];
  loading: boolean;
}

export default function PokemonPage({
  pokemon,
  loading,
}: PokemonPageProps) {
  const { id } =
    useParams<{ id: string }>();

  const pokemonId = Number(id);

  if (loading) {
    return (
      <div
        className="details-message"
        role="status"
      >
        <span
          className="scanner-loader"
          aria-hidden="true"
        />

        <h3>
          Locating Pokédex entry…
        </h3>

        <p>
          Reading route data.
        </p>
      </div>
    );
  }

  const selectedPokemon =
    Number.isInteger(pokemonId)
      ? pokemon.find(
          (item) =>
            item.id === pokemonId
        ) ?? null
      : null;

  if (!selectedPokemon) {
    return (
      <div className="details-message error-message">
        <span
          className="signal-icon"
          aria-hidden="true"
        >
          !
        </span>

        <h3>
          Pokémon not found
        </h3>

        <p>
          This Pokédex entry does not
          exist in the current database.
        </p>
      </div>
    );
  }

  return (
    <PokemonDetails
      pokemon={selectedPokemon}
    />
  );
}