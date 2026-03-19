/**
 * WallpaperInfo — Prop Passing Demo (object prop)
 *
 * 🟦 CONCEPT: Passing an object as a prop
 *   Instead of passing each field separately, we pass the whole wallpaper object.
 *   The component only reads the fields it cares about.
 *
 *   Parent passes:  <WallpaperInfo wallpaper={wallpaper} />
 *   Child receives: { wallpaper: UnsplashPhoto }
 */

import { UnsplashPhoto } from "@/services";
import { Badge } from "@/components/ui/badge";

// ✅ Step 1 — Object prop: the whole wallpaper is one prop
interface WallpaperInfoProps {
  wallpaper: UnsplashPhoto; // object prop (not flat individual fields)
}

// ✅ Step 2 — Destructure the single object prop
export function WallpaperInfo({ wallpaper }: WallpaperInfoProps) {
  return (
    <div>
      {/* Access nested fields from the object prop */}
      <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
        {wallpaper.description ?? wallpaper.alt_description ?? "Untitled"}
      </h1>

      <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
        Photo by{" "}
        {/* Nested object access: wallpaper.user.name */}
        <span className="font-medium text-slate-700 dark:text-slate-300">
          {wallpaper.user.name}
        </span>
      </p>

      <Badge variant="outline" className="mt-2 font-mono text-xs">
        id: {wallpaper.id}
      </Badge>
    </div>
  );
}
