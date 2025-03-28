import fs from 'fs';
import path from 'path';

const packageJson = JSON.parse(
  fs.readFileSync(path.resolve(__dirname, '../package.json'), 'utf8')
);
export const version = packageJson.version;

export default {
  version,
};
