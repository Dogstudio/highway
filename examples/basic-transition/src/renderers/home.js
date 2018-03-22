// Import Highway
import Highway from '../../../../dist/highway.js';

// To create your custom renderer you have to extend the `Highway.Renderer` to
// access all the required methods and to be able to call the "state" methods
// which are all optional by the way:
// - `onEnter`: Trigger when the view is added to the DOM.
// - `onLeave`: Trigger when a transition `out` starts.
// - `onEnterCompleted`: Trigger when a transition `in` is over.
// - `onLeaveCompleted`: Trigger when the view is removed from the DOM.
class Home extends Highway.Renderer {
  onEnter() { }
  onLeave() { }
  onEnterCompleted() { }
  onLeaveCompleted() { }
}

// Don't forget to export in some way your custom renderer.
export default Home;
