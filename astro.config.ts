import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import { site } from './src/data/site';

// Sitio 100 % estático: se sirve desde Cloudflare Workers Static Assets
// (peticiones a archivos estáticos gratuitas e ilimitadas).
// Solo /api/* ejecuta código (worker/index.ts).
export default defineConfig({
  site: site.url,
  trailingSlash: 'never',
  build: {
    format: 'file', // /servicios/lavado.html -> URL limpia /servicios/lavado
    inlineStylesheets: 'always', // CSS en línea: sin peticiones que bloqueen el render
  },
  compressHTML: true,
  prefetch: { prefetchAll: false, defaultStrategy: 'hover' },
  image: {
    responsiveStyles: true,
    layout: 'constrained',
  },
  integrations: [
    sitemap({
      filter: (page) => !page.includes('/gracias') && !page.includes('/404'),
      i18n: { defaultLocale: 'es', locales: { es: site.lang } },
    }),
  ],
});
