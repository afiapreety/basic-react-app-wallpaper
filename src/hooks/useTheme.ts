import { useState, useEffect } from "react";

type Theme = "light" | "dark";

interface UseThemeReturn {
  isDark: boolean;
  theme: Theme;
  toggleTheme: () => void;
  setTheme: (theme: Theme) => void;
}

/**
 * Custom hook for managing theme with localStorage persistence
 * Automatically applies theme to document root element for Tailwind dark mode
 */
export function useTheme(): UseThemeReturn {
  const [isDark, setIsDark] = useState<boolean>(() => {
    const stored = localStorage.getItem("theme");
    return stored === "dark";
  });

  useEffect(() => {
    const root = document.documentElement;
    
    if (isDark) {
      root.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      root.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [isDark]);

  const toggleTheme = () => {
    setIsDark((prev) => !prev);
  };

  const setTheme = (theme: Theme) => {
    setIsDark(theme === "dark");
  };

  return {
    isDark,
    theme: isDark ? "dark" : "light",
    toggleTheme,
    setTheme,
  };
}
