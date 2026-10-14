import type { PokemonSummary } from "../types/pokemon";

interface PokemonListItemProps {
  pokemon: PokemonSummary;
  isSelected: boolean;
  onSelect: (pokemon: PokemonSummary) => void;
}

export default function PokemonListItem({
  pokemon,
  isSelected,
  onSelect,
}: PokemonListItemProps) {
  return (
    <li>
      <button
        type="button"
        className={`pokemon-list-item${isSelected ? " selected" : ""}`}
        onClick={() => onSelect(pokemon)}
        aria-pressed={isSelected}
      >
        <span className="pokemon-id">
          #{String(pokemon.id).padStart(3, "0")}
        </span>

        <img
          className="pokemon-sprite"
          src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png`}
          alt=""
          aria-hidden="true"
          loading="lazy"
        />

        <span className="pokemon-name">
          {pokemon.name.replaceAll("-", " ")}
        </span>

        <span
          className="selection-marker"
          aria-hidden="true"
        >
          {isSelected ? "●" : "›"}
        </span>
      </button>
    </li>
  );
}