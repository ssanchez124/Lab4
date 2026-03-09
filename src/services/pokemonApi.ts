export interface Pokemon {
  name: string;
  sprites: {
    front_default: string | null;
  };
  types: Array<{ type: { name: string } }>;
  abilities: Array<{ ability: { name: string } }>;
  moves: Array<{ move: { name: string } }>;
}

function parsePokemon(data: any): Pokemon {
  return {
    name: data.name,
    sprites: {
      front_default: data.sprites?.front_default ?? null,
    },
    types: data.types || [],
    abilities: data.abilities || [],
    moves: data.moves || [],
  };
}

export async function fetchPokemon(name: string): Promise<Pokemon> {
  const q = name.trim().toLowerCase();
  if (!q) {
    throw new Error("Pokemon name must be provided");
  }

  const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${q}`);
  if (!response.ok) {
    throw new Error(`Pokemon not found: ${name}`);
  }

  const json = await response.json();
  return parsePokemon(json);
}
