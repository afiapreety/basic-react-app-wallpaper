import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchWallpapers, UnsplashPhoto } from "@/services";
import { useFavorites } from "@/hooks";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Loader2,
  RefreshCw,
  ExternalLink,
  Heart,
  Trash2,
  Edit2,
  Save,
  X,
} from "lucide-react";

/**
 * WallpapersPage - Displays random wallpapers from Unsplash with favorites functionality
 * Demonstrates TanStack Query for data fetching and CRUD operations with localStorage
 */
export function WallpapersPage() {
  const [editingNotes, setEditingNotes] = useState<string | null>(null);
  const [noteText, setNoteText] = useState("");

  // Use TanStack Query to fetch wallpapers
  const {
    data: wallpapers,
    isLoading,
    isError,
    error,
    refetch,
    isFetching,
  } = useQuery<UnsplashPhoto[], Error>({
    queryKey: ["wallpapers"],
    queryFn: () => fetchWallpapers(12),
    staleTime: 5 * 60 * 1000,
  });

  // Use favorites hook for CRUD operations
  const {
    favorites,
    isFavorited,
    toggleFavorite,
    updateNotes,
    removeFromFavorites,
    clearAllFavorites,
    stats,
  } = useFavorites();

  // Handle edit notes
  const handleEditNotes = (photoId: string, currentNotes?: string) => {
    setEditingNotes(photoId);
    setNoteText(currentNotes || "");
  };

  const handleSaveNotes = (photoId: string) => {
    updateNotes(photoId, noteText);
    setEditingNotes(null);
    setNoteText("");
  };

  const handleCancelEdit = () => {
    setEditingNotes(null);
    setNoteText("");
  };

  return (
    <div className="p-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-100">🖼️ Wallpapers</h1>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              Discover and save your favorite wallpapers
            </p>
          </div>
          
          {/* Statistics Badges */}
          <div className="flex gap-2">
            <Badge variant="default">
              {stats.total} Favorites
            </Badge>
            {stats.recentlySaved > 0 && (
              <Badge variant="default">
                {stats.recentlySaved} New Today
              </Badge>
            )}
          </div>
        </div>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="gallery" className="w-full">
        <TabsList className="mb-6">
          <TabsTrigger value="gallery">Gallery</TabsTrigger>
          <TabsTrigger value="favorites">My Favorites ({stats.total})</TabsTrigger>
        </TabsList>

        {/* Gallery Tab Content */}
        <TabsContent value="gallery">
          <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Discover Wallpapers</CardTitle>
            <Button
              onClick={() => refetch()}
              disabled={isFetching}
              variant="outline"
              size="sm"
              className="gap-2"
            >
              {isFetching ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <RefreshCw className="h-4 w-4" />
              )}
              Refresh
            </Button>
          </CardHeader>
          <CardContent>
            {/* Loading State */}
            {isLoading && (
              <div className="flex items-center justify-center py-12">
                <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
                <span className="ml-3 text-gray-600 dark:text-gray-300">
                  Loading wallpapers...
                </span>
              </div>
            )}

            {/* Error State */}
            {isError && (
              <div className="text-center py-12">
                <p className="text-red-500 mb-4">
                  ❌ Failed to load wallpapers: {error?.message}
                </p>
                <Button onClick={() => refetch()}>Try Again</Button>
              </div>
            )}

            {/* Success State - Grid of Wallpapers */}
            {wallpapers && wallpapers.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {wallpapers.map((photo) => (
                  <div
                    key={photo.id}
                    className="group relative overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 bg-gray-100 dark:bg-gray-800"
                  >
                    {/* Image */}
                    <img
                      src={photo.urls.small}
                      alt={photo.alt_description || photo.description || "Wallpaper"}
                      className="w-full h-64 object-cover"
                      loading="lazy"
                    />

                    {/* Favorite Button (always visible) */}
                    <button
                      onClick={() => toggleFavorite(photo)}
                      className={`absolute top-3 right-3 z-10 p-2 rounded-full backdrop-blur-sm transition-all duration-200 ${
                        isFavorited(photo.id)
                          ? "bg-red-500 text-white hover:bg-red-600"
                          : "bg-white/80 text-gray-700 hover:bg-white"
                      }`}
                      aria-label={isFavorited(photo.id) ? "Remove from favorites" : "Add to favorites"}
                    >
                      <Heart
                        className="h-5 w-5"
                        fill={isFavorited(photo.id) ? "currentColor" : "none"}
                      />
                    </button>

                    {/* Overlay with info (appears on hover) */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4 pointer-events-none">
                      <div className="text-white pointer-events-auto">
                        <p className="text-sm font-medium mb-1">
                          Photo by {photo.user.name}
                        </p>
                        {(photo.description || photo.alt_description) && (
                          <p className="text-xs text-gray-200 mb-2 line-clamp-2">
                            {photo.description || photo.alt_description}
                          </p>
                        )}
                        <a
                          href={photo.links.html}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-xs text-blue-300 hover:text-blue-200 underline"
                        >
                          View on Unsplash
                          <ExternalLink className="h-3 w-3" />
                        </a>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Attribution */}
            <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
              <p className="text-xs text-gray-500 dark:text-gray-400 text-center">
                Photos provided by{" "}
                <a
                  href="https://unsplash.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline hover:text-blue-500"
                >
                  Unsplash
                </a>
              </p>
            </div>
          </CardContent>
        </Card>
        </TabsContent>

        {/* Favorites Tab Content */}
        <TabsContent value="favorites">
          <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>My Favorite Wallpapers</CardTitle>
            {favorites.length > 0 && (
              <Button
                onClick={clearAllFavorites}
                variant="destructive"
                size="sm"
                className="gap-2"
              >
                <Trash2 className="h-4 w-4" />
                Clear All
              </Button>
            )}
          </CardHeader>
          <CardContent>
            {favorites.length === 0 ? (
              <div className="text-center py-12">
                <Heart className="h-16 w-16 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
                <p className="text-gray-500 dark:text-gray-400 mb-2">
                  No favorites yet
                </p>
                <p className="text-sm text-gray-400 dark:text-gray-500">
                  Click the heart icon on wallpapers to save them here
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {favorites.map((favorite) => (
                  <div
                    key={favorite.id}
                    className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden"
                  >
                    {/* Image */}
                    <div className="relative">
                      <img
                        src={favorite.photo.urls.small}
                        alt={favorite.photo.alt_description || "Favorite wallpaper"}
                        className="w-full h-48 object-cover"
                      />
                      <Badge
                        variant="default"
                        className="absolute top-2 left-2"
                      >
                        Saved {new Date(favorite.savedAt).toLocaleDateString()}
                      </Badge>
                    </div>

                    {/* Info */}
                    <div className="p-4">
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex-1">
                          <p className="font-medium text-sm">
                            Photo by {favorite.photo.user.name}
                          </p>
                          <a
                            href={favorite.photo.links.html}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-xs text-blue-500 hover:underline inline-flex items-center gap-1"
                          >
                            View on Unsplash
                            <ExternalLink className="h-3 w-3" />
                          </a>
                        </div>
                        <Button
                          onClick={() => removeFromFavorites(favorite.id)}
                          variant="ghost"
                          size="sm"
                          className="text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>

                      {/* Notes Section */}
                      <div className="mt-3">
                        {editingNotes === favorite.id ? (
                          <div className="space-y-2">
                            <Input
                              value={noteText}
                              onChange={(e) => setNoteText(e.target.value)}
                              placeholder="Add your notes..."
                              className="text-sm"
                            />
                            <div className="flex gap-2">
                              <Button
                                onClick={() => handleSaveNotes(favorite.id)}
                                size="sm"
                                className="gap-1"
                              >
                                <Save className="h-3 w-3" />
                                Save
                              </Button>
                              <Button
                                onClick={handleCancelEdit}
                                variant="outline"
                                size="sm"
                                className="gap-1"
                              >
                                <X className="h-3 w-3" />
                                Cancel
                              </Button>
                            </div>
                          </div>
                        ) : (
                          <div>
                            {favorite.notes ? (
                              <div className="bg-gray-50 dark:bg-gray-800 rounded p-2 text-sm">
                                <p className="text-gray-700 dark:text-gray-300">
                                  {favorite.notes}
                                </p>
                                <Button
                                  onClick={() =>
                                    handleEditNotes(favorite.id, favorite.notes)
                                  }
                                  variant="ghost"
                                  size="sm"
                                  className="mt-1 h-auto p-1 gap-1 text-xs"
                                >
                                  <Edit2 className="h-3 w-3" />
                                  Edit
                                </Button>
                              </div>
                            ) : (
                              <Button
                                onClick={() => handleEditNotes(favorite.id)}
                                variant="outline"
                                size="sm"
                                className="gap-1 w-full"
                              >
                                <Edit2 className="h-3 w-3" />
                                Add Notes
                              </Button>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
