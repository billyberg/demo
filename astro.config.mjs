// @ts-check
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  site: "https://billyberg.github.io",
  // Sajten ligger under en undermapp hos GitHub Pages. Byter du till en
  // egen domän kan raden tas bort.
  base: "/demo",
  // 'file' ger tjanster.html i stället för tjanster/index.html, så bygget
  // har samma filnamn som prototypen. Det gör att kommentarerna hittar
  // tillbaka till rätt sida om du publicerar bygget för ny feedback.
  build: { format: 'file' },
});
