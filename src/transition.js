/**
 * @file Highway default transition that handle DOM animations.
 * @author Anthony Du Pont <bulldog@dogstudio.co>
 */
class HighwayTransition {

  /**
   * @arg {object} view — [router-view] Node
   * @constructor
   */
  constructor(view) {
    // The [router-view] is the only main information we need since the role of
    // the transition is to show/hide the required DOM elements.
    this.view = view;
  }

  /**
   * Add the view in DOM and play an `in` transition if one is defined.
   * 
   * @return {object} Promise
   */
  show() {
    return new Promise(resolve => {
      if (this.in && typeof this.in === 'function') {
        // The `in` method in encapsulated in the `show` method make transition
        // code easier to write. This way you don't have to define any Promise
        // in your transition code and focus on the transition itself.
        this.in(this.view, resolve);
      }
    });
  }

  /**
   * Play an `out` transition if one is defined and remove the view from DOM.
   * 
   * @return {object} Promise
   */
  hide() {
    return new Promise(resolve => {
      if (this.out && typeof this.out === 'function') {
        // The `out` method in encapsulated in the `hide` method make transition
        // code easier to write. This way you don't have to define any Promise
        // in your transition code and focus on the transition itself.
        this.out(this.view, resolve);
      }
    });
  }
}

module.exports = HighwayTransition;
