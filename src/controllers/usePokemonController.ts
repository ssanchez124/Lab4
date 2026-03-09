import { useState } from 'react';
import { fetchPokemon } from '../services/pokemonApi';
import { Pokemon } from '../models/Pokemon';

export function usePokemonController() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [pokemon, setPokemon] = useState<Pokemon | null>(null);

  async function searchPokemon(name: string) {
    const q = name.trim();
    console.log("Search pressed:", q);
    if (!q) {
      const msg = "Please enter a Pokemon name.";
      console.error(msg);
      setError(msg);
      setPokemon(null);
      return;
    }

    setLoading(true);
    setPokemon(null);
    setError('');

    try {
      const data = await fetchPokemon(q);
      setPokemon(data);
      console.log("Pokemon data:", data);
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err);
      setError(msg);
      console.error("Error fetching Pokemon:", msg);
    } finally {
      setLoading(false);
    }
  }

  return {
    loading,
    error,
    pokemon,
    searchPokemon,
  };
}