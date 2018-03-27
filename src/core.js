/**
 * @file Highway core that handle all history stuffs.
 * @author Anthony Du Pont <bulldog@dogstudio.co>
 */
import Emitter from 'tiny-emitter';
import Helpers from './helpers';
import Renderer from './renderer';

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

class HighwayCore extends Emitter {

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
    this.pathname = Helpers.getPathname(window.location.href);
    this.cache[this.pathname] = this.page;

    // Get the page renderer and directly call its `onEnter` and `onEnterCompleted`
    // methods in order to properly initialize the page.
    const view = document.querySelector('[router-view]');
    const transition = Helpers.getTransition(this.page, this.transitions);

    this.from = Helpers.getRenderer(this.page, this.renderers) || Renderer;
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
    document.addEventListener('click', (e) => {
      if (e.target.tagName === 'A') {
        const anchor = Helpers.getAnchor(e.target.href);
        const pathname = Helpers.getPathname(e.target.href);

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
    const pathname = Helpers.getPathname(window.location.href);

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
    this.state = Helpers.getInfos(url);
    this.pathname = Helpers.getPathname(url);

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
    return fetch(this.state.url, FETCH_OPTS).then((response) => {
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
    const view = Helpers.getView(page);
    const transition = Helpers.getTransition(page, this.transitions);

    this.to = Helpers.getRenderer(page, this.renderers) || Renderer;
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

export default HighwayCore;
