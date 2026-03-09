import React from 'react';
import { usePokemonController } from '../src/controllers/usePokemonController';
import PokemonView from '../src/components/PokemonView';

export default function HomeScreen() {
  const { loading, error, pokemon, searchPokemon } = usePokemonController();

  return <PokemonView loading={loading} error={error} pokemon={pokemon} searchPokemon={searchPokemon} />;
}