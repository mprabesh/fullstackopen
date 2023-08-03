import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  root: "src",
  server: {
    proxy: {
      "/persons": {
        target: "http://localhost:3001/",
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
