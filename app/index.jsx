import React from 'react';
import { usePokemonController } from '../src/controllers/usePokemonController';
import PokemonView from '../src/components/PokemonView';

export default function HomeScreen() {
  const { loading, error, pokemon, searchPokemon, favorites, isFavorite, toggleFavorite, loadFavorite } = usePokemonController();

  return (
    <PokemonView
      loading={loading}
      error={error}
      pokemon={pokemon}
      searchPokemon={searchPokemon}
      favorites={favorites}
      isFavorite={isFavorite}
      toggleFavorite={toggleFavorite}
      loadFavorite={loadFavorite}
    />
  );
}