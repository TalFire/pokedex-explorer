import {
  useEffect,
  useState,
} from "react";

import {
  useNavigate,
} from "react-router-dom";

import type {
  EvolutionChainApiResponse,
  EvolutionChainNode,
  EvolutionDetail,
  PokemonSpeciesApiResponse,
} from "../types/pokemon";

import "./EvolutionChain.css";

interface EvolutionChainProps {
  speciesUrl: string;
}

interface EvolutionRequestState {
  speciesUrl: string;
  chain: EvolutionChainNode | null;
  error: string | null;
}

interface EvolutionTransitionProps {
  detail:
    | EvolutionDetail
    | undefined;

  branched?: boolean;
}

interface EvolutionNodeProps {
  node: EvolutionChainNode;
}

function getIdFromUrl(
  url: string
): number | null {
  const value = url
    .split("/")
    .filter(Boolean)
    .pop();

  const id = Number(value);

  return Number.isInteger(id)
    ? id
    : null;
}

function formatName(
  value: string
): string {
  return value
    .replaceAll("-", " ")
    .replace(/\b\w/g, (letter) =>
      letter.toUpperCase()
    );
}

function getEvolutionCondition(
  detail: EvolutionDetail | undefined
): string {
  if (!detail) {
    return "Evolves";
  }

  if (
    detail.trigger.name ===
      "use-item" &&
    detail.item
  ) {
    return `Use ${formatName(
      detail.item.name
    )}`;
  }

  if (
    detail.trigger.name ===
      "trade" &&
    detail.held_item
  ) {
    return `Trade + ${formatName(
      detail.held_item.name
    )}`;
  }

  if (
    detail.trigger.name ===
    "trade"
  ) {
    return "Trade";
  }

  if (
    detail.trigger.name ===
      "level-up" &&
    detail.min_level !== null
  ) {
    return `Level ${detail.min_level}`;
  }

  if (
    detail.min_happiness !== null
  ) {
    const timeCondition =
      detail.time_of_day
        ? ` / ${formatName(
            detail.time_of_day
          )}`
        : "";

    return `Happiness ${detail.min_happiness}+${timeCondition}`;
  }

  if (detail.held_item) {
    return `Hold ${formatName(
      detail.held_item.name
    )}`;
  }

  if (detail.time_of_day) {
    return formatName(
      detail.time_of_day
    );
  }

  return formatName(
    detail.trigger.name
  );
}

function EvolutionTransition({
  detail,
  branched = false,
}: EvolutionTransitionProps) {
  return (
    <div
      className={
        branched
          ? "evolution-transition evolution-transition-branch"
          : "evolution-transition"
      }
    >
      <span
        className="evolution-arrow"
        aria-hidden="true"
      >
        ↓
      </span>

      <span className="evolution-condition">
        {getEvolutionCondition(
          detail
        )}
      </span>
    </div>
  );
}

function EvolutionPokemonCard({
  node,
}: EvolutionNodeProps) {
  const navigate = useNavigate();

  const pokemonId =
    getIdFromUrl(
      node.species.url
    );

  function openPokemon() {
    if (pokemonId === null) {
      return;
    }

    navigate(
      `/pokemon/${pokemonId}`
    );
  }

  return (
    <button
      type="button"
      className="evolution-pokemon-card"
      onClick={openPokemon}
      disabled={
        pokemonId === null
      }
      aria-label={
        pokemonId !== null
          ? `Open ${formatName(
              node.species.name
            )} Pokédex entry`
          : undefined
      }
    >
      <div className="evolution-sprite-screen">
        <span
          className="evolution-scan-circle"
          aria-hidden="true"
        />

        {pokemonId !== null ? (
          <img
            src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonId}.png`}
            alt=""
            loading="lazy"
          />
        ) : (
          <span className="evolution-no-image">
            ?
          </span>
        )}
      </div>

      <div className="evolution-pokemon-info">
        {pokemonId !== null && (
          <span className="evolution-id">
            #
            {String(
              pokemonId
            ).padStart(3, "0")}
          </span>
        )}

        <strong>
          {formatName(
            node.species.name
          )}
        </strong>

        {pokemonId !== null && (
          <span className="evolution-open-label">
            Open entry →
          </span>
        )}
      </div>
    </button>
  );
}

function EvolutionNode({
  node,
}: EvolutionNodeProps) {
  const children =
    node.evolves_to;

  return (
    <div className="evolution-node">
      <EvolutionPokemonCard
        node={node}
      />

      {children.length === 1 && (
        <div className="evolution-single-path">
          <EvolutionTransition
            detail={
              children[0]
                .evolution_details[0]
            }
          />

          <EvolutionNode
            node={children[0]}
          />
        </div>
      )}

      {children.length > 1 && (
        <div className="evolution-branch-section">
          <div className="evolution-branch-origin">
            <span>
              {children.length} possible
              evolutions
            </span>
          </div>

          <div className="evolution-branch-grid">
            {children.map(
              (child) => (
                <div
                  className="evolution-branch"
                  key={
                    child.species.name
                  }
                >
                  <EvolutionTransition
                    detail={
                      child
                        .evolution_details[0]
                    }
                    branched
                  />

                  <EvolutionNode
                    node={child}
                  />
                </div>
              )
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default function EvolutionChain({
  speciesUrl,
}: EvolutionChainProps) {
  const [
    requestState,
    setRequestState,
  ] =
    useState<EvolutionRequestState>({
      speciesUrl: "",
      chain: null,
      error: null,
    });

  useEffect(() => {
    const controller =
      new AbortController();

    fetch(speciesUrl, {
      signal: controller.signal,
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(
            "Failed to load Pokémon species"
          );
        }

        return response.json() as Promise<PokemonSpeciesApiResponse>;
      })
      .then((speciesData) =>
        fetch(
          speciesData
            .evolution_chain.url,
          {
            signal:
              controller.signal,
          }
        )
      )
      .then((response) => {
        if (!response.ok) {
          throw new Error(
            "Failed to load evolution chain"
          );
        }

        return response.json() as Promise<EvolutionChainApiResponse>;
      })
      .then(
        (evolutionData) => {
          if (
            controller.signal
              .aborted
          ) {
            return;
          }

          setRequestState({
            speciesUrl,
            chain:
              evolutionData.chain,
            error: null,
          });
        }
      )
      .catch(
        (error: unknown) => {
          if (
            controller.signal
              .aborted
          ) {
            return;
          }

          const message =
            error instanceof Error
              ? error.message
              : "Unknown evolution error";

          setRequestState({
            speciesUrl,
            chain: null,
            error: message,
          });
        }
      );

    return () =>
      controller.abort();
  }, [speciesUrl]);

  const isCurrentResult =
    requestState.speciesUrl ===
    speciesUrl;

  if (!isCurrentResult) {
    return (
      <section
        className="evolution-section"
        aria-labelledby="evolution-heading"
      >
        <div className="evolution-loading">
          <span
            className="battle-mini-loader"
            aria-hidden="true"
          />

          <div>
            <h4
              id="evolution-heading"
              className="section-heading"
            >
              Evolution chain

              <span>
                ANALYZING SPECIES
              </span>
            </h4>

            <p>
              Retrieving evolution
              records…
            </p>
          </div>
        </div>
      </section>
    );
  }

  if (requestState.error) {
    return (
      <section
        className="evolution-section"
        aria-labelledby="evolution-heading"
      >
        <h4
          id="evolution-heading"
          className="section-heading"
        >
          Evolution chain

          <span>
            SPECIES DATA
          </span>
        </h4>

        <p className="evolution-error">
          Evolution data unavailable:{" "}
          {requestState.error}
        </p>
      </section>
    );
  }

  if (!requestState.chain) {
    return null;
  }

  return (
    <section
      className="evolution-section"
      aria-labelledby="evolution-heading"
    >
      <h4
        id="evolution-heading"
        className="section-heading"
      >
        Evolution chain

        <span>
          SPECIES DEVELOPMENT
        </span>
      </h4>

      <div className="evolution-tree">
        <EvolutionNode
          node={
            requestState.chain
          }
        />
      </div>

      <p className="evolution-note">
        Select an evolution stage to
        open its full Pokédex entry.
      </p>
    </section>
  );
}