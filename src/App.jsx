import { useEffect, useState } from "react";
import PokemonList from "./components/PokemonList";
import PokemonDetails from "./components/PokemonDetails";
import SearchBar from "./components/SearchBar";
import "./App.css";

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
        const pokemonList = data.results.map((item) => {
          const id = Number(
            item.url.split("/").filter(Boolean).pop()
          );

          return {
            id: id,
            name: item.name,
            url: item.url,
          };
        });

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
    return (
      <main className="status-screen">
        <p>Loading Pokémon...</p>
      </main>
    );
  }

  if (error) {
    return (
      <main className="status-screen">
        <p>Error: {error}</p>
      </main>
    );
  }

  return (
    <div className="app">
      <header className="app-header">
        <h1>Pokédex Explorer</h1>
        <p>
          Search the Pokédex and select a Pokémon to view its details.
        </p>
      </header>

      <main className="pokedex-layout">
        <section className="pokemon-list-panel">
          <SearchBar
            searchTerm={searchTerm}
            onSearch={setSearchTerm}
          />

          <PokemonList
            pokemon={filteredPokemon}
            selectedPokemon={selectedPokemon}
            onSelect={setSelectedPokemon}
          />
        </section>

        <section className="pokemon-details-panel">
          <PokemonDetails pokemon={selectedPokemon} />
        </section>
      </main>
    </div>
  );
}