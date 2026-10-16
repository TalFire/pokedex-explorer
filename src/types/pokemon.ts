export interface PokemonSummary {
  id: number;
  name: string;
  url: string;
}

export interface NamedApiResource {
  name: string;
  url: string;
}

export interface PokemonListApiItem {
  name: string;
  url: string;
}

export interface PokemonListApiResponse {
  results: PokemonListApiItem[];
}

export interface PokemonTypeSlot {
  slot: number;
  type: NamedApiResource;
}

export interface PokemonAbility {
  ability: NamedApiResource;
  is_hidden: boolean;
  slot: number;
}

export interface PokemonStat {
  base_stat: number;
  effort: number;
  stat: NamedApiResource;
}

export interface PokemonDetailsData {
  id: number;
  name: string;
  height: number;
  weight: number;

  species: NamedApiResource;

  sprites: {
    front_default: string | null;

    other?: {
      "official-artwork"?: {
        front_default: string | null;
      };
    };
  };

  types: PokemonTypeSlot[];
  abilities: PokemonAbility[];
  stats: PokemonStat[];
}

export interface PokemonTypeDamageRelations {
  double_damage_from: NamedApiResource[];
  half_damage_from: NamedApiResource[];
  no_damage_from: NamedApiResource[];

  double_damage_to: NamedApiResource[];
  half_damage_to: NamedApiResource[];
  no_damage_to: NamedApiResource[];
}

export interface PokemonTypeApiResponse {
  damage_relations: PokemonTypeDamageRelations;
}

export interface PokemonSpeciesApiResponse {
  evolution_chain: {
    url: string;
  };
}

export interface EvolutionDetail {
  min_level: number | null;
  min_happiness: number | null;

  trigger: NamedApiResource;

  item: NamedApiResource | null;
  held_item: NamedApiResource | null;

  time_of_day: string;
}

export interface EvolutionChainNode {
  species: NamedApiResource;

  evolution_details: EvolutionDetail[];

  evolves_to: EvolutionChainNode[];
}

export interface EvolutionChainApiResponse {
  chain: EvolutionChainNode;
}