import { defineConfig } from 'vite';
import { nodePolyfills } from 'vite-plugin-node-polyfills';

export default defineConfig({
  build: {
    lib: {
      entry: 'lib/hjson.js',
      name: 'Hjson',
      formats: ['umd', 'es'],
      fileName: (format) => `hjson.${format}.js`,
    },
    rollupOptions: {
      output: {
        exports: 'named',
      }
    }
  },
  plugins: [
    nodePolyfills({
      include: ['os', 'path', 'fs'],
    }),
  ],
});