import PokemonListItem from "./PokemonListItem";
import type { PokemonSummary } from "../types/pokemon";

interface PokemonListProps {
  pokemon: PokemonSummary[];
  selectedPokemon: PokemonSummary | null;
  onSelect: (pokemon: PokemonSummary) => void;
}

export default function PokemonList({
  pokemon,
  selectedPokemon,
  onSelect,
}: PokemonListProps) {
  if (pokemon.length === 0) {
    return (
      <div className="no-results">
        <span
          className="signal-icon"
          aria-hidden="true"
        >
          ?
        </span>

        <h3>No Pokémon found</h3>

        <p>
          No database entries match your search.
        </p>

        <p>
          Try another Pokémon name.
        </p>
      </div>
    );
  }

  return (
    <ul
      className="pokemon-list"
      aria-label="Pokémon database results"
    >
      {pokemon.map((item) => (
        <PokemonListItem
          key={item.id}
          pokemon={item}
          isSelected={
            selectedPokemon?.id === item.id
          }
          onSelect={onSelect}
        />
      ))}
    </ul>
  );
}