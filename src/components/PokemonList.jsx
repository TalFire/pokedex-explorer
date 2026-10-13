import PokemonListItem from "./PokemonListItem";

export default function PokemonList({
  pokemon,
  selectedPokemon,
  onSelect,
}) {
  if (pokemon.length === 0) {
    return (
      <div className="no-results" role="status">
        <span className="signal-icon" aria-hidden="true">?</span>
        <h3>No Pokémon found</h3>
        <p>Try another name or clear your search to explore the database.</p>
      </div>
    );
  }

  return (
    <ul className="pokemon-list" aria-label="Pokémon database">
      {pokemon.map((item) => (
        <PokemonListItem
          key={item.id}
          pokemon={item}
          isSelected={selectedPokemon?.id === item.id}
          onSelect={onSelect}
        />
      ))}
    </ul>
  );
}
