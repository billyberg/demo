// @ts-check
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  // 'file' ger tjanster.html i stället för tjanster/index.html, så bygget
  // har samma filnamn som prototypen. Det gör att kommentarerna hittar
  // tillbaka till rätt sida om du publicerar bygget för ny feedback.
  build: { format: 'file' },
});
