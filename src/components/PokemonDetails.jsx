export default function PokemonDetails({ pokemon }) {
  if (!pokemon) {
    return (
      <div>
        <h2>Pokémon Details</h2>
        <p>Pick a Pokémon from the list</p>
      </div>
    );
  }

  return (
    <div>
      <h2>Pokémon Details</h2>

      <h3>{pokemon.name}</h3>
      <p>ID: {pokemon.id}</p>
      <p>Type: {pokemon.type}</p>
    </div>
  );
}