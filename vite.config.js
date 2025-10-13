import { defineConfig } from 'vite';

export default defineConfig({
  base: './',   // relative paths
  build: {
    outDir: 'dist'
  },
  assetsInclude: ['**/*.xml']   // <- agrega esto para que Vite trate los XML como assets
});
