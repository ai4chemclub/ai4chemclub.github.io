import { defineConfig } from 'astro/config';

// Set the real public URL only after the GitHub organization/repository exists.
export default defineConfig({
  output: 'static',
  site: process.env.SITE_URL || undefined,
  base: process.env.BASE_PATH || '/',
  trailingSlash: 'always',
  devToolbar: { enabled: false },
});
