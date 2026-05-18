import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5174, // Replace with your desired port
    strictPort: true, // Forces Vite to error out if port is in use
  },
});
