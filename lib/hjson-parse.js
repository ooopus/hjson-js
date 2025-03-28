/* Hjson https://hjson.github.io */
import common from './hjson-common.js';
import dsf from './hjson-dsf.js';

export function parse(source, opt) {
  let text;
  let at; // The index of the current character
  let ch; // The current character
  let escapee = {
    '"': '"',
    "'": "'",
    '\\': '\\',
    '/': '/',
    b: '\b',
    f: '\f',
    n: '\n',
    r: '\r',
    t: '\t',
  };

  let keepComments;
  let runDsf; // domain specific formats

  function resetAt() {
    at = 0;
    ch = ' ';
  }

  function isPunctuatorChar(c) {
    return (
      c === '{' || c === '}' || c === '[' || c === ']' || c === ',' || c === ':'
    );
  }

  // Call error when something is wrong.
  function error(m) {
    let i,
      col = 0,
      line = 1;
    for (i = at - 1; i > 0 && text[i] !== '\n'; i--, col++) {}
    for (; i > 0; i--) if (text[i] === '\n') line++;
    throw new Error(
      m +
        ' at line ' +
        line +
        ',' +
        col +
        ' >>>' +
        text.substr(at - col, 20) +
        ' ...'
    );
  }

  function next() {
    // get the next character.
    ch = text.charAt(at);
    at++;
    return ch;
  }

  function peek(offs) {
    // range check is not required
    return text.charAt(at + offs);
  }

  function string(allowML) {
    // Parse a string value.
    // callers make sure that (ch === '"' || ch === "'")
    let string = '';

    // When parsing for string values, we must look for "/' and \ characters.
    let exitCh = ch;
    while (next()) {
      if (ch === exitCh) {
        next();
        if (allowML && exitCh === "'" && ch === "'" && string.length === 0) {
          // ''' indicates a multiline string
          next();
          return mlString();
        } else return string;
      }
      if (ch === '\\') {
        next();
        if (ch === 'u') {
          let uffff = 0;
          for (let i = 0; i < 4; i++) {
            next();
            let c = ch.charCodeAt(0),
              hex;
            if (ch >= '0' && ch <= '9') hex = c - 48;
            else if (ch >= 'a' && ch <= 'f') hex = c - 97 + 0xa;
            else if (ch >= 'A' && ch <= 'F') hex = c - 65 + 0xa;
            else error('Bad \\u char ' + ch);
            uffff = uffff * 16 + hex;
          }
          string += String.fromCharCode(uffff);
        } else if (typeof escapee[ch] === 'string') {
          string += escapee[ch];
        } else break;
      } else if (ch === '\n' || ch === '\r') {
        error('Bad string containing newline');
      } else {
        string += ch;
      }
    }
    error('Bad string');
  }

  function mlString() {
    // Parse a multiline string value.
    let string = '',
      triple = 0;

    // we are at ''' +1 - get indent
    let indent = 0;
    for (;;) {
      let c = peek(-indent - 5);
      if (!c || c === '\n') break;
      indent++;
    }

    function skipIndent() {
      let skip = indent;
      while (ch && ch <= ' ' && ch !== '\n' && skip-- > 0) next();
    }

    // skip white/to (newline)
    while (ch && ch <= ' ' && ch !== '\n') next();
    if (ch === '\n') {
      next();
      skipIndent();
    }

    // When parsing multiline string values, we must look for ' characters.
    for (;;) {
      if (!ch) {
        error('Bad multiline string');
      } else if (ch === "'") {
        triple++;
        next();
        if (triple === 3) {
          if (string.slice(-1) === '\n') string = string.slice(0, -1); // remove last EOL
          return string;
        } else continue;
      } else {
        while (triple > 0) {
          string += "'";
          triple--;
        }
      }
      if (ch === '\n') {
        string += '\n';
        next();
        skipIndent();
      } else {
        if (ch !== '\r') string += ch;
        next();
      }
    }
  }

  function keyname() {
    // quotes for keys are optional in Hjson
    // unless they include {}[],: or whitespace.

    if (ch === '"' || ch === "'") return string(false);

    let name = '',
      start = at,
      space = -1;
    for (;;) {
      if (ch === ':') {
        if (!name)
          error("Found ':' but no key name (for an empty key name use quotes)");
        else if (space >= 0 && space !== name.length) {
          at = start + space;
          error('Found whitespace in your key name (use quotes to include)');
        }
        return name;
      } else if (ch <= ' ') {
        if (!ch)
          error('Found EOF while looking for a key name (check your syntax)');
        else if (space < 0) space = name.length;
      } else if (isPunctuatorChar(ch)) {
        error(
          "Found '" +
            ch +
            "' where a key name was expected (check your syntax or use quotes if the key name includes {}[],: or whitespace)"
        );
      } else {
        name += ch;
      }
      next();
    }
  }

  function white() {
    while (ch) {
      // Skip whitespace.
      while (ch && ch <= ' ') next();
      // Hjson allows comments
      if (ch === '#' || (ch === '/' && peek(0) === '/')) {
        while (ch && ch !== '\n') next();
      } else if (ch === '/' && peek(0) === '*') {
        next();
        next();
        while (ch && !(ch === '*' && peek(0) === '/')) next();
        if (ch) {
          next();
          next();
        }
      } else break;
    }
  }

  function tfnns() {
    // Hjson strings can be quoteless
    // returns string, true, false, or null.
    let value = ch;
    if (isPunctuatorChar(ch))
      error(
        "Found a punctuator character '" +
          ch +
          "' when expecting a quoteless string (check your syntax)"
      );

    for (;;) {
      next();
      // (detection of ml strings was moved to string())
      let isEol = ch === '\r' || ch === '\n' || ch === '';
      if (
        isEol ||
        ch === ',' ||
        ch === '}' ||
        ch === ']' ||
        ch === '#' ||
        (ch === '/' && (peek(0) === '/' || peek(0) === '*'))
      ) {
        // this tests for the case of {true|false|null|num}
        // followed by { ',' | '}' | ']' | '#' | '//' | '/*' }
        // which needs to be parsed as the specified value
        let chf = value[0];
        switch (chf) {
          case 'f':
            if (value.trim() === 'false') return false;
            break;
          case 'n':
            if (value.trim() === 'null') return null;
            break;
          case 't':
            if (value.trim() === 'true') return true;
            break;
          default:
            if (chf === '-' || (chf >= '0' && chf <= '9')) {
              let n = common.tryParseNumber(value);
              if (n !== undefined) return n;
            }
        }
        if (isEol) {
          // remove any whitespace at the end (ignored in quoteless strings)
          value = value.trim();
          let dsfValue = runDsf(value);
          return dsfValue !== undefined ? dsfValue : value;
        }
      }
      value += ch;
    }
  }

  function getComment(cAt, first) {
    let i;
    cAt--;
    // remove trailing whitespace
    // but only up to EOL
    for (i = at - 2; i > cAt && text[i] <= ' ' && text[i] !== '\n'; i--);
    if (text[i] === '\n') i--;
    if (text[i] === '\r') i--;
    let res = text.substr(cAt, i - cAt + 1);
    // return if we find anything other than whitespace
    for (i = 0; i < res.length; i++) {
      if (res[i] > ' ') {
        let j = res.indexOf('\n');
        if (j >= 0) {
          let c = [res.substr(0, j), res.substr(j + 1)];
          if (first && c[0].trim().length === 0) c.shift();
          return c;
        } else return [res];
      }
    }
    return [];
  }

  function errorClosingHint(value) {
    function search(value, ch) {
      let i, k, length, res;
      switch (typeof value) {
        case 'string':
          if (value.indexOf(ch) >= 0) res = value;
          break;
        case 'object':
          if (Object.prototype.toString.apply(value) === '[object Array]') {
            for (i = 0, length = value.length; i < length; i++) {
              res = search(value[i], ch) || res;
            }
          } else {
            for (k in value) {
              if (!Object.prototype.hasOwnProperty.call(value, k)) continue;
              res = search(value[k], ch) || res;
            }
          }
      }
      return res;
    }

    function report(ch) {
      let possibleErr = search(value, ch);
      if (possibleErr) {
        return (
          "found '" +
          ch +
          "' in a string value, your mistake could be with:\n" +
          '  > ' +
          possibleErr +
          '\n' +
          '  (unquoted strings contain everything up to the next line!)'
        );
      } else return '';
    }

    return report('}') || report(']');
  }

  function array() {
    // Parse an array value.
    // assuming ch === '['

    let array = [];
    let comments, cAt, nextComment;
    try {
      if (keepComments) comments = common.createComment(array, { a: [] });

      next();
      cAt = at;
      white();
      if (comments) nextComment = getComment(cAt, true).join('\n');
      if (ch === ']') {
        next();
        if (comments) comments.e = [nextComment];
        return array; // empty array
      }

      while (ch) {
        array.push(value());
        cAt = at;
        white();
        // in Hjson the comma is optional and trailing commas are allowed
        // note that we do not keep comments before the , if there are any
        if (ch === ',') {
          next();
          cAt = at;
          white();
        }
        if (comments) {
          let c = getComment(cAt);
          comments.a.push([nextComment || '', c[0] || '']);
          nextComment = c[1];
        }
        if (ch === ']') {
          next();
          if (comments)
            comments.a[comments.a.length - 1][1] += nextComment || '';
          return array;
        }
        white();
      }

      error("End of input while parsing an array (missing ']')");
    } catch (e) {
      e.hint = e.hint || errorClosingHint(array);
      throw e;
    }
  }

  function object(withoutBraces) {
    // Parse an object value.

    let key = '',
      object = {};
    let comments, cAt, nextComment;

    try {
      if (keepComments)
        comments = common.createComment(object, { c: {}, o: [] });

      if (!withoutBraces) {
        // assuming ch === '{'
        next();
        cAt = at;
      } else cAt = 1;

      white();
      if (comments) nextComment = getComment(cAt, true).join('\n');
      if (ch === '}' && !withoutBraces) {
        if (comments) comments.e = [nextComment];
        next();
        return object; // empty object
      }
      while (ch) {
        key = keyname();
        white();
        if (ch !== ':') error("Expected ':' instead of '" + ch + "'");
        next();
        // duplicate keys overwrite the previous value
        object[key] = value();
        cAt = at;
        white();
        // in Hjson the comma is optional and trailing commas are allowed
        // note that we do not keep comments before the , if there are any
        if (ch === ',') {
          next();
          cAt = at;
          white();
        }
        if (comments) {
          let c = getComment(cAt);
          comments.c[key] = [nextComment || '', c[0] || ''];
          nextComment = c[1];
          comments.o.push(key);
        }
        if (ch === '}' && !withoutBraces) {
          next();
          if (comments) comments.c[key][1] += nextComment || '';
          return object;
        }
        white();
      }

      if (withoutBraces) return object;
      else error("End of input while parsing an object (missing '}')");
    } catch (e) {
      e.hint = e.hint || errorClosingHint(object);
      throw e;
    }
  }

  function value() {
    // Parse a Hjson value. It could be an object, an array, a string, a number or a word.

    white();
    switch (ch) {
      case '{':
        return object();
      case '[':
        return array();
      case "'":
      case '"':
        return string(true);
      default:
        return tfnns();
    }
  }

  function checkTrailing(v, c) {
    let cAt = at;
    white();
    if (ch) error('Syntax error, found trailing characters');
    if (keepComments) {
      let b = c.join('\n'),
        a = getComment(cAt).join('\n');
      if (a || b) {
        let comments = common.createComment(v, common.getComment(v));
        comments.r = [b, a];
      }
    }
    return v;
  }

  function rootValue() {
    white();
    let c = keepComments ? getComment(1) : null;
    switch (ch) {
      case '{':
        return checkTrailing(object(), c);
      case '[':
        return checkTrailing(array(), c);
      default:
        return checkTrailing(value(), c);
    }
  }

  function legacyRootValue() {
    // Braces for the root object are optional
    white();
    let c = keepComments ? getComment(1) : null;
    switch (ch) {
      case '{':
        return checkTrailing(object(), c);
      case '[':
        return checkTrailing(array(), c);
    }

    try {
      // assume we have a root object without braces
      return checkTrailing(object(true), c);
    } catch (e) {
      // test if we are dealing with a single JSON value instead (true/false/null/num/"")
      resetAt();
      try {
        return checkTrailing(value(), c);
      } catch (e2) {
        throw e;
      } // throw original error
    }
  }

  if (typeof source !== 'string') throw new Error('source is not a string');
  let dsfDef = null;
  let legacyRoot = true;
  if (opt && typeof opt === 'object') {
    keepComments = opt.keepWsc;
    dsfDef = opt.dsf;
    legacyRoot = opt.legacyRoot !== false; // default true
  }
  runDsf = dsf.loadDsf(dsfDef, 'parse');
  text = source;
  resetAt();
  return legacyRoot ? legacyRootValue() : rootValue();
}

export default parse;
