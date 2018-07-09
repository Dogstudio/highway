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
   * @arg {object} props — Set of properties (slug, page, view,...)
   * @constructor
   */
  constructor(props) {
    // We get the view.
    this.root = document.querySelector('[router-view]');

    // We save fetched informations
    this.page = props.page;
    this.view = props.view;
    this.slug = props.slug;

    // We get our transition we will use later to show/hide our view.
    this.Transition = props.transition ? new props.transition(this.root) : null;
  }

  /**
   * Renderer initialization.
   */
  setup() {
    // We call the `onEnter` and `onEnterCompleted` methods of the renderer on
    // initialization if they exists.
    this.onEnter && this.onEnter();
    this.onEnterCompleted && this.onEnterCompleted();
  }

  /**
   * Add view in DOM.
   */
  add() {
    // We update the [router-view] slug
    this.root.setAttribute('router-view', this.slug);

    // And HTML
    this.root.innerHTML = this.view.innerHTML;
  }

  /**
   * Remove view in DOM.
   */
  remove() {
    // It's time to say goodbye to the view... Farewell my friend.
    this.root.innerHTML = '';
  }

  /**
   * Update document informations
   */
  update() {
    // Now we update all the informations in the DOM we need!
    // We update the class attribute on the `html` and `body` tag and the title
    document.title = this.page.title;
    document.body.className = this.page.body.className;
    document.documentElement.className = this.page.documentElement.className;
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
   * Get origin of an URL
   *
   * @arg    {string} url — URL to match
   * @return {string} Origin of URL or `null`
   * @static
   */
  static getOrigin(url) {
    const match = url.match(/(https?:\/\/[\w\-.]+)/);
    return match ? match[1] : null;
  }

  /**
   * Get pathname of an URL
   *
   * @arg    {string} url — URL to match
   * @return {string} Pathname of URL or `null`
   * @static
   */
  static getPathname(url) {
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
  static getAnchor(url) {
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
  static getParams(url) {
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
  static getDOM(page) {
    return typeof page === 'string' ? PARSER.parseFromString(page, 'text/html') : page;
  }

  /**
   * Get view element from page DOM
   *
   * @arg    {string} page — Page DOM
   * @return {object} View element or `null`
   * @static
   */
  static getView(page) {
    return page.querySelector('[router-view]');
  }

  /**
   * Get view's slug from view element
   *
   * @arg    {string} view — [router-view] DOM
   * @return {string} Page slug or `null`
   * @static
   */
  static getSlug(view) {
    return view.getAttribute('router-view');
  }

  /**
   * Get page renderer
   *
   * @arg    {string} slug — Renderer's slug
   * @arg    {object} renderers — List of renderers
   * @return {object} Single renderer or default one
   * @static
   */
  static getRenderer(slug, renderers) {
    if (typeof renderers === 'undefined' || !renderers) {
      return Renderer;
    }
    return slug in renderers ? renderers[slug] : Renderer;
  }

  /**
   * Get page transition
   *
   * @arg    {string} slug — Transition slug
   * @arg    {object} transitions — List of transitions
   * @return {object} Single transition or `null`
   * @static
   */
  static getTransition(slug, transitions) {
    if (typeof transitions === 'undefined' || !transitions) {
      return null;
    }

    if (!(slug in transitions)) {
      if ('default' in transitions) {
        return transitions['default'];
      }
      return null;
    }

    return transitions[slug];
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

    // All your custom renderers and transitions you sent to Highway.
    this.renderers = renderers;
    this.transitions = transitions;

    // Properties & state.
    this.state = this.getState(window.location.href);
    this.props = this.getProps(document.cloneNode(true));

    // Link.
    this.link = null;

    // Cache.
    this.cache = new Map();

    // Status variables.
    this.navigating = false;

    // Get the page renderer and properly setup it.
    this.From = new (helpers_Helpers.getRenderer(this.props.slug, this.renderers))(this.props);
    this.From.setup();

    // Events
    this._click = this.click.bind(this);

    // Listen the `popstate` on the window to run the router each time an
    // history entry changes. Basically everytime the backward/forward arrows
    // are triggered by the user.
    window.addEventListener('popstate', this.popState.bind(this));

    // Event binding
    this.bind();
  }

  /**
   * Get all required properties for a context.
   *
   * @arg    {string|object} context – DOM context
   * @return {object} Properties
   */
  getProps(context) {
    const page = helpers_Helpers.getDOM(context);
    const view = helpers_Helpers.getView(page);
    const slug = helpers_Helpers.getSlug(view);
    const transition = helpers_Helpers.getTransition(slug, this.transitions);

    return {
      page,
      view,
      slug,
      transition
    };
  }

  /**
   * Get state of an URL.
   *
   * @arg    {string} location — Window location
   * @return {object} State
   */
  getState(location) {
    return {
      url: location,
      anchor: helpers_Helpers.getAnchor(location),
      origin: helpers_Helpers.getOrigin(location),
      params: helpers_Helpers.getParams(location),
      pathname: helpers_Helpers.getPathname(location)
    };
  }

  /**
   * Bind `click` event on links.
   */
  bind() {
    // We get all the links from the document except the ones with a `target`
    // attribute.
    this.links = document.querySelectorAll('a:not([target]):not([href*="javascript"])');

    // We then loop over each one of them to bind the `click` event.
    for (const link of this.links) {
      link.addEventListener('click', this._click);
    }
  }

  /**
   * Unbind `click` event on links.
   */
  unbind() {
    // We then loop over each one of them to unbind the `click` event.
    for (const link of this.links) {
      link.removeEventListener('click', this._click);
    }
  }

  /**
   * Click method called on `click` event.
   *
   * @arg {object} event - `click` event
   */
  click(event) {
    // To run the router properly we have to prevent the default behaviour
    // of link elements to avoir page reloading.
    event.preventDefault();

    // Now get the URL of the target element!
    const { href } = event.currentTarget;

    // We get the anchor and the pathname of the link that the user clicked
    // in order to compare it with the current state and handle the `click`
    // event appropriately.
    const anchor = helpers_Helpers.getAnchor(href);
    const params = helpers_Helpers.getParams(href);
    const pathname = helpers_Helpers.getPathname(href);

    if (!this.navigating && pathname !== this.state.pathname && !params) {
      // Update link
      this.link = event.currentTarget;

      // Now push the state!
      this.pushState();

    } else {
      // If the pathnames are the same there might be an anchor appended to
      // it so we need to check it and reload the page to use the default
      // browser behaviour.
      if (anchor || params) {
        window.location.href = href;
      }

    }
  }

  /**
   * Watch history entry changes.
   */
  popState() {
    // We update the state based on the clicked link `href` property.
    const state = this.getState(window.location.href);

    if (state.pathname !== this.state.pathname) {
      // Call `beforeFetch` for optimizations.
      this.beforeFetch(state);
    }
  }

  /**
   * Update DOM on `click` event.
   */
  pushState() {
    // We update the state based on the clicked link `href` property.
    const state = this.getState(this.link.href);

    // We push a new entry in the history in order to be able to navigate
    // with the backward and forward buttons from the browser.
    state.pathname && window.history.pushState(state, '', state.url);

    // Call `beforeFetch` for optimizations.
    this.beforeFetch(state);
  }

  /**
   * Do some tests before HTTP requests to optimize pipeline.
   *
   * @arg {object} state - State to save
   */
  async beforeFetch(state) {
    // Use of a boolean to avoid repetitive fetch calls by super excited users
    // that could lead to some serious issues.
    this.navigating = true;

    // We trigger an event when a link is clicked to let you know do whatever
    // you want at this point of the process.
    this.emit('NAVIGATE_OUT', {
      page: this.From.page,
      view: this.From.view
    }, this.state);

    // Unbind events
    this.unbind();

    // We pause the script and wait for the `from` renderer to be completely
    // hidden and removed from the DOM.
    await this.From.hide();

    // Update state with the one returne by the browser history. Basically
    // this is the state that was previously pushed by `history.pushState`.
    this.state = state;

    // We check cache to avoid unecessary HTTP requests.
    if (!this.cache.has(this.state.pathname)) {
      // We pause the script and wait for the new page to be fetched
      const page = await this.fetch();

      // Update properties with fetched page.
      this.props = this.getProps(page);

      // Cache page
      this.cache.set(this.state.pathname, this.props);

    } else {
      // Now we can update the properties from cache.
      this.props = this.cache.get(this.state.pathname);

    }

    // Call `afterFetch` to push the page in the DOM.
    this.afterFetch();
  }

  /**
   * Fetch the page from URL
   *
   * @return {string} Fetch response
   */
  async fetch() {
    const response = await fetch(this.state.url, {
      mode: 'same-origin',
      method: 'GET',
      headers: {
        'X-Requested-With': 'Highway'
      },
      credentials: 'same-origin'
    });

    // Check the HTTP code.
    // 200+: Success of the HTTP request.
    if (response.status >= 200 && response.status < 300) {
      // The HTTP response is the page HTML as a string.
      return response.text();
    }

    // An extra event is emitted if an error has occured that can be used
    // outside of the router to let you deal with the mess that happened.
    this.emit('NAVIGATE_ERROR', response);

    // !200+: Error of the HTTP request
    throw new Error(response.statusText);
  }

  /**
   * Push page in DOM
   */
  async afterFetch() {
    // We reset the scroll position.
    window.scrollTo(0, 0);

    // The page we get is the one we want to go `to`.
    this.To = new (helpers_Helpers.getRenderer(this.props.slug, this.renderers))(this.props);
    this.To.add();

    // We trigger an event when the new content is added to the DOM.
    this.emit('NAVIGATE_IN', {
      page: this.To.page,
      view: this.To.root
    }, this.state);

    // Now we show our content!
    await this.To.show();

    // Bind events
    this.bind();

    // We reset our status variables.
    this.navigating = false;

    // And we emit an event you can listen to.
    this.emit('NAVIGATE_END', {
      page: this.From.page,
      view: this.From.view
    }, {
      page: this.To.page,
      view: this.To.root
    }, this.state);

    // We prepare the next navigation by replacing the `from` renderer by
    // the `to` renderer now that the pages have been swapped successfully.
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
   * @arg {object} view — [router-view] node
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