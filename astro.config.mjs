import { defineConfig } from 'astro/config';
import tailwind from "@astrojs/tailwind";
import node from "@astrojs/node";
import solidJs from "@astrojs/solid-js";

// https://astro.build/config
export default defineConfig({
  output: "hybrid",
  adapter: node({
    mode: "standalone"
  }),
  integrations: [tailwind(), solidJs()]
});