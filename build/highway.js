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
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
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

// CONCATENATED MODULE: ./src/renderer.js
/**
 * @file Highway default renderer that handle DOM stuffs.
 * @author Anthony Du Pont <bulldog@dogstudio.co>
 */

class Renderer {

  /**
   * @arg {object} properties — Set of properties (slug, page, view,...)
   * @constructor
   */
  constructor(properties) {
    // We get the view.
    this.view = document.querySelector('[data-router-view]');

    // We save properties of the renderer
    this.properties = properties;

    // We get our transition we will use later to show/hide our view.
    this.Transition = properties.transition ? new properties.transition(this.view) : null;
  }

  /**
   * Renderer initialization.
   */
  setup() {
    // These both methods have to be called at least once on first load.
    this.onEnter && this.onEnter();
    this.onEnterCompleted && this.onEnterCompleted();
  }

  /**
   * Add view in DOM.
   */
  add() {
    // We setup the DOM for our [data-router-view]
    this.view.setAttribute('data-router-view', this.properties.slug);
    this.view.innerHTML = this.properties.view.innerHTML;
  }

  /**
   * Remove view in DOM.
   */
  remove() {
    this.view.innerHTML = '';
  }

  /**
   * Update document informations
   */
  update() {
    // Now we update all the informations in the DOM we need!
    // We update the title
    document.title = this.properties.page.title;
  }

  /**
   * Add the view in DOM and play an `in` transition if one is defined.
   *
   * @return {object} Promise
   */
  show() {
    return new Promise(async resolve => {
      // Update DOM.
      this.update();

      // The `onEnter` method if set is called everytime the view is appended
      // to the DOM. This let you do some crazy stuffs at this right moment.
      this.onEnter && this.onEnter();

      // The transition is set in your custom renderer with a getter called
      // `transition` that should return the transition object you want to
      // apply to you view. We call the `in` step of this one right now!
      this.Transition && await this.Transition.show();

      // The `onEnterCompleted` method if set in your custom renderer is called
      // everytime a transition is over if set. Otherwise it's called right after
      // the `onEnter` method.
      this.onEnterCompleted && this.onEnterCompleted();

      // We resolve the Promise.
      resolve();
    });
  }

  /**
   * Play an `out` transition if one is defined and remove the view from DOM.
   *
   * @return {object} Promise
   */
  hide() {
    return new Promise(async resolve => {
      // The `onLeave` method if set in your custom renderer is called everytime
      // before a view will be removed from the DOM. This let you do some stuffs
      // right before the view isn't available anymore.
      this.onLeave && this.onLeave();

      // We call the `out` step of your transition right now!
      this.Transition && await this.Transition.hide();

      // Remove view from DOM.
      this.remove();

      // The `onLeaveCompleted` method if set in your custom renderer is called
      // everytime a view is completely removed from the DOM.
      this.onLeaveCompleted && this.onLeaveCompleted();

      // Resolve Promise
      resolve();
    });
  }
}

// CONCATENATED MODULE: ./src/helpers.js
/**
 * @file Highway helper methods used all acrosse the script.
 * @author Anthony Du Pont <bulldog@dogstudio.co>
 */

// Dependencies


// Constants
const PARSER = new window.DOMParser();

// Highway Helpers
class helpers_Helpers {

  /**
   * @arg {object} renderers — List of renderers
   * @arg {object} transitions — List of transitions
   * @constructor
   */
  constructor(renderers, transitions) {
    this.renderers = renderers;
    this.transitions = transitions;
  }

  /**
   * Get origin of an URL
   *
   * @arg    {string} url — URL to match
   * @return {string} Origin of URL or `null`
   * @static
   */
  getOrigin(url) {
    const match = url.match(/(https?:\/\/[\w\-.]+)/);
    return match ? match[1].replace(/https?:\/\//, '') : null;
  }

  /**
   * Get pathname of an URL
   *
   * @arg    {string} url — URL to match
   * @return {string} Pathname of URL or `null`
   * @static
   */
  getPathname(url) {
    const match = url.match(/https?:\/\/.*?(\/[\w_\-./]+)/);
    return match ? match[1] : '/';
  }

  /**
   * Get anchor in an URL
   *
   * @arg    {string} url — URL to match
   * @return {string} Anchor in URL or `null`
   * @static
   */
  getAnchor(url) {
    const match = url.match(/(#.*)$/);
    return match ? match[1] : null;
  }

  /**
   * Get search in URL.
   *
   * @arg    {string} url — URL to match
   * @return {object} Search in URL formatted as an object or `null`
   * @static
   */
  getParams(url) {
    const match = url.match(/\?([\w_\-.=&]+)/);

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
   * Get page's DOM from page HTML
   *
   * @arg    {string} page — Page HTML
   * @return {string} Page DOM
   * @static
   */
  getDOM(page) {
    return typeof page === 'string' ? PARSER.parseFromString(page, 'text/html') : page;
  }

  /**
   * Get view element from page DOM
   *
   * @arg    {string} page — Page DOM
   * @return {object} View element or `null`
   * @static
   */
  getView(page) {
    return page.querySelector('[data-router-view]');
  }

  /**
   * Get view's slug from view element
   *
   * @arg    {string} view — [data-router-view] DOM
   * @return {string} Page slug or `null`
   * @static
   */
  getSlug(view) {
    return view.getAttribute('data-router-view');
  }

  /**
   * Get page renderer
   *
   * @arg    {string} slug — Renderer's slug
   * @return {object} Single renderer or default one
   * @static
   */
  getRenderer(slug) {
    if (slug in this.renderers) {
      const renderer = this.renderers[slug];

      if (typeof renderer === 'function' && !Renderer.isPrototypeOf(renderer)) {
        return Promise.resolve(renderer()).then(({ default: cons }) => cons);
      }

      if (typeof renderer.then === 'function') {
        return Promise.resolve(renderer).then(({ default: cons }) => cons);
      }

      return Promise.resolve(renderer);
    }

    return Promise.resolve(Renderer);
  }

  /**
   * Get page transition
   *
   * @arg    {string} slug — Transition slug
   * @return {object} Single transition or `null`
   * @static
   */
  getTransition(slug) {
    if (!this.transitions) {
      return null;
    }

    if (!(slug in this.transitions)) {
      if ('default' in this.transitions) {
        return this.transitions['default'];
      }
      return null;
    }

    return this.transitions[slug];
  }

  /**
   * Get all required properties for a context.
   *
   * @arg    {object} context – DOM context
   * @return {object} Properties
   */
  getProperties(context) {
    const page = this.getDOM(context);
    const view = this.getView(page);
    const slug = this.getSlug(view);
    const renderer = this.getRenderer(slug, this.renderers);
    const transition = this.getTransition(slug, this.transitions);

    return {
      page,
      view,
      slug,
      renderer,
      transition
    };
  }

  /**
   * Get state of an URL.
   *
   * @arg    {string} url — URL to decompose
   * @return {object} State
   */
  getLocation(url) {
    return {
      href: url,
      anchor: this.getAnchor(url),
      origin: this.getOrigin(url),
      params: this.getParams(url),
      pathname: this.getPathname(url)
    };
  }
}

// CONCATENATED MODULE: ./src/core.js
/**
 * @file Highway core that handle all history stuffs.
 * @author Anthony Du Pont <bulldog@dogstudio.co>
 */



class core_Core extends tiny_emitter_default.a {

  /**
   * @arg {object} opts — User options
   * @arg {object} opts.renderers — List of renderers
   * @arg {object} opts.transitions — List of transitions
   * @extends Emitter
   * @constructor
   */
  constructor({ renderers, transitions } = {}) {
    // Extends the Emitter constructor in order to be able to use its features
    // and send custom events all along the script.
    super();

    // Helpers.
    this.Helpers = new helpers_Helpers(renderers, transitions);

    // Properties & state.
    this.location = this.Helpers.getLocation(window.location.href);
    this.properties = this.Helpers.getProperties(document.cloneNode(true));

    // Status variables.
    this.popping = false;
    this.running = false;

    // Cache
    this.cache = new Map();
    this.cache.set(this.location.href, this.properties);

    // Get the page renderer and properly setup it.
    this.properties.renderer.then(Renderer => {
      this.From = new Renderer(this.properties);
      this.From.setup();
    });

    // Events variables.
    this._navigate = this.navigate.bind(this);

    // Listen the `popstate` on the window to run the router each time an
    // history entry changes. Basically everytime the backward/forward arrows
    // are triggered by the user.
    window.addEventListener('popstate', this.popState.bind(this));

    // Event attachement
    this.attach();
  }

  /**
   * Attach `click` event on links.
   */
  attach() {
    // Get all elligible links.
    this.links = document.querySelectorAll('a:not([target]):not([data-router-disabled])');

    for (const link of this.links) {
      link.addEventListener('click', this._navigate);
    }
  }

  /**
   * Detach `click` event on links.
   */
  detach() {
    for (const link of this.links) {
      link.removeEventListener('click', this._navigate);
    }
  }

  /**
   * Click method called on `click` event.
   *
   * @arg {object} e - `click` event
   */
  navigate(e) {
    // Prevent default `click`
    e.preventDefault();

    // We have to redirect to our `href` using Highway
    this.redirect(e.currentTarget.href);
  }

  /**
   * Redirect to URL
   * @param {string} href - URL
   */
  redirect(href) {
    // When our URL is different from the current location `href` and no other
    // navigation is running for the moment we are allowed to start a new one.
    // But if the URL containes anchors or if the origin is different we force
    // the hard reloading of the page to avoid serious errors.
    if (!this.running && href !== this.location.href) {
      // We temporary store the future location.
      const location = this.Helpers.getLocation(href);

      if (location.origin !== this.location.origin || location.anchor && location.pathname === this.location.pathname) {
        window.location.href = href;

      } else {
        this.location = location;

        // Now all our conditions are passed we can update our location and do
        // what we need to do before fetching it.
        this.beforeFetch();
      }
    }
  }

  /**
   * Watch history entry changes.
   */
  popState() {
    // We temporary store the future location.
    const location = this.Helpers.getLocation(window.location.href);

    // When users navigate using the browser buttons we check if the locations
    // have no anchors and that our locations are different.
    if (this.location.pathname !== location.pathname || !this.location.anchor && !location.anchor) {
      this.popping = true;
      this.location = location;

      // If everything is fine we can save our location and do what we need to
      // do before fetching it.
      this.beforeFetch();

    } else {
      // Update Location
      this.location = location;
    }
  }

  /**
   * Update DOM on `click` event.
   */
  pushState() {
    if (!this.popping) {
      window.history.pushState(this.location, '', this.location.href);
    }
  }

  /**
   * Fetch the page from URL
   *
   * @return {string} Fetch response
   */
  async fetch() {
    const response = await fetch(this.location.href, {
      mode: 'same-origin',
      method: 'GET',
      headers: { 'X-Requested-With': 'Highway' },
      credentials: 'same-origin'
    });

    // We have to checked if the fetch response is OK otherwise we have to force
    // the hard reloading of the page because we might have an error.
    if (response.status >= 200 && response.status < 300) {
      return response.text();
    }

    window.location.href = this.location.href;
  }

  /**
   * Do some tests before HTTP requests to optimize pipeline.
   */
  async beforeFetch() {
    // We lock the navigation to avoid multiples clicks that could overload the
    // navigation process meaning that if the a navigation is running the user
    // cannot trigger a new one while the previous one is running.
    this.running = true;

    // We emit an event right before hiding the current view to create a hook
    // for developers that want to do stuffs when an elligible link is clicked.
    this.emit('NAVIGATE_OUT', {
      page: this.From.properties.page,
      view: this.From.properties.view
    }, this.location);

    // We have to verify our cache in order to save some HTTPRequests. If we
    // don't use any caching system everytime we would come back to a page we
    // already saw we will have to fetch it again and it's pointless.
    if (this.cache.has(this.location.href)) {
      // We wait until the view is hidden.
      await this.From.hide();

      // Get Properties
      this.properties = this.cache.get(this.location.href);

    } else {
      // We wait till all our Promises are resolved.
      const results = await Promise.all([
        this.fetch(),
        this.From.hide()
      ]);

      // Now everything went fine we can extract the properties of the view we
      // successfully fetched and keep going.
      this.properties = this.Helpers.getProperties(results[0]);

      // We cache our result
      // eslint-disable-next-line
      this.cache.set(this.location.href, this.properties);
    }

    this.pushState();
    this.afterFetch();
  }

  /**
   * Push page in DOM
   */
  async afterFetch() {
    // We are calling the renderer attached to the view we just fetched and we
    // are adding the [data-router-view] in our DOM.
    const Renderer = await this.properties.renderer;

    this.To = new Renderer(this.properties);
    this.To.add();

    // We then emit a now event right before the view is shown to create a hook
    // for developers who want to make stuff before the view is visible.
    this.emit('NAVIGATE_IN', {
      page: this.To.properties.page,
      view: this.To.view
    }, this.location);

    // We wait for the view transition to be over before resetting some variables
    // and reattaching the events to all the new elligible links in our DOM.
    await this.To.show();

    this.popping = false;
    this.running = false;

    this.detach();
    this.attach();

    // Finally we emit a last event to create a hook for developers who want to
    // make stuff when the navigation has ended.
    this.emit('NAVIGATE_END', {
      page: this.To.properties.page,
      view: this.To.view
    },
    {
      page: this.From.properties.page,
      view: this.From.properties.view
    }, this.location);

    // Last but not least we swap the From and To renderers for future navigations.
    this.From = this.To;
  }
}

// CONCATENATED MODULE: ./src/transition.js
/**
 * @file Highway default transition that handle DOM animations.
 * @author Anthony Du Pont <bulldog@dogstudio.co>
 */

class Transition {

  /**
   * @arg {object} view — [data-router-view] node
   * @constructor
   */
  constructor(view) {
    // The [data-router-view] is the only main information we need since the role of
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
      // The `in` method in encapsulated in the `show` method make transition
      // code easier to write. This way you don't have to define any Promise
      // in your transition code and focus on the transition itself.
      this.in && this.in(this.view, resolve);
    });
  }

  /**
   * Play an `out` transition if one is defined and remove the view from DOM.
   *
   * @return {object} Promise
   */
  hide() {
    return new Promise(resolve => {
      // The `out` method in encapsulated in the `hide` method make transition
      // code easier to write. This way you don't have to define any Promise
      // in your transition code and focus on the transition itself.
      this.out && this.out(this.view, resolve);
    });
  }
}

// CONCATENATED MODULE: ./src/index.js
/**
 * @file Highway object containing all parts of the script.
 * @author Anthony Du Pont <bulldog@dogstudio.co>
 */





/* harmony default export */ var src = __webpack_exports__["default"] = ({
  Core: core_Core,
  Helpers: helpers_Helpers,
  Renderer: Renderer,
  Transition: Transition
});


/***/ })
/******/ ]);
});