export default function PokemonList({
  pokemon,
  selectedPokemon,
  onSelect,
}) {
  if (pokemon.length === 0) {
    return (
      <div className="no-results">
        <p>No Pokémon found.</p>
      </div>
    );
  }

  return (
    <div className="pokemon-list">
      {pokemon.map((item) => (
        <button
          key={item.id}
          className={
            selectedPokemon?.id === item.id
              ? "pokemon-list-item selected"
              : "pokemon-list-item"
          }
          onClick={() => onSelect(item)}
        >
          <span className="pokemon-id">
            #{String(item.id).padStart(3, "0")}
          </span>

          <span className="pokemon-name">
            {item.name}
          </span>
        </button>
      ))}
    </div>
  );
}