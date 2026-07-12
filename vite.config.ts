import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Deployed to https://bappoz.github.io/ (user pages repo) -> base "/"
export default defineConfig({
  base: "/Bappoz/",
  plugins: [react()],
  build: {
    outDir: "dist",
    assetsInlineLimit: 0,
  },
});
