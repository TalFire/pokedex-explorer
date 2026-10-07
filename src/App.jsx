import pokemon from "./data/pokemon.json";
import PokemonList from "./components/PokemonList";

export default function App() {
  return (
    <div>
      <h1>Pokédex Explorer</h1>

      <PokemonList pokemon={pokemon} />
    </div>
  );
}