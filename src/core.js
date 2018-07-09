/**
 * @file Highway core that handle all history stuffs.
 * @author Anthony Du Pont <bulldog@dogstudio.co>
 */
import Emitter from 'tiny-emitter';
import Helpers from './helpers';

export default class Core extends Emitter {

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
    this.props = this.getProps(document);

    // Link.
    this.link = null;

    // Cache.
    this.cache = new Map();

    // Status variables.
    this.navigating = false;

    // Get the page renderer and properly setup it.
    this.From = new (Helpers.getRenderer(this.props.slug, this.renderers))(this.props);
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
    const page = Helpers.getDOM(context);
    const view = Helpers.getView(page);
    const slug = Helpers.getSlug(view);
    const transition = Helpers.getTransition(slug, this.transitions);

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
      anchor: Helpers.getAnchor(location),
      origin: Helpers.getOrigin(location),
      params: Helpers.getParams(location),
      pathname: Helpers.getPathname(location)
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
    const anchor = Helpers.getAnchor(href);
    const params = Helpers.getParams(href);
    const pathname = Helpers.getPathname(href);

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
    this.emit('NAVIGATE_OUT', this.From, this.state);

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
    this.To = new (Helpers.getRenderer(this.props.slug, this.renderers))(this.props);

    // We trigger an event when the new content is added to the DOM.
    this.emit('NAVIGATE_IN', this.To, this.state);

    // Now we show our content!
    await this.To.show();

    // Bind events
    this.bind();

    // We reset our status variables.
    this.navigating = false;

    // And we emit an event you can listen to.
    this.emit('NAVIGATE_END', this.From, this.To, this.state);

    // We prepare the next navigation by replacing the `from` renderer by
    // the `to` renderer now that the pages have been swapped successfully.
    this.From = this.To;
  }
}
