
/**
 * Wallpaper Types
 * Types for the wallpaper application
 */

export interface Wallpaper {
  id: string;
  urls: {
    raw: string;
    full: string;
    regular: string;
    small: string;
    thumb: string;
  };
  alt_description: string | null;
  description: string | null;
  user: {
    name: string;
    username: string;
    profile_image: {
      small: string;
      medium: string;
      large: string;
    };
  };
  links: {
    html: string;
  };
}

export interface FavoriteWallpaper {
  id: string;
  photo: Wallpaper;
  savedAt: string; // ISO timestamp
  notes?: string; // Optional user notes
}

export interface WallpaperStats {
  total: number;
  recentlySaved: number;
}

export interface ThemeToggleProps {
  dark: boolean;
  onToggle: () => void;
}
