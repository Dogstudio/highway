// Import helpers
import {
  getView,
  getInfos,
  getTitle
} from './helpers';

// Get [router-wrapper]
const WRAPPER = document.querySelector('[router-wrapper]');

// Check [router-wrapper]
if (!WRAPPER) {
  throw new Error('Undefined [router-wrapper] in DOM');
}

// Renderer
class RouterRenderer {

  /**
   * Renderer constructor
   *
   * @param {String} page — Page HTML formatted as a string
   * @constructor
   */
  constructor(page) {
    // Get router views
    this.$newView = getView(page);
    this.$oldView = WRAPPER.children[0];

    // Switch views
    WRAPPER.appendChild(this.$newView);
    WRAPPER.removeChild(this.$oldView);

    // Update title
    document.title = getTitle(page);
  }
}

export default RouterRenderer;
