import { readFileSync } from 'node:fs';
import Hjson from './hjson.js';

/**
 * Load and parse an Hjson file
 * @example
 * import loadHjson from 'hjson/lib/require-config';
 * const config = loadHjson('./config.hjson');
 */
export default function loadHjson(filename) {
  try {
    const content = readFileSync(filename, 'utf8');
    return Hjson.parse(content);
  } catch (error) {
    throw new Error(`Failed to load Hjson file: ${filename}\n${error.message}`);
  }
}
