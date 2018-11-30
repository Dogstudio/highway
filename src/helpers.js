/**
 * @file Highway helper methods used all acrosse the script.
 * @author Anthony Du Pont <bulldog@dogstudio.co>
 */

// Dependencies
import Renderer from './renderer';

// Constants
const PARSER = new window.DOMParser();

// Highway Helpers
export default class Helpers {

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
    // Return Default
    if (!this.renderers) {
      return Promise.resolve(Renderer);
    }

    // Return Renderer
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

    // Return Default
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

    if (slug in this.transitions) {
      // Return Transition
      return { class: this.transitions[slug], name: slug };
    }

    if ('default' in this.transitions) {
      // Return Transition
      return { class: this.transitions['default'], name: 'default' };
    }

    return null;
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
