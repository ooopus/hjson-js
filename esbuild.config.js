import * as esbuild from 'esbuild';
import { polyfillNode } from 'esbuild-plugin-polyfill-node';

const baseConfig = {
  entryPoints: ['lib/hjson.js'],
  platform: 'neutral',
  target: 'es6',
  globalName: 'Hjson',
  bundle: true,
  plugins: [
    polyfillNode()
  ]
};

async function build() {
  // development
  await esbuild.build({
    ...baseConfig,
    outfile: 'bundle/hjson.js',
  });

  // production
  await esbuild.build({
    ...baseConfig,
    outfile: 'bundle/hjson.min.js',
    minify: true,
  });
}

build().catch(() => process.exit(1));
