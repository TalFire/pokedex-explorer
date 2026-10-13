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
      <div>
        <h2>Pokémon Details</h2>
        <p>Pick a Pokémon from the list</p>
      </div>
    );
  }

  if (loadingDetails) {
    return (
      <div>
        <h2>Pokémon Details</h2>
        <p>Loading details...</p>
      </div>
    );
  }

  if (errorDetails) {
    return (
      <div>
        <h2>Pokémon Details</h2>
        <p>Error: {errorDetails}</p>
      </div>
    );
  }

  if (!details) {
    return null;
  }

  return (
    <div>
      <h2>Pokémon Details</h2>

      <img
        src={details.sprites.front_default}
        alt={details.name}
      />

      <h3>{details.name}</h3>

      <p>ID: #{details.id}</p>

      <p>
        Type:{" "}
        {details.types.map((item) => item.type.name).join(", ")}
      </p>

      <p>Height: {details.height}</p>

      <p>Weight: {details.weight}</p>

      <h4>Abilities</h4>

      <ul>
        {details.abilities.map((item) => (
          <li key={item.ability.name}>
            {item.ability.name}
          </li>
        ))}
      </ul>

      <h4>Base Stats</h4>

      <ul>
        {details.stats.map((item) => (
          <li key={item.stat.name}>
            {item.stat.name}: {item.base_stat}
          </li>
        ))}
      </ul>
    </div>
  );
}