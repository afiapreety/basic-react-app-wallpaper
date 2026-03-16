/**
 * Unsplash API Service
 * Fetches random wallpapers from Unsplash API
 */

// Unsplash API Access Key from environment variables
// Make sure to set VITE_UNSPLASH_ACCESS_KEY in your .env file
const UNSPLASH_ACCESS_KEY = import.meta.env.VITE_UNSPLASH_ACCESS_KEY;

// Validate that API key is configured
if (!UNSPLASH_ACCESS_KEY) {
  console.warn(
    "⚠️ Unsplash API key not found. Please add VITE_UNSPLASH_ACCESS_KEY to your .env file."
  );
}

export interface UnsplashPhoto {
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

/**
 * Fetch random wallpapers from Unsplash
 */
export const fetchWallpapers = async (count: number = 10): Promise<UnsplashPhoto[]> => {
  const response = await fetch(
    `https://api.unsplash.com/photos/random?count=${count}&orientation=landscape&query=nature`,
    {
      headers: {
        'Authorization': `Client-ID ${UNSPLASH_ACCESS_KEY}`,
      },
    }
  );

  if (!response.ok) {
    throw new Error(`Failed to fetch wallpapers: ${response.statusText}`);
  }

  return response.json();
};

/**
 * Search wallpapers by query
 */
export const searchWallpapers = async (
  query: string,
  page: number = 1,
  perPage: number = 10
): Promise<{ results: UnsplashPhoto[]; total: number }> => {
  const response = await fetch(
    `https://api.unsplash.com/search/photos?query=${encodeURIComponent(
      query
    )}&page=${page}&per_page=${perPage}&orientation=landscape`,
    {
      headers: {
        'Authorization': `Client-ID ${UNSPLASH_ACCESS_KEY}`,
      },
    }
  );

  if (!response.ok) {
    throw new Error(`Failed to search wallpapers: ${response.statusText}`);
  }

  return response.json();
};
