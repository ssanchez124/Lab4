import { useState } from "react";
import { Button, StyleSheet, Text, TextInput, View } from "react-native";

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
});