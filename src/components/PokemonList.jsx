export default function PokemonList({ pokemon, onSelect }) {
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