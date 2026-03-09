import { useState } from "react";
import { Button, Image, StyleSheet, Text, TextInput, View } from "react-native";

/*
add state variables for:

loading (boolean)

error (string)

pokemon (object or typed structure)

You must:

Set loading=true before the request

Set loading=false in all cases (success/failure)

Clear old errors on success

Clear old pokemon when starting a new search
*/

export default function HomeScreen() {
  const [pokemonName, setPokemonName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [pokemon, setPokemon] = useState(null);

  function handleSearch() {
    const q = pokemonName.trim();
    console.log("Search pressed:", q);
    if (!q) {
      const msg = "Please enter a Pokemon name.";
      console.error(msg);
      setError(msg);
      return;
    }
    setLoading(true);
    setPokemon(null);

    fetch(`https://pokeapi.co/api/v2/pokemon/${q.toLowerCase()}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Pokemon not found: ${q}`);
        }
        return response.json();
      })
      .then((data) => {
        setPokemon(data);
        setError("");
        console.log("Pokemon data:", data);
      })
      .catch((error) => {
        setError(error.message);
        console.error("Error fetching Pokemon:", error.message);
      })
      .finally(() => {
        setLoading(false);
      });
  }

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
            {typeof error === 'string' ? error : (error.message || String(error))}
          </Text>
        )}
      </View>
      {pokemon && (
        <View style={styles.pokemonContainer}>
          <Text style={styles.pokemonName}>{pokemon.name}</Text>
          <Image source={{ uri: pokemon.sprites.front_default }} style={styles.pokemonImage} />
          <View style={styles.pokemonDetails}> 
            <Text>Types: {pokemon.types.map(t => t.type.name).join(', ')}</Text>
            <Text>Abilities: {pokemon.abilities.map(a => a.ability.name).join(', ')}</Text>
            <Text>Moves: {pokemon.moves.slice(0, 5).map(m => m.move.name).join(', ')}</Text>
          </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
    gap: 12,
  },
  title: {
    fontSize: 24,
    fontWeight: "600",
    marginBottom: 10,
  },
  input: {
    width: "100%",
    borderWidth: 1,
    borderColor: "#ccc",
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