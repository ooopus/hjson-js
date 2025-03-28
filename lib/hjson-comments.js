/* Hjson https://hjson.github.io */
import common from './hjson-common.js';

function makeComment(b, a, x) {
  let c;
  if (b) c = { b: b };
  if (a) (c = c || {}).a = a;
  if (x) (c = c || {}).x = x;
  return c;
}

function extractComments(value, root) {
  if (value === null || typeof value !== 'object') return;
  let comments = common.getComment(value);
  if (comments) common.removeComment(value);

  let i, length; // loop
  let any, res;
  if (Object.prototype.toString.apply(value) === '[object Array]') {
    res = { a: {} };
    for (i = 0, length = value.length; i < length; i++) {
      if (saveComment(res.a, i, comments.a[i], extractComments(value[i])))
        any = true;
    }
    if (!any && comments.e) {
      res.e = makeComment(comments.e[0], comments.e[1]);
      any = true;
    }
  } else {
    res = { s: {} };

    // get key order (comments and current)
    let keys,
      currentKeys = Object.keys(value);
    if (comments && comments.o) {
      keys = [];
      comments.o.concat(currentKeys).forEach(function (key) {
        if (
          Object.prototype.hasOwnProperty.call(value, key) &&
          keys.indexOf(key) < 0
        )
          keys.push(key);
      });
    } else keys = currentKeys;
    res.o = keys;

    // extract comments
    for (i = 0, length = keys.length; i < length; i++) {
      let key = keys[i];
      if (saveComment(res.s, key, comments.c[key], extractComments(value[key])))
        any = true;
    }
    if (!any && comments.e) {
      res.e = makeComment(comments.e[0], comments.e[1]);
      any = true;
    }
  }

  if (root && comments && comments.r) {
    res.r = makeComment(comments.r[0], comments.r[1]);
  }

  return any ? res : undefined;
}

function mergeStr() {
  let res = '';
  [].forEach.call(arguments, function (c) {
    if (c && c.trim() !== '') {
      if (res) res += '; ';
      res += c.trim();
    }
  });
  return res;
}

function mergeComments(comments, value) {
  let dropped = [];
  merge(comments, value, dropped, []);

  // append dropped comments:
  if (dropped.length > 0) {
    let text = rootComment(value, null, 1);
    text += '\n# Orphaned comments:\n';
    dropped.forEach(function (c) {
      text +=
        ('# ' + c.path.join('/') + ': ' + mergeStr(c.b, c.a, c.e)).replace(
          '\n',
          '\\n '
        ) + '\n';
    });
    rootComment(value, text, 1);
  }
}

function saveComment(res, key, item, col) {
  let c = makeComment(
    item ? item[0] : undefined,
    item ? item[1] : undefined,
    col
  );
  if (c) res[key] = c;
  return c;
}

function droppedComment(path, c) {
  let res = makeComment(c.b, c.a);
  res.path = path;
  return res;
}

function dropAll(comments, dropped, path) {
  if (!comments) return;

  let i, length; // loop

  if (comments.a) {
    for (i = 0, length = comments.a.length; i < length; i++) {
      let kpath = path.slice().concat([i]);
      let c = comments.a[i];
      if (c) {
        dropped.push(droppedComment(kpath, c));
        dropAll(c.x, dropped, kpath);
      }
    }
  } else if (comments.o) {
    comments.o.forEach(function (key) {
      let kpath = path.slice().concat([key]);
      let c = comments.s[key];
      if (c) {
        dropped.push(droppedComment(kpath, c));
        dropAll(c.x, dropped, kpath);
      }
    });
  }

  if (comments.e) dropped.push(droppedComment(path, comments.e));
}

function merge(comments, value, dropped, path) {
  if (!comments) return;
  if (value === null || typeof value !== 'object') {
    dropAll(comments, dropped, path);
    return;
  }

  let i; // loop
  let setComments = common.createComment(value);

  if (path.length === 0 && comments.r)
    setComments.r = [comments.r.b, comments.r.a];

  if (Object.prototype.toString.apply(value) === '[object Array]') {
    setComments.a = [];
    let a = comments.a || {}; // Treating Array like an Object, so using {} for speed
    for (let key in a) {
      if (a.hasOwnProperty(key)) {
        i = parseInt(key);
        let c = comments.a[key];
        if (c) {
          let kpath = path.slice().concat([i]);
          if (i < value.length) {
            setComments.a[i] = [c.b, c.a];
            merge(c.x, value[i], dropped, kpath);
          } else {
            dropped.push(droppedComment(kpath, c));
            dropAll(c.x, dropped, kpath);
          }
        }
      }
    }
    if (i === 0 && comments.e) setComments.e = [comments.e.b, comments.e.a];
  } else {
    setComments.c = {};
    setComments.o = [];
    (comments.o || []).forEach(function (key) {
      let kpath = path.slice().concat([key]);
      let c = comments.s[key];
      if (Object.prototype.hasOwnProperty.call(value, key)) {
        setComments.o.push(key);
        if (c) {
          setComments.c[key] = [c.b, c.a];
          merge(c.x, value[key], dropped, kpath);
        }
      } else if (c) {
        dropped.push(droppedComment(kpath, c));
        dropAll(c.x, dropped, kpath);
      }
    });
    if (comments.e) setComments.e = [comments.e.b, comments.e.a];
  }
}

function rootComment(value, setText, header) {
  let comment = common.createComment(value, common.getComment(value));
  if (!comment.r) comment.r = ['', ''];
  if (setText || setText === '')
    comment.r[header] = common.forceComment(setText);
  return comment.r[header] || '';
}

export const comments = {
  extract: function (value) {
    return extractComments(value, true);
  },
  merge: mergeComments,
  header: function (value, setText) {
    return rootComment(value, setText, 0);
  },
  footer: function (value, setText) {
    return rootComment(value, setText, 1);
  },
};

export default comments;
