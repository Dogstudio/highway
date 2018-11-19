// Highway
import Highway from 'highway';

// GSAP
import Tween from 'gsap';

// Basic
class Contextual extends Highway.Transition {
  in(view, done) {
    // We reset the scroll position. This can happen here, earlier or later depending on your transition
    window.scrollTo(0, 0);
    // Done
    done();

    Tween.set('.site-footer', { opacity: 1, y: 0 });
    // Animation
    Tween.fromTo(view, 0.7, { opacity: 0, y: 50 }, { opacity: 1, y: 0, force3D: true });
  }

  out(view, done) {
    // Animation
    Tween.to([view, '.site-footer'], 0.7, { opacity: 0, y: -40, force3D: true, onComplete: done });
  }
}

export default Contextual;
