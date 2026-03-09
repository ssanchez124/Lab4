import { Pokemon } from '../models/Pokemon';
import { PokemonBuilder } from '../models/PokemonBuilder';

function parsePokemon(data: any): Pokemon {
  const builder = new PokemonBuilder()
    .setName(data.name)
    .setImage(data.sprites?.front_default ?? '')
    .setTypes(data.types?.map((t: any) => t.type.name) || [])
    .setAbilities(data.abilities?.map((a: any) => a.ability.name) || [])
    .setMoves(data.moves?.map((m: any) => m.move.name) || []);

  return builder.build();
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
