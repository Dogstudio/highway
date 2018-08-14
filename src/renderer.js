/**
 * @file Highway default renderer that handle DOM stuffs.
 * @author Anthony Du Pont <bulldog@dogstudio.co>
 */

export default class Renderer {

  /**
   * @arg {object} props — Set of properties (slug, page, view,...)
   * @constructor
   */
  constructor(props) {
    // We get the view.
    this.root = document.querySelector('[data-router-view]');

    // We save fetched informations
    this.page = props.page;
    this.view = props.view;
    this.slug = props.slug;

    // We get our transition we will use later to show/hide our view.
    this.Transition = props.transition ? new props.transition(this.root) : null;
  }

  /**
   * Renderer initialization.
   */
  setup() {
    // We call the `onEnter` and `onEnterCompleted` methods of the renderer on
    // initialization if they exists.
    this.onEnter && this.onEnter();
    this.onEnterCompleted && this.onEnterCompleted();
  }

  /**
   * Add view in DOM.
   */
  add() {
    // We update the [data-router-view] slug
    this.root.setAttribute('data-router-view', this.slug);

    // And HTML
    this.root.innerHTML = this.view.innerHTML;
  }

  /**
   * Remove view in DOM.
   */
  remove() {
    // It's time to say goodbye to the view... Farewell my friend.
    this.root.innerHTML = '';
  }

  /**
   * Update document informations
   */
  update() {
    // Now we update all the informations in the DOM we need!
    // We update the title
    document.title = this.page.title;
  }

  /**
   * Add the view in DOM and play an `in` transition if one is defined.
   *
   * @return {object} Promise
   */
  show() {
    return new Promise(async resolve => {
      // Update DOM.
      this.update();

      // The `onEnter` method if set is called everytime the view is appended
      // to the DOM. This let you do some crazy stuffs at this right moment.
      this.onEnter && this.onEnter();

      // The transition is set in your custom renderer with a getter called
      // `transition` that should return the transition object you want to
      // apply to you view. We call the `in` step of this one right now!
      this.Transition && await this.Transition.show();

      // The `onEnterCompleted` method if set in your custom renderer is called
      // everytime a transition is over if set. Otherwise it's called right after
      // the `onEnter` method.
      this.onEnterCompleted && this.onEnterCompleted();

      // We resolve the Promise.
      resolve();
    });
  }

  /**
   * Play an `out` transition if one is defined and remove the view from DOM.
   *
   * @return {object} Promise
   */
  hide() {
    return new Promise(async resolve => {
      // The `onLeave` method if set in your custom renderer is called everytime
      // before a view will be removed from the DOM. This let you do some stuffs
      // right before the view isn't available anymore.
      this.onLeave && this.onLeave();

      // We call the `out` step of your transition right now!
      this.Transition && await this.Transition.hide();

      // Remove view from DOM.
      this.remove();

      // The `onLeaveCompleted` method if set in your custom renderer is called
      // everytime a view is completely removed from the DOM.
      this.onLeaveCompleted && this.onLeaveCompleted();

      // Resolve Promise
      resolve();
    });
  }
}
