import { useState, useEffect } from "react";
import { UnsplashPhoto } from "@/services";
import {
  FavoriteWallpaper,
  loadFavorites,
  saveFavorites,
  addFavorite as addFavoriteService,
  removeFavorite as removeFavoriteService,
  updateFavoriteNotes as updateFavoriteNotesService,
  isFavorited as isFavoritedService,
  getFavoritesStats,
} from "@/services/favoritesService";

/**
 * Custom hook for managing favorite wallpapers
 * Handles CRUD operations and localStorage persistence
 */
export function useFavorites() {
  const [favorites, setFavorites] = useState<FavoriteWallpaper[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Load favorites from localStorage on mount
  useEffect(() => {
    const loaded = loadFavorites();
    setFavorites(loaded);
    setIsLoading(false);
  }, []);

  // Save to localStorage whenever favorites change
  useEffect(() => {
    if (!isLoading) {
      saveFavorites(favorites);
    }
  }, [favorites, isLoading]);

  /**
   * Add a wallpaper to favorites
   */
  const addToFavorites = (photo: UnsplashPhoto, notes?: string) => {
    setFavorites((prev) => addFavoriteService(prev, photo, notes));
  };

  /**
   * Remove a wallpaper from favorites
   */
  const removeFromFavorites = (photoId: string) => {
    setFavorites((prev) => removeFavoriteService(prev, photoId));
  };

  /**
   * Update notes for a favorite
   */
  const updateNotes = (photoId: string, notes: string) => {
    setFavorites((prev) => updateFavoriteNotesService(prev, photoId, notes));
  };

  /**
   * Check if a photo is favorited
   */
  const isFavorited = (photoId: string): boolean => {
    return isFavoritedService(favorites, photoId);
  };

  /**
   * Toggle favorite status
   */
  const toggleFavorite = (photo: UnsplashPhoto, notes?: string) => {
    if (isFavorited(photo.id)) {
      removeFromFavorites(photo.id);
    } else {
      addToFavorites(photo, notes);
    }
  };

  /**
   * Clear all favorites
   */
  const clearAllFavorites = () => {
    if (confirm("Are you sure you want to clear all favorites?")) {
      setFavorites([]);
    }
  };

  // Get statistics
  const stats = getFavoritesStats(favorites);

  return {
    favorites,
    isLoading,
    addToFavorites,
    removeFromFavorites,
    updateNotes,
    isFavorited,
    toggleFavorite,
    clearAllFavorites,
    stats,
  };
}
