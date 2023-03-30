import { defineConfig } from 'vite';
import ViteSolid from 'vite-plugin-solid';
import ViteSsr from 'vite-plugin-ssr/plugin';

export default defineConfig({
  plugins: [ViteSsr(), ViteSolid({ ssr: true })],
  server: {
    port: 3000,
  },
  build: {
    target: 'esnext',
  },
  resolve: {
    alias: {
      '#': './',
    },
  },
});
