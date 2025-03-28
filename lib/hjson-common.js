/* Hjson https://hjson.github.io */
import { EOL as osEOL } from 'node:os'; // will be {} when used in a browser

export let EOL = osEOL || '\n';

function tryParseNumber(text, stopAtNext) {
  // try to parse a number

  let number,
    string = '',
    leadingZeros = 0,
    testLeading = true;
  let at = 0;
  let ch;
  function next() {
    ch = text.charAt(at);
    at++;
    return ch;
  }

  next();
  if (ch === '-') {
    string = '-';
    next();
  }
  while (ch >= '0' && ch <= '9') {
    if (testLeading) {
      if (ch == '0') leadingZeros++;
      else testLeading = false;
    }
    string += ch;
    next();
  }
  if (testLeading) leadingZeros--; // single 0 is allowed
  if (ch === '.') {
    string += '.';
    while (next() && ch >= '0' && ch <= '9') string += ch;
  }
  if (ch === 'e' || ch === 'E') {
    string += ch;
    next();
    if (ch === '-' || ch === '+') {
      string += ch;
      next();
    }
    while (ch >= '0' && ch <= '9') {
      string += ch;
      next();
    }
  }

  // skip white/to (newline)
  while (ch && ch <= ' ') next();

  if (stopAtNext) {
    // end scan if we find a punctuator character like ,}] or a comment
    if (
      ch === ',' ||
      ch === '}' ||
      ch === ']' ||
      ch === '#' ||
      (ch === '/' && (text[at] === '/' || text[at] === '*'))
    )
      ch = 0;
  }

  number = +string;
  if (ch || leadingZeros || !isFinite(number)) return undefined;
  else return number;
}

function createComment(value, comment) {
  if (Object.defineProperty)
    Object.defineProperty(value, '__COMMENTS__', {
      enumerable: false,
      writable: true,
    });
  return (value.__COMMENTS__ = comment || {});
}

function removeComment(value) {
  Object.defineProperty(value, '__COMMENTS__', { value: undefined });
}

function getComment(value) {
  return value.__COMMENTS__;
}

function forceComment(text) {
  if (!text) return '';
  let a = text.split('\n');
  let str, i, j, len;
  for (j = 0; j < a.length; j++) {
    str = a[j];
    len = str.length;
    for (i = 0; i < len; i++) {
      let c = str[i];
      if (c === '#') break;
      else if (c === '/' && (str[i + 1] === '/' || str[i + 1] === '*')) {
        if (str[i + 1] === '*') j = a.length; // assume /**/ covers whole block, bail out
        break;
      } else if (c > ' ') {
        a[j] = '# ' + str;
        break;
      }
    }
  }
  return a.join('\n');
}

export {
  tryParseNumber,
  createComment,
  removeComment,
  getComment,
  forceComment,
};

export default {
  tryParseNumber,
  createComment,
  removeComment,
  getComment,
  forceComment,
};
