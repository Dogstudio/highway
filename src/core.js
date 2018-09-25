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

    // Helpers.
    this.Helpers = new Helpers(renderers, transitions);

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
    if (!(e.metaKey || e.ctrlKey)) {
      // Prevent default `click`
      e.preventDefault();

      // We have to redirect to our `href` using Highway
      this.redirect(e.currentTarget.href);
    }
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
    // Push State
    this.pushState();

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
