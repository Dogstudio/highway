// Dependencies
const Emitter = require('tiny-emitter');


// Regex
const PATH_REGEX   = /https?:\/\/.*?(\/[\w-_.\/]+)/;
const BASE_REGEX   = /(https?:\/\/[\w-.]+)/;
const PARAM_REGEX  = /\?([\w-_.=&]+)/;
const ANCHOR_REGEX = /(#.*)$/;

// Options
const FETCH_OPTS = {
  method: 'GET',
  mode: 'same-origin',
  credentials: 'same-origin',
  headers: { 'X-Requested-With': 'XMLHttpRequest' }
};

// Statuses
const PENDING = 'PENDING';
const RUNNING = 'RUNNING';

// Events
const NAVIGATE_START = 'NAVIGATE_START';
const NAVIGATE_ENDED = 'NAVIGATE_ENDED';
const NAVIGATE_ERROR = 'NAVIGATE_ERROR';

// Router Core Class
class RouterCore extends Emitter {

  /**
   * Router constructor
   * 
   * @constructor
   * @param {Object} opts - Router options.
   */
  constructor(opts = {}) {
    // Extension
    super();

    // Create events callbacks
    this.onPopstate = this.popState.bind(this);
    this.onPushState = this.pushState.bind(this);
    this.onHashchange = this.hashChange.bind(this);

    // Delegate `window` events
    window.addEventListener('popstate', this.onPopstate);
    window.addEventListener('hashChange', this.onHashchange);

    // Router variables
    this.url = window.location.href;
    this.status = PENDING;

    // Delegate variable DOM events
    this.delegate();
  }

  /**
   * State:
   * Get history state.
   *
   * @return {Object} History state base on window URL.
   */
  get state() {
    return {
      url: this.url,
      base: this.base,
      path: this.path,
      params: this.params,
      anchor: this.anchor
    };
  }

  /**
   * Path:
   * Get path without base URL.
   *
   * @return {String} Path without base URL.
   */
  get path() {
    const match = this.url.match(PATH_REGEX);

    if (!match) {
      return null;
    }
    return match[1];
  }

  /**
   * Base:
   * Get base from URL.
   *
   * @return {String} Base.
   */
  get base() {
    const match = this.url.match(BASE_REGEX);

    if (!match) {
      return null;
    }
    return match[1];
  }

  /**
   * Params:
   * Get URL parameters.
   *
   * @return {Object} Parameters.
   */
  get params() {
    const match = this.url.match(PARAM_REGEX);

    if (!match) {
      return null;
    }

    const params = match[1].split('&');
    const object = {};

    for (let i = 0; i < params.length; i++) {
      const param = params[i].split('=');
      const key = param[0] || null;
      const value = param[1] || null;

      if (key && value) {
        object[key] = value;
      }
    }

    return object;
  }

  /**
   * Anchor:
   * Get URL anchor.
   *
   * @return {String} Anchor ID.
   */
  get anchor() {
    const match = this.url.match(ANCHOR_REGEX);

    if (!match) {
      return null;
    }
    return match[1];
  }

  /**
   * Has Anchor:
   * Check wether the URL has an anchor.
   *
   * @return {Boolean}
   */
  hasAnchor() {
    if (this.state.anchor) {
      return true;
    }
    return false;
  }

  /**
   * Has Params:
   * Check wether the URL has parameters or not.
   *
   * @return {Boolean}
   */
  hasParams() {
    if (this.state.params) {
      return true;
    }
    return false;
  }

  /**
   * Has Param:
   * Check wether the URL has a given parameter or not.
   *
   * @param  {String} key - Anchor key.
   * @return {Boolean}
   */
  hasParam(key) {
    if (key && typeof key !== 'undefined') {
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
    // Get all enabled links in document
    this.$links = [...document.querySelectorAll('a:not([target="_blank"])')];

    // Delegate link events
    for (const $link of this.$links) {
      // Delegate event to each enabled link
      $link.addEventListener('click', this.onPushState);
    }
  }

  /**
   * Undelegate:
   * Undelegate events on DOM elements.
   */
  undelegate() {
    // Undelegate link events
    for (const $link of this.$links) {
      // Undelegate event to each enabled link
      $link.removeEventListener('click', this.onPushState);
    }
  }

  /**
   * Hash Change:
   * Update URL on window hash change.
   */
  hashChange() {
    //
    //
  }

  /**
   * Pop state:
   * Update history on popstate.
   */
  popState(e) {
    if (e && e.state) {
      // Get URL
      const { url } = e.state;

      // Compare URL
      if (url !== this.url) {
        // Update URL
        this.url = url;

        // Fetch view
        this.fetch();
      }
    } else {
      // Update URL
      this.url = window.location.href;

      // Fetch view
      this.fetch();
    }
  }

  /**
   * Push state:
   * Push new entries in history.
   */
  pushState(e) {
    // Prevent default
    if (e && typeof e.preventDefault === 'function') {
      e.preventDefault();
    }

    // Check Router status
    if (this.status === RUNNING) {
      return;
    }

    // Get element and attributes
    const el = e.currentTarget;
    const href = el.href;

    // Compare URLs
    if (href !== this.url) {
      // Update status
      this.status = RUNNING;

      // Update URL
      this.url = href;

      // Push state to history
      history.pushState(this.state, '', this.url);

      // Fetch view
      this.fetch(href);
    }
  }

  /**
   * Fetch:
   * Call fetch methods.
   */
  fetch() {
    // Fetch view
    this.fetchView()
          .then((view) => { this.fetchViewSuccess(view) })
          .catch((error) => { this.fetchViewError(error) });
  }

  /**
   * Fetch view:
   * Fetch view from URL.
   */
  fetchView() {
    // Fetch view
    return fetch(this.url, FETCH_OPTS).then((response) => {
      // Update status
      this.status = PENDING;

      // Check response status
      if (response.status >= 200 && response.status < 300) {
        // View fetched with success
        return Promise.resolve(response.text());
      }

      // View fetched with errors
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
    console.log(this.url, response);
  }

  /**
   * Fetch view error:
   * Error when fetching the view.
   *
   * @param {Object} e - Error to throw
   */
  fetchViewError(e) {
    if (e) {
      throw (e);
    }
  }

  /**
   * Push view:
   * Push view in DOM and reset events.
   *
   * @param {Node} DOM - DOM to append.
   */
  pushView(DOM) {
    // Reset Events
    this.undelegate();
    this.delegate();
  }
}

module.exports = RouterCore;
