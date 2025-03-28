import { defineConfig } from 'vite';
import { nodePolyfills } from 'vite-plugin-node-polyfills';

export default defineConfig({
  build: {
    lib: {
      entry: 'lib/hjson.js',
      name: 'Hjson',
      formats: ['umd', 'es'],
      fileName: (format) => `hjson.${format === 'umd' ? '' : format}.js`,
    },
    sourcemap: true,
    rollupOptions: {
      output: {
        exports: 'named',
      },
    },
  },
  plugins: [
    nodePolyfills({
      include: ['os', 'fs', 'path'],
      overrides: {
        os: {
          EOL: '\n',
        },
      },
    }),
  ],
});
