import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// If you add a custom domain later: set `site` to it and change `base` to '/'.
export default defineConfig({
  site: 'https://mahmoor786.github.io',
  base: '/portfolio',
  trailingSlash: 'always',
  integrations: [sitemap({ filter: (page) => !page.includes('/work/') })],
});
