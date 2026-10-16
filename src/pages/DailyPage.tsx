import type { PokemonSummary } from "../types/pokemon";

interface DailyPageProps {
  pokemon: PokemonSummary | null;
  loading: boolean;
  error: string | null;
  onOpenPokemon: (pokemon: PokemonSummary) => void;
}

export default function DailyPage({
  pokemon,
  loading,
  error,
  onOpenPokemon,
}: DailyPageProps) {
  if (loading) {
    return (
      <div className="details-message" role="status">
        <span className="scanner-loader" aria-hidden="true" />
        <h3>Calculating daily entry…</h3>
        <p>Synchronizing with the Pokédex calendar.</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="details-message error-message" role="alert">
        <span className="signal-icon" aria-hidden="true">
          !
        </span>

        <h3>Daily scan unavailable</h3>
        <p>{error}</p>
      </div>
    );
  }

  if (!pokemon) {
    return (
      <div className="details-message">
        <h3>No daily Pokémon available</h3>
      </div>
    );
  }

  return (
    <div className="feature-page daily-page">
      <div className="feature-page-header">
        <p className="eyebrow">Daily research protocol</p>
        <h3>Pokémon of the Day</h3>

        <p>
          One Pokédex entry is selected every calendar day.
          The same Pokémon remains active until the next day.
        </p>
      </div>

      <div className="feature-display daily-feature-display">
        <div className="feature-art">
          <span className="feature-scan-ring" aria-hidden="true" />

          <img
            src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png`}
            alt={`${pokemon.name} sprite`}
          />
        </div>

        <div className="feature-info">
          <span className="feature-kicker">
            DAILY ENTRY / 24H
          </span>

          <span className="feature-id">
            #{String(pokemon.id).padStart(3, "0")}
          </span>

          <h4>{pokemon.name.replaceAll("-", " ")}</h4>

          <p>
            Today&apos;s automatically selected Pokémon is ready
            for a full field scan.
          </p>
        </div>
      </div>

      <div className="feature-actions">
        <button
          type="button"
          className="feature-primary-button daily-action-button"
          onClick={() => onOpenPokemon(pokemon)}
        >
          Open full Pokédex entry →
        </button>
      </div>

      <p className="feature-note">
        The daily entry is calculated from the current calendar
        date, so refreshing the page does not change it.
      </p>
    </div>
  );
}