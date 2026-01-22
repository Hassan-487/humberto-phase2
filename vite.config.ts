import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  server: {
    host: "::",
    port: 8081,
    hmr: {
      overlay: false,
    },
    proxy: {
      "/api": {
          // target: "http://192.168.18.15:4000",
          target:"https://b5aec375591d.ngrok-free.app/",
        changeOrigin: true,
        secure: false,
         headers: {
      "ngrok-skip-browser-warning": "true",
    },
      },
    },
  },
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
