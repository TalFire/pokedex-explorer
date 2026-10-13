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
        if (!response.ok) throw new Error("Failed to load Pokémon");
        return response.json();
      })
      .then((data) => {
        const pokemonList = data.results.map((item) => {
          const id = Number(item.url.split("/").filter(Boolean).pop());
          return { id: id, name: item.name, url: item.url };
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

  return (
    <div className="app">
      <header className="app-header">
        <div className="device-lights" aria-hidden="true">
          <span className="sensor-lens" />
          <span className="indicator light-red" />
          <span className="indicator light-yellow" />
          <span className="indicator light-green" />
        </div>
        <div className="header-title">
          <p className="eyebrow">Your field companion</p>
          <h1>Pokédex <span>Explorer</span></h1>
        </div>
        <div className="system-label">
          <span className="status-dot" /> Pokédex system
          <span className="system-version">NATIONAL DATABASE / V1.0</span>
        </div>
      </header>

      <main className="pokedex-layout">
        <section className="pokemon-list-panel" aria-labelledby="database-heading">
          <div className="panel-heading">
            <div>
              <p className="eyebrow">01 / Discovery</p>
              <h2 id="database-heading">Pokémon database</h2>
            </div>
            <span className="panel-symbol" aria-hidden="true">≡</span>
          </div>
          <p className="panel-description">Find a Pokémon. Start exploring.</p>
          <SearchBar searchTerm={searchTerm} onSearch={setSearchTerm} />
          <div className="list-caption">
            <span>DATABASE ENTRIES</span>
            <span role="status">
              {loading ? "CONNECTING" : error ? "OFFLINE" : `${filteredPokemon.length} / ${pokemon.length}`}
            </span>
          </div>
          {loading ? (
            <div className="database-message" role="status">
              <span className="scanner-loader" aria-hidden="true" />
              <h3>Scanning database…</h3>
              <p>Connecting to the Pokémon world.</p>
            </div>
          ) : error ? (
            <div className="database-message error-message" role="alert">
              <span className="signal-icon" aria-hidden="true">!</span>
              <h3>Connection error</h3>
              <p>Unable to reach the Pokédex database.</p>
              <p className="error-detail">{error}</p>
              <p>Refresh the page to reconnect.</p>
            </div>
          ) : (
            <PokemonList
              pokemon={filteredPokemon}
              selectedPokemon={selectedPokemon}
              onSelect={setSelectedPokemon}
            />
          )}
          <div className={`list-footer${error ? " offline" : ""}`}>
            <span className="status-dot" />
            <span>
              {loading ? "Establishing connection" : error ? "Database offline" : "PokéAPI connection established"}
            </span>
          </div>
        </section>

        <section
          className="pokemon-details-panel"
          aria-labelledby="scanner-heading"
          aria-live="polite"
          aria-atomic="true"
        >
          <div className="panel-heading">
            <div>
              <p className="eyebrow">02 / Field research</p>
              <h2 id="scanner-heading">Pokémon scanner</h2>
            </div>
            <span className="scanner-status">
              {selectedPokemon ? "TARGET SELECTED" : "STANDBY"}
            </span>
          </div>
          <PokemonDetails pokemon={selectedPokemon} />
        </section>
      </main>
      <footer className="device-footer">
        <span className="speaker-grille" aria-hidden="true" />
        <p>Discover. Scan. Explore.</p>
        <span className="footer-credit">Powered by PokéAPI</span>
      </footer>
    </div>
  );
}
