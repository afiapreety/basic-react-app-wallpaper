import { Home, Settings, Menu, Palette } from "lucide-react";
import { NavLink } from "react-router-dom";
import { cn } from "@/lib/utils";
import { navigationItems } from "@/routes";

interface SidebarProps {
  isCollapsed: boolean;
  onToggleCollapse: () => void;
}

export default function Sidebar({ isCollapsed, onToggleCollapse }: SidebarProps) {
  const iconMap = {
    home: Home,
    wallpapers: Palette,
    settings: Settings,
  } as const;

  return (
    <aside
      className={cn(
        "fixed left-0 top-0 h-screen border-r border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900 transition-all duration-300 z-40",
        isCollapsed ? "w-16" : "w-64"
      )}
    >
      {/* Sidebar Header */}
      <div className="flex h-16 items-center justify-between border-b border-slate-200 dark:border-slate-800 px-4">
        {!isCollapsed && (
          <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
            🖼️
          </h2>
        )}
        <button
          onClick={onToggleCollapse}
          className="rounded-md p-2 hover:bg-slate-100 dark:hover:bg-slate-800"
          aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          <Menu className="h-5 w-5 text-slate-600 dark:text-slate-400" />
        </button>
      </div>

      {/* Navigation Items */}
      <nav className="space-y-1 p-2">
        {navigationItems.map((item) => {
          const Icon = iconMap[item.id];
          
          return (
            <NavLink
              key={item.id}
              to={item.path}
              className={({ isActive }) =>
                cn(
                  "flex w-full items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                  isActive
                    ? "bg-slate-100 text-slate-900 dark:bg-slate-800 dark:text-slate-100"
                    : "text-slate-600 hover:bg-slate-50 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800/50 dark:hover:text-slate-100"
                )
              }
              title={isCollapsed ? item.label : undefined}
            >
              <Icon className="h-5 w-5 flex-shrink-0" />
              {!isCollapsed && <span>{item.label}</span>}
            </NavLink>
          );
        })}
      </nav>
    </aside>
  );
}
