import { defineConfig } from "astro/config";

import tailwindcss from "@tailwindcss/vite";

// https://astro.build/config
export default defineConfig({
    site: 'https://theropods.github.io',
    base: 'run-types',
  vite: {
    plugins: [tailwindcss()]
  }
});