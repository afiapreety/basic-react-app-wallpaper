import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Sidebar from "./components/ui/layouts/Sidebar";
import Header from "./components/ui/layouts/Header";
import { useTheme } from "./hooks";
import { routes } from "./routes";

export default function App() {
  // ── Custom Hooks ─────────────────────────────────────────────────────────
  const { isDark, toggleTheme } = useTheme();

  // ── UI State ─────────────────────────────────────────────────────────────
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  // ── Render ───────────────────────────────────────────────────────────────
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors duration-200">
        <Sidebar 
          isCollapsed={sidebarCollapsed}
          onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
        />

        {/* Main content area */}
        <div className={`transition-all duration-300 ${sidebarCollapsed ? 'ml-16' : 'ml-64'}`}>
          <Header 
            title="Wallpapers Gallery" 
            dark={isDark} 
            onToggleTheme={toggleTheme}
            isSidebarCollapsed={sidebarCollapsed}
          />

          <main className="p-6">
            <Routes>
              {routes.map((route, index) => (
                <Route key={index} path={route.path} element={route.element} />
              ))}
            </Routes>
          </main>
        </div>
      </div>
    </BrowserRouter>
  );
}

