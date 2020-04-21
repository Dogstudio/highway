// Highway
import Highway from 'highway';

// GSAP
import { TweenMax } from 'gsap';

// Basic
class Basic extends Highway.Transition {
  in({ from, to, done }) {
    // Reset Scroll
    window.scrollTo(0, 0);

    // Remove Old View
    from.remove();

    // Animation
    TweenMax.set(to, { opacity: 1 });

    // Done
    done();
  }

  out({ from, done }) {
    // Animation
    TweenMax.set(from, { opacity: 0 });

    // Done
    done();
  }
}

export default Basic;
