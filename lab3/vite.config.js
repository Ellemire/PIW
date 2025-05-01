import { reactRouter } from "@react-router/dev/vite";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [reactRouter(), tailwindcss()],
  build: {
    outDir: "build/client",
    manifest: true,
    rollupOptions: {
      input: "./app/root.jsx",
    },
  },
  ssr: {
    noExternal: ["@react-router/dev"],
  },
});
