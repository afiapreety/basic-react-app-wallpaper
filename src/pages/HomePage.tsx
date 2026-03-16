import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Image, 
  Heart, 
  RefreshCw, 
  Edit2, 
  Database,
  Palette,
  Code2,
  Layers,
  Zap,
  Shield,
  BookOpen
} from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function HomePage() {
  const navigate = useNavigate();

  return (
    <div className="p-8 max-w-6xl mx-auto space-y-8">
      {/* Hero Section */}
      <Card>
        <CardHeader>
          <CardTitle className="text-4xl">Welcome to Wallpapers Gallery 🖼️</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <p className="text-lg text-slate-600 dark:text-slate-400">
            A production-ready React application demonstrating <span className="font-semibold text-blue-600 dark:text-blue-400">professional development patterns</span> through a beautiful wallpapers gallery with full CRUD operations.
          </p>
          
          <div className="flex flex-wrap gap-2">
            <Badge variant="secondary">React 18</Badge>
            <Badge variant="secondary">TypeScript</Badge>
            <Badge variant="secondary">TanStack Query</Badge>
            <Badge variant="secondary">Tailwind CSS</Badge>
            <Badge variant="secondary">Vite</Badge>
            <Badge variant="secondary">Unsplash API</Badge>
          </div>

          <div className="pt-4 flex gap-4">
            <Button 
              onClick={() => navigate("/wallpapers")}
              size="lg"
              className="gap-2"
            >
              <Palette className="h-5 w-5" />
              Browse Wallpapers
            </Button>
            <Button 
              onClick={() => navigate("/settings")}
              variant="outline"
              size="lg"
            >
              Settings
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* What You'll Learn */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BookOpen className="h-6 w-6 text-blue-500" />
            What You'll Learn
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-3">
              <h4 className="font-semibold text-slate-900 dark:text-slate-100">Core React Concepts</h4>
              <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
                <li>✓ <span className="font-medium">State Management</span> - useState and custom hooks</li>
                <li>✓ <span className="font-medium">Effects</span> - useEffect for side effects</li>
                <li>✓ <span className="font-medium">Component Composition</span> - Reusable UI pieces</li>
                <li>✓ <span className="font-medium">React Router</span> - Client-side routing</li>
              </ul>
            </div>

            <div className="space-y-3">
              <h4 className="font-semibold text-slate-900 dark:text-slate-100">Professional Patterns</h4>
              <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
                <li>✓ <span className="font-medium">TanStack Query</span> - Server state management</li>
                <li>✓ <span className="font-medium">CRUD Operations</span> - Create, Read, Update, Delete</li>
                <li>✓ <span className="font-medium">localStorage</span> - Data persistence</li>
                <li>✓ <span className="font-medium">Environment Variables</span> - Secure API keys</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Key Features */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Image className="h-5 w-5 text-blue-500" />
              <CardTitle className="text-lg">Data Fetching</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              <span className="font-medium">TanStack Query</span> automatically handles loading states, caching, and background refetching from Unsplash API
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Heart className="h-5 w-5 text-red-500" />
              <CardTitle className="text-lg">CRUD Operations</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              <span className="font-medium">Full CRUD</span> with favorites: Create (add), Read (view), Update (notes), Delete (remove)
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Database className="h-5 w-5 text-green-500" />
              <CardTitle className="text-lg">Persistence</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              <span className="font-medium">localStorage</span> automatically saves your favorites with useEffect hooks
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-purple-500" />
              <CardTitle className="text-lg">Type Safety</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              <span className="font-medium">TypeScript</span> provides compile-time type checking and better IDE support
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Architecture Overview */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Layers className="h-6 w-6 text-green-500" />
            Clean Architecture
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-slate-600 dark:text-slate-400">
            This app demonstrates <span className="font-semibold">separation of concerns</span> with a 3-layer architecture:
          </p>

          <div className="space-y-3">
            <div className="flex items-start gap-3 p-3 rounded-lg bg-blue-50 dark:bg-blue-950/20">
              <Code2 className="h-5 w-5 text-blue-600 dark:text-blue-400 mt-0.5" />
              <div className="flex-1">
                <h4 className="font-semibold text-sm text-slate-900 dark:text-slate-100 mb-1">
                  1. UI Layer (Components/Pages)
                </h4>
                <p className="text-xs text-slate-600 dark:text-slate-400">
                  React components handle only presentation and user interactions
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3 rounded-lg bg-green-50 dark:bg-green-950/20">
              <Zap className="h-5 w-5 text-green-600 dark:text-green-400 mt-0.5" />
              <div className="flex-1">
                <h4 className="font-semibold text-sm text-slate-900 dark:text-slate-100 mb-1">
                  2. Hook Layer (Custom Hooks)
                </h4>
                <p className="text-xs text-slate-600 dark:text-slate-400">
                  useFavorites, useTheme manage state and side effects (localStorage, API calls)
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3 rounded-lg bg-purple-50 dark:bg-purple-950/20">
              <Database className="h-5 w-5 text-purple-600 dark:text-purple-400 mt-0.5" />
              <div className="flex-1">
                <h4 className="font-semibold text-sm text-slate-900 dark:text-slate-100 mb-1">
                  3. Service Layer (Business Logic)
                </h4>
                <p className="text-xs text-slate-600 dark:text-slate-400">
                  Pure functions in favoritesService, unsplashService contain all business logic
                </p>
              </div>
            </div>
          </div>

          <div className="pt-3 border-t border-slate-200 dark:border-slate-700">
            <p className="text-xs text-slate-500 dark:text-slate-400">
              <span className="font-semibold">Why this matters:</span> Easy to test, maintain, and swap implementations (e.g., localStorage → API)
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Learning Path */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <RefreshCw className="h-6 w-6 text-orange-500" />
            Your Learning Path
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <h4 className="font-semibold text-sm text-slate-900 dark:text-slate-100 mb-2">
                📘 Level 1: Start Here
              </h4>
              <ul className="space-y-1 text-sm text-slate-600 dark:text-slate-400 ml-4">
                <li>→ Browse the <span className="font-medium">Wallpapers page</span> to see the app in action</li>
                <li>→ Open <code className="text-xs bg-slate-100 dark:bg-slate-800 px-1 py-0.5 rounded">src/pages/WallpapersPage.tsx</code> to see component structure</li>
                <li>→ Check <code className="text-xs bg-slate-100 dark:bg-slate-800 px-1 py-0.5 rounded">src/hooks/useFavorites.ts</code> for state management</li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-sm text-slate-900 dark:text-slate-100 mb-2">
                🔥 Level 2: Data Fetching
              </h4>
              <ul className="space-y-1 text-sm text-slate-600 dark:text-slate-400 ml-4">
                <li>→ Study <code className="text-xs bg-slate-100 dark:bg-slate-800 px-1 py-0.5 rounded">src/services/unsplashService.ts</code> for API calls</li>
                <li>→ See how <code className="text-xs bg-slate-100 dark:bg-slate-800 px-1 py-0.5 rounded">useQuery</code> handles loading, error, success states</li>
                <li>→ Learn about environment variables in <code className="text-xs bg-slate-100 dark:bg-slate-800 px-1 py-0.5 rounded">.env</code> and <code className="text-xs bg-slate-100 dark:bg-slate-800 px-1 py-0.5 rounded">.env.example</code></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-sm text-slate-900 dark:text-slate-100 mb-2">
                🚀 Level 3: CRUD Mastery
              </h4>
              <ul className="space-y-1 text-sm text-slate-600 dark:text-slate-400 ml-4">
                <li>→ Explore <code className="text-xs bg-slate-100 dark:bg-slate-800 px-1 py-0.5 rounded">src/services/favoritesService.ts</code> for pure functions</li>
                <li>→ Understand immutable state updates with <code className="text-xs bg-slate-100 dark:bg-slate-800 px-1 py-0.5 rounded">[...array]</code> and <code className="text-xs bg-slate-100 dark:bg-slate-800 px-1 py-0.5 rounded">.map()</code></li>
                <li>→ See auto-save pattern with useEffect in custom hooks</li>
              </ul>
            </div>

            <div className="pt-3 border-t border-slate-200 dark:border-slate-700">
              <p className="text-xs text-slate-500 dark:text-slate-400">
                💡 <span className="font-semibold">Pro tip:</span> Read the full README.md in the project root for detailed explanations of every concept!
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Quick Stats */}
      <div className="grid md:grid-cols-3 gap-4">
        <Card className="text-center">
          <CardContent className="pt-6">
            <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2">3</div>
            <p className="text-sm text-slate-600 dark:text-slate-400">Routes (pages)</p>
          </CardContent>
        </Card>

        <Card className="text-center">
          <CardContent className="pt-6">
            <div className="text-3xl font-bold text-green-600 dark:text-green-400 mb-2">4</div>
            <p className="text-sm text-slate-600 dark:text-slate-400">CRUD Operations</p>
          </CardContent>
        </Card>

        <Card className="text-center">
          <CardContent className="pt-6">
            <div className="text-3xl font-bold text-purple-600 dark:text-purple-400 mb-2">✓</div>
            <p className="text-sm text-slate-600 dark:text-slate-400">Production Ready</p>
          </CardContent>
        </Card>
      </div>

      {/* CTA */}
      <Card className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950/20 dark:to-purple-950/20 border-blue-200 dark:border-blue-800">
        <CardContent className="pt-6 text-center">
          <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-3">
            Ready to Explore?
          </h3>
          <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">
            Start browsing wallpapers and see React best practices in action
          </p>
          <Button 
            onClick={() => navigate("/wallpapers")}
            size="lg"
            className="gap-2"
          >
            <Palette className="h-5 w-5" />
            Start Learning Now
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
