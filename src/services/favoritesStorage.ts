import AsyncStorage from '@react-native-async-storage/async-storage';

const FAVORITES_KEY = 'pokemon_favorites';

// Check if running on web (where localStorage is available)
const isWeb = typeof window !== 'undefined' && typeof window.localStorage !== 'undefined';

let useAsyncStorage = !isWeb;

export async function loadFavorites(): Promise<string[]> {
  try {
    if (isWeb) {
      const favoritesJson = window.localStorage.getItem(FAVORITES_KEY);
      return favoritesJson ? JSON.parse(favoritesJson) : [];
    } else if (useAsyncStorage) {
      const favoritesJson = await AsyncStorage.getItem(FAVORITES_KEY);
      return favoritesJson ? JSON.parse(favoritesJson) : [];
    }
  } catch (error) {
    console.warn('Storage not available, using in-memory storage');
    useAsyncStorage = false; // Fall back to in-memory for future calls
  }
  return [];
}

export async function saveFavorites(favorites: string[]): Promise<void> {
  try {
    const favoritesJson = JSON.stringify(favorites);
    if (isWeb) {
      window.localStorage.setItem(FAVORITES_KEY, favoritesJson);
    } else if (useAsyncStorage) {
      await AsyncStorage.setItem(FAVORITES_KEY, favoritesJson);
    }
  } catch (error) {
    console.warn('Storage not available, favorites will not persist');
    useAsyncStorage = false; // Fall back to in-memory for future calls
  }
}