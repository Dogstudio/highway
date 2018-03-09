import Helpers from './helpers';
import Renderer from './renderer';

class RouterCore {

  /**
   * Router constructor
   *
   * @constructor
   */
  constructor({ views }) {
    // Create events callbacks
    this._popstate = this.popState.bind(this);
    this._pushState = this.pushState.bind(this);

    // Delegate `window` events
    window.addEventListener('popstate', this._popstate);

    // Router views
    this.views = views;

    // Router URL
    this.url = window.location.href;

    // Delegate DOM events
    this.delegate();
  }

  /**
   * Delegate events to DOM elements
   */
  delegate() {
    // Get all enabled links in document
    this.$links = document.querySelectorAll('a:not([target="_blank"])');

    // Delegate link events
    for (let i = 0; i < this.$links.length; i++) {
      // Add event to each enabled link
      this.$links[i].addEventListener('click', this._pushState);
    }
  }

  /**
   * Undelegate events on DOM elements
   */
  undelegate() {
    // Undelegate link events
    for (let i = 0; i < this.$links.length; i++) {
      // Remove event from each enabled link
      this.$links[i].removeEventListener('click', this._pushState);
    }
  }

  /**
   * Update history on popstate
   */
  popState() {
    // Update URL
    this.url = window.location.href;

    // Fetch view
    this.fetch().then((page) => this.pushView(page));
  }

  /**
   * Push new entries in history
   */
  pushState(e) {
    // Prevent default behaviour
    e.preventDefault();

    // Get element `href`
    const href = e.target.href;

    // Compare URLs
    if (href !== this.url) {
      // Update URL
      this.url = href;

      // Push state in history
      history.pushState(Helpers.getInfos(this.url), '', this.url);

      // Fetch view
      this.fetch(href).then((page) => this.pushView(page));
    }
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
    // Get class
    // if (Helpers.hasClass(page, this.views)) {
      // Call class
      // new Helpers.getClass(page, this.views)();
    // }

    // Remove events.
    this.undelegate();

    // Add events.
    this.delegate();
  }
}

export default RouterCore;
