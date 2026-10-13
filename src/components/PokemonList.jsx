export default function PokemonList({ pokemon, onSelect }) {
  if (pokemon.length === 0) {
    return (
      <div>
        <h2>Pokémon List</h2>
        <p>No Pokémon found.</p>
      </div>
    );
  }

  return (
    <div>
      <h2>Pokémon List</h2>

      {pokemon.map((item) => (
        <button
          key={item.id}
          onClick={() => onSelect(item)}
        >
          <h3>{item.name}</h3>
          <p>#{item.id}</p>
        </button>
      ))}
    </div>
  );
}