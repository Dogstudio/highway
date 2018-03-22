(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("Highway", [], factory);
	else if(typeof exports === 'object')
		exports["Highway"] = factory();
	else
		root["Highway"] = factory();
})(window, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 5);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * @file Highway helper methods used all acrosse the script.
 * @author Anthony Du Pont <bulldog@dogstudio.co>
 */
var TITLE_REGEX = /<title>(.+)<\/title>/;
var PARAM_REGEX = /\?([\w_\-.=&]+)/;
var ANCHOR_REGEX = /(#.*)$/;
var ORIGIN_REGEX = /(https?:\/\/[\w\-.]+)/;
var PATHNAME_REGEX = /https?:\/\/.*?(\/[\w_\-./]+)/;
var CAMELCASE_REGEX = /[-_](\w)/g;

/**
 * Get origin of an URL
 *
 * @arg    {string} url — URL to match
 * @return {string} Origin of URL or `null`
 */
function getOrigin(url) {
  var match = url.match(ORIGIN_REGEX);
  return match ? match[1] : null;
}

/**
 * Get pathname of an URL
 *
 * @arg    {string} url — URL to match
 * @return {string} Pathname of URL or `null`
 */
function getPathname(url) {
  var match = url.match(PATHNAME_REGEX);
  return match ? match[1] : null;
}

/**
 * Get anchor in an URL
 *
 * @arg    {string} url — URL to match
 * @return {string} Anchor in URL or `null`
 */
function getAnchor(url) {
  var match = url.match(ANCHOR_REGEX);
  return match ? match[1] : null;
}

/**
 * Get search in URL.
 *
 * @arg    {string} url — URL to match
 * @return {object} Search in URL formatted as an object or `null`
 */
function getParams(url) {
  var match = url.match(PARAM_REGEX);

  if (!match) {
    return null;
  }

  var search = match[1].split('&');
  var object = {};

  for (var i = 0; i < search.length; i++) {
    var part = search[i].split('=');
    var key = part[0];
    var value = part[1];


    object[key] = value;
  }

  return object;
}

/**
 * Get a parameter from an URL
 *
 * @arg    {string} url — URL to use
 * @arg    {string} key — Parameter key to get
 * @return {string} Parameter value or `null`
 */
function getParam(url, key) {
  var params = getParams(url);
  return params.hasOwnProperty(key) ? params[key] : null;
}

/**
 * Get infos of an URL.
 *
 * @arg    {string} url — URL to use
 * @return {object} All informations of an URL.
 */
function getInfos(url) {
  return {
    url: url,
    anchor: getAnchor(url),
    origin: getOrigin(url),
    params: getParams(url),
    pathname: getPathname(url)
  };
}

/**
 * Get page's DOM from page HTML
 * 
 * @arg    {string} page — Page HTML
 * @return {string} Page DOM
 */
function getDOM(page) {
  // We create a fake DOM element that will contain our page HTML and let us
  // select DOM nodes properly. This element is only used in Javascript.
  var FRAGMENT = document.createElement('div');

  // This is the trick to transform our page HTML from string to DOM element by
  // using our fake container we created before and by updating its inner HTML.
  FRAGMENT.innerHTML = page;

  // Now we can return the DOM.
  return FRAGMENT;
}

/**
 * Get view element from page HTML
 * 
 * @arg    {string} page — Page HTML
 * @return {object} View element
 */
function getView(page) {
  return getDOM(page).querySelector('[router-view]');
}

/**
 * Get view's slug from view element
 * 
 * @arg    {string} page — Page HTML
 * @return {string} Page slug
 */
function getSlug(page) {
  return getView(page).getAttribute('router-view');
}

/**
 * Get page's title from page HTML
 * 
 * @arg    {string} page — Page HTML
 * @return {string} Page title
 */
function getTitle(page) {
  var match = page.match(TITLE_REGEX);
  return match ? match[1] : '';
}

/**
 * Get page renderer
 *
 * @arg    {string} page — Page HTML to use
 * @arg    {object} renderers — List of renderers
 * @return {object} Single renderer or `null`
 */
function getRenderer(page, renderers) {
  var slug = getSlug(page);
  return renderers.hasOwnProperty(slug) ? renderers[slug] : null;
}

/**
 * Get page transition
 *
 * @arg    {string} page — Page HTML to use
 * @arg    {object} transitions — List of transitions
 * @return {object} Single transition or `null`
 */
function getTransition(page, transitions) {
  if (typeof transitions === 'undefined') {
    return null;
  }

  var slug = getSlug(page);

  if (!transitions.hasOwnProperty(slug) || !transitions[slug]) {
    if (transitions.hasOwnProperty('default')) {
      return transitions['default'];
    }

    return null;
  }

  return transitions[slug];
}

/**
 * Converts string to camelCase
 *
 * @arg    {String} string - String to parse
 * @return {String} Parsed string
 */
function camelize(string) {
  return string.replace(CAMELCASE_REGEX, function (_, c) {
    return c ? c.toUpperCase() : '';
  });
}

/**
 * Export all helpers
 */
module.exports = {
  getDOM: getDOM,
  getSlug: getSlug,
  getView: getView,
  getInfos: getInfos,
  getTitle: getTitle,
  getParam: getParam,
  getParams: getParams,
  getOrigin: getOrigin,
  getAnchor: getAnchor,
  getPathname: getPathname,
  getRenderer: getRenderer,
  getTransition: getTransition,
  camelize: camelize
};

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * @file Highway default renderer that handle DOM stuffs.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * @author Anthony Du Pont <bulldog@dogstudio.co>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      */


var _helpers = __webpack_require__(0);

var _helpers2 = _interopRequireDefault(_helpers);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var HighwayRenderer = function () {

  /**
   * @arg {string} page — Page HTML
   * @arg {object} view — Page view Node
   * @arg {string} transition — Page transition
   * @constructor
   */
  function HighwayRenderer(page, view, transition) {
    _classCallCheck(this, HighwayRenderer);

    // The [router-view] and the page title are the only main information we need
    // since the role of the renderer is to update the required DOM elements with
    // the page informations. In our case the content and title of the document.
    this.view = view;
    this.page = _helpers2.default.getDOM(page);
    this.title = _helpers2.default.getTitle(page);
    this.transition = transition ? new transition(view) : null; // eslint-disable-line

    if (this.title && document.title !== this.title) {
      document.title = this.title;
    }

    // The [router-wrapper] is the main container of the router and the ancestor of our 
    // [router-view] that let us now where to remove of append our view in the DOM.
    // Everything outside of the [router-wrapper] is invisible for the router and
    // it should only contain the [router-view] and nothing else.
    this.wrapper = null;
  }

  /**
   * Add the view in DOM and play an `in` transition if one is defined.
   * 
   * @return {object} Promise
   */


  _createClass(HighwayRenderer, [{
    key: 'show',
    value: function show() {
      var _this = this;

      return new Promise(function (resolve) {
        _this.wrapper = document.querySelector('[router-wrapper]');

        // Before doing anything crazy you need to know your view doesn't exists
        // in the [router-wrapper] so it is appended to it right now!
        _this.wrapper.appendChild(_this.view);

        // The `onEnter` method if set in your custom renderer is called everytime
        // the view is appended to the DOM. This let you do some crazy stuffs at
        // this right moment.
        if (_this.onEnter) {
          _this.onEnter();
        }

        // Use of a callback method to optimize lines of code.
        var done = function done() {
          // The `onEnterCompleted` method if set in your custom renderer is called 
          // everytime a transition is over if set. Otherwise it's called right after
          // the `onEnter` method.
          if (_this.onEnterCompleted) {
            _this.onEnterCompleted();
          }
          resolve();
        };

        // You fool you didn't define any transition...
        if (!_this.transition) {
          done();
          return;
        }

        // The transition is set in your custom renderer with a getter called
        // `transition` that should return the transition object you want to 
        // apply to you view. We call the `in` step of this one right now!
        _this.transition.show().then(done);
      });
    }

    /**
     * Play an `out` transition if one is defined and remove the view from DOM.
     * 
     * @return {object} Promise
     */

  }, {
    key: 'hide',
    value: function hide() {
      var _this2 = this;

      return new Promise(function (resolve) {
        _this2.wrapper = _this2.view.parentNode;

        // The `onLeave` method if set in your custom renderer is called everytime
        // before a view will be removed from the DOM. This let you do some stuffs
        // right before the view isn't available anymore.
        if (_this2.onLeave) {
          _this2.onLeave();
        }

        // Use of a callback method to optimize lines of code.
        var done = function done() {
          // It's time to say goodbye to the view... Farewell my friend.
          _this2.wrapper.removeChild(_this2.view);

          // The `onLeaveCompleted` method if set in your custom renderer is called 
          // everytime a view is completely removed from the DOM.
          if (_this2.onLeaveCompleted) {
            _this2.onLeaveCompleted();
          }
          resolve();
        };

        // You fool you didn't define any transition...
        if (!_this2.transition) {
          done();
          return;
        }

        // We call the `out` step of your transition right now!
        _this2.transition.hide().then(done);
      });
    }
  }]);

  return HighwayRenderer;
}();

module.exports = HighwayRenderer;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * @file Highway default transition that handle DOM animations.
 * @author Anthony Du Pont <bulldog@dogstudio.co>
 */
var HighwayTransition = function () {

  /**
   * @arg {object} view — [router-view] Node
   * @constructor
   */
  function HighwayTransition(view) {
    _classCallCheck(this, HighwayTransition);

    // The [router-view] is the only main information we need since the role of
    // the transition is to show/hide the required DOM elements.
    this.view = view;
  }

  /**
   * Add the view in DOM and play an `in` transition if one is defined.
   * 
   * @return {object} Promise
   */


  _createClass(HighwayTransition, [{
    key: 'show',
    value: function show() {
      var _this = this;

      return new Promise(function (resolve) {
        if (_this.in && typeof _this.in === 'function') {
          // The `in` method in encapsulated in the `show` method make transition
          // code easier to write. This way you don't have to define any Promise
          // in your transition code and focus on the transition itself.
          _this.in(_this.view, resolve);
        }
      });
    }

    /**
     * Play an `out` transition if one is defined and remove the view from DOM.
     * 
     * @return {object} Promise
     */

  }, {
    key: 'hide',
    value: function hide() {
      var _this2 = this;

      return new Promise(function (resolve) {
        if (_this2.out && typeof _this2.out === 'function') {
          // The `out` method in encapsulated in the `hide` method make transition
          // code easier to write. This way you don't have to define any Promise
          // in your transition code and focus on the transition itself.
          _this2.out(_this2.view, resolve);
        }
      });
    }
  }]);

  return HighwayTransition;
}();

module.exports = HighwayTransition;

/***/ }),
/* 3 */
/***/ (function(module, exports) {

function E () {
  // Keep this empty so it's easier to inherit from
  // (via https://github.com/lipsmack from https://github.com/scottcorgan/tiny-emitter/issues/3)
}

E.prototype = {
  on: function (name, callback, ctx) {
    var e = this.e || (this.e = {});

    (e[name] || (e[name] = [])).push({
      fn: callback,
      ctx: ctx
    });

    return this;
  },

  once: function (name, callback, ctx) {
    var self = this;
    function listener () {
      self.off(name, listener);
      callback.apply(ctx, arguments);
    };

    listener._ = callback
    return this.on(name, listener, ctx);
  },

  emit: function (name) {
    var data = [].slice.call(arguments, 1);
    var evtArr = ((this.e || (this.e = {}))[name] || []).slice();
    var i = 0;
    var len = evtArr.length;

    for (i; i < len; i++) {
      evtArr[i].fn.apply(evtArr[i].ctx, data);
    }

    return this;
  },

  off: function (name, callback) {
    var e = this.e || (this.e = {});
    var evts = e[name];
    var liveEvents = [];

    if (evts && callback) {
      for (var i = 0, len = evts.length; i < len; i++) {
        if (evts[i].fn !== callback && evts[i].fn._ !== callback)
          liveEvents.push(evts[i]);
      }
    }

    // Remove event from queue to prevent memory leak
    // Suggested by https://github.com/lazd
    // Ref: https://github.com/scottcorgan/tiny-emitter/commit/c6ebfaa9bc973b33d110a84a307742b7cf94c953#commitcomment-5024910

    (liveEvents.length)
      ? e[name] = liveEvents
      : delete e[name];

    return this;
  }
};

module.exports = E;


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _tinyEmitter = __webpack_require__(3);

var _tinyEmitter2 = _interopRequireDefault(_tinyEmitter);

var _helpers = __webpack_require__(0);

var _helpers2 = _interopRequireDefault(_helpers);

var _renderer = __webpack_require__(1);

var _renderer2 = _interopRequireDefault(_renderer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @file Highway core that handle all history stuffs.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @author Anthony Du Pont <bulldog@dogstudio.co>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */


// Fetch API options used for every HTTP request sent by Highway. It makes
// sure the HTTP requests URL are only on the same origin and that credentials
// are also only sent on same origin. An extra `X-Requested-With` header is
// available if needed in your scripts.
var FETCH_OPTS = {
  mode: 'same-origin',
  method: 'GET',
  headers: {
    'X-Requested-With': 'XMLHttpRequest'
  },
  credentials: 'same-origin'
};

var HighwayCore = function (_Emitter) {
  _inherits(HighwayCore, _Emitter);

  /**
   * @arg {object} opts — User options
   * @arg {object} opts.renderers — List of renderers
   * @arg {object} opts.transitions — List of transitions
   * @extends Emitter
   * @constructor
   */
  function HighwayCore(opts) {
    _classCallCheck(this, HighwayCore);

    // All your custom renderers and transitions you sent to Highway.
    var _this = _possibleConstructorReturn(this, (HighwayCore.__proto__ || Object.getPrototypeOf(HighwayCore)).call(this));
    // Extends the Emitter constructor in order to be able to use its features
    // and send custom events all along the script.


    _this.renderers = opts.renderers;
    _this.transitions = opts.transitions;

    // Some usefull stuffs for later
    _this.mode = opts.mode || 'out-in';
    _this.state = {};
    _this.cache = {};
    _this.navigating = false;

    // Cache the page we land on for further HTTP request optimization.
    _this.page = document.documentElement.outerHTML;
    _this.pathname = _helpers2.default.getPathname(window.location.href);
    _this.cache[_this.pathname] = _this.page;

    // Get the page renderer and directly call its `onEnter` and `onEnterCompleted`
    // methods in order to properly initialize the page.
    var view = document.querySelector('[router-view]');
    var transition = _helpers2.default.getTransition(_this.page, _this.transitions);

    _this.from = _helpers2.default.getRenderer(_this.page, _this.renderers) || _renderer2.default;
    _this.from = new _this.from(_this.page, view, transition); // eslint-disable-line

    // We check the `onEnter` and `onEnterCompleted` methods and we call them 
    // respectively if they are set
    if (_this.from.onEnter) {
      _this.from.onEnter();
    }

    if (_this.from.onEnterCompleted) {
      _this.from.onEnterCompleted();
    }

    // Listen the `popstate` on the window to run the router each time an 
    // history entry changes. Basically everytime the backward/forward arrows
    // are triggered by the user.
    window.addEventListener('popstate', _this.popState.bind(_this));

    // Event bubbling
    _this.bubble();
    return _this;
  }

  /**
   * Bubble `click` event
   */


  _createClass(HighwayCore, [{
    key: 'bubble',
    value: function bubble() {
      var _this2 = this;

      // Use the bubbling principle from document to all each children and catch
      // only the link elements without target and not pointing to an anchor on
      // the page.
      document.addEventListener('click', function (e) {
        if (e.target.tagName === 'A') {
          var anchor = _helpers2.default.getAnchor(e.target.href);
          var pathname = _helpers2.default.getPathname(e.target.href);

          if (!e.target.target) {
            // To run the router properly we have to prevent the default behaviour
            // of link elements to avoir page reloading.
            e.preventDefault();

            if (!_this2.navigating && pathname !== _this2.pathname) {
              // Now push the state!
              _this2.pushState(e);
            } else {
              // If the pathnames are the same there might be an anchor appended to
              // it so we need to check it and reload the page to use the default
              // browser behaviour.
              if (anchor) {
                window.location.href = e.target.href;
              }
            }
          }
        }
      });
    }

    /**
     * Watch history entry changes
     */

  }, {
    key: 'popState',
    value: function popState() {
      // We quickly check if the pathname has changed before doing anything else
      // because with anchor the `popstate` event might trigger but the pathname
      // might not change and nothing should happen then.
      var pathname = _helpers2.default.getPathname(window.location.href);

      if (pathname !== this.pathname) {
        // Call of `beforeFetch` for optimizations
        this.beforeFetch(window.location.href, false);
      }
    }

    /**
     * Update DOM on `click` event
     * 
     * @arg {object} event — `click` event from link elements
     */

  }, {
    key: 'pushState',
    value: function pushState(event) {
      // Call of `beforeFetch` for optimizations
      this.beforeFetch(event.target.href, true);
    }

    /**
     * Do some tests before HTTP requests to optimize pipeline.
     * 
     * @arg {string} url – URL to use
     * @arg {boolean} history — Push entry in history if `true`
     */

  }, {
    key: 'beforeFetch',
    value: function beforeFetch(url, history) {
      var _this3 = this;

      // Use of a boolean to avoid repetitive fetch calls by super excited users
      // that could lead to some serious issues.
      this.navigating = true;

      // Using the `getInfos` from the Helpers we can get all the information from
      // a given URL we can use in our script (origin, pathname, parameters,...).
      this.state = _helpers2.default.getInfos(url);
      this.pathname = _helpers2.default.getPathname(url);

      // We need to check if the state URL is available in the cache to avoid
      // useless HTTP request and get the page HTML from the cache if possible.
      if (this.cache.hasOwnProperty(this.pathname)) {
        // Now push the page!
        this.push(this.cache[this.pathname]);

        // We push a new entry in the history in order to be able to navigate
        // with the backward and forward buttons from the browser.
        if (history) {
          window.history.pushState(this.state, '', this.state.url);
        }

        // And stop there.
        return;
      }

      // Get the page URL from the state previously pushed in the history.
      this.fetch().then(function (page) {
        // We push a new entry in the history in order to be able to navigate
        // with the backward and forward buttons from the browser.
        if (history) {
          window.history.pushState(_this3.state, '', _this3.state.url);
        }

        // Now push the page!
        _this3.push(page);
      });
    }

    /**
     * Fetch the page from URL
     * 
     * @return {string} Fetch response
     * @return {object} Fetch Promise
     */

  }, {
    key: 'fetch',
    value: function (_fetch) {
      function fetch() {
        return _fetch.apply(this, arguments);
      }

      fetch.toString = function () {
        return _fetch.toString();
      };

      return fetch;
    }(function () {
      var _this4 = this;

      return fetch(this.state.url, FETCH_OPTS).then(function (response) {
        // Check the HTTP code
        // 200+: Success of the HTTP request
        if (response.status >= 200 && response.status < 300) {
          // The HTTP response is the page HTML as a string
          return response.text();
        }

        // An extra event is emitted if an error has occured that can be used
        // outside of the router to let you deal with the mess that happened.
        _this4.emit('NAVIGATE_ERROR');

        // !200+: Error of the HTTP request
        throw new Error(response.statusText);
      });
    })

    /**
     * Push page in DOM
     * 
     * @arg {string} page — Page HTML
     * @arg {boolean} history — Push entry in history if `true`
     */

  }, {
    key: 'push',
    value: function push(page) {
      var _this5 = this;

      // Cache the page for HTTP request optimization
      this.cache[this.pathname] = page;

      // The page we get is the one we want to go `to` and like every type of page
      // you should reference a renderer to the router we are getting right now.
      var view = _helpers2.default.getView(page);
      var transition = _helpers2.default.getTransition(page, this.transitions);

      this.to = _helpers2.default.getRenderer(page, this.renderers) || _renderer2.default;
      this.to = new this.to(page, view, transition); // eslint-disable-line

      // An event is emitted and can be used outside of the router to run
      // additionnal code when the navigation starts. It expose the `from` and `to`
      // [router-view] elements to the user and the router state.
      this.emit('NAVIGATE_START', this.from, this.to, this.state);

      // We select the right method based on the mode provided in the options.
      // If no mode is provided then the `out-in` method is chosen.
      var method = _helpers2.default.camelize(this.mode);

      if (typeof this[method] === 'function') {
        // Now we call the pipeline!
        this[method]().then(function () {
          _this5.navigating = false;

          // Same as the `NAVIGATE_START` event
          _this5.emit('NAVIGATE_END', _this5.from, _this5.to, _this5.state);

          // We prepare the next navigation by replacing the `from` renderer by
          // the `to` renderer now that the pages have been swapped successfully.
          _this5.from = _this5.to;

          // We might have a redirection to a page pointing to a specifig anchor
          // on this page so we have to deal with it and check if there is an anchor
          // present in the URL.
          if (_helpers2.default.getAnchor(_this5.state.url)) {
            // Now scroll to anchor!
            _this5.scrollTo(_helpers2.default.getAnchor(_this5.state.url));
          }
        });
      }
    }

    /**
     * Run `out` transition then `in` transition
     * 
     * @return {Promise} `out-in` Promise
     */

  }, {
    key: 'outIn',
    value: function outIn() {
      var _this6 = this;

      // Same as the `NAVIGATE_START` event
      this.emit('NAVIGATE_OUT', this.from, this.to, this.state);

      // Call `out` transition
      return this.from.hide().then(function () {
        // Reset scroll position
        window.scrollTo(0, 0);
      }).then(function () {
        // Same as the `NAVIGATE_START` event
        _this6.emit('NAVIGATE_IN', _this6.from, _this6.to, _this6.state);

        // Call `in` transition
        _this6.to.show();
      });
    }

    /**
     * Run `in` transition then `out` transition
     * 
     * @return {Promise} `in-out` Promise
     */

  }, {
    key: 'inOut',
    value: function inOut() {
      var _this7 = this;

      // Same as the `NAVIGATE_START` event
      this.emit('NAVIGATE_IN', this.from, this.to, this.state);

      // Call the `in` transition
      return this.to.show().then(function () {
        // Reset scroll position
        window.scrollTo(0, 0);
      }).then(function () {
        // Same as the `NAVIGATE_START` event
        _this7.emit('NAVIGATE_OUT', _this7.from, _this7.to, _this7.state);

        // Call the `out` transition
        _this7.from.hide();
      });
    }

    /**
     * Run both `in` and `out` transition at the same time.
     * 
     * @return {Promise} `both` Promise
     */

  }, {
    key: 'both',
    value: function both() {
      // Same as the `NAVIGATE_START` event
      this.emit('NAVIGATE_IN', this.from, this.to, this.state);
      this.emit('NAVIGATE_OUT', this.from, this.to, this.state);

      return Promise.all([this.to.show(), this.from.hide()]).then(function () {
        // Reset scroll position
        window.scrollTo(0, 0);
      });
    }

    /**
     * Scroll to a given element based on an anchor in the URL
     * 
     * @arg {string} id — Anchor ID
     */

  }, {
    key: 'scrollTo',
    value: function scrollTo(id) {
      var el = document.querySelector(id);

      if (el) {
        window.scrollTo(el.offsetLeft, el.offsetTop);
      }
    }
  }]);

  return HighwayCore;
}(_tinyEmitter2.default);

module.exports = HighwayCore;

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _core = __webpack_require__(4);

var _core2 = _interopRequireDefault(_core);

var _helpers = __webpack_require__(0);

var _helpers2 = _interopRequireDefault(_helpers);

var _renderer = __webpack_require__(1);

var _renderer2 = _interopRequireDefault(_renderer);

var _transition = __webpack_require__(2);

var _transition2 = _interopRequireDefault(_transition);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @file Highway object containing all parts of the script.
 * @author Anthony Du Pont <bulldog@dogstudio.co>
 */
var Highway = {
  Core: _core2.default,
  Helpers: _helpers2.default,
  Renderer: _renderer2.default,
  Transition: _transition2.default
};

module.exports = Highway;

/***/ })
/******/ ]);
});