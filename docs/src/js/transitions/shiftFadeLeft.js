// Highway
import Highway from 'highway';

// GSAP
import Tween from 'gsap';

// Fade
class ShiftFadeLeft extends Highway.Transition {
  in(view, done) {
    // Animation
    Tween.fromTo(view, 0.5,
      { x: 40, opacity: 0 },
      {
        x: 0,
        opacity: 1,
        onComplete: done
      }
    );
  }

  out(view, done) {
    // Animation
    Tween.fromTo(view, 0.5,
      { x: 0, opacity: 1 },
      {
        x: -40,
        opacity: 0,
        onComplete: () => {
          // We reset the scroll position
          window.scrollTo(0, 0);

          // Done
          done();
        }
      }
    );
  }
}

export default ShiftFadeLeft;
