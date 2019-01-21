/**
 * @file Highway default transition that handle DOM animations.
 * @author Anthony Du Pont <bulldog@dogstudio.co>
 */
export default class Transition {

  /**
   * @arg {object} wrap — [data-router-wrapper] node
   * @arg {object} name — Transition name
   * @constructor
   */
  constructor(wrap, name) {
    // The [data-router-wrapper] is the only main information we need since the role of
    // the transition is to show/hide the required DOM elements.
    this.wrap = wrap;

    // Save transition name for later.
    this.name = name;
  }

  /**
   * Add the view in DOM and play an `in` transition if one is defined.
   *
   * @return {object} Promise
   * @param {object} datas - Set of datas
   */
  show({ trigger, contextual }) {
    // Get View
    const to = this.wrap.lastElementChild;
    const from = this.wrap.firstElementChild;

    // Promise
    return new Promise(resolve => {
      // The `in` method in encapsulated in the `show` method make transition
      // code easier to write. This way you don't have to define any Promise
      // in your transition code and focus on the transition itself.
      if (!contextual) {
        // Change Attributes
        to.setAttribute('data-transition-in', this.name);
        to.removeAttribute('data-transition-out', this.name);

        // Call transition attached to the view.
        this.in && this.in({ to, from, trigger, done: resolve });

      } else {
        // Change Attributes
        to.setAttribute('data-transition-in', contextual.name);
        to.removeAttribute('data-transition-out', contextual.name);

        // Call the contextual transition.
        contextual.in && contextual.in({ to, from, trigger, done: resolve });

      }
    });
  }

  /**
   * Play an `out` transition if one is defined and remove the view from DOM.
   *
   * @return {object} Promise
   * @param {object} datas - Set of datas
   */
  hide({ trigger, contextual }) {
    // Get view
    const from = this.wrap.firstElementChild;

    // Promise
    return new Promise(resolve => {
      // The `out` method in encapsulated in the `hide` method make transition
      // code easier to write. This way you don't have to define any Promise
      // in your transition code and focus on the transition itself.
      if (!contextual) {
        // Change Attributes
        from.setAttribute('data-transition-out', this.name);
        from.removeAttribute('data-transition-in', this.name);

        // Call the transition attached to the view.
        this.out && this.out({ from, trigger, done: resolve });

      } else {
        // Change Attributes
        from.setAttribute('data-transition-out', contextual.name);
        from.removeAttribute('data-transition-in', contextual.name);

        // Call the contextual transition.
        contextual.out && contextual.out({ from, trigger, done: resolve });

      }
    });
  }
}
