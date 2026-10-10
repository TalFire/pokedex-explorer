import pokemon from "./data/pokemon.json";
import PokemonList from "./components/PokemonList";
import { useState } from "react";
import PokemonDetails from "./components/PokemonDetails";

export default function App() {
  const [selectedPokemon, setSelectedPokemon] = useState(null);

  return (
    <div>
      <h1>Pokédex Explorer</h1>

      <PokemonList
        pokemon={pokemon}
        onSelect={setSelectedPokemon}
      />

      <PokemonDetails pokemon={selectedPokemon} />
    </div>
  );
}