// Highway
import Highway from 'highway';

// GSAP
import Tween, { TweenMax } from 'gsap';

// Fade
class Overlap extends Highway.Transition {
  in(from, to, done) {
    // Animation
    Tween.fromTo(to, 0.5,
      { opacity: 0 },
      {
        opacity: 1,
        onComplete: done
      }
    );

    // Animation
    Tween.fromTo(from, 0.5,
      { opacity: 1 },
      {
        opacity: 0,
        onComplete: () => {
          // Set New View in DOM Stream
          to.style.position = 'static';

          // Remove Old View
          from.remove();
        }
      }
    );
  }

  out(from, to, done) {
    done();
  }
}

export default Overlap;
