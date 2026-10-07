export default function PokemonList({ pokemon }) {
  return (
    <div>
      <h2>Pokémon List</h2>
      {pokemon.map((item) => (
        <div key={item.id}>
          <h3>{item.name}</h3>
          <p>{item.type}</p>
        </div>
      ))}
    </div>
  );
}