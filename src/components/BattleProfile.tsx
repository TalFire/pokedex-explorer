import { useEffect, useState } from "react";

import type {
  PokemonTypeApiResponse,
  PokemonTypeSlot,
} from "../types/pokemon";

const typeOrder = [
  "normal",
  "fire",
  "water",
  "electric",
  "grass",
  "ice",
  "fighting",
  "poison",
  "ground",
  "flying",
  "psychic",
  "bug",
  "rock",
  "ghost",
  "dragon",
  "dark",
  "steel",
  "fairy",
];

interface BattleEntry {
  name: string;
  multiplier: number;
}

interface BattleProfileData {
  strongAgainst: BattleEntry[];
  weaknesses: BattleEntry[];
  resistances: BattleEntry[];
  immunities: BattleEntry[];
}

interface BattleProfileProps {
  types: PokemonTypeSlot[];
}

interface BattleState {
  key: string;
  data: BattleProfileData | null;
  error: string | null;
}

interface BattleGroupProps {
  title: string;
  code: string;
  items: BattleEntry[];
  className: string;
  emptyText: string;
}

function calculateBattleProfile(
  typeData: PokemonTypeApiResponse[]
): BattleProfileData {
  const defensiveMultipliers: Record<string, number> =
    {};

  typeOrder.forEach((type) => {
    defensiveMultipliers[type] = 1;
  });

  typeData.forEach((type) => {
    const relations = type.damage_relations;

    relations.double_damage_from.forEach((item) => {
      defensiveMultipliers[item.name] *= 2;
    });

    relations.half_damage_from.forEach((item) => {
      defensiveMultipliers[item.name] *= 0.5;
    });

    relations.no_damage_from.forEach((item) => {
      defensiveMultipliers[item.name] = 0;
    });
  });

  const weaknesses = typeOrder
    .filter(
      (type) =>
        defensiveMultipliers[type] > 1
    )
    .map((type) => ({
      name: type,
      multiplier:
        defensiveMultipliers[type],
    }))
    .sort(
      (a, b) =>
        b.multiplier - a.multiplier ||
        a.name.localeCompare(b.name)
    );

  const resistances = typeOrder
    .filter(
      (type) =>
        defensiveMultipliers[type] > 0 &&
        defensiveMultipliers[type] < 1
    )
    .map((type) => ({
      name: type,
      multiplier:
        defensiveMultipliers[type],
    }))
    .sort(
      (a, b) =>
        a.multiplier - b.multiplier ||
        a.name.localeCompare(b.name)
    );

  const immunities = typeOrder
    .filter(
      (type) =>
        defensiveMultipliers[type] === 0
    )
    .map((type) => ({
      name: type,
      multiplier: 0,
    }));

  const strongAgainstNames =
    new Set<string>();

  typeData.forEach((type) => {
    type.damage_relations.double_damage_to.forEach(
      (item) => {
        strongAgainstNames.add(item.name);
      }
    );
  });

  const strongAgainst = typeOrder
    .filter((type) =>
      strongAgainstNames.has(type)
    )
    .map((type) => ({
      name: type,
      multiplier: 2,
    }));

  return {
    strongAgainst,
    weaknesses,
    resistances,
    immunities,
  };
}

function formatMultiplier(
  multiplier: number
): string {
  return `×${multiplier}`;
}

function BattleGroup({
  title,
  code,
  items,
  className,
  emptyText,
}: BattleGroupProps) {
  return (
    <div
      className={`battle-group ${className}`}
    >
      <div className="battle-group-heading">
        <span>{title}</span>
        <span>{code}</span>
      </div>

      {items.length > 0 ? (
        <div className="battle-type-list">
          {items.map((item) => (
            <div
              className={`battle-type-chip type-${item.name}`}
              key={item.name}
            >
              <span className="battle-type-name">
                {item.name}
              </span>

              <span className="battle-multiplier">
                {formatMultiplier(
                  item.multiplier
                )}
              </span>
            </div>
          ))}
        </div>
      ) : (
        <p className="battle-empty">
          {emptyText}
        </p>
      )}
    </div>
  );
}

export default function BattleProfile({
  types,
}: BattleProfileProps) {
  const typeUrls = types.map(
    (item) => item.type.url
  );

  const requestKey =
    typeUrls.join("|");

  const [battleState, setBattleState] =
    useState<BattleState>({
      key: "",
      data: null,
      error: null,
    });

  useEffect(() => {
    if (!requestKey) {
      return;
    }

    const controller =
      new AbortController();

    const urls =
      requestKey.split("|");

    Promise.all(
      urls.map((url) =>
        fetch(url, {
          signal: controller.signal,
        }).then((response) => {
          if (!response.ok) {
            throw new Error(
              "Failed to load battle information"
            );
          }

          return response.json() as Promise<PokemonTypeApiResponse>;
        })
      )
    )
      .then((typeData) => {
        if (
          controller.signal.aborted
        ) {
          return;
        }

        setBattleState({
          key: requestKey,
          data:
            calculateBattleProfile(
              typeData
            ),
          error: null,
        });
      })
      .catch((error: unknown) => {
        if (
          controller.signal.aborted
        ) {
          return;
        }

        const message =
          error instanceof Error
            ? error.message
            : "Unknown error";

        setBattleState({
          key: requestKey,
          data: null,
          error: message,
        });
      });

    return () =>
      controller.abort();
  }, [requestKey]);

  const isCurrentResult =
    battleState.key === requestKey;

  if (!isCurrentResult) {
    return (
      <section
        className="battle-profile"
        aria-labelledby="battle-heading"
      >
        <div className="battle-profile-message">
          <span
            className="battle-mini-loader"
            aria-hidden="true"
          />

          <div>
            <h4
              id="battle-heading"
              className="section-heading"
            >
              Battle profile
              <span>
                CALCULATING MATCHUPS
              </span>
            </h4>

            <p>
              Analyzing type effectiveness…
            </p>
          </div>
        </div>
      </section>
    );
  }

  if (battleState.error) {
    return (
      <section
        className="battle-profile"
        aria-labelledby="battle-heading"
      >
        <h4
          id="battle-heading"
          className="section-heading"
        >
          Battle profile
          <span>TYPE ANALYSIS</span>
        </h4>

        <p className="battle-profile-error">
          Battle analysis unavailable:{" "}
          {battleState.error}
        </p>
      </section>
    );
  }

  if (!battleState.data) {
    return null;
  }

  const {
    strongAgainst,
    weaknesses,
    resistances,
    immunities,
  } = battleState.data;

  return (
    <section
      className="battle-profile"
      aria-labelledby="battle-heading"
    >
      <h4
        id="battle-heading"
        className="section-heading"
      >
        Battle profile
        <span>TYPE EFFECTIVENESS</span>
      </h4>

      <div className="battle-profile-grid">
        <BattleGroup
          title="Strong against"
          code="ATK"
          items={strongAgainst}
          className="battle-strong"
          emptyText="No natural type advantage"
        />

        <BattleGroup
          title="Weak to"
          code="DMG+"
          items={weaknesses}
          className="battle-weak"
          emptyText="No type weaknesses"
        />

        <BattleGroup
          title="Resists"
          code="DMG−"
          items={resistances}
          className="battle-resist"
          emptyText="No type resistances"
        />

        <BattleGroup
          title="Immune to"
          code="NULL"
          items={immunities}
          className="battle-immune"
          emptyText="No type immunities"
        />
      </div>

      <p className="battle-profile-note">
        Defensive multipliers combine all Pokémon
        types. Strong against means at least one of
        this Pokémon&apos;s own types is super
        effective against the listed type.
      </p>
    </section>
  );
}