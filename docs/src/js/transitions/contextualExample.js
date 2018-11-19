// Highway
import Highway from 'highway';

// GSAP
import Tween from 'gsap';

// Basic
class Contextual extends Highway.Transition {
  in(view, done) {
    Tween.set('.site-footer', { opacity: 1, y: 0 });
    Tween.fromTo(view, 0.7, { autoAlpha: 0, y: 50 }, { autoAlpha: 1, y: 0, force3D: true, onComplete: () => {
        // Done
        done();
      }});
  }

  out(view, done) {
    Tween.to([view, '.site-footer'], 0.7, { opacity: 0, y: -40, force3D: true, onComplete: () => {
        Tween.set(view, { display: 'none'});
        // We reset the scroll position. This can happen here, earlier or later depending on your transition
        window.scrollTo(0, 0);
        done();
      }});
  }
}

export default Contextual;
