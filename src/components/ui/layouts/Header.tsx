import { Sun, Moon } from "lucide-react";
import { Button } from "@/components/ui/button";

interface HeaderProps {
  title: string;
  dark: boolean;
  onToggleTheme: () => void;
  isSidebarCollapsed?: boolean;
}

export default function Header({ title, dark, onToggleTheme, isSidebarCollapsed = false }: HeaderProps) {
  return (
    <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60 dark:border-slate-800 dark:bg-slate-900/95 dark:supports-[backdrop-filter]:bg-slate-900/60">
      <div className="flex h-16 items-center justify-between px-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
            {title}
          </h1>
        </div>

        {/* Right side actions */}
        <div className="flex items-center gap-2">
          <Button 
            size="icon" 
            variant="ghost" 
            onClick={onToggleTheme} 
            aria-label="Toggle theme"
          >
            {dark
              ? <Sun  className="h-5 w-5 text-yellow-400" />
              : <Moon className="h-5 w-5 text-slate-500"  />
            }
          </Button>
        </div>
      </div>
    </header>
  );
}
