// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"scripts/something.js":[function(require,module,exports) {
var define;
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var a, b;
a = this, b = function b() {
  'use strict';

  function i(e, t) {
    for (var n = 0; n < t.length; n++) {
      var i = t[n];
      i.enumerable = i.enumerable || !1, i.configurable = !0, 'value' in i && (i.writable = !0), Object.defineProperty(e, i.key, i);
    }
  }

  function s(e) {
    return e.innerHTML = '';
  }

  function d(t, e, n, i, o, r) {
    i({
      event: t,
      query: e instanceof HTMLInputElement ? e.value : e.innerHTML,
      matches: o.matches,
      results: o.list.map(function (e) {
        return e.value;
      }),
      selection: o.list.find(function (e) {
        return t.keyCode === f ? e.index === Number(r.getAttribute(a)) : 'mousedown' === t.type ? e.index === Number(t.target.getAttribute(a)) : void 0;
      })
    }), s(n);
  }

  function e(e, t) {
    t = t || {
      bubbles: !1,
      cancelable: !1,
      detail: void 0
    };
    var n = document.createEvent('CustomEvent');
    return n.initCustomEvent(e, t.bubbles, t.cancelable, t.detail), n;
  }

  var a = 'data-id',
      n = 'autoComplete_list',
      l = 'autoComplete_result',
      t = 'autoComplete_highlighted',
      h = 'autoComplete_selected',
      f = 13,
      v = 38,
      m = 40,
      Q = function Q(e) {
    return 'string' == typeof e ? document.querySelector(e) : e();
  },
      U = function U(e) {
    var t = document.createElement(e.element);
    return t.setAttribute('id', n), e.container && e.container(t), e.destination.insertAdjacentElement(e.position, t), t;
  },
      u = function u(e) {
    return '<span class='.concat(t, '>').concat(e, '</span>');
  },
      c = function c(e, o, r) {
    var s = document.createDocumentFragment();
    o.forEach(function (e, t) {
      var n = document.createElement(r.element),
          i = o[t].index;
      n.setAttribute(a, i), n.setAttribute('class', l), r.content ? r.content(e, n) : n.innerHTML = e.match || e, s.appendChild(n);
    }), e.appendChild(s);
  },
      p = function p(t, n, i, o) {
    function r(e) {
      c.classList.remove(h), a = 1 === e ? c.nextSibling : c.previousSibling;
    }

    function s(e) {
      ;
      (c = e).classList.add(h);
    }

    var a,
        l = n.childNodes,
        u = l.length - 1,
        c = void 0;
    t.onkeydown = function (e) {
      if (0 < l.length) switch (e.keyCode) {
        case v:
          c ? (r(0), s(a || l[u])) : s(l[u]);
          break;

        case m:
          c ? (r(1), s(a || l[0])) : s(l[0]);
          break;

        case f:
          c && d(e, t, n, i, o, c);
      }
    }, l.forEach(function (e) {
      e.onmousedown = function (e) {
        return d(e, t, n, i, o);
      };
    });
  },
      g = s;

  e.prototype = window.Event.prototype;
  var y = {
    CustomEventWrapper: 'function' == typeof window.CustomEvent && window.CustomEvent || e,
    initElementClosestPolyfill: function initElementClosestPolyfill() {
      Element.prototype.matches || (Element.prototype.matches = Element.prototype.msMatchesSelector || Element.prototype.webkitMatchesSelector), Element.prototype.closest || (Element.prototype.closest = function (e) {
        var t = this;

        do {
          if (t.matches(e)) return t;
          t = t.parentElement || t.parentNode;
        } while (null !== t && 1 === t.nodeType);

        return null;
      });
    }
  };
  return function () {
    function K(e) {
      !function (e, t) {
        if (!(e instanceof t)) throw new TypeError('Cannot call a class as a function');
      }(this, K);
      var t = e.selector,
          n = void 0 === t ? '#autoComplete' : t,
          i = e.data,
          o = i.key,
          r = i.src,
          s = i.cache,
          a = void 0 === s || s,
          l = e.query,
          u = e.trigger,
          c = (u = void 0 === u ? {} : u).event,
          d = void 0 === c ? ['input'] : c,
          h = u.condition,
          f = void 0 !== h && h,
          v = e.searchEngine,
          m = void 0 === v ? 'strict' : v,
          p = e.threshold,
          g = void 0 === p ? 0 : p,
          y = e.debounce,
          b = void 0 === y ? 0 : y,
          E = e.resultsList,
          w = (E = void 0 === E ? {} : E).render,
          C = void 0 !== w && w,
          L = E.container,
          k = void 0 !== L && L,
          S = E.destination,
          x = E.position,
          R = void 0 === x ? 'afterend' : x,
          q = E.element,
          M = void 0 === q ? 'ul' : q,
          H = E.navigation,
          T = void 0 !== H && H,
          A = e.sort,
          P = void 0 !== A && A,
          I = e.placeHolder,
          j = e.maxResults,
          N = void 0 === j ? 5 : j,
          _ = e.resultItem,
          V = (_ = void 0 === _ ? {} : _).content,
          W = void 0 !== V && V,
          D = _.element,
          F = void 0 === D ? 'li' : D,
          O = e.noResults,
          z = e.highlight,
          B = void 0 !== z && z,
          G = e.onSelection,
          J = C ? U({
        container: k,
        destination: S || Q(n),
        position: R,
        element: M
      }) : null;
      this.selector = n, this.data = {
        src: function src() {
          return 'function' == typeof r ? r() : r;
        },
        key: o,
        cache: a
      }, this.query = l, this.trigger = {
        event: d,
        condition: f
      }, this.searchEngine = 'loose' === m ? 'loose' : 'function' == typeof m ? m : 'strict', this.threshold = g, this.debounce = b, this.resultsList = {
        render: C,
        view: J,
        navigation: T
      }, this.sort = P, this.placeHolder = I, this.maxResults = N, this.resultItem = {
        content: W,
        element: F
      }, this.noResults = O, this.highlight = B, this.onSelection = G, this.init();
    }

    return function (e, t, n) {
      t && i(e.prototype, t), n && i(e, n);
    }(K, [{
      key: 'search',
      value: function value(e, t) {
        var n = t.toLowerCase();

        if ('loose' === this.searchEngine) {
          e = e.replace(/ /g, '');

          for (var i = [], o = 0, r = 0; r < n.length; r++) {
            var s = t[r];
            o < e.length && n[r] === e[o] && (s = this.highlight ? u(s) : s, o++), i.push(s);
          }

          return o === e.length && i.join('');
        }

        if (n.includes(e)) return e = new RegExp(''.concat(e), 'i').exec(t), this.highlight ? t.replace(e, u(e)) : t;
      }
    }, {
      key: 'listMatchedResults',
      value: function value(n) {
        var u = this;
        return new Promise(function (e) {
          var l = [];
          n.filter(function (i, o) {
            function e(e) {
              var t = e ? i[e] : i,
                  n = 'function' == typeof u.searchEngine ? u.searchEngine(u.queryValue, t) : u.search(u.queryValue, t);
              n && e ? l.push({
                key: e,
                index: o,
                match: n,
                value: i
              }) : n && !e && l.push({
                index: o,
                match: n,
                value: i
              });
            }

            if (u.data.key) {
              var t = !0,
                  n = !1,
                  r = void 0;

              try {
                for (var s, a = u.data.key[Symbol.iterator](); !(t = (s = a.next()).done); t = !0) {
                  e(s.value);
                }
              } catch (e) {
                ;
                n = !0, r = e;
              } finally {
                try {
                  t || null == a.return || a.return();
                } finally {
                  if (n) throw r;
                }
              }
            } else e();
          });
          var t = u.sort ? l.sort(u.sort).slice(0, u.maxResults) : l.slice(0, u.maxResults);
          return e({
            matches: l.length,
            list: t
          });
        });
      }
    }, {
      key: 'ignite',
      value: function value() {
        var a = this,
            l = Q(this.selector);
        this.placeHolder && l.setAttribute('placeholder', this.placeHolder);

        function t(t) {
          Promise.resolve(a.data.cache ? a.dataStream : a.data.src()).then(function (e) {
            ;
            a.dataStream = e, function (t) {
              function n(e, t) {
                l.dispatchEvent(new y.CustomEventWrapper('autoComplete', {
                  bubbles: !0,
                  detail: {
                    event: e,
                    input: i,
                    query: o,
                    matches: t ? t.matches : null,
                    results: t ? t.list : null
                  },
                  cancelable: !0
                }));
              }

              var i = l instanceof HTMLInputElement ? l.value.toLowerCase() : l.innerHTML.toLowerCase(),
                  o = a.queryValue = a.query && a.query.manipulate ? a.query.manipulate(i) : i,
                  e = a.resultsList.render,
                  r = a.trigger.condition ? a.trigger.condition(o) : o.length > a.threshold && o.replace(/ /g, '').length;

              if (e) {
                var s = a.resultsList.view;
                g(s);
                r ? a.listMatchedResults(a.dataStream, t).then(function (e) {
                  n(t, e), a.resultsList.render && (0 === e.list.length && a.noResults ? a.noResults() : (c(s, e.list, a.resultItem), a.onSelection && (a.resultsList.navigation ? a.resultsList.navigation(t, l, s, a.onSelection, e) : p(l, s, a.onSelection, e))));
                }) : n(t);
              } else !e && r && a.listMatchedResults(a.dataStream, t).then(function (e) {
                n(t, e);
              });
            }(t);
          });
        }

        this.trigger.event.forEach(function (e) {
          l.addEventListener(e, function (n, i) {
            var o;
            return function () {
              var e = this,
                  t = arguments;
              clearTimeout(o), o = setTimeout(function () {
                return n.apply(e, t);
              }, i);
            };
          }(function (e) {
            return t(e);
          }, a.debounce));
        });
      }
    }, {
      key: 'init',
      value: function value() {
        var t = this;
        this.data.cache ? Promise.resolve(this.data.src()).then(function (e) {
          ;
          t.dataStream = e, t.ignite();
        }) : this.ignite(), y.initElementClosestPolyfill();
      }
    }]), K;
  }();
}, 'object' == (typeof exports === "undefined" ? "undefined" : _typeof(exports)) && 'undefined' != typeof module ? module.exports = b() : 'function' == typeof define && define.amd ? define(b) : a.autoComplete = b();
},{}]},{},["scripts/something.js"], null)
//# sourceMappingURL=/something.f6c1ccc4.js.map