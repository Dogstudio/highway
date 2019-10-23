/**
 * @file Highway default renderer that handle DOM stuffs.
 * @author Anthony Du Pont <bulldog@dogstudio.co>
 */

export default class Renderer {

  /**
   * @arg {object} properties — Set of properties (slug, page, view,...)
   * @constructor
   */
  constructor(properties) {
    // We get the view.
    this.wrap = document.querySelector('[data-router-wrapper]');

    // We save properties of the renderer
    this.properties = properties;

    // We get our transition we will use later to show/hide our view.
    this.Transition = properties.transition ? new properties.transition.class(this.wrap, properties.transition.name) : null;

    console.log(this);
  }

  /**
   * Renderer initialization.
   */
  setup() {
    // These both methods have to be called at least once on first load.
    this.onEnter && this.onEnter();
    this.onEnterCompleted && this.onEnterCompleted();
  }

  /**
   * Add view in DOM, then remove previous view
   *  @param {bool} goToSleep - is a page falling asleep
   */
  add(goToSleep) {
    // We setup the DOM for our [data-router-view]
    if (goToSleep) {
      this.wrap.insertAdjacentHTML('afterbegin', this.properties.view.outerHTML);
    } else {
      this.wrap.insertAdjacentHTML('beforeend', this.properties.view.outerHTML);
    }
  }

  /**
   * Update document informations
   */
  update() {
    // Now we update all the informations in the DOM we need!
    // We update the title
    document.title = this.properties.page.title;
  }

  /**
   * Add the view in DOM and play an `in` transition if one is defined.
   *
   * @param {object} datas - Set of datas
   * @return {object} Promise
   */
  show(datas) {
    return new Promise(async resolve => {

      console.log('renderer show', datas);

      // Update DOM.
      this.update();

      // The `onEnter` method if set is called everytime the view is appended
      // to the DOM. This let you do some crazy stuffs at this right moment.
      this.onEnter && this.onEnter();

      // The transition is set in your custom renderer with a getter called
      // `transition` that should return the transition object you want to
      // apply to you view. We call the `in` step of this one right now!
      this.Transition && await this.Transition.show(datas);

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
   * @param {object} datas - Set of datas
   * @return {object} Promise
   */
  hide(datas) {
    return new Promise(async resolve => {
      // The `onLeave` method if set in your custom renderer is called everytime
      // before a view will be removed from the DOM. This let you do some stuffs
      // right before the view isn't available anymore.
      this.onLeave && this.onLeave();

      // We call the `out` step of your transition right now!
      this.Transition && await this.Transition.hide(datas);

      // The `onLeaveCompleted` method if set in your custom renderer is called
      // everytime a view is completely removed from the DOM.
      this.onLeaveCompleted && this.onLeaveCompleted();

      // Resolve Promise
      resolve();
    });
  }

  sleep(datas) {
    return new Promise(async resolve => {
      console.log('RENDERER SLEEEEEEEEP');
      this.onSleep && this.onSleep();

      this.Transition && await this.Transition.hide(datas);

      this.Transition.wrap.firstElementChild.classList.add('view-asleep');

      // Resolve Promise
      resolve();
    });
  }

  /**
   * Add the view in DOM and play an `in` transition if one is defined.
   *
   * @param {object} datas - Set of datas
   * @return {object} Promise
   */
  awaken(datas) {
    return new Promise(async resolve => {

      console.log('awaken renderer', datas);

      // Update DOM.
      this.update();

      // The transition is set in your custom renderer with a getter called
      // `transition` that should return the transition object you want to
      // apply to you view. We call the `in` step of this one right now!
      this.Transition && await this.Transition.show(datas);

      // The `onEnterCompleted` method if set in your custom renderer is called
      // everytime a transition is over if set. Otherwise it's called right after
      // the `onEnter` method.
      this.onAwaken && this.onAwaken();

      // We resolve the Promise.
      resolve();
    });
  }
}
