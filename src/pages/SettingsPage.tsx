import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useTheme, useFavorites } from "@/hooks";
import { Heart, Image, CheckCircle, Database, ExternalLink } from "lucide-react";

export default function SettingsPage() {
  const { theme, setTheme } = useTheme();
  const { favorites, stats, clearAllFavorites } = useFavorites();

  const handleClearFavorites = () => {
    if (window.confirm(`Are you sure you want to remove all ${stats.total} favorites? This cannot be undone.`)) {
      clearAllFavorites();
    }
  };

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      {/* Appearance Settings */}
      <Card>
        <CardHeader>
          <CardTitle>Appearance</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <p className="text-sm text-slate-600 dark:text-slate-400">
            Choose your preferred theme for the application
          </p>
          <div className="flex gap-2">
            <Button
              variant={theme === "light" ? "default" : "outline"}
              onClick={() => setTheme("light")}
              size="sm"
            >
              Light Mode
            </Button>
            <Button
              variant={theme === "dark" ? "default" : "outline"}
              onClick={() => setTheme("dark")}
              size="sm"
            >
              Dark Mode
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Favorites Statistics */}
      <Card>
        <CardHeader>
          <CardTitle>Favorites Statistics</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center gap-3 p-3 rounded-lg bg-red-50 dark:bg-red-950/20">
              <Heart className="h-8 w-8 text-red-500" />
              <div>
                <p className="text-2xl font-bold text-slate-900 dark:text-slate-100">
                  {stats.total}
                </p>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  Total Favorites
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 rounded-lg bg-green-50 dark:bg-green-950/20">
              <CheckCircle className="h-8 w-8 text-green-500" />
              <div>
                <p className="text-2xl font-bold text-slate-900 dark:text-slate-100">
                  {stats.withNotes}
                </p>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  With Notes
                </p>
              </div>
            </div>
          </div>

          {favorites.length > 0 && (
            <div className="pt-4 border-t border-slate-200 dark:border-slate-700">
              <Button
                variant="destructive"
                size="sm"
                onClick={handleClearFavorites}
              >
                Clear All Favorites
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Storage Info */}
      <Card>
        <CardHeader>
          <CardTitle>Data Storage</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-start gap-3">
            <Database className="h-5 w-5 text-blue-500 mt-0.5" />
            <div>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                Your favorites are automatically saved to your browser's localStorage. This means your data stays private and persists across sessions, but is specific to this browser and device.
              </p>
            </div>
          </div>
          <div className="pt-2">
            <Badge variant="outline" className="gap-1">
              <CheckCircle className="h-3 w-3" />
              Auto-save enabled
            </Badge>
          </div>
        </CardContent>
      </Card>

      {/* API Information */}
      <Card>
        <CardHeader>
          <CardTitle>API Configuration</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-start gap-3">
            <Image className="h-5 w-5 text-purple-500 mt-0.5" />
            <div className="flex-1">
              <p className="text-sm text-slate-600 dark:text-slate-400 mb-2">
                Wallpapers are fetched from the Unsplash API. API key is securely stored in environment variables.
              </p>
              <a
                href="https://unsplash.com/documentation"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-sm text-blue-600 dark:text-blue-400 hover:underline"
              >
                View Unsplash API Docs
                <ExternalLink className="h-3 w-3" />
              </a>
            </div>
          </div>
          <div className="pt-2">
            <Badge variant="outline" className="gap-1">
              <CheckCircle className="h-3 w-3" />
              API connected
            </Badge>
          </div>
        </CardContent>
      </Card>

      {/* About */}
      <Card>
        <CardHeader>
          <CardTitle>About</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <p className="text-sm text-slate-600 dark:text-slate-400">
            <span className="font-semibold">Wallpapers Gallery</span> v1.0.0
          </p>
          <p className="text-xs text-slate-500 dark:text-slate-500">
            Built with React 18, TypeScript, TanStack Query, and Tailwind CSS
          </p>
          <div className="pt-2 flex flex-wrap gap-2">
            <Badge variant="secondary">React 18.3.1</Badge>
            <Badge variant="secondary">TypeScript</Badge>
            <Badge variant="secondary">TanStack Query</Badge>
            <Badge variant="secondary">Vite 5</Badge>
            <Badge variant="secondary">Tailwind CSS</Badge>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
