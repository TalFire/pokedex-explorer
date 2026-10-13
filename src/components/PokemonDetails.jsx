import { useEffect, useState } from "react";

export default function PokemonDetails({ pokemon }) {
  const [details, setDetails] = useState(null);
  const [loadingDetails, setLoadingDetails] = useState(false);
  const [errorDetails, setErrorDetails] = useState(null);

  useEffect(() => {
    if (!pokemon) {
      setDetails(null);
      return;
    }

    setLoadingDetails(true);
    setErrorDetails(null);

    fetch(pokemon.url)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to load Pokémon details");
        }

        return response.json();
      })
      .then((data) => {
        setDetails(data);
        setLoadingDetails(false);
      })
      .catch((error) => {
        setErrorDetails(error.message);
        setLoadingDetails(false);
      });
  }, [pokemon]);

  if (!pokemon) {
    return (
      <div className="details-message">
        <h2>Pokémon Details</h2>
        <p>Select a Pokémon from the list.</p>
      </div>
    );
  }

  if (loadingDetails) {
    return (
      <div className="details-message">
        <p>Loading Pokémon details...</p>
      </div>
    );
  }

  if (errorDetails) {
    return (
      <div className="details-message">
        <p>Error: {errorDetails}</p>
      </div>
    );
  }

  if (!details) {
    return null;
  }

  return (
    <article className="pokemon-details">
      <img
        className="pokemon-image"
        src={
          details.sprites.other["official-artwork"].front_default ||
          details.sprites.front_default
        }
        alt={details.name}
      />

      <p className="details-id">
        #{String(details.id).padStart(3, "0")}
      </p>

      <h2>{details.name}</h2>

      <div className="pokemon-types">
        {details.types.map((item) => (
          <span key={item.type.name}>
            {item.type.name}
          </span>
        ))}
      </div>

      <section>
        <h3>About</h3>

        <p>
          Height: {(details.height / 10).toFixed(1)} m
        </p>

        <p>
          Weight: {(details.weight / 10).toFixed(1)} kg
        </p>
      </section>

      <section>
        <h3>Abilities</h3>

        <ul>
          {details.abilities.map((item) => (
            <li key={item.ability.name}>
              {item.ability.name}
            </li>
          ))}
        </ul>
      </section>

      <section>
        <h3>Base Stats</h3>

        <ul>
          {details.stats.map((item) => (
            <li key={item.stat.name}>
              {item.stat.name}: {item.base_stat}
            </li>
          ))}
        </ul>
      </section>
    </article>
  );
}