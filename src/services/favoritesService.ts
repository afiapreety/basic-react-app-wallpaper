/**
 * Favorites Service
 * Manages favorite wallpapers with localStorage persistence
 */

import { UnsplashPhoto } from "./unsplashService";

const STORAGE_KEY = "wallpaper_favorites";

export interface FavoriteWallpaper {
  id: string;
  photo: UnsplashPhoto;
  savedAt: string; // ISO timestamp
  notes?: string; // Optional user notes
}

/**
 * Load favorites from localStorage
 */
export const loadFavorites = (): FavoriteWallpaper[] => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return [];
    return JSON.parse(stored);
  } catch (error) {
    console.error("Failed to load favorites:", error);
    return [];
  }
};

/**
 * Save favorites to localStorage
 */
export const saveFavorites = (favorites: FavoriteWallpaper[]): void => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites));
  } catch (error) {
    console.error("Failed to save favorites:", error);
  }
};

/**
 * Add a wallpaper to favorites
 */
export const addFavorite = (
  favorites: FavoriteWallpaper[],
  photo: UnsplashPhoto,
  notes?: string
): FavoriteWallpaper[] => {
  // Check if already favorited
  if (favorites.some((fav) => fav.id === photo.id)) {
    return favorites;
  }

  const newFavorite: FavoriteWallpaper = {
    id: photo.id,
    photo,
    savedAt: new Date().toISOString(),
    notes,
  };

  return [...favorites, newFavorite];
};

/**
 * Remove a wallpaper from favorites
 */
export const removeFavorite = (
  favorites: FavoriteWallpaper[],
  photoId: string
): FavoriteWallpaper[] => {
  return favorites.filter((fav) => fav.id !== photoId);
};

/**
 * Update notes for a favorite
 */
export const updateFavoriteNotes = (
  favorites: FavoriteWallpaper[],
  photoId: string,
  notes: string
): FavoriteWallpaper[] => {
  return favorites.map((fav) =>
    fav.id === photoId ? { ...fav, notes } : fav
  );
};

/**
 * Check if a photo is favorited
 */
export const isFavorited = (
  favorites: FavoriteWallpaper[],
  photoId: string
): boolean => {
  return favorites.some((fav) => fav.id === photoId);
};

/**
 * Get favorite by ID
 */
export const getFavoriteById = (
  favorites: FavoriteWallpaper[],
  photoId: string
): FavoriteWallpaper | undefined => {
  return favorites.find((fav) => fav.id === photoId);
};

/**
 * Get favorites statistics
 */
export const getFavoritesStats = (favorites: FavoriteWallpaper[]) => {
  return {
    total: favorites.length,
    withNotes: favorites.filter((fav) => fav.notes && fav.notes.trim()).length,
    recentlySaved: favorites.filter((fav) => {
      const savedDate = new Date(fav.savedAt);
      const dayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);
      return savedDate > dayAgo;
    }).length,
  };
};
