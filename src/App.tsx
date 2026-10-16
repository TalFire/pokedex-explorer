import { useEffect, useState } from "react";

import {
  NavLink,
  Route,
  Routes,
  useLocation,
  useNavigate,
} from "react-router-dom";

import PokemonList from "./components/PokemonList";
import SearchBar from "./components/SearchBar";

import PokedexPage from "./pages/PokedexPage";
import PokemonPage from "./pages/PokemonPage";
import DailyPage from "./pages/DailyPage";
import DiscoverPage from "./pages/DiscoverPage";

import type {
  PokemonListApiResponse,
  PokemonSummary,
} from "./types/pokemon";

import {
  filterPokemonByName,
  getPokemonIdFromUrl,
  getPokemonOfTheDay,
} from "./utils/pokemon";

import "./App.css";

function getCurrentDayNumber(): number {
  const today = new Date();

  return Math.floor(
    Date.UTC(
      today.getFullYear(),
      today.getMonth(),
      today.getDate()
    ) / 86400000
  );
}

const currentDayNumber =
  getCurrentDayNumber();

export default function App() {
  const [pokemon, setPokemon] =
    useState<PokemonSummary[]>([]);

  const [
    selectedPokemon,
    setSelectedPokemon,
  ] =
    useState<PokemonSummary | null>(
      null
    );

  const [searchTerm, setSearchTerm] =
    useState("");

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState<string | null>(null);

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    fetch(
      "https://pokeapi.co/api/v2/pokemon?limit=60"
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error(
            "Failed to load Pokémon"
          );
        }

        return response.json() as Promise<PokemonListApiResponse>;
      })
      .then((data) => {
        const pokemonList:
          PokemonSummary[] =
          data.results.map((item) => ({
            id: getPokemonIdFromUrl(
              item.url
            ),
            name: item.name,
            url: item.url,
          }));

        setPokemon(pokemonList);
        setLoading(false);
      })
      .catch((error: unknown) => {
        const message =
          error instanceof Error
            ? error.message
            : "Unknown error";

        setError(message);
        setLoading(false);
      });
  }, []);

  const filteredPokemon =
    filterPokemonByName(
      pokemon,
      searchTerm
    );

  const pokemonRouteMatch =
    location.pathname.match(
      /^\/pokemon\/(\d+)$/
    );

  const routePokemonId =
    pokemonRouteMatch
      ? Number(pokemonRouteMatch[1])
      : null;

  const routePokemon =
    routePokemonId !== null
      ? pokemon.find(
          (item) =>
            item.id ===
            routePokemonId
        ) ?? null
      : null;

  const activePokemon =
    pokemonRouteMatch
      ? routePokemon
      : selectedPokemon;

  const pokemonOfTheDay =
    getPokemonOfTheDay(
      pokemon,
      currentDayNumber
    );

  function handlePokemonSelect(
    pokemonToSelect: PokemonSummary
  ) {
    setSelectedPokemon(
      pokemonToSelect
    );

    setSearchTerm("");

    navigate(
      `/pokemon/${pokemonToSelect.id}`
    );
  }

  function openDailyPage() {
    setSearchTerm("");
    navigate("/daily");
  }

  function openDiscoverPage() {
    setSearchTerm("");
    navigate("/discover");
  }

  let scannerStatus = "STANDBY";

  if (
    location.pathname === "/daily"
  ) {
    scannerStatus = "DAILY MODE";
  } else if (
    location.pathname ===
    "/discover"
  ) {
    scannerStatus =
      "DISCOVERY MODE";
  } else if (activePokemon) {
    scannerStatus =
      "TARGET SELECTED";
  }

  const isDiscoverPage =
    location.pathname ===
    "/discover";

  return (
    <div className="app">
      <header className="app-header">
        <div
          className="device-lights"
          aria-hidden="true"
        >
          <span className="sensor-lens" />
          <span className="indicator light-red" />
          <span className="indicator light-yellow" />
          <span className="indicator light-green" />
        </div>

        <div className="header-title">
          <p className="eyebrow">
            Your field companion
          </p>

          <h1>
            Pokédex{" "}
            <span>Explorer</span>
          </h1>
        </div>

        <div className="system-label">
          <span className="status-dot" />

          Pokédex system

          <span className="system-version">
            NATIONAL DATABASE / V2.0
          </span>
        </div>
      </header>

      <nav
        className="pokedex-nav"
        aria-label="Pokédex navigation"
      >
        <NavLink
          to="/"
          end
          className={({
            isActive,
          }) =>
            isActive
              ? "active"
              : ""
          }
        >
          Database
        </NavLink>

        <NavLink
          to="/daily"
          className={({
            isActive,
          }) =>
            isActive
              ? "active"
              : ""
          }
        >
          Daily
        </NavLink>

        <NavLink
          to="/discover"
          className={({
            isActive,
          }) =>
            isActive
              ? "active"
              : ""
          }
        >
          Discover
        </NavLink>
      </nav>

      <main className="pokedex-layout">
        <section
          className="pokemon-list-panel"
          aria-labelledby="database-heading"
        >
          <div className="panel-heading">
            <div>
              <p className="eyebrow">
                01 / Discovery
              </p>

              <h2 id="database-heading">
                Pokémon database
              </h2>
            </div>

            <span
              className="panel-symbol"
              aria-hidden="true"
            >
              ≡
            </span>
          </div>

          <p className="panel-description">
            Find a Pokémon. Start
            exploring.
          </p>

          <div className="discovery-tools">
            {!loading &&
              !error &&
              pokemonOfTheDay && (
                <button
                  type="button"
                  className="daily-pokemon-card"
                  onClick={
                    openDailyPage
                  }
                >
                  <div className="daily-card-copy">
                    <div className="daily-card-topline">
                      <span className="daily-label">
                        Pokémon of the day
                      </span>

                      <span className="daily-cycle">
                        24H
                      </span>
                    </div>

                    <div className="daily-pokemon-title">
                      <span className="daily-pokemon-id">
                        #
                        {String(
                          pokemonOfTheDay.id
                        ).padStart(
                          3,
                          "0"
                        )}
                      </span>

                      <strong>
                        {
                          pokemonOfTheDay.name
                        }
                      </strong>
                    </div>

                    <span className="daily-action">
                      Open daily mode

                      <span
                        aria-hidden="true"
                      >
                        →
                      </span>
                    </span>
                  </div>

                  <div
                    className="daily-pokemon-art"
                    aria-hidden="true"
                  >
                    <span className="daily-scan-ring" />

                    <img
                      src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonOfTheDay.id}.png`}
                      alt=""
                    />
                  </div>
                </button>
              )}

            <div className="database-actions">
              <button
                type="button"
                className="random-pokemon-button"
                onClick={
                  openDiscoverPage
                }
                disabled={
                  loading ||
                  Boolean(error) ||
                  pokemon.length ===
                    0 ||
                  isDiscoverPage
                }
              >
                <span
                  className="random-button-icon"
                  aria-hidden="true"
                >
                  ◉
                </span>

                {isDiscoverPage
                  ? "Discovery mode active"
                  : "Open discovery mode"}
              </button>
            </div>
          </div>

          <SearchBar
            searchTerm={searchTerm}
            onSearch={
              setSearchTerm
            }
          />

          <div className="list-caption">
            <span>
              DATABASE ENTRIES
            </span>

            <span role="status">
              {loading
                ? "CONNECTING"
                : error
                  ? "OFFLINE"
                  : `${filteredPokemon.length} / ${pokemon.length}`}
            </span>
          </div>

          {loading ? (
            <div
              className="database-message"
              role="status"
            >
              <span
                className="scanner-loader"
                aria-hidden="true"
              />

              <h3>
                Scanning database…
              </h3>

              <p>
                Connecting to the
                Pokémon world.
              </p>
            </div>
          ) : error ? (
            <div
              className="database-message error-message"
              role="alert"
            >
              <span
                className="signal-icon"
                aria-hidden="true"
              >
                !
              </span>

              <h3>
                Connection error
              </h3>

              <p>
                Unable to reach the
                Pokédex database.
              </p>

              <p className="error-detail">
                {error}
              </p>

              <p>
                Refresh the page to
                reconnect.
              </p>
            </div>
          ) : (
            <PokemonList
              pokemon={
                filteredPokemon
              }
              selectedPokemon={
                activePokemon
              }
              onSelect={
                handlePokemonSelect
              }
            />
          )}

          <div
            className={`list-footer${
              error
                ? " offline"
                : ""
            }`}
          >
            <span className="status-dot" />

            <span>
              {loading
                ? "Establishing connection"
                : error
                  ? "Database offline"
                  : "PokéAPI connection established"}
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
              <p className="eyebrow">
                02 / Field research
              </p>

              <h2 id="scanner-heading">
                Pokémon scanner
              </h2>
            </div>

            <span className="scanner-status">
              {scannerStatus}
            </span>
          </div>

          <Routes>
            <Route
              path="/"
              element={
                <PokedexPage
                  selectedPokemon={
                    selectedPokemon
                  }
                />
              }
            />

            <Route
              path="/pokemon/:id"
              element={
                <PokemonPage
                  pokemon={pokemon}
                  loading={loading}
                />
              }
            />

            <Route
              path="/daily"
              element={
                <DailyPage
                  pokemon={
                    pokemonOfTheDay
                  }
                  loading={loading}
                  error={error}
                  onOpenPokemon={
                    handlePokemonSelect
                  }
                />
              }
            />

            <Route
              path="/discover"
              element={
                <DiscoverPage
                  pokemon={pokemon}
                  loading={loading}
                  error={error}
                  onOpenPokemon={
                    handlePokemonSelect
                  }
                />
              }
            />

            <Route
              path="*"
              element={
                <div className="details-message error-message">
                  <span
                    className="signal-icon"
                    aria-hidden="true"
                  >
                    !
                  </span>

                  <h3>
                    Page not found
                  </h3>

                  <p>
                    This Pokédex route
                    does not exist.
                  </p>
                </div>
              }
            />
          </Routes>
        </section>
      </main>

      <footer className="device-footer">
        <span
          className="speaker-grille"
          aria-hidden="true"
        />

        <p>
          Discover. Scan. Explore.
        </p>

        <span className="footer-credit">
          Powered by PokéAPI
        </span>
      </footer>
    </div>
  );
}