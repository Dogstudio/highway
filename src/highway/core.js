import Emitter from 'tiny-emitter';
import Helpers from './helpers';

// Fetch API options used for every HTTP request sent by Highway. It makes
// sure the HTTP requests URL are only on the same origin and that credentials
// are also only sent on same origin. An extra `X-Requested-With` header is
// available if needed in your scripts.
const FETCH_OPTS = {
  mode: 'same-origin',
  method: 'GET',
  headers: {
    'X-Requested-With': 'XMLHttpRequest'
  },
  credentials: 'same-origin'
};

// This is the core of Highway that handles all history stuffs along with all
// the renderer calls and DOM swapping. PLEASE DO NOT CHANGE THIS CODE!
class RouterCore extends Emitter {

  /**
   * @arg {object} opts — User options
   * @arg {object} opts.renderers — List of renderers
   * @extends Emitter
   * @constructor
   */
  constructor(opts) {
    // Extends the Emitter constructor in order to be able to use its features
    // and send custom events all along the script.
    super();

    // All your custom renderers you sent to Highway that extends Highway renderer.
    this.renderers = opts.renderers;

    // Some usefull stuffs for later
    this.state = {};
    this.cache = {};
    this.navigating = false;

    // Cache the page we land on for further HTTP request optimization.
    this.page = document.documentElement.outerHTML;
    this.pathname = Helpers.getPathname(window.location.href);
    this.cache[this.pathname] = this.page;

    // Get the page renderer and directly call its `onEnter` and `onEnterCompleted`
    // methods in order to properly initialize the page.
    const view = document.querySelector('[router-view]');

    this.from = new (Helpers.getRenderer(this.page, this.renderers))(view, null);
    this.from.onEnter();
    this.from.onEnterCompleted();

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
    document.addEventListener('click', (e) => {
      if (e.target.tagName === 'A') {
        const anchor = Helpers.getAnchor(e.target.href);

        if ((anchor === null || anchor.length === 0) && !e.target.target) {
          // To run the router properly we have to prevent the default behaviour
          // of link elements to avoir page reloading.
          e.preventDefault();

          const pathname = Helpers.getPathname(e.target.href);

          if (!this.navigating && pathname !== this.pathname) {
            // Now push the state!
            this.pushState(e);
          }
        }
      }
    });
  }

  /**
   * Watch history entry changes
   */
  popState() {
    // We want to keep the default behavior of the browser for anchors so we need
    // to quickly check if there is an anchor in the URL.
    const anchor = Helpers.getAnchor(window.location.href);

    if (anchor) {
      if (anchor.length !== 0) {
        return;
      }
    }

    // We quickly check if the pathname has changed before doing anything else
    // because with anchor the `popstate` event might trigger but the pathname
    // might not change and nothing should happen then.
    const pathname = Helpers.getPathname(window.location.href);

    if (pathname === this.pathname) {
      return;
    }

    // Call of `beforeFetch` for optimizations
    this.beforeFetch(window.location.href, false);
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
    // Using the `getInfos` from the Helpers we can get all the information from
    // a given URL we can use in our script (origin, pathname, parameters,...).
    this.state = Helpers.getInfos(url);
    this.pathname = Helpers.getPathname(url);

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
    this.fetch().then(page => {
      // We push a new entry in the history in order to be able to navigate
      // with the backward and forward buttons from the browser.
      if (history) {
        window.history.pushState(this.state, '', this.state.url);
      }

      // Now push the page!
      this.push(page);
    });
  }

  /**
   * Fetch the page from URL
   * 
   * @return {string} Fetch response
   * @return {object} Fetch Promise
   */
  fetch() {
    // Use of a boolean to avoid repetitive fetch calls by super excited users
    // that could lead to some serious issues.
    this.navigating = true;

    return fetch(this.state.url, FETCH_OPTS).then((response) => {
      // Check the HTTP code
      // 200+: Success of the HTTP request
      if (response.status >= 200 && response.status < 300) {
        // The HTTP response is the page HTML as a string
        return response.text();
      }

      // An extra event is emitted if an error has occured that can be used
      // outside of the router to let you deal with the mess that happened.
      this.emit('NAVIGATE_ERROR');

      // !200+: Error of the HTTP request
      throw new Error(response.statusText);
    });
  }

  /**
   * Push page in DOM
   * 
   * @arg {string} page — Page HTML
   * @arg {boolean} history — Push entry in history if `true`
   */
  push(page) {
    // Cache the page for HTTP request optimization
    this.cache[this.pathname] = page;

    // The page we get is the one we want to go `to` and like every type of page
    // you should reference a renderer to the router we are getting right now.
    const view = Helpers.getView(page);
    const title = Helpers.getTitle(page);

    this.to = new (Helpers.getRenderer(page, this.renderers))(view, title);

    // An event is emitted and can be used outside of the router to run
    // additionnal code when the navigation starts. It expose the `from` and `to`
    // [router-view] elements to the user and the router state.
    const from = this.from.view;
    const to = this.to.view;

    this.emit('NAVIGATE_START', from, to, this.state);

    // We hide the page we come `from` and since the `hide` method returns a
    // Promise because come transition might occur we need to wait for the 
    // Promise resolution before calling the `show` method of the page we go `to`.
    this.from.hide().then(() => {
      this.to.show().then(() => {
        this.navigating = false;

        // We prepare the next navigation by replacing the `from` renderer by
        // the `to` renderer now that the pages have been swapped successfully.
        this.from = this.to;

        // Same as the `NAVIGATE_START` event
        this.emit('NAVIGATE_END', from, to, this.state);
      });
    });
  }
}

export default RouterCore;
