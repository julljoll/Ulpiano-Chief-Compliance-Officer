import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import { satteri } from '@astrojs/markdown-satteri';
import { createUlpianoHastPlugin } from './src/plugins/ulpiano-hast.ts';

export default defineConfig({
  site: 'https://ulpiano.sha256.us',
  output: 'static',
  build: {
    format: 'directory',
    inlineStylesheets: 'never',
  },
  trailingSlash: 'ignore',
  vite: {
    build: {
      // Never inline <script> tags into HTML so strict CSP `script-src 'self'` passes 100%
      assetsInlineLimit: 0,
    },
  },
  markdown: {
    processor: satteri({
      hastPlugins: [createUlpianoHastPlugin()],
    }),
  },
  integrations: [sitemap()],
});
