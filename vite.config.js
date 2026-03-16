import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// Vite config: sets up React plugin + "@" alias so you can import from "src/" like:
// import App from "@/App"  instead of  import App from "../../App"
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: { "@": path.resolve(__dirname, "./src") },
  },
});
