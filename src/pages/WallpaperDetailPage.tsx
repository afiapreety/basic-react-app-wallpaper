import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { fetchWallpapers, UnsplashPhoto } from "@/services";
import { useFavorites } from "@/hooks";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, ExternalLink, Heart } from "lucide-react";

/**
 * WallpaperDetailPage — Dynamic route demo: /wallpapers/:id
 *
 * Key concept: useParams()
 *   - Reads the :id segment from the URL.
 *   - e.g. navigating to /wallpapers/abc123 gives  { id: "abc123" }
 *
 * We reuse the cached gallery query so no extra network request is needed.
 */
export function WallpaperDetailPage() {
  // ✅ useParams reads the dynamic :id segment from the URL
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const { data: wallpapers, isLoading } = useQuery<UnsplashPhoto[], Error>({
    queryKey: ["wallpapers"],
    queryFn: () => fetchWallpapers(12),
    staleTime: 5 * 60 * 1000,
  });

  const { isFavorited, toggleFavorite } = useFavorites();

  const wallpaper = wallpapers?.find((w) => w.id === id);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64 text-gray-500 dark:text-gray-400">
        Loading…
      </div>
    );
  }

  if (!wallpaper) {
    return (
      <div className="p-8 max-w-3xl mx-auto">
        <Button variant="ghost" onClick={() => navigate("/wallpapers")} className="mb-4">
          <ArrowLeft className="w-4 h-4 mr-2" /> Back to Gallery
        </Button>
        <p className="text-red-500">
          No wallpaper found for id: <code className="font-mono">{id}</code>
        </p>
        <p className="text-sm text-gray-400 mt-1">
          The gallery cache may have expired. Go back and reload the gallery first.
        </p>
      </div>
    );
  }

  const favorited = isFavorited(wallpaper.id);

  return (
    <div className="p-8 max-w-4xl mx-auto">
      {/* Back button */}
      <Button variant="ghost" onClick={() => navigate("/wallpapers")} className="mb-6">
        <ArrowLeft className="w-4 h-4 mr-2" /> Back to Gallery
      </Button>

      {/* URL param info — learning callout */}
      <div className="mb-6 p-4 rounded-lg border border-blue-200 bg-blue-50 dark:bg-blue-950 dark:border-blue-800 text-sm">
        <p className="font-semibold text-blue-700 dark:text-blue-300 mb-1">
          📚 Dynamic Route: <code className="font-mono">/wallpapers/:id</code>
        </p>
        <p className="text-blue-600 dark:text-blue-400">
          Current URL param →{" "}
          <code className="font-mono font-bold">{id}</code>
          {" "}(read with <code className="font-mono">useParams()</code>)
        </p>
      </div>

      {/* Wallpaper image */}
      <div className="rounded-xl overflow-hidden shadow-lg mb-6">
        <img
          src={wallpaper.urls.regular}
          alt={wallpaper.alt_description ?? "Wallpaper"}
          className="w-full object-cover max-h-[480px]"
        />
      </div>

      {/* Details */}
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
            {wallpaper.description ?? wallpaper.alt_description ?? "Untitled"}
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            Photo by{" "}
            <span className="font-medium text-slate-700 dark:text-slate-300">
              {wallpaper.user.name}
            </span>
          </p>
          <Badge variant="outline" className="mt-2 font-mono text-xs">
            id: {wallpaper.id}
          </Badge>
        </div>

        <div className="flex gap-3">
          <Button
            variant={favorited ? "default" : "outline"}
            onClick={() => toggleFavorite(wallpaper)}
          >
            <Heart className={`w-4 h-4 mr-2 ${favorited ? "fill-current" : ""}`} />
            {favorited ? "Saved" : "Save"}
          </Button>
          <a
            href={wallpaper.links.html}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-md border border-input bg-background text-sm font-medium hover:bg-accent hover:text-accent-foreground transition-colors"
          >
            <ExternalLink className="w-4 h-4" /> View on Unsplash
          </a>
        </div>
      </div>
    </div>
  );
}
