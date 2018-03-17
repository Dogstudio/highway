/**
 * @file Highway helper methods used all acrosse the script.
 * @author Anthony Du Pont <bulldog@dogstudio.co>
 */
const TITLE_REGEX = /<title>(.+)<\/title>/;
const PARAM_REGEX = /\?([\w_\-.=&]+)/;
const ANCHOR_REGEX = /(#.*)$/;
const ORIGIN_REGEX = /(https?:\/\/[\w\-.]+)/;
const PATHNAME_REGEX = /https?:\/\/.*?(\/[\w_\-./]+)/;
const CAMELCASE_REGEX = /[-_](\w)/g;

/**
 * Get origin of an URL
 *
 * @arg    {string} url — URL to match
 * @return {string} Origin of URL or `null`
 */
function getOrigin(url) {
  const match = url.match(ORIGIN_REGEX);
  return match ? match[1] : null;
}

/**
 * Get pathname of an URL
 *
 * @arg    {string} url — URL to match
 * @return {string} Pathname of URL or `null`
 */
function getPathname(url) {
  const match = url.match(PATHNAME_REGEX);
  return match ? match[1] : null;
}

/**
 * Get anchor in an URL
 *
 * @arg    {string} url — URL to match
 * @return {string} Anchor in URL or `null`
 */
function getAnchor(url) {
  const match = url.match(ANCHOR_REGEX);
  return match ? match[1] : null;
}

/**
 * Get search in URL.
 *
 * @arg    {string} url — URL to match
 * @return {object} Search in URL formatted as an object or `null`
 */
function getParams(url) {
  const match = url.match(PARAM_REGEX);

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
 * Get a parameter from an URL
 *
 * @arg    {string} url — URL to use
 * @arg    {string} key — Parameter key to get
 * @return {string} Parameter value or `null`
 */
function getParam(url, key) {
  const params = getParams(url);
  return params.hasOwnProperty(key) ? params[key] : null;
}

/**
 * Get infos of an URL.
 *
 * @arg    {string} url — URL to use
 * @return {object} All informations of an URL.
 */
function getInfos(url) {
  return {
    url: url,
    anchor: getAnchor(url),
    origin: getOrigin(url),
    params: getParams(url),
    pathname: getPathname(url)
  };
}

/**
 * Get view element from page HTML
 * 
 * @arg    {string} page — Page HTML
 * @return {object} View element
 */
function getView(page) {
  // We create a fake DOM element that will contain our page HTML and let us
  // select DOM nodes properly. This element is only used in Javascript.
  const FRAGMENT = document.createElement('div');

  // This is the trick to transform our page HTML from string to DOM element by
  // using our fake container we created before and by updating its inner HTML.
  FRAGMENT.innerHTML = page;

  // Now we can select our view with ease and return it.
  return FRAGMENT.querySelector('[router-view]');
}

/**
 * Get view's slug from view element
 * 
 * @arg    {string} page — Page HTML
 * @return {string} Page slug
 */
function getSlug(page) {
  return getView(page).getAttribute('router-view');
}

/**
 * Get page's title from page HTML
 * 
 * @arg    {string} page — Page HTML
 * @return {string} Page title
 */
function getTitle(page) {
  const match = page.match(TITLE_REGEX);
  return match ? match[1] : '';
}

/**
 * Get page renderer
 *
 * @arg    {string} page — Page HTML to use
 * @arg    {object} renderers — List of renderers
 * @return {object} Single renderer or `null`
 */
function getRenderer(page, renderers) {
  const slug = getSlug(page);
  return renderers.hasOwnProperty(slug) ? renderers[slug] : null;
}

/**
 * Get page transition
 *
 * @arg    {string} page — Page HTML to use
 * @arg    {object} transitions — List of transitions
 * @return {object} Single transition or `null`
 */
function getTransition(page, transitions) {
  if (typeof transitions === 'undefined') {
    return null;
  }

  const slug = getSlug(page);

  if (!transitions.hasOwnProperty(slug) || !transitions[slug]) {
    if (transitions.hasOwnProperty('default')) {
      return transitions['default'];
    }

    return null;
  }

  return transitions[slug];
}

/**
 * Converts string to camelCase
 *
 * @arg    {String} string - String to parse
 * @return {String} Parsed string
 */
function camelize(string) {
  return string.replace(CAMELCASE_REGEX, (_, c) => {
    return c ? c.toUpperCase() : '';
  });
}

/**
 * Export all helpers
 */
module.exports = {
  getSlug,
  getView,
  getInfos,
  getTitle,
  getParam,
  getParams,
  getOrigin,
  getAnchor,
  getPathname,
  getRenderer,
  getTransition,
  camelize
};
