import { useEffect, useState } from "react";
import PokemonList from "./components/PokemonList";
import PokemonDetails from "./components/PokemonDetails";
import SearchBar from "./components/SearchBar";

export default function App() {
  const [pokemon, setPokemon] = useState([]);
  const [selectedPokemon, setSelectedPokemon] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("https://pokeapi.co/api/v2/pokemon?limit=60")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to load Pokémon");
        }

        return response.json();
      })
      .then((data) => {
        const pokemonList = data.results.map((item, index) => ({
          id: index + 1,
          name: item.name,
          url: item.url,
        }));

        setPokemon(pokemonList);
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  }, []);

  const filteredPokemon = pokemon.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return <p>Loading Pokémon...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div>
      <h1>Pokédex Explorer</h1>

      <SearchBar
        searchTerm={searchTerm}
        onSearch={setSearchTerm}
      />

      <PokemonList
        pokemon={filteredPokemon}
        onSelect={setSelectedPokemon}
      />

      <PokemonDetails pokemon={selectedPokemon} />
    </div>
  );
}