// Import helpers
import {
  getView,
  getInfos,
  getTitle,
  getNamespace,
  hasTransition,
  getTransition
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
   * @param {Object} routes — Router routes
   * @constructor
   */
  constructor(page, routes) {
    // Get pages HTML
    this.newPage = page;
    this.oldPage = document.documentElement.outerHTML;
    
    // Get router views
    this.$newView = getView(page);
    this.$oldView = WRAPPER.children[0];

    // Check transition
    if (hasTransition(this.newPage, this.oldPage, routes)) {
      // Get transition
      this.transition = getTransition(this.newPage, this.oldPage, routes);

      // Run transition
      this.run();

      // Return
      return;
    }

    // Switch
    this.switch();
  }

  /**
   * Run a transition on pages
   */
  run() {
    // Old view transition
    this.transition.out(this.$oldView).then(() => {
      // Switch views
      WRAPPER.removeChild(this.$oldView);
      WRAPPER.appendChild(this.$newView);

      // New view transition
      this.transition.in(this.$newView);
    });
  }

  /**
   * Switch views and title
   */
  switch() {
    // Switch views
    WRAPPER.removeChild(this.$oldView);
    WRAPPER.appendChild(this.$newView);

    // Switch title
    document.title = getTitle(this.newPage);
  }
}

export default RouterRenderer;
