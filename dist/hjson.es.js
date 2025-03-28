function We(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e;
}
var S = {}, _e;
function ze() {
  return _e || (_e = 1, S.endianness = function() {
    return "LE";
  }, S.hostname = function() {
    return typeof location < "u" ? location.hostname : "";
  }, S.loadavg = function() {
    return [];
  }, S.uptime = function() {
    return 0;
  }, S.freemem = function() {
    return Number.MAX_VALUE;
  }, S.totalmem = function() {
    return Number.MAX_VALUE;
  }, S.cpus = function() {
    return [];
  }, S.type = function() {
    return "Browser";
  }, S.release = function() {
    return typeof navigator < "u" ? navigator.appVersion : "";
  }, S.networkInterfaces = S.getNetworkInterfaces = function() {
    return {};
  }, S.arch = function() {
    return "javascript";
  }, S.platform = function() {
    return "browser";
  }, S.tmpdir = S.tmpDir = function() {
    return "/tmp";
  }, S.EOL = `
`, S.homedir = function() {
    return "/";
  }), S;
}
ze();
function Qe(e, i) {
  let s, o = "", t = 0, r = !0, n = 0, f;
  function l() {
    return f = e.charAt(n), n++, f;
  }
  for (l(), f === "-" && (o = "-", l()); f >= "0" && f <= "9"; )
    r && (f == "0" ? t++ : r = !1), o += f, l();
  if (r && t--, f === ".")
    for (o += "."; l() && f >= "0" && f <= "9"; ) o += f;
  if (f === "e" || f === "E")
    for (o += f, l(), (f === "-" || f === "+") && (o += f, l()); f >= "0" && f <= "9"; )
      o += f, l();
  for (; f && f <= " "; ) l();
  if (i && (f === "," || f === "}" || f === "]" || f === "#" || f === "/" && (e[n] === "/" || e[n] === "*")) && (f = 0), s = +o, !(f || t || !isFinite(s)))
    return s;
}
function Je(e, i) {
  return Object.defineProperty && Object.defineProperty(e, "__COMMENTS__", {
    enumerable: !1,
    writable: !0
  }), e.__COMMENTS__ = i || {};
}
function Ue(e) {
  Object.defineProperty(e, "__COMMENTS__", { value: void 0 });
}
function Ze(e) {
  return e.__COMMENTS__;
}
function Xe(e) {
  if (!e) return "";
  let i = e.split(`
`), s, o, t, r;
  for (t = 0; t < i.length; t++)
    for (s = i[t], r = s.length, o = 0; o < r; o++) {
      let n = s[o];
      if (n === "#") break;
      if (n === "/" && (s[o + 1] === "/" || s[o + 1] === "*")) {
        s[o + 1] === "*" && (t = i.length);
        break;
      } else if (n > " ") {
        i[t] = "# " + s;
        break;
      }
    }
  return i.join(`
`);
}
const T = {
  tryParseNumber: Qe,
  createComment: Je,
  removeComment: Ue,
  getComment: Ze,
  forceComment: Xe
};
var Ge = null;
function He(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e;
}
var De = { exports: {} }, j = De.exports = {}, V, K;
function we() {
  throw new Error("setTimeout has not been defined");
}
function xe() {
  throw new Error("clearTimeout has not been defined");
}
(function() {
  try {
    typeof setTimeout == "function" ? V = setTimeout : V = we;
  } catch {
    V = we;
  }
  try {
    typeof clearTimeout == "function" ? K = clearTimeout : K = xe;
  } catch {
    K = xe;
  }
})();
function Fe(e) {
  if (V === setTimeout)
    return setTimeout(e, 0);
  if ((V === we || !V) && setTimeout)
    return V = setTimeout, setTimeout(e, 0);
  try {
    return V(e, 0);
  } catch {
    try {
      return V.call(null, e, 0);
    } catch {
      return V.call(this, e, 0);
    }
  }
}
function Ye(e) {
  if (K === clearTimeout)
    return clearTimeout(e);
  if ((K === xe || !K) && clearTimeout)
    return K = clearTimeout, clearTimeout(e);
  try {
    return K(e);
  } catch {
    try {
      return K.call(null, e);
    } catch {
      return K.call(this, e);
    }
  }
}
var Q = [], ie = !1, G, de = -1;
function et() {
  !ie || !G || (ie = !1, G.length ? Q = G.concat(Q) : de = -1, Q.length && Me());
}
function Me() {
  if (!ie) {
    var e = Fe(et);
    ie = !0;
    for (var i = Q.length; i; ) {
      for (G = Q, Q = []; ++de < i; )
        G && G[de].run();
      de = -1, i = Q.length;
    }
    G = null, ie = !1, Ye(e);
  }
}
j.nextTick = function(e) {
  var i = new Array(arguments.length - 1);
  if (arguments.length > 1)
    for (var s = 1; s < arguments.length; s++)
      i[s - 1] = arguments[s];
  Q.push(new Re(e, i)), Q.length === 1 && !ie && Fe(Me);
};
function Re(e, i) {
  this.fun = e, this.array = i;
}
Re.prototype.run = function() {
  this.fun.apply(null, this.array);
};
j.title = "browser";
j.browser = !0;
j.env = {};
j.argv = [];
j.version = "";
j.versions = {};
function J() {
}
j.on = J;
j.addListener = J;
j.once = J;
j.off = J;
j.removeListener = J;
j.removeAllListeners = J;
j.emit = J;
j.prependListener = J;
j.prependOnceListener = J;
j.listeners = function(e) {
  return [];
};
j.binding = function(e) {
  throw new Error("process.binding is not supported");
};
j.cwd = function() {
  return "/";
};
j.chdir = function(e) {
  throw new Error("process.chdir is not supported");
};
j.umask = function() {
  return 0;
};
var tt = De.exports;
const rt = /* @__PURE__ */ He(tt);
var pe, Ie;
function nt() {
  if (Ie) return pe;
  Ie = 1;
  function e(t) {
    if (typeof t != "string")
      throw new TypeError("Path must be a string. Received " + JSON.stringify(t));
  }
  function i(t, r) {
    for (var n = "", f = 0, l = -1, g = 0, u, a = 0; a <= t.length; ++a) {
      if (a < t.length)
        u = t.charCodeAt(a);
      else {
        if (u === 47)
          break;
        u = 47;
      }
      if (u === 47) {
        if (!(l === a - 1 || g === 1)) if (l !== a - 1 && g === 2) {
          if (n.length < 2 || f !== 2 || n.charCodeAt(n.length - 1) !== 46 || n.charCodeAt(n.length - 2) !== 46) {
            if (n.length > 2) {
              var w = n.lastIndexOf("/");
              if (w !== n.length - 1) {
                w === -1 ? (n = "", f = 0) : (n = n.slice(0, w), f = n.length - 1 - n.lastIndexOf("/")), l = a, g = 0;
                continue;
              }
            } else if (n.length === 2 || n.length === 1) {
              n = "", f = 0, l = a, g = 0;
              continue;
            }
          }
          r && (n.length > 0 ? n += "/.." : n = "..", f = 2);
        } else
          n.length > 0 ? n += "/" + t.slice(l + 1, a) : n = t.slice(l + 1, a), f = a - l - 1;
        l = a, g = 0;
      } else u === 46 && g !== -1 ? ++g : g = -1;
    }
    return n;
  }
  function s(t, r) {
    var n = r.dir || r.root, f = r.base || (r.name || "") + (r.ext || "");
    return n ? n === r.root ? n + f : n + t + f : f;
  }
  var o = {
    // path.resolve([from ...], to)
    resolve: function() {
      for (var r = "", n = !1, f, l = arguments.length - 1; l >= -1 && !n; l--) {
        var g;
        l >= 0 ? g = arguments[l] : (f === void 0 && (f = rt.cwd()), g = f), e(g), g.length !== 0 && (r = g + "/" + r, n = g.charCodeAt(0) === 47);
      }
      return r = i(r, !n), n ? r.length > 0 ? "/" + r : "/" : r.length > 0 ? r : ".";
    },
    normalize: function(r) {
      if (e(r), r.length === 0) return ".";
      var n = r.charCodeAt(0) === 47, f = r.charCodeAt(r.length - 1) === 47;
      return r = i(r, !n), r.length === 0 && !n && (r = "."), r.length > 0 && f && (r += "/"), n ? "/" + r : r;
    },
    isAbsolute: function(r) {
      return e(r), r.length > 0 && r.charCodeAt(0) === 47;
    },
    join: function() {
      if (arguments.length === 0)
        return ".";
      for (var r, n = 0; n < arguments.length; ++n) {
        var f = arguments[n];
        e(f), f.length > 0 && (r === void 0 ? r = f : r += "/" + f);
      }
      return r === void 0 ? "." : o.normalize(r);
    },
    relative: function(r, n) {
      if (e(r), e(n), r === n || (r = o.resolve(r), n = o.resolve(n), r === n)) return "";
      for (var f = 1; f < r.length && r.charCodeAt(f) === 47; ++f)
        ;
      for (var l = r.length, g = l - f, u = 1; u < n.length && n.charCodeAt(u) === 47; ++u)
        ;
      for (var a = n.length, w = a - u, q = g < w ? g : w, b = -1, v = 0; v <= q; ++v) {
        if (v === q) {
          if (w > q) {
            if (n.charCodeAt(u + v) === 47)
              return n.slice(u + v + 1);
            if (v === 0)
              return n.slice(u + v);
          } else g > q && (r.charCodeAt(f + v) === 47 ? b = v : v === 0 && (b = 0));
          break;
        }
        var A = r.charCodeAt(f + v), W = n.charCodeAt(u + v);
        if (A !== W)
          break;
        A === 47 && (b = v);
      }
      var L = "";
      for (v = f + b + 1; v <= l; ++v)
        (v === l || r.charCodeAt(v) === 47) && (L.length === 0 ? L += ".." : L += "/..");
      return L.length > 0 ? L + n.slice(u + b) : (u += b, n.charCodeAt(u) === 47 && ++u, n.slice(u));
    },
    _makeLong: function(r) {
      return r;
    },
    dirname: function(r) {
      if (e(r), r.length === 0) return ".";
      for (var n = r.charCodeAt(0), f = n === 47, l = -1, g = !0, u = r.length - 1; u >= 1; --u)
        if (n = r.charCodeAt(u), n === 47) {
          if (!g) {
            l = u;
            break;
          }
        } else
          g = !1;
      return l === -1 ? f ? "/" : "." : f && l === 1 ? "//" : r.slice(0, l);
    },
    basename: function(r, n) {
      if (n !== void 0 && typeof n != "string") throw new TypeError('"ext" argument must be a string');
      e(r);
      var f = 0, l = -1, g = !0, u;
      if (n !== void 0 && n.length > 0 && n.length <= r.length) {
        if (n.length === r.length && n === r) return "";
        var a = n.length - 1, w = -1;
        for (u = r.length - 1; u >= 0; --u) {
          var q = r.charCodeAt(u);
          if (q === 47) {
            if (!g) {
              f = u + 1;
              break;
            }
          } else
            w === -1 && (g = !1, w = u + 1), a >= 0 && (q === n.charCodeAt(a) ? --a === -1 && (l = u) : (a = -1, l = w));
        }
        return f === l ? l = w : l === -1 && (l = r.length), r.slice(f, l);
      } else {
        for (u = r.length - 1; u >= 0; --u)
          if (r.charCodeAt(u) === 47) {
            if (!g) {
              f = u + 1;
              break;
            }
          } else l === -1 && (g = !1, l = u + 1);
        return l === -1 ? "" : r.slice(f, l);
      }
    },
    extname: function(r) {
      e(r);
      for (var n = -1, f = 0, l = -1, g = !0, u = 0, a = r.length - 1; a >= 0; --a) {
        var w = r.charCodeAt(a);
        if (w === 47) {
          if (!g) {
            f = a + 1;
            break;
          }
          continue;
        }
        l === -1 && (g = !1, l = a + 1), w === 46 ? n === -1 ? n = a : u !== 1 && (u = 1) : n !== -1 && (u = -1);
      }
      return n === -1 || l === -1 || // We saw a non-dot character immediately before the dot
      u === 0 || // The (right-most) trimmed path component is exactly '..'
      u === 1 && n === l - 1 && n === f + 1 ? "" : r.slice(n, l);
    },
    format: function(r) {
      if (r === null || typeof r != "object")
        throw new TypeError('The "pathObject" argument must be of type Object. Received type ' + typeof r);
      return s("/", r);
    },
    parse: function(r) {
      e(r);
      var n = { root: "", dir: "", base: "", ext: "", name: "" };
      if (r.length === 0) return n;
      var f = r.charCodeAt(0), l = f === 47, g;
      l ? (n.root = "/", g = 1) : g = 0;
      for (var u = -1, a = 0, w = -1, q = !0, b = r.length - 1, v = 0; b >= g; --b) {
        if (f = r.charCodeAt(b), f === 47) {
          if (!q) {
            a = b + 1;
            break;
          }
          continue;
        }
        w === -1 && (q = !1, w = b + 1), f === 46 ? u === -1 ? u = b : v !== 1 && (v = 1) : u !== -1 && (v = -1);
      }
      return u === -1 || w === -1 || // We saw a non-dot character immediately before the dot
      v === 0 || // The (right-most) trimmed path component is exactly '..'
      v === 1 && u === w - 1 && u === a + 1 ? w !== -1 && (a === 0 && l ? n.base = n.name = r.slice(1, w) : n.base = n.name = r.slice(a, w)) : (a === 0 && l ? (n.name = r.slice(1, u), n.base = r.slice(1, w)) : (n.name = r.slice(a, u), n.base = r.slice(a, w)), n.ext = r.slice(u, w)), a > 0 ? n.dir = r.slice(0, a - 1) : l && (n.dir = "/"), n;
    },
    sep: "/",
    delimiter: ":",
    win32: null,
    posix: null
  };
  return o.posix = o, pe = o, pe;
}
var it = nt();
const ft = /* @__PURE__ */ We(it), st = JSON.parse(
  Ge.readFileSync(ft.resolve(__dirname, "../package.json"), "utf8")
), ot = st.version, lt = {
  version: ot
};
function ut(e, i) {
  if (Object.prototype.toString.apply(e) !== "[object Array]") {
    if (e) throw new Error("dsf option must contain an array!");
    return Ne;
  } else if (e.length === 0) return Ne;
  let s = [];
  function o(t) {
    return {}.toString.call(t) === "[object Function]";
  }
  return e.forEach(function(t) {
    if (!t.name || !o(t.parse) || !o(t.stringify))
      throw new Error("extension does not match the DSF interface");
    s.push(function() {
      try {
        if (i == "parse")
          return t.parse.apply(null, arguments);
        if (i == "stringify") {
          let r = t.stringify.apply(null, arguments);
          if (r !== void 0 && (typeof r != "string" || r.length === 0 || r[0] === '"' || [].some.call(r, function(n) {
            return ct(n);
          })))
            throw new Error(
              "value may not be empty, start with a quote or contain a punctuator character except colon: " + r
            );
          return r;
        } else throw new Error("Invalid type");
      } catch (r) {
        throw new Error("DSF-" + t.name + " failed; " + r.message);
      }
    });
  }), at.bind(null, s);
}
function at(e, i) {
  if (e)
    for (let s = 0; s < e.length; s++) {
      let o = e[s](i);
      if (o !== void 0) return o;
    }
}
function Ne() {
}
function ct(e) {
  return e === "{" || e === "}" || e === "[" || e === "]" || e === ",";
}
function $e() {
  return {
    name: "math",
    parse: function(e) {
      switch (e) {
        case "+inf":
        case "inf":
        case "+Inf":
        case "Inf":
          return 1 / 0;
        case "-inf":
        case "-Inf":
          return -1 / 0;
        case "nan":
        case "NaN":
          return NaN;
      }
    },
    stringify: function(e) {
      if (typeof e == "number") {
        if (1 / e === -1 / 0) return "-0";
        if (e === 1 / 0) return "Inf";
        if (e === -1 / 0) return "-Inf";
        if (isNaN(e)) return "NaN";
      }
    }
  };
}
$e.description = "support for Inf/inf, -Inf/-inf, Nan/naN and -0";
function Be(e) {
  let i = e && e.out;
  return {
    name: "hex",
    parse: function(s) {
      if (/^0x[0-9A-Fa-f]+$/.test(s)) return parseInt(s, 16);
    },
    stringify: function(s) {
      if (i && Number.isInteger(s)) return "0x" + s.toString(16);
    }
  };
}
Be.description = "parse hexadecimal numbers prefixed with 0x";
function Ve() {
  return {
    name: "date",
    parse: function(e) {
      if (/^\d{4}-\d{2}-\d{2}$/.test(e) || /^\d{4}-\d{2}-\d{2}T\d{2}\:\d{2}\:\d{2}(?:.\d+)(?:Z|[+-]\d{2}:\d{2})$/.test(
        e
      )) {
        let i = Date.parse(e);
        if (!isNaN(i)) return new Date(i);
      }
    },
    stringify: function(e) {
      if (Object.prototype.toString.call(e) === "[object Date]") {
        let i = e.toISOString();
        return i.indexOf("T00:00:00.000Z", i.length - 14) !== -1 ? i.substr(0, 10) : i;
      }
    }
  };
}
Ve.description = "support ISO dates";
const ht = {
  math: $e,
  hex: Be,
  date: Ve
}, ke = {
  std: ht,
  loadDsf: ut
};
function Ke(e, i) {
  let s, o, t, r = {
    '"': '"',
    "'": "'",
    "\\": "\\",
    "/": "/",
    b: "\b",
    f: "\f",
    n: `
`,
    r: "\r",
    t: "	"
  }, n, f;
  function l() {
    o = 0, t = " ";
  }
  function g(c) {
    return c === "{" || c === "}" || c === "[" || c === "]" || c === "," || c === ":";
  }
  function u(c) {
    let y, m = 0, d = 1;
    for (y = o - 1; y > 0 && s[y] !== `
`; y--, m++)
      ;
    for (; y > 0; y--) s[y] === `
` && d++;
    throw new Error(
      c + " at line " + d + "," + m + " >>>" + s.substr(o - m, 20) + " ..."
    );
  }
  function a() {
    return t = s.charAt(o), o++, t;
  }
  function w(c) {
    return s.charAt(o + c);
  }
  function q(c) {
    let y = "", m = t;
    for (; a(); ) {
      if (t === m)
        return a(), c && m === "'" && t === "'" && y.length === 0 ? (a(), b()) : y;
      if (t === "\\")
        if (a(), t === "u") {
          let d = 0;
          for (let p = 0; p < 4; p++) {
            a();
            let h = t.charCodeAt(0), C;
            t >= "0" && t <= "9" ? C = h - 48 : t >= "a" && t <= "f" ? C = h - 97 + 10 : t >= "A" && t <= "F" ? C = h - 65 + 10 : u("Bad \\u char " + t), d = d * 16 + C;
          }
          y += String.fromCharCode(d);
        } else if (typeof r[t] == "string")
          y += r[t];
        else break;
      else t === `
` || t === "\r" ? u("Bad string containing newline") : y += t;
    }
    u("Bad string");
  }
  function b() {
    let c = "", y = 0, m = 0;
    for (; ; ) {
      let p = w(-m - 5);
      if (!p || p === `
`) break;
      m++;
    }
    function d() {
      let p = m;
      for (; t && t <= " " && t !== `
` && p-- > 0; ) a();
    }
    for (; t && t <= " " && t !== `
`; ) a();
    for (t === `
` && (a(), d()); ; ) {
      if (!t)
        u("Bad multiline string");
      else if (t === "'") {
        if (y++, a(), y === 3)
          return c.slice(-1) === `
` && (c = c.slice(0, -1)), c;
        continue;
      } else
        for (; y > 0; )
          c += "'", y--;
      t === `
` ? (c += `
`, a(), d()) : (t !== "\r" && (c += t), a());
    }
  }
  function v() {
    if (t === '"' || t === "'") return q(!1);
    let c = "", y = o, m = -1;
    for (; ; ) {
      if (t === ":")
        return c ? m >= 0 && m !== c.length && (o = y + m, u("Found whitespace in your key name (use quotes to include)")) : u("Found ':' but no key name (for an empty key name use quotes)"), c;
      t <= " " ? t ? m < 0 && (m = c.length) : u("Found EOF while looking for a key name (check your syntax)") : g(t) ? u(
        "Found '" + t + "' where a key name was expected (check your syntax or use quotes if the key name includes {}[],: or whitespace)"
      ) : c += t, a();
    }
  }
  function A() {
    for (; t; ) {
      for (; t && t <= " "; ) a();
      if (t === "#" || t === "/" && w(0) === "/")
        for (; t && t !== `
`; ) a();
      else if (t === "/" && w(0) === "*") {
        for (a(), a(); t && !(t === "*" && w(0) === "/"); ) a();
        t && (a(), a());
      } else break;
    }
  }
  function W() {
    let c = t;
    for (g(t) && u(
      "Found a punctuator character '" + t + "' when expecting a quoteless string (check your syntax)"
    ); ; ) {
      a();
      let y = t === "\r" || t === `
` || t === "";
      if (y || t === "," || t === "}" || t === "]" || t === "#" || t === "/" && (w(0) === "/" || w(0) === "*")) {
        let m = c[0];
        switch (m) {
          case "f":
            if (c.trim() === "false") return !1;
            break;
          case "n":
            if (c.trim() === "null") return null;
            break;
          case "t":
            if (c.trim() === "true") return !0;
            break;
          default:
            if (m === "-" || m >= "0" && m <= "9") {
              let d = T.tryParseNumber(c);
              if (d !== void 0) return d;
            }
        }
        if (y) {
          c = c.trim();
          let d = f(c);
          return d !== void 0 ? d : c;
        }
      }
      c += t;
    }
  }
  function L(c, y) {
    let m;
    for (c--, m = o - 2; m > c && s[m] <= " " && s[m] !== `
`; m--) ;
    s[m] === `
` && m--, s[m] === "\r" && m--;
    let d = s.substr(c, m - c + 1);
    for (m = 0; m < d.length; m++)
      if (d[m] > " ") {
        let p = d.indexOf(`
`);
        if (p >= 0) {
          let h = [d.substr(0, p), d.substr(p + 1)];
          return y && h[0].trim().length === 0 && h.shift(), h;
        } else return [d];
      }
    return [];
  }
  function fe(c) {
    function y(d, p) {
      let h, C, O, _;
      switch (typeof d) {
        case "string":
          d.indexOf(p) >= 0 && (_ = d);
          break;
        case "object":
          if (Object.prototype.toString.apply(d) === "[object Array]")
            for (h = 0, O = d.length; h < O; h++)
              _ = y(d[h], p) || _;
          else
            for (C in d)
              Object.prototype.hasOwnProperty.call(d, C) && (_ = y(d[C], p) || _);
      }
      return _;
    }
    function m(d) {
      let p = y(c, d);
      return p ? "found '" + d + `' in a string value, your mistake could be with:
  > ` + p + `
  (unquoted strings contain everything up to the next line!)` : "";
    }
    return m("}") || m("]");
  }
  function H() {
    let c = [], y, m, d;
    try {
      if (n && (y = T.createComment(c, { a: [] })), a(), m = o, A(), y && (d = L(m, !0).join(`
`)), t === "]")
        return a(), y && (y.e = [d]), c;
      for (; t; ) {
        if (c.push(ee()), m = o, A(), t === "," && (a(), m = o, A()), y) {
          let p = L(m);
          y.a.push([d || "", p[0] || ""]), d = p[1];
        }
        if (t === "]")
          return a(), y && (y.a[y.a.length - 1][1] += d || ""), c;
        A();
      }
      u("End of input while parsing an array (missing ']')");
    } catch (p) {
      throw p.hint = p.hint || fe(c), p;
    }
  }
  function Y(c) {
    let y = "", m = {}, d, p, h;
    try {
      if (n && (d = T.createComment(m, { c: {}, o: [] })), c ? p = 1 : (a(), p = o), A(), d && (h = L(p, !0).join(`
`)), t === "}" && !c)
        return d && (d.e = [h]), a(), m;
      for (; t; ) {
        if (y = v(), A(), t !== ":" && u("Expected ':' instead of '" + t + "'"), a(), m[y] = ee(), p = o, A(), t === "," && (a(), p = o, A()), d) {
          let C = L(p);
          d.c[y] = [h || "", C[0] || ""], h = C[1], d.o.push(y);
        }
        if (t === "}" && !c)
          return a(), d && (d.c[y][1] += h || ""), m;
        A();
      }
      if (c) return m;
      u("End of input while parsing an object (missing '}')");
    } catch (C) {
      throw C.hint = C.hint || fe(m), C;
    }
  }
  function ee() {
    switch (A(), t) {
      case "{":
        return Y();
      case "[":
        return H();
      case "'":
      case '"':
        return q(!0);
      default:
        return W();
    }
  }
  function P(c, y) {
    let m = o;
    if (A(), t && u("Syntax error, found trailing characters"), n) {
      let d = y.join(`
`), p = L(m).join(`
`);
      if (p || d) {
        let h = T.createComment(c, T.getComment(c));
        h.r = [d, p];
      }
    }
    return c;
  }
  function F() {
    A();
    let c = n ? L(1) : null;
    switch (t) {
      case "{":
        return P(Y(), c);
      case "[":
        return P(H(), c);
      default:
        return P(ee(), c);
    }
  }
  function k() {
    A();
    let c = n ? L(1) : null;
    switch (t) {
      case "{":
        return P(Y(), c);
      case "[":
        return P(H(), c);
    }
    try {
      return P(Y(!0), c);
    } catch (y) {
      l();
      try {
        return P(ee(), c);
      } catch {
        throw y;
      }
    }
  }
  if (typeof e != "string") throw new Error("source is not a string");
  let se = null, ce = !0;
  return i && typeof i == "object" && (n = i.keepWsc, se = i.dsf, ce = i.legacyRoot !== !1), f = ke.loadDsf(se, "parse"), s = e, l(), ce ? k() : F();
}
function mt(e, i) {
  let s = {
    obj: ["{", "}"],
    arr: ["[", "]"],
    key: ["", ""],
    qkey: ['"', '"'],
    col: [":", ""],
    com: [",", ""],
    str: ["", ""],
    qstr: ['"', '"'],
    mstr: ["'''", "'''"],
    num: ["", ""],
    lit: ["", ""],
    dsf: ["", ""],
    esc: ["\\", ""],
    uni: ["\\u", ""],
    rem: ["", ""]
  }, o = T.EOL, t = "  ", r = !1, n = !1, f = !1, l = !1, g = 0, u = 1, a = "", w = null, q = !1, b = s;
  if (i && typeof i == "object") {
    i.quotes = i.quotes === "always" ? "strings" : i.quotes, (i.eol === `
` || i.eol === `\r
`) && (o = i.eol), r = i.keepWsc, g = i.condense || 0, n = i.bracesSameLine, f = i.quotes === "all" || i.quotes === "keys", l = i.quotes === "all" || i.quotes === "strings" || i.separator === !0, l || i.multiline == "off" ? u = 0 : u = i.multiline == "no-tabs" ? 2 : 1, a = i.separator === !0 ? b.com[0] : "", w = i.dsf, q = i.sortProps, typeof i.space == "number" ? t = new Array(i.space + 1).join(" ") : typeof i.space == "string" && (t = i.space), i.colors === !0 && (b = {
      obj: ["\x1B[37m{\x1B[0m", "\x1B[37m}\x1B[0m"],
      arr: ["\x1B[37m[\x1B[0m", "\x1B[37m]\x1B[0m"],
      key: ["\x1B[33m", "\x1B[0m"],
      qkey: ['\x1B[33m"', '"\x1B[0m'],
      col: ["\x1B[37m:\x1B[0m", ""],
      com: ["\x1B[37m,\x1B[0m", ""],
      str: ["\x1B[37;1m", "\x1B[0m"],
      qstr: ['\x1B[37;1m"', '"\x1B[0m'],
      mstr: ["\x1B[37;1m'''", "'''\x1B[0m"],
      num: ["\x1B[36;1m", "\x1B[0m"],
      lit: ["\x1B[36m", "\x1B[0m"],
      dsf: ["\x1B[37m", "\x1B[0m"],
      esc: ["\x1B[31m\\", "\x1B[0m"],
      uni: ["\x1B[31m\\u", "\x1B[0m"],
      rem: ["\x1B[35m", "\x1B[0m"]
    });
    let h, C = Object.keys(s);
    for (h = C.length - 1; h >= 0; h--) {
      let O = C[h];
      b[O].push(s[O][0].length, s[O][1].length);
    }
  }
  let v, A = "-­؀-؄܏឴឵‌-‏\u2028- ⁠-⁯\uFEFF￰-￿", W = new RegExp('[\\\\\\"\0-' + A + "]", "g"), L = new RegExp(
    `^\\s|^"|^'|^#|^\\/\\*|^\\/\\/|^\\{|^\\}|^\\[|^\\]|^:|^,|\\s$|[\0-` + A + "]",
    "g"
  ), fe = new RegExp(
    "'''|^[\\s]+$|[\0-" + (u === 2 ? "	" : "\b") + "\v\f-" + A + "]",
    "g"
  ), H = new RegExp(
    "^(true|false|null)\\s*((,|\\]|\\}|#|//|/\\*).*)?$"
  ), Y = {
    // table of character substitutions
    "\b": "b",
    "	": "t",
    "\n": "n",
    "\f": "f",
    "\r": "r",
    '"': '"',
    "\\": "\\"
  }, ee = /[,\{\[\}\]\s:#"']|\/\/|\/\*/, P = "", F = 0;
  function k(h, C) {
    return F += h[0].length + h[1].length - h[2] - h[3], h[0] + C + h[1];
  }
  function se(h) {
    return h.replace(W, function(C) {
      let O = Y[C];
      return typeof O == "string" ? k(b.esc, O) : k(
        b.uni,
        ("0000" + C.charCodeAt(0).toString(16)).slice(-4)
      );
    });
  }
  function ce(h, C, O, _) {
    return h ? (L.lastIndex = 0, H.lastIndex = 0, l || O || L.test(h) || T.tryParseNumber(h, !0) !== void 0 || H.test(h) ? (W.lastIndex = 0, fe.lastIndex = 0, W.test(h) ? !fe.test(h) && !_ && u ? c(h, C) : k(b.qstr, se(h)) : k(b.qstr, h)) : k(b.str, h)) : k(b.qstr, "");
  }
  function c(h, C) {
    let O, _ = h.replace(/\r/g, "").split(`
`);
    if (C += t, _.length === 1)
      return k(b.mstr, _[0]);
    {
      let te = o + C + b.mstr[0];
      for (O = 0; O < _.length; O++)
        te += o, _[O] && (te += C + _[O]);
      return te + o + C + b.mstr[1];
    }
  }
  function y(h) {
    return h ? f || ee.test(h) ? (W.lastIndex = 0, k(
      b.qkey,
      W.test(h) ? se(h) : h
    )) : k(b.key, h) : '""';
  }
  function m(h, C, O, _) {
    function te(x) {
      return x && x[x[0] === "\r" ? 1 : 0] === `
`;
    }
    function je(x) {
      return x && !te(x);
    }
    function re(x, be, he) {
      if (!x) return "";
      x = T.forceComment(x);
      let D, Z = x.length;
      for (D = 0; D < Z && x[D] <= " "; D++)
        ;
      return he && D > 0 && (x = x.substr(D)), D < Z ? be + k(b.rem, x) : x;
    }
    let Ae = v(h);
    if (Ae !== void 0) return k(b.dsf, Ae);
    switch (typeof h) {
      case "string":
        return ce(h, P, C, _);
      case "number":
        return isFinite(h) ? k(b.num, String(h)) : k(b.lit, "null");
      case "boolean":
        return k(b.lit, String(h));
      case "object":
        if (!h) return k(b.lit, "null");
        let x;
        r && (x = T.getComment(h));
        let be = Object.prototype.toString.apply(h) === "[object Array]", he = P;
        P += t;
        let D = o + he, Z = o + P, Ee = O || n ? "" : D, E = [], R, I = g ? [] : null, Oe = l, Se = u, Te = a ? "" : b.com[0], me = 0, M, U, z, $, oe, N, B, X, ne;
        if (be) {
          for (M = 0, U = h.length; M < U; M++) {
            if (R = M < U - 1, x ? (N = x.a[M] || [], B = je(N[1]), E.push(re(N[0], `
`) + Z), I && (N[0] || N[1] || B) && (I = null)) : E.push(Z), F = 0, $ = h[M], E.push(
              m($, x ? B : !1, !0) + (R ? a : "")
            ), I) {
              switch (typeof $) {
                case "string":
                  F = 0, l = !0, u = 0, I.push(
                    m($, !1, !0) + (R ? b.com[0] : "")
                  ), l = Oe, u = Se;
                  break;
                case "object":
                  if ($) {
                    I = null;
                    break;
                  }
                // falls through
                default:
                  I.push(
                    E[E.length - 1] + (R ? Te : "")
                  );
                  break;
              }
              R && (F += b.com[0].length - b.com[2]), me += F;
            }
            x && N[1] && E.push(re(N[1], B ? " " : `
`, B));
          }
          U === 0 ? x && x.e && E.push(re(x.e[0], `
`) + D) : E.push(D), E.length === 0 ? X = k(b.arr, "") : (X = Ee + k(b.arr, E.join("")), I && (ne = I.join(" "), ne.length - me <= g && (X = k(b.arr, ne))));
        } else {
          let qe = x ? x.o.slice() : [], ye = [];
          for (z in h)
            Object.prototype.hasOwnProperty.call(h, z) && qe.indexOf(z) < 0 && ye.push(z);
          q && ye.sort();
          let Le = qe.concat(ye);
          for (M = 0, U = Le.length; M < U; M++)
            if (R = M < U - 1, z = Le[M], x ? (N = x.c[z] || [], B = je(N[1]), E.push(re(N[0], `
`) + Z), I && (N[0] || N[1] || B) && (I = null)) : E.push(Z), F = 0, $ = h[z], oe = m($, x && B), E.push(
              y(z) + b.col[0] + (te(oe) ? "" : " ") + oe + (R ? a : "")
            ), x && N[1] && E.push(re(N[1], B ? " " : `
`, B)), I) {
              switch (typeof $) {
                case "string":
                  F = 0, l = !0, u = 0, oe = m($, !1), l = Oe, u = Se, I.push(
                    y(z) + b.col[0] + " " + oe + (R ? b.com[0] : "")
                  );
                  break;
                case "object":
                  if ($) {
                    I = null;
                    break;
                  }
                // falls through
                default:
                  I.push(
                    E[E.length - 1] + (R ? Te : "")
                  );
                  break;
              }
              F += b.col[0].length - b.col[2], R && (F += b.com[0].length - b.com[2]), me += F;
            }
          U === 0 ? x && x.e && E.push(re(x.e[0], `
`) + D) : E.push(D), E.length === 0 ? X = k(b.obj, "") : (X = Ee + k(b.obj, E.join("")), I && (ne = I.join(" "), ne.length - me <= g && (X = k(b.obj, ne))));
        }
        return P = he, X;
    }
  }
  v = ke.loadDsf(w, "stringify");
  let d = "", p = r ? p = (T.getComment(e) || {}).r : null;
  return p && p[0] && (d = p[0] + `
`), d += m(e, null, !0, !0), p && (d += p[1] || ""), d;
}
function le(e, i, s) {
  let o;
  return e && (o = { b: e }), i && ((o = o || {}).a = i), s && ((o = o || {}).x = s), o;
}
function Ce(e, i) {
  if (e === null || typeof e != "object") return;
  let s = T.getComment(e);
  s && T.removeComment(e);
  let o, t, r, n;
  if (Object.prototype.toString.apply(e) === "[object Array]") {
    for (n = { a: {} }, o = 0, t = e.length; o < t; o++)
      Pe(n.a, o, s.a[o], Ce(e[o])) && (r = !0);
    !r && s.e && (n.e = le(s.e[0], s.e[1]), r = !0);
  } else {
    n = { s: {} };
    let f, l = Object.keys(e);
    for (s && s.o ? (f = [], s.o.concat(l).forEach(function(g) {
      Object.prototype.hasOwnProperty.call(e, g) && f.indexOf(g) < 0 && f.push(g);
    })) : f = l, n.o = f, o = 0, t = f.length; o < t; o++) {
      let g = f[o];
      Pe(n.s, g, s.c[g], Ce(e[g])) && (r = !0);
    }
    !r && s.e && (n.e = le(s.e[0], s.e[1]), r = !0);
  }
  return i && s && s.r && (n.r = le(s.r[0], s.r[1])), r ? n : void 0;
}
function dt() {
  let e = "";
  return [].forEach.call(arguments, function(i) {
    i && i.trim() !== "" && (e && (e += "; "), e += i.trim());
  }), e;
}
function gt(e, i) {
  let s = [];
  if (ve(e, i, s, []), s.length > 0) {
    let o = ge(i, null, 1);
    o += `
# Orphaned comments:
`, s.forEach(function(t) {
      o += ("# " + t.path.join("/") + ": " + dt(t.b, t.a, t.e)).replace(
        `
`,
        "\\n "
      ) + `
`;
    }), ge(i, o, 1);
  }
}
function Pe(e, i, s, o) {
  let t = le(
    s ? s[0] : void 0,
    s ? s[1] : void 0,
    o
  );
  return t && (e[i] = t), t;
}
function ue(e, i) {
  let s = le(i.b, i.a);
  return s.path = e, s;
}
function ae(e, i, s) {
  if (!e) return;
  let o, t;
  if (e.a)
    for (o = 0, t = e.a.length; o < t; o++) {
      let r = s.slice().concat([o]), n = e.a[o];
      n && (i.push(ue(r, n)), ae(n.x, i, r));
    }
  else e.o && e.o.forEach(function(r) {
    let n = s.slice().concat([r]), f = e.s[r];
    f && (i.push(ue(n, f)), ae(f.x, i, n));
  });
  e.e && i.push(ue(s, e.e));
}
function ve(e, i, s, o) {
  if (!e) return;
  if (i === null || typeof i != "object") {
    ae(e, s, o);
    return;
  }
  let t, r = T.createComment(i);
  if (o.length === 0 && e.r && (r.r = [e.r.b, e.r.a]), Object.prototype.toString.apply(i) === "[object Array]") {
    r.a = [];
    let n = e.a || {};
    for (let f in n)
      if (n.hasOwnProperty(f)) {
        t = parseInt(f);
        let l = e.a[f];
        if (l) {
          let g = o.slice().concat([t]);
          t < i.length ? (r.a[t] = [l.b, l.a], ve(l.x, i[t], s, g)) : (s.push(ue(g, l)), ae(l.x, s, g));
        }
      }
    t === 0 && e.e && (r.e = [e.e.b, e.e.a]);
  } else
    r.c = {}, r.o = [], (e.o || []).forEach(function(n) {
      let f = o.slice().concat([n]), l = e.s[n];
      Object.prototype.hasOwnProperty.call(i, n) ? (r.o.push(n), l && (r.c[n] = [l.b, l.a], ve(l.x, i[n], s, f))) : l && (s.push(ue(f, l)), ae(l.x, s, f));
    }), e.e && (r.e = [e.e.b, e.e.a]);
}
function ge(e, i, s) {
  let o = T.createComment(e, T.getComment(e));
  return o.r || (o.r = ["", ""]), (i || i === "") && (o.r[s] = T.forceComment(i)), o.r[s] || "";
}
const bt = {
  extract: function(e) {
    return Ce(e, !0);
  },
  merge: gt,
  header: function(e, i) {
    return ge(e, i, 0);
  },
  footer: function(e, i) {
    return ge(e, i, 1);
  }
};
/*!
 * Hjson
 * https://hjson.github.io
 *
 * Copyright 2014-2017 Christian Zangl, MIT license
 * Details and documentation:
 * https://github.com/hjson/hjson-js
 *
 * This code is based on the the JSON version by Douglas Crockford:
 * https://github.com/douglascrockford/JSON-js (json_parse.js, json2.js)
 */
const yt = () => T.EOL, pt = function(e) {
  (e === `
` || e === `\r
`) && (T.EOL = e);
}, wt = ke.std, xt = {
  parse: function(e, i) {
    return (i = i || {}).keepWsc = !0, Ke(e, i);
  },
  stringify: function(e, i) {
    return i = i || {}, i.keepWsc = !0, stringifyFunc(e, i);
  }
}, Ct = {
  parse: Ke,
  stringify: mt,
  endOfLine: yt,
  setEndOfLine: pt,
  version: lt,
  comments: bt,
  dsf: wt,
  rt: xt
};
export {
  bt as comments,
  Ct as default,
  wt as dsf,
  yt as endOfLine,
  Ke as parse,
  xt as rt,
  pt as setEndOfLine,
  mt as stringify,
  lt as version
};
