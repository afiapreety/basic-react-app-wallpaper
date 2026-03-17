import { RouteObject } from "react-router-dom";
import { HomePage, SettingsPage, WallpapersPage, WallpaperDetailPage } from "@/pages";

/**
 * Application route configuration
 * 
 * Each route object defines:
 * - path: URL path for the route
 * - element: Component to render for this route
 * - index: (optional) marks this as the default route
 */
export const routes: RouteObject[] = [
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/wallpapers",
    element: <WallpapersPage />,
  },
  {
    // Dynamic route — :id is a URL parameter read with useParams()
    path: "/wallpapers/:id",
    element: <WallpaperDetailPage />,
  },
  {
    path: "/settings",
    element: <SettingsPage />,
  },
];

/**
 * Navigation items configuration
 * Maps sidebar items to their routes
 */
export const navigationItems = [
  {
    id: "home",
    label: "Home",
    path: "/",
  },
  {
    id: "wallpapers",
    label: "Wallpapers",
    path: "/wallpapers",
  },
  {
    id: "settings",
    label: "Settings",
    path: "/settings",
  },
] as const;
