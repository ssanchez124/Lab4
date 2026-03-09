import React, { useState, useRef, useEffect } from 'react';
import { Button, Image, StyleSheet, Text, TextInput, View, TouchableOpacity, ScrollView, Animated } from 'react-native';
import { Pokemon } from '../models/Pokemon';

interface PokemonViewProps {
  loading: boolean;
  error: string;
  pokemon: Pokemon | null;
  searchPokemon: (name: string) => void;
  favorites: string[];
  isFavorite: boolean;
  toggleFavorite: () => void;
  loadFavorite: (name: string) => void;
}

const PokemonView: React.FC<PokemonViewProps> = ({ loading, error, pokemon, searchPokemon, favorites, isFavorite, toggleFavorite, loadFavorite }) => {
  const [pokemonName, setPokemonName] = useState('');

  // animation value drives both opacity and rotation
  const anim = useRef(new Animated.Value(0)).current;

  const handleSearch = () => {
    searchPokemon(pokemonName);
  };

  // trigger animation whenever we go from no pokemon to a real one
  useEffect(() => {
    if (pokemon) {
      anim.setValue(0);
      Animated.timing(anim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }).start();
    }
  }, [pokemon, anim]);

  // interpolated values
  const opacity = anim;
  const rotate = anim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

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
        <Animated.View
          style={[
            styles.pokemonContainer,
            { opacity, transform: [{ rotate }] },
          ]}
        >
          <Text style={styles.pokemonName}>{pokemon.name}</Text>
          <Image source={{ uri: pokemon.image }} style={styles.pokemonImage} />
          <View style={styles.pokemonDetails}>
            <Text>Types: {pokemon.types.join(', ')}</Text>
            <Text>Abilities: {pokemon.abilities.join(', ')}</Text>
            <Text>Moves: {pokemon.moves.slice(0, 5).join(', ')}</Text>
          </View>
          <Button title={isFavorite ? "Unfavorite" : "Favorite"} onPress={toggleFavorite} />
        </Animated.View>
      )}
      {favorites.length > 0 && (
        <View style={styles.favoritesContainer}>
          <Text style={styles.favoritesTitle}>Favorites:</Text>
          <ScrollView style={styles.favoritesList}>
            {favorites.map(fav => (
              <TouchableOpacity key={fav} style={styles.favoriteItem} onPress={() => loadFavorite(fav)}>
                <Text style={styles.favoriteText}>{fav}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
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
  favoritesContainer: {
    marginTop: 20,
    width: '100%',
  },
  favoritesTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  favoritesList: {
    maxHeight: 200,
  },
  favoriteItem: {
    backgroundColor: '#f0f0f0',
    padding: 10,
    marginVertical: 2,
    borderRadius: 5,
  },
  favoriteText: {
    fontSize: 16,
    textTransform: 'capitalize',
  },
});

export default PokemonView;