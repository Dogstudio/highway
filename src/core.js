// Dependencies.
const Emitter = require('tiny-emitter');

// Regex definition.
const PATH_REGEX = /https?:\/\/.*?(\/[\w_\-\.\/]+)/;
const BASE_REGEX = /(https?:\/\/[\w\-\.]+)/;
const PARAM_REGEX = /\?([\w_\-\.=&]+)/;
const ANCHOR_REGEX = /(#.*)$/;

// Fetch request options.
const FETCH_OPTS = {
  method: 'GET',
  mode: 'same-origin',
  credentials: 'same-origin',
  headers: { 'X-Requested-With': 'XMLHttpRequest' }
};

// Fake element to hold views.
const FRAGMENT = document.createElement('div');

// Events naming.
const NAVIGATE_START = 'NAVIGATE_START';
const NAVIGATE_ENDED = 'NAVIGATE_ENDED';
const NAVIGATE_ERROR = 'NAVIGATE_ERROR';

// Router core class.
class RouterCore extends Emitter {

  /**
   * Router constructor.
   * 
   * @constructor
   * @param {Object} opts - Router options
   */
  constructor(opts = {}) {
    // Extend `Emitter` class.
    super();

    // Create events callbacks.
    this.onPopstate = this.popState.bind(this);
    this.onPushState = this.pushState.bind(this);

    // Delegate `window` events.
    window.addEventListener('popstate', this.onPopstate);

    // Router URL.
    this.url = window.location.href;

    // Delegate DOM events.
    this.delegate();
  }

  /**
   * State:
   * Get history state.
   *
   * @return {Object} History state base on window URL.
   */
  get state() {
    // Return Router state.
    return {
      url: this.url,
      base: this.base,
      path: this.path,
      params: this.params,
      anchor: this.anchor
    };
  }

  /**
   * View:
   * Get view from fake element.
   * 
   * @return {Node} Router view.
   */
  get view() {
    return FRAGMENT.querySelector('[router-view]');
  }

  /**
   * Namespace:
   * Get view namespace.
   * 
   * @return {String} View namespace.
   */
  get namespace() {
    // Get attribute.
    const attr = this.view.getAttribute('router-view')

    // Return formatted namespace.
    return attr.charAt(0).toUpperCase() + attr.slice(1);
  }

  /**
   * Path:
   * Get path without base URL.
   *
   * @return {String} Path without base URL.
   */
  get path() {
    // Get matches.
    const match = this.url.match(PATH_REGEX);

    // Return match.
    return match ? match[1] : null;
  }

  /**
   * Base:
   * Get base from URL.
   *
   * @return {String} Base.
   */
  get base() {
    // Get matches.
    const match = this.url.match(BASE_REGEX);

    // Return match.
    return match ? match[1] : null;
  }

  /**
   * Anchor:
   * Get URL anchor.
   *
   * @return {String} Anchor ID.
   */
  get anchor() {
    // Get matches.
    const match = this.url.match(ANCHOR_REGEX);

    // Return match.
    return match ? match[1] : null;
  }

  /**
   * Params:
   * Get URL parameters.
   *
   * @return {Object} Parameters.
   */
  get params() {
    // Get matches.
    const match = this.url.match(PARAM_REGEX);

    // Check matches.
    if (!match) {
      return null;
    }

    // Deconstruct parameters.
    const params = match[1].split('&');
    const object = {};

    // Reconstruct parameters.
    for (let i = 0; i < params.length; i++) {
      const param = params[i].split('=');
      const key = param[0] || null;
      const value = param[1] || null;

      if (key && value) {
        object[key] = value;
      }
    }

    // Return parameters.
    return object;
  }

  /**
   * Has Anchor:
   * Check wether the URL has an anchor.
   *
   * @return {Boolean}
   */
  hasAnchor() {
    return this.state.anchor ? true : false;
  }

  /**
   * Has Params:
   * Check wether the URL has parameters or not.
   *
   * @return {Boolean}
   */
  hasParams() {
    return this.state.params ? true : false;
  }

  /**
   * Has Param:
   * Check wether the URL has a given parameter or not.
   *
   * @param  {String} key - Anchor key.
   * @return {Boolean}
   */
  hasParam(key = null) {
    if (key) {
      if (this.state.params) {
        if (this.state.params[key]) {
          return true;
        }
      }
    }
    return false;
  }

  /**
   * Delegate:
   * Delegate events to DOM elements.
   */
  delegate() {
    // Get all enabled links in document.
    this.$links = [...document.querySelectorAll('a:not([target="_blank"])')];

    // Delegate link events.
    for (const $link of this.$links) {
      // Delegate event to each enabled link.
      $link.addEventListener('click', this.onPushState);
    }
  }

  /**
   * Undelegate:
   * Undelegate events on DOM elements.
   */
  undelegate() {
    // Undelegate link events.
    for (const $link of this.$links) {
      // Undelegate event to each enabled link.
      $link.removeEventListener('click', this.onPushState);
    }
  }

  /**
   * Pop state:
   * Update history on popstate.
   */
  popState() {
    // Update URL.
    this.url = window.location.href;

    // Fetch view.
    this.fetch();
  }

  /**
   * Push state:
   * Push new entries in history.
   */
  pushState(e) {
    // Prevent default
    e.preventDefault();

    // Get element.
    const el = e.target || e.srcElement;

    // Get element `href`.
    const href = el.href;

    // Compare URLs.
    if (href !== this.url) {
      // Update URL.
      this.url = href;

      // Push state to history.
      history.pushState(this.state, '', this.url);

      // Fetch view.
      this.fetch(href);
    }
  }

  /**
   * Fetch:
   * Call fetch methods.
   */
  fetch() {
    // Emit event.
    this.emit(NAVIGATE_START);

    // Fetch view.
    this.fetchView()
          .then((view) => { this.fetchViewSuccess(view) })
          .catch((error) => { this.fetchViewError(error) });
  }

  /**
   * Fetch view:
   * Fetch view from URL.
   */
  fetchView() {
    // Fetch view.
    return fetch(this.url, FETCH_OPTS).then((response) => {
      // Check response status.
      if (response.status >= 200 && response.status < 300) {
        // View fetched with success.
        return Promise.resolve(response.text());
      }

      // View fetched with errors.
      return Promise.reject(new Error(response.statusText));
    });
  }

  /**
   * Fetch view success:
   * Successfully fetched the view.
   *
   * @param {String} response - View HTML as string.
   */
  fetchViewSuccess(response) {
    // Append response.
    FRAGMENT.innerHTML = response;

    // Push view.
    this.pushView();

    // Emit event.
    this.emit(NAVIGATE_ENDED);
  }

  /**
   * Fetch view error:
   * Error when fetching the view.
   *
   * @param {Object} e - Error to throw
   */
  fetchViewError(e) {
    // Emit event.
    this.emit(NAVIGATE_ERROR);

    // Throw error.
    throw(e);
  }

  /**
   * Push view:
   * Push view in DOM and reset events.
   */
  pushView() {
    // Debug.
    console.log(this.namespace);

    // Reset events.
    this.undelegate();
    this.delegate();
  }
}

module.exports = RouterCore;
