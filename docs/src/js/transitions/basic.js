// Highway
import Highway from 'highway';

// GSAP
import Tween from 'gsap';

// Basic
class Basic extends Highway.Transition {
  in(view, done) {
    console.log(view);

    // Scroll Top
    window.scrollTo(0, 0);

    // Animation
    Tween.set(view, { opacity: 1 });

    // Done
    done();
  }

  out(view, done) {
    console.log(view);

    // Animation
    Tween.set(view, { opacity: 0 });

    // Done
    done();
  }
}

export default Basic;
