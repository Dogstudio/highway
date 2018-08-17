// Highway
import Highway from 'highway';

// GSAP
import Tween from 'gsap';

// Fade
class Fade extends Highway.Transition {
  in(view, done) {
    // Tracing
    console.log('Call: Fade.in()');

    // Animation
    Tween.fromTo(view, 1,
      { opacity: 0 },
      {
        opacity: 1,
        onComplete: () => {
          // Tracing
          console.log('End: Fade.in()');

          // Done
          done();
        }
      }
    );
  }

  out(view, done) {
    // Tracing
    console.log('Call: Fade.out()');

    // Animation
    Tween.fromTo(view, 1,
      { opacity: 1 },
      {
        opacity: 0,
        onComplete: () => {
          // Tracing
          console.log('End: Fade.out()');

          // Done
          done();
        }
      }
    );
  }
}

export default Fade;
