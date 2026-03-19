/**
 * WallpaperActions — Prop Passing Demo (callback function prop)
 *
 * 🟦 CONCEPT: Passing a function (callback) as a prop
 *   The parent owns the state. The child just calls the function when something happens.
 *   This is how child → parent communication works in React.
 *
 *   Parent passes:  <WallpaperActions
 *                     wallpaper={wallpaper}
 *                     favorited={favorited}
 *                     onToggleFavorite={() => toggleFavorite(wallpaper)}
 *                   />
 *   Child receives: { wallpaper, favorited: boolean, onToggleFavorite: () => void }
 *                                                      ↑ callback prop
 */

import { UnsplashPhoto } from "@/services";
import { Button } from "@/components/ui/button";
import { Heart, ExternalLink } from "lucide-react";

interface WallpaperActionsProps {
  wallpaper: UnsplashPhoto;  // object prop
  favorited: boolean;         // primitive prop (boolean)
  onToggleFavorite: () => void; // ✅ callback prop — parent handles the logic
}

export function WallpaperActions({
  wallpaper,
  favorited,
  onToggleFavorite, // ✅ child just calls this — doesn't need to know what it does
}: WallpaperActionsProps) {
  return (
    <div className="flex gap-3">
      {/* ✅ Calling the callback prop when the button is clicked */}
      <Button
        variant={favorited ? "default" : "outline"}
        onClick={onToggleFavorite}
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
  );
}
