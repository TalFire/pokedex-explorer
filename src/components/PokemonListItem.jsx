export default function PokemonListItem({ pokemon, isSelected, onSelect }) {
  return (
    <li>
      <button
        type="button"
        className={`pokemon-list-item${isSelected ? " selected" : ""}`}
        aria-pressed={isSelected}
        onClick={() => onSelect(pokemon)}
      >
        <span className="pokemon-id">#{String(pokemon.id).padStart(3, "0")}</span>
        <img
          className="pokemon-sprite"
          src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png`}
          alt=""
          loading="lazy"
          onError={(event) => { event.currentTarget.style.visibility = "hidden"; }}
        />
        <span className="pokemon-name">{pokemon.name}</span>
        <span className="selection-marker" aria-hidden="true">{isSelected ? "●" : "›"}</span>
      </button>
    </li>
  );
}
