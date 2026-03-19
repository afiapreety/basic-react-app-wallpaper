/**
 * WallpaperImage — Prop Passing Demo (primitives)
 *
 * 🟦 CONCEPT: Passing primitive props
 *   Props are just named arguments for your component.
 *   Here we define an interface, then destructure the props in the function signature.
 *
 *   Parent passes:  <WallpaperImage src="https://..." alt="mountains" />
 *   Child receives: { src: string, alt: string }
 */

// ✅ Step 1 — Define the shape of props with an interface
interface WallpaperImageProps {
  src: string;       // primitive: string
  alt: string;       // primitive: string
}

// ✅ Step 2 — Destructure props directly in the function signature
export function WallpaperImage({ src, alt }: WallpaperImageProps) {
  return (
    <div className="rounded-xl overflow-hidden shadow-lg mb-6">
      <img
        src={src}
        alt={alt}
        className="w-full object-cover max-h-[480px]"
      />
    </div>
  );
}
