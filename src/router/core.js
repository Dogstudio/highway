// Import helpers
import {
  getInfos,
  getRenderer,
  hasRenderer
} from './helpers';

// Core
class RouterCore {

  /**
   * Router constructor
   *
   * @param { Object } options – Router options
   * @constructor
   */
  constructor({ renderers }) {
    // Create events callbacks
    this._popstate = this.popState.bind(this);
    this._pushState = this.pushState.bind(this);

    // Window events
    window.addEventListener('popstate', this._popstate);

    // Utilities
    this.url = window.location.href;
    this.renderers = renderers;

    // Events bubbling
    this.bubble();
  }

  /**
   * Delegate events to DOM elements
   */
  bubble() {
    document.addEventListener('click', (e) => {
      if (e.target.tagName === 'A') {
        if (!e.target.target) {
          // Prevent defaut behaviour
          e.preventDefault();

          // Push state
          this.pushState(e);
        }
      }
    });
  }

  /**
   * Update history on popstate
   */
  popState() {
    // Update URL
    this.url = window.location.href;

    // Fetch view
    this.fetch().then(page => this.pushView(page));
  }

  /**
   * Push new entries in history
   * 
   * @param {Object} e — Event
   */
  pushState(e) {
    // Check element `href`
    if (e.target.href === this.url) {
      return;
    }

    // Update URL
    this.url = e.target.href;

    // Fetch view
    this.fetch().then(page => {
      // Push state in history
      history.pushState(getInfos(this.url), '', this.url);

      // Push view in DOM
      this.pushView(page);
    });
  }

  /**
   * Fetch view from URL
   */
  fetch() {
    // Option definition
    const opts = {
      method: 'GET',
      mode: 'same-origin',
      credentials: 'same-origin',
      headers: {
        'X-Requested-With': 'XMLHttpRequest'
      }
    };

    // Fetch view
    return fetch(this.url, opts).then((response) => {
      // Check response status
      if (response.status >= 200 && response.status < 300) {
        // View fetched with success
        return response.text();
      }

      // View fetched with errors
      throw new Error(response.statusText);
    });
  }

  /**
   * Push view in DOM and reset events
   * 
   * @param {String} page — Page HTML as a string
   */
  pushView(page) {
    // Check page renderer
    if (!hasRenderer(page, this.renderers)) {
      // Throw error
      throw new Error('Please provide a renderer for this page');
    }

    // Get page renderer
    const renderer = getRenderer(page, this.renderers);

    // Call page renderer
    new renderer(page);
  }
}

export default RouterCore;
