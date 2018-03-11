// Regex definition
const TITLE_REGEX = /<title>(.+)<\/title>/;
const PARAM_REGEX = /\?([\w_\-\.=&]+)/;
const ANCHOR_REGEX = /(#.*)$/;
const ORIGIN_REGEX = /(https?:\/\/[\w\-\.]+)/;
const PATHNAME_REGEX = /https?:\/\/.*?(\/[\w_\-\.\/]+)/;

// Fake element to hold pages HTML
const FRAGMENT = document.createElement('div');

/**
 * Get origin of an URL
 *
 * @param  {String} url — URL to match
 * @return {String} Origin of URL or `null`
 * @static
 */
export function getOrigin(url) {
  // Get origin matches
  const match = url.match(ORIGIN_REGEX);

  // Return origin match or `null`
  return match ? match[1] : null;
}

/**
 * Get pathname of an URL
 *
 * @param  {String} url — URL to match
 * @return {String} Pathname of URL or `null`
 * @static
 */
export function getPathname(url) {
  // Get pathname matches
  const match = url.match(PATHNAME_REGEX);

  // Return pathname match or `null`
  return match ? match[1] : null;
}

/**
 * Get anchor in an URL
 *
 * @param  {String} url — URL to match
 * @return {String} Anchor in URL or `null`
 * @static
 */
export function getAnchor(url) {
  // Get anchor matches
  const match = url.match(ANCHOR_REGEX);

  // Return anchor match or `null`
  return match ? match[1] : null;
}

/**
 * Get search in URL.
 *
 * @param  {String} url — URL to match
 * @return {Object} Search in URL formatted as an object or `null`
 * @static
 */
export function getParams(url) {
  // Get search matches
  const match = url.match(PARAM_REGEX);

  // Check search matches
  if (!match) {
    return null;
  }

  // Decompose search
  const search = match[1].split('&');
  const object = {};

  // Format search
  for (let i = 0; i < search.length; i++) {
    const part = search[i].split('=');
    const key = part[0] || null;
    const value = part[1] || null;

    if (key && value) {
      object[key] = value;
    }
  }

  // Return formatted search
  return object;
}

/**
 * Get a parameter from an URL
 *
 * @param  {String} url — URL to use
 * @param  {String} key — Parameter key to get
 * @return {String} Parameter value or `null`
 * @static
 */
export function getParam(url, key) {
  return hasParam(url, key) ? getParams(url)[key] : null;
}

/**
 * Get infos of an URL.
 *
 * @param  {String} url — URL to use
 * @return {Object} All informations of an URL.
 * @static
 */
export function getInfos(url) {
  return {
    url: url,
    anchor: getAnchor(url),
    origin: getOrigin(url),
    params: getParams(url),
    pathname: getPathname(url),
  };
}

/**
 * Get page renderer
 *
 * @param  {String} page — Page HTML to use
 * @param  {Object} classes — List of renderers
 * @return {Object} Single renderer or `null`
 * @static
 */
export function getRenderer(page, renderers) {
  // Check namespace
  if (hasNamespace(page)) {
    // Get page namespace
    const namespace = getNamespace(page);

    // Return page related renderer or `null`
    return renderers.hasOwnProperty(namespace) ? renderers[namespace] : null;
  }

  // No namespace provided
  return null;
}

/**
 * Get view element from page HTML
 * 
 * @param  {String} page — Page HTML
 * @return {Node} View element
 * @static
 */
export function getView(page) {
  // Insert page in fragment that is an empty `div` element
  FRAGMENT.innerHTML = page;

  // Return view element from fragment
  return FRAGMENT.querySelector('[router-view]');
}

/**
 * Get view's namespace from view element
 * 
 * @param  {Node} view — View element
 * @return {String} View slug
 * @static
 */
export function getNamespace(page) {
  return getView(page).getAttribute('router-view');
}

/**
 * Get page transition
 * 
 * @param  {String} newPage — newPage HTML
 * @param  {String} oldPage — oldPage HTML
 * @param  {Object} routes — Routes to use
 * @return {Object} Page transition
 * @static
 */
export function getTransition(newPage, oldPage, routes) {
  // Check namespaces
  if (hasNamespace(newPage) && hasNamespace(oldPage)) {
    // Get namespaces
    const newNamespace = getNamespace(newPage);
    const oldNamespace = getNamespace(oldPage);

    // Construct route
    const route = `${oldNamespace}:${newNamespace}`;

    // Return corresponding transition or `null`
    return routes.hasOwnProperty(route) ? routes[route] : null;
  }

  // Missing namespace
  return null;
}

/**
 * Get page's title from page HTML
 * 
 * @param  {String} page — Page HTML
 * @return {String} Page title
 * @static
 */
export function getTitle(page) {
  // Get title matches
  const match = page.match(TITLE_REGEX);

  // Return title match or an empty string
  return match ? match[1] : '';
}

/**
 * Check wether an URL has an anchor or not
 *
 * @param  {String} url — URL to check
 * @return {Boolean} Check status
 * @static
 */
export function hasAnchor(url) {
  return getAnchor(url) ? true : false;
}

/**
 * Check wether an URL has parameters or not
 *
 * @param  {String} url — URL to check
 * @return {Boolean} Check status
 * @static
 */
export function hasParams(url) {
  return getParams(url) ? true : false;
}

/**
 * Check wether an URL has a parameter or not
 *
 * @param  {String} url — URL to use
 * @param  {String} key — Parameter key to check
 * @return {Boolean} Check status
 * @static
 */
export function hasParam(url, key) {
  return getParams(url).hasOwnProperty(key);
}

/**
 * Check wether a page has a namespace or not
 *
 * @param  {String} page — Page HTML to use
 * @return {Boolean} Check status
 * @static
 */
export function hasNamespace(page) {
  return getNamespace(page) ? true : false;
}

/**
 * Check wether a page has a related renderer or not
 *
 * @param  {String} page — Page HTML to use
 * @param  {Object} renderers — List of renderers to check
 * @return {Boolean} Check status
 * @static
 */
export function hasRenderer(page, renderers) {
  return getRenderer(page, renderers) ? true : false;
}

/**
 * Check wether a route has a related transition or not
 *
 * @param  {String} page — Page HTML to use
 * @param  {Object} renderers — List of renderers to check
 * @return {Boolean} Check status
 * @static
 */
export function hasTransition(newPage, oldPage, routes) {
  return getTransition(newPage, oldPage, routes) ? true : false;
}

/**
 * Default export of all methods
 */
export default {
  getView,
  getInfos,
  getParam,
  getTitle,
  getAnchor,
  getOrigin,
  getParams,
  getPathname,
  getRenderer,
  getNamespace,
  hasParam,
  hasParams,
  hasAnchor,
  hasRenderer,
  hasNamespace
};
