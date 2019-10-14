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
})({"scripts/vendor/ai2html-resizer.js":[function(require,module,exports) {
;

(function () {
  // only want one resizer on the page
  if (document.documentElement.className.indexOf('g-resizer-v3-init') > -1) return;
  document.documentElement.className += ' g-resizer-v3-init'; // require IE9+

  if (!('querySelector' in document)) return;

  function resizer() {
    var elements = Array.prototype.slice.call(document.querySelectorAll('.g-artboard[data-min-width]'));
    var widthById = {};
    elements.forEach(function (el) {
      var parent = el.parentNode;
      var width = widthById[parent.id] || parent.getBoundingClientRect().width;
      var minwidth = el.getAttribute('data-min-width');
      var maxwidth = el.getAttribute('data-max-width');
      widthById[parent.id] = width;

      if (+minwidth <= width && (+maxwidth >= width || maxwidth === null)) {
        el.style.display = 'block';
      } else {
        el.style.display = 'none';
      }
    });

    try {
      if (window.parent && window.parent.$) {
        window.parent.$('body').trigger('resizedcontent', [window]);
      }

      if (window.require) {
        require(['foundation/main'], function () {
          require(['shared/interactive/instances/app-communicator'], function (AppCommunicator) {
            AppCommunicator.triggerResize();
          });
        });
      }
    } catch (e) {
      console.log(e);
    }
  }

  document.addEventListener('DOMContentLoaded', resizer); // feel free to replace throttle with _.throttle, if available

  window.addEventListener('resize', throttle(resizer, 200));

  function throttle(func, wait) {
    // from underscore.js
    var _now = Date.now || function () {
      return new Date().getTime();
    };

    var context;
    var args;
    var result;
    var timeout = null;
    var previous = 0;

    var later = function later() {
      previous = _now();
      timeout = null;
      result = func.apply(context, args);
      if (!timeout) context = args = null;
    };

    return function () {
      var now = _now();

      var remaining = wait - (now - previous);
      context = this;
      args = arguments;

      if (remaining <= 0 || remaining > wait) {
        if (timeout) {
          clearTimeout(timeout);
          timeout = null;
        }

        previous = now;
        result = func.apply(context, args);
        if (!timeout) context = args = null;
      } else if (!timeout) {
        timeout = setTimeout(later, remaining);
      }

      return result;
    };
  }
})();
},{}]},{},["scripts/vendor/ai2html-resizer.js"], null)
//# sourceMappingURL=/ai2html-resizer.3f82c282.js.map