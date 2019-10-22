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
})({"scripts/vendor/auto-complete.js":[function(require,module,exports) {
var define;
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

/*
    JavaScript autoComplete v1.0.4
    Copyright (c) 2014 Simon Steinberger / Pixabay
    GitHub: https://github.com/Pixabay/JavaScript-autoComplete
    License: http://www.opensource.org/licenses/mit-license.php
*/
var autoComplete = function () {
  // "use strict";
  function autoComplete(options) {
    if (!document.querySelector) return; // helpers

    function hasClass(el, className) {
      return el.classList ? el.classList.contains(className) : new RegExp('\\b' + className + '\\b').test(el.className);
    }

    function addEvent(el, type, handler) {
      if (el.attachEvent) el.attachEvent('on' + type, handler);else el.addEventListener(type, handler);
    }

    function removeEvent(el, type, handler) {
      // if (el.removeEventListener) not working in IE11
      if (el.detachEvent) el.detachEvent('on' + type, handler);else el.removeEventListener(type, handler);
    }

    function live(elClass, event, cb, context) {
      addEvent(context || document, event, function (e) {
        var found,
            el = e.target || e.srcElement;

        while (el && !(found = hasClass(el, elClass))) {
          el = el.parentElement;
        }

        if (found) cb.call(el, e);
      });
    }

    var o = {
      selector: 0,
      source: 0,
      minChars: 3,
      delay: 150,
      offsetLeft: 0,
      offsetTop: 1,
      cache: 1,
      menuClass: '',
      renderItem: function renderItem(item, search) {
        // escape special characters
        search = search.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
        var re = new RegExp("(" + search.split(' ').join('|') + ")", "gi");
        return '<div class="autocomplete-suggestion" data-val="' + item + '">' + item.replace(re, "<b>$1</b>") + '</div>';
      },
      onSelect: function onSelect(e, term, item) {}
    };

    for (var k in options) {
      if (options.hasOwnProperty(k)) o[k] = options[k];
    } // init


    var elems = _typeof(o.selector) == 'object' ? [o.selector] : document.querySelectorAll(o.selector);

    for (var i = 0; i < elems.length; i++) {
      var that = elems[i]; // create suggestions container "sc"

      that.sc = document.createElement('div');
      that.sc.className = 'autocomplete-suggestions ' + o.menuClass;
      that.autocompleteAttr = that.getAttribute('autocomplete');
      that.setAttribute('autocomplete', 'off');
      that.cache = {};
      that.last_val = '';

      that.updateSC = function (resize, next) {
        var rect = that.getBoundingClientRect();
        that.sc.style.left = Math.round(rect.left + (window.pageXOffset || document.documentElement.scrollLeft) + o.offsetLeft) + 'px';
        that.sc.style.top = Math.round(rect.bottom + (window.pageYOffset || document.documentElement.scrollTop) + o.offsetTop) + 'px';
        that.sc.style.width = Math.round(rect.right - rect.left) + 'px'; // outerWidth

        if (!resize) {
          that.sc.style.display = 'block';

          if (!that.sc.maxHeight) {
            that.sc.maxHeight = parseInt((window.getComputedStyle ? getComputedStyle(that.sc, null) : that.sc.currentStyle).maxHeight);
          }

          if (!that.sc.suggestionHeight) that.sc.suggestionHeight = that.sc.querySelector('.autocomplete-suggestion').offsetHeight;
          if (that.sc.suggestionHeight) if (!next) that.sc.scrollTop = 0;else {
            var scrTop = that.sc.scrollTop,
                selTop = next.getBoundingClientRect().top - that.sc.getBoundingClientRect().top;
            if (selTop + that.sc.suggestionHeight - that.sc.maxHeight > 0) that.sc.scrollTop = selTop + that.sc.suggestionHeight + scrTop - that.sc.maxHeight;else if (selTop < 0) that.sc.scrollTop = selTop + scrTop;
          }
        }
      };

      addEvent(window, 'resize', that.updateSC);
      document.body.appendChild(that.sc);
      live('autocomplete-suggestion', 'mouseleave', function (e) {
        var sel = that.sc.querySelector('.autocomplete-suggestion.selected');
        if (sel) setTimeout(function () {
          sel.className = sel.className.replace('selected', '');
        }, 20);
      }, that.sc);
      live('autocomplete-suggestion', 'mouseover', function (e) {
        var sel = that.sc.querySelector('.autocomplete-suggestion.selected');
        if (sel) sel.className = sel.className.replace('selected', '');
        this.className += ' selected';
      }, that.sc);
      live('autocomplete-suggestion', 'mousedown', function (e) {
        if (hasClass(this, 'autocomplete-suggestion')) {
          // else outside click
          var v = this.getAttribute('data-val');
          that.value = v;
          o.onSelect(e, v, this);
          that.sc.style.display = 'none';
        }
      }, that.sc);

      that.blurHandler = function () {
        try {
          var over_sb = document.querySelector('.autocomplete-suggestions:hover');
        } catch (e) {
          var over_sb = 0;
        }

        if (!over_sb) {
          that.last_val = that.value;
          that.sc.style.display = 'none';
          setTimeout(function () {
            that.sc.style.display = 'none';
          }, 350); // hide suggestions on fast input
        } else if (that !== document.activeElement) setTimeout(function () {
          that.focus();
        }, 20);
      };

      addEvent(that, 'blur', that.blurHandler);

      var suggest = function suggest(data) {
        var val = that.value;
        that.cache[val] = data;

        if (data.length && val.length >= o.minChars) {
          var s = '';

          for (var i = 0; i < data.length; i++) {
            s += o.renderItem(data[i], val);
          }

          that.sc.innerHTML = s;
          that.updateSC(0);
        } else that.sc.style.display = 'none';
      };

      that.keydownHandler = function (e) {
        var key = window.event ? e.keyCode : e.which; // down (40), up (38)

        if ((key == 40 || key == 38) && that.sc.innerHTML) {
          var next,
              sel = that.sc.querySelector('.autocomplete-suggestion.selected');

          if (!sel) {
            next = key == 40 ? that.sc.querySelector('.autocomplete-suggestion') : that.sc.childNodes[that.sc.childNodes.length - 1]; // first : last

            next.className += ' selected';
            that.value = next.getAttribute('data-val');
          } else {
            next = key == 40 ? sel.nextSibling : sel.previousSibling;

            if (next) {
              sel.className = sel.className.replace('selected', '');
              next.className += ' selected';
              that.value = next.getAttribute('data-val');
            } else {
              sel.className = sel.className.replace('selected', '');
              that.value = that.last_val;
              next = 0;
            }
          }

          that.updateSC(0, next);
          return false;
        } // esc
        else if (key == 27) {
            that.value = that.last_val;
            that.sc.style.display = 'none';
          } // enter
          else if (key == 13 || key == 9) {
              var sel = that.sc.querySelector('.autocomplete-suggestion.selected');

              if (sel && that.sc.style.display != 'none') {
                o.onSelect(e, sel.getAttribute('data-val'), sel);
                setTimeout(function () {
                  that.sc.style.display = 'none';
                }, 20);
              }
            }
      };

      addEvent(that, 'keydown', that.keydownHandler);

      that.keyupHandler = function (e) {
        var key = window.event ? e.keyCode : e.which;

        if (!key || (key < 35 || key > 40) && key != 13 && key != 27) {
          var val = that.value;

          if (val.length >= o.minChars) {
            if (val != that.last_val) {
              that.last_val = val;
              clearTimeout(that.timer);

              if (o.cache) {
                if (val in that.cache) {
                  suggest(that.cache[val]);
                  return;
                } // no requests if previous suggestions were empty


                for (var i = 1; i < val.length - o.minChars; i++) {
                  var part = val.slice(0, val.length - i);

                  if (part in that.cache && !that.cache[part].length) {
                    suggest([]);
                    return;
                  }
                }
              }

              that.timer = setTimeout(function () {
                o.source(val, suggest);
              }, o.delay);
            }
          } else {
            that.last_val = val;
            that.sc.style.display = 'none';
          }
        }
      };

      addEvent(that, 'keyup', that.keyupHandler);

      that.focusHandler = function (e) {
        that.last_val = '\n';
        that.keyupHandler(e);
      };

      if (!o.minChars) addEvent(that, 'focus', that.focusHandler);
    } // public destroy method


    this.destroy = function () {
      for (var i = 0; i < elems.length; i++) {
        var that = elems[i];
        removeEvent(window, 'resize', that.updateSC);
        removeEvent(that, 'blur', that.blurHandler);
        removeEvent(that, 'focus', that.focusHandler);
        removeEvent(that, 'keydown', that.keydownHandler);
        removeEvent(that, 'keyup', that.keyupHandler);
        if (that.autocompleteAttr) that.setAttribute('autocomplete', that.autocompleteAttr);else that.removeAttribute('autocomplete');
        document.body.removeChild(that.sc);
        that = null;
      }
    };
  }

  return autoComplete;
}();

(function () {
  if (typeof define === 'function' && define.amd) define('autoComplete', function () {
    return autoComplete;
  });else if (typeof module !== 'undefined' && module.exports) module.exports = autoComplete;else window.autoComplete = autoComplete;
})();
},{}]},{},["scripts/vendor/auto-complete.js"], null)
//# sourceMappingURL=/auto-complete.d6fce6c7.js.map