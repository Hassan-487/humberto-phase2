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
            target: "http://3.144.218.217",
           //target: "http://localhost:4000",
         // target:"https://0808-39-45-100-6.ngrok-free.app",
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
