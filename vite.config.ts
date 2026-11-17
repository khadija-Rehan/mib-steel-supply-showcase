// @lovable.dev/vite-tanstack-config already includes the following — do NOT add them manually
// or the app will break with duplicate plugins:
//   - TanStack devtools (dev-only, first), tanstackStart, viteReact, tailwindcss, tsConfigPaths,
//     nitro (build-only using cloudflare as a default target), VITE_* env injection, @ path alias,
//     React/TanStack dedupe, error logger plugins, and sandbox detection (port/host/strictPort).
// You can pass additional config via defineConfig({ vite: { ... }, etc... }) if needed.
import { defineConfig } from "@lovable.dev/vite-tanstack-config";

export default defineConfig({
  // Exclude TanStack router and core from Vite's dependency optimizer to avoid missing chunk errors
  // This resolves the pre‑transform errors you saw.
  optimizeDeps: {
    exclude: ["@tanstack/router", "@tanstack/router-core"],
  },

  // This resolves the pre‑transform errors you saw.
  optimizeDeps: {
    exclude: ["@tanstack/router"],
  },

  tanstackStart: {
    // Redirect TanStack Start's bundled server entry to src/server.ts (our SSR error wrapper).
    // nitro/vite builds from this
    server: { entry: "server" },
  },
  nitro: {
    // Exclude TanStack router and core from Vite's dependency optimizer to avoid missing chunk errors
  // This resolves the pre‑transform errors you saw.
  optimizeDeps: {
    exclude: ["@tanstack/router", "@tanstack/router-core"],
  },

    // This fixes the “file does not exist … @tanstack/router-core…” pre‑transform errors.
    // The @lovable.dev/vite-tanstack-config plugin already handles most optimizations.
    // Adding an explicit exclude is safe and resolves the issue.
    // See Vite docs: https://vitejs.dev/config/#optimizedeps-exclude
    //
    // If you later add other libraries that cause similar errors, add them to this array.

    // Target Vercel for deployment — enables SSR + serverless functions on Vercel
    preset: "vercel",
  },
});
