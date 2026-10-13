import { useEffect, useState } from "react";

const statLabels = {
  hp: "HP", attack: "Attack", defense: "Defense",
  "special-attack": "Special Attack", "special-defense": "Special Defense", speed: "Speed",
};

export default function PokemonDetails({ pokemon }) {
  const [details, setDetails] = useState(null);
  const [loadingDetails, setLoadingDetails] = useState(false);
  const [errorDetails, setErrorDetails] = useState(null);

  useEffect(() => {
    if (!pokemon) {
      setDetails(null);
      return;
    }
    // Cancel the previous scan when selection changes or the component unmounts.
    const controller = new AbortController();
    setLoadingDetails(true);
    setErrorDetails(null);
    setDetails(null);
    fetch(pokemon.url, { signal: controller.signal })
      .then((response) => {
        if (!response.ok) throw new Error("Failed to load Pokémon details");
        return response.json();
      })
      .then((data) => {
        if (controller.signal.aborted) return;
        setDetails(data);
        setLoadingDetails(false);
      })
      .catch((error) => {
        if (controller.signal.aborted) return;
        setErrorDetails(error.message);
        setLoadingDetails(false);
      });
    return () => controller.abort();
  }, [pokemon]);

  if (!pokemon) {
    return (
      <div className="details-message idle-screen">
        <div className="idle-radar" aria-hidden="true"><div className="pokeball" /></div>
        <span className="eyebrow">Awaiting discovery</span>
        <h3>Pokédex ready</h3>
        <p>Select a Pokémon from the database<br />to begin scanning.</p>
        <span className="idle-hint"><span className="status-dot" /> Scanner online · Ready to explore</span>
      </div>
    );
  }
  // The ID guard keeps the previous profile out of the new selection's render.
  if (loadingDetails || (!errorDetails && details?.id !== pokemon.id)) {
    return (
      <div className="details-message" role="status">
        <span className="scanner-loader" aria-hidden="true" />
        <span className="eyebrow">Target #{String(pokemon.id).padStart(3, "0")}</span>
        <h3>Analyzing Pokémon…</h3>
        <p>Reading the profile for <span className="pokemon-name">{pokemon.name}</span>.</p>
      </div>
    );
  }
  if (errorDetails) {
    return (
      <div className="details-message error-message" role="alert">
        <span className="signal-icon" aria-hidden="true">!</span>
        <h3>Scan interrupted</h3>
        <p>Unable to retrieve this Pokémon’s profile.</p>
        <p className="error-detail">{errorDetails}</p>
        <p>Select another Pokémon, then return to retry.</p>
      </div>
    );
  }
  const artwork = details.sprites.other?.["official-artwork"]?.front_default || details.sprites.front_default;
  return (
    <article className={`pokemon-details type-${details.types[0]?.type.name}`} key={details.id}>
      <div className="profile-heading">
        <div>
          <p className="details-id">ENTRY #{String(details.id).padStart(3, "0")}</p>
          <h3>{details.name.replaceAll("-", " ")}</h3>
        </div>
        <span className="profile-confirmed">
          <span className="status-dot" /> Identified
        </span>
      </div>
      <div className="artwork-screen">
        <span className="artwork-label">LIVE SPECIMEN VIEW</span>
        <div className="scan-ring" aria-hidden="true" />
        {artwork ? (
          <img
            className="pokemon-image"
            src={artwork}
            alt={`Official artwork of ${details.name}`}
          />
        ) : <p>Artwork unavailable</p>}
        <span className="artwork-coordinate" aria-hidden="true">SCAN / {String(details.id).padStart(3, "0")}</span>
      </div>
      <div className="pokemon-types" aria-label="Pokémon types">
        {details.types.map((item) => (
          <span className={`type-badge type-${item.type.name}`} key={item.type.name}>
            {item.type.name}
          </span>
        ))}
      </div>
      <section className="about-section" aria-labelledby="about-heading">
        <h4 id="about-heading" className="section-heading">
          About <span>SPECIMEN DATA</span>
        </h4>
        <dl className="measurements">
          <div>
            <dt>Height</dt>
            <dd>{(details.height / 10).toFixed(1)} <span>m</span></dd>
          </div>
          <div>
            <dt>Weight</dt>
            <dd>{(details.weight / 10).toFixed(1)} <span>kg</span></dd>
          </div>
        </dl>
      </section>
      <section className="abilities-section" aria-labelledby="abilities-heading">
        <h4 id="abilities-heading" className="section-heading">Abilities</h4>
        <ul className="ability-chips">
          {details.abilities.map((item) => (
            <li key={item.ability.name}>
              {item.ability.name.replaceAll("-", " ")}
              {item.is_hidden && <span className="hidden-label">Hidden</span>}
            </li>
          ))}
        </ul>
      </section>
      <section className="stats-section" aria-labelledby="stats-heading">
        <h4 id="stats-heading" className="section-heading">
          Base stats <span>0–255 SCALE</span>
        </h4>
        <ul className="stat-list">
          {details.stats.map((item) => (
            <li className={`stat-row stat-${item.stat.name}`} key={item.stat.name}>
              <span className="stat-label">{statLabels[item.stat.name] || item.stat.name}</span>
              <span className="stat-value">{item.base_stat}</span>
              <meter
                min="0"
                max="255"
                value={item.base_stat}
                aria-label={`${statLabels[item.stat.name] || item.stat.name}: ${item.base_stat} out of 255`}
              />
            </li>
          ))}
        </ul>
        <p className="stat-note">Base values, not percentages. Each bar uses the same 255-point scale.</p>
      </section>
    </article>
  );
}
