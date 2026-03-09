import React, { useState } from 'react';
import { Button, Image, StyleSheet, Text, TextInput, View } from 'react-native';
import { Pokemon } from '../models/Pokemon';

interface PokemonViewProps {
  loading: boolean;
  error: string;
  pokemon: Pokemon | null;
  searchPokemon: (name: string) => void;
}

const PokemonView: React.FC<PokemonViewProps> = ({ loading, error, pokemon, searchPokemon }) => {
  const [pokemonName, setPokemonName] = useState('');

  const handleSearch = () => {
    searchPokemon(pokemonName);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Pokemon Search</Text>

      <TextInput
        style={styles.input}
        placeholder="Enter Pokemon name (e.g., pikachu)"
        value={pokemonName}
        onChangeText={setPokemonName}
        autoCapitalize="none"
        autoCorrect={false}
      />

      <Button title="Get Pokemon" onPress={handleSearch} />
      <View style={{ marginTop: 10 }}>
        {loading && <Text>Loading</Text>}
        {error && (
          <Text style={{ color: 'red' }}>
            {String(error)}
          </Text>
        )}
      </View>
      {pokemon && (
        <View style={styles.pokemonContainer}>
          <Text style={styles.pokemonName}>{pokemon.name}</Text>
          <Image source={{ uri: pokemon.image }} style={styles.pokemonImage} />
          <View style={styles.pokemonDetails}>
            <Text>Types: {pokemon.types.join(', ')}</Text>
            <Text>Abilities: {pokemon.abilities.join(', ')}</Text>
            <Text>Moves: {pokemon.moves.slice(0, 5).join(', ')}</Text>
          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    gap: 12,
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    marginBottom: 10,
  },
  input: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
  },
  pokemonContainer: {
    alignItems: 'center',
    marginTop: 20,
  },
  pokemonName: {
    fontSize: 20,
    fontWeight: 'bold',
    textTransform: 'capitalize',
  },
  pokemonImage: {
    width: 150,
    height: 150,
    marginVertical: 10,
  },
  pokemonDetails: {
    alignItems: 'center',
    backgroundColor: '#909090',
    padding: 10,
    borderRadius: 8,
  },
});

export default PokemonView;