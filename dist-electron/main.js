var ac = Object.defineProperty;
var Cr = (e) => {
  throw TypeError(e);
};
var cc = (e, t, n) => t in e ? ac(e, t, { enumerable: !0, configurable: !0, writable: !0, value: n }) : e[t] = n;
var Ae = (e, t, n) => cc(e, typeof t != "symbol" ? t + "" : t, n), en = (e, t, n) => t.has(e) || Cr("Cannot " + n);
var p = (e, t, n) => (en(e, t, "read from private field"), n ? n.call(e) : t.get(e)), C = (e, t, n) => t.has(e) ? Cr("Cannot add the same private member more than once") : t instanceof WeakSet ? t.add(e) : t.set(e, n), W = (e, t, n, r) => (en(e, t, "write to private field"), r ? r.call(e, n) : t.set(e, n), n), Xe = (e, t, n) => (en(e, t, "access private method"), n);
import { app as Ue, ipcMain as gt, dialog as lc, BrowserWindow as Go } from "electron";
import { fileURLToPath as kn } from "node:url";
import A from "node:path";
import T from "path";
import dt from "fs";
import uc from "constants";
import fc from "stream";
import dc from "util";
import hc from "assert";
import { ChildProcess as Wo, execFile as mc, spawnSync as pc, spawn as yc } from "node:child_process";
import { StringDecoder as zo } from "node:string_decoder";
import { debuglog as wc, stripVTControlCharacters as gc, inspect as Vo, promisify as Ho, callbackify as qe, aborted as Sc } from "node:util";
import G, { platform as bc, hrtime as qo, execPath as Ec, execArgv as Tc } from "node:process";
import Yo from "node:tty";
import $c, { exec as vc } from "child_process";
import { setTimeout as Jo, scheduler as Ko, setImmediate as Oc } from "node:timers/promises";
import { constants as $e } from "node:os";
import { once as Y, addAbortListener as Xo, EventEmitter as Dc, on as Wt, setMaxListeners as Ic } from "node:events";
import { serialize as xc } from "node:v8";
import { statSync as Rc, readFileSync as hn, appendFileSync as Pc, writeFileSync as Ac, createWriteStream as Fr, createReadStream as Lr } from "node:fs";
import { Transform as Cc, getDefaultHighWaterMark as At, Duplex as _n, Writable as jn, Readable as be, PassThrough as Qo } from "node:stream";
import { Buffer as Bn } from "node:buffer";
import { finished as we } from "node:stream/promises";
var Ct = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
function Zo(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e;
}
var q = {}, L = {};
L.fromCallback = function(e) {
  return Object.defineProperty(function(...t) {
    if (typeof t[t.length - 1] == "function") e.apply(this, t);
    else
      return new Promise((n, r) => {
        t.push((o, i) => o != null ? r(o) : n(i)), e.apply(this, t);
      });
  }, "name", { value: e.name });
};
L.fromPromise = function(e) {
  return Object.defineProperty(function(...t) {
    const n = t[t.length - 1];
    if (typeof n != "function") return e.apply(this, t);
    t.pop(), e.apply(this, t).then((r) => n(null, r), n);
  }, "name", { value: e.name });
};
var ue = uc, Fc = process.cwd, It = null, Lc = process.env.GRACEFUL_FS_PLATFORM || process.platform;
process.cwd = function() {
  return It || (It = Fc.call(process)), It;
};
try {
  process.cwd();
} catch {
}
if (typeof process.chdir == "function") {
  var Mr = process.chdir;
  process.chdir = function(e) {
    It = null, Mr.call(process, e);
  }, Object.setPrototypeOf && Object.setPrototypeOf(process.chdir, Mr);
}
var Mc = kc;
function kc(e) {
  ue.hasOwnProperty("O_SYMLINK") && process.version.match(/^v0\.6\.[0-2]|^v0\.5\./) && t(e), e.lutimes || n(e), e.chown = i(e.chown), e.fchown = i(e.fchown), e.lchown = i(e.lchown), e.chmod = r(e.chmod), e.fchmod = r(e.fchmod), e.lchmod = r(e.lchmod), e.chownSync = s(e.chownSync), e.fchownSync = s(e.fchownSync), e.lchownSync = s(e.lchownSync), e.chmodSync = o(e.chmodSync), e.fchmodSync = o(e.fchmodSync), e.lchmodSync = o(e.lchmodSync), e.stat = a(e.stat), e.fstat = a(e.fstat), e.lstat = a(e.lstat), e.statSync = c(e.statSync), e.fstatSync = c(e.fstatSync), e.lstatSync = c(e.lstatSync), e.chmod && !e.lchmod && (e.lchmod = function(l, f, d) {
    d && process.nextTick(d);
  }, e.lchmodSync = function() {
  }), e.chown && !e.lchown && (e.lchown = function(l, f, d, h) {
    h && process.nextTick(h);
  }, e.lchownSync = function() {
  }), Lc === "win32" && (e.rename = typeof e.rename != "function" ? e.rename : function(l) {
    function f(d, h, m) {
      var y = Date.now(), g = 0;
      l(d, h, function S(E) {
        if (E && (E.code === "EACCES" || E.code === "EPERM" || E.code === "EBUSY") && Date.now() - y < 6e4) {
          setTimeout(function() {
            e.stat(h, function(v, M) {
              v && v.code === "ENOENT" ? l(d, h, S) : m(E);
            });
          }, g), g < 100 && (g += 10);
          return;
        }
        m && m(E);
      });
    }
    return Object.setPrototypeOf && Object.setPrototypeOf(f, l), f;
  }(e.rename)), e.read = typeof e.read != "function" ? e.read : function(l) {
    function f(d, h, m, y, g, S) {
      var E;
      if (S && typeof S == "function") {
        var v = 0;
        E = function(M, K, Q) {
          if (M && M.code === "EAGAIN" && v < 10)
            return v++, l.call(e, d, h, m, y, g, E);
          S.apply(this, arguments);
        };
      }
      return l.call(e, d, h, m, y, g, E);
    }
    return Object.setPrototypeOf && Object.setPrototypeOf(f, l), f;
  }(e.read), e.readSync = typeof e.readSync != "function" ? e.readSync : /* @__PURE__ */ function(l) {
    return function(f, d, h, m, y) {
      for (var g = 0; ; )
        try {
          return l.call(e, f, d, h, m, y);
        } catch (S) {
          if (S.code === "EAGAIN" && g < 10) {
            g++;
            continue;
          }
          throw S;
        }
    };
  }(e.readSync);
  function t(l) {
    l.lchmod = function(f, d, h) {
      l.open(
        f,
        ue.O_WRONLY | ue.O_SYMLINK,
        d,
        function(m, y) {
          if (m) {
            h && h(m);
            return;
          }
          l.fchmod(y, d, function(g) {
            l.close(y, function(S) {
              h && h(g || S);
            });
          });
        }
      );
    }, l.lchmodSync = function(f, d) {
      var h = l.openSync(f, ue.O_WRONLY | ue.O_SYMLINK, d), m = !0, y;
      try {
        y = l.fchmodSync(h, d), m = !1;
      } finally {
        if (m)
          try {
            l.closeSync(h);
          } catch {
          }
        else
          l.closeSync(h);
      }
      return y;
    };
  }
  function n(l) {
    ue.hasOwnProperty("O_SYMLINK") && l.futimes ? (l.lutimes = function(f, d, h, m) {
      l.open(f, ue.O_SYMLINK, function(y, g) {
        if (y) {
          m && m(y);
          return;
        }
        l.futimes(g, d, h, function(S) {
          l.close(g, function(E) {
            m && m(S || E);
          });
        });
      });
    }, l.lutimesSync = function(f, d, h) {
      var m = l.openSync(f, ue.O_SYMLINK), y, g = !0;
      try {
        y = l.futimesSync(m, d, h), g = !1;
      } finally {
        if (g)
          try {
            l.closeSync(m);
          } catch {
          }
        else
          l.closeSync(m);
      }
      return y;
    }) : l.futimes && (l.lutimes = function(f, d, h, m) {
      m && process.nextTick(m);
    }, l.lutimesSync = function() {
    });
  }
  function r(l) {
    return l && function(f, d, h) {
      return l.call(e, f, d, function(m) {
        u(m) && (m = null), h && h.apply(this, arguments);
      });
    };
  }
  function o(l) {
    return l && function(f, d) {
      try {
        return l.call(e, f, d);
      } catch (h) {
        if (!u(h)) throw h;
      }
    };
  }
  function i(l) {
    return l && function(f, d, h, m) {
      return l.call(e, f, d, h, function(y) {
        u(y) && (y = null), m && m.apply(this, arguments);
      });
    };
  }
  function s(l) {
    return l && function(f, d, h) {
      try {
        return l.call(e, f, d, h);
      } catch (m) {
        if (!u(m)) throw m;
      }
    };
  }
  function a(l) {
    return l && function(f, d, h) {
      typeof d == "function" && (h = d, d = null);
      function m(y, g) {
        g && (g.uid < 0 && (g.uid += 4294967296), g.gid < 0 && (g.gid += 4294967296)), h && h.apply(this, arguments);
      }
      return d ? l.call(e, f, d, m) : l.call(e, f, m);
    };
  }
  function c(l) {
    return l && function(f, d) {
      var h = d ? l.call(e, f, d) : l.call(e, f);
      return h && (h.uid < 0 && (h.uid += 4294967296), h.gid < 0 && (h.gid += 4294967296)), h;
    };
  }
  function u(l) {
    if (!l || l.code === "ENOSYS")
      return !0;
    var f = !process.getuid || process.getuid() !== 0;
    return !!(f && (l.code === "EINVAL" || l.code === "EPERM"));
  }
}
var kr = fc.Stream, _c = jc;
function jc(e) {
  return {
    ReadStream: t,
    WriteStream: n
  };
  function t(r, o) {
    if (!(this instanceof t)) return new t(r, o);
    kr.call(this);
    var i = this;
    this.path = r, this.fd = null, this.readable = !0, this.paused = !1, this.flags = "r", this.mode = 438, this.bufferSize = 64 * 1024, o = o || {};
    for (var s = Object.keys(o), a = 0, c = s.length; a < c; a++) {
      var u = s[a];
      this[u] = o[u];
    }
    if (this.encoding && this.setEncoding(this.encoding), this.start !== void 0) {
      if (typeof this.start != "number")
        throw TypeError("start must be a Number");
      if (this.end === void 0)
        this.end = 1 / 0;
      else if (typeof this.end != "number")
        throw TypeError("end must be a Number");
      if (this.start > this.end)
        throw new Error("start must be <= end");
      this.pos = this.start;
    }
    if (this.fd !== null) {
      process.nextTick(function() {
        i._read();
      });
      return;
    }
    e.open(this.path, this.flags, this.mode, function(l, f) {
      if (l) {
        i.emit("error", l), i.readable = !1;
        return;
      }
      i.fd = f, i.emit("open", f), i._read();
    });
  }
  function n(r, o) {
    if (!(this instanceof n)) return new n(r, o);
    kr.call(this), this.path = r, this.fd = null, this.writable = !0, this.flags = "w", this.encoding = "binary", this.mode = 438, this.bytesWritten = 0, o = o || {};
    for (var i = Object.keys(o), s = 0, a = i.length; s < a; s++) {
      var c = i[s];
      this[c] = o[c];
    }
    if (this.start !== void 0) {
      if (typeof this.start != "number")
        throw TypeError("start must be a Number");
      if (this.start < 0)
        throw new Error("start must be >= zero");
      this.pos = this.start;
    }
    this.busy = !1, this._queue = [], this.fd === null && (this._open = e.open, this._queue.push([this._open, this.path, this.flags, this.mode, void 0]), this.flush());
  }
}
var Bc = Nc, Uc = Object.getPrototypeOf || function(e) {
  return e.__proto__;
};
function Nc(e) {
  if (e === null || typeof e != "object")
    return e;
  if (e instanceof Object)
    var t = { __proto__: Uc(e) };
  else
    var t = /* @__PURE__ */ Object.create(null);
  return Object.getOwnPropertyNames(e).forEach(function(n) {
    Object.defineProperty(t, n, Object.getOwnPropertyDescriptor(e, n));
  }), t;
}
var x = dt, Gc = Mc, Wc = _c, zc = Bc, St = dc, N, Ft;
typeof Symbol == "function" && typeof Symbol.for == "function" ? (N = Symbol.for("graceful-fs.queue"), Ft = Symbol.for("graceful-fs.previous")) : (N = "___graceful-fs.queue", Ft = "___graceful-fs.previous");
function Vc() {
}
function ei(e, t) {
  Object.defineProperty(e, N, {
    get: function() {
      return t;
    }
  });
}
var Te = Vc;
St.debuglog ? Te = St.debuglog("gfs4") : /\bgfs4\b/i.test(process.env.NODE_DEBUG || "") && (Te = function() {
  var e = St.format.apply(St, arguments);
  e = "GFS4: " + e.split(/\n/).join(`
GFS4: `), console.error(e);
});
if (!x[N]) {
  var Hc = Ct[N] || [];
  ei(x, Hc), x.close = function(e) {
    function t(n, r) {
      return e.call(x, n, function(o) {
        o || _r(), typeof r == "function" && r.apply(this, arguments);
      });
    }
    return Object.defineProperty(t, Ft, {
      value: e
    }), t;
  }(x.close), x.closeSync = function(e) {
    function t(n) {
      e.apply(x, arguments), _r();
    }
    return Object.defineProperty(t, Ft, {
      value: e
    }), t;
  }(x.closeSync), /\bgfs4\b/i.test(process.env.NODE_DEBUG || "") && process.on("exit", function() {
    Te(x[N]), hc.equal(x[N].length, 0);
  });
}
Ct[N] || ei(Ct, x[N]);
var Ye = Un(zc(x));
process.env.TEST_GRACEFUL_FS_GLOBAL_PATCH && !x.__patched && (Ye = Un(x), x.__patched = !0);
function Un(e) {
  Gc(e), e.gracefulify = Un, e.createReadStream = K, e.createWriteStream = Q;
  var t = e.readFile;
  e.readFile = n;
  function n(w, $, b) {
    return typeof $ == "function" && (b = $, $ = null), j(w, $, b);
    function j(B, k, I, R) {
      return t(B, k, function(O) {
        O && (O.code === "EMFILE" || O.code === "ENFILE") ? Ce([j, [B, k, I], O, R || Date.now(), Date.now()]) : typeof I == "function" && I.apply(this, arguments);
      });
    }
  }
  var r = e.writeFile;
  e.writeFile = o;
  function o(w, $, b, j) {
    return typeof b == "function" && (j = b, b = null), B(w, $, b, j);
    function B(k, I, R, O, U) {
      return r(k, I, R, function(D) {
        D && (D.code === "EMFILE" || D.code === "ENFILE") ? Ce([B, [k, I, R, O], D, U || Date.now(), Date.now()]) : typeof O == "function" && O.apply(this, arguments);
      });
    }
  }
  var i = e.appendFile;
  i && (e.appendFile = s);
  function s(w, $, b, j) {
    return typeof b == "function" && (j = b, b = null), B(w, $, b, j);
    function B(k, I, R, O, U) {
      return i(k, I, R, function(D) {
        D && (D.code === "EMFILE" || D.code === "ENFILE") ? Ce([B, [k, I, R, O], D, U || Date.now(), Date.now()]) : typeof O == "function" && O.apply(this, arguments);
      });
    }
  }
  var a = e.copyFile;
  a && (e.copyFile = c);
  function c(w, $, b, j) {
    return typeof b == "function" && (j = b, b = 0), B(w, $, b, j);
    function B(k, I, R, O, U) {
      return a(k, I, R, function(D) {
        D && (D.code === "EMFILE" || D.code === "ENFILE") ? Ce([B, [k, I, R, O], D, U || Date.now(), Date.now()]) : typeof O == "function" && O.apply(this, arguments);
      });
    }
  }
  var u = e.readdir;
  e.readdir = f;
  var l = /^v[0-5]\./;
  function f(w, $, b) {
    typeof $ == "function" && (b = $, $ = null);
    var j = l.test(process.version) ? function(I, R, O, U) {
      return u(I, B(
        I,
        R,
        O,
        U
      ));
    } : function(I, R, O, U) {
      return u(I, R, B(
        I,
        R,
        O,
        U
      ));
    };
    return j(w, $, b);
    function B(k, I, R, O) {
      return function(U, D) {
        U && (U.code === "EMFILE" || U.code === "ENFILE") ? Ce([
          j,
          [k, I, R],
          U,
          O || Date.now(),
          Date.now()
        ]) : (D && D.sort && D.sort(), typeof R == "function" && R.call(this, U, D));
      };
    }
  }
  if (process.version.substr(0, 4) === "v0.8") {
    var d = Wc(e);
    S = d.ReadStream, v = d.WriteStream;
  }
  var h = e.ReadStream;
  h && (S.prototype = Object.create(h.prototype), S.prototype.open = E);
  var m = e.WriteStream;
  m && (v.prototype = Object.create(m.prototype), v.prototype.open = M), Object.defineProperty(e, "ReadStream", {
    get: function() {
      return S;
    },
    set: function(w) {
      S = w;
    },
    enumerable: !0,
    configurable: !0
  }), Object.defineProperty(e, "WriteStream", {
    get: function() {
      return v;
    },
    set: function(w) {
      v = w;
    },
    enumerable: !0,
    configurable: !0
  });
  var y = S;
  Object.defineProperty(e, "FileReadStream", {
    get: function() {
      return y;
    },
    set: function(w) {
      y = w;
    },
    enumerable: !0,
    configurable: !0
  });
  var g = v;
  Object.defineProperty(e, "FileWriteStream", {
    get: function() {
      return g;
    },
    set: function(w) {
      g = w;
    },
    enumerable: !0,
    configurable: !0
  });
  function S(w, $) {
    return this instanceof S ? (h.apply(this, arguments), this) : S.apply(Object.create(S.prototype), arguments);
  }
  function E() {
    var w = this;
    ne(w.path, w.flags, w.mode, function($, b) {
      $ ? (w.autoClose && w.destroy(), w.emit("error", $)) : (w.fd = b, w.emit("open", b), w.read());
    });
  }
  function v(w, $) {
    return this instanceof v ? (m.apply(this, arguments), this) : v.apply(Object.create(v.prototype), arguments);
  }
  function M() {
    var w = this;
    ne(w.path, w.flags, w.mode, function($, b) {
      $ ? (w.destroy(), w.emit("error", $)) : (w.fd = b, w.emit("open", b));
    });
  }
  function K(w, $) {
    return new e.ReadStream(w, $);
  }
  function Q(w, $) {
    return new e.WriteStream(w, $);
  }
  var ce = e.open;
  e.open = ne;
  function ne(w, $, b, j) {
    return typeof b == "function" && (j = b, b = null), B(w, $, b, j);
    function B(k, I, R, O, U) {
      return ce(k, I, R, function(D, gb) {
        D && (D.code === "EMFILE" || D.code === "ENFILE") ? Ce([B, [k, I, R, O], D, U || Date.now(), Date.now()]) : typeof O == "function" && O.apply(this, arguments);
      });
    }
  }
  return e;
}
function Ce(e) {
  Te("ENQUEUE", e[0].name, e[1]), x[N].push(e), Nn();
}
var bt;
function _r() {
  for (var e = Date.now(), t = 0; t < x[N].length; ++t)
    x[N][t].length > 2 && (x[N][t][3] = e, x[N][t][4] = e);
  Nn();
}
function Nn() {
  if (clearTimeout(bt), bt = void 0, x[N].length !== 0) {
    var e = x[N].shift(), t = e[0], n = e[1], r = e[2], o = e[3], i = e[4];
    if (o === void 0)
      Te("RETRY", t.name, n), t.apply(null, n);
    else if (Date.now() - o >= 6e4) {
      Te("TIMEOUT", t.name, n);
      var s = n.pop();
      typeof s == "function" && s.call(null, r);
    } else {
      var a = Date.now() - i, c = Math.max(i - o, 1), u = Math.min(c * 1.2, 100);
      a >= u ? (Te("RETRY", t.name, n), t.apply(null, n.concat([o]))) : x[N].push(e);
    }
    bt === void 0 && (bt = setTimeout(Nn, 0));
  }
}
(function(e) {
  const t = L.fromCallback, n = Ye, r = [
    "access",
    "appendFile",
    "chmod",
    "chown",
    "close",
    "copyFile",
    "cp",
    "fchmod",
    "fchown",
    "fdatasync",
    "fstat",
    "fsync",
    "ftruncate",
    "futimes",
    "glob",
    "lchmod",
    "lchown",
    "lutimes",
    "link",
    "lstat",
    "mkdir",
    "mkdtemp",
    "open",
    "opendir",
    "readdir",
    "readFile",
    "readlink",
    "realpath",
    "rename",
    "rm",
    "rmdir",
    "stat",
    "statfs",
    "symlink",
    "truncate",
    "unlink",
    "utimes",
    "writeFile"
  ].filter((o) => typeof n[o] == "function");
  Object.assign(e, n), r.forEach((o) => {
    e[o] = t(n[o]);
  }), e.exists = function(o, i) {
    return typeof i == "function" ? n.exists(o, i) : new Promise((s) => n.exists(o, s));
  }, e.read = function(o, i, s, a, c, u) {
    return typeof u == "function" ? n.read(o, i, s, a, c, u) : new Promise((l, f) => {
      n.read(o, i, s, a, c, (d, h, m) => {
        if (d) return f(d);
        l({ bytesRead: h, buffer: m });
      });
    });
  }, e.write = function(o, i, ...s) {
    return typeof s[s.length - 1] == "function" ? n.write(o, i, ...s) : new Promise((a, c) => {
      n.write(o, i, ...s, (u, l, f) => {
        if (u) return c(u);
        a({ bytesWritten: l, buffer: f });
      });
    });
  }, e.readv = function(o, i, ...s) {
    return typeof s[s.length - 1] == "function" ? n.readv(o, i, ...s) : new Promise((a, c) => {
      n.readv(o, i, ...s, (u, l, f) => {
        if (u) return c(u);
        a({ bytesRead: l, buffers: f });
      });
    });
  }, e.writev = function(o, i, ...s) {
    return typeof s[s.length - 1] == "function" ? n.writev(o, i, ...s) : new Promise((a, c) => {
      n.writev(o, i, ...s, (u, l, f) => {
        if (u) return c(u);
        a({ bytesWritten: l, buffers: f });
      });
    });
  }, typeof n.realpath.native == "function" ? e.realpath.native = t(n.realpath.native) : process.emitWarning(
    "fs.realpath.native is not a function. Is fs being monkey-patched?",
    "Warning",
    "fs-extra-WARN0003"
  );
})(q);
var Gn = {}, ti = {};
const qc = T;
ti.checkPath = function(t) {
  if (process.platform === "win32" && /[<>:"|?*]/.test(t.replace(qc.parse(t).root, ""))) {
    const r = new Error(`Path contains invalid characters: ${t}`);
    throw r.code = "EINVAL", r;
  }
};
const ni = q, { checkPath: ri } = ti, oi = (e) => {
  const t = { mode: 511 };
  return typeof e == "number" ? e : { ...t, ...e }.mode;
};
Gn.makeDir = async (e, t) => (ri(e), ni.mkdir(e, {
  mode: oi(t),
  recursive: !0
}));
Gn.makeDirSync = (e, t) => (ri(e), ni.mkdirSync(e, {
  mode: oi(t),
  recursive: !0
}));
const Yc = L.fromPromise, { makeDir: Jc, makeDirSync: tn } = Gn, nn = Yc(Jc);
var ae = {
  mkdirs: nn,
  mkdirsSync: tn,
  // alias
  mkdirp: nn,
  mkdirpSync: tn,
  ensureDir: nn,
  ensureDirSync: tn
};
const Kc = L.fromPromise, ii = q;
function Xc(e) {
  return ii.access(e).then(() => !0).catch(() => !1);
}
var Ie = {
  pathExists: Kc(Xc),
  pathExistsSync: ii.existsSync
};
const Me = q, Qc = L.fromPromise;
async function Zc(e, t, n) {
  const r = await Me.open(e, "r+");
  let o = null;
  try {
    await Me.futimes(r, t, n);
  } finally {
    try {
      await Me.close(r);
    } catch (i) {
      o = i;
    }
  }
  if (o)
    throw o;
}
function el(e, t, n) {
  const r = Me.openSync(e, "r+");
  return Me.futimesSync(r, t, n), Me.closeSync(r);
}
var si = {
  utimesMillis: Qc(Zc),
  utimesMillisSync: el
};
const Ne = q, _ = T, jr = L.fromPromise;
function tl(e, t, n) {
  const r = n.dereference ? (o) => Ne.stat(o, { bigint: !0 }) : (o) => Ne.lstat(o, { bigint: !0 });
  return Promise.all([
    r(e),
    r(t).catch((o) => {
      if (o.code === "ENOENT") return null;
      throw o;
    })
  ]).then(([o, i]) => ({ srcStat: o, destStat: i }));
}
function nl(e, t, n) {
  let r;
  const o = n.dereference ? (s) => Ne.statSync(s, { bigint: !0 }) : (s) => Ne.lstatSync(s, { bigint: !0 }), i = o(e);
  try {
    r = o(t);
  } catch (s) {
    if (s.code === "ENOENT") return { srcStat: i, destStat: null };
    throw s;
  }
  return { srcStat: i, destStat: r };
}
async function rl(e, t, n, r) {
  const { srcStat: o, destStat: i } = await tl(e, t, r);
  if (i) {
    if (ht(o, i)) {
      const s = _.basename(e), a = _.basename(t);
      if (n === "move" && s !== a && s.toLowerCase() === a.toLowerCase())
        return { srcStat: o, destStat: i, isChangingCase: !0 };
      throw new Error("Source and destination must not be the same.");
    }
    if (o.isDirectory() && !i.isDirectory())
      throw new Error(`Cannot overwrite non-directory '${t}' with directory '${e}'.`);
    if (!o.isDirectory() && i.isDirectory())
      throw new Error(`Cannot overwrite directory '${t}' with non-directory '${e}'.`);
  }
  if (o.isDirectory() && Wn(e, t))
    throw new Error(zt(e, t, n));
  return { srcStat: o, destStat: i };
}
function ol(e, t, n, r) {
  const { srcStat: o, destStat: i } = nl(e, t, r);
  if (i) {
    if (ht(o, i)) {
      const s = _.basename(e), a = _.basename(t);
      if (n === "move" && s !== a && s.toLowerCase() === a.toLowerCase())
        return { srcStat: o, destStat: i, isChangingCase: !0 };
      throw new Error("Source and destination must not be the same.");
    }
    if (o.isDirectory() && !i.isDirectory())
      throw new Error(`Cannot overwrite non-directory '${t}' with directory '${e}'.`);
    if (!o.isDirectory() && i.isDirectory())
      throw new Error(`Cannot overwrite directory '${t}' with non-directory '${e}'.`);
  }
  if (o.isDirectory() && Wn(e, t))
    throw new Error(zt(e, t, n));
  return { srcStat: o, destStat: i };
}
async function ai(e, t, n, r) {
  const o = _.resolve(_.dirname(e)), i = _.resolve(_.dirname(n));
  if (i === o || i === _.parse(i).root) return;
  let s;
  try {
    s = await Ne.stat(i, { bigint: !0 });
  } catch (a) {
    if (a.code === "ENOENT") return;
    throw a;
  }
  if (ht(t, s))
    throw new Error(zt(e, n, r));
  return ai(e, t, i, r);
}
function ci(e, t, n, r) {
  const o = _.resolve(_.dirname(e)), i = _.resolve(_.dirname(n));
  if (i === o || i === _.parse(i).root) return;
  let s;
  try {
    s = Ne.statSync(i, { bigint: !0 });
  } catch (a) {
    if (a.code === "ENOENT") return;
    throw a;
  }
  if (ht(t, s))
    throw new Error(zt(e, n, r));
  return ci(e, t, i, r);
}
function ht(e, t) {
  return t.ino !== void 0 && t.dev !== void 0 && t.ino === e.ino && t.dev === e.dev;
}
function Wn(e, t) {
  const n = _.resolve(e).split(_.sep).filter((o) => o), r = _.resolve(t).split(_.sep).filter((o) => o);
  return n.every((o, i) => r[i] === o);
}
function zt(e, t, n) {
  return `Cannot ${n} '${e}' to a subdirectory of itself, '${t}'.`;
}
var Je = {
  // checkPaths
  checkPaths: jr(rl),
  checkPathsSync: ol,
  // checkParent
  checkParentPaths: jr(ai),
  checkParentPathsSync: ci,
  // Misc
  isSrcSubdir: Wn,
  areIdentical: ht
};
async function il(e, t) {
  const n = [];
  for await (const r of e)
    n.push(
      t(r).then(
        () => null,
        (o) => o ?? new Error("unknown error")
      )
    );
  await Promise.all(
    n.map(
      (r) => r.then((o) => {
        if (o !== null) throw o;
      })
    )
  );
}
var sl = {
  asyncIteratorConcurrentProcess: il
};
const z = q, rt = T, { mkdirs: al } = ae, { pathExists: cl } = Ie, { utimesMillis: ll } = si, ot = Je, { asyncIteratorConcurrentProcess: ul } = sl;
async function fl(e, t, n = {}) {
  typeof n == "function" && (n = { filter: n }), n.clobber = "clobber" in n ? !!n.clobber : !0, n.overwrite = "overwrite" in n ? !!n.overwrite : n.clobber, n.preserveTimestamps && process.arch === "ia32" && process.emitWarning(
    `Using the preserveTimestamps option in 32-bit node is not recommended;

	see https://github.com/jprichardson/node-fs-extra/issues/269`,
    "Warning",
    "fs-extra-WARN0001"
  );
  const { srcStat: r, destStat: o } = await ot.checkPaths(e, t, "copy", n);
  if (await ot.checkParentPaths(e, r, t, "copy"), !await li(e, t, n)) return;
  const s = rt.dirname(t);
  await cl(s) || await al(s), await ui(o, e, t, n);
}
async function li(e, t, n) {
  return n.filter ? n.filter(e, t) : !0;
}
async function ui(e, t, n, r) {
  const i = await (r.dereference ? z.stat : z.lstat)(t);
  if (i.isDirectory()) return pl(i, e, t, n, r);
  if (i.isFile() || i.isCharacterDevice() || i.isBlockDevice()) return dl(i, e, t, n, r);
  if (i.isSymbolicLink()) return yl(e, t, n, r);
  throw i.isSocket() ? new Error(`Cannot copy a socket file: ${t}`) : i.isFIFO() ? new Error(`Cannot copy a FIFO pipe: ${t}`) : new Error(`Unknown file: ${t}`);
}
async function dl(e, t, n, r, o) {
  if (!t) return Br(e, n, r, o);
  if (o.overwrite)
    return await z.unlink(r), Br(e, n, r, o);
  if (o.errorOnExist)
    throw new Error(`'${r}' already exists`);
}
async function Br(e, t, n, r) {
  if (await z.copyFile(t, n), r.preserveTimestamps) {
    hl(e.mode) && await ml(n, e.mode);
    const o = await z.stat(t);
    await ll(n, o.atime, o.mtime);
  }
  return z.chmod(n, e.mode);
}
function hl(e) {
  return (e & 128) === 0;
}
function ml(e, t) {
  return z.chmod(e, t | 128);
}
async function pl(e, t, n, r, o) {
  t || await z.mkdir(r), await ul(await z.opendir(n), async (i) => {
    const s = rt.join(n, i.name), a = rt.join(r, i.name);
    if (await li(s, a, o)) {
      const { destStat: u } = await ot.checkPaths(s, a, "copy", o);
      await ui(u, s, a, o);
    }
  }), t || await z.chmod(r, e.mode);
}
async function yl(e, t, n, r) {
  let o = await z.readlink(t);
  if (r.dereference && (o = rt.resolve(process.cwd(), o)), !e)
    return z.symlink(o, n);
  let i = null;
  try {
    i = await z.readlink(n);
  } catch (s) {
    if (s.code === "EINVAL" || s.code === "UNKNOWN") return z.symlink(o, n);
    throw s;
  }
  if (r.dereference && (i = rt.resolve(process.cwd(), i)), o !== i) {
    if (ot.isSrcSubdir(o, i))
      throw new Error(`Cannot copy '${o}' to a subdirectory of itself, '${i}'.`);
    if (ot.isSrcSubdir(i, o))
      throw new Error(`Cannot overwrite '${i}' with '${o}'.`);
  }
  return await z.unlink(n), z.symlink(o, n);
}
var wl = fl;
const V = Ye, it = T, gl = ae.mkdirsSync, Sl = si.utimesMillisSync, st = Je;
function bl(e, t, n) {
  typeof n == "function" && (n = { filter: n }), n = n || {}, n.clobber = "clobber" in n ? !!n.clobber : !0, n.overwrite = "overwrite" in n ? !!n.overwrite : n.clobber, n.preserveTimestamps && process.arch === "ia32" && process.emitWarning(
    `Using the preserveTimestamps option in 32-bit node is not recommended;

	see https://github.com/jprichardson/node-fs-extra/issues/269`,
    "Warning",
    "fs-extra-WARN0002"
  );
  const { srcStat: r, destStat: o } = st.checkPathsSync(e, t, "copy", n);
  if (st.checkParentPathsSync(e, r, t, "copy"), n.filter && !n.filter(e, t)) return;
  const i = it.dirname(t);
  return V.existsSync(i) || gl(i), fi(o, e, t, n);
}
function fi(e, t, n, r) {
  const i = (r.dereference ? V.statSync : V.lstatSync)(t);
  if (i.isDirectory()) return Il(i, e, t, n, r);
  if (i.isFile() || i.isCharacterDevice() || i.isBlockDevice()) return El(i, e, t, n, r);
  if (i.isSymbolicLink()) return Pl(e, t, n, r);
  throw i.isSocket() ? new Error(`Cannot copy a socket file: ${t}`) : i.isFIFO() ? new Error(`Cannot copy a FIFO pipe: ${t}`) : new Error(`Unknown file: ${t}`);
}
function El(e, t, n, r, o) {
  return t ? Tl(e, n, r, o) : di(e, n, r, o);
}
function Tl(e, t, n, r) {
  if (r.overwrite)
    return V.unlinkSync(n), di(e, t, n, r);
  if (r.errorOnExist)
    throw new Error(`'${n}' already exists`);
}
function di(e, t, n, r) {
  return V.copyFileSync(t, n), r.preserveTimestamps && $l(e.mode, t, n), zn(n, e.mode);
}
function $l(e, t, n) {
  return vl(e) && Ol(n, e), Dl(t, n);
}
function vl(e) {
  return (e & 128) === 0;
}
function Ol(e, t) {
  return zn(e, t | 128);
}
function zn(e, t) {
  return V.chmodSync(e, t);
}
function Dl(e, t) {
  const n = V.statSync(e);
  return Sl(t, n.atime, n.mtime);
}
function Il(e, t, n, r, o) {
  return t ? hi(n, r, o) : xl(e.mode, n, r, o);
}
function xl(e, t, n, r) {
  return V.mkdirSync(n), hi(t, n, r), zn(n, e);
}
function hi(e, t, n) {
  const r = V.opendirSync(e);
  try {
    let o;
    for (; (o = r.readSync()) !== null; )
      Rl(o.name, e, t, n);
  } finally {
    r.closeSync();
  }
}
function Rl(e, t, n, r) {
  const o = it.join(t, e), i = it.join(n, e);
  if (r.filter && !r.filter(o, i)) return;
  const { destStat: s } = st.checkPathsSync(o, i, "copy", r);
  return fi(s, o, i, r);
}
function Pl(e, t, n, r) {
  let o = V.readlinkSync(t);
  if (r.dereference && (o = it.resolve(process.cwd(), o)), e) {
    let i;
    try {
      i = V.readlinkSync(n);
    } catch (s) {
      if (s.code === "EINVAL" || s.code === "UNKNOWN") return V.symlinkSync(o, n);
      throw s;
    }
    if (r.dereference && (i = it.resolve(process.cwd(), i)), o !== i) {
      if (st.isSrcSubdir(o, i))
        throw new Error(`Cannot copy '${o}' to a subdirectory of itself, '${i}'.`);
      if (st.isSrcSubdir(i, o))
        throw new Error(`Cannot overwrite '${i}' with '${o}'.`);
    }
    return Al(o, n);
  } else
    return V.symlinkSync(o, n);
}
function Al(e, t) {
  return V.unlinkSync(t), V.symlinkSync(e, t);
}
var Cl = bl;
const Fl = L.fromPromise;
var Vn = {
  copy: Fl(wl),
  copySync: Cl
};
const mi = Ye, Ll = L.fromCallback;
function Ml(e, t) {
  mi.rm(e, { recursive: !0, force: !0 }, t);
}
function kl(e) {
  mi.rmSync(e, { recursive: !0, force: !0 });
}
var Vt = {
  remove: Ll(Ml),
  removeSync: kl
};
const _l = L.fromPromise, pi = q, yi = T, wi = ae, gi = Vt, Ur = _l(async function(t) {
  let n;
  try {
    n = await pi.readdir(t);
  } catch {
    return wi.mkdirs(t);
  }
  return Promise.all(n.map((r) => gi.remove(yi.join(t, r))));
});
function Nr(e) {
  let t;
  try {
    t = pi.readdirSync(e);
  } catch {
    return wi.mkdirsSync(e);
  }
  t.forEach((n) => {
    n = yi.join(e, n), gi.removeSync(n);
  });
}
var jl = {
  emptyDirSync: Nr,
  emptydirSync: Nr,
  emptyDir: Ur,
  emptydir: Ur
};
const Bl = L.fromPromise, Si = T, le = q, bi = ae;
async function Ul(e) {
  let t;
  try {
    t = await le.stat(e);
  } catch {
  }
  if (t && t.isFile()) return;
  const n = Si.dirname(e);
  let r = null;
  try {
    r = await le.stat(n);
  } catch (o) {
    if (o.code === "ENOENT") {
      await bi.mkdirs(n), await le.writeFile(e, "");
      return;
    } else
      throw o;
  }
  r.isDirectory() ? await le.writeFile(e, "") : await le.readdir(n);
}
function Nl(e) {
  let t;
  try {
    t = le.statSync(e);
  } catch {
  }
  if (t && t.isFile()) return;
  const n = Si.dirname(e);
  try {
    le.statSync(n).isDirectory() || le.readdirSync(n);
  } catch (r) {
    if (r && r.code === "ENOENT") bi.mkdirsSync(n);
    else throw r;
  }
  le.writeFileSync(e, "");
}
var Gl = {
  createFile: Bl(Ul),
  createFileSync: Nl
};
const Wl = L.fromPromise, Ei = T, de = q, Ti = ae, { pathExists: zl } = Ie, { areIdentical: $i } = Je;
async function Vl(e, t) {
  let n;
  try {
    n = await de.lstat(t);
  } catch {
  }
  let r;
  try {
    r = await de.lstat(e);
  } catch (s) {
    throw s.message = s.message.replace("lstat", "ensureLink"), s;
  }
  if (n && $i(r, n)) return;
  const o = Ei.dirname(t);
  await zl(o) || await Ti.mkdirs(o), await de.link(e, t);
}
function Hl(e, t) {
  let n;
  try {
    n = de.lstatSync(t);
  } catch {
  }
  try {
    const i = de.lstatSync(e);
    if (n && $i(i, n)) return;
  } catch (i) {
    throw i.message = i.message.replace("lstat", "ensureLink"), i;
  }
  const r = Ei.dirname(t);
  return de.existsSync(r) || Ti.mkdirsSync(r), de.linkSync(e, t);
}
var ql = {
  createLink: Wl(Vl),
  createLinkSync: Hl
};
const ye = T, et = q, { pathExists: Yl } = Ie, Jl = L.fromPromise;
async function Kl(e, t) {
  if (ye.isAbsolute(e)) {
    try {
      await et.lstat(e);
    } catch (i) {
      throw i.message = i.message.replace("lstat", "ensureSymlink"), i;
    }
    return {
      toCwd: e,
      toDst: e
    };
  }
  const n = ye.dirname(t), r = ye.join(n, e);
  if (await Yl(r))
    return {
      toCwd: r,
      toDst: e
    };
  try {
    await et.lstat(e);
  } catch (i) {
    throw i.message = i.message.replace("lstat", "ensureSymlink"), i;
  }
  return {
    toCwd: e,
    toDst: ye.relative(n, e)
  };
}
function Xl(e, t) {
  if (ye.isAbsolute(e)) {
    if (!et.existsSync(e)) throw new Error("absolute srcpath does not exist");
    return {
      toCwd: e,
      toDst: e
    };
  }
  const n = ye.dirname(t), r = ye.join(n, e);
  if (et.existsSync(r))
    return {
      toCwd: r,
      toDst: e
    };
  if (!et.existsSync(e)) throw new Error("relative srcpath does not exist");
  return {
    toCwd: e,
    toDst: ye.relative(n, e)
  };
}
var Ql = {
  symlinkPaths: Jl(Kl),
  symlinkPathsSync: Xl
};
const vi = q, Zl = L.fromPromise;
async function eu(e, t) {
  if (t) return t;
  let n;
  try {
    n = await vi.lstat(e);
  } catch {
    return "file";
  }
  return n && n.isDirectory() ? "dir" : "file";
}
function tu(e, t) {
  if (t) return t;
  let n;
  try {
    n = vi.lstatSync(e);
  } catch {
    return "file";
  }
  return n && n.isDirectory() ? "dir" : "file";
}
var nu = {
  symlinkType: Zl(eu),
  symlinkTypeSync: tu
};
const ru = L.fromPromise, Oi = T, oe = q, { mkdirs: ou, mkdirsSync: iu } = ae, { symlinkPaths: su, symlinkPathsSync: au } = Ql, { symlinkType: cu, symlinkTypeSync: lu } = nu, { pathExists: uu } = Ie, { areIdentical: Di } = Je;
async function fu(e, t, n) {
  let r;
  try {
    r = await oe.lstat(t);
  } catch {
  }
  if (r && r.isSymbolicLink()) {
    const [a, c] = await Promise.all([
      oe.stat(e),
      oe.stat(t)
    ]);
    if (Di(a, c)) return;
  }
  const o = await su(e, t);
  e = o.toDst;
  const i = await cu(o.toCwd, n), s = Oi.dirname(t);
  return await uu(s) || await ou(s), oe.symlink(e, t, i);
}
function du(e, t, n) {
  let r;
  try {
    r = oe.lstatSync(t);
  } catch {
  }
  if (r && r.isSymbolicLink()) {
    const a = oe.statSync(e), c = oe.statSync(t);
    if (Di(a, c)) return;
  }
  const o = au(e, t);
  e = o.toDst, n = lu(o.toCwd, n);
  const i = Oi.dirname(t);
  return oe.existsSync(i) || iu(i), oe.symlinkSync(e, t, n);
}
var hu = {
  createSymlink: ru(fu),
  createSymlinkSync: du
};
const { createFile: Gr, createFileSync: Wr } = Gl, { createLink: zr, createLinkSync: Vr } = ql, { createSymlink: Hr, createSymlinkSync: qr } = hu;
var mu = {
  // file
  createFile: Gr,
  createFileSync: Wr,
  ensureFile: Gr,
  ensureFileSync: Wr,
  // link
  createLink: zr,
  createLinkSync: Vr,
  ensureLink: zr,
  ensureLinkSync: Vr,
  // symlink
  createSymlink: Hr,
  createSymlinkSync: qr,
  ensureSymlink: Hr,
  ensureSymlinkSync: qr
};
function pu(e, { EOL: t = `
`, finalEOL: n = !0, replacer: r = null, spaces: o } = {}) {
  const i = n ? t : "";
  return JSON.stringify(e, r, o).replace(/\n/g, t) + i;
}
function yu(e) {
  return Buffer.isBuffer(e) && (e = e.toString("utf8")), e.replace(/^\uFEFF/, "");
}
var Hn = { stringify: pu, stripBom: yu };
let Ge;
try {
  Ge = Ye;
} catch {
  Ge = dt;
}
const Ht = L, { stringify: Ii, stripBom: xi } = Hn;
async function wu(e, t = {}) {
  typeof t == "string" && (t = { encoding: t });
  const n = t.fs || Ge, r = "throws" in t ? t.throws : !0;
  let o = await Ht.fromCallback(n.readFile)(e, t);
  o = xi(o);
  let i;
  try {
    i = JSON.parse(o, t ? t.reviver : null);
  } catch (s) {
    if (r)
      throw s.message = `${e}: ${s.message}`, s;
    return null;
  }
  return i;
}
const gu = Ht.fromPromise(wu);
function Su(e, t = {}) {
  typeof t == "string" && (t = { encoding: t });
  const n = t.fs || Ge, r = "throws" in t ? t.throws : !0;
  try {
    let o = n.readFileSync(e, t);
    return o = xi(o), JSON.parse(o, t.reviver);
  } catch (o) {
    if (r)
      throw o.message = `${e}: ${o.message}`, o;
    return null;
  }
}
async function bu(e, t, n = {}) {
  const r = n.fs || Ge, o = Ii(t, n);
  await Ht.fromCallback(r.writeFile)(e, o, n);
}
const Eu = Ht.fromPromise(bu);
function Tu(e, t, n = {}) {
  const r = n.fs || Ge, o = Ii(t, n);
  return r.writeFileSync(e, o, n);
}
var $u = {
  readFile: gu,
  readFileSync: Su,
  writeFile: Eu,
  writeFileSync: Tu
};
const Et = $u;
var vu = {
  // jsonfile exports
  readJson: Et.readFile,
  readJsonSync: Et.readFileSync,
  writeJson: Et.writeFile,
  writeJsonSync: Et.writeFileSync
};
const Ou = L.fromPromise, mn = q, Ri = T, Pi = ae, Du = Ie.pathExists;
async function Iu(e, t, n = "utf-8") {
  const r = Ri.dirname(e);
  return await Du(r) || await Pi.mkdirs(r), mn.writeFile(e, t, n);
}
function xu(e, ...t) {
  const n = Ri.dirname(e);
  mn.existsSync(n) || Pi.mkdirsSync(n), mn.writeFileSync(e, ...t);
}
var qn = {
  outputFile: Ou(Iu),
  outputFileSync: xu
};
const { stringify: Ru } = Hn, { outputFile: Pu } = qn;
async function Au(e, t, n = {}) {
  const r = Ru(t, n);
  await Pu(e, r, n);
}
var Cu = Au;
const { stringify: Fu } = Hn, { outputFileSync: Lu } = qn;
function Mu(e, t, n) {
  const r = Fu(t, n);
  Lu(e, r, n);
}
var ku = Mu;
const _u = L.fromPromise, H = vu;
H.outputJson = _u(Cu);
H.outputJsonSync = ku;
H.outputJSON = H.outputJson;
H.outputJSONSync = H.outputJsonSync;
H.writeJSON = H.writeJson;
H.writeJSONSync = H.writeJsonSync;
H.readJSON = H.readJson;
H.readJSONSync = H.readJsonSync;
var ju = H;
const Bu = q, Yr = T, { copy: Uu } = Vn, { remove: Ai } = Vt, { mkdirp: Nu } = ae, { pathExists: Gu } = Ie, Jr = Je;
async function Wu(e, t, n = {}) {
  const r = n.overwrite || n.clobber || !1, { srcStat: o, isChangingCase: i = !1 } = await Jr.checkPaths(e, t, "move", n);
  await Jr.checkParentPaths(e, o, t, "move");
  const s = Yr.dirname(t);
  return Yr.parse(s).root !== s && await Nu(s), zu(e, t, r, i);
}
async function zu(e, t, n, r) {
  if (!r) {
    if (n)
      await Ai(t);
    else if (await Gu(t))
      throw new Error("dest already exists.");
  }
  try {
    await Bu.rename(e, t);
  } catch (o) {
    if (o.code !== "EXDEV")
      throw o;
    await Vu(e, t, n);
  }
}
async function Vu(e, t, n) {
  return await Uu(e, t, {
    overwrite: n,
    errorOnExist: !0,
    preserveTimestamps: !0
  }), Ai(e);
}
var Hu = Wu;
const Ci = Ye, pn = T, qu = Vn.copySync, Fi = Vt.removeSync, Yu = ae.mkdirpSync, Kr = Je;
function Ju(e, t, n) {
  n = n || {};
  const r = n.overwrite || n.clobber || !1, { srcStat: o, isChangingCase: i = !1 } = Kr.checkPathsSync(e, t, "move", n);
  return Kr.checkParentPathsSync(e, o, t, "move"), Ku(t) || Yu(pn.dirname(t)), Xu(e, t, r, i);
}
function Ku(e) {
  const t = pn.dirname(e);
  return pn.parse(t).root === t;
}
function Xu(e, t, n, r) {
  if (r) return rn(e, t, n);
  if (n)
    return Fi(t), rn(e, t, n);
  if (Ci.existsSync(t)) throw new Error("dest already exists.");
  return rn(e, t, n);
}
function rn(e, t, n) {
  try {
    Ci.renameSync(e, t);
  } catch (r) {
    if (r.code !== "EXDEV") throw r;
    return Qu(e, t, n);
  }
}
function Qu(e, t, n) {
  return qu(e, t, {
    overwrite: n,
    errorOnExist: !0,
    preserveTimestamps: !0
  }), Fi(e);
}
var Zu = Ju;
const ef = L.fromPromise;
var tf = {
  move: ef(Hu),
  moveSync: Zu
}, nf = {
  // Export promiseified graceful-fs:
  ...q,
  // Export extra methods:
  ...Vn,
  ...jl,
  ...mu,
  ...ju,
  ...ae,
  ...tf,
  ...qn,
  ...Ie,
  ...Vt
};
const F = /* @__PURE__ */ Zo(nf);
function X(e) {
  if (typeof e != "object" || e === null)
    return !1;
  const t = Object.getPrototypeOf(e);
  return (t === null || t === Object.prototype || Object.getPrototypeOf(t) === null) && !(Symbol.toStringTag in e) && !(Symbol.iterator in e);
}
const Yn = (e, t) => {
  const n = Mi(rf(e));
  if (typeof n != "string")
    throw new TypeError(`${t} must be a string or a file URL: ${n}.`);
  return n;
}, rf = (e) => Li(e) ? e.toString() : e, Li = (e) => typeof e != "string" && e && Object.getPrototypeOf(e) === String.prototype, Mi = (e) => e instanceof URL ? kn(e) : e, ki = (e, t = [], n = {}) => {
  const r = Yn(e, "First argument"), [o, i] = X(t) ? [[], t] : [t, n];
  if (!Array.isArray(o))
    throw new TypeError(`Second argument must be either an array of arguments or an options object: ${o}`);
  if (o.some((c) => typeof c == "object" && c !== null))
    throw new TypeError(`Second argument must be an array of strings: ${o}`);
  const s = o.map(String), a = s.find((c) => c.includes("\0"));
  if (a !== void 0)
    throw new TypeError(`Arguments cannot contain null bytes ("\\0"): ${a}`);
  if (!X(i))
    throw new TypeError(`Last argument must be an options object: ${i}`);
  return [r, s, i];
}, { toString: _i } = Object.prototype, of = (e) => _i.call(e) === "[object ArrayBuffer]", te = (e) => _i.call(e) === "[object Uint8Array]", at = (e) => new Uint8Array(e.buffer, e.byteOffset, e.byteLength), sf = new TextEncoder(), ji = (e) => sf.encode(e), af = new TextDecoder(), Bi = (e) => af.decode(e), cf = (e, t) => lf(e, t).join(""), lf = (e, t) => {
  if (t === "utf8" && e.every((i) => typeof i == "string"))
    return e;
  const n = new zo(t), r = e.map((i) => typeof i == "string" ? ji(i) : i).map((i) => n.write(i)), o = n.end();
  return o === "" ? r : [...r, o];
}, Jn = (e) => e.length === 1 && te(e[0]) ? e[0] : Ui(uf(e)), uf = (e) => e.map((t) => typeof t == "string" ? ji(t) : t), Ui = (e) => {
  const t = new Uint8Array(ff(e));
  let n = 0;
  for (const r of e)
    t.set(r, n), n += r.length;
  return t;
}, ff = (e) => {
  let t = 0;
  for (const n of e)
    t += n.length;
  return t;
}, df = (e) => Array.isArray(e) && Array.isArray(e.raw), hf = (e, t) => {
  let n = [];
  for (const [i, s] of e.entries())
    n = mf({
      templates: e,
      expressions: t,
      tokens: n,
      index: i,
      template: s
    });
  if (n.length === 0)
    throw new TypeError("Template script must not be empty");
  const [r, ...o] = n;
  return [r, o, {}];
}, mf = ({ templates: e, expressions: t, tokens: n, index: r, template: o }) => {
  if (o === void 0)
    throw new TypeError(`Invalid backslash sequence: ${e.raw[r]}`);
  const { nextTokens: i, leadingWhitespaces: s, trailingWhitespaces: a } = pf(o, e.raw[r]), c = Qr(n, i, s);
  if (r === t.length)
    return c;
  const u = t[r], l = Array.isArray(u) ? u.map((f) => Zr(f)) : [Zr(u)];
  return Qr(c, l, a);
}, pf = (e, t) => {
  if (t.length === 0)
    return { nextTokens: [], leadingWhitespaces: !1, trailingWhitespaces: !1 };
  const n = [];
  let r = 0;
  const o = Xr.has(t[0]);
  for (let s = 0, a = 0; s < e.length; s += 1, a += 1) {
    const c = t[a];
    if (Xr.has(c))
      r !== s && n.push(e.slice(r, s)), r = s + 1;
    else if (c === "\\") {
      const u = t[a + 1];
      u === `
` ? (s -= 1, a += 1) : u === "u" && t[a + 2] === "{" ? a = t.indexOf("}", a + 3) : a += yf[u] ?? 1;
    }
  }
  const i = r === e.length;
  return i || n.push(e.slice(r)), { nextTokens: n, leadingWhitespaces: o, trailingWhitespaces: i };
}, Xr = /* @__PURE__ */ new Set([" ", "	", "\r", `
`]), yf = { x: 3, u: 5 }, Qr = (e, t, n) => n || e.length === 0 || t.length === 0 ? [...e, ...t] : [
  ...e.slice(0, -1),
  `${e.at(-1)}${t[0]}`,
  ...t.slice(1)
], Zr = (e) => {
  const t = typeof e;
  if (t === "string")
    return e;
  if (t === "number")
    return String(e);
  if (X(e) && ("stdout" in e || "isMaxBuffer" in e))
    return wf(e);
  throw e instanceof Wo || Object.prototype.toString.call(e) === "[object Promise]" ? new TypeError("Unexpected subprocess in template expression. Please use ${await subprocess} instead of ${subprocess}.") : new TypeError(`Unexpected "${t}" in template expression`);
}, wf = ({ stdout: e }) => {
  if (typeof e == "string")
    return e;
  if (te(e))
    return Bi(e);
  throw e === void 0 ? new TypeError(`Missing result.stdout in template expression. This is probably due to the previous subprocess' "stdout" option.`) : new TypeError(`Unexpected "${typeof e}" stdout in template expression`);
}, ve = (e) => Kn.includes(e), Kn = [G.stdin, G.stdout, G.stderr], se = ["stdin", "stdout", "stderr"], Ni = (e) => se[e] ?? `stdio[${e}]`, gf = (e) => {
  const t = { ...e };
  for (const n of zi)
    t[n] = Gi(e, n);
  return t;
}, Gi = (e, t) => {
  const n = Array.from({ length: Sf(e) + 1 }), r = bf(e[t], n, t);
  return Of(r, t);
}, Sf = ({ stdio: e }) => Array.isArray(e) ? Math.max(e.length, se.length) : se.length, bf = (e, t, n) => X(e) ? Ef(e, t, n) : t.fill(e), Ef = (e, t, n) => {
  for (const r of Object.keys(e).sort(Tf))
    for (const o of $f(r, n, t))
      t[o] = e[r];
  return t;
}, Tf = (e, t) => eo(e) < eo(t) ? 1 : -1, eo = (e) => e === "stdout" || e === "stderr" ? 0 : e === "all" ? 2 : 1, $f = (e, t, n) => {
  if (e === "ipc")
    return [n.length - 1];
  const r = Wi(e);
  if (r === void 0 || r === 0)
    throw new TypeError(`"${t}.${e}" is invalid.
It must be "${t}.stdout", "${t}.stderr", "${t}.all", "${t}.ipc", or "${t}.fd3", "${t}.fd4" (and so on).`);
  if (r >= n.length)
    throw new TypeError(`"${t}.${e}" is invalid: that file descriptor does not exist.
Please set the "stdio" option to ensure that file descriptor exists.`);
  return r === "all" ? [1, 2] : [r];
}, Wi = (e) => {
  if (e === "all")
    return e;
  if (se.includes(e))
    return se.indexOf(e);
  const t = vf.exec(e);
  if (t !== null)
    return Number(t[1]);
}, vf = /^fd(\d+)$/, Of = (e, t) => e.map((n) => n === void 0 ? If[t] : n), Df = wc("execa").enabled ? "full" : "none", If = {
  lines: !1,
  buffer: !0,
  maxBuffer: 1e3 * 1e3 * 100,
  verbose: Df,
  stripFinalNewline: !0
}, zi = ["lines", "buffer", "maxBuffer", "verbose", "stripFinalNewline"], ct = (e, t) => t === "ipc" ? e.at(-1) : e[t], Xn = ({ verbose: e }, t) => Zn(e, t) !== "none", Qn = ({ verbose: e }, t) => !["none", "short"].includes(Zn(e, t)), xf = ({ verbose: e }, t) => {
  const n = Zn(e, t);
  return er(n) ? n : void 0;
}, Zn = (e, t) => t === void 0 ? Rf(e) : ct(e, t), Rf = (e) => e.find((t) => er(t)) ?? yn.findLast((t) => e.includes(t)), er = (e) => typeof e == "function", yn = ["none", "short", "full"], Pf = (e, t) => {
  const n = [e, ...t], r = n.join(" "), o = n.map((i) => kf(Vi(i))).join(" ");
  return { command: r, escapedCommand: o };
}, tr = (e) => gc(e).split(`
`).map((t) => Vi(t)).join(`
`), Vi = (e) => e.replaceAll(Ff, (t) => Af(t)), Af = (e) => {
  const t = Lf[e];
  if (t !== void 0)
    return t;
  const n = e.codePointAt(0), r = n.toString(16);
  return n <= Mf ? `\\u${r.padStart(4, "0")}` : `\\U${r}`;
}, Cf = () => {
  try {
    return new RegExp("\\p{Separator}|\\p{Other}", "gu");
  } catch {
    return /[\s\u0000-\u001F\u007F-\u009F\u00AD]/g;
  }
}, Ff = Cf(), Lf = {
  " ": " ",
  "\b": "\\b",
  "\f": "\\f",
  "\n": "\\n",
  "\r": "\\r",
  "	": "\\t"
}, Mf = 65535, kf = (e) => _f.test(e) ? e : bc === "win32" ? `"${e.replaceAll('"', '""')}"` : `'${e.replaceAll("'", "'\\''")}'`, _f = /^[\w./-]+$/;
function jf() {
  const { env: e } = G, { TERM: t, TERM_PROGRAM: n } = e;
  return G.platform !== "win32" ? t !== "linux" : !!e.WT_SESSION || !!e.TERMINUS_SUBLIME || e.ConEmuTask === "{cmd::Cmder}" || n === "Terminus-Sublime" || n === "vscode" || t === "xterm-256color" || t === "alacritty" || t === "rxvt-unicode" || t === "rxvt-unicode-256color" || e.TERMINAL_EMULATOR === "JetBrains-JediTerm";
}
const Hi = {
  circleQuestionMark: "(?)",
  questionMarkPrefix: "(?)",
  square: "█",
  squareDarkShade: "▓",
  squareMediumShade: "▒",
  squareLightShade: "░",
  squareTop: "▀",
  squareBottom: "▄",
  squareLeft: "▌",
  squareRight: "▐",
  squareCenter: "■",
  bullet: "●",
  dot: "․",
  ellipsis: "…",
  pointerSmall: "›",
  triangleUp: "▲",
  triangleUpSmall: "▴",
  triangleDown: "▼",
  triangleDownSmall: "▾",
  triangleLeftSmall: "◂",
  triangleRightSmall: "▸",
  home: "⌂",
  heart: "♥",
  musicNote: "♪",
  musicNoteBeamed: "♫",
  arrowUp: "↑",
  arrowDown: "↓",
  arrowLeft: "←",
  arrowRight: "→",
  arrowLeftRight: "↔",
  arrowUpDown: "↕",
  almostEqual: "≈",
  notEqual: "≠",
  lessOrEqual: "≤",
  greaterOrEqual: "≥",
  identical: "≡",
  infinity: "∞",
  subscriptZero: "₀",
  subscriptOne: "₁",
  subscriptTwo: "₂",
  subscriptThree: "₃",
  subscriptFour: "₄",
  subscriptFive: "₅",
  subscriptSix: "₆",
  subscriptSeven: "₇",
  subscriptEight: "₈",
  subscriptNine: "₉",
  oneHalf: "½",
  oneThird: "⅓",
  oneQuarter: "¼",
  oneFifth: "⅕",
  oneSixth: "⅙",
  oneEighth: "⅛",
  twoThirds: "⅔",
  twoFifths: "⅖",
  threeQuarters: "¾",
  threeFifths: "⅗",
  threeEighths: "⅜",
  fourFifths: "⅘",
  fiveSixths: "⅚",
  fiveEighths: "⅝",
  sevenEighths: "⅞",
  line: "─",
  lineBold: "━",
  lineDouble: "═",
  lineDashed0: "┄",
  lineDashed1: "┅",
  lineDashed2: "┈",
  lineDashed3: "┉",
  lineDashed4: "╌",
  lineDashed5: "╍",
  lineDashed6: "╴",
  lineDashed7: "╶",
  lineDashed8: "╸",
  lineDashed9: "╺",
  lineDashed10: "╼",
  lineDashed11: "╾",
  lineDashed12: "−",
  lineDashed13: "–",
  lineDashed14: "‐",
  lineDashed15: "⁃",
  lineVertical: "│",
  lineVerticalBold: "┃",
  lineVerticalDouble: "║",
  lineVerticalDashed0: "┆",
  lineVerticalDashed1: "┇",
  lineVerticalDashed2: "┊",
  lineVerticalDashed3: "┋",
  lineVerticalDashed4: "╎",
  lineVerticalDashed5: "╏",
  lineVerticalDashed6: "╵",
  lineVerticalDashed7: "╷",
  lineVerticalDashed8: "╹",
  lineVerticalDashed9: "╻",
  lineVerticalDashed10: "╽",
  lineVerticalDashed11: "╿",
  lineDownLeft: "┐",
  lineDownLeftArc: "╮",
  lineDownBoldLeftBold: "┓",
  lineDownBoldLeft: "┒",
  lineDownLeftBold: "┑",
  lineDownDoubleLeftDouble: "╗",
  lineDownDoubleLeft: "╖",
  lineDownLeftDouble: "╕",
  lineDownRight: "┌",
  lineDownRightArc: "╭",
  lineDownBoldRightBold: "┏",
  lineDownBoldRight: "┎",
  lineDownRightBold: "┍",
  lineDownDoubleRightDouble: "╔",
  lineDownDoubleRight: "╓",
  lineDownRightDouble: "╒",
  lineUpLeft: "┘",
  lineUpLeftArc: "╯",
  lineUpBoldLeftBold: "┛",
  lineUpBoldLeft: "┚",
  lineUpLeftBold: "┙",
  lineUpDoubleLeftDouble: "╝",
  lineUpDoubleLeft: "╜",
  lineUpLeftDouble: "╛",
  lineUpRight: "└",
  lineUpRightArc: "╰",
  lineUpBoldRightBold: "┗",
  lineUpBoldRight: "┖",
  lineUpRightBold: "┕",
  lineUpDoubleRightDouble: "╚",
  lineUpDoubleRight: "╙",
  lineUpRightDouble: "╘",
  lineUpDownLeft: "┤",
  lineUpBoldDownBoldLeftBold: "┫",
  lineUpBoldDownBoldLeft: "┨",
  lineUpDownLeftBold: "┥",
  lineUpBoldDownLeftBold: "┩",
  lineUpDownBoldLeftBold: "┪",
  lineUpDownBoldLeft: "┧",
  lineUpBoldDownLeft: "┦",
  lineUpDoubleDownDoubleLeftDouble: "╣",
  lineUpDoubleDownDoubleLeft: "╢",
  lineUpDownLeftDouble: "╡",
  lineUpDownRight: "├",
  lineUpBoldDownBoldRightBold: "┣",
  lineUpBoldDownBoldRight: "┠",
  lineUpDownRightBold: "┝",
  lineUpBoldDownRightBold: "┡",
  lineUpDownBoldRightBold: "┢",
  lineUpDownBoldRight: "┟",
  lineUpBoldDownRight: "┞",
  lineUpDoubleDownDoubleRightDouble: "╠",
  lineUpDoubleDownDoubleRight: "╟",
  lineUpDownRightDouble: "╞",
  lineDownLeftRight: "┬",
  lineDownBoldLeftBoldRightBold: "┳",
  lineDownLeftBoldRightBold: "┯",
  lineDownBoldLeftRight: "┰",
  lineDownBoldLeftBoldRight: "┱",
  lineDownBoldLeftRightBold: "┲",
  lineDownLeftRightBold: "┮",
  lineDownLeftBoldRight: "┭",
  lineDownDoubleLeftDoubleRightDouble: "╦",
  lineDownDoubleLeftRight: "╥",
  lineDownLeftDoubleRightDouble: "╤",
  lineUpLeftRight: "┴",
  lineUpBoldLeftBoldRightBold: "┻",
  lineUpLeftBoldRightBold: "┷",
  lineUpBoldLeftRight: "┸",
  lineUpBoldLeftBoldRight: "┹",
  lineUpBoldLeftRightBold: "┺",
  lineUpLeftRightBold: "┶",
  lineUpLeftBoldRight: "┵",
  lineUpDoubleLeftDoubleRightDouble: "╩",
  lineUpDoubleLeftRight: "╨",
  lineUpLeftDoubleRightDouble: "╧",
  lineUpDownLeftRight: "┼",
  lineUpBoldDownBoldLeftBoldRightBold: "╋",
  lineUpDownBoldLeftBoldRightBold: "╈",
  lineUpBoldDownLeftBoldRightBold: "╇",
  lineUpBoldDownBoldLeftRightBold: "╊",
  lineUpBoldDownBoldLeftBoldRight: "╉",
  lineUpBoldDownLeftRight: "╀",
  lineUpDownBoldLeftRight: "╁",
  lineUpDownLeftBoldRight: "┽",
  lineUpDownLeftRightBold: "┾",
  lineUpBoldDownBoldLeftRight: "╂",
  lineUpDownLeftBoldRightBold: "┿",
  lineUpBoldDownLeftBoldRight: "╃",
  lineUpBoldDownLeftRightBold: "╄",
  lineUpDownBoldLeftBoldRight: "╅",
  lineUpDownBoldLeftRightBold: "╆",
  lineUpDoubleDownDoubleLeftDoubleRightDouble: "╬",
  lineUpDoubleDownDoubleLeftRight: "╫",
  lineUpDownLeftDoubleRightDouble: "╪",
  lineCross: "╳",
  lineBackslash: "╲",
  lineSlash: "╱"
}, Bf = {
  tick: "✔",
  info: "ℹ",
  warning: "⚠",
  cross: "✘",
  squareSmall: "◻",
  squareSmallFilled: "◼",
  circle: "◯",
  circleFilled: "◉",
  circleDotted: "◌",
  circleDouble: "◎",
  circleCircle: "ⓞ",
  circleCross: "ⓧ",
  circlePipe: "Ⓘ",
  radioOn: "◉",
  radioOff: "◯",
  checkboxOn: "☒",
  checkboxOff: "☐",
  checkboxCircleOn: "ⓧ",
  checkboxCircleOff: "Ⓘ",
  pointer: "❯",
  triangleUpOutline: "△",
  triangleLeft: "◀",
  triangleRight: "▶",
  lozenge: "◆",
  lozengeOutline: "◇",
  hamburger: "☰",
  smiley: "㋡",
  mustache: "෴",
  star: "★",
  play: "▶",
  nodejs: "⬢",
  oneSeventh: "⅐",
  oneNinth: "⅑",
  oneTenth: "⅒"
}, Uf = {
  tick: "√",
  info: "i",
  warning: "‼",
  cross: "×",
  squareSmall: "□",
  squareSmallFilled: "■",
  circle: "( )",
  circleFilled: "(*)",
  circleDotted: "( )",
  circleDouble: "( )",
  circleCircle: "(○)",
  circleCross: "(×)",
  circlePipe: "(│)",
  radioOn: "(*)",
  radioOff: "( )",
  checkboxOn: "[×]",
  checkboxOff: "[ ]",
  checkboxCircleOn: "(×)",
  checkboxCircleOff: "( )",
  pointer: ">",
  triangleUpOutline: "∆",
  triangleLeft: "◄",
  triangleRight: "►",
  lozenge: "♦",
  lozengeOutline: "◊",
  hamburger: "≡",
  smiley: "☺",
  mustache: "┌─┐",
  star: "✶",
  play: "►",
  nodejs: "♦",
  oneSeventh: "1/7",
  oneNinth: "1/9",
  oneTenth: "1/10"
}, Nf = { ...Hi, ...Bf }, Gf = { ...Hi, ...Uf }, Wf = jf(), on = Wf ? Nf : Gf;
var Bo, Uo, Dt, No;
const zf = ((No = (Dt = (Uo = (Bo = Yo) == null ? void 0 : Bo.WriteStream) == null ? void 0 : Uo.prototype) == null ? void 0 : Dt.hasColors) == null ? void 0 : No.call(Dt)) ?? !1, qt = (e, t) => {
  if (!zf)
    return (o) => o;
  const n = `\x1B[${e}m`, r = `\x1B[${t}m`;
  return (o) => {
    const i = o + "";
    let s = i.indexOf(r);
    if (s === -1)
      return n + i + r;
    let a = n, c = 0;
    const l = (t === 22 ? r : "") + n;
    for (; s !== -1; )
      a += i.slice(c, s) + l, c = s + r.length, s = i.indexOf(r, c);
    return a += i.slice(c) + r, a;
  };
}, Vf = qt(1, 22), wn = qt(90, 39), Hf = qt(91, 39), qf = qt(93, 39), Yf = ({
  type: e,
  message: t,
  timestamp: n,
  piped: r,
  commandId: o,
  result: { failed: i = !1 } = {},
  options: { reject: s = !0 }
}) => {
  const a = Jf(n), c = Kf[e]({ failed: i, reject: s, piped: r }), u = Xf[e]({ reject: s });
  return `${wn(`[${a}]`)} ${wn(`[${o}]`)} ${u(c)} ${u(t)}`;
}, Jf = (e) => `${Tt(e.getHours(), 2)}:${Tt(e.getMinutes(), 2)}:${Tt(e.getSeconds(), 2)}.${Tt(e.getMilliseconds(), 3)}`, Tt = (e, t) => String(e).padStart(t, "0"), to = ({ failed: e, reject: t }) => e ? t ? on.cross : on.warning : on.tick, Kf = {
  command: ({ piped: e }) => e ? "|" : "$",
  output: () => " ",
  ipc: () => "*",
  error: to,
  duration: to
}, no = (e) => e, Xf = {
  command: () => Vf,
  output: () => no,
  ipc: () => no,
  error: ({ reject: e }) => e ? Hf : qf,
  duration: () => wn
}, Qf = (e, t, n) => {
  const r = xf(t, n);
  return e.map(({ verboseLine: o, verboseObject: i }) => Zf(o, i, r)).filter((o) => o !== void 0).map((o) => ed(o)).join("");
}, Zf = (e, t, n) => {
  if (n === void 0)
    return e;
  const r = n(e, t);
  if (typeof r == "string")
    return r;
}, ed = (e) => e.endsWith(`
`) ? e : `${e}
`, mt = ({ type: e, verboseMessage: t, fdNumber: n, verboseInfo: r, result: o }) => {
  const i = td({ type: e, result: o, verboseInfo: r }), s = nd(t, i), a = Qf(s, r, n);
  a !== "" && console.warn(a.slice(0, -1));
}, td = ({
  type: e,
  result: t,
  verboseInfo: { escapedCommand: n, commandId: r, rawOptions: { piped: o = !1, ...i } }
}) => ({
  type: e,
  escapedCommand: n,
  commandId: `${r}`,
  timestamp: /* @__PURE__ */ new Date(),
  piped: o,
  result: t,
  options: i
}), nd = (e, t) => e.split(`
`).map((n) => rd({ ...t, message: n })), rd = (e) => ({ verboseLine: Yf(e), verboseObject: e }), qi = (e) => {
  const t = typeof e == "string" ? e : Vo(e);
  return tr(t).replaceAll("	", " ".repeat(od));
}, od = 2, id = (e, t) => {
  Xn(t) && mt({
    type: "command",
    verboseMessage: e,
    verboseInfo: t
  });
}, sd = (e, t, n) => {
  ld(e);
  const r = ad(e);
  return {
    verbose: e,
    escapedCommand: t,
    commandId: r,
    rawOptions: n
  };
}, ad = (e) => Xn({ verbose: e }) ? cd++ : void 0;
let cd = 0n;
const ld = (e) => {
  for (const t of e) {
    if (t === !1)
      throw new TypeError(`The "verbose: false" option was renamed to "verbose: 'none'".`);
    if (t === !0)
      throw new TypeError(`The "verbose: true" option was renamed to "verbose: 'short'".`);
    if (!yn.includes(t) && !er(t)) {
      const n = yn.map((r) => `'${r}'`).join(", ");
      throw new TypeError(`The "verbose" option must not be ${t}. Allowed values are: ${n} or a function.`);
    }
  }
}, Yi = () => qo.bigint(), Ji = (e) => Number(qo.bigint() - e) / 1e6, Ki = (e, t, n) => {
  const r = Yi(), { command: o, escapedCommand: i } = Pf(e, t), s = Gi(n, "verbose"), a = sd(s, i, { ...n });
  return id(i, a), {
    command: o,
    escapedCommand: i,
    startTime: r,
    verboseInfo: a
  };
};
var Ke = { exports: {} }, sn, ro;
function ud() {
  if (ro) return sn;
  ro = 1, sn = r, r.sync = o;
  var e = dt;
  function t(i, s) {
    var a = s.pathExt !== void 0 ? s.pathExt : process.env.PATHEXT;
    if (!a || (a = a.split(";"), a.indexOf("") !== -1))
      return !0;
    for (var c = 0; c < a.length; c++) {
      var u = a[c].toLowerCase();
      if (u && i.substr(-u.length).toLowerCase() === u)
        return !0;
    }
    return !1;
  }
  function n(i, s, a) {
    return !i.isSymbolicLink() && !i.isFile() ? !1 : t(s, a);
  }
  function r(i, s, a) {
    e.stat(i, function(c, u) {
      a(c, c ? !1 : n(u, i, s));
    });
  }
  function o(i, s) {
    return n(e.statSync(i), i, s);
  }
  return sn;
}
var an, oo;
function fd() {
  if (oo) return an;
  oo = 1, an = t, t.sync = n;
  var e = dt;
  function t(i, s, a) {
    e.stat(i, function(c, u) {
      a(c, c ? !1 : r(u, s));
    });
  }
  function n(i, s) {
    return r(e.statSync(i), s);
  }
  function r(i, s) {
    return i.isFile() && o(i, s);
  }
  function o(i, s) {
    var a = i.mode, c = i.uid, u = i.gid, l = s.uid !== void 0 ? s.uid : process.getuid && process.getuid(), f = s.gid !== void 0 ? s.gid : process.getgid && process.getgid(), d = parseInt("100", 8), h = parseInt("010", 8), m = parseInt("001", 8), y = d | h, g = a & m || a & h && u === f || a & d && c === l || a & y && l === 0;
    return g;
  }
  return an;
}
var Lt;
process.platform === "win32" || Ct.TESTING_WINDOWS ? Lt = ud() : Lt = fd();
var dd = nr;
nr.sync = hd;
function nr(e, t, n) {
  if (typeof t == "function" && (n = t, t = {}), !n) {
    if (typeof Promise != "function")
      throw new TypeError("callback not provided");
    return new Promise(function(r, o) {
      nr(e, t || {}, function(i, s) {
        i ? o(i) : r(s);
      });
    });
  }
  Lt(e, t || {}, function(r, o) {
    r && (r.code === "EACCES" || t && t.ignoreErrors) && (r = null, o = !1), n(r, o);
  });
}
function hd(e, t) {
  try {
    return Lt.sync(e, t || {});
  } catch (n) {
    if (t && t.ignoreErrors || n.code === "EACCES")
      return !1;
    throw n;
  }
}
const Le = process.platform === "win32" || process.env.OSTYPE === "cygwin" || process.env.OSTYPE === "msys", Xi = T, md = Le ? ";" : ":", Qi = dd, Zi = (e) => Object.assign(new Error(`not found: ${e}`), { code: "ENOENT" }), es = (e, t) => {
  const n = t.colon || md, r = e.match(/\//) || Le && e.match(/\\/) ? [""] : [
    // windows always checks the cwd first
    ...Le ? [process.cwd()] : [],
    ...(t.path || process.env.PATH || /* istanbul ignore next: very unusual */
    "").split(n)
  ], o = Le ? t.pathExt || process.env.PATHEXT || ".EXE;.CMD;.BAT;.COM" : "", i = Le ? o.split(n) : [""];
  return Le && e.indexOf(".") !== -1 && i[0] !== "" && i.unshift(""), {
    pathEnv: r,
    pathExt: i,
    pathExtExe: o
  };
}, ts = (e, t, n) => {
  typeof t == "function" && (n = t, t = {}), t || (t = {});
  const { pathEnv: r, pathExt: o, pathExtExe: i } = es(e, t), s = [], a = (u) => new Promise((l, f) => {
    if (u === r.length)
      return t.all && s.length ? l(s) : f(Zi(e));
    const d = r[u], h = /^".*"$/.test(d) ? d.slice(1, -1) : d, m = Xi.join(h, e), y = !h && /^\.[\\\/]/.test(e) ? e.slice(0, 2) + m : m;
    l(c(y, u, 0));
  }), c = (u, l, f) => new Promise((d, h) => {
    if (f === o.length)
      return d(a(l + 1));
    const m = o[f];
    Qi(u + m, { pathExt: i }, (y, g) => {
      if (!y && g)
        if (t.all)
          s.push(u + m);
        else
          return d(u + m);
      return d(c(u, l, f + 1));
    });
  });
  return n ? a(0).then((u) => n(null, u), n) : a(0);
}, pd = (e, t) => {
  t = t || {};
  const { pathEnv: n, pathExt: r, pathExtExe: o } = es(e, t), i = [];
  for (let s = 0; s < n.length; s++) {
    const a = n[s], c = /^".*"$/.test(a) ? a.slice(1, -1) : a, u = Xi.join(c, e), l = !c && /^\.[\\\/]/.test(e) ? e.slice(0, 2) + u : u;
    for (let f = 0; f < r.length; f++) {
      const d = l + r[f];
      try {
        if (Qi.sync(d, { pathExt: o }))
          if (t.all)
            i.push(d);
          else
            return d;
      } catch {
      }
    }
  }
  if (t.all && i.length)
    return i;
  if (t.nothrow)
    return null;
  throw Zi(e);
};
var yd = ts;
ts.sync = pd;
var rr = { exports: {} };
const ns = (e = {}) => {
  const t = e.env || process.env;
  return (e.platform || process.platform) !== "win32" ? "PATH" : Object.keys(t).reverse().find((r) => r.toUpperCase() === "PATH") || "Path";
};
rr.exports = ns;
rr.exports.default = ns;
var wd = rr.exports;
const io = T, gd = yd, Sd = wd;
function so(e, t) {
  const n = e.options.env || process.env, r = process.cwd(), o = e.options.cwd != null, i = o && process.chdir !== void 0 && !process.chdir.disabled;
  if (i)
    try {
      process.chdir(e.options.cwd);
    } catch {
    }
  let s;
  try {
    s = gd.sync(e.command, {
      path: n[Sd({ env: n })],
      pathExt: t ? io.delimiter : void 0
    });
  } catch {
  } finally {
    i && process.chdir(r);
  }
  return s && (s = io.resolve(o ? e.options.cwd : "", s)), s;
}
function bd(e) {
  return so(e) || so(e, !0);
}
var Ed = bd, or = {};
const gn = /([()\][%!^"`<>&|;, *?])/g;
function Td(e) {
  return e = e.replace(gn, "^$1"), e;
}
function $d(e, t) {
  return e = `${e}`, e = e.replace(/(?=(\\+?)?)\1"/g, '$1$1\\"'), e = e.replace(/(?=(\\+?)?)\1$/, "$1$1"), e = `"${e}"`, e = e.replace(gn, "^$1"), t && (e = e.replace(gn, "^$1")), e;
}
or.command = Td;
or.argument = $d;
var vd = /^#!(.*)/;
const Od = vd;
var Dd = (e = "") => {
  const t = e.match(Od);
  if (!t)
    return null;
  const [n, r] = t[0].replace(/#! ?/, "").split(" "), o = n.split("/").pop();
  return o === "env" ? r : r ? `${o} ${r}` : o;
};
const cn = dt, Id = Dd;
function xd(e) {
  const n = Buffer.alloc(150);
  let r;
  try {
    r = cn.openSync(e, "r"), cn.readSync(r, n, 0, 150, 0), cn.closeSync(r);
  } catch {
  }
  return Id(n.toString());
}
var Rd = xd;
const Pd = T, ao = Ed, co = or, Ad = Rd, Cd = process.platform === "win32", Fd = /\.(?:com|exe)$/i, Ld = /node_modules[\\/].bin[\\/][^\\/]+\.cmd$/i;
function Md(e) {
  e.file = ao(e);
  const t = e.file && Ad(e.file);
  return t ? (e.args.unshift(e.file), e.command = t, ao(e)) : e.file;
}
function kd(e) {
  if (!Cd)
    return e;
  const t = Md(e), n = !Fd.test(t);
  if (e.options.forceShell || n) {
    const r = Ld.test(t);
    e.command = Pd.normalize(e.command), e.command = co.command(e.command), e.args = e.args.map((i) => co.argument(i, r));
    const o = [e.command].concat(e.args).join(" ");
    e.args = ["/d", "/s", "/c", `"${o}"`], e.command = process.env.comspec || "cmd.exe", e.options.windowsVerbatimArguments = !0;
  }
  return e;
}
function _d(e, t, n) {
  t && !Array.isArray(t) && (n = t, t = null), t = t ? t.slice(0) : [], n = Object.assign({}, n);
  const r = {
    command: e,
    args: t,
    options: n,
    file: void 0,
    original: {
      command: e,
      args: t
    }
  };
  return n.shell ? r : kd(r);
}
var jd = _d;
const ir = process.platform === "win32";
function sr(e, t) {
  return Object.assign(new Error(`${t} ${e.command} ENOENT`), {
    code: "ENOENT",
    errno: "ENOENT",
    syscall: `${t} ${e.command}`,
    path: e.command,
    spawnargs: e.args
  });
}
function Bd(e, t) {
  if (!ir)
    return;
  const n = e.emit;
  e.emit = function(r, o) {
    if (r === "exit") {
      const i = rs(o, t);
      if (i)
        return n.call(e, "error", i);
    }
    return n.apply(e, arguments);
  };
}
function rs(e, t) {
  return ir && e === 1 && !t.file ? sr(t.original, "spawn") : null;
}
function Ud(e, t) {
  return ir && e === 1 && !t.file ? sr(t.original, "spawnSync") : null;
}
var Nd = {
  hookChildProcess: Bd,
  verifyENOENT: rs,
  verifyENOENTSync: Ud,
  notFoundError: sr
};
const os = $c, ar = jd, cr = Nd;
function is(e, t, n) {
  const r = ar(e, t, n), o = os.spawn(r.command, r.args, r.options);
  return cr.hookChildProcess(o, r), o;
}
function Gd(e, t, n) {
  const r = ar(e, t, n), o = os.spawnSync(r.command, r.args, r.options);
  return o.error = o.error || cr.verifyENOENTSync(o.status, r), o;
}
Ke.exports = is;
Ke.exports.spawn = is;
Ke.exports.sync = Gd;
Ke.exports._parse = ar;
Ke.exports._enoent = cr;
var Wd = Ke.exports;
const zd = /* @__PURE__ */ Zo(Wd);
function ss(e = {}) {
  const {
    env: t = process.env,
    platform: n = process.platform
  } = e;
  return n !== "win32" ? "PATH" : Object.keys(t).reverse().find((r) => r.toUpperCase() === "PATH") || "Path";
}
Ho(mc);
function lr(e) {
  return e instanceof URL ? kn(e) : e;
}
function Vd(e) {
  return {
    *[Symbol.iterator]() {
      let t = A.resolve(lr(e)), n;
      for (; n !== t; )
        yield t, n = t, t = A.resolve(t, "..");
    }
  };
}
const Hd = ({
  cwd: e = G.cwd(),
  path: t = G.env[ss()],
  preferLocal: n = !0,
  execPath: r = G.execPath,
  addExecPath: o = !0
} = {}) => {
  const i = A.resolve(lr(e)), s = [], a = t.split(A.delimiter);
  return n && qd(s, a, i), o && Yd(s, a, r, i), t === "" || t === A.delimiter ? `${s.join(A.delimiter)}${t}` : [...s, t].join(A.delimiter);
}, qd = (e, t, n) => {
  for (const r of Vd(n)) {
    const o = A.join(r, "node_modules/.bin");
    t.includes(o) || e.push(o);
  }
}, Yd = (e, t, n, r) => {
  const o = A.resolve(r, lr(n), "..");
  t.includes(o) || e.push(o);
}, Jd = ({ env: e = G.env, ...t } = {}) => {
  e = { ...e };
  const n = ss({ env: e });
  return t.path = e[n], e[n] = Hd(t), e;
}, Kd = (e, t, n) => {
  const r = n ? En : bn, o = e instanceof pt ? {} : { cause: e };
  return new r(t, o);
};
class pt extends Error {
}
const as = (e, t) => {
  Object.defineProperty(e.prototype, "name", {
    value: t,
    writable: !0,
    enumerable: !1,
    configurable: !0
  }), Object.defineProperty(e.prototype, cs, {
    value: !0,
    writable: !1,
    enumerable: !1,
    configurable: !1
  });
}, Xd = (e) => Sn(e) && cs in e, cs = Symbol("isExecaError"), Sn = (e) => Object.prototype.toString.call(e) === "[object Error]";
class bn extends Error {
}
as(bn, bn.name);
class En extends Error {
}
as(En, En.name);
const Qd = () => {
  const e = us - ls + 1;
  return Array.from({ length: e }, Zd);
}, Zd = (e, t) => ({
  name: `SIGRT${t + 1}`,
  number: ls + t,
  action: "terminate",
  description: "Application-specific signal (realtime)",
  standard: "posix"
}), ls = 34, us = 64, eh = [
  {
    name: "SIGHUP",
    number: 1,
    action: "terminate",
    description: "Terminal closed",
    standard: "posix"
  },
  {
    name: "SIGINT",
    number: 2,
    action: "terminate",
    description: "User interruption with CTRL-C",
    standard: "ansi"
  },
  {
    name: "SIGQUIT",
    number: 3,
    action: "core",
    description: "User interruption with CTRL-\\",
    standard: "posix"
  },
  {
    name: "SIGILL",
    number: 4,
    action: "core",
    description: "Invalid machine instruction",
    standard: "ansi"
  },
  {
    name: "SIGTRAP",
    number: 5,
    action: "core",
    description: "Debugger breakpoint",
    standard: "posix"
  },
  {
    name: "SIGABRT",
    number: 6,
    action: "core",
    description: "Aborted",
    standard: "ansi"
  },
  {
    name: "SIGIOT",
    number: 6,
    action: "core",
    description: "Aborted",
    standard: "bsd"
  },
  {
    name: "SIGBUS",
    number: 7,
    action: "core",
    description: "Bus error due to misaligned, non-existing address or paging error",
    standard: "bsd"
  },
  {
    name: "SIGEMT",
    number: 7,
    action: "terminate",
    description: "Command should be emulated but is not implemented",
    standard: "other"
  },
  {
    name: "SIGFPE",
    number: 8,
    action: "core",
    description: "Floating point arithmetic error",
    standard: "ansi"
  },
  {
    name: "SIGKILL",
    number: 9,
    action: "terminate",
    description: "Forced termination",
    standard: "posix",
    forced: !0
  },
  {
    name: "SIGUSR1",
    number: 10,
    action: "terminate",
    description: "Application-specific signal",
    standard: "posix"
  },
  {
    name: "SIGSEGV",
    number: 11,
    action: "core",
    description: "Segmentation fault",
    standard: "ansi"
  },
  {
    name: "SIGUSR2",
    number: 12,
    action: "terminate",
    description: "Application-specific signal",
    standard: "posix"
  },
  {
    name: "SIGPIPE",
    number: 13,
    action: "terminate",
    description: "Broken pipe or socket",
    standard: "posix"
  },
  {
    name: "SIGALRM",
    number: 14,
    action: "terminate",
    description: "Timeout or timer",
    standard: "posix"
  },
  {
    name: "SIGTERM",
    number: 15,
    action: "terminate",
    description: "Termination",
    standard: "ansi"
  },
  {
    name: "SIGSTKFLT",
    number: 16,
    action: "terminate",
    description: "Stack is empty or overflowed",
    standard: "other"
  },
  {
    name: "SIGCHLD",
    number: 17,
    action: "ignore",
    description: "Child process terminated, paused or unpaused",
    standard: "posix"
  },
  {
    name: "SIGCLD",
    number: 17,
    action: "ignore",
    description: "Child process terminated, paused or unpaused",
    standard: "other"
  },
  {
    name: "SIGCONT",
    number: 18,
    action: "unpause",
    description: "Unpaused",
    standard: "posix",
    forced: !0
  },
  {
    name: "SIGSTOP",
    number: 19,
    action: "pause",
    description: "Paused",
    standard: "posix",
    forced: !0
  },
  {
    name: "SIGTSTP",
    number: 20,
    action: "pause",
    description: 'Paused using CTRL-Z or "suspend"',
    standard: "posix"
  },
  {
    name: "SIGTTIN",
    number: 21,
    action: "pause",
    description: "Background process cannot read terminal input",
    standard: "posix"
  },
  {
    name: "SIGBREAK",
    number: 21,
    action: "terminate",
    description: "User interruption with CTRL-BREAK",
    standard: "other"
  },
  {
    name: "SIGTTOU",
    number: 22,
    action: "pause",
    description: "Background process cannot write to terminal output",
    standard: "posix"
  },
  {
    name: "SIGURG",
    number: 23,
    action: "ignore",
    description: "Socket received out-of-band data",
    standard: "bsd"
  },
  {
    name: "SIGXCPU",
    number: 24,
    action: "core",
    description: "Process timed out",
    standard: "bsd"
  },
  {
    name: "SIGXFSZ",
    number: 25,
    action: "core",
    description: "File too big",
    standard: "bsd"
  },
  {
    name: "SIGVTALRM",
    number: 26,
    action: "terminate",
    description: "Timeout or timer",
    standard: "bsd"
  },
  {
    name: "SIGPROF",
    number: 27,
    action: "terminate",
    description: "Timeout or timer",
    standard: "bsd"
  },
  {
    name: "SIGWINCH",
    number: 28,
    action: "ignore",
    description: "Terminal window size changed",
    standard: "bsd"
  },
  {
    name: "SIGIO",
    number: 29,
    action: "terminate",
    description: "I/O is available",
    standard: "other"
  },
  {
    name: "SIGPOLL",
    number: 29,
    action: "terminate",
    description: "Watched event",
    standard: "other"
  },
  {
    name: "SIGINFO",
    number: 29,
    action: "ignore",
    description: "Request for process information",
    standard: "other"
  },
  {
    name: "SIGPWR",
    number: 30,
    action: "terminate",
    description: "Device running out of power",
    standard: "systemv"
  },
  {
    name: "SIGSYS",
    number: 31,
    action: "core",
    description: "Invalid system call",
    standard: "other"
  },
  {
    name: "SIGUNUSED",
    number: 31,
    action: "terminate",
    description: "Invalid system call",
    standard: "other"
  }
], fs = () => {
  const e = Qd();
  return [...eh, ...e].map(th);
}, th = ({
  name: e,
  number: t,
  description: n,
  action: r,
  forced: o = !1,
  standard: i
}) => {
  const {
    signals: { [e]: s }
  } = $e, a = s !== void 0;
  return { name: e, number: a ? s : t, description: n, supported: a, action: r, forced: o, standard: i };
}, nh = () => {
  const e = fs();
  return Object.fromEntries(e.map(rh));
}, rh = ({
  name: e,
  number: t,
  description: n,
  supported: r,
  action: o,
  forced: i,
  standard: s
}) => [e, { name: e, number: t, description: n, supported: r, action: o, forced: i, standard: s }], oh = nh(), ih = () => {
  const e = fs(), t = us + 1, n = Array.from(
    { length: t },
    (r, o) => sh(o, e)
  );
  return Object.assign({}, ...n);
}, sh = (e, t) => {
  const n = ah(e, t);
  if (n === void 0)
    return {};
  const { name: r, description: o, supported: i, action: s, forced: a, standard: c } = n;
  return {
    [e]: {
      name: r,
      number: e,
      description: o,
      supported: i,
      action: s,
      forced: a,
      standard: c
    }
  };
}, ah = (e, t) => {
  const n = t.find(({ name: r }) => $e.signals[r] === e);
  return n !== void 0 ? n : t.find((r) => r.number === e);
};
ih();
const ch = (e) => {
  const t = "option `killSignal`";
  if (e === 0)
    throw new TypeError(`Invalid ${t}: 0 cannot be used.`);
  return ds(e, t);
}, lh = (e) => e === 0 ? e : ds(e, "`subprocess.kill()`'s argument"), ds = (e, t) => {
  if (Number.isInteger(e))
    return uh(e, t);
  if (typeof e == "string")
    return dh(e, t);
  throw new TypeError(`Invalid ${t} ${String(e)}: it must be a string or an integer.
${ur()}`);
}, uh = (e, t) => {
  if (lo.has(e))
    return lo.get(e);
  throw new TypeError(`Invalid ${t} ${e}: this signal integer does not exist.
${ur()}`);
}, fh = () => new Map(Object.entries($e.signals).reverse().map(([e, t]) => [t, e])), lo = fh(), dh = (e, t) => {
  if (e in $e.signals)
    return e;
  throw e.toUpperCase() in $e.signals ? new TypeError(`Invalid ${t} '${e}': please rename it to '${e.toUpperCase()}'.`) : new TypeError(`Invalid ${t} '${e}': this signal name does not exist.
${ur()}`);
}, ur = () => `Available signal names: ${hh()}.
Available signal numbers: ${mh()}.`, hh = () => Object.keys($e.signals).sort().map((e) => `'${e}'`).join(", "), mh = () => [...new Set(Object.values($e.signals).sort((e, t) => e - t))].join(", "), hs = (e) => oh[e].description, ph = (e) => {
  if (e === !1)
    return e;
  if (e === !0)
    return yh;
  if (!Number.isFinite(e) || e < 0)
    throw new TypeError(`Expected the \`forceKillAfterDelay\` option to be a non-negative integer, got \`${e}\` (${typeof e})`);
  return e;
}, yh = 1e3 * 5, wh = ({ kill: e, options: { forceKillAfterDelay: t, killSignal: n }, onInternalError: r, context: o, controller: i }, s, a) => {
  const { signal: c, error: u } = gh(s, a, n);
  Sh(u, r);
  const l = e(c);
  return bh({
    kill: e,
    signal: c,
    forceKillAfterDelay: t,
    killSignal: n,
    killResult: l,
    context: o,
    controller: i
  }), l;
}, gh = (e, t, n) => {
  const [r = n, o] = Sn(e) ? [void 0, e] : [e, t];
  if (typeof r != "string" && !Number.isInteger(r))
    throw new TypeError(`The first argument must be an error instance or a signal name string/integer: ${String(r)}`);
  if (o !== void 0 && !Sn(o))
    throw new TypeError(`The second argument is optional. If specified, it must be an error instance: ${o}`);
  return { signal: lh(r), error: o };
}, Sh = (e, t) => {
  e !== void 0 && t.reject(e);
}, bh = async ({ kill: e, signal: t, forceKillAfterDelay: n, killSignal: r, killResult: o, context: i, controller: s }) => {
  t === r && o && ms({
    kill: e,
    forceKillAfterDelay: n,
    context: i,
    controllerSignal: s.signal
  });
}, ms = async ({ kill: e, forceKillAfterDelay: t, context: n, controllerSignal: r }) => {
  if (t !== !1)
    try {
      await Jo(t, void 0, { signal: r }), e("SIGKILL") && (n.isForcefullyTerminated ?? (n.isForcefullyTerminated = !0));
    } catch {
    }
}, ps = async (e, t) => {
  e.aborted || await Y(e, "abort", { signal: t });
}, Eh = ({ cancelSignal: e }) => {
  if (e !== void 0 && Object.prototype.toString.call(e) !== "[object AbortSignal]")
    throw new Error(`The \`cancelSignal\` option must be an AbortSignal: ${String(e)}`);
}, Th = ({ subprocess: e, cancelSignal: t, gracefulCancel: n, context: r, controller: o }) => t === void 0 || n ? [] : [$h(e, t, r, o)], $h = async (e, t, n, { signal: r }) => {
  throw await ps(t, r), n.terminationReason ?? (n.terminationReason = "cancel"), e.kill(), t.reason;
}, fr = ({ methodName: e, isSubprocess: t, ipc: n, isConnected: r }) => {
  vh(e, t, n), ys(e, t, r);
}, vh = (e, t, n) => {
  if (!n)
    throw new Error(`${ee(e, t)} can only be used if the \`ipc\` option is \`true\`.`);
}, ys = (e, t, n) => {
  if (!n)
    throw new Error(`${ee(e, t)} cannot be used: the ${ge(t)} has already exited or disconnected.`);
}, Oh = (e) => {
  throw new Error(`${ee("getOneMessage", e)} could not complete: the ${ge(e)} exited or disconnected.`);
}, Dh = (e) => {
  throw new Error(`${ee("sendMessage", e)} failed: the ${ge(e)} is sending a message too, instead of listening to incoming messages.
This can be fixed by both sending a message and listening to incoming messages at the same time:

const [receivedMessage] = await Promise.all([
	${ee("getOneMessage", e)},
	${ee("sendMessage", e, "message, {strict: true}")},
]);`);
}, ws = (e, t) => new Error(`${ee("sendMessage", t)} failed when sending an acknowledgment response to the ${ge(t)}.`, { cause: e }), Ih = (e) => {
  throw new Error(`${ee("sendMessage", e)} failed: the ${ge(e)} is not listening to incoming messages.`);
}, xh = (e) => {
  throw new Error(`${ee("sendMessage", e)} failed: the ${ge(e)} exited without listening to incoming messages.`);
}, Rh = () => new Error(`\`cancelSignal\` aborted: the ${ge(!0)} disconnected.`), Ph = () => {
  throw new Error("`getCancelSignal()` cannot be used without setting the `cancelSignal` subprocess option.");
}, Ah = ({ error: e, methodName: t, isSubprocess: n }) => {
  if (e.code === "EPIPE")
    throw new Error(`${ee(t, n)} cannot be used: the ${ge(n)} is disconnecting.`, { cause: e });
}, Ch = ({ error: e, methodName: t, isSubprocess: n, message: r }) => {
  if (Fh(e))
    throw new Error(`${ee(t, n)}'s argument type is invalid: the message cannot be serialized: ${String(r)}.`, { cause: e });
}, Fh = ({ code: e, message: t }) => Lh.has(e) || Mh.some((n) => t.includes(n)), Lh = /* @__PURE__ */ new Set([
  // Message is `undefined`
  "ERR_MISSING_ARGS",
  // Message is a function, a bigint, a symbol
  "ERR_INVALID_ARG_TYPE"
]), Mh = [
  // Message is a promise or a proxy, with `serialization: 'advanced'`
  "could not be cloned",
  // Message has cycles, with `serialization: 'json'`
  "circular structure",
  // Message has cycles inside toJSON(), with `serialization: 'json'`
  "call stack size exceeded"
], ee = (e, t, n = "") => e === "cancelSignal" ? "`cancelSignal`'s `controller.abort()`" : `${kh(t)}${e}(${n})`, kh = (e) => e ? "" : "subprocess.", ge = (e) => e ? "parent process" : "subprocess", dr = (e) => {
  e.connected && e.disconnect();
}, yt = () => {
  const e = {}, t = new Promise((n, r) => {
    Object.assign(e, { resolve: n, reject: r });
  });
  return Object.assign(t, e);
}, gs = (e, t = "stdin") => {
  const { options: r, fileDescriptors: o } = Oe.get(e), i = Ss(o, t, !0), s = e.stdio[i];
  if (s === null)
    throw new TypeError(bs(i, t, r, !0));
  return s;
}, hr = (e, t = "stdout") => {
  const { options: r, fileDescriptors: o } = Oe.get(e), i = Ss(o, t, !1), s = i === "all" ? e.all : e.stdio[i];
  if (s == null)
    throw new TypeError(bs(i, t, r, !1));
  return s;
}, Oe = /* @__PURE__ */ new WeakMap(), Ss = (e, t, n) => {
  const r = _h(t, n);
  return jh(r, t, n, e), r;
}, _h = (e, t) => {
  const n = Wi(e);
  if (n !== void 0)
    return n;
  const { validOptions: r, defaultValue: o } = t ? { validOptions: '"stdin"', defaultValue: "stdin" } : { validOptions: '"stdout", "stderr", "all"', defaultValue: "stdout" };
  throw new TypeError(`"${tt(t)}" must not be "${e}".
It must be ${r} or "fd3", "fd4" (and so on).
It is optional and defaults to "${o}".`);
}, jh = (e, t, n, r) => {
  const o = r[Es(e)];
  if (o === void 0)
    throw new TypeError(`"${tt(n)}" must not be ${t}. That file descriptor does not exist.
Please set the "stdio" option to ensure that file descriptor exists.`);
  if (o.direction === "input" && !n)
    throw new TypeError(`"${tt(n)}" must not be ${t}. It must be a readable stream, not writable.`);
  if (o.direction !== "input" && n)
    throw new TypeError(`"${tt(n)}" must not be ${t}. It must be a writable stream, not readable.`);
}, bs = (e, t, n, r) => {
  if (e === "all" && !n.all)
    return `The "all" option must be true to use "from: 'all'".`;
  const { optionName: o, optionValue: i } = Bh(e, n);
  return `The "${o}: ${Tn(i)}" option is incompatible with using "${tt(r)}: ${Tn(t)}".
Please set this option with "pipe" instead.`;
}, Bh = (e, { stdin: t, stdout: n, stderr: r, stdio: o }) => {
  const i = Es(e);
  return i === 0 && t !== void 0 ? { optionName: "stdin", optionValue: t } : i === 1 && n !== void 0 ? { optionName: "stdout", optionValue: n } : i === 2 && r !== void 0 ? { optionName: "stderr", optionValue: r } : { optionName: `stdio[${i}]`, optionValue: o[i] };
}, Es = (e) => e === "all" ? 1 : e, tt = (e) => e ? "to" : "from", Tn = (e) => typeof e == "string" ? `'${e}'` : typeof e == "number" ? `${e}` : "Stream", Mt = (e, t, n) => {
  const r = e.getMaxListeners();
  r === 0 || r === Number.POSITIVE_INFINITY || (e.setMaxListeners(r + t), Xo(n, () => {
    e.setMaxListeners(e.getMaxListeners() - t);
  }));
}, Ts = (e, t) => {
  t && $n(e);
}, $n = (e) => {
  e.refCounted();
}, $s = (e, t) => {
  t && vn(e);
}, vn = (e) => {
  e.unrefCounted();
}, Uh = (e, t) => {
  t && (vn(e), vn(e));
}, Nh = (e, t) => {
  t && ($n(e), $n(e));
}, Gh = async ({ anyProcess: e, channel: t, isSubprocess: n, ipcEmitter: r }, o) => {
  if (Jh(o) || am(o))
    return;
  xt.has(e) || xt.set(e, []);
  const i = xt.get(e);
  if (i.push(o), !(i.length > 1))
    for (; i.length > 0; ) {
      await em(e, r, o), await Ko.yield();
      const s = await Yh({
        wrappedMessage: i[0],
        anyProcess: e,
        channel: t,
        isSubprocess: n,
        ipcEmitter: r
      });
      i.shift(), r.emit("message", s), r.emit("message:done");
    }
}, Wh = async ({ anyProcess: e, channel: t, isSubprocess: n, ipcEmitter: r, boundOnMessage: o }) => {
  Rs();
  const i = xt.get(e);
  for (; (i == null ? void 0 : i.length) > 0; )
    await Y(r, "message:done");
  e.removeListener("message", o), Nh(t, n), r.connected = !1, r.emit("disconnect");
}, xt = /* @__PURE__ */ new WeakMap(), Yt = (e, t, n) => {
  if (Rt.has(e))
    return Rt.get(e);
  const r = new Dc();
  return r.connected = !0, Rt.set(e, r), zh({
    ipcEmitter: r,
    anyProcess: e,
    channel: t,
    isSubprocess: n
  }), r;
}, Rt = /* @__PURE__ */ new WeakMap(), zh = ({ ipcEmitter: e, anyProcess: t, channel: n, isSubprocess: r }) => {
  const o = Gh.bind(void 0, {
    anyProcess: t,
    channel: n,
    isSubprocess: r,
    ipcEmitter: e
  });
  t.on("message", o), t.once("disconnect", Wh.bind(void 0, {
    anyProcess: t,
    channel: n,
    isSubprocess: r,
    ipcEmitter: e,
    boundOnMessage: o
  })), Uh(n, r);
}, vs = (e) => {
  const t = Rt.get(e);
  return t === void 0 ? e.channel !== null : t.connected;
}, Vh = ({ anyProcess: e, channel: t, isSubprocess: n, message: r, strict: o }) => {
  if (!o)
    return r;
  const i = Yt(e, t, n), s = mr(e, i);
  return {
    id: Hh++,
    type: Jt,
    message: r,
    hasListeners: s
  };
};
let Hh = 0n;
const qh = (e, t) => {
  if (!((t == null ? void 0 : t.type) !== Jt || t.hasListeners))
    for (const { id: n } of e)
      n !== void 0 && kt[n].resolve({ isDeadlock: !0, hasListeners: !1 });
}, Yh = async ({ wrappedMessage: e, anyProcess: t, channel: n, isSubprocess: r, ipcEmitter: o }) => {
  if ((e == null ? void 0 : e.type) !== Jt || !t.connected)
    return e;
  const { id: i, message: s } = e, a = { id: i, type: Os, message: mr(t, o) };
  try {
    await Ds({
      anyProcess: t,
      channel: n,
      isSubprocess: r,
      ipc: !0
    }, a);
  } catch (c) {
    o.emit("strict:error", c);
  }
  return s;
}, Jh = (e) => {
  var r;
  if ((e == null ? void 0 : e.type) !== Os)
    return !1;
  const { id: t, message: n } = e;
  return (r = kt[t]) == null || r.resolve({ isDeadlock: !1, hasListeners: n }), !0;
}, Kh = async (e, t, n) => {
  if ((e == null ? void 0 : e.type) !== Jt)
    return;
  const r = yt();
  kt[e.id] = r;
  const o = new AbortController();
  try {
    const { isDeadlock: i, hasListeners: s } = await Promise.race([
      r,
      Xh(t, n, o)
    ]);
    i && Dh(n), s || Ih(n);
  } finally {
    o.abort(), delete kt[e.id];
  }
}, kt = {}, Xh = async (e, t, { signal: n }) => {
  Mt(e, 1, n), await Y(e, "disconnect", { signal: n }), xh(t);
}, Jt = "execa:ipc:request", Os = "execa:ipc:response", Qh = (e, t, n) => {
  nt.has(e) || nt.set(e, /* @__PURE__ */ new Set());
  const r = nt.get(e), o = yt(), i = n ? t.id : void 0, s = { onMessageSent: o, id: i };
  return r.add(s), { outgoingMessages: r, outgoingMessage: s };
}, Zh = ({ outgoingMessages: e, outgoingMessage: t }) => {
  e.delete(t), t.onMessageSent.resolve();
}, em = async (e, t, n) => {
  var r;
  for (; !mr(e, t) && ((r = nt.get(e)) == null ? void 0 : r.size) > 0; ) {
    const o = [...nt.get(e)];
    qh(o, n), await Promise.all(o.map(({ onMessageSent: i }) => i));
  }
}, nt = /* @__PURE__ */ new WeakMap(), mr = (e, t) => t.listenerCount("message") > tm(e), tm = (e) => Oe.has(e) && !ct(Oe.get(e).options.buffer, "ipc") ? 1 : 0, Ds = ({ anyProcess: e, channel: t, isSubprocess: n, ipc: r }, o, { strict: i = !1 } = {}) => {
  const s = "sendMessage";
  return fr({
    methodName: s,
    isSubprocess: n,
    ipc: r,
    isConnected: e.connected
  }), nm({
    anyProcess: e,
    channel: t,
    methodName: s,
    isSubprocess: n,
    message: o,
    strict: i
  });
}, nm = async ({ anyProcess: e, channel: t, methodName: n, isSubprocess: r, message: o, strict: i }) => {
  const s = Vh({
    anyProcess: e,
    channel: t,
    isSubprocess: r,
    message: o,
    strict: i
  }), a = Qh(e, s, i);
  try {
    await Is({
      anyProcess: e,
      methodName: n,
      isSubprocess: r,
      wrappedMessage: s,
      message: o
    });
  } catch (c) {
    throw dr(e), c;
  } finally {
    Zh(a);
  }
}, Is = async ({ anyProcess: e, methodName: t, isSubprocess: n, wrappedMessage: r, message: o }) => {
  const i = rm(e);
  try {
    await Promise.all([
      Kh(r, e, n),
      i(r)
    ]);
  } catch (s) {
    throw Ah({ error: s, methodName: t, isSubprocess: n }), Ch({
      error: s,
      methodName: t,
      isSubprocess: n,
      message: o
    }), s;
  }
}, rm = (e) => {
  if (ln.has(e))
    return ln.get(e);
  const t = Ho(e.send.bind(e));
  return ln.set(e, t), t;
}, ln = /* @__PURE__ */ new WeakMap(), om = (e, t) => {
  const n = "cancelSignal";
  return ys(n, !1, e.connected), Is({
    anyProcess: e,
    methodName: n,
    isSubprocess: !1,
    wrappedMessage: { type: xs, message: t },
    message: t
  });
}, im = async ({ anyProcess: e, channel: t, isSubprocess: n, ipc: r }) => (await sm({
  anyProcess: e,
  channel: t,
  isSubprocess: n,
  ipc: r
}), pr.signal), sm = async ({ anyProcess: e, channel: t, isSubprocess: n, ipc: r }) => {
  if (!uo) {
    if (uo = !0, !r) {
      Ph();
      return;
    }
    if (t === null) {
      Rs();
      return;
    }
    Yt(e, t, n), await Ko.yield();
  }
};
let uo = !1;
const am = (e) => (e == null ? void 0 : e.type) !== xs ? !1 : (pr.abort(e.message), !0), xs = "execa:ipc:cancel", Rs = () => {
  pr.abort(Rh());
}, pr = new AbortController(), cm = ({ gracefulCancel: e, cancelSignal: t, ipc: n, serialization: r }) => {
  if (e) {
    if (t === void 0)
      throw new Error("The `cancelSignal` option must be defined when setting the `gracefulCancel` option.");
    if (!n)
      throw new Error("The `ipc` option cannot be false when setting the `gracefulCancel` option.");
    if (r === "json")
      throw new Error("The `serialization` option cannot be 'json' when setting the `gracefulCancel` option.");
  }
}, lm = ({
  subprocess: e,
  cancelSignal: t,
  gracefulCancel: n,
  forceKillAfterDelay: r,
  context: o,
  controller: i
}) => n ? [um({
  subprocess: e,
  cancelSignal: t,
  forceKillAfterDelay: r,
  context: o,
  controller: i
})] : [], um = async ({ subprocess: e, cancelSignal: t, forceKillAfterDelay: n, context: r, controller: { signal: o } }) => {
  await ps(t, o);
  const i = fm(t);
  throw await om(e, i), ms({
    kill: e.kill,
    forceKillAfterDelay: n,
    context: r,
    controllerSignal: o
  }), r.terminationReason ?? (r.terminationReason = "gracefulCancel"), t.reason;
}, fm = ({ reason: e }) => {
  if (!(e instanceof DOMException))
    return e;
  const t = new Error(e.message);
  return Object.defineProperty(t, "stack", {
    value: e.stack,
    enumerable: !1,
    configurable: !0,
    writable: !0
  }), t;
}, dm = ({ timeout: e }) => {
  if (e !== void 0 && (!Number.isFinite(e) || e < 0))
    throw new TypeError(`Expected the \`timeout\` option to be a non-negative integer, got \`${e}\` (${typeof e})`);
}, hm = (e, t, n, r) => t === 0 || t === void 0 ? [] : [mm(e, t, n, r)], mm = async (e, t, n, { signal: r }) => {
  throw await Jo(t, void 0, { signal: r }), n.terminationReason ?? (n.terminationReason = "timeout"), e.kill(), new pt();
}, pm = ({ options: e }) => {
  if (e.node === !1)
    throw new TypeError('The "node" option cannot be false with `execaNode()`.');
  return { options: { ...e, node: !0 } };
}, ym = (e, t, {
  node: n = !1,
  nodePath: r = Ec,
  nodeOptions: o = Tc.filter((c) => !c.startsWith("--inspect")),
  cwd: i,
  execPath: s,
  ...a
}) => {
  if (s !== void 0)
    throw new TypeError('The "execPath" option has been removed. Please use the "nodePath" option instead.');
  const c = Yn(r, 'The "nodePath" option'), u = A.resolve(i, c), l = {
    ...a,
    nodePath: u,
    node: n,
    cwd: i
  };
  if (!n)
    return [e, t, l];
  if (A.basename(e, ".exe") === "node")
    throw new TypeError('When the "node" option is true, the first argument does not need to be "node".');
  return [
    u,
    [...o, e, ...t],
    { ipc: !0, ...l, shell: !1 }
  ];
}, wm = ({ ipcInput: e, ipc: t, serialization: n }) => {
  if (e !== void 0) {
    if (!t)
      throw new Error("The `ipcInput` option cannot be set unless the `ipc` option is `true`.");
    bm[n](e);
  }
}, gm = (e) => {
  try {
    xc(e);
  } catch (t) {
    throw new Error("The `ipcInput` option is not serializable with a structured clone.", { cause: t });
  }
}, Sm = (e) => {
  try {
    JSON.stringify(e);
  } catch (t) {
    throw new Error("The `ipcInput` option is not serializable with JSON.", { cause: t });
  }
}, bm = {
  advanced: gm,
  json: Sm
}, Em = async (e, t) => {
  t !== void 0 && await e.sendMessage(t);
}, Tm = ({ encoding: e }) => {
  if (On.has(e))
    return;
  const t = vm(e);
  if (t !== void 0)
    throw new TypeError(`Invalid option \`encoding: ${$t(e)}\`.
Please rename it to ${$t(t)}.`);
  const n = [...On].map((r) => $t(r)).join(", ");
  throw new TypeError(`Invalid option \`encoding: ${$t(e)}\`.
Please rename it to one of: ${n}.`);
}, $m = /* @__PURE__ */ new Set(["utf8", "utf16le"]), xe = /* @__PURE__ */ new Set(["buffer", "hex", "base64", "base64url", "latin1", "ascii"]), On = /* @__PURE__ */ new Set([...$m, ...xe]), vm = (e) => {
  if (e === null)
    return "buffer";
  if (typeof e != "string")
    return;
  const t = e.toLowerCase();
  if (t in fo)
    return fo[t];
  if (On.has(t))
    return t;
}, fo = {
  // eslint-disable-next-line unicorn/text-encoding-identifier-case
  "utf-8": "utf8",
  "utf-16le": "utf16le",
  "ucs-2": "utf16le",
  ucs2: "utf16le",
  binary: "latin1"
}, $t = (e) => typeof e == "string" ? `"${e}"` : String(e), Om = (e = Ps()) => {
  const t = Yn(e, 'The "cwd" option');
  return A.resolve(t);
}, Ps = () => {
  try {
    return G.cwd();
  } catch (e) {
    throw e.message = `The current directory does not exist.
${e.message}`, e;
  }
}, Dm = (e, t) => {
  if (t === Ps())
    return e;
  let n;
  try {
    n = Rc(t);
  } catch (r) {
    return `The "cwd" option is invalid: ${t}.
${r.message}
${e}`;
  }
  return n.isDirectory() ? e : `The "cwd" option is not a directory: ${t}.
${e}`;
}, As = (e, t, n) => {
  n.cwd = Om(n.cwd);
  const [r, o, i] = ym(e, t, n), { command: s, args: a, options: c } = zd._parse(r, o, i), u = gf(c), l = Im(u);
  return dm(l), Tm(l), wm(l), Eh(l), cm(l), l.shell = Mi(l.shell), l.env = xm(l), l.killSignal = ch(l.killSignal), l.forceKillAfterDelay = ph(l.forceKillAfterDelay), l.lines = l.lines.map((f, d) => f && !xe.has(l.encoding) && l.buffer[d]), G.platform === "win32" && A.basename(s, ".exe") === "cmd" && a.unshift("/q"), { file: s, commandArguments: a, options: l };
}, Im = ({
  extendEnv: e = !0,
  preferLocal: t = !1,
  cwd: n,
  localDir: r = n,
  encoding: o = "utf8",
  reject: i = !0,
  cleanup: s = !0,
  all: a = !1,
  windowsHide: c = !0,
  killSignal: u = "SIGTERM",
  forceKillAfterDelay: l = !0,
  gracefulCancel: f = !1,
  ipcInput: d,
  ipc: h = d !== void 0 || f,
  serialization: m = "advanced",
  ...y
}) => ({
  ...y,
  extendEnv: e,
  preferLocal: t,
  cwd: n,
  localDirectory: r,
  encoding: o,
  reject: i,
  cleanup: s,
  all: a,
  windowsHide: c,
  killSignal: u,
  forceKillAfterDelay: l,
  gracefulCancel: f,
  ipcInput: d,
  ipc: h,
  serialization: m
}), xm = ({ env: e, extendEnv: t, preferLocal: n, node: r, localDirectory: o, nodePath: i }) => {
  const s = t ? { ...G.env, ...e } : e;
  return n || r ? Jd({
    env: s,
    cwd: o,
    execPath: i,
    preferLocal: n,
    addExecPath: r
  }) : s;
}, Cs = (e, t, n) => n.shell && t.length > 0 ? [[e, ...t].join(" "), [], n] : [e, t, n];
function yr(e) {
  if (typeof e == "string")
    return Rm(e);
  if (!(ArrayBuffer.isView(e) && e.BYTES_PER_ELEMENT === 1))
    throw new Error("Input must be a string or a Uint8Array");
  return Pm(e);
}
const Rm = (e) => e.at(-1) === Fs ? e.slice(0, e.at(-2) === Ls ? -2 : -1) : e, Pm = (e) => e.at(-1) === Am ? e.subarray(0, e.at(-2) === Cm ? -2 : -1) : e, Fs = `
`, Am = Fs.codePointAt(0), Ls = "\r", Cm = Ls.codePointAt(0);
function Re(e, { checkOpen: t = !0 } = {}) {
  return e !== null && typeof e == "object" && (e.writable || e.readable || !t || e.writable === void 0 && e.readable === void 0) && typeof e.pipe == "function";
}
function Ms(e, { checkOpen: t = !0 } = {}) {
  return Re(e, { checkOpen: t }) && (e.writable || !t) && typeof e.write == "function" && typeof e.end == "function" && typeof e.writable == "boolean" && typeof e.writableObjectMode == "boolean" && typeof e.destroy == "function" && typeof e.destroyed == "boolean";
}
function Kt(e, { checkOpen: t = !0 } = {}) {
  return Re(e, { checkOpen: t }) && (e.readable || !t) && typeof e.read == "function" && typeof e.readable == "boolean" && typeof e.readableObjectMode == "boolean" && typeof e.destroy == "function" && typeof e.destroyed == "boolean";
}
function ks(e, t) {
  return Ms(e, t) && Kt(e, t);
}
const Fm = Object.getPrototypeOf(
  Object.getPrototypeOf(
    /* istanbul ignore next */
    async function* () {
    }
  ).prototype
);
var re, lt, he, Z, Ve, _s, js;
class Lm {
  constructor(t, n) {
    C(this, Ve);
    C(this, re);
    C(this, lt);
    C(this, he, !1);
    C(this, Z);
    W(this, re, t), W(this, lt, n);
  }
  next() {
    const t = () => Xe(this, Ve, _s).call(this);
    return W(this, Z, p(this, Z) ? p(this, Z).then(t, t) : t()), p(this, Z);
  }
  return(t) {
    const n = () => Xe(this, Ve, js).call(this, t);
    return p(this, Z) ? p(this, Z).then(n, n) : n();
  }
}
re = new WeakMap(), lt = new WeakMap(), he = new WeakMap(), Z = new WeakMap(), Ve = new WeakSet(), _s = async function() {
  if (p(this, he))
    return {
      done: !0,
      value: void 0
    };
  let t;
  try {
    t = await p(this, re).read();
  } catch (n) {
    throw W(this, Z, void 0), W(this, he, !0), p(this, re).releaseLock(), n;
  }
  return t.done && (W(this, Z, void 0), W(this, he, !0), p(this, re).releaseLock()), t;
}, js = async function(t) {
  if (p(this, he))
    return {
      done: !0,
      value: t
    };
  if (W(this, he, !0), !p(this, lt)) {
    const n = p(this, re).cancel(t);
    return p(this, re).releaseLock(), await n, {
      done: !0,
      value: t
    };
  }
  return p(this, re).releaseLock(), {
    done: !0,
    value: t
  };
};
const wr = Symbol();
function Bs() {
  return this[wr].next();
}
Object.defineProperty(Bs, "name", { value: "next" });
function Us(e) {
  return this[wr].return(e);
}
Object.defineProperty(Us, "name", { value: "return" });
const Mm = Object.create(Fm, {
  next: {
    enumerable: !0,
    configurable: !0,
    writable: !0,
    value: Bs
  },
  return: {
    enumerable: !0,
    configurable: !0,
    writable: !0,
    value: Us
  }
});
function km({ preventCancel: e = !1 } = {}) {
  const t = this.getReader(), n = new Lm(
    t,
    e
  ), r = Object.create(Mm);
  return r[wr] = n, r;
}
const _m = (e) => {
  if (Kt(e, { checkOpen: !1 }) && gr.on !== void 0)
    return Bm(e);
  if (typeof (e == null ? void 0 : e[Symbol.asyncIterator]) == "function")
    return e;
  if (jm.call(e) === "[object ReadableStream]")
    return km.call(e);
  throw new TypeError("The first argument must be a Readable, a ReadableStream, or an async iterable.");
}, { toString: jm } = Object.prototype, Bm = async function* (e) {
  const t = new AbortController(), n = {};
  Um(e, t, n);
  try {
    for await (const [r] of gr.on(e, "data", { signal: t.signal }))
      yield r;
  } catch (r) {
    if (n.error !== void 0)
      throw n.error;
    if (!t.signal.aborted)
      throw r;
  } finally {
    e.destroy();
  }
}, Um = async (e, t, n) => {
  try {
    await gr.finished(e, {
      cleanup: !0,
      readable: !0,
      writable: !1,
      error: !1
    });
  } catch (r) {
    n.error = r;
  } finally {
    t.abort();
  }
}, gr = {}, Sr = async (e, { init: t, convertChunk: n, getSize: r, truncateChunk: o, addChunk: i, getFinalChunk: s, finalize: a }, { maxBuffer: c = Number.POSITIVE_INFINITY } = {}) => {
  const u = _m(e), l = t();
  l.length = 0;
  try {
    for await (const f of u) {
      const d = Gm(f), h = n[d](f, l);
      Ns({
        convertedChunk: h,
        state: l,
        getSize: r,
        truncateChunk: o,
        addChunk: i,
        maxBuffer: c
      });
    }
    return Nm({
      state: l,
      convertChunk: n,
      getSize: r,
      truncateChunk: o,
      addChunk: i,
      getFinalChunk: s,
      maxBuffer: c
    }), a(l);
  } catch (f) {
    const d = typeof f == "object" && f !== null ? f : new Error(f);
    throw d.bufferedData = a(l), d;
  }
}, Nm = ({ state: e, getSize: t, truncateChunk: n, addChunk: r, getFinalChunk: o, maxBuffer: i }) => {
  const s = o(e);
  s !== void 0 && Ns({
    convertedChunk: s,
    state: e,
    getSize: t,
    truncateChunk: n,
    addChunk: r,
    maxBuffer: i
  });
}, Ns = ({ convertedChunk: e, state: t, getSize: n, truncateChunk: r, addChunk: o, maxBuffer: i }) => {
  const s = n(e), a = t.length + s;
  if (a <= i) {
    ho(e, t, o, a);
    return;
  }
  const c = r(e, i - t.length);
  throw c !== void 0 && ho(c, t, o, i), new Xt();
}, ho = (e, t, n, r) => {
  t.contents = n(e, t, r), t.length = r;
}, Gm = (e) => {
  var r;
  const t = typeof e;
  if (t === "string")
    return "string";
  if (t !== "object" || e === null)
    return "others";
  if ((r = globalThis.Buffer) != null && r.isBuffer(e))
    return "buffer";
  const n = mo.call(e);
  return n === "[object ArrayBuffer]" ? "arrayBuffer" : n === "[object DataView]" ? "dataView" : Number.isInteger(e.byteLength) && Number.isInteger(e.byteOffset) && mo.call(e.buffer) === "[object ArrayBuffer]" ? "typedArray" : "others";
}, { toString: mo } = Object.prototype;
class Xt extends Error {
  constructor() {
    super("maxBuffer exceeded");
    Ae(this, "name", "MaxBufferError");
  }
}
const Se = (e) => e, Dn = () => {
}, Gs = ({ contents: e }) => e, Ws = (e) => {
  throw new Error(`Streams in object mode are not supported: ${String(e)}`);
}, zs = (e) => e.length;
async function Wm(e, t) {
  return Sr(e, qm, t);
}
const zm = () => ({ contents: [] }), Vm = () => 1, Hm = (e, { contents: t }) => (t.push(e), t), qm = {
  init: zm,
  convertChunk: {
    string: Se,
    buffer: Se,
    arrayBuffer: Se,
    dataView: Se,
    typedArray: Se,
    others: Se
  },
  getSize: Vm,
  truncateChunk: Dn,
  addChunk: Hm,
  getFinalChunk: Dn,
  finalize: Gs
};
async function Ym(e, t) {
  return Sr(e, rp, t);
}
const Jm = () => ({ contents: new ArrayBuffer(0) }), Km = (e) => Xm.encode(e), Xm = new TextEncoder(), po = (e) => new Uint8Array(e), yo = (e) => new Uint8Array(e.buffer, e.byteOffset, e.byteLength), Qm = (e, t) => e.slice(0, t), Zm = (e, { contents: t, length: n }, r) => {
  const o = Hs() ? tp(t, r) : ep(t, r);
  return new Uint8Array(o).set(e, n), o;
}, ep = (e, t) => {
  if (t <= e.byteLength)
    return e;
  const n = new ArrayBuffer(Vs(t));
  return new Uint8Array(n).set(new Uint8Array(e), 0), n;
}, tp = (e, t) => {
  if (t <= e.maxByteLength)
    return e.resize(t), e;
  const n = new ArrayBuffer(t, { maxByteLength: Vs(t) });
  return new Uint8Array(n).set(new Uint8Array(e), 0), n;
}, Vs = (e) => wo ** Math.ceil(Math.log(e) / Math.log(wo)), wo = 2, np = ({ contents: e, length: t }) => Hs() ? e : e.slice(0, t), Hs = () => "resize" in ArrayBuffer.prototype, rp = {
  init: Jm,
  convertChunk: {
    string: Km,
    buffer: po,
    arrayBuffer: po,
    dataView: yo,
    typedArray: yo,
    others: Ws
  },
  getSize: zs,
  truncateChunk: Qm,
  addChunk: Zm,
  getFinalChunk: Dn,
  finalize: np
};
async function op(e, t) {
  return Sr(e, lp, t);
}
const ip = () => ({ contents: "", textDecoder: new TextDecoder() }), vt = (e, { textDecoder: t }) => t.decode(e, { stream: !0 }), sp = (e, { contents: t }) => t + e, ap = (e, t) => e.slice(0, t), cp = ({ textDecoder: e }) => {
  const t = e.decode();
  return t === "" ? void 0 : t;
}, lp = {
  init: ip,
  convertChunk: {
    string: Se,
    buffer: vt,
    arrayBuffer: vt,
    dataView: vt,
    typedArray: vt,
    others: Ws
  },
  getSize: zs,
  truncateChunk: ap,
  addChunk: sp,
  getFinalChunk: cp,
  finalize: Gs
}, up = ({ error: e, stream: t, readableObjectMode: n, lines: r, encoding: o, fdNumber: i }) => {
  if (!(e instanceof Xt))
    throw e;
  if (i === "all")
    return e;
  const s = fp(n, r, o);
  throw e.maxBufferInfo = { fdNumber: i, unit: s }, t.destroy(), e;
}, fp = (e, t, n) => e ? "objects" : t ? "lines" : n === "buffer" ? "bytes" : "characters", dp = (e, t, n) => {
  if (t.length !== n)
    return;
  const r = new Xt();
  throw r.maxBufferInfo = { fdNumber: "ipc" }, r;
}, hp = (e, t) => {
  const { streamName: n, threshold: r, unit: o } = mp(e, t);
  return `Command's ${n} was larger than ${r} ${o}`;
}, mp = (e, t) => {
  if ((e == null ? void 0 : e.maxBufferInfo) === void 0)
    return { streamName: "output", threshold: t[1], unit: "bytes" };
  const { maxBufferInfo: { fdNumber: n, unit: r } } = e;
  delete e.maxBufferInfo;
  const o = ct(t, n);
  return n === "ipc" ? { streamName: "IPC output", threshold: o, unit: "messages" } : { streamName: Ni(n), threshold: o, unit: r };
}, pp = (e, t, n) => (e == null ? void 0 : e.code) === "ENOBUFS" && t !== null && t.some((r) => r !== null && r.length > br(n)), yp = (e, t, n) => {
  if (!t)
    return e;
  const r = br(n);
  return e.length > r ? e.slice(0, r) : e;
}, br = ([, e]) => e, wp = ({
  stdio: e,
  all: t,
  ipcOutput: n,
  originalError: r,
  signal: o,
  signalDescription: i,
  exitCode: s,
  escapedCommand: a,
  timedOut: c,
  isCanceled: u,
  isGracefullyCanceled: l,
  isMaxBuffer: f,
  isForcefullyTerminated: d,
  forceKillAfterDelay: h,
  killSignal: m,
  maxBuffer: y,
  timeout: g,
  cwd: S
}) => {
  const E = r == null ? void 0 : r.code, v = gp({
    originalError: r,
    timedOut: c,
    timeout: g,
    isMaxBuffer: f,
    maxBuffer: y,
    errorCode: E,
    signal: o,
    signalDescription: i,
    exitCode: s,
    isCanceled: u,
    isGracefullyCanceled: l,
    isForcefullyTerminated: d,
    forceKillAfterDelay: h,
    killSignal: m
  }), M = bp(r, S), K = M === void 0 ? "" : `
${M}`, Q = `${v}: ${a}${K}`, ce = t === void 0 ? [e[2], e[1]] : [t], ne = [
    Q,
    ...ce,
    ...e.slice(3),
    n.map((w) => Ep(w)).join(`
`)
  ].map((w) => tr(yr(Tp(w)))).filter(Boolean).join(`

`);
  return { originalMessage: M, shortMessage: Q, message: ne };
}, gp = ({
  originalError: e,
  timedOut: t,
  timeout: n,
  isMaxBuffer: r,
  maxBuffer: o,
  errorCode: i,
  signal: s,
  signalDescription: a,
  exitCode: c,
  isCanceled: u,
  isGracefullyCanceled: l,
  isForcefullyTerminated: f,
  forceKillAfterDelay: d,
  killSignal: h
}) => {
  const m = Sp(f, d);
  return t ? `Command timed out after ${n} milliseconds${m}` : l ? s === void 0 ? `Command was gracefully canceled with exit code ${c}` : f ? `Command was gracefully canceled${m}` : `Command was gracefully canceled with ${s} (${a})` : u ? `Command was canceled${m}` : r ? `${hp(e, o)}${m}` : i !== void 0 ? `Command failed with ${i}${m}` : f ? `Command was killed with ${h} (${hs(h)})${m}` : s !== void 0 ? `Command was killed with ${s} (${a})` : c !== void 0 ? `Command failed with exit code ${c}` : "Command failed";
}, Sp = (e, t) => e ? ` and was forcefully terminated after ${t} milliseconds` : "", bp = (e, t) => {
  if (e instanceof pt)
    return;
  const n = Xd(e) ? e.originalMessage : String((e == null ? void 0 : e.message) ?? e), r = tr(Dm(n, t));
  return r === "" ? void 0 : r;
}, Ep = (e) => typeof e == "string" ? e : Vo(e), Tp = (e) => Array.isArray(e) ? e.map((t) => yr(go(t))).filter(Boolean).join(`
`) : go(e), go = (e) => typeof e == "string" ? e : te(e) ? Bi(e) : "", qs = ({
  command: e,
  escapedCommand: t,
  stdio: n,
  all: r,
  ipcOutput: o,
  options: { cwd: i },
  startTime: s
}) => Ys({
  command: e,
  escapedCommand: t,
  cwd: i,
  durationMs: Ji(s),
  failed: !1,
  timedOut: !1,
  isCanceled: !1,
  isGracefullyCanceled: !1,
  isTerminated: !1,
  isMaxBuffer: !1,
  isForcefullyTerminated: !1,
  exitCode: 0,
  stdout: n[1],
  stderr: n[2],
  all: r,
  stdio: n,
  ipcOutput: o,
  pipedFrom: []
}), Er = ({
  error: e,
  command: t,
  escapedCommand: n,
  fileDescriptors: r,
  options: o,
  startTime: i,
  isSync: s
}) => Tr({
  error: e,
  command: t,
  escapedCommand: n,
  startTime: i,
  timedOut: !1,
  isCanceled: !1,
  isGracefullyCanceled: !1,
  isMaxBuffer: !1,
  isForcefullyTerminated: !1,
  stdio: Array.from({ length: r.length }),
  ipcOutput: [],
  options: o,
  isSync: s
}), Tr = ({
  error: e,
  command: t,
  escapedCommand: n,
  startTime: r,
  timedOut: o,
  isCanceled: i,
  isGracefullyCanceled: s,
  isMaxBuffer: a,
  isForcefullyTerminated: c,
  exitCode: u,
  signal: l,
  stdio: f,
  all: d,
  ipcOutput: h,
  options: {
    timeoutDuration: m,
    timeout: y = m,
    forceKillAfterDelay: g,
    killSignal: S,
    cwd: E,
    maxBuffer: v
  },
  isSync: M
}) => {
  const { exitCode: K, signal: Q, signalDescription: ce } = vp(u, l), { originalMessage: ne, shortMessage: w, message: $ } = wp({
    stdio: f,
    all: d,
    ipcOutput: h,
    originalError: e,
    signal: Q,
    signalDescription: ce,
    exitCode: K,
    escapedCommand: n,
    timedOut: o,
    isCanceled: i,
    isGracefullyCanceled: s,
    isMaxBuffer: a,
    isForcefullyTerminated: c,
    forceKillAfterDelay: g,
    killSignal: S,
    maxBuffer: v,
    timeout: y,
    cwd: E
  }), b = Kd(e, $, M);
  return Object.assign(b, $p({
    error: b,
    command: t,
    escapedCommand: n,
    startTime: r,
    timedOut: o,
    isCanceled: i,
    isGracefullyCanceled: s,
    isMaxBuffer: a,
    isForcefullyTerminated: c,
    exitCode: K,
    signal: Q,
    signalDescription: ce,
    stdio: f,
    all: d,
    ipcOutput: h,
    cwd: E,
    originalMessage: ne,
    shortMessage: w
  })), b;
}, $p = ({
  error: e,
  command: t,
  escapedCommand: n,
  startTime: r,
  timedOut: o,
  isCanceled: i,
  isGracefullyCanceled: s,
  isMaxBuffer: a,
  isForcefullyTerminated: c,
  exitCode: u,
  signal: l,
  signalDescription: f,
  stdio: d,
  all: h,
  ipcOutput: m,
  cwd: y,
  originalMessage: g,
  shortMessage: S
}) => {
  var E;
  return Ys({
    shortMessage: S,
    originalMessage: g,
    command: t,
    escapedCommand: n,
    cwd: y,
    durationMs: Ji(r),
    failed: !0,
    timedOut: o,
    isCanceled: i,
    isGracefullyCanceled: s,
    isTerminated: l !== void 0,
    isMaxBuffer: a,
    isForcefullyTerminated: c,
    exitCode: u,
    signal: l,
    signalDescription: f,
    code: (E = e.cause) == null ? void 0 : E.code,
    stdout: d[1],
    stderr: d[2],
    all: h,
    stdio: d,
    ipcOutput: m,
    pipedFrom: []
  });
}, Ys = (e) => Object.fromEntries(Object.entries(e).filter(([, t]) => t !== void 0)), vp = (e, t) => {
  const n = e === null ? void 0 : e, r = t === null ? void 0 : t, o = r === void 0 ? void 0 : hs(t);
  return { exitCode: n, signal: r, signalDescription: o };
}, So = (e) => Number.isFinite(e) ? e : 0;
function Op(e) {
  return {
    days: Math.trunc(e / 864e5),
    hours: Math.trunc(e / 36e5 % 24),
    minutes: Math.trunc(e / 6e4 % 60),
    seconds: Math.trunc(e / 1e3 % 60),
    milliseconds: Math.trunc(e % 1e3),
    microseconds: Math.trunc(So(e * 1e3) % 1e3),
    nanoseconds: Math.trunc(So(e * 1e6) % 1e3)
  };
}
function Dp(e) {
  return {
    days: e / 86400000n,
    hours: e / 3600000n % 24n,
    minutes: e / 60000n % 60n,
    seconds: e / 1000n % 60n,
    milliseconds: e % 1000n,
    microseconds: 0n,
    nanoseconds: 0n
  };
}
function Ip(e) {
  switch (typeof e) {
    case "number": {
      if (Number.isFinite(e))
        return Op(e);
      break;
    }
    case "bigint":
      return Dp(e);
  }
  throw new TypeError("Expected a finite number or bigint");
}
const xp = (e) => e === 0 || e === 0n, Rp = (e, t) => t === 1 || t === 1n ? e : `${e}s`, Pp = 1e-7, Ap = 24n * 60n * 60n * 1000n;
function Cp(e, t) {
  const n = typeof e == "bigint";
  if (!n && !Number.isFinite(e))
    throw new TypeError("Expected a finite number or bigint");
  t = { ...t };
  const r = e < 0 ? "-" : "";
  e = e < 0 ? -e : e, t.colonNotation && (t.compact = !1, t.formatSubMilliseconds = !1, t.separateMilliseconds = !1, t.verbose = !1), t.compact && (t.unitCount = 1, t.secondsDecimalDigits = 0, t.millisecondsDecimalDigits = 0);
  let o = [];
  const i = (l, f) => {
    const d = Math.floor(l * 10 ** f + Pp);
    return (Math.round(d) / 10 ** f).toFixed(f);
  }, s = (l, f, d, h) => {
    if (!((o.length === 0 || !t.colonNotation) && xp(l) && !(t.colonNotation && d === "m"))) {
      if (h ?? (h = String(l)), t.colonNotation) {
        const m = h.includes(".") ? h.split(".")[0].length : h.length, y = o.length > 0 ? 2 : 1;
        h = "0".repeat(Math.max(0, y - m)) + h;
      } else
        h += t.verbose ? " " + Rp(f, l) : d;
      o.push(h);
    }
  }, a = Ip(e), c = BigInt(a.days);
  if (t.hideYearAndDays ? s(BigInt(c) * 24n + BigInt(a.hours), "hour", "h") : (t.hideYear ? s(c, "day", "d") : (s(c / 365n, "year", "y"), s(c % 365n, "day", "d")), s(Number(a.hours), "hour", "h")), s(Number(a.minutes), "minute", "m"), !t.hideSeconds)
    if (t.separateMilliseconds || t.formatSubMilliseconds || !t.colonNotation && e < 1e3 && !t.subSecondsAsDecimals) {
      const l = Number(a.seconds), f = Number(a.milliseconds), d = Number(a.microseconds), h = Number(a.nanoseconds);
      if (s(l, "second", "s"), t.formatSubMilliseconds)
        s(f, "millisecond", "ms"), s(d, "microsecond", "µs"), s(h, "nanosecond", "ns");
      else {
        const m = f + d / 1e3 + h / 1e6, y = typeof t.millisecondsDecimalDigits == "number" ? t.millisecondsDecimalDigits : 0, g = m >= 1 ? Math.round(m) : Math.ceil(m), S = y ? m.toFixed(y) : g;
        s(
          Number.parseFloat(S),
          "millisecond",
          "ms",
          S
        );
      }
    } else {
      const l = (n ? Number(e % Ap) : e) / 1e3 % 60, f = typeof t.secondsDecimalDigits == "number" ? t.secondsDecimalDigits : 1, d = i(l, f), h = t.keepDecimalsOnWholeSeconds ? d : d.replace(/\.0+$/, "");
      s(Number.parseFloat(h), "second", "s", h);
    }
  if (o.length === 0)
    return r + "0" + (t.verbose ? " milliseconds" : "ms");
  const u = t.colonNotation ? ":" : " ";
  return typeof t.unitCount == "number" && (o = o.slice(0, Math.max(t.unitCount, 1))), r + o.join(u);
}
const Fp = (e, t) => {
  e.failed && mt({
    type: "error",
    verboseMessage: e.shortMessage,
    verboseInfo: t,
    result: e
  });
}, Lp = (e, t) => {
  Xn(t) && (Fp(e, t), Mp(e, t));
}, Mp = (e, t) => {
  const n = `(done in ${Cp(e.durationMs)})`;
  mt({
    type: "duration",
    verboseMessage: n,
    verboseInfo: t,
    result: e
  });
}, $r = (e, t, { reject: n }) => {
  if (Lp(e, t), e.failed && n)
    throw e;
  return e;
}, kp = (e, t) => We(e) ? "asyncGenerator" : Xs(e) ? "generator" : vr(e) ? "fileUrl" : Gp(e) ? "filePath" : Hp(e) ? "webStream" : Re(e, { checkOpen: !1 }) ? "native" : te(e) ? "uint8Array" : qp(e) ? "asyncIterable" : Yp(e) ? "iterable" : Dr(e) ? Js({}, t) : Up(e) ? _p(e, t) : "native", _p = (e, t) => ks(e.transform, { checkOpen: !1 }) ? jp(e, t) : Dr(e.transform) ? Js(e, t) : Bp(e, t), jp = (e, t) => (Ks(e, t, "Duplex stream"), "duplex"), Js = (e, t) => (Ks(e, t, "web TransformStream"), "webTransform"), Ks = ({ final: e, binary: t, objectMode: n }, r, o) => {
  bo(e, `${r}.final`, o), bo(t, `${r}.binary`, o), In(n, `${r}.objectMode`);
}, bo = (e, t, n) => {
  if (e !== void 0)
    throw new TypeError(`The \`${t}\` option can only be defined when using a generator, not a ${n}.`);
}, Bp = ({ transform: e, final: t, binary: n, objectMode: r }, o) => {
  if (e !== void 0 && !Eo(e))
    throw new TypeError(`The \`${o}.transform\` option must be a generator, a Duplex stream or a web TransformStream.`);
  if (ks(t, { checkOpen: !1 }))
    throw new TypeError(`The \`${o}.final\` option must not be a Duplex stream.`);
  if (Dr(t))
    throw new TypeError(`The \`${o}.final\` option must not be a web TransformStream.`);
  if (t !== void 0 && !Eo(t))
    throw new TypeError(`The \`${o}.final\` option must be a generator.`);
  return In(n, `${o}.binary`), In(r, `${o}.objectMode`), We(e) || We(t) ? "asyncGenerator" : "generator";
}, In = (e, t) => {
  if (e !== void 0 && typeof e != "boolean")
    throw new TypeError(`The \`${t}\` option must use a boolean.`);
}, Eo = (e) => We(e) || Xs(e), We = (e) => Object.prototype.toString.call(e) === "[object AsyncGeneratorFunction]", Xs = (e) => Object.prototype.toString.call(e) === "[object GeneratorFunction]", Up = (e) => X(e) && (e.transform !== void 0 || e.final !== void 0), vr = (e) => Object.prototype.toString.call(e) === "[object URL]", Np = (e) => vr(e) && e.protocol !== "file:", Gp = (e) => X(e) && Object.keys(e).length > 0 && Object.keys(e).every((t) => Wp.has(t)) && Qs(e.file), Wp = /* @__PURE__ */ new Set(["file", "append"]), Qs = (e) => typeof e == "string", zp = (e, t) => e === "native" && typeof t == "string" && !Vp.has(t), Vp = /* @__PURE__ */ new Set(["ipc", "ignore", "inherit", "overlapped", "pipe"]), Zs = (e) => Object.prototype.toString.call(e) === "[object ReadableStream]", Or = (e) => Object.prototype.toString.call(e) === "[object WritableStream]", Hp = (e) => Zs(e) || Or(e), Dr = (e) => Zs(e == null ? void 0 : e.readable) && Or(e == null ? void 0 : e.writable), qp = (e) => ea(e) && typeof e[Symbol.asyncIterator] == "function", Yp = (e) => ea(e) && typeof e[Symbol.iterator] == "function", ea = (e) => typeof e == "object" && e !== null, De = /* @__PURE__ */ new Set(["generator", "asyncGenerator", "duplex", "webTransform"]), ta = /* @__PURE__ */ new Set(["fileUrl", "filePath", "fileNumber"]), na = /* @__PURE__ */ new Set(["fileUrl", "filePath"]), Jp = /* @__PURE__ */ new Set([...na, "webStream", "nodeStream"]), Kp = /* @__PURE__ */ new Set(["webTransform", "duplex"]), Qt = {
  generator: "a generator",
  asyncGenerator: "an async generator",
  fileUrl: "a file URL",
  filePath: "a file path string",
  fileNumber: "a file descriptor number",
  webStream: "a web stream",
  nodeStream: "a Node.js stream",
  webTransform: "a web TransformStream",
  duplex: "a Duplex stream",
  native: "any value",
  iterable: "an iterable",
  asyncIterable: "an async iterable",
  string: "a string",
  uint8Array: "a Uint8Array"
}, ra = (e, t, n, r) => r === "output" ? Xp(e, t, n) : Qp(e, t, n), Xp = (e, t, n) => {
  const r = t !== 0 && n[t - 1].value.readableObjectMode;
  return { writableObjectMode: r, readableObjectMode: e ?? r };
}, Qp = (e, t, n) => {
  const r = t === 0 ? e === !0 : n[t - 1].value.readableObjectMode, o = t !== n.length - 1 && (e ?? r);
  return { writableObjectMode: r, readableObjectMode: o };
}, Zp = (e, t) => {
  const n = e.findLast(({ type: r }) => De.has(r));
  return n === void 0 ? !1 : t === "input" ? n.value.writableObjectMode : n.value.readableObjectMode;
}, ey = (e, t, n, r) => [
  ...e.filter(({ type: o }) => !De.has(o)),
  ...ty(e, t, n, r)
], ty = (e, t, n, { encoding: r }) => {
  const o = e.filter(({ type: s }) => De.has(s)), i = Array.from({ length: o.length });
  for (const [s, a] of Object.entries(o))
    i[s] = ny({
      stdioItem: a,
      index: Number(s),
      newTransforms: i,
      optionName: t,
      direction: n,
      encoding: r
    });
  return sy(i, n);
}, ny = ({ stdioItem: e, stdioItem: { type: t }, index: n, newTransforms: r, optionName: o, direction: i, encoding: s }) => t === "duplex" ? ry({ stdioItem: e, optionName: o }) : t === "webTransform" ? oy({
  stdioItem: e,
  index: n,
  newTransforms: r,
  direction: i
}) : iy({
  stdioItem: e,
  index: n,
  newTransforms: r,
  direction: i,
  encoding: s
}), ry = ({
  stdioItem: e,
  stdioItem: {
    value: {
      transform: t,
      transform: { writableObjectMode: n, readableObjectMode: r },
      objectMode: o = r
    }
  },
  optionName: i
}) => {
  if (o && !r)
    throw new TypeError(`The \`${i}.objectMode\` option can only be \`true\` if \`new Duplex({objectMode: true})\` is used.`);
  if (!o && r)
    throw new TypeError(`The \`${i}.objectMode\` option cannot be \`false\` if \`new Duplex({objectMode: true})\` is used.`);
  return {
    ...e,
    value: { transform: t, writableObjectMode: n, readableObjectMode: r }
  };
}, oy = ({ stdioItem: e, stdioItem: { value: t }, index: n, newTransforms: r, direction: o }) => {
  const { transform: i, objectMode: s } = X(t) ? t : { transform: t }, { writableObjectMode: a, readableObjectMode: c } = ra(s, n, r, o);
  return {
    ...e,
    value: { transform: i, writableObjectMode: a, readableObjectMode: c }
  };
}, iy = ({ stdioItem: e, stdioItem: { value: t }, index: n, newTransforms: r, direction: o, encoding: i }) => {
  const {
    transform: s,
    final: a,
    binary: c = !1,
    preserveNewlines: u = !1,
    objectMode: l
  } = X(t) ? t : { transform: t }, f = c || xe.has(i), { writableObjectMode: d, readableObjectMode: h } = ra(l, n, r, o);
  return {
    ...e,
    value: {
      transform: s,
      final: a,
      binary: f,
      preserveNewlines: u,
      writableObjectMode: d,
      readableObjectMode: h
    }
  };
}, sy = (e, t) => t === "input" ? e.reverse() : e, ay = (e, t, n) => {
  const r = e.map((o) => cy(o, t));
  if (r.includes("input") && r.includes("output"))
    throw new TypeError(`The \`${n}\` option must not be an array of both readable and writable values.`);
  return r.find(Boolean) ?? fy;
}, cy = ({ type: e, value: t }, n) => ly[n] ?? oa[e](t), ly = ["input", "output", "output"], Fe = () => {
}, un = () => "input", oa = {
  generator: Fe,
  asyncGenerator: Fe,
  fileUrl: Fe,
  filePath: Fe,
  iterable: un,
  asyncIterable: un,
  uint8Array: un,
  webStream: (e) => Or(e) ? "output" : "input",
  nodeStream(e) {
    return Kt(e, { checkOpen: !1 }) ? Ms(e, { checkOpen: !1 }) ? void 0 : "input" : "output";
  },
  webTransform: Fe,
  duplex: Fe,
  native(e) {
    const t = uy(e);
    if (t !== void 0)
      return t;
    if (Re(e, { checkOpen: !1 }))
      return oa.nodeStream(e);
  }
}, uy = (e) => {
  if ([0, G.stdin].includes(e))
    return "input";
  if ([1, 2, G.stdout, G.stderr].includes(e))
    return "output";
}, fy = "output", dy = (e, t) => t && !e.includes("ipc") ? [...e, "ipc"] : e, hy = ({ stdio: e, ipc: t, buffer: n, ...r }, o, i) => {
  const s = my(e, r).map((a, c) => ia(a, c));
  return i ? yy(s, n, o) : dy(s, t);
}, my = (e, t) => {
  if (e === void 0)
    return se.map((r) => t[r]);
  if (py(t))
    throw new Error(`It's not possible to provide \`stdio\` in combination with one of ${se.map((r) => `\`${r}\``).join(", ")}`);
  if (typeof e == "string")
    return [e, e, e];
  if (!Array.isArray(e))
    throw new TypeError(`Expected \`stdio\` to be of type \`string\` or \`Array\`, got \`${typeof e}\``);
  const n = Math.max(e.length, se.length);
  return Array.from({ length: n }, (r, o) => e[o]);
}, py = (e) => se.some((t) => e[t] !== void 0), ia = (e, t) => Array.isArray(e) ? e.map((n) => ia(n, t)) : e ?? (t >= se.length ? "ignore" : "pipe"), yy = (e, t, n) => e.map((r, o) => !t[o] && o !== 0 && !Qn(n, o) && wy(r) ? "ignore" : r), wy = (e) => e === "pipe" || Array.isArray(e) && e.every((t) => t === "pipe"), gy = ({ stdioItem: e, stdioItem: { type: t }, isStdioArray: n, fdNumber: r, direction: o, isSync: i }) => !n || t !== "native" ? e : i ? Sy({ stdioItem: e, fdNumber: r, direction: o }) : Ty({ stdioItem: e, fdNumber: r }), Sy = ({ stdioItem: e, stdioItem: { value: t, optionName: n }, fdNumber: r, direction: o }) => {
  const i = by({
    value: t,
    optionName: n,
    fdNumber: r,
    direction: o
  });
  if (i !== void 0)
    return i;
  if (Re(t, { checkOpen: !1 }))
    throw new TypeError(`The \`${n}: Stream\` option cannot both be an array and include a stream with synchronous methods.`);
  return e;
}, by = ({ value: e, optionName: t, fdNumber: n, direction: r }) => {
  const o = Ey(e, n);
  if (o !== void 0) {
    if (r === "output")
      return { type: "fileNumber", value: o, optionName: t };
    if (Yo.isatty(o))
      throw new TypeError(`The \`${t}: ${Tn(e)}\` option is invalid: it cannot be a TTY with synchronous methods.`);
    return { type: "uint8Array", value: at(hn(o)), optionName: t };
  }
}, Ey = (e, t) => {
  if (e === "inherit")
    return t;
  if (typeof e == "number")
    return e;
  const n = Kn.indexOf(e);
  if (n !== -1)
    return n;
}, Ty = ({ stdioItem: e, stdioItem: { value: t, optionName: n }, fdNumber: r }) => t === "inherit" ? { type: "nodeStream", value: To(r, t, n), optionName: n } : typeof t == "number" ? { type: "nodeStream", value: To(t, t, n), optionName: n } : Re(t, { checkOpen: !1 }) ? { type: "nodeStream", value: t, optionName: n } : e, To = (e, t, n) => {
  const r = Kn[e];
  if (r === void 0)
    throw new TypeError(`The \`${n}: ${t}\` option is invalid: no such standard stream.`);
  return r;
}, $y = ({ input: e, inputFile: t }, n) => n === 0 ? [
  ...vy(e),
  ...Dy(t)
] : [], vy = (e) => e === void 0 ? [] : [{
  type: Oy(e),
  value: e,
  optionName: "input"
}], Oy = (e) => {
  if (Kt(e, { checkOpen: !1 }))
    return "nodeStream";
  if (typeof e == "string")
    return "string";
  if (te(e))
    return "uint8Array";
  throw new Error("The `input` option must be a string, a Uint8Array or a Node.js Readable stream.");
}, Dy = (e) => e === void 0 ? [] : [{
  ...Iy(e),
  optionName: "inputFile"
}], Iy = (e) => {
  if (vr(e))
    return { type: "fileUrl", value: e };
  if (Qs(e))
    return { type: "filePath", value: { file: e } };
  throw new Error("The `inputFile` option must be a file path string or a file URL.");
}, xy = (e) => e.filter((t, n) => e.every((r, o) => t.value !== r.value || n >= o || t.type === "generator" || t.type === "asyncGenerator")), Ry = ({ stdioItem: { type: e, value: t, optionName: n }, direction: r, fileDescriptors: o, isSync: i }) => {
  const s = Py(o, e);
  if (s.length !== 0) {
    if (i) {
      Ay({
        otherStdioItems: s,
        type: e,
        value: t,
        optionName: n,
        direction: r
      });
      return;
    }
    if (Jp.has(e))
      return sa({
        otherStdioItems: s,
        type: e,
        value: t,
        optionName: n,
        direction: r
      });
    Kp.has(e) && Fy({
      otherStdioItems: s,
      type: e,
      value: t,
      optionName: n
    });
  }
}, Py = (e, t) => e.flatMap(({ direction: n, stdioItems: r }) => r.filter((o) => o.type === t).map((o) => ({ ...o, direction: n }))), Ay = ({ otherStdioItems: e, type: t, value: n, optionName: r, direction: o }) => {
  na.has(t) && sa({
    otherStdioItems: e,
    type: t,
    value: n,
    optionName: r,
    direction: o
  });
}, sa = ({ otherStdioItems: e, type: t, value: n, optionName: r, direction: o }) => {
  const i = e.filter((a) => Cy(a, n));
  if (i.length === 0)
    return;
  const s = i.find((a) => a.direction !== o);
  return aa(s, r, t), o === "output" ? i[0].stream : void 0;
}, Cy = ({ type: e, value: t }, n) => e === "filePath" ? t.file === n.file : e === "fileUrl" ? t.href === n.href : t === n, Fy = ({ otherStdioItems: e, type: t, value: n, optionName: r }) => {
  const o = e.find(({ value: { transform: i } }) => i === n.transform);
  aa(o, r, t);
}, aa = (e, t, n) => {
  if (e !== void 0)
    throw new TypeError(`The \`${e.optionName}\` and \`${t}\` options must not target ${Qt[n]} that is the same.`);
}, ca = (e, t, n, r) => {
  const i = hy(t, n, r).map((a, c) => Ly({
    stdioOption: a,
    fdNumber: c,
    options: t,
    isSync: r
  })), s = Gy({
    initialFileDescriptors: i,
    addProperties: e,
    options: t,
    isSync: r
  });
  return t.stdio = s.map(({ stdioItems: a }) => Vy(a)), s;
}, Ly = ({ stdioOption: e, fdNumber: t, options: n, isSync: r }) => {
  const o = Ni(t), { stdioItems: i, isStdioArray: s } = My({
    stdioOption: e,
    fdNumber: t,
    options: n,
    optionName: o
  }), a = ay(i, t, o), c = i.map((f) => gy({
    stdioItem: f,
    isStdioArray: s,
    fdNumber: t,
    direction: a,
    isSync: r
  })), u = ey(c, o, a, n), l = Zp(u, a);
  return Ny(u, l), { direction: a, objectMode: l, stdioItems: u };
}, My = ({ stdioOption: e, fdNumber: t, options: n, optionName: r }) => {
  const i = [
    ...(Array.isArray(e) ? e : [e]).map((c) => ky(c, r)),
    ...$y(n, t)
  ], s = xy(i), a = s.length > 1;
  return _y(s, a, r), By(s), { stdioItems: s, isStdioArray: a };
}, ky = (e, t) => ({
  type: kp(e, t),
  value: e,
  optionName: t
}), _y = (e, t, n) => {
  if (e.length === 0)
    throw new TypeError(`The \`${n}\` option must not be an empty array.`);
  if (t) {
    for (const { value: r, optionName: o } of e)
      if (jy.has(r))
        throw new Error(`The \`${o}\` option must not include \`${r}\`.`);
  }
}, jy = /* @__PURE__ */ new Set(["ignore", "ipc"]), By = (e) => {
  for (const t of e)
    Uy(t);
}, Uy = ({ type: e, value: t, optionName: n }) => {
  if (Np(t))
    throw new TypeError(`The \`${n}: URL\` option must use the \`file:\` scheme.
For example, you can use the \`pathToFileURL()\` method of the \`url\` core module.`);
  if (zp(e, t))
    throw new TypeError(`The \`${n}: { file: '...' }\` option must be used instead of \`${n}: '...'\`.`);
}, Ny = (e, t) => {
  if (!t)
    return;
  const n = e.find(({ type: r }) => ta.has(r));
  if (n !== void 0)
    throw new TypeError(`The \`${n.optionName}\` option cannot use both files and transforms in objectMode.`);
}, Gy = ({ initialFileDescriptors: e, addProperties: t, options: n, isSync: r }) => {
  const o = [];
  try {
    for (const i of e)
      o.push(Wy({
        fileDescriptor: i,
        fileDescriptors: o,
        addProperties: t,
        options: n,
        isSync: r
      }));
    return o;
  } catch (i) {
    throw la(o), i;
  }
}, Wy = ({
  fileDescriptor: { direction: e, objectMode: t, stdioItems: n },
  fileDescriptors: r,
  addProperties: o,
  options: i,
  isSync: s
}) => {
  const a = n.map((c) => zy({
    stdioItem: c,
    addProperties: o,
    direction: e,
    options: i,
    fileDescriptors: r,
    isSync: s
  }));
  return { direction: e, objectMode: t, stdioItems: a };
}, zy = ({ stdioItem: e, addProperties: t, direction: n, options: r, fileDescriptors: o, isSync: i }) => {
  const s = Ry({
    stdioItem: e,
    direction: n,
    fileDescriptors: o,
    isSync: i
  });
  return s !== void 0 ? { ...e, stream: s } : {
    ...e,
    ...t[n][e.type](e, r)
  };
}, la = (e) => {
  for (const { stdioItems: t } of e)
    for (const { stream: n } of t)
      n !== void 0 && !ve(n) && n.destroy();
}, Vy = (e) => {
  if (e.length > 1)
    return e.some(({ value: r }) => r === "overlapped") ? "overlapped" : "pipe";
  const [{ type: t, value: n }] = e;
  return t === "native" ? n : "pipe";
}, Hy = (e, t) => ca(Yy, e, t, !0), ie = ({ type: e, optionName: t }) => {
  ua(t, Qt[e]);
}, qy = ({ optionName: e, value: t }) => ((t === "ipc" || t === "overlapped") && ua(e, `"${t}"`), {}), ua = (e, t) => {
  throw new TypeError(`The \`${e}\` option cannot be ${t} with synchronous methods.`);
}, $o = {
  generator() {
  },
  asyncGenerator: ie,
  webStream: ie,
  nodeStream: ie,
  webTransform: ie,
  duplex: ie,
  asyncIterable: ie,
  native: qy
}, Yy = {
  input: {
    ...$o,
    fileUrl: ({ value: e }) => ({ contents: [at(hn(e))] }),
    filePath: ({ value: { file: e } }) => ({ contents: [at(hn(e))] }),
    fileNumber: ie,
    iterable: ({ value: e }) => ({ contents: [...e] }),
    string: ({ value: e }) => ({ contents: [e] }),
    uint8Array: ({ value: e }) => ({ contents: [e] })
  },
  output: {
    ...$o,
    fileUrl: ({ value: e }) => ({ path: e }),
    filePath: ({ value: { file: e, append: t } }) => ({ path: e, append: t }),
    fileNumber: ({ value: e }) => ({ path: e }),
    iterable: ie,
    string: ie,
    uint8Array: ie
  }
}, ze = (e, { stripFinalNewline: t }, n) => fa(t, n) && e !== void 0 && !Array.isArray(e) ? yr(e) : e, fa = (e, t) => t === "all" ? e[1] || e[2] : e[t], da = (e, t, n, r) => e || n ? void 0 : ma(t, r), ha = (e, t, n) => n ? e.flatMap((r) => vo(r, t)) : vo(e, t), vo = (e, t) => {
  const { transform: n, final: r } = ma(t, {});
  return [...n(e), ...r()];
}, ma = (e, t) => (t.previousChunks = "", {
  transform: Jy.bind(void 0, t, e),
  final: Xy.bind(void 0, t)
}), Jy = function* (e, t, n) {
  if (typeof n != "string") {
    yield n;
    return;
  }
  let { previousChunks: r } = e, o = -1;
  for (let i = 0; i < n.length; i += 1)
    if (n[i] === `
`) {
      const s = Ky(n, i, t, e);
      let a = n.slice(o + 1, i + 1 - s);
      r.length > 0 && (a = xn(r, a), r = ""), yield a, o = i;
    }
  o !== n.length - 1 && (r = xn(r, n.slice(o + 1))), e.previousChunks = r;
}, Ky = (e, t, n, r) => n ? 0 : (r.isWindowsNewline = t !== 0 && e[t - 1] === "\r", r.isWindowsNewline ? 2 : 1), Xy = function* ({ previousChunks: e }) {
  e.length > 0 && (yield e);
}, Qy = ({ binary: e, preserveNewlines: t, readableObjectMode: n, state: r }) => e || t || n ? void 0 : { transform: Zy.bind(void 0, r) }, Zy = function* ({ isWindowsNewline: e = !1 }, t) {
  const { unixNewline: n, windowsNewline: r, LF: o, concatBytes: i } = typeof t == "string" ? ew : nw;
  if (t.at(-1) === o) {
    yield t;
    return;
  }
  yield i(t, e ? r : n);
}, xn = (e, t) => `${e}${t}`, ew = {
  windowsNewline: `\r
`,
  unixNewline: `
`,
  LF: `
`,
  concatBytes: xn
}, tw = (e, t) => {
  const n = new Uint8Array(e.length + t.length);
  return n.set(e, 0), n.set(t, e.length), n;
}, nw = {
  windowsNewline: new Uint8Array([13, 10]),
  unixNewline: new Uint8Array([10]),
  LF: 10,
  concatBytes: tw
}, rw = (e, t) => e ? void 0 : ow.bind(void 0, t), ow = function* (e, t) {
  if (typeof t != "string" && !te(t) && !Bn.isBuffer(t))
    throw new TypeError(`The \`${e}\` option's transform must use "objectMode: true" to receive as input: ${typeof t}.`);
  yield t;
}, iw = (e, t) => e ? sw.bind(void 0, t) : aw.bind(void 0, t), sw = function* (e, t) {
  pa(e, t), yield t;
}, aw = function* (e, t) {
  if (pa(e, t), typeof t != "string" && !te(t))
    throw new TypeError(`The \`${e}\` option's function must yield a string or an Uint8Array, not ${typeof t}.`);
  yield t;
}, pa = (e, t) => {
  if (t == null)
    throw new TypeError(`The \`${e}\` option's function must not call \`yield ${t}\`.
Instead, \`yield\` should either be called with a value, or not be called at all. For example:
  if (condition) { yield value; }`);
}, ya = (e, t, n) => {
  if (n)
    return;
  if (e)
    return { transform: cw.bind(void 0, new TextEncoder()) };
  const r = new zo(t);
  return {
    transform: lw.bind(void 0, r),
    final: uw.bind(void 0, r)
  };
}, cw = function* (e, t) {
  Bn.isBuffer(t) ? yield at(t) : typeof t == "string" ? yield e.encode(t) : yield t;
}, lw = function* (e, t) {
  yield te(t) ? e.write(t) : t;
}, uw = function* (e) {
  const t = e.end();
  t !== "" && (yield t);
}, Oo = qe(async (e, t, n, r) => {
  t.currentIterable = e(...n);
  try {
    for await (const o of t.currentIterable)
      r.push(o);
  } finally {
    delete t.currentIterable;
  }
}), Ir = async function* (e, t, n) {
  if (n === t.length) {
    yield e;
    return;
  }
  const { transform: r = mw } = t[n];
  for await (const o of r(e))
    yield* Ir(o, t, n + 1);
}, fw = async function* (e) {
  for (const [t, { final: n }] of Object.entries(e))
    yield* dw(n, Number(t), e);
}, dw = async function* (e, t, n) {
  if (e !== void 0)
    for await (const r of e())
      yield* Ir(r, n, t + 1);
}, hw = qe(async ({ currentIterable: e }, t) => {
  if (e !== void 0) {
    await (t ? e.throw(t) : e.return());
    return;
  }
  if (t)
    throw t;
}), mw = function* (e) {
  yield e;
}, Do = (e, t, n, r) => {
  try {
    for (const o of e(...t))
      n.push(o);
    r();
  } catch (o) {
    r(o);
  }
}, pw = (e, t) => [
  ...t.flatMap((n) => [...wt(n, e, 0)]),
  ...xr(e)
], wt = function* (e, t, n) {
  if (n === t.length) {
    yield e;
    return;
  }
  const { transform: r = ww } = t[n];
  for (const o of r(e))
    yield* wt(o, t, n + 1);
}, xr = function* (e) {
  for (const [t, { final: n }] of Object.entries(e))
    yield* yw(n, Number(t), e);
}, yw = function* (e, t, n) {
  if (e !== void 0)
    for (const r of e())
      yield* wt(r, n, t + 1);
}, ww = function* (e) {
  yield e;
}, Io = ({
  value: e,
  value: { transform: t, final: n, writableObjectMode: r, readableObjectMode: o },
  optionName: i
}, { encoding: s }) => {
  const a = {}, c = ga(e, s, i), u = We(t), l = We(n), f = u ? Oo.bind(void 0, Ir, a) : Do.bind(void 0, wt), d = u || l ? Oo.bind(void 0, fw, a) : Do.bind(void 0, xr), h = u || l ? hw.bind(void 0, a) : void 0;
  return { stream: new Cc({
    writableObjectMode: r,
    writableHighWaterMark: At(r),
    readableObjectMode: o,
    readableHighWaterMark: At(o),
    transform(y, g, S) {
      f([y, c, 0], this, S);
    },
    flush(y) {
      d([c], this, y);
    },
    destroy: h
  }) };
}, wa = (e, t, n, r) => {
  const o = t.filter(({ type: s }) => s === "generator"), i = r ? o.reverse() : o;
  for (const { value: s, optionName: a } of i) {
    const c = ga(s, n, a);
    e = pw(c, e);
  }
  return e;
}, ga = ({ transform: e, final: t, binary: n, writableObjectMode: r, readableObjectMode: o, preserveNewlines: i }, s, a) => {
  const c = {};
  return [
    { transform: rw(r, a) },
    ya(n, s, r),
    da(n, i, r, c),
    { transform: e, final: t },
    { transform: iw(o, a) },
    Qy({
      binary: n,
      preserveNewlines: i,
      readableObjectMode: o,
      state: c
    })
  ].filter(Boolean);
}, gw = (e, t) => {
  for (const n of Sw(e))
    bw(e, n, t);
}, Sw = (e) => new Set(Object.entries(e).filter(([, { direction: t }]) => t === "input").map(([t]) => Number(t))), bw = (e, t, n) => {
  const { stdioItems: r } = e[t], o = r.filter(({ contents: a }) => a !== void 0);
  if (o.length === 0)
    return;
  if (t !== 0) {
    const [{ type: a, optionName: c }] = o;
    throw new TypeError(`Only the \`stdin\` option, not \`${c}\`, can be ${Qt[a]} with synchronous methods.`);
  }
  const s = o.map(({ contents: a }) => a).map((a) => Ew(a, r));
  n.input = Jn(s);
}, Ew = (e, t) => {
  const n = wa(e, t, "utf8", !0);
  return Tw(n), Jn(n);
}, Tw = (e) => {
  const t = e.find((n) => typeof n != "string" && !te(n));
  if (t !== void 0)
    throw new TypeError(`The \`stdin\` option is invalid: when passing objects as input, a transform must be used to serialize them to strings or Uint8Arrays: ${t}.`);
}, Sa = ({ stdioItems: e, encoding: t, verboseInfo: n, fdNumber: r }) => r !== "all" && Qn(n, r) && !xe.has(t) && $w(r) && (e.some(({ type: o, value: i }) => o === "native" && vw.has(i)) || e.every(({ type: o }) => De.has(o))), $w = (e) => e === 1 || e === 2, vw = /* @__PURE__ */ new Set(["pipe", "overlapped"]), Ow = async (e, t, n, r) => {
  for await (const o of e)
    Iw(t) || ba(o, n, r);
}, Dw = (e, t, n) => {
  for (const r of e)
    ba(r, t, n);
}, Iw = (e) => e._readableState.pipes.length > 0, ba = (e, t, n) => {
  const r = qi(e);
  mt({
    type: "output",
    verboseMessage: r,
    fdNumber: t,
    verboseInfo: n
  });
}, xw = ({ fileDescriptors: e, syncResult: { output: t }, options: n, isMaxBuffer: r, verboseInfo: o }) => {
  if (t === null)
    return { output: Array.from({ length: 3 }) };
  const i = {}, s = /* @__PURE__ */ new Set([]);
  return { output: t.map((c, u) => Rw({
    result: c,
    fileDescriptors: e,
    fdNumber: u,
    state: i,
    outputFiles: s,
    isMaxBuffer: r,
    verboseInfo: o
  }, n)), ...i };
}, Rw = ({ result: e, fileDescriptors: t, fdNumber: n, state: r, outputFiles: o, isMaxBuffer: i, verboseInfo: s }, { buffer: a, encoding: c, lines: u, stripFinalNewline: l, maxBuffer: f }) => {
  if (e === null)
    return;
  const d = yp(e, i, f), h = at(d), { stdioItems: m, objectMode: y } = t[n], g = Pw([h], m, c, r), { serializedResult: S, finalResult: E = S } = Aw({
    chunks: g,
    objectMode: y,
    encoding: c,
    lines: u,
    stripFinalNewline: l,
    fdNumber: n
  });
  Cw({
    serializedResult: S,
    fdNumber: n,
    state: r,
    verboseInfo: s,
    encoding: c,
    stdioItems: m,
    objectMode: y
  });
  const v = a[n] ? E : void 0;
  try {
    return r.error === void 0 && Fw(S, m, o), v;
  } catch (M) {
    return r.error = M, v;
  }
}, Pw = (e, t, n, r) => {
  try {
    return wa(e, t, n, !1);
  } catch (o) {
    return r.error = o, e;
  }
}, Aw = ({ chunks: e, objectMode: t, encoding: n, lines: r, stripFinalNewline: o, fdNumber: i }) => {
  if (t)
    return { serializedResult: e };
  if (n === "buffer")
    return { serializedResult: Jn(e) };
  const s = cf(e, n);
  return r[i] ? { serializedResult: s, finalResult: ha(s, !o[i], t) } : { serializedResult: s };
}, Cw = ({ serializedResult: e, fdNumber: t, state: n, verboseInfo: r, encoding: o, stdioItems: i, objectMode: s }) => {
  if (!Sa({
    stdioItems: i,
    encoding: o,
    verboseInfo: r,
    fdNumber: t
  }))
    return;
  const a = ha(e, !1, s);
  try {
    Dw(a, t, r);
  } catch (c) {
    n.error ?? (n.error = c);
  }
}, Fw = (e, t, n) => {
  for (const { path: r, append: o } of t.filter(({ type: i }) => ta.has(i))) {
    const i = typeof r == "string" ? r : r.toString();
    o || n.has(i) ? Pc(r, e) : (n.add(i), Ac(r, e));
  }
}, Lw = ([, e, t], n) => {
  if (n.all)
    return e === void 0 ? t : t === void 0 ? e : Array.isArray(e) ? Array.isArray(t) ? [...e, ...t] : [...e, ze(t, n, "all")] : Array.isArray(t) ? [ze(e, n, "all"), ...t] : te(e) && te(t) ? Ui([e, t]) : `${e}${t}`;
}, Mw = async (e, t) => {
  const [n, r] = await kw(e);
  return t.isForcefullyTerminated ?? (t.isForcefullyTerminated = !1), [n, r];
}, kw = async (e) => {
  const [t, n] = await Promise.allSettled([
    Y(e, "spawn"),
    Y(e, "exit")
  ]);
  return t.status === "rejected" ? [] : n.status === "rejected" ? Ea(e) : n.value;
}, Ea = async (e) => {
  try {
    return await Y(e, "exit");
  } catch {
    return Ea(e);
  }
}, _w = async (e) => {
  const [t, n] = await e;
  if (!jw(t, n) && Ta(t, n))
    throw new pt();
  return [t, n];
}, jw = (e, t) => e === void 0 && t === void 0, Ta = (e, t) => e !== 0 || t !== null, Bw = ({ error: e, status: t, signal: n, output: r }, { maxBuffer: o }) => {
  const i = Uw(e, t, n), s = (i == null ? void 0 : i.code) === "ETIMEDOUT", a = pp(i, r, o);
  return {
    resultError: i,
    exitCode: t,
    signal: n,
    timedOut: s,
    isMaxBuffer: a
  };
}, Uw = (e, t, n) => e !== void 0 ? e : Ta(t, n) ? new pt() : void 0, Nw = (e, t, n) => {
  const { file: r, commandArguments: o, command: i, escapedCommand: s, startTime: a, verboseInfo: c, options: u, fileDescriptors: l } = Gw(e, t, n), f = Vw({
    file: r,
    commandArguments: o,
    options: u,
    command: i,
    escapedCommand: s,
    verboseInfo: c,
    fileDescriptors: l,
    startTime: a
  });
  return $r(f, c, u);
}, Gw = (e, t, n) => {
  const { command: r, escapedCommand: o, startTime: i, verboseInfo: s } = Ki(e, t, n), a = Ww(n), { file: c, commandArguments: u, options: l } = As(e, t, a);
  zw(l);
  const f = Hy(l, s);
  return {
    file: c,
    commandArguments: u,
    command: r,
    escapedCommand: o,
    startTime: i,
    verboseInfo: s,
    options: l,
    fileDescriptors: f
  };
}, Ww = (e) => e.node && !e.ipc ? { ...e, ipc: !1 } : e, zw = ({ ipc: e, ipcInput: t, detached: n, cancelSignal: r }) => {
  t && Ot("ipcInput"), e && Ot("ipc: true"), n && Ot("detached: true"), r && Ot("cancelSignal");
}, Ot = (e) => {
  throw new TypeError(`The "${e}" option cannot be used with synchronous methods.`);
}, Vw = ({ file: e, commandArguments: t, options: n, command: r, escapedCommand: o, verboseInfo: i, fileDescriptors: s, startTime: a }) => {
  const c = Hw({
    file: e,
    commandArguments: t,
    options: n,
    command: r,
    escapedCommand: o,
    fileDescriptors: s,
    startTime: a
  });
  if (c.failed)
    return c;
  const { resultError: u, exitCode: l, signal: f, timedOut: d, isMaxBuffer: h } = Bw(c, n), { output: m, error: y = u } = xw({
    fileDescriptors: s,
    syncResult: c,
    options: n,
    isMaxBuffer: h,
    verboseInfo: i
  }), g = m.map((E, v) => ze(E, n, v)), S = ze(Lw(m, n), n, "all");
  return Yw({
    error: y,
    exitCode: l,
    signal: f,
    timedOut: d,
    isMaxBuffer: h,
    stdio: g,
    all: S,
    options: n,
    command: r,
    escapedCommand: o,
    startTime: a
  });
}, Hw = ({ file: e, commandArguments: t, options: n, command: r, escapedCommand: o, fileDescriptors: i, startTime: s }) => {
  try {
    gw(i, n);
    const a = qw(n);
    return pc(...Cs(e, t, a));
  } catch (a) {
    return Er({
      error: a,
      command: r,
      escapedCommand: o,
      fileDescriptors: i,
      options: n,
      startTime: s,
      isSync: !0
    });
  }
}, qw = ({ encoding: e, maxBuffer: t, ...n }) => ({ ...n, encoding: "buffer", maxBuffer: br(t) }), Yw = ({ error: e, exitCode: t, signal: n, timedOut: r, isMaxBuffer: o, stdio: i, all: s, options: a, command: c, escapedCommand: u, startTime: l }) => e === void 0 ? qs({
  command: c,
  escapedCommand: u,
  stdio: i,
  all: s,
  ipcOutput: [],
  options: a,
  startTime: l
}) : Tr({
  error: e,
  command: c,
  escapedCommand: u,
  timedOut: r,
  isCanceled: !1,
  isGracefullyCanceled: !1,
  isMaxBuffer: o,
  isForcefullyTerminated: !1,
  exitCode: t,
  signal: n,
  stdio: i,
  all: s,
  ipcOutput: [],
  options: a,
  startTime: l,
  isSync: !0
}), Jw = ({ anyProcess: e, channel: t, isSubprocess: n, ipc: r }, { reference: o = !0, filter: i } = {}) => (fr({
  methodName: "getOneMessage",
  isSubprocess: n,
  ipc: r,
  isConnected: vs(e)
}), Kw({
  anyProcess: e,
  channel: t,
  isSubprocess: n,
  filter: i,
  reference: o
})), Kw = async ({ anyProcess: e, channel: t, isSubprocess: n, filter: r, reference: o }) => {
  Ts(t, o);
  const i = Yt(e, t, n), s = new AbortController();
  try {
    return await Promise.race([
      Xw(i, r, s),
      Qw(i, n, s),
      Zw(i, n, s)
    ]);
  } catch (a) {
    throw dr(e), a;
  } finally {
    s.abort(), $s(t, o);
  }
}, Xw = async (e, t, { signal: n }) => {
  if (t === void 0) {
    const [r] = await Y(e, "message", { signal: n });
    return r;
  }
  for await (const [r] of Wt(e, "message", { signal: n }))
    if (t(r))
      return r;
}, Qw = async (e, t, { signal: n }) => {
  await Y(e, "disconnect", { signal: n }), Oh(t);
}, Zw = async (e, t, { signal: n }) => {
  const [r] = await Y(e, "strict:error", { signal: n });
  throw ws(r, t);
}, eg = ({ anyProcess: e, channel: t, isSubprocess: n, ipc: r }, { reference: o = !0 } = {}) => $a({
  anyProcess: e,
  channel: t,
  isSubprocess: n,
  ipc: r,
  shouldAwait: !n,
  reference: o
}), $a = ({ anyProcess: e, channel: t, isSubprocess: n, ipc: r, shouldAwait: o, reference: i }) => {
  fr({
    methodName: "getEachMessage",
    isSubprocess: n,
    ipc: r,
    isConnected: vs(e)
  }), Ts(t, i);
  const s = Yt(e, t, n), a = new AbortController(), c = {};
  return tg(e, s, a), ng({
    ipcEmitter: s,
    isSubprocess: n,
    controller: a,
    state: c
  }), rg({
    anyProcess: e,
    channel: t,
    ipcEmitter: s,
    isSubprocess: n,
    shouldAwait: o,
    controller: a,
    state: c,
    reference: i
  });
}, tg = async (e, t, n) => {
  try {
    await Y(t, "disconnect", { signal: n.signal }), n.abort();
  } catch {
  }
}, ng = async ({ ipcEmitter: e, isSubprocess: t, controller: n, state: r }) => {
  try {
    const [o] = await Y(e, "strict:error", { signal: n.signal });
    r.error = ws(o, t), n.abort();
  } catch {
  }
}, rg = async function* ({ anyProcess: e, channel: t, ipcEmitter: n, isSubprocess: r, shouldAwait: o, controller: i, state: s, reference: a }) {
  try {
    for await (const [c] of Wt(n, "message", { signal: i.signal }))
      xo(s), yield c;
  } catch {
    xo(s);
  } finally {
    i.abort(), $s(t, a), r || dr(e), o && await e;
  }
}, xo = ({ error: e }) => {
  if (e)
    throw e;
}, og = (e, { ipc: t }) => {
  Object.assign(e, va(e, !1, t));
}, ig = () => {
  const e = G, t = !0, n = G.channel !== void 0;
  return {
    ...va(e, t, n),
    getCancelSignal: im.bind(void 0, {
      anyProcess: e,
      channel: e.channel,
      isSubprocess: t,
      ipc: n
    })
  };
}, va = (e, t, n) => ({
  sendMessage: Ds.bind(void 0, {
    anyProcess: e,
    channel: e.channel,
    isSubprocess: t,
    ipc: n
  }),
  getOneMessage: Jw.bind(void 0, {
    anyProcess: e,
    channel: e.channel,
    isSubprocess: t,
    ipc: n
  }),
  getEachMessage: eg.bind(void 0, {
    anyProcess: e,
    channel: e.channel,
    isSubprocess: t,
    ipc: n
  })
}), sg = ({ error: e, command: t, escapedCommand: n, fileDescriptors: r, options: o, startTime: i, verboseInfo: s }) => {
  la(r);
  const a = new Wo();
  ag(a, r), Object.assign(a, { readable: cg, writable: lg, duplex: ug });
  const c = Er({
    error: e,
    command: t,
    escapedCommand: n,
    fileDescriptors: r,
    options: o,
    startTime: i,
    isSync: !1
  }), u = fg(c, s, o);
  return { subprocess: a, promise: u };
}, ag = (e, t) => {
  const n = Qe(), r = Qe(), o = Qe(), i = Array.from({ length: t.length - 3 }, Qe), s = Qe(), a = [n, r, o, ...i];
  Object.assign(e, {
    stdin: n,
    stdout: r,
    stderr: o,
    all: s,
    stdio: a
  });
}, Qe = () => {
  const e = new Qo();
  return e.end(), e;
}, cg = () => new be({ read() {
} }), lg = () => new jn({ write() {
} }), ug = () => new _n({ read() {
}, write() {
} }), fg = async (e, t, n) => $r(e, t, n), dg = (e, t) => ca(hg, e, t, !1), Ze = ({ type: e, optionName: t }) => {
  throw new TypeError(`The \`${t}\` option cannot be ${Qt[e]}.`);
}, Ro = {
  fileNumber: Ze,
  generator: Io,
  asyncGenerator: Io,
  nodeStream: ({ value: e }) => ({ stream: e }),
  webTransform({ value: { transform: e, writableObjectMode: t, readableObjectMode: n } }) {
    const r = t || n;
    return { stream: _n.fromWeb(e, { objectMode: r }) };
  },
  duplex: ({ value: { transform: e } }) => ({ stream: e }),
  native() {
  }
}, hg = {
  input: {
    ...Ro,
    fileUrl: ({ value: e }) => ({ stream: Lr(e) }),
    filePath: ({ value: { file: e } }) => ({ stream: Lr(e) }),
    webStream: ({ value: e }) => ({ stream: be.fromWeb(e) }),
    iterable: ({ value: e }) => ({ stream: be.from(e) }),
    asyncIterable: ({ value: e }) => ({ stream: be.from(e) }),
    string: ({ value: e }) => ({ stream: be.from(e) }),
    uint8Array: ({ value: e }) => ({ stream: be.from(Bn.from(e)) })
  },
  output: {
    ...Ro,
    fileUrl: ({ value: e }) => ({ stream: Fr(e) }),
    filePath: ({ value: { file: e, append: t } }) => ({ stream: Fr(e, t ? { flags: "a" } : {}) }),
    webStream: ({ value: e }) => ({ stream: jn.fromWeb(e) }),
    iterable: Ze,
    asyncIterable: Ze,
    string: Ze,
    uint8Array: Ze
  }
};
function Rr(e) {
  if (!Array.isArray(e))
    throw new TypeError(`Expected an array, got \`${typeof e}\`.`);
  for (const o of e)
    Rn(o);
  const t = e.some(({ readableObjectMode: o }) => o), n = mg(e, t), r = new pg({
    objectMode: t,
    writableHighWaterMark: n,
    readableHighWaterMark: n
  });
  for (const o of e)
    r.add(o);
  return r;
}
const mg = (e, t) => {
  if (e.length === 0)
    return At(t);
  const n = e.filter(({ readableObjectMode: r }) => r === t).map(({ readableHighWaterMark: r }) => r);
  return Math.max(...n);
};
var me, Ut, Nt, ut, ft, _e;
class pg extends Qo {
  constructor() {
    super(...arguments);
    C(this, me, /* @__PURE__ */ new Set([]));
    C(this, Ut, /* @__PURE__ */ new Set([]));
    C(this, Nt, /* @__PURE__ */ new Set([]));
    C(this, ut);
    C(this, ft, Symbol("unpipe"));
    C(this, _e, /* @__PURE__ */ new WeakMap());
  }
  add(n) {
    if (Rn(n), p(this, me).has(n))
      return;
    p(this, me).add(n), p(this, ut) ?? W(this, ut, yg(this, p(this, me), p(this, ft)));
    const r = Sg({
      passThroughStream: this,
      stream: n,
      streams: p(this, me),
      ended: p(this, Ut),
      aborted: p(this, Nt),
      onFinished: p(this, ut),
      unpipeEvent: p(this, ft)
    });
    p(this, _e).set(n, r), n.pipe(this, { end: !1 });
  }
  async remove(n) {
    if (Rn(n), !p(this, me).has(n))
      return !1;
    const r = p(this, _e).get(n);
    return r === void 0 ? !1 : (p(this, _e).delete(n), n.unpipe(this), await r, !0);
  }
}
me = new WeakMap(), Ut = new WeakMap(), Nt = new WeakMap(), ut = new WeakMap(), ft = new WeakMap(), _e = new WeakMap();
const yg = async (e, t, n) => {
  _t(e, Po);
  const r = new AbortController();
  try {
    await Promise.race([
      wg(e, r),
      gg(e, t, n, r)
    ]);
  } finally {
    r.abort(), _t(e, -Po);
  }
}, wg = async (e, { signal: t }) => {
  try {
    await we(e, { signal: t, cleanup: !0 });
  } catch (n) {
    throw Oa(e, n), n;
  }
}, gg = async (e, t, n, { signal: r }) => {
  for await (const [o] of Wt(e, "unpipe", { signal: r }))
    t.has(o) && o.emit(n);
}, Rn = (e) => {
  if (typeof (e == null ? void 0 : e.pipe) != "function")
    throw new TypeError(`Expected a readable stream, got: \`${typeof e}\`.`);
}, Sg = async ({ passThroughStream: e, stream: t, streams: n, ended: r, aborted: o, onFinished: i, unpipeEvent: s }) => {
  _t(e, Ao);
  const a = new AbortController();
  try {
    await Promise.race([
      bg(i, t, a),
      Eg({
        passThroughStream: e,
        stream: t,
        streams: n,
        ended: r,
        aborted: o,
        controller: a
      }),
      Tg({
        stream: t,
        streams: n,
        ended: r,
        aborted: o,
        unpipeEvent: s,
        controller: a
      })
    ]);
  } finally {
    a.abort(), _t(e, -Ao);
  }
  n.size > 0 && n.size === r.size + o.size && (r.size === 0 && o.size > 0 ? Pr(e) : $g(e));
}, bg = async (e, t, { signal: n }) => {
  try {
    await e, n.aborted || Pr(t);
  } catch (r) {
    n.aborted || Oa(t, r);
  }
}, Eg = async ({ passThroughStream: e, stream: t, streams: n, ended: r, aborted: o, controller: { signal: i } }) => {
  try {
    await we(t, {
      signal: i,
      cleanup: !0,
      readable: !0,
      writable: !1
    }), n.has(t) && r.add(t);
  } catch (s) {
    if (i.aborted || !n.has(t))
      return;
    Da(s) ? o.add(t) : Ia(e, s);
  }
}, Tg = async ({ stream: e, streams: t, ended: n, aborted: r, unpipeEvent: o, controller: { signal: i } }) => {
  if (await Y(e, o, { signal: i }), !e.readable)
    return Y(i, "abort", { signal: i });
  t.delete(e), n.delete(e), r.delete(e);
}, $g = (e) => {
  e.writable && e.end();
}, Oa = (e, t) => {
  Da(t) ? Pr(e) : Ia(e, t);
}, Da = (e) => (e == null ? void 0 : e.code) === "ERR_STREAM_PREMATURE_CLOSE", Pr = (e) => {
  (e.readable || e.writable) && e.destroy();
}, Ia = (e, t) => {
  e.destroyed || (e.once("error", vg), e.destroy(t));
}, vg = () => {
}, _t = (e, t) => {
  const n = e.getMaxListeners();
  n !== 0 && n !== Number.POSITIVE_INFINITY && e.setMaxListeners(n + t);
}, Po = 2, Ao = 1, jt = (e, t) => {
  e.pipe(t), Og(e, t), Dg(e, t);
}, Og = async (e, t) => {
  if (!(ve(e) || ve(t))) {
    try {
      await we(e, { cleanup: !0, readable: !0, writable: !1 });
    } catch {
    }
    xa(t);
  }
}, xa = (e) => {
  e.writable && e.end();
}, Dg = async (e, t) => {
  if (!(ve(e) || ve(t))) {
    try {
      await we(t, { cleanup: !0, readable: !1, writable: !0 });
    } catch {
    }
    Ra(e);
  }
}, Ra = (e) => {
  e.readable && e.destroy();
}, Ig = (e, t, n) => {
  const r = /* @__PURE__ */ new Map();
  for (const [o, { stdioItems: i, direction: s }] of Object.entries(t)) {
    for (const { stream: a } of i.filter(({ type: c }) => De.has(c)))
      xg(e, a, s, o);
    for (const { stream: a } of i.filter(({ type: c }) => !De.has(c)))
      Pg({
        subprocess: e,
        stream: a,
        direction: s,
        fdNumber: o,
        pipeGroups: r,
        controller: n
      });
  }
  for (const [o, i] of r.entries()) {
    const s = i.length === 1 ? i[0] : Rr(i);
    jt(s, o);
  }
}, xg = (e, t, n, r) => {
  n === "output" ? jt(e.stdio[r], t) : jt(t, e.stdio[r]);
  const o = Rg[r];
  o !== void 0 && (e[o] = t), e.stdio[r] = t;
}, Rg = ["stdin", "stdout", "stderr"], Pg = ({ subprocess: e, stream: t, direction: n, fdNumber: r, pipeGroups: o, controller: i }) => {
  if (t === void 0)
    return;
  Ag(t, i);
  const [s, a] = n === "output" ? [t, e.stdio[r]] : [e.stdio[r], t], c = o.get(s) ?? [];
  o.set(s, [...c, a]);
}, Ag = (e, { signal: t }) => {
  ve(e) && Mt(e, Cg, t);
}, Cg = 2, ke = [];
ke.push("SIGHUP", "SIGINT", "SIGTERM");
process.platform !== "win32" && ke.push(
  "SIGALRM",
  "SIGABRT",
  "SIGVTALRM",
  "SIGXCPU",
  "SIGXFSZ",
  "SIGUSR2",
  "SIGTRAP",
  "SIGSYS",
  "SIGQUIT",
  "SIGIOT"
  // should detect profiler and enable/disable accordingly.
  // see #21
  // 'SIGPROF'
);
process.platform === "linux" && ke.push("SIGIO", "SIGPOLL", "SIGPWR", "SIGSTKFLT");
const Pt = (e) => !!e && typeof e == "object" && typeof e.removeListener == "function" && typeof e.emit == "function" && typeof e.reallyExit == "function" && typeof e.listeners == "function" && typeof e.kill == "function" && typeof e.pid == "number" && typeof e.on == "function", fn = Symbol.for("signal-exit emitter"), dn = globalThis, Fg = Object.defineProperty.bind(Object);
class Lg {
  constructor() {
    Ae(this, "emitted", {
      afterExit: !1,
      exit: !1
    });
    Ae(this, "listeners", {
      afterExit: [],
      exit: []
    });
    Ae(this, "count", 0);
    Ae(this, "id", Math.random());
    if (dn[fn])
      return dn[fn];
    Fg(dn, fn, {
      value: this,
      writable: !1,
      enumerable: !1,
      configurable: !1
    });
  }
  on(t, n) {
    this.listeners[t].push(n);
  }
  removeListener(t, n) {
    const r = this.listeners[t], o = r.indexOf(n);
    o !== -1 && (o === 0 && r.length === 1 ? r.length = 0 : r.splice(o, 1));
  }
  emit(t, n, r) {
    if (this.emitted[t])
      return !1;
    this.emitted[t] = !0;
    let o = !1;
    for (const i of this.listeners[t])
      o = i(n, r) === !0 || o;
    return t === "exit" && (o = this.emit("afterExit", n, r) || o), o;
  }
}
class Pa {
}
const Mg = (e) => ({
  onExit(t, n) {
    return e.onExit(t, n);
  },
  load() {
    return e.load();
  },
  unload() {
    return e.unload();
  }
});
class kg extends Pa {
  onExit() {
    return () => {
    };
  }
  load() {
  }
  unload() {
  }
}
var Gt, J, P, je, Be, Ee, pe, He, Aa, Ca;
class _g extends Pa {
  constructor(n) {
    super();
    C(this, He);
    // "SIGHUP" throws an `ENOSYS` error on Windows,
    // so use a supported signal instead
    /* c8 ignore start */
    C(this, Gt, Pn.platform === "win32" ? "SIGINT" : "SIGHUP");
    /* c8 ignore stop */
    C(this, J, new Lg());
    C(this, P);
    C(this, je);
    C(this, Be);
    C(this, Ee, {});
    C(this, pe, !1);
    W(this, P, n), W(this, Ee, {});
    for (const r of ke)
      p(this, Ee)[r] = () => {
        const o = p(this, P).listeners(r);
        let { count: i } = p(this, J);
        const s = n;
        if (typeof s.__signal_exit_emitter__ == "object" && typeof s.__signal_exit_emitter__.count == "number" && (i += s.__signal_exit_emitter__.count), o.length === i) {
          this.unload();
          const a = p(this, J).emit("exit", null, r), c = r === "SIGHUP" ? p(this, Gt) : r;
          a || n.kill(n.pid, c);
        }
      };
    W(this, Be, n.reallyExit), W(this, je, n.emit);
  }
  onExit(n, r) {
    if (!Pt(p(this, P)))
      return () => {
      };
    p(this, pe) === !1 && this.load();
    const o = r != null && r.alwaysLast ? "afterExit" : "exit";
    return p(this, J).on(o, n), () => {
      p(this, J).removeListener(o, n), p(this, J).listeners.exit.length === 0 && p(this, J).listeners.afterExit.length === 0 && this.unload();
    };
  }
  load() {
    if (!p(this, pe)) {
      W(this, pe, !0), p(this, J).count += 1;
      for (const n of ke)
        try {
          const r = p(this, Ee)[n];
          r && p(this, P).on(n, r);
        } catch {
        }
      p(this, P).emit = (n, ...r) => Xe(this, He, Ca).call(this, n, ...r), p(this, P).reallyExit = (n) => Xe(this, He, Aa).call(this, n);
    }
  }
  unload() {
    p(this, pe) && (W(this, pe, !1), ke.forEach((n) => {
      const r = p(this, Ee)[n];
      if (!r)
        throw new Error("Listener not defined for signal: " + n);
      try {
        p(this, P).removeListener(n, r);
      } catch {
      }
    }), p(this, P).emit = p(this, je), p(this, P).reallyExit = p(this, Be), p(this, J).count -= 1);
  }
}
Gt = new WeakMap(), J = new WeakMap(), P = new WeakMap(), je = new WeakMap(), Be = new WeakMap(), Ee = new WeakMap(), pe = new WeakMap(), He = new WeakSet(), Aa = function(n) {
  return Pt(p(this, P)) ? (p(this, P).exitCode = n || 0, p(this, J).emit("exit", p(this, P).exitCode, null), p(this, Be).call(p(this, P), p(this, P).exitCode)) : 0;
}, Ca = function(n, ...r) {
  const o = p(this, je);
  if (n === "exit" && Pt(p(this, P))) {
    typeof r[0] == "number" && (p(this, P).exitCode = r[0]);
    const i = o.call(p(this, P), n, ...r);
    return p(this, J).emit("exit", p(this, P).exitCode, null), i;
  } else
    return o.call(p(this, P), n, ...r);
};
const Pn = globalThis.process, {
  /**
   * Called when the process is exiting, whether via signal, explicit
   * exit, or running out of stuff to do.
   *
   * If the global process object is not suitable for instrumentation,
   * then this will be a no-op.
   *
   * Returns a function that may be used to unload signal-exit.
   */
  onExit: jg
} = Mg(Pt(Pn) ? new _g(Pn) : new kg()), Bg = (e, { cleanup: t, detached: n }, { signal: r }) => {
  if (!t || n)
    return;
  const o = jg(() => {
    e.kill();
  });
  Xo(r, () => {
    o();
  });
}, Ug = ({ source: e, sourcePromise: t, boundOptions: n, createNested: r }, ...o) => {
  const i = Yi(), {
    destination: s,
    destinationStream: a,
    destinationError: c,
    from: u,
    unpipeSignal: l
  } = Ng(n, r, o), { sourceStream: f, sourceError: d } = Wg(e, u), { options: h, fileDescriptors: m } = Oe.get(e);
  return {
    sourcePromise: t,
    sourceStream: f,
    sourceOptions: h,
    sourceError: d,
    destination: s,
    destinationStream: a,
    destinationError: c,
    unpipeSignal: l,
    fileDescriptors: m,
    startTime: i
  };
}, Ng = (e, t, n) => {
  try {
    const {
      destination: r,
      pipeOptions: { from: o, to: i, unpipeSignal: s } = {}
    } = Gg(e, t, ...n), a = gs(r, i);
    return {
      destination: r,
      destinationStream: a,
      from: o,
      unpipeSignal: s
    };
  } catch (r) {
    return { destinationError: r };
  }
}, Gg = (e, t, n, ...r) => {
  if (Array.isArray(n))
    return { destination: t(Co, e)(n, ...r), pipeOptions: e };
  if (typeof n == "string" || n instanceof URL || Li(n)) {
    if (Object.keys(e).length > 0)
      throw new TypeError('Please use .pipe("file", ..., options) or .pipe(execa("file", ..., options)) instead of .pipe(options)("file", ...).');
    const [o, i, s] = ki(n, ...r);
    return { destination: t(Co)(o, i, s), pipeOptions: s };
  }
  if (Oe.has(n)) {
    if (Object.keys(e).length > 0)
      throw new TypeError("Please use .pipe(options)`command` or .pipe($(options)`command`) instead of .pipe(options)($`command`).");
    return { destination: n, pipeOptions: r[0] };
  }
  throw new TypeError(`The first argument must be a template string, an options object, or an Execa subprocess: ${n}`);
}, Co = ({ options: e }) => ({ options: { ...e, stdin: "pipe", piped: !0 } }), Wg = (e, t) => {
  try {
    return { sourceStream: hr(e, t) };
  } catch (n) {
    return { sourceError: n };
  }
}, zg = ({
  sourceStream: e,
  sourceError: t,
  destinationStream: n,
  destinationError: r,
  fileDescriptors: o,
  sourceOptions: i,
  startTime: s
}) => {
  const a = Vg({
    sourceStream: e,
    sourceError: t,
    destinationStream: n,
    destinationError: r
  });
  if (a !== void 0)
    throw Fa({
      error: a,
      fileDescriptors: o,
      sourceOptions: i,
      startTime: s
    });
}, Vg = ({ sourceStream: e, sourceError: t, destinationStream: n, destinationError: r }) => {
  if (t !== void 0 && r !== void 0)
    return r;
  if (r !== void 0)
    return Ra(e), r;
  if (t !== void 0)
    return xa(n), t;
}, Fa = ({ error: e, fileDescriptors: t, sourceOptions: n, startTime: r }) => Er({
  error: e,
  command: Fo,
  escapedCommand: Fo,
  fileDescriptors: t,
  options: n,
  startTime: r,
  isSync: !1
}), Fo = "source.pipe(destination)", Hg = async (e) => {
  const [
    { status: t, reason: n, value: r = n },
    { status: o, reason: i, value: s = i }
  ] = await e;
  if (s.pipedFrom.includes(r) || s.pipedFrom.push(r), o === "rejected")
    throw s;
  if (t === "rejected")
    throw r;
  return s;
}, qg = (e, t, n) => {
  const r = Zt.has(t) ? Jg(e, t) : Yg(e, t);
  return Mt(e, Xg, n.signal), Mt(t, Qg, n.signal), Kg(t), r;
}, Yg = (e, t) => {
  const n = Rr([e]);
  return jt(n, t), Zt.set(t, n), n;
}, Jg = (e, t) => {
  const n = Zt.get(t);
  return n.add(e), n;
}, Kg = async (e) => {
  try {
    await we(e, { cleanup: !0, readable: !1, writable: !0 });
  } catch {
  }
  Zt.delete(e);
}, Zt = /* @__PURE__ */ new WeakMap(), Xg = 2, Qg = 1, Zg = (e, t) => e === void 0 ? [] : [eS(e, t)], eS = async (e, { sourceStream: t, mergedStream: n, fileDescriptors: r, sourceOptions: o, startTime: i }) => {
  await Sc(e, t), await n.remove(t);
  const s = new Error("Pipe canceled by `unpipeSignal` option.");
  throw Fa({
    error: s,
    fileDescriptors: r,
    sourceOptions: o,
    startTime: i
  });
}, An = (e, ...t) => {
  if (X(t[0]))
    return An.bind(void 0, {
      ...e,
      boundOptions: { ...e.boundOptions, ...t[0] }
    });
  const { destination: n, ...r } = Ug(e, ...t), o = tS({ ...r, destination: n });
  return o.pipe = An.bind(void 0, {
    ...e,
    source: n,
    sourcePromise: o,
    boundOptions: {}
  }), o;
}, tS = async ({
  sourcePromise: e,
  sourceStream: t,
  sourceOptions: n,
  sourceError: r,
  destination: o,
  destinationStream: i,
  destinationError: s,
  unpipeSignal: a,
  fileDescriptors: c,
  startTime: u
}) => {
  const l = nS(e, o);
  zg({
    sourceStream: t,
    sourceError: r,
    destinationStream: i,
    destinationError: s,
    fileDescriptors: c,
    sourceOptions: n,
    startTime: u
  });
  const f = new AbortController();
  try {
    const d = qg(t, i, f);
    return await Promise.race([
      Hg(l),
      ...Zg(a, {
        sourceStream: t,
        mergedStream: d,
        sourceOptions: n,
        fileDescriptors: c,
        startTime: u
      })
    ]);
  } finally {
    f.abort();
  }
}, nS = (e, t) => Promise.allSettled([e, t]), La = ({ subprocessStdout: e, subprocess: t, binary: n, shouldEncode: r, encoding: o, preserveNewlines: i }) => {
  const s = new AbortController();
  return rS(t, s), ka({
    stream: e,
    controller: s,
    binary: n,
    shouldEncode: !e.readableObjectMode && r,
    encoding: o,
    shouldSplit: !e.readableObjectMode,
    preserveNewlines: i
  });
}, rS = async (e, t) => {
  try {
    await e;
  } catch {
  } finally {
    t.abort();
  }
}, Ma = ({ stream: e, onStreamEnd: t, lines: n, encoding: r, stripFinalNewline: o, allMixed: i }) => {
  const s = new AbortController();
  oS(t, s, e);
  const a = e.readableObjectMode && !i;
  return ka({
    stream: e,
    controller: s,
    binary: r === "buffer",
    shouldEncode: !a,
    encoding: r,
    shouldSplit: !a && n,
    preserveNewlines: !o
  });
}, oS = async (e, t, n) => {
  try {
    await e;
  } catch {
    n.destroy();
  } finally {
    t.abort();
  }
}, ka = ({ stream: e, controller: t, binary: n, shouldEncode: r, encoding: o, shouldSplit: i, preserveNewlines: s }) => {
  const a = Wt(e, "data", {
    signal: t.signal,
    highWaterMark: Lo,
    // Backward compatibility with older name for this option
    // See https://github.com/nodejs/node/pull/52080#discussion_r1525227861
    // @todo Remove after removing support for Node 21
    highWatermark: Lo
  });
  return iS({
    onStdoutChunk: a,
    controller: t,
    binary: n,
    shouldEncode: r,
    encoding: o,
    shouldSplit: i,
    preserveNewlines: s
  });
}, _a = At(!0), Lo = _a, iS = async function* ({ onStdoutChunk: e, controller: t, binary: n, shouldEncode: r, encoding: o, shouldSplit: i, preserveNewlines: s }) {
  const a = sS({
    binary: n,
    shouldEncode: r,
    encoding: o,
    shouldSplit: i,
    preserveNewlines: s
  });
  try {
    for await (const [c] of e)
      yield* wt(c, a, 0);
  } catch (c) {
    if (!t.signal.aborted)
      throw c;
  } finally {
    yield* xr(a);
  }
}, sS = ({ binary: e, shouldEncode: t, encoding: n, shouldSplit: r, preserveNewlines: o }) => [
  ya(e, n, !t),
  da(e, o, !r, {})
].filter(Boolean), aS = async ({ stream: e, onStreamEnd: t, fdNumber: n, encoding: r, buffer: o, maxBuffer: i, lines: s, allMixed: a, stripFinalNewline: c, verboseInfo: u, streamInfo: l }) => {
  const f = cS({
    stream: e,
    onStreamEnd: t,
    fdNumber: n,
    encoding: r,
    allMixed: a,
    verboseInfo: u,
    streamInfo: l
  });
  if (!o) {
    await Promise.all([lS(e), f]);
    return;
  }
  const d = fa(c, n), h = Ma({
    stream: e,
    onStreamEnd: t,
    lines: s,
    encoding: r,
    stripFinalNewline: d,
    allMixed: a
  }), [m] = await Promise.all([
    uS({
      stream: e,
      iterable: h,
      fdNumber: n,
      encoding: r,
      maxBuffer: i,
      lines: s
    }),
    f
  ]);
  return m;
}, cS = async ({ stream: e, onStreamEnd: t, fdNumber: n, encoding: r, allMixed: o, verboseInfo: i, streamInfo: { fileDescriptors: s } }) => {
  var c;
  if (!Sa({
    stdioItems: (c = s[n]) == null ? void 0 : c.stdioItems,
    encoding: r,
    verboseInfo: i,
    fdNumber: n
  }))
    return;
  const a = Ma({
    stream: e,
    onStreamEnd: t,
    lines: !0,
    encoding: r,
    stripFinalNewline: !0,
    allMixed: o
  });
  await Ow(a, e, n, i);
}, lS = async (e) => {
  await Oc(), e.readableFlowing === null && e.resume();
}, uS = async ({ stream: e, stream: { readableObjectMode: t }, iterable: n, fdNumber: r, encoding: o, maxBuffer: i, lines: s }) => {
  try {
    return t || s ? await Wm(n, { maxBuffer: i }) : o === "buffer" ? new Uint8Array(await Ym(n, { maxBuffer: i })) : await op(n, { maxBuffer: i });
  } catch (a) {
    return ja(up({
      error: a,
      stream: e,
      readableObjectMode: t,
      lines: s,
      encoding: o,
      fdNumber: r
    }));
  }
}, Mo = async (e) => {
  try {
    return await e;
  } catch (t) {
    return ja(t);
  }
}, ja = ({ bufferedData: e }) => of(e) ? new Uint8Array(e) : e, Ar = async (e, t, n, { isSameDirection: r, stopOnExit: o = !1 } = {}) => {
  const i = fS(e, n), s = new AbortController();
  try {
    await Promise.race([
      ...o ? [n.exitPromise] : [],
      we(e, { cleanup: !0, signal: s.signal })
    ]);
  } catch (a) {
    i.stdinCleanedUp || mS(a, t, n, r);
  } finally {
    s.abort();
  }
}, fS = (e, { originalStreams: [t], subprocess: n }) => {
  const r = { stdinCleanedUp: !1 };
  return e === t && dS(e, n, r), r;
}, dS = (e, t, n) => {
  const { _destroy: r } = e;
  e._destroy = (...o) => {
    hS(t, n), r.call(e, ...o);
  };
}, hS = ({ exitCode: e, signalCode: t }, n) => {
  (e !== null || t !== null) && (n.stdinCleanedUp = !0);
}, mS = (e, t, n, r) => {
  if (!pS(e, t, n, r))
    throw e;
}, pS = (e, t, n, r = !0) => n.propagating ? ko(e) || Cn(e) : (n.propagating = !0, Ba(n, t) === r ? ko(e) : Cn(e)), Ba = ({ fileDescriptors: e }, t) => t !== "all" && e[t].direction === "input", Cn = (e) => (e == null ? void 0 : e.code) === "ERR_STREAM_PREMATURE_CLOSE", ko = (e) => (e == null ? void 0 : e.code) === "EPIPE", yS = ({ subprocess: e, encoding: t, buffer: n, maxBuffer: r, lines: o, stripFinalNewline: i, verboseInfo: s, streamInfo: a }) => e.stdio.map((c, u) => Ua({
  stream: c,
  fdNumber: u,
  encoding: t,
  buffer: n[u],
  maxBuffer: r[u],
  lines: o[u],
  allMixed: !1,
  stripFinalNewline: i,
  verboseInfo: s,
  streamInfo: a
})), Ua = async ({ stream: e, fdNumber: t, encoding: n, buffer: r, maxBuffer: o, lines: i, allMixed: s, stripFinalNewline: a, verboseInfo: c, streamInfo: u }) => {
  if (!e)
    return;
  const l = Ar(e, t, u);
  if (Ba(u, t)) {
    await l;
    return;
  }
  const [f] = await Promise.all([
    aS({
      stream: e,
      onStreamEnd: l,
      fdNumber: t,
      encoding: n,
      buffer: r,
      maxBuffer: o,
      lines: i,
      allMixed: s,
      stripFinalNewline: a,
      verboseInfo: c,
      streamInfo: u
    }),
    l
  ]);
  return f;
}, wS = ({ stdout: e, stderr: t }, { all: n }) => n && (e || t) ? Rr([e, t].filter(Boolean)) : void 0, gS = ({ subprocess: e, encoding: t, buffer: n, maxBuffer: r, lines: o, stripFinalNewline: i, verboseInfo: s, streamInfo: a }) => Ua({
  ...SS(e, n),
  fdNumber: "all",
  encoding: t,
  maxBuffer: r[1] + r[2],
  lines: o[1] || o[2],
  allMixed: bS(e),
  stripFinalNewline: i,
  verboseInfo: s,
  streamInfo: a
}), SS = ({ stdout: e, stderr: t, all: n }, [, r, o]) => {
  const i = r || o;
  return i ? r ? o ? { stream: n, buffer: i } : { stream: e, buffer: i } : { stream: t, buffer: i } : { stream: n, buffer: i };
}, bS = ({ all: e, stdout: t, stderr: n }) => e && t && n && t.readableObjectMode !== n.readableObjectMode, ES = (e) => Qn(e, "ipc"), TS = (e, t) => {
  const n = qi(e);
  mt({
    type: "ipc",
    verboseMessage: n,
    fdNumber: "ipc",
    verboseInfo: t
  });
}, $S = async ({
  subprocess: e,
  buffer: t,
  maxBuffer: n,
  ipc: r,
  ipcOutput: o,
  verboseInfo: i
}) => {
  if (!r)
    return o;
  const s = ES(i), a = ct(t, "ipc"), c = ct(n, "ipc");
  for await (const u of $a({
    anyProcess: e,
    channel: e.channel,
    isSubprocess: !1,
    ipc: r,
    shouldAwait: !1,
    reference: !0
  }))
    a && (dp(e, o, c), o.push(u)), s && TS(u, i);
  return o;
}, vS = async (e, t) => (await Promise.allSettled([e]), t), OS = async ({
  subprocess: e,
  options: {
    encoding: t,
    buffer: n,
    maxBuffer: r,
    lines: o,
    timeoutDuration: i,
    cancelSignal: s,
    gracefulCancel: a,
    forceKillAfterDelay: c,
    stripFinalNewline: u,
    ipc: l,
    ipcInput: f
  },
  context: d,
  verboseInfo: h,
  fileDescriptors: m,
  originalStreams: y,
  onInternalError: g,
  controller: S
}) => {
  const E = Mw(e, d), v = {
    originalStreams: y,
    fileDescriptors: m,
    subprocess: e,
    exitPromise: E,
    propagating: !1
  }, M = yS({
    subprocess: e,
    encoding: t,
    buffer: n,
    maxBuffer: r,
    lines: o,
    stripFinalNewline: u,
    verboseInfo: h,
    streamInfo: v
  }), K = gS({
    subprocess: e,
    encoding: t,
    buffer: n,
    maxBuffer: r,
    lines: o,
    stripFinalNewline: u,
    verboseInfo: h,
    streamInfo: v
  }), Q = [], ce = $S({
    subprocess: e,
    buffer: n,
    maxBuffer: r,
    ipc: l,
    ipcOutput: Q,
    verboseInfo: h
  }), ne = DS(y, e, v), w = IS(m, v);
  try {
    return await Promise.race([
      Promise.all([
        {},
        _w(E),
        Promise.all(M),
        K,
        ce,
        Em(e, f),
        ...ne,
        ...w
      ]),
      g,
      xS(e, S),
      ...hm(e, i, d, S),
      ...Th({
        subprocess: e,
        cancelSignal: s,
        gracefulCancel: a,
        context: d,
        controller: S
      }),
      ...lm({
        subprocess: e,
        cancelSignal: s,
        gracefulCancel: a,
        forceKillAfterDelay: c,
        context: d,
        controller: S
      })
    ]);
  } catch ($) {
    return d.terminationReason ?? (d.terminationReason = "other"), Promise.all([
      { error: $ },
      E,
      Promise.all(M.map((b) => Mo(b))),
      Mo(K),
      vS(ce, Q),
      Promise.allSettled(ne),
      Promise.allSettled(w)
    ]);
  }
}, DS = (e, t, n) => e.map((r, o) => r === t.stdio[o] ? void 0 : Ar(r, o, n)), IS = (e, t) => e.flatMap(({ stdioItems: n }, r) => n.filter(({ value: o, stream: i = o }) => Re(i, { checkOpen: !1 }) && !ve(i)).map(({ type: o, value: i, stream: s = i }) => Ar(s, r, t, {
  isSameDirection: De.has(o),
  stopOnExit: o === "native"
}))), xS = async (e, { signal: t }) => {
  const [n] = await Y(e, "error", { signal: t });
  throw n;
}, RS = () => ({
  readableDestroy: /* @__PURE__ */ new WeakMap(),
  writableFinal: /* @__PURE__ */ new WeakMap(),
  writableDestroy: /* @__PURE__ */ new WeakMap()
}), Fn = (e, t, n) => {
  const r = e[n];
  r.has(t) || r.set(t, []);
  const o = r.get(t), i = yt();
  return o.push(i), { resolve: i.resolve.bind(i), promises: o };
}, Bt = async ({ resolve: e, promises: t }, n) => {
  e();
  const [r] = await Promise.race([
    Promise.allSettled([!0, n]),
    Promise.all([!1, ...t])
  ]);
  return !r;
}, _o = async (e) => {
  if (e !== void 0)
    try {
      await Na(e);
    } catch {
    }
}, PS = async (e) => {
  if (e !== void 0)
    try {
      await Ga(e);
    } catch {
    }
}, Na = async (e) => {
  await we(e, { cleanup: !0, readable: !1, writable: !0 });
}, Ga = async (e) => {
  await we(e, { cleanup: !0, readable: !0, writable: !1 });
}, Wa = async (e, t) => {
  if (await e, t)
    throw t;
}, za = (e, t, n) => {
  n && !Cn(n) ? e.destroy(n) : t && e.destroy();
}, AS = ({ subprocess: e, concurrentStreams: t, encoding: n }, { from: r, binary: o = !0, preserveNewlines: i = !0 } = {}) => {
  const s = o || xe.has(n), { subprocessStdout: a, waitReadableDestroy: c } = Va(e, r, t), { readableEncoding: u, readableObjectMode: l, readableHighWaterMark: f } = Ha(a, s), { read: d, onStdoutDataDone: h } = qa({
    subprocessStdout: a,
    subprocess: e,
    binary: s,
    encoding: n,
    preserveNewlines: i
  }), m = new be({
    read: d,
    destroy: qe(Ja.bind(void 0, { subprocessStdout: a, subprocess: e, waitReadableDestroy: c })),
    highWaterMark: f,
    objectMode: l,
    encoding: u
  });
  return Ya({
    subprocessStdout: a,
    onStdoutDataDone: h,
    readable: m,
    subprocess: e
  }), m;
}, Va = (e, t, n) => {
  const r = hr(e, t), o = Fn(n, r, "readableDestroy");
  return { subprocessStdout: r, waitReadableDestroy: o };
}, Ha = ({ readableEncoding: e, readableObjectMode: t, readableHighWaterMark: n }, r) => r ? { readableEncoding: e, readableObjectMode: t, readableHighWaterMark: n } : { readableEncoding: e, readableObjectMode: !0, readableHighWaterMark: _a }, qa = ({ subprocessStdout: e, subprocess: t, binary: n, encoding: r, preserveNewlines: o }) => {
  const i = yt(), s = La({
    subprocessStdout: e,
    subprocess: t,
    binary: n,
    shouldEncode: !n,
    encoding: r,
    preserveNewlines: o
  });
  return {
    read() {
      CS(this, s, i);
    },
    onStdoutDataDone: i
  };
}, CS = async (e, t, n) => {
  try {
    const { value: r, done: o } = await t.next();
    o ? n.resolve() : e.push(r);
  } catch {
  }
}, Ya = async ({ subprocessStdout: e, onStdoutDataDone: t, readable: n, subprocess: r, subprocessStdin: o }) => {
  try {
    await Ga(e), await r, await _o(o), await t, n.readable && n.push(null);
  } catch (i) {
    await _o(o), Ka(n, i);
  }
}, Ja = async ({ subprocessStdout: e, subprocess: t, waitReadableDestroy: n }, r) => {
  await Bt(n, t) && (Ka(e, r), await Wa(t, r));
}, Ka = (e, t) => {
  za(e, e.readable, t);
}, FS = ({ subprocess: e, concurrentStreams: t }, { to: n } = {}) => {
  const { subprocessStdin: r, waitWritableFinal: o, waitWritableDestroy: i } = Xa(e, n, t), s = new jn({
    ...Qa(r, e, o),
    destroy: qe(ec.bind(void 0, {
      subprocessStdin: r,
      subprocess: e,
      waitWritableFinal: o,
      waitWritableDestroy: i
    })),
    highWaterMark: r.writableHighWaterMark,
    objectMode: r.writableObjectMode
  });
  return Za(r, s), s;
}, Xa = (e, t, n) => {
  const r = gs(e, t), o = Fn(n, r, "writableFinal"), i = Fn(n, r, "writableDestroy");
  return { subprocessStdin: r, waitWritableFinal: o, waitWritableDestroy: i };
}, Qa = (e, t, n) => ({
  write: LS.bind(void 0, e),
  final: qe(MS.bind(void 0, e, t, n))
}), LS = (e, t, n, r) => {
  e.write(t, n) ? r() : e.once("drain", r);
}, MS = async (e, t, n) => {
  await Bt(n, t) && (e.writable && e.end(), await t);
}, Za = async (e, t, n) => {
  try {
    await Na(e), t.writable && t.end();
  } catch (r) {
    await PS(n), tc(t, r);
  }
}, ec = async ({ subprocessStdin: e, subprocess: t, waitWritableFinal: n, waitWritableDestroy: r }, o) => {
  await Bt(n, t), await Bt(r, t) && (tc(e, o), await Wa(t, o));
}, tc = (e, t) => {
  za(e, e.writable, t);
}, kS = ({ subprocess: e, concurrentStreams: t, encoding: n }, { from: r, to: o, binary: i = !0, preserveNewlines: s = !0 } = {}) => {
  const a = i || xe.has(n), { subprocessStdout: c, waitReadableDestroy: u } = Va(e, r, t), { subprocessStdin: l, waitWritableFinal: f, waitWritableDestroy: d } = Xa(e, o, t), { readableEncoding: h, readableObjectMode: m, readableHighWaterMark: y } = Ha(c, a), { read: g, onStdoutDataDone: S } = qa({
    subprocessStdout: c,
    subprocess: e,
    binary: a,
    encoding: n,
    preserveNewlines: s
  }), E = new _n({
    read: g,
    ...Qa(l, e, f),
    destroy: qe(_S.bind(void 0, {
      subprocessStdout: c,
      subprocessStdin: l,
      subprocess: e,
      waitReadableDestroy: u,
      waitWritableFinal: f,
      waitWritableDestroy: d
    })),
    readableHighWaterMark: y,
    writableHighWaterMark: l.writableHighWaterMark,
    readableObjectMode: m,
    writableObjectMode: l.writableObjectMode,
    encoding: h
  });
  return Ya({
    subprocessStdout: c,
    onStdoutDataDone: S,
    readable: E,
    subprocess: e,
    subprocessStdin: l
  }), Za(l, E, c), E;
}, _S = async ({ subprocessStdout: e, subprocessStdin: t, subprocess: n, waitReadableDestroy: r, waitWritableFinal: o, waitWritableDestroy: i }, s) => {
  await Promise.all([
    Ja({ subprocessStdout: e, subprocess: n, waitReadableDestroy: r }, s),
    ec({
      subprocessStdin: t,
      subprocess: n,
      waitWritableFinal: o,
      waitWritableDestroy: i
    }, s)
  ]);
}, jo = (e, t, {
  from: n,
  binary: r = !1,
  preserveNewlines: o = !1
} = {}) => {
  const i = r || xe.has(t), s = hr(e, n), a = La({
    subprocessStdout: s,
    subprocess: e,
    binary: i,
    shouldEncode: !0,
    encoding: t,
    preserveNewlines: o
  });
  return jS(a, s, e);
}, jS = async function* (e, t, n) {
  try {
    yield* e;
  } finally {
    t.readable && t.destroy(), await n;
  }
}, BS = (e, { encoding: t }) => {
  const n = RS();
  e.readable = AS.bind(void 0, { subprocess: e, concurrentStreams: n, encoding: t }), e.writable = FS.bind(void 0, { subprocess: e, concurrentStreams: n }), e.duplex = kS.bind(void 0, { subprocess: e, concurrentStreams: n, encoding: t }), e.iterable = jo.bind(void 0, e, t), e[Symbol.asyncIterator] = jo.bind(void 0, e, t, {});
}, US = (e, t) => {
  for (const [n, r] of GS) {
    const o = r.value.bind(t);
    Reflect.defineProperty(e, n, { ...r, value: o });
  }
}, NS = (async () => {
})().constructor.prototype, GS = ["then", "catch", "finally"].map((e) => [
  e,
  Reflect.getOwnPropertyDescriptor(NS, e)
]), WS = (e, t, n, r) => {
  const { file: o, commandArguments: i, command: s, escapedCommand: a, startTime: c, verboseInfo: u, options: l, fileDescriptors: f } = zS(e, t, n), { subprocess: d, promise: h } = HS({
    file: o,
    commandArguments: i,
    options: l,
    startTime: c,
    verboseInfo: u,
    command: s,
    escapedCommand: a,
    fileDescriptors: f
  });
  return d.pipe = An.bind(void 0, {
    source: d,
    sourcePromise: h,
    boundOptions: {},
    createNested: r
  }), US(d, h), Oe.set(d, { options: l, fileDescriptors: f }), d;
}, zS = (e, t, n) => {
  const { command: r, escapedCommand: o, startTime: i, verboseInfo: s } = Ki(e, t, n), { file: a, commandArguments: c, options: u } = As(e, t, n), l = VS(u), f = dg(l, s);
  return {
    file: a,
    commandArguments: c,
    command: r,
    escapedCommand: o,
    startTime: i,
    verboseInfo: s,
    options: l,
    fileDescriptors: f
  };
}, VS = ({ timeout: e, signal: t, ...n }) => {
  if (t !== void 0)
    throw new TypeError('The "signal" option has been renamed to "cancelSignal" instead.');
  return { ...n, timeoutDuration: e };
}, HS = ({ file: e, commandArguments: t, options: n, startTime: r, verboseInfo: o, command: i, escapedCommand: s, fileDescriptors: a }) => {
  let c;
  try {
    c = yc(...Cs(e, t, n));
  } catch (m) {
    return sg({
      error: m,
      command: i,
      escapedCommand: s,
      fileDescriptors: a,
      options: n,
      startTime: r,
      verboseInfo: o
    });
  }
  const u = new AbortController();
  Ic(Number.POSITIVE_INFINITY, u.signal);
  const l = [...c.stdio];
  Ig(c, a, u), Bg(c, n, u);
  const f = {}, d = yt();
  c.kill = wh.bind(void 0, {
    kill: c.kill.bind(c),
    options: n,
    onInternalError: d,
    context: f,
    controller: u
  }), c.all = wS(c, n), BS(c, n), og(c, n);
  const h = qS({
    subprocess: c,
    options: n,
    startTime: r,
    verboseInfo: o,
    fileDescriptors: a,
    originalStreams: l,
    command: i,
    escapedCommand: s,
    context: f,
    onInternalError: d,
    controller: u
  });
  return { subprocess: c, promise: h };
}, qS = async ({ subprocess: e, options: t, startTime: n, verboseInfo: r, fileDescriptors: o, originalStreams: i, command: s, escapedCommand: a, context: c, onInternalError: u, controller: l }) => {
  const [
    f,
    [d, h],
    m,
    y,
    g
  ] = await OS({
    subprocess: e,
    options: t,
    context: c,
    verboseInfo: r,
    fileDescriptors: o,
    originalStreams: i,
    onInternalError: u,
    controller: l
  });
  l.abort(), u.resolve();
  const S = m.map((M, K) => ze(M, t, K)), E = ze(y, t, "all"), v = YS({
    errorInfo: f,
    exitCode: d,
    signal: h,
    stdio: S,
    all: E,
    ipcOutput: g,
    context: c,
    options: t,
    command: s,
    escapedCommand: a,
    startTime: n
  });
  return $r(v, r, t);
}, YS = ({ errorInfo: e, exitCode: t, signal: n, stdio: r, all: o, ipcOutput: i, context: s, options: a, command: c, escapedCommand: u, startTime: l }) => "error" in e ? Tr({
  error: e.error,
  command: c,
  escapedCommand: u,
  timedOut: s.terminationReason === "timeout",
  isCanceled: s.terminationReason === "cancel" || s.terminationReason === "gracefulCancel",
  isGracefullyCanceled: s.terminationReason === "gracefulCancel",
  isMaxBuffer: e.error instanceof Xt,
  isForcefullyTerminated: s.isForcefullyTerminated,
  exitCode: t,
  signal: n,
  stdio: r,
  all: o,
  ipcOutput: i,
  options: a,
  startTime: l,
  isSync: !1
}) : qs({
  command: c,
  escapedCommand: u,
  stdio: r,
  all: o,
  ipcOutput: i,
  options: a,
  startTime: l
}), Ln = (e, t) => {
  const n = Object.fromEntries(
    Object.entries(t).map(([r, o]) => [
      r,
      JS(r, e[r], o)
    ])
  );
  return { ...e, ...n };
}, JS = (e, t, n) => KS.has(e) && X(t) && X(n) ? { ...t, ...n } : n, KS = /* @__PURE__ */ new Set(["env", ...zi]), Pe = (e, t, n, r) => {
  const o = (s, a, c) => Pe(s, a, n, c), i = (...s) => XS({
    mapArguments: e,
    deepOptions: n,
    boundOptions: t,
    setBoundExeca: r,
    createNested: o
  }, ...s);
  return r !== void 0 && r(i, o, t), i;
}, XS = ({ mapArguments: e, deepOptions: t = {}, boundOptions: n = {}, setBoundExeca: r, createNested: o }, i, ...s) => {
  if (X(i))
    return o(e, Ln(n, i), r);
  const { file: a, commandArguments: c, options: u, isSync: l } = QS({
    mapArguments: e,
    firstArgument: i,
    nextArguments: s,
    deepOptions: t,
    boundOptions: n
  });
  return l ? Nw(a, c, u) : WS(a, c, u, o);
}, QS = ({ mapArguments: e, firstArgument: t, nextArguments: n, deepOptions: r, boundOptions: o }) => {
  const i = df(t) ? hf(t, n) : [t, ...n], [s, a, c] = ki(...i), u = Ln(Ln(r, o), c), {
    file: l = s,
    commandArguments: f = a,
    options: d = u,
    isSync: h = !1
  } = e({ file: s, commandArguments: a, options: u });
  return {
    file: l,
    commandArguments: f,
    options: d,
    isSync: h
  };
}, ZS = ({ file: e, commandArguments: t }) => nc(e, t), eb = ({ file: e, commandArguments: t }) => ({ ...nc(e, t), isSync: !0 }), nc = (e, t) => {
  if (t.length > 0)
    throw new TypeError(`The command and its arguments must be passed as a single string: ${e} ${t}.`);
  const [n, ...r] = tb(e);
  return { file: n, commandArguments: r };
}, tb = (e) => {
  if (typeof e != "string")
    throw new TypeError(`The command must be a string: ${String(e)}.`);
  const t = e.trim();
  if (t === "")
    return [];
  const n = [];
  for (const r of t.split(nb)) {
    const o = n.at(-1);
    o && o.endsWith("\\") ? n[n.length - 1] = `${o.slice(0, -1)} ${r}` : n.push(r);
  }
  return n;
}, nb = / +/g, rb = (e, t, n) => {
  e.sync = t(ib, n), e.s = e.sync;
}, ob = ({ options: e }) => rc(e), ib = ({ options: e }) => ({ ...rc(e), isSync: !0 }), rc = (e) => ({ options: { ...sb(e), ...e } }), sb = ({ input: e, inputFile: t, stdio: n }) => e === void 0 && t === void 0 && n === void 0 ? { stdin: "inherit" } : {}, ab = { preferLocal: !0 }, cb = Pe(() => ({}));
Pe(() => ({ isSync: !0 }));
Pe(ZS);
Pe(eb);
Pe(pm);
Pe(ob, {}, ab, rb);
ig();
const lb = T.join(Ue.getPath("home"), ".config", "heroic"), ub = T.join(lb, "tools");
async function fb() {
  const e = [], t = ub;
  if (!await F.pathExists(t))
    return e;
  const n = T.join(t, "proton");
  if (await F.pathExists(n)) {
    const o = await F.readdir(n);
    for (const i of o) {
      if (i.startsWith(".")) continue;
      const s = T.join(n, i, "proton");
      await F.pathExists(s) && e.push({
        name: `Proton - ${i}`,
        path: s,
        type: "proton"
      });
    }
  }
  const r = T.join(t, "wine");
  if (await F.pathExists(r)) {
    const o = await F.readdir(r);
    for (const i of o) {
      if (i.startsWith(".")) continue;
      const s = T.join(r, i, "bin", "wine");
      await F.pathExists(s) && e.push({
        name: `Wine - ${i}`,
        path: s,
        type: "wine"
      });
    }
  }
  return e;
}
async function db(e, t) {
  const n = T.join(Ue.getPath("home"), "Games");
  await F.ensureDir(n);
  const r = T.join(n, t);
  if (await F.pathExists(r))
    throw new Error(`Destination already exists: ${r}`);
  return await F.move(e, r), r;
}
async function hb(e, t, n) {
  const r = {
    ...process.env,
    STEAM_COMPAT_DATA_PATH: n,
    WINEPREFIX: T.join(n, "pfx")
    // Proton uses this structure usually inside compatdata
  };
  t.type === "wine" && (r.WINEPREFIX = n, delete r.STEAM_COMPAT_DATA_PATH);
  const o = t.path;
  let i = [];
  return t.type === "proton" ? i = ["run", e] : i = [e], console.log(`Executing with ${t.name} (${t.type}): ${o} ${i.join(" ")}`), await F.ensureDir(n), cb(o, i, { env: r });
}
function mb() {
  gt.handle("get-runners", async () => {
    try {
      return await fb();
    } catch (e) {
      return console.error("Failed to get runners:", e), [];
    }
  }), gt.handle("select-directory", async () => {
    const e = await lc.showOpenDialog({
      properties: ["openDirectory"]
    });
    if (e.canceled || e.filePaths.length === 0)
      return null;
    const t = e.filePaths[0], n = T.basename(t), r = await pb(t), o = await wb(t);
    return {
      path: t,
      name: n,
      executables: r,
      readme: o
    };
  }), gt.handle("install-game", async (e, { sourcePath: t, gameName: n, executable: r, runner: o }) => {
    try {
      const i = e.sender;
      i.send("install-progress", { stage: "moving", message: "Moving game files..." });
      const s = await db(t, n), a = T.join(s, r);
      i.send("install-progress", { stage: "configuring", message: "Configuring executables..." }), await F.pathExists(a) && await F.chmod(a, "755");
      const c = T.join(s, "pfx");
      await F.ensureDir(c), i.send("install-progress", { stage: "redist", message: "Searching for redistributables..." });
      const u = T.join(s, "_CommonRedist"), l = T.join(s, "Redist"), f = [u, l], d = [];
      for (const h of f)
        if (await F.pathExists(h)) {
          const m = await yb(h);
          d.push(...m);
        }
      for (const h of d) {
        i.send("install-progress", { stage: "redist", message: `Installing ${T.basename(h)}...` });
        try {
          await hb(h, o, c);
        } catch (m) {
          console.error(`Failed to run redist ${h}:`, m);
        }
      }
      return i.send("install-progress", { stage: "done", message: "Installation complete!" }), { success: !0, path: s };
    } catch (i) {
      throw console.error("Installation failed:", i), i;
    }
  }), gt.handle("open-heroic", () => {
    vc("heroic", (e) => {
      e && console.error("Failed to launch heroic directly, trying generic open? No, heroic is command usually.");
    });
  });
}
async function pb(e) {
  const t = [];
  async function n(r) {
    const o = await F.readdir(r, { withFileTypes: !0 });
    for (const i of o) {
      const s = T.join(r, i.name);
      if (i.isDirectory()) {
        if (i.name === "pfx" || i.name === "_CommonRedist" || i.name === "Redist") continue;
        await n(s);
      } else i.isFile() && i.name.toLowerCase().endsWith(".exe") && t.push(T.relative(e, s));
    }
  }
  return await n(e), t;
}
async function yb(e) {
  const t = [];
  async function n(r) {
    const o = await F.readdir(r, { withFileTypes: !0 });
    for (const i of o) {
      const s = T.join(r, i.name);
      i.isDirectory() ? await n(s) : i.isFile() && i.name.toLowerCase().endsWith(".exe") && t.push(s);
    }
  }
  return await n(e), t;
}
async function wb(e) {
  const t = ["Read_Me_Instructions.txt", "README.txt", "readme.txt"];
  for (const n of t) {
    const r = T.join(e, n);
    if (await F.pathExists(r))
      return F.readFile(r, "utf-8");
  }
  return null;
}
const oc = A.dirname(kn(import.meta.url));
process.env.APP_ROOT = A.join(oc, "..");
const Mn = process.env.VITE_DEV_SERVER_URL, Wb = A.join(process.env.APP_ROOT, "dist-electron"), ic = A.join(process.env.APP_ROOT, "dist");
process.env.VITE_PUBLIC = Mn ? A.join(process.env.APP_ROOT, "public") : ic;
let fe;
function sc() {
  fe = new Go({
    icon: A.join(process.env.VITE_PUBLIC, "electron-vite.svg"),
    webPreferences: {
      preload: A.join(oc, "preload.mjs")
    }
  }), fe.webContents.on("did-finish-load", () => {
    fe == null || fe.webContents.send("main-process-message", (/* @__PURE__ */ new Date()).toLocaleString());
  }), Mn ? fe.loadURL(Mn) : fe.loadFile(A.join(ic, "index.html"));
}
Ue.on("window-all-closed", () => {
  process.platform !== "darwin" && (Ue.quit(), fe = null);
});
Ue.on("activate", () => {
  Go.getAllWindows().length === 0 && sc();
});
Ue.whenReady().then(() => {
  mb(), sc();
});
export {
  Wb as MAIN_DIST,
  ic as RENDERER_DIST,
  Mn as VITE_DEV_SERVER_URL
};
