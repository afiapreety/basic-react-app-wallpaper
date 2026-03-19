import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { fetchWallpapers, UnsplashPhoto } from "@/services";
import { useFavorites } from "@/hooks";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
// ✅ Import the three components we extracted — each demonstrates a prop pattern
import { WallpaperImage } from "@/components/WallpaperImage";
import { WallpaperInfo } from "@/components/WallpaperInfo";
import { WallpaperActions } from "@/components/WallpaperActions";

/**
 * WallpaperDetailPage — Prop Passing Demo
 *
 * This page is the PARENT. It owns state and data, then passes pieces
 * down to child components as props. Three patterns are shown:
 *
 *   1. Primitive props  → <WallpaperImage src="..." alt="..." />
 *   2. Object prop      → <WallpaperInfo wallpaper={wallpaper} />
 *   3. Callback prop    → <WallpaperActions onToggleFavorite={...} />
 *
 * Rule of thumb: data flows DOWN (parent → child via props).
 *                events flow UP  (child → parent via callback props).
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

      {/* Prop passing callout */}
      <div className="mb-6 p-4 rounded-lg border border-green-200 bg-green-50 dark:bg-green-950 dark:border-green-800 text-sm space-y-1">
        <p className="font-semibold text-green-700 dark:text-green-300">📚 Prop Passing — this page is the parent</p>
        <p className="text-green-600 dark:text-green-400">1️⃣ <code className="font-mono">WallpaperImage</code> — primitive props: <code className="font-mono">src</code>, <code className="font-mono">alt</code></p>
        <p className="text-green-600 dark:text-green-400">2️⃣ <code className="font-mono">WallpaperInfo</code> — object prop: <code className="font-mono">wallpaper</code></p>
        <p className="text-green-600 dark:text-green-400">3️⃣ <code className="font-mono">WallpaperActions</code> — callback prop: <code className="font-mono">onToggleFavorite</code></p>
      </div>

      {/* ✅ Pattern 1: Primitive props — passing plain string values */}
      <WallpaperImage
        src={wallpaper.urls.regular}
        alt={wallpaper.alt_description ?? "Wallpaper"}
      />

      {/* Details row */}
      <div className="flex flex-wrap items-start justify-between gap-4">
        {/* ✅ Pattern 2: Object prop — passing the whole wallpaper object */}
        <WallpaperInfo wallpaper={wallpaper} />

        {/* ✅ Pattern 3: Callback prop — parent owns state, child just calls the function */}
        <WallpaperActions
          wallpaper={wallpaper}
          favorited={favorited}
          onToggleFavorite={() => toggleFavorite(wallpaper)}
        />
      </div>
    </div>
  );
}
