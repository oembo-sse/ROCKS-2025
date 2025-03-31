import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import topLevelAwait from "vite-plugin-top-level-await";
import wasm from "vite-plugin-wasm";
import wasmPack from "./wasm-pack-plugin";

// https://vitejs.dev/config/
export default defineConfig({
  base: "/ROCKS-2025/",
  plugins: [
    topLevelAwait(),
    react(),
    wasm(),
    wasmPack({
      crates: ["./pgcl/"],
    }),
  ],
});
