// Highway
import Highway from 'highway';

// GSAP
import Tween from 'gsap';

// Basic
class Basic extends Highway.Transition {
  in(from, to, done) {
    // Scroll Top
    window.scrollTo(0, 0);

    // Remove Old View
    from.remove();

    // Animation
    Tween.set(to, { opacity: 1 });

    // Done
    done();
  }

  out(from, to, done) {
    // Animation
    Tween.set(from, { opacity: 0 });

    // Done
    done();
  }
}

export default Basic;
