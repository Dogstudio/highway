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
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
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
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);

// EXTERNAL MODULE: ./node_modules/tiny-emitter/index.js
var tiny_emitter = __webpack_require__(0);
var tiny_emitter_default = /*#__PURE__*/__webpack_require__.n(tiny_emitter);

// CONCATENATED MODULE: ./src/helpers.js
/**
 * @file Highway helper methods used all acrosse the script.
 * @author Anthony Du Pont <bulldog@dogstudio.co>
 */
const PARAM_REGEX = /\?([\w_\-.=&]+)/;
const ANCHOR_REGEX = /(#.*)$/;
const ORIGIN_REGEX = /(https?:\/\/[\w\-.]+)/;
const PATHNAME_REGEX = /https?:\/\/.*?(\/[\w_\-./]+)/;
const CAMELCASE_REGEX = /[-_](\w)/g;

/**
 * Get origin of an URL
 *
 * @arg    {string} url — URL to match
 * @return {string} Origin of URL or `null`
 */
function getOrigin(url) {
  const match = url.match(ORIGIN_REGEX);
  return match ? match[1] : null;
}

/**
 * Get pathname of an URL
 *
 * @arg    {string} url — URL to match
 * @return {string} Pathname of URL or `null`
 */
function getPathname(url) {
  const match = url.match(PATHNAME_REGEX);
  return match ? match[1] : null;
}

/**
 * Get anchor in an URL
 *
 * @arg    {string} url — URL to match
 * @return {string} Anchor in URL or `null`
 */
function getAnchor(url) {
  const match = url.match(ANCHOR_REGEX);
  return match ? match[1] : null;
}

/**
 * Get search in URL.
 *
 * @arg    {string} url — URL to match
 * @return {object} Search in URL formatted as an object or `null`
 */
function getParams(url) {
  const match = url.match(PARAM_REGEX);

  if (!match) {
    return null;
  }

  const search = match[1].split('&');
  const object = {};

  for (let i = 0; i < search.length; i++) {
    const part = search[i].split('=');
    const { 0: key } = part;
    const { 1: value } = part;

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
  const params = getParams(url);
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
  // We create instance of the DOM parser in order to parse our string and 
  // return the DOM properly.
  const parser = new DOMParser();

  // Now we can return the DOM.
  return parser.parseFromString(page, 'text/html');
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
 * Get page renderer
 *
 * @arg    {string} page — Page HTML to use
 * @arg    {object} renderers — List of renderers
 * @return {object} Single renderer or `null`
 */
function getRenderer(page, renderers) {
  const slug = getSlug(page);
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

  const slug = getSlug(page);

  if (!transitions.hasOwnProperty(slug) || !transitions[slug]) {
    if (transitions.hasOwnProperty('default')) {
      return transitions['default'];
    }

    return null;
  }

  return transitions[slug];
}

/**
 * Export all helpers
 */
/* harmony default export */ var helpers = ({
  getDOM,
  getSlug,
  getView,
  getInfos,
  getParam,
  getParams,
  getOrigin,
  getAnchor,
  getPathname,
  getRenderer,
  getTransition
});
// CONCATENATED MODULE: ./src/renderer.js
/**
 * @file Highway default renderer that handle DOM stuffs.
 * @author Anthony Du Pont <bulldog@dogstudio.co>
 */


class renderer_HighwayRenderer {

  /**
   * @arg {string} page — Page HTML
   * @arg {object} view — Page view Node
   * @arg {string} transition — Page transition
   * @constructor
   */
  constructor(page, view, transition) {
    // The [router-view] and the page title are the only main information we need
    // since the role of the renderer is to update the required DOM elements with
    // the page informations. In our case the content and title of the document.
    this.view = view;
    this.page = helpers.getDOM(page);
    this.title = this.page.title;
    this.transition = transition ? new transition(view) : null; // eslint-disable-line

    // We are getting the `html` and `body` tags class attribute value to make
    // sure we always have the correct classnames in our DOM.
    this.bodyClass = this.page.body.className;
    this.HTMLClass = this.page.documentElement.className;

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
  show() {
    return new Promise(resolve => {
      this.wrapper = document.querySelector('[router-wrapper]');

      // Now we update all the informations in the DOM we need!
      // We update the class attribute on the `html` tag
      if (this.HTMLClass && this.HTMLClass !== document.documentElement.className) {
        document.documentElement.className = this.HTMLClass;
      }

      // We update the class attribute on the `body` tag
      if (this.bodyClass && this.bodyClass !== document.body.className) {
        document.body.className = this.bodyClass;
      }

      // We update the document title
      if (this.title && document.title !== this.title) {
        document.title = this.title;
      }

      // Before doing anything crazy you need to know your view doesn't exists
      // in the [router-wrapper] so it is appended to it right now!
      this.wrapper.appendChild(this.view);

      // The `onEnter` method if set in your custom renderer is called everytime
      // the view is appended to the DOM. This let you do some crazy stuffs at
      // this right moment.
      if (this.onEnter) {
        this.onEnter();
      }

      // Use of a callback method to optimize lines of code.
      const done = () => {
        // The `onEnterCompleted` method if set in your custom renderer is called 
        // everytime a transition is over if set. Otherwise it's called right after
        // the `onEnter` method.
        if (this.onEnterCompleted) {
          this.onEnterCompleted();
        }
        resolve();
      };

      // You fool you didn't define any transition...
      if (!this.transition) {
        done();
        return;
      }

      // The transition is set in your custom renderer with a getter called
      // `transition` that should return the transition object you want to 
      // apply to you view. We call the `in` step of this one right now!
      this.transition.show().then(done);
    });
  }

  /**
   * Play an `out` transition if one is defined and remove the view from DOM.
   * 
   * @return {object} Promise
   */
  hide() {
    return new Promise(resolve => {
      this.wrapper = this.view.parentNode;

      // The `onLeave` method if set in your custom renderer is called everytime
      // before a view will be removed from the DOM. This let you do some stuffs
      // right before the view isn't available anymore.
      if (this.onLeave) {
        this.onLeave();
      }

      // Use of a callback method to optimize lines of code.
      const done = () => {
        // It's time to say goodbye to the view... Farewell my friend.
        this.wrapper.removeChild(this.view);

        // The `onLeaveCompleted` method if set in your custom renderer is called 
        // everytime a view is completely removed from the DOM.
        if (this.onLeaveCompleted) {
          this.onLeaveCompleted();
        }
        resolve();
      };

      // You fool you didn't define any transition...
      if (!this.transition) {
        done();
        return;
      }

      // We call the `out` step of your transition right now!
      this.transition.hide().then(done);
    });
  }
}

/* harmony default export */ var renderer = (renderer_HighwayRenderer);
// CONCATENATED MODULE: ./src/core.js
/**
 * @file Highway core that handle all history stuffs.
 * @author Anthony Du Pont <bulldog@dogstudio.co>
 */




// Fetch API options used for every HTTP request sent by Highway. It makes
// sure the HTTP requests URL are only on the same origin and that credentials
// are also only sent on same origin. An extra `X-Requested-With` header is
// available if needed in your scripts.
const core_FETCH_OPTS = {
  mode: 'same-origin',
  method: 'GET',
  headers: {
    'X-Requested-With': 'XMLHttpRequest'
  },
  credentials: 'same-origin'
};

class core_HighwayCore extends tiny_emitter_default.a {

  /**
   * @arg {object} opts — User options
   * @arg {object} opts.renderers — List of renderers
   * @arg {object} opts.transitions — List of transitions
   * @extends Emitter
   * @constructor
   */
  constructor(opts) {
    // Extends the Emitter constructor in order to be able to use its features
    // and send custom events all along the script.
    super();

    // All your custom renderers and transitions you sent to Highway.
    this.renderers = opts.renderers;
    this.transitions = opts.transitions;

    // Some usefull stuffs for later
    this.mode = opts.mode || 'out-in';
    this.state = {};
    this.cache = {};
    this.empty = false;
    this.loading = false;
    this.navigating = false;

    // Cache the page we land on for further HTTP request optimization.
    this.page = document.documentElement.outerHTML;
    this.pathname = helpers.getPathname(window.location.href);
    this.cache[this.pathname] = this.page;

    // Get the page renderer and directly call its `onEnter` and `onEnterCompleted`
    // methods in order to properly initialize the page.
    const view = document.querySelector('[router-view]');
    const transition = helpers.getTransition(this.page, this.transitions);

    this.from = helpers.getRenderer(this.page, this.renderers) || renderer;
    this.from = new this.from(this.page, view, transition); // eslint-disable-line

    // We check the `onEnter` and `onEnterCompleted` methods and we call them 
    // respectively if they are set
    if (this.from.onEnter) {
      this.from.onEnter();
    }

    if (this.from.onEnterCompleted) {
      this.from.onEnterCompleted();
    }

    // Listen the `popstate` on the window to run the router each time an 
    // history entry changes. Basically everytime the backward/forward arrows
    // are triggered by the user.
    window.addEventListener('popstate', this.popState.bind(this));

    // Event bubbling
    this.bubble();
  }

  /**
   * Bubble `click` event
   */
  bubble() {
    // Use the bubbling principle from document to all each children and catch
    // only the link elements without target and not pointing to an anchor on
    // the page.
    document.addEventListener('click', e => {
      if (e.target.tagName === 'A') {
        const anchor = helpers.getAnchor(e.target.href);
        const pathname = helpers.getPathname(e.target.href);

        if (!e.target.target) {
          // To run the router properly we have to prevent the default behaviour
          // of link elements to avoir page reloading.
          e.preventDefault();

          if (!this.navigating && pathname !== this.pathname) {
            // Now push the state!
            this.pushState(e);
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
  popState() {
    // We quickly check if the pathname has changed before doing anything else
    // because with anchor the `popstate` event might trigger but the pathname
    // might not change and nothing should happen then.
    const pathname = helpers.getPathname(window.location.href);

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
  pushState(event) {
    // Call of `beforeFetch` for optimizations
    this.beforeFetch(event.target.href, true);
  }

  /**
   * Do some tests before HTTP requests to optimize pipeline.
   * 
   * @arg {string} url – URL to use
   * @arg {boolean} history — Push entry in history if `true`
   */
  beforeFetch(url, history) {
    // Use of a boolean to avoid repetitive fetch calls by super excited users
    // that could lead to some serious issues.
    this.loading = true;
    this.navigating = true;

    // Using the `getInfos` from the Helpers we can get all the information from
    // a given URL we can use in our script (origin, pathname, parameters,...).
    this.state = helpers.getInfos(url);
    this.pathname = helpers.getPathname(url);

    // We trigger an event when a link is clicked to let you know do whatever
    // you want at this point of the process.
    this.emit('NAVIGATE_OUT', this.from, this.state);

    // We start the transition `out` of our renderer and to some check to avoid
    // to start the `in` transition if the fetch call is still running.
    this.from.hide().then(() => {
      this.empty = true;

      if (!this.loading) {
        this.complete();
      }
    });

    // We need to check if the state URL is available in the cache to avoid
    // useless HTTP request and get the page HTML from the cache if possible.
    if (this.cache.hasOwnProperty(this.pathname)) {
      // Now push the page!
      this.beforePush(this.cache[this.pathname], history);

      // And stop there.
      return;
    }

    // Get the page URL from the state previously pushed in the history.
    this.fetch().then(page => this.beforePush(page, history));
  }

  /**
   * Fetch the page from URL
   * 
   * @return {string} Fetch response
   * @return {object} Fetch Promise
   */
  fetch() {
    return fetch(this.state.url, core_FETCH_OPTS).then(response => {
      // Check the HTTP code
      // 200+: Success of the HTTP request
      if (response.status >= 200 && response.status < 300) {
        // The HTTP response is the page HTML as a string
        return response.text();
      }

      // An extra event is emitted if an error has occured that can be used
      // outside of the router to let you deal with the mess that happened.
      this.emit('NAVIGATE_ERROR', response);

      // !200+: Error of the HTTP request
      throw new Error(response.statusText);
    });
  }

  /**
   * Get a page from URL or from cache successfully
   * 
   * @arg {string} page - Page HTML as a string
   * @arg {string} history - Push entry in history if `true`
   */
  beforePush(page, history) {
    // We push a new entry in the history in order to be able to navigate
    // with the backward and forward buttons from the browser.
    if (history) {
      window.history.pushState(this.state, '', this.state.url);
    }

    // Now push the page!
    this.push(page);
  }

  /**
   * Push page in DOM
   * 
   * @arg {string} page — Page HTML
   * @arg {boolean} history — Push entry in history if `true`
   */
  push(page) {
    // Fetch is not loading anymore...
    this.loading = false;

    // Cache the page for HTTP request optimization
    this.cache[this.pathname] = page;

    // The page we get is the one we want to go `to` and like every type of page
    // you should reference a renderer to the router we are getting right now.
    const view = helpers.getView(page);
    const transition = helpers.getTransition(page, this.transitions);

    this.to = helpers.getRenderer(page, this.renderers) || renderer;
    this.to = new this.to(page, view, transition); // eslint-disable-line

    if (this.empty) {
      this.complete();
    }
  }

  /**
   * Complete the process
   */
  complete() {
    // We trigger an event when the new content is displayed.
    this.emit('NAVIGATE_IN', this.to, this.state);

    // We reset the scroll position
    window.scrollTo(0, 0);

    // Now we show our content!
    this.to.show().then(() => {
      // We reset our state variables
      this.empty = false;
      this.navigating = false;

      // Same as the `NAVIGATE_START` event
      this.emit('NAVIGATE_END', this.from, this.to, this.state);

      // We prepare the next navigation by replacing the `from` renderer by
      // the `to` renderer now that the pages have been swapped successfully.
      this.from = this.to;
    });
  }
}

/* harmony default export */ var core = (core_HighwayCore);
// CONCATENATED MODULE: ./src/transition.js
/**
 * @file Highway default transition that handle DOM animations.
 * @author Anthony Du Pont <bulldog@dogstudio.co>
 */
class HighwayTransition {

  /**
   * @arg {object} view — [router-view] Node
   * @constructor
   */
  constructor(view) {
    // The [router-view] is the only main information we need since the role of
    // the transition is to show/hide the required DOM elements.
    this.view = view;
  }

  /**
   * Add the view in DOM and play an `in` transition if one is defined.
   * 
   * @return {object} Promise
   */
  show() {
    return new Promise(resolve => {
      if (this.in && typeof this.in === 'function') {
        // The `in` method in encapsulated in the `show` method make transition
        // code easier to write. This way you don't have to define any Promise
        // in your transition code and focus on the transition itself.
        this.in(this.view, resolve);
      }
    });
  }

  /**
   * Play an `out` transition if one is defined and remove the view from DOM.
   * 
   * @return {object} Promise
   */
  hide() {
    return new Promise(resolve => {
      if (this.out && typeof this.out === 'function') {
        // The `out` method in encapsulated in the `hide` method make transition
        // code easier to write. This way you don't have to define any Promise
        // in your transition code and focus on the transition itself.
        this.out(this.view, resolve);
      }
    });
  }
}

/* harmony default export */ var src_transition = (HighwayTransition);
// CONCATENATED MODULE: ./src/index.js
/**
 * @file Highway object containing all parts of the script.
 * @author Anthony Du Pont <bulldog@dogstudio.co>
 */





const src_Highway = {
  Core: core,
  Helpers: helpers,
  Renderer: renderer,
  Transition: src_transition
};

/* harmony default export */ var src = __webpack_exports__["default"] = (src_Highway);

/***/ })
/******/ ]);
});