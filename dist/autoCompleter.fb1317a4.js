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
})({"scripts/autoCompleter.js":[function(require,module,exports) {
// import * as d3 from 'd3'
// import autoComplete from 'autocomplete'
// document
// 	.querySelector('#autoComplete')
// 	.addEventListener('autoComplete', function(event) {
// 		console.log(event.detail)
// 		// console.log(autoCompletejs);
// 	})
// const acjs = autoComplete({
// 	data: {
// 		src: function() {
// 			console.log('hello')
// 		},
// 		//d3.csv(require('../data/artist_counts.csv'))
// 		key: ['artist']
// 	},
// 	// query: {
// 	//   // Query Interceptor               | (Optional)
// 	//   manipulate: query => {
// 	//     return query.replace('pizza', 'burger')
// 	//   }
// 	// },
// 	sort: (a, b) => {
// 		// Sort rendered results ascendingly | (Optional)
// 		if (a.artist < b.artist) return -1
// 		if (a.artist > b.artist) return 1
// 		return 0
// 	},
// 	placeHolder: 'Drake', // Place Holder text                 | (Optional)
// 	selector: '#autoComplete', // Input field selector              | (Optional)
// 	threshold: 2, // Min. Chars length to start Engine | (Optional)
// 	debounce: 300, // Post duration for engine to start | (Optional)
// 	searchEngine: 'strict', // Search Engine type/mode           | (Optional)
// 	// resultsList: {
// 	//   // Rendered results list object      | (Optional)
// 	//   render: true,
// 	//   container: source => {
// 	//     const resultsListID = 'food_List'
// 	//     return resultsListID
// 	//   },
// 	//   destination: document.querySelector('#artistSelect'),
// 	//   position: 'afterend',
// 	//   element: 'ul'
// 	// },
// 	maxResults: 5, // Max. number of rendered results | (Optional)
// 	highlight: true, // Highlight matching results      | (Optional)
// 	// resultItem: {
// 	//   // Rendered result item            | (Optional)
// 	//   content: (data, source) => {
// 	//     source.innerHTML = data.match
// 	//   },
// 	//   element: 'li'
// 	// },
// 	// noResults: () => {
// 	//   // Action script on noResults      | (Optional)
// 	//   const result = document.createElement('li')
// 	//   result.setAttribute('class', 'no_result')
// 	//   result.setAttribute('tabindex', '1')
// 	//   result.innerHTML = 'No Results'
// 	//   document.querySelector('#autoComplete_results_list').appendChild(result)
// 	// },
// 	onSelection: feedback => {
// 		// Action script onSelection event | (Optional)
// 		console.log(feedback.selection.value.image_url)
// 	}
// })
},{}]},{},["scripts/autoCompleter.js"], null)
//# sourceMappingURL=/autoCompleter.fb1317a4.js.map