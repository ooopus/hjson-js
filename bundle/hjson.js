// node_modules/.pnpm/esbuild-plugin-polyfill-node@0.3.0_esbuild@0.25.1/node_modules/esbuild-plugin-polyfill-node/polyfills/__dirname.js
var __dirname = "/";

// node_modules/.pnpm/@jspm+core@2.1.0/node_modules/@jspm/core/nodelibs/browser/process.js
function Item(fun, array) {
  this.fun = fun;
  this.array = array;
}
Item.prototype.run = function() {
  this.fun.apply(null, this.array);
};
var env = {
  PATH: "/usr/bin",
  LANG: typeof navigator !== "undefined" ? navigator.language + ".UTF-8" : void 0,
  PWD: "/",
  HOME: "/home",
  TMP: "/tmp"
};
var _performance = {
  now: typeof performance !== "undefined" ? performance.now.bind(performance) : void 0,
  timing: typeof performance !== "undefined" ? performance.timing : void 0
};
if (_performance.now === void 0) {
  nowOffset = Date.now();
  if (_performance.timing && _performance.timing.navigationStart) {
    nowOffset = _performance.timing.navigationStart;
  }
  _performance.now = () => Date.now() - nowOffset;
}
var nowOffset;
function uptime() {
  return _performance.now() / 1e3;
}
var nanoPerSec = 1e9;
function hrtime(previousTimestamp) {
  var baseNow = Math.floor((Date.now() - _performance.now()) * 1e-3);
  var clocktime = _performance.now() * 1e-3;
  var seconds = Math.floor(clocktime) + baseNow;
  var nanoseconds = Math.floor(clocktime % 1 * 1e9);
  if (previousTimestamp) {
    seconds = seconds - previousTimestamp[0];
    nanoseconds = nanoseconds - previousTimestamp[1];
    if (nanoseconds < 0) {
      seconds--;
      nanoseconds += nanoPerSec;
    }
  }
  return [seconds, nanoseconds];
}
hrtime.bigint = function(time) {
  var diff = hrtime(time);
  if (typeof BigInt === "undefined") {
    return diff[0] * nanoPerSec + diff[1];
  }
  return BigInt(diff[0] * nanoPerSec) + BigInt(diff[1]);
};

// node_modules/.pnpm/@jspm+core@2.1.0/node_modules/@jspm/core/nodelibs/browser/os.js
var exports$1 = {};
var _dewExec = false;
function dew() {
  if (_dewExec) return exports$1;
  _dewExec = true;
  exports$1.endianness = function() {
    return "LE";
  };
  exports$1.hostname = function() {
    if (typeof location !== "undefined") {
      return location.hostname;
    } else return "";
  };
  exports$1.loadavg = function() {
    return [];
  };
  exports$1.uptime = function() {
    return 0;
  };
  exports$1.freemem = function() {
    return Number.MAX_VALUE;
  };
  exports$1.totalmem = function() {
    return Number.MAX_VALUE;
  };
  exports$1.cpus = function() {
    return [];
  };
  exports$1.type = function() {
    return "Browser";
  };
  exports$1.release = function() {
    if (typeof navigator !== "undefined") {
      return navigator.appVersion;
    }
    return "";
  };
  exports$1.networkInterfaces = exports$1.getNetworkInterfaces = function() {
    return {};
  };
  exports$1.arch = function() {
    return "javascript";
  };
  exports$1.platform = function() {
    return "browser";
  };
  exports$1.tmpdir = exports$1.tmpDir = function() {
    return "/tmp";
  };
  exports$1.EOL = "\n";
  exports$1.homedir = function() {
    return "/";
  };
  return exports$1;
}
var exports = dew();
exports["endianness"];
exports["hostname"];
exports["loadavg"];
exports["uptime"];
exports["freemem"];
exports["totalmem"];
exports["cpus"];
exports["type"];
exports["release"];
exports["networkInterfaces"];
exports["getNetworkInterfaces"];
exports["arch"];
exports["platform"];
exports["tmpdir"];
exports["tmpDir"];
exports["EOL"];
exports["homedir"];
var _endianness = new Uint8Array(new Uint16Array([1]).buffer)[0] === 1 ? "LE" : "BE";
exports.endianness = function() {
  return _endianness;
};
exports.homedir = function() {
  return "/home";
};
exports.version = function() {
  return "";
};
exports.arch = function() {
  return "x64";
};
exports.totalmem = function() {
  return navigator.deviceMemory !== void 0 ? navigator.deviceMemory * (1 << 30) : 2 * (1 << 30);
};
exports.cpus = function() {
  return Array(navigator.hardwareConcurrency || 0).fill({ model: "", times: {} });
};
exports.uptime = uptime;
exports.constants = {};
var version = exports.version;
var constants = exports.constants;
var EOL = exports.EOL;
var arch = exports.arch;
var cpus = exports.cpus;
var endianness = exports.endianness;
var freemem = exports.freemem;
var getNetworkInterfaces = exports.getNetworkInterfaces;
var homedir = exports.homedir;
var hostname = exports.hostname;
var loadavg = exports.loadavg;
var networkInterfaces = exports.networkInterfaces;
var platform = exports.platform;
var release = exports.release;
var tmpDir = exports.tmpDir;
var tmpdir = exports.tmpdir;
var totalmem = exports.totalmem;
var type = exports.type;

// lib/hjson-common.js
function tryParseNumber(text, stopAtNext) {
  let number, string = "", leadingZeros = 0, testLeading = true;
  let at = 0;
  let ch;
  function next() {
    ch = text.charAt(at);
    at++;
    return ch;
  }
  next();
  if (ch === "-") {
    string = "-";
    next();
  }
  while (ch >= "0" && ch <= "9") {
    if (testLeading) {
      if (ch == "0") leadingZeros++;
      else testLeading = false;
    }
    string += ch;
    next();
  }
  if (testLeading) leadingZeros--;
  if (ch === ".") {
    string += ".";
    while (next() && ch >= "0" && ch <= "9") string += ch;
  }
  if (ch === "e" || ch === "E") {
    string += ch;
    next();
    if (ch === "-" || ch === "+") {
      string += ch;
      next();
    }
    while (ch >= "0" && ch <= "9") {
      string += ch;
      next();
    }
  }
  while (ch && ch <= " ") next();
  if (stopAtNext) {
    if (ch === "," || ch === "}" || ch === "]" || ch === "#" || ch === "/" && (text[at] === "/" || text[at] === "*"))
      ch = 0;
  }
  number = +string;
  if (ch || leadingZeros || !isFinite(number)) return void 0;
  else return number;
}
function createComment(value, comment) {
  if (Object.defineProperty)
    Object.defineProperty(value, "__COMMENTS__", {
      enumerable: false,
      writable: true
    });
  return value.__COMMENTS__ = comment || {};
}
function removeComment(value) {
  Object.defineProperty(value, "__COMMENTS__", { value: void 0 });
}
function getComment(value) {
  return value.__COMMENTS__;
}
function forceComment(text) {
  if (!text) return "";
  let a = text.split("\n");
  let str, i, j, len;
  for (j = 0; j < a.length; j++) {
    str = a[j];
    len = str.length;
    for (i = 0; i < len; i++) {
      let c = str[i];
      if (c === "#") break;
      else if (c === "/" && (str[i + 1] === "/" || str[i + 1] === "*")) {
        if (str[i + 1] === "*") j = a.length;
        break;
      } else if (c > " ") {
        a[j] = "# " + str;
        break;
      }
    }
  }
  return a.join("\n");
}
var hjson_common_default = {
  tryParseNumber,
  createComment,
  removeComment,
  getComment,
  forceComment
};

// node_modules/.pnpm/esbuild-plugin-polyfill-node@0.3.0_esbuild@0.25.1/node_modules/esbuild-plugin-polyfill-node/polyfills/empty.js
var empty_default = {};

// node_modules/.pnpm/@jspm+core@2.1.0/node_modules/@jspm/core/nodelibs/browser/chunk-DEMDiNwt.js
function unimplemented(name) {
  throw new Error("Node.js process " + name + " is not supported by JSPM core outside of Node.js");
}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;
function cleanUpNextTick() {
  if (!draining || !currentQueue)
    return;
  draining = false;
  if (currentQueue.length) {
    queue = currentQueue.concat(queue);
  } else {
    queueIndex = -1;
  }
  if (queue.length)
    drainQueue();
}
function drainQueue() {
  if (draining)
    return;
  var timeout = setTimeout(cleanUpNextTick, 0);
  draining = true;
  var len = queue.length;
  while (len) {
    currentQueue = queue;
    queue = [];
    while (++queueIndex < len) {
      if (currentQueue)
        currentQueue[queueIndex].run();
    }
    queueIndex = -1;
    len = queue.length;
  }
  currentQueue = null;
  draining = false;
  clearTimeout(timeout);
}
function nextTick(fun) {
  var args = new Array(arguments.length - 1);
  if (arguments.length > 1) {
    for (var i = 1; i < arguments.length; i++)
      args[i - 1] = arguments[i];
  }
  queue.push(new Item2(fun, args));
  if (queue.length === 1 && !draining)
    setTimeout(drainQueue, 0);
}
function Item2(fun, array) {
  this.fun = fun;
  this.array = array;
}
Item2.prototype.run = function() {
  this.fun.apply(null, this.array);
};
var title = "browser";
var arch2 = "x64";
var platform2 = "browser";
var env2 = {
  PATH: "/usr/bin",
  LANG: navigator.language + ".UTF-8",
  PWD: "/",
  HOME: "/home",
  TMP: "/tmp"
};
var argv = ["/usr/bin/node"];
var execArgv = [];
var version2 = "v16.8.0";
var versions = {};
var emitWarning = function(message, type2) {
  console.warn((type2 ? type2 + ": " : "") + message);
};
var binding = function(name) {
  unimplemented("binding");
};
var umask = function(mask) {
  return 0;
};
var cwd = function() {
  return "/";
};
var chdir = function(dir) {
};
var release2 = {
  name: "node",
  sourceUrl: "",
  headersUrl: "",
  libUrl: ""
};
function noop() {
}
var _rawDebug = noop;
var moduleLoadList = [];
function _linkedBinding(name) {
  unimplemented("_linkedBinding");
}
var domain = {};
var _exiting = false;
var config = {};
function dlopen(name) {
  unimplemented("dlopen");
}
function _getActiveRequests() {
  return [];
}
function _getActiveHandles() {
  return [];
}
var reallyExit = noop;
var _kill = noop;
var cpuUsage = function() {
  return {};
};
var resourceUsage = cpuUsage;
var memoryUsage = cpuUsage;
var kill = noop;
var exit = noop;
var openStdin = noop;
var allowedNodeEnvironmentFlags = {};
function assert(condition, message) {
  if (!condition) throw new Error(message || "assertion error");
}
var features = {
  inspector: false,
  debug: false,
  uv: false,
  ipv6: false,
  tls_alpn: false,
  tls_sni: false,
  tls_ocsp: false,
  tls: false,
  cached_builtins: true
};
var _fatalExceptions = noop;
var setUncaughtExceptionCaptureCallback = noop;
function hasUncaughtExceptionCaptureCallback() {
  return false;
}
var _tickCallback = noop;
var _debugProcess = noop;
var _debugEnd = noop;
var _startProfilerIdleNotifier = noop;
var _stopProfilerIdleNotifier = noop;
var stdout = void 0;
var stderr = void 0;
var stdin = void 0;
var abort = noop;
var pid = 2;
var ppid = 1;
var execPath = "/bin/usr/node";
var debugPort = 9229;
var argv0 = "node";
var _preload_modules = [];
var setSourceMapsEnabled = noop;
var _performance2 = {
  now: typeof performance !== "undefined" ? performance.now.bind(performance) : void 0,
  timing: typeof performance !== "undefined" ? performance.timing : void 0
};
if (_performance2.now === void 0) {
  nowOffset = Date.now();
  if (_performance2.timing && _performance2.timing.navigationStart) {
    nowOffset = _performance2.timing.navigationStart;
  }
  _performance2.now = () => Date.now() - nowOffset;
}
var nowOffset;
function uptime2() {
  return _performance2.now() / 1e3;
}
var nanoPerSec2 = 1e9;
function hrtime2(previousTimestamp) {
  var baseNow = Math.floor((Date.now() - _performance2.now()) * 1e-3);
  var clocktime = _performance2.now() * 1e-3;
  var seconds = Math.floor(clocktime) + baseNow;
  var nanoseconds = Math.floor(clocktime % 1 * 1e9);
  if (previousTimestamp) {
    seconds = seconds - previousTimestamp[0];
    nanoseconds = nanoseconds - previousTimestamp[1];
    if (nanoseconds < 0) {
      seconds--;
      nanoseconds += nanoPerSec2;
    }
  }
  return [seconds, nanoseconds];
}
hrtime2.bigint = function(time) {
  var diff = hrtime2(time);
  if (typeof BigInt === "undefined") {
    return diff[0] * nanoPerSec2 + diff[1];
  }
  return BigInt(diff[0] * nanoPerSec2) + BigInt(diff[1]);
};
var _maxListeners = 10;
var _events = {};
var _eventsCount = 0;
function on() {
  return process;
}
var addListener = on;
var once = on;
var off = on;
var removeListener = on;
var removeAllListeners = on;
var emit = noop;
var prependListener = on;
var prependOnceListener = on;
function listeners(name) {
  return [];
}
var process = {
  version: version2,
  versions,
  arch: arch2,
  platform: platform2,
  release: release2,
  _rawDebug,
  moduleLoadList,
  binding,
  _linkedBinding,
  _events,
  _eventsCount,
  _maxListeners,
  on,
  addListener,
  once,
  off,
  removeListener,
  removeAllListeners,
  emit,
  prependListener,
  prependOnceListener,
  listeners,
  domain,
  _exiting,
  config,
  dlopen,
  uptime: uptime2,
  _getActiveRequests,
  _getActiveHandles,
  reallyExit,
  _kill,
  cpuUsage,
  resourceUsage,
  memoryUsage,
  kill,
  exit,
  openStdin,
  allowedNodeEnvironmentFlags,
  assert,
  features,
  _fatalExceptions,
  setUncaughtExceptionCaptureCallback,
  hasUncaughtExceptionCaptureCallback,
  emitWarning,
  nextTick,
  _tickCallback,
  _debugProcess,
  _debugEnd,
  _startProfilerIdleNotifier,
  _stopProfilerIdleNotifier,
  stdout,
  stdin,
  stderr,
  abort,
  umask,
  chdir,
  cwd,
  env: env2,
  title,
  argv,
  execArgv,
  pid,
  ppid,
  execPath,
  debugPort,
  hrtime: hrtime2,
  argv0,
  _preload_modules,
  setSourceMapsEnabled
};

// node_modules/.pnpm/@jspm+core@2.1.0/node_modules/@jspm/core/nodelibs/browser/chunk-BlJi4mNy.js
var exports$12 = {};
var _dewExec2 = false;
function dew2() {
  if (_dewExec2) return exports$12;
  _dewExec2 = true;
  var process$1 = process;
  function assertPath(path) {
    if (typeof path !== "string") {
      throw new TypeError("Path must be a string. Received " + JSON.stringify(path));
    }
  }
  function normalizeStringPosix(path, allowAboveRoot) {
    var res = "";
    var lastSegmentLength = 0;
    var lastSlash = -1;
    var dots = 0;
    var code;
    for (var i = 0; i <= path.length; ++i) {
      if (i < path.length) code = path.charCodeAt(i);
      else if (code === 47) break;
      else code = 47;
      if (code === 47) {
        if (lastSlash === i - 1 || dots === 1) ;
        else if (lastSlash !== i - 1 && dots === 2) {
          if (res.length < 2 || lastSegmentLength !== 2 || res.charCodeAt(res.length - 1) !== 46 || res.charCodeAt(res.length - 2) !== 46) {
            if (res.length > 2) {
              var lastSlashIndex = res.lastIndexOf("/");
              if (lastSlashIndex !== res.length - 1) {
                if (lastSlashIndex === -1) {
                  res = "";
                  lastSegmentLength = 0;
                } else {
                  res = res.slice(0, lastSlashIndex);
                  lastSegmentLength = res.length - 1 - res.lastIndexOf("/");
                }
                lastSlash = i;
                dots = 0;
                continue;
              }
            } else if (res.length === 2 || res.length === 1) {
              res = "";
              lastSegmentLength = 0;
              lastSlash = i;
              dots = 0;
              continue;
            }
          }
          if (allowAboveRoot) {
            if (res.length > 0) res += "/..";
            else res = "..";
            lastSegmentLength = 2;
          }
        } else {
          if (res.length > 0) res += "/" + path.slice(lastSlash + 1, i);
          else res = path.slice(lastSlash + 1, i);
          lastSegmentLength = i - lastSlash - 1;
        }
        lastSlash = i;
        dots = 0;
      } else if (code === 46 && dots !== -1) {
        ++dots;
      } else {
        dots = -1;
      }
    }
    return res;
  }
  function _format(sep2, pathObject) {
    var dir = pathObject.dir || pathObject.root;
    var base = pathObject.base || (pathObject.name || "") + (pathObject.ext || "");
    if (!dir) {
      return base;
    }
    if (dir === pathObject.root) {
      return dir + base;
    }
    return dir + sep2 + base;
  }
  var posix2 = {
    // path.resolve([from ...], to)
    resolve: function resolve2() {
      var resolvedPath = "";
      var resolvedAbsolute = false;
      var cwd2;
      for (var i = arguments.length - 1; i >= -1 && !resolvedAbsolute; i--) {
        var path;
        if (i >= 0) path = arguments[i];
        else {
          if (cwd2 === void 0) cwd2 = process$1.cwd();
          path = cwd2;
        }
        assertPath(path);
        if (path.length === 0) {
          continue;
        }
        resolvedPath = path + "/" + resolvedPath;
        resolvedAbsolute = path.charCodeAt(0) === 47;
      }
      resolvedPath = normalizeStringPosix(resolvedPath, !resolvedAbsolute);
      if (resolvedAbsolute) {
        if (resolvedPath.length > 0) return "/" + resolvedPath;
        else return "/";
      } else if (resolvedPath.length > 0) {
        return resolvedPath;
      } else {
        return ".";
      }
    },
    normalize: function normalize2(path) {
      assertPath(path);
      if (path.length === 0) return ".";
      var isAbsolute2 = path.charCodeAt(0) === 47;
      var trailingSeparator = path.charCodeAt(path.length - 1) === 47;
      path = normalizeStringPosix(path, !isAbsolute2);
      if (path.length === 0 && !isAbsolute2) path = ".";
      if (path.length > 0 && trailingSeparator) path += "/";
      if (isAbsolute2) return "/" + path;
      return path;
    },
    isAbsolute: function isAbsolute2(path) {
      assertPath(path);
      return path.length > 0 && path.charCodeAt(0) === 47;
    },
    join: function join2() {
      if (arguments.length === 0) return ".";
      var joined;
      for (var i = 0; i < arguments.length; ++i) {
        var arg = arguments[i];
        assertPath(arg);
        if (arg.length > 0) {
          if (joined === void 0) joined = arg;
          else joined += "/" + arg;
        }
      }
      if (joined === void 0) return ".";
      return posix2.normalize(joined);
    },
    relative: function relative2(from, to) {
      assertPath(from);
      assertPath(to);
      if (from === to) return "";
      from = posix2.resolve(from);
      to = posix2.resolve(to);
      if (from === to) return "";
      var fromStart = 1;
      for (; fromStart < from.length; ++fromStart) {
        if (from.charCodeAt(fromStart) !== 47) break;
      }
      var fromEnd = from.length;
      var fromLen = fromEnd - fromStart;
      var toStart = 1;
      for (; toStart < to.length; ++toStart) {
        if (to.charCodeAt(toStart) !== 47) break;
      }
      var toEnd = to.length;
      var toLen = toEnd - toStart;
      var length = fromLen < toLen ? fromLen : toLen;
      var lastCommonSep = -1;
      var i = 0;
      for (; i <= length; ++i) {
        if (i === length) {
          if (toLen > length) {
            if (to.charCodeAt(toStart + i) === 47) {
              return to.slice(toStart + i + 1);
            } else if (i === 0) {
              return to.slice(toStart + i);
            }
          } else if (fromLen > length) {
            if (from.charCodeAt(fromStart + i) === 47) {
              lastCommonSep = i;
            } else if (i === 0) {
              lastCommonSep = 0;
            }
          }
          break;
        }
        var fromCode = from.charCodeAt(fromStart + i);
        var toCode = to.charCodeAt(toStart + i);
        if (fromCode !== toCode) break;
        else if (fromCode === 47) lastCommonSep = i;
      }
      var out = "";
      for (i = fromStart + lastCommonSep + 1; i <= fromEnd; ++i) {
        if (i === fromEnd || from.charCodeAt(i) === 47) {
          if (out.length === 0) out += "..";
          else out += "/..";
        }
      }
      if (out.length > 0) return out + to.slice(toStart + lastCommonSep);
      else {
        toStart += lastCommonSep;
        if (to.charCodeAt(toStart) === 47) ++toStart;
        return to.slice(toStart);
      }
    },
    _makeLong: function _makeLong2(path) {
      return path;
    },
    dirname: function dirname2(path) {
      assertPath(path);
      if (path.length === 0) return ".";
      var code = path.charCodeAt(0);
      var hasRoot = code === 47;
      var end = -1;
      var matchedSlash = true;
      for (var i = path.length - 1; i >= 1; --i) {
        code = path.charCodeAt(i);
        if (code === 47) {
          if (!matchedSlash) {
            end = i;
            break;
          }
        } else {
          matchedSlash = false;
        }
      }
      if (end === -1) return hasRoot ? "/" : ".";
      if (hasRoot && end === 1) return "//";
      return path.slice(0, end);
    },
    basename: function basename2(path, ext) {
      if (ext !== void 0 && typeof ext !== "string") throw new TypeError('"ext" argument must be a string');
      assertPath(path);
      var start = 0;
      var end = -1;
      var matchedSlash = true;
      var i;
      if (ext !== void 0 && ext.length > 0 && ext.length <= path.length) {
        if (ext.length === path.length && ext === path) return "";
        var extIdx = ext.length - 1;
        var firstNonSlashEnd = -1;
        for (i = path.length - 1; i >= 0; --i) {
          var code = path.charCodeAt(i);
          if (code === 47) {
            if (!matchedSlash) {
              start = i + 1;
              break;
            }
          } else {
            if (firstNonSlashEnd === -1) {
              matchedSlash = false;
              firstNonSlashEnd = i + 1;
            }
            if (extIdx >= 0) {
              if (code === ext.charCodeAt(extIdx)) {
                if (--extIdx === -1) {
                  end = i;
                }
              } else {
                extIdx = -1;
                end = firstNonSlashEnd;
              }
            }
          }
        }
        if (start === end) end = firstNonSlashEnd;
        else if (end === -1) end = path.length;
        return path.slice(start, end);
      } else {
        for (i = path.length - 1; i >= 0; --i) {
          if (path.charCodeAt(i) === 47) {
            if (!matchedSlash) {
              start = i + 1;
              break;
            }
          } else if (end === -1) {
            matchedSlash = false;
            end = i + 1;
          }
        }
        if (end === -1) return "";
        return path.slice(start, end);
      }
    },
    extname: function extname2(path) {
      assertPath(path);
      var startDot = -1;
      var startPart = 0;
      var end = -1;
      var matchedSlash = true;
      var preDotState = 0;
      for (var i = path.length - 1; i >= 0; --i) {
        var code = path.charCodeAt(i);
        if (code === 47) {
          if (!matchedSlash) {
            startPart = i + 1;
            break;
          }
          continue;
        }
        if (end === -1) {
          matchedSlash = false;
          end = i + 1;
        }
        if (code === 46) {
          if (startDot === -1) startDot = i;
          else if (preDotState !== 1) preDotState = 1;
        } else if (startDot !== -1) {
          preDotState = -1;
        }
      }
      if (startDot === -1 || end === -1 || // We saw a non-dot character immediately before the dot
      preDotState === 0 || // The (right-most) trimmed path component is exactly '..'
      preDotState === 1 && startDot === end - 1 && startDot === startPart + 1) {
        return "";
      }
      return path.slice(startDot, end);
    },
    format: function format2(pathObject) {
      if (pathObject === null || typeof pathObject !== "object") {
        throw new TypeError('The "pathObject" argument must be of type Object. Received type ' + typeof pathObject);
      }
      return _format("/", pathObject);
    },
    parse: function parse3(path) {
      assertPath(path);
      var ret = {
        root: "",
        dir: "",
        base: "",
        ext: "",
        name: ""
      };
      if (path.length === 0) return ret;
      var code = path.charCodeAt(0);
      var isAbsolute2 = code === 47;
      var start;
      if (isAbsolute2) {
        ret.root = "/";
        start = 1;
      } else {
        start = 0;
      }
      var startDot = -1;
      var startPart = 0;
      var end = -1;
      var matchedSlash = true;
      var i = path.length - 1;
      var preDotState = 0;
      for (; i >= start; --i) {
        code = path.charCodeAt(i);
        if (code === 47) {
          if (!matchedSlash) {
            startPart = i + 1;
            break;
          }
          continue;
        }
        if (end === -1) {
          matchedSlash = false;
          end = i + 1;
        }
        if (code === 46) {
          if (startDot === -1) startDot = i;
          else if (preDotState !== 1) preDotState = 1;
        } else if (startDot !== -1) {
          preDotState = -1;
        }
      }
      if (startDot === -1 || end === -1 || // We saw a non-dot character immediately before the dot
      preDotState === 0 || // The (right-most) trimmed path component is exactly '..'
      preDotState === 1 && startDot === end - 1 && startDot === startPart + 1) {
        if (end !== -1) {
          if (startPart === 0 && isAbsolute2) ret.base = ret.name = path.slice(1, end);
          else ret.base = ret.name = path.slice(startPart, end);
        }
      } else {
        if (startPart === 0 && isAbsolute2) {
          ret.name = path.slice(1, startDot);
          ret.base = path.slice(1, end);
        } else {
          ret.name = path.slice(startPart, startDot);
          ret.base = path.slice(startPart, end);
        }
        ret.ext = path.slice(startDot, end);
      }
      if (startPart > 0) ret.dir = path.slice(0, startPart - 1);
      else if (isAbsolute2) ret.dir = "/";
      return ret;
    },
    sep: "/",
    delimiter: ":",
    win32: null,
    posix: null
  };
  posix2.posix = posix2;
  exports$12 = posix2;
  return exports$12;
}
var exports2 = dew2();

// node_modules/.pnpm/@jspm+core@2.1.0/node_modules/@jspm/core/nodelibs/browser/path.js
var _makeLong = exports2._makeLong;
var basename = exports2.basename;
var delimiter = exports2.delimiter;
var dirname = exports2.dirname;
var extname = exports2.extname;
var format = exports2.format;
var isAbsolute = exports2.isAbsolute;
var join = exports2.join;
var normalize = exports2.normalize;
var parse = exports2.parse;
var posix = exports2.posix;
var relative = exports2.relative;
var resolve = exports2.resolve;
var sep = exports2.sep;
var win32 = exports2.win32;

// lib/hjson-version.js
var packageJson = JSON.parse(
  empty_default.readFileSync(exports2.resolve(__dirname, "../package.json"), "utf8")
);
var version3 = packageJson.version;
var hjson_version_default = {
  version: version3
};

// lib/hjson-dsf.js
function loadDsf(col, type2) {
  if (Object.prototype.toString.apply(col) !== "[object Array]") {
    if (col) throw new Error("dsf option must contain an array!");
    else return nopDsf;
  } else if (col.length === 0) return nopDsf;
  let dsf = [];
  function isFunction(f) {
    return {}.toString.call(f) === "[object Function]";
  }
  col.forEach(function(x) {
    if (!x.name || !isFunction(x.parse) || !isFunction(x.stringify))
      throw new Error("extension does not match the DSF interface");
    dsf.push(function() {
      try {
        if (type2 == "parse") {
          return x.parse.apply(null, arguments);
        } else if (type2 == "stringify") {
          let res = x.stringify.apply(null, arguments);
          if (res !== void 0 && (typeof res !== "string" || res.length === 0 || res[0] === '"' || [].some.call(res, function(c) {
            return isInvalidDsfChar(c);
          })))
            throw new Error(
              "value may not be empty, start with a quote or contain a punctuator character except colon: " + res
            );
          return res;
        } else throw new Error("Invalid type");
      } catch (e) {
        throw new Error("DSF-" + x.name + " failed; " + e.message);
      }
    });
  });
  return runDsf.bind(null, dsf);
}
function runDsf(dsf, value) {
  if (dsf) {
    for (let i = 0; i < dsf.length; i++) {
      let res = dsf[i](value);
      if (res !== void 0) return res;
    }
  }
}
function nopDsf() {
}
function isInvalidDsfChar(c) {
  return c === "{" || c === "}" || c === "[" || c === "]" || c === ",";
}
function math() {
  return {
    name: "math",
    parse: function(value) {
      switch (value) {
        case "+inf":
        case "inf":
        case "+Inf":
        case "Inf":
          return Infinity;
        case "-inf":
        case "-Inf":
          return -Infinity;
        case "nan":
        case "NaN":
          return NaN;
      }
    },
    stringify: function(value) {
      if (typeof value !== "number") return;
      if (1 / value === -Infinity) return "-0";
      if (value === Infinity) return "Inf";
      if (value === -Infinity) return "-Inf";
      if (isNaN(value)) return "NaN";
    }
  };
}
math.description = "support for Inf/inf, -Inf/-inf, Nan/naN and -0";
function hex(opt) {
  let out = opt && opt.out;
  return {
    name: "hex",
    parse: function(value) {
      if (/^0x[0-9A-Fa-f]+$/.test(value)) return parseInt(value, 16);
    },
    stringify: function(value) {
      if (out && Number.isInteger(value)) return "0x" + value.toString(16);
    }
  };
}
hex.description = "parse hexadecimal numbers prefixed with 0x";
function date() {
  return {
    name: "date",
    parse: function(value) {
      if (/^\d{4}-\d{2}-\d{2}$/.test(value) || /^\d{4}-\d{2}-\d{2}T\d{2}\:\d{2}\:\d{2}(?:.\d+)(?:Z|[+-]\d{2}:\d{2})$/.test(
        value
      )) {
        let dt = Date.parse(value);
        if (!isNaN(dt)) return new Date(dt);
      }
    },
    stringify: function(value) {
      if (Object.prototype.toString.call(value) === "[object Date]") {
        let dt = value.toISOString();
        if (dt.indexOf("T00:00:00.000Z", dt.length - 14) !== -1)
          return dt.substr(0, 10);
        else return dt;
      }
    }
  };
}
date.description = "support ISO dates";
var std = {
  math,
  hex,
  date
};
var hjson_dsf_default = {
  std,
  loadDsf
};

// lib/hjson-parse.js
function parse2(source, opt) {
  let text;
  let at;
  let ch;
  let escapee = {
    '"': '"',
    "'": "'",
    "\\": "\\",
    "/": "/",
    b: "\b",
    f: "\f",
    n: "\n",
    r: "\r",
    t: "	"
  };
  let keepComments;
  let runDsf2;
  function resetAt() {
    at = 0;
    ch = " ";
  }
  function isPunctuatorChar(c) {
    return c === "{" || c === "}" || c === "[" || c === "]" || c === "," || c === ":";
  }
  function error(m) {
    let i, col = 0, line = 1;
    for (i = at - 1; i > 0 && text[i] !== "\n"; i--, col++) {
    }
    for (; i > 0; i--) if (text[i] === "\n") line++;
    throw new Error(
      m + " at line " + line + "," + col + " >>>" + text.substr(at - col, 20) + " ..."
    );
  }
  function next() {
    ch = text.charAt(at);
    at++;
    return ch;
  }
  function peek(offs) {
    return text.charAt(at + offs);
  }
  function string(allowML) {
    let string2 = "";
    let exitCh = ch;
    while (next()) {
      if (ch === exitCh) {
        next();
        if (allowML && exitCh === "'" && ch === "'" && string2.length === 0) {
          next();
          return mlString();
        } else return string2;
      }
      if (ch === "\\") {
        next();
        if (ch === "u") {
          let uffff = 0;
          for (let i = 0; i < 4; i++) {
            next();
            let c = ch.charCodeAt(0), hex2;
            if (ch >= "0" && ch <= "9") hex2 = c - 48;
            else if (ch >= "a" && ch <= "f") hex2 = c - 97 + 10;
            else if (ch >= "A" && ch <= "F") hex2 = c - 65 + 10;
            else error("Bad \\u char " + ch);
            uffff = uffff * 16 + hex2;
          }
          string2 += String.fromCharCode(uffff);
        } else if (typeof escapee[ch] === "string") {
          string2 += escapee[ch];
        } else break;
      } else if (ch === "\n" || ch === "\r") {
        error("Bad string containing newline");
      } else {
        string2 += ch;
      }
    }
    error("Bad string");
  }
  function mlString() {
    let string2 = "", triple = 0;
    let indent = 0;
    for (; ; ) {
      let c = peek(-indent - 5);
      if (!c || c === "\n") break;
      indent++;
    }
    function skipIndent() {
      let skip = indent;
      while (ch && ch <= " " && ch !== "\n" && skip-- > 0) next();
    }
    while (ch && ch <= " " && ch !== "\n") next();
    if (ch === "\n") {
      next();
      skipIndent();
    }
    for (; ; ) {
      if (!ch) {
        error("Bad multiline string");
      } else if (ch === "'") {
        triple++;
        next();
        if (triple === 3) {
          if (string2.slice(-1) === "\n") string2 = string2.slice(0, -1);
          return string2;
        } else continue;
      } else {
        while (triple > 0) {
          string2 += "'";
          triple--;
        }
      }
      if (ch === "\n") {
        string2 += "\n";
        next();
        skipIndent();
      } else {
        if (ch !== "\r") string2 += ch;
        next();
      }
    }
  }
  function keyname() {
    if (ch === '"' || ch === "'") return string(false);
    let name = "", start = at, space = -1;
    for (; ; ) {
      if (ch === ":") {
        if (!name)
          error("Found ':' but no key name (for an empty key name use quotes)");
        else if (space >= 0 && space !== name.length) {
          at = start + space;
          error("Found whitespace in your key name (use quotes to include)");
        }
        return name;
      } else if (ch <= " ") {
        if (!ch)
          error("Found EOF while looking for a key name (check your syntax)");
        else if (space < 0) space = name.length;
      } else if (isPunctuatorChar(ch)) {
        error(
          "Found '" + ch + "' where a key name was expected (check your syntax or use quotes if the key name includes {}[],: or whitespace)"
        );
      } else {
        name += ch;
      }
      next();
    }
  }
  function white() {
    while (ch) {
      while (ch && ch <= " ") next();
      if (ch === "#" || ch === "/" && peek(0) === "/") {
        while (ch && ch !== "\n") next();
      } else if (ch === "/" && peek(0) === "*") {
        next();
        next();
        while (ch && !(ch === "*" && peek(0) === "/")) next();
        if (ch) {
          next();
          next();
        }
      } else break;
    }
  }
  function tfnns() {
    let value2 = ch;
    if (isPunctuatorChar(ch))
      error(
        "Found a punctuator character '" + ch + "' when expecting a quoteless string (check your syntax)"
      );
    for (; ; ) {
      next();
      let isEol = ch === "\r" || ch === "\n" || ch === "";
      if (isEol || ch === "," || ch === "}" || ch === "]" || ch === "#" || ch === "/" && (peek(0) === "/" || peek(0) === "*")) {
        let chf = value2[0];
        switch (chf) {
          case "f":
            if (value2.trim() === "false") return false;
            break;
          case "n":
            if (value2.trim() === "null") return null;
            break;
          case "t":
            if (value2.trim() === "true") return true;
            break;
          default:
            if (chf === "-" || chf >= "0" && chf <= "9") {
              let n = hjson_common_default.tryParseNumber(value2);
              if (n !== void 0) return n;
            }
        }
        if (isEol) {
          value2 = value2.trim();
          let dsfValue = runDsf2(value2);
          return dsfValue !== void 0 ? dsfValue : value2;
        }
      }
      value2 += ch;
    }
  }
  function getComment2(cAt, first) {
    let i;
    cAt--;
    for (i = at - 2; i > cAt && text[i] <= " " && text[i] !== "\n"; i--) ;
    if (text[i] === "\n") i--;
    if (text[i] === "\r") i--;
    let res = text.substr(cAt, i - cAt + 1);
    for (i = 0; i < res.length; i++) {
      if (res[i] > " ") {
        let j = res.indexOf("\n");
        if (j >= 0) {
          let c = [res.substr(0, j), res.substr(j + 1)];
          if (first && c[0].trim().length === 0) c.shift();
          return c;
        } else return [res];
      }
    }
    return [];
  }
  function errorClosingHint(value2) {
    function search(value3, ch2) {
      let i, k, length, res;
      switch (typeof value3) {
        case "string":
          if (value3.indexOf(ch2) >= 0) res = value3;
          break;
        case "object":
          if (Object.prototype.toString.apply(value3) === "[object Array]") {
            for (i = 0, length = value3.length; i < length; i++) {
              res = search(value3[i], ch2) || res;
            }
          } else {
            for (k in value3) {
              if (!Object.prototype.hasOwnProperty.call(value3, k)) continue;
              res = search(value3[k], ch2) || res;
            }
          }
      }
      return res;
    }
    function report(ch2) {
      let possibleErr = search(value2, ch2);
      if (possibleErr) {
        return "found '" + ch2 + "' in a string value, your mistake could be with:\n  > " + possibleErr + "\n  (unquoted strings contain everything up to the next line!)";
      } else return "";
    }
    return report("}") || report("]");
  }
  function array() {
    let array2 = [];
    let comments2, cAt, nextComment;
    try {
      if (keepComments) comments2 = hjson_common_default.createComment(array2, { a: [] });
      next();
      cAt = at;
      white();
      if (comments2) nextComment = getComment2(cAt, true).join("\n");
      if (ch === "]") {
        next();
        if (comments2) comments2.e = [nextComment];
        return array2;
      }
      while (ch) {
        array2.push(value());
        cAt = at;
        white();
        if (ch === ",") {
          next();
          cAt = at;
          white();
        }
        if (comments2) {
          let c = getComment2(cAt);
          comments2.a.push([nextComment || "", c[0] || ""]);
          nextComment = c[1];
        }
        if (ch === "]") {
          next();
          if (comments2)
            comments2.a[comments2.a.length - 1][1] += nextComment || "";
          return array2;
        }
        white();
      }
      error("End of input while parsing an array (missing ']')");
    } catch (e) {
      e.hint = e.hint || errorClosingHint(array2);
      throw e;
    }
  }
  function object(withoutBraces) {
    let key = "", object2 = {};
    let comments2, cAt, nextComment;
    try {
      if (keepComments)
        comments2 = hjson_common_default.createComment(object2, { c: {}, o: [] });
      if (!withoutBraces) {
        next();
        cAt = at;
      } else cAt = 1;
      white();
      if (comments2) nextComment = getComment2(cAt, true).join("\n");
      if (ch === "}" && !withoutBraces) {
        if (comments2) comments2.e = [nextComment];
        next();
        return object2;
      }
      while (ch) {
        key = keyname();
        white();
        if (ch !== ":") error("Expected ':' instead of '" + ch + "'");
        next();
        object2[key] = value();
        cAt = at;
        white();
        if (ch === ",") {
          next();
          cAt = at;
          white();
        }
        if (comments2) {
          let c = getComment2(cAt);
          comments2.c[key] = [nextComment || "", c[0] || ""];
          nextComment = c[1];
          comments2.o.push(key);
        }
        if (ch === "}" && !withoutBraces) {
          next();
          if (comments2) comments2.c[key][1] += nextComment || "";
          return object2;
        }
        white();
      }
      if (withoutBraces) return object2;
      else error("End of input while parsing an object (missing '}')");
    } catch (e) {
      e.hint = e.hint || errorClosingHint(object2);
      throw e;
    }
  }
  function value() {
    white();
    switch (ch) {
      case "{":
        return object();
      case "[":
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
    if (ch) error("Syntax error, found trailing characters");
    if (keepComments) {
      let b = c.join("\n"), a = getComment2(cAt).join("\n");
      if (a || b) {
        let comments2 = hjson_common_default.createComment(v, hjson_common_default.getComment(v));
        comments2.r = [b, a];
      }
    }
    return v;
  }
  function rootValue() {
    white();
    let c = keepComments ? getComment2(1) : null;
    switch (ch) {
      case "{":
        return checkTrailing(object(), c);
      case "[":
        return checkTrailing(array(), c);
      default:
        return checkTrailing(value(), c);
    }
  }
  function legacyRootValue() {
    white();
    let c = keepComments ? getComment2(1) : null;
    switch (ch) {
      case "{":
        return checkTrailing(object(), c);
      case "[":
        return checkTrailing(array(), c);
    }
    try {
      return checkTrailing(object(true), c);
    } catch (e) {
      resetAt();
      try {
        return checkTrailing(value(), c);
      } catch (e2) {
        throw e;
      }
    }
  }
  if (typeof source !== "string") throw new Error("source is not a string");
  let dsfDef = null;
  let legacyRoot = true;
  if (opt && typeof opt === "object") {
    keepComments = opt.keepWsc;
    dsfDef = opt.dsf;
    legacyRoot = opt.legacyRoot !== false;
  }
  runDsf2 = hjson_dsf_default.loadDsf(dsfDef, "parse");
  text = source;
  resetAt();
  return legacyRoot ? legacyRootValue() : rootValue();
}
var hjson_parse_default = parse2;

// lib/hjson-stringify.js
function stringify(data, opt) {
  let plainToken = {
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
  };
  let eol = hjson_common_default.EOL;
  let indent = "  ";
  let keepComments = false;
  let bracesSameLine = false;
  let quoteKeys = false;
  let quoteStrings = false;
  let condense = 0;
  let multiline = 1;
  let separator = "";
  let dsfDef = null;
  let sortProps = false;
  let token = plainToken;
  if (opt && typeof opt === "object") {
    opt.quotes = opt.quotes === "always" ? "strings" : opt.quotes;
    if (opt.eol === "\n" || opt.eol === "\r\n") eol = opt.eol;
    keepComments = opt.keepWsc;
    condense = opt.condense || 0;
    bracesSameLine = opt.bracesSameLine;
    quoteKeys = opt.quotes === "all" || opt.quotes === "keys";
    quoteStrings = opt.quotes === "all" || opt.quotes === "strings" || opt.separator === true;
    if (quoteStrings || opt.multiline == "off") multiline = 0;
    else multiline = opt.multiline == "no-tabs" ? 2 : 1;
    separator = opt.separator === true ? token.com[0] : "";
    dsfDef = opt.dsf;
    sortProps = opt.sortProps;
    if (typeof opt.space === "number") {
      indent = new Array(opt.space + 1).join(" ");
    } else if (typeof opt.space === "string") {
      indent = opt.space;
    }
    if (opt.colors === true) {
      token = {
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
      };
    }
    let i, ckeys = Object.keys(plainToken);
    for (i = ckeys.length - 1; i >= 0; i--) {
      let k = ckeys[i];
      token[k].push(plainToken[k][0].length, plainToken[k][1].length);
    }
  }
  let runDsf2;
  let commonRange = "\x7F-\x9F\xAD\u0600-\u0604\u070F\u17B4\u17B5\u200C-\u200F\u2028-\u202F\u2060-\u206F\uFEFF\uFFF0-\uFFFF";
  let needsEscape = new RegExp('[\\\\\\"\0-' + commonRange + "]", "g");
  let needsQuotes = new RegExp(
    `^\\s|^"|^'|^#|^\\/\\*|^\\/\\/|^\\{|^\\}|^\\[|^\\]|^:|^,|\\s$|[\0-` + commonRange + "]",
    "g"
  );
  let needsEscapeML = new RegExp(
    "'''|^[\\s]+$|[\0-" + (multiline === 2 ? "	" : "\b") + "\v\f-" + commonRange + "]",
    "g"
  );
  let startsWithKeyword = new RegExp(
    "^(true|false|null)\\s*((,|\\]|\\}|#|//|/\\*).*)?$"
  );
  let meta = {
    // table of character substitutions
    "\b": "b",
    "	": "t",
    "\n": "n",
    "\f": "f",
    "\r": "r",
    '"': '"',
    "\\": "\\"
  };
  let needsEscapeName = /[,\{\[\}\]\s:#"']|\/\/|\/\*/;
  let gap = "";
  let wrapLen = 0;
  function wrap(tk, v) {
    wrapLen += tk[0].length + tk[1].length - tk[2] - tk[3];
    return tk[0] + v + tk[1];
  }
  function quoteReplace(string) {
    return string.replace(needsEscape, function(a) {
      let c = meta[a];
      if (typeof c === "string") return wrap(token.esc, c);
      else
        return wrap(
          token.uni,
          ("0000" + a.charCodeAt(0).toString(16)).slice(-4)
        );
    });
  }
  function quote(string, gap2, hasComment, isRootObject) {
    if (!string) return wrap(token.qstr, "");
    needsQuotes.lastIndex = 0;
    startsWithKeyword.lastIndex = 0;
    if (quoteStrings || hasComment || needsQuotes.test(string) || hjson_common_default.tryParseNumber(string, true) !== void 0 || startsWithKeyword.test(string)) {
      needsEscape.lastIndex = 0;
      needsEscapeML.lastIndex = 0;
      if (!needsEscape.test(string)) return wrap(token.qstr, string);
      else if (!needsEscapeML.test(string) && !isRootObject && multiline)
        return mlString(string, gap2);
      else return wrap(token.qstr, quoteReplace(string));
    } else {
      return wrap(token.str, string);
    }
  }
  function mlString(string, gap2) {
    let i, a = string.replace(/\r/g, "").split("\n");
    gap2 += indent;
    if (a.length === 1) {
      return wrap(token.mstr, a[0]);
    } else {
      let res2 = eol + gap2 + token.mstr[0];
      for (i = 0; i < a.length; i++) {
        res2 += eol;
        if (a[i]) res2 += gap2 + a[i];
      }
      return res2 + eol + gap2 + token.mstr[1];
    }
  }
  function quoteKey(name) {
    if (!name) return '""';
    if (quoteKeys || needsEscapeName.test(name)) {
      needsEscape.lastIndex = 0;
      return wrap(
        token.qkey,
        needsEscape.test(name) ? quoteReplace(name) : name
      );
    } else {
      return wrap(token.key, name);
    }
  }
  function str(value, hasComment, noIndent, isRootObject) {
    function startsWithNL(str2) {
      return str2 && str2[str2[0] === "\r" ? 1 : 0] === "\n";
    }
    function commentOnThisLine(str2) {
      return str2 && !startsWithNL(str2);
    }
    function makeComment2(str2, prefix, trim) {
      if (!str2) return "";
      str2 = hjson_common_default.forceComment(str2);
      let i, len = str2.length;
      for (i = 0; i < len && str2[i] <= " "; i++) {
      }
      if (trim && i > 0) str2 = str2.substr(i);
      if (i < len) return prefix + wrap(token.rem, str2);
      else return str2;
    }
    let dsfValue = runDsf2(value);
    if (dsfValue !== void 0) return wrap(token.dsf, dsfValue);
    switch (typeof value) {
      case "string":
        return quote(value, gap, hasComment, isRootObject);
      case "number":
        return isFinite(value) ? wrap(token.num, String(value)) : wrap(token.lit, "null");
      case "boolean":
        return wrap(token.lit, String(value));
      case "object":
        if (!value) return wrap(token.lit, "null");
        let comments3;
        if (keepComments) comments3 = hjson_common_default.getComment(value);
        let isArray = Object.prototype.toString.apply(value) === "[object Array]";
        let mind = gap;
        gap += indent;
        let eolMind = eol + mind;
        let eolGap = eol + gap;
        let prefix = noIndent || bracesSameLine ? "" : eolMind;
        let partial = [];
        let setsep;
        let cpartial = condense ? [] : null;
        let saveQuoteStrings = quoteStrings, saveMultiline = multiline;
        let iseparator = separator ? "" : token.com[0];
        let cwrapLen = 0;
        let i, length;
        let k, v, vs;
        let c, ca;
        let res2, cres;
        if (isArray) {
          for (i = 0, length = value.length; i < length; i++) {
            setsep = i < length - 1;
            if (comments3) {
              c = comments3.a[i] || [];
              ca = commentOnThisLine(c[1]);
              partial.push(makeComment2(c[0], "\n") + eolGap);
              if (cpartial && (c[0] || c[1] || ca)) cpartial = null;
            } else partial.push(eolGap);
            wrapLen = 0;
            v = value[i];
            partial.push(
              str(v, comments3 ? ca : false, true) + (setsep ? separator : "")
            );
            if (cpartial) {
              switch (typeof v) {
                case "string":
                  wrapLen = 0;
                  quoteStrings = true;
                  multiline = 0;
                  cpartial.push(
                    str(v, false, true) + (setsep ? token.com[0] : "")
                  );
                  quoteStrings = saveQuoteStrings;
                  multiline = saveMultiline;
                  break;
                case "object":
                  if (v) {
                    cpartial = null;
                    break;
                  }
                // falls through
                default:
                  cpartial.push(
                    partial[partial.length - 1] + (setsep ? iseparator : "")
                  );
                  break;
              }
              if (setsep) wrapLen += token.com[0].length - token.com[2];
              cwrapLen += wrapLen;
            }
            if (comments3 && c[1])
              partial.push(makeComment2(c[1], ca ? " " : "\n", ca));
          }
          if (length === 0) {
            if (comments3 && comments3.e)
              partial.push(makeComment2(comments3.e[0], "\n") + eolMind);
          } else partial.push(eolMind);
          if (partial.length === 0) res2 = wrap(token.arr, "");
          else {
            res2 = prefix + wrap(token.arr, partial.join(""));
            if (cpartial) {
              cres = cpartial.join(" ");
              if (cres.length - cwrapLen <= condense)
                res2 = wrap(token.arr, cres);
            }
          }
        } else {
          let commentKeys = comments3 ? comments3.o.slice() : [];
          let objectKeys = [];
          for (k in value) {
            if (Object.prototype.hasOwnProperty.call(value, k) && commentKeys.indexOf(k) < 0)
              objectKeys.push(k);
          }
          if (sortProps) {
            objectKeys.sort();
          }
          let keys = commentKeys.concat(objectKeys);
          for (i = 0, length = keys.length; i < length; i++) {
            setsep = i < length - 1;
            k = keys[i];
            if (comments3) {
              c = comments3.c[k] || [];
              ca = commentOnThisLine(c[1]);
              partial.push(makeComment2(c[0], "\n") + eolGap);
              if (cpartial && (c[0] || c[1] || ca)) cpartial = null;
            } else partial.push(eolGap);
            wrapLen = 0;
            v = value[k];
            vs = str(v, comments3 && ca);
            partial.push(
              quoteKey(k) + token.col[0] + (startsWithNL(vs) ? "" : " ") + vs + (setsep ? separator : "")
            );
            if (comments3 && c[1])
              partial.push(makeComment2(c[1], ca ? " " : "\n", ca));
            if (cpartial) {
              switch (typeof v) {
                case "string":
                  wrapLen = 0;
                  quoteStrings = true;
                  multiline = 0;
                  vs = str(v, false);
                  quoteStrings = saveQuoteStrings;
                  multiline = saveMultiline;
                  cpartial.push(
                    quoteKey(k) + token.col[0] + " " + vs + (setsep ? token.com[0] : "")
                  );
                  break;
                case "object":
                  if (v) {
                    cpartial = null;
                    break;
                  }
                // falls through
                default:
                  cpartial.push(
                    partial[partial.length - 1] + (setsep ? iseparator : "")
                  );
                  break;
              }
              wrapLen += token.col[0].length - token.col[2];
              if (setsep) wrapLen += token.com[0].length - token.com[2];
              cwrapLen += wrapLen;
            }
          }
          if (length === 0) {
            if (comments3 && comments3.e)
              partial.push(makeComment2(comments3.e[0], "\n") + eolMind);
          } else partial.push(eolMind);
          if (partial.length === 0) {
            res2 = wrap(token.obj, "");
          } else {
            res2 = prefix + wrap(token.obj, partial.join(""));
            if (cpartial) {
              cres = cpartial.join(" ");
              if (cres.length - cwrapLen <= condense)
                res2 = wrap(token.obj, cres);
            }
          }
        }
        gap = mind;
        return res2;
    }
  }
  runDsf2 = hjson_dsf_default.loadDsf(dsfDef, "stringify");
  let res = "";
  let comments2 = keepComments ? comments2 = (hjson_common_default.getComment(data) || {}).r : null;
  if (comments2 && comments2[0]) res = comments2[0] + "\n";
  res += str(data, null, true, true);
  if (comments2) res += comments2[1] || "";
  return res;
}
var hjson_stringify_default = stringify;

// lib/hjson-comments.js
function makeComment(b, a, x) {
  let c;
  if (b) c = { b };
  if (a) (c = c || {}).a = a;
  if (x) (c = c || {}).x = x;
  return c;
}
function extractComments(value, root) {
  if (value === null || typeof value !== "object") return;
  let comments2 = hjson_common_default.getComment(value);
  if (comments2) hjson_common_default.removeComment(value);
  let i, length;
  let any, res;
  if (Object.prototype.toString.apply(value) === "[object Array]") {
    res = { a: {} };
    for (i = 0, length = value.length; i < length; i++) {
      if (saveComment(res.a, i, comments2.a[i], extractComments(value[i])))
        any = true;
    }
    if (!any && comments2.e) {
      res.e = makeComment(comments2.e[0], comments2.e[1]);
      any = true;
    }
  } else {
    res = { s: {} };
    let keys, currentKeys = Object.keys(value);
    if (comments2 && comments2.o) {
      keys = [];
      comments2.o.concat(currentKeys).forEach(function(key) {
        if (Object.prototype.hasOwnProperty.call(value, key) && keys.indexOf(key) < 0)
          keys.push(key);
      });
    } else keys = currentKeys;
    res.o = keys;
    for (i = 0, length = keys.length; i < length; i++) {
      let key = keys[i];
      if (saveComment(res.s, key, comments2.c[key], extractComments(value[key])))
        any = true;
    }
    if (!any && comments2.e) {
      res.e = makeComment(comments2.e[0], comments2.e[1]);
      any = true;
    }
  }
  if (root && comments2 && comments2.r) {
    res.r = makeComment(comments2.r[0], comments2.r[1]);
  }
  return any ? res : void 0;
}
function mergeStr() {
  let res = "";
  [].forEach.call(arguments, function(c) {
    if (c && c.trim() !== "") {
      if (res) res += "; ";
      res += c.trim();
    }
  });
  return res;
}
function mergeComments(comments2, value) {
  let dropped = [];
  merge(comments2, value, dropped, []);
  if (dropped.length > 0) {
    let text = rootComment(value, null, 1);
    text += "\n# Orphaned comments:\n";
    dropped.forEach(function(c) {
      text += ("# " + c.path.join("/") + ": " + mergeStr(c.b, c.a, c.e)).replace(
        "\n",
        "\\n "
      ) + "\n";
    });
    rootComment(value, text, 1);
  }
}
function saveComment(res, key, item, col) {
  let c = makeComment(
    item ? item[0] : void 0,
    item ? item[1] : void 0,
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
function dropAll(comments2, dropped, path) {
  if (!comments2) return;
  let i, length;
  if (comments2.a) {
    for (i = 0, length = comments2.a.length; i < length; i++) {
      let kpath = path.slice().concat([i]);
      let c = comments2.a[i];
      if (c) {
        dropped.push(droppedComment(kpath, c));
        dropAll(c.x, dropped, kpath);
      }
    }
  } else if (comments2.o) {
    comments2.o.forEach(function(key) {
      let kpath = path.slice().concat([key]);
      let c = comments2.s[key];
      if (c) {
        dropped.push(droppedComment(kpath, c));
        dropAll(c.x, dropped, kpath);
      }
    });
  }
  if (comments2.e) dropped.push(droppedComment(path, comments2.e));
}
function merge(comments2, value, dropped, path) {
  if (!comments2) return;
  if (value === null || typeof value !== "object") {
    dropAll(comments2, dropped, path);
    return;
  }
  let i;
  let setComments = hjson_common_default.createComment(value);
  if (path.length === 0 && comments2.r)
    setComments.r = [comments2.r.b, comments2.r.a];
  if (Object.prototype.toString.apply(value) === "[object Array]") {
    setComments.a = [];
    let a = comments2.a || {};
    for (let key in a) {
      if (a.hasOwnProperty(key)) {
        i = parseInt(key);
        let c = comments2.a[key];
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
    if (i === 0 && comments2.e) setComments.e = [comments2.e.b, comments2.e.a];
  } else {
    setComments.c = {};
    setComments.o = [];
    (comments2.o || []).forEach(function(key) {
      let kpath = path.slice().concat([key]);
      let c = comments2.s[key];
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
    if (comments2.e) setComments.e = [comments2.e.b, comments2.e.a];
  }
}
function rootComment(value, setText, header) {
  let comment = hjson_common_default.createComment(value, hjson_common_default.getComment(value));
  if (!comment.r) comment.r = ["", ""];
  if (setText || setText === "")
    comment.r[header] = hjson_common_default.forceComment(setText);
  return comment.r[header] || "";
}
var comments = {
  extract: function(value) {
    return extractComments(value, true);
  },
  merge: mergeComments,
  header: function(value, setText) {
    return rootComment(value, setText, 0);
  },
  footer: function(value, setText) {
    return rootComment(value, setText, 1);
  }
};
var hjson_comments_default = comments;

// lib/hjson.js
var endOfLine = () => hjson_common_default.EOL;
var setEndOfLine = function(eol) {
  if (eol === "\n" || eol === "\r\n") hjson_common_default.EOL = eol;
};
var dsfStd = hjson_dsf_default.std;
var rt = {
  parse: function(text, options) {
    (options = options || {}).keepWsc = true;
    return hjson_parse_default(text, options);
  },
  stringify: function(value, options) {
    options = options || {};
    options.keepWsc = true;
    return stringifyFunc(value, options);
  }
};
var hjson_default = {
  parse: hjson_parse_default,
  stringify: hjson_stringify_default,
  endOfLine,
  setEndOfLine,
  version: hjson_version_default,
  comments: hjson_comments_default,
  dsf: dsfStd,
  rt
};
export {
  hjson_comments_default as comments,
  hjson_default as default,
  dsfStd as dsf,
  endOfLine,
  hjson_parse_default as parse,
  rt,
  setEndOfLine,
  hjson_stringify_default as stringify,
  hjson_version_default as version
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
