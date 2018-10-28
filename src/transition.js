/**
 * @file Highway default transition that handle DOM animations.
 * @author Anthony Du Pont <bulldog@dogstudio.co>
 */
export default class Transition {

  /**
   * @arg {object} view — [data-router-view] node
   * @constructor
   */
  constructor(view) {
    // The [data-router-view] is the only main information we need since the role of
    // the transition is to show/hide the required DOM elements.
    this.view = view;
  }

  /**
   * Add the view in DOM and play an `in` transition if one is defined.
   *
   * @return {object} Promise
   * @param {(object|boolean)} contextual - If the transition is changing on the fly
   */
  show(contextual) {
    return new Promise(resolve => {
      // The `in` method in encapsulated in the `show` method make transition
      // code easier to write. This way you don't have to define any Promise
      // in your transition code and focus on the transition itself.
      if (!contextual) {
        this.in && this.in(this.view, resolve);
      } else {
        contextual.in && contextual.in(this.view, resolve);
      }
    });
  }

  /**
   * Play an `out` transition if one is defined and remove the view from DOM.
   *
   * @return {object} Promise
   * @param {(object|boolean)} contextual - If the transition is changing on the fly
   */
  hide(contextual) {
    return new Promise(resolve => {
      // The `out` method in encapsulated in the `hide` method make transition
      // code easier to write. This way you don't have to define any Promise
      // in your transition code and focus on the transition itself.
      if (!contextual) {
        this.out && this.out(this.view, resolve);
      } else {
        contextual.out && contextual.out(this.view, resolve);
      }
    });
  }
}
