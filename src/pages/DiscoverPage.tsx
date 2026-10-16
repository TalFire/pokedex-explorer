import { useState } from "react";

import type {
  PokemonSummary,
} from "../types/pokemon";

import {
  chooseRandomPokemon,
} from "../utils/pokemon";

interface DiscoverPageProps {
  pokemon: PokemonSummary[];
  loading: boolean;
  error: string | null;

  onOpenPokemon: (
    pokemon: PokemonSummary
  ) => void;
}

export default function DiscoverPage({
  pokemon,
  loading,
  error,
  onOpenPokemon,
}: DiscoverPageProps) {
  const [
    discoveredPokemon,
    setDiscoveredPokemon,
  ] =
    useState<PokemonSummary | null>(
      null
    );

  function handleRandomScan() {
    const randomPokemon =
      chooseRandomPokemon(
        pokemon,
        discoveredPokemon?.id ??
          null
      );

    if (!randomPokemon) {
      return;
    }

    setDiscoveredPokemon(
      randomPokemon
    );
  }

  if (loading) {
    return (
      <div
        className="details-message"
        role="status"
      >
        <span
          className="scanner-loader"
          aria-hidden="true"
        />

        <h3>
          Loading discovery database…
        </h3>

        <p>
          Preparing available Pokémon
          entries.
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div
        className="details-message error-message"
        role="alert"
      >
        <span
          className="signal-icon"
          aria-hidden="true"
        >
          !
        </span>

        <h3>
          Discovery mode unavailable
        </h3>

        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="feature-page discover-page">
      <div className="feature-page-header">
        <p className="eyebrow">
          Exploration protocol
        </p>

        <h3>
          Random Discovery
        </h3>

        <p>
          Let the Pokédex select a
          random entry from the current
          database.
        </p>
      </div>

      {discoveredPokemon ? (
        <div className="feature-display discover-feature-display">
          <div className="feature-art">
            <span
              className="feature-scan-ring"
              aria-hidden="true"
            />

            <img
              src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${discoveredPokemon.id}.png`}
              alt={`${discoveredPokemon.name} sprite`}
            />
          </div>

          <div className="feature-info">
            <span className="feature-kicker">
              RANDOM SIGNAL ACQUIRED
            </span>

            <span className="feature-id">
              #
              {String(
                discoveredPokemon.id
              ).padStart(3, "0")}
            </span>

            <h4>
              {discoveredPokemon.name.replaceAll(
                "-",
                " "
              )}
            </h4>

            <p>
              A random Pokémon has
              been detected. Run
              another scan or open
              the complete Pokédex
              entry.
            </p>
          </div>
        </div>
      ) : (
        <div className="feature-empty">
          <div
            className="idle-radar"
            aria-hidden="true"
          >
            <div className="pokeball" />
          </div>

          <span className="eyebrow">
            Scanner standing by
          </span>

          <h4>
            Ready for discovery
          </h4>

          <p>
            Start a random scan to
            discover a Pokémon.
          </p>
        </div>
      )}

      <div className="feature-actions">
        <button
          type="button"
          className="feature-primary-button discover-action-button"
          onClick={
            handleRandomScan
          }
        >
          ⟳{" "}
          {discoveredPokemon
            ? "Scan again"
            : "Start random scan"}
        </button>

        {discoveredPokemon && (
          <button
            type="button"
            className="feature-secondary-button"
            onClick={() =>
              onOpenPokemon(
                discoveredPokemon
              )
            }
          >
            Open full entry →
          </button>
        )}
      </div>

      <p className="feature-note">
        Random Discovery uses the
        Pokémon already loaded from
        PokéAPI and does not require
        an additional API request.
      </p>
    </div>
  );
}