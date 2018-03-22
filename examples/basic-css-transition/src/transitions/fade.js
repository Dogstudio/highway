// Import Highway
import Highway from 'dist/highway';

// To create your custom transition you need to provide two required methods:
// - `in`: The transition part to show your view.
// - `out`: The transition part to hide you view.
//
// Each method receives a callback method called `done` you will always have to
// call when the a transition is over.
class Fade extends Highway.Transition {
  in(view, done) {
    // Add a classname to trigger the animation
    view.classList.add('fade-in');

    // Wait for the animation to end
    view.addEventListener('animationend', done);
  }

  out(view, done) {
    // Add a classname to trigger the animation
    view.classList.add('fade-out');

    // Wait for the animation to end
    view.addEventListener('animationend', done);
  }
}

// Don't forget to export in some way your custom transition.
export default Fade;
