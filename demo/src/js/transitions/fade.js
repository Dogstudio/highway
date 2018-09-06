// Highway
import Highway from 'highway';

// GSAP
import Tween from 'gsap';

// Fade
class Fade extends Highway.Transition {
  in(view, done) {
    // Animation
    Tween.fromTo(view, 0.5,
      { opacity: 0 },
      {
        opacity: 1,
        onComplete: done
      }
    );
  }

  out(view, done) {
    // Animation
    Tween.fromTo(view, 0.5,
      { opacity: 1 },
      {
        opacity: 0,
        onComplete: done
      }
    );
  }
}

export default Fade;
