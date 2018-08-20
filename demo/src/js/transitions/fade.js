// Highway
import Highway from 'highway';

// GSAP
import Tween from 'gsap';

// Fade
class Fade extends Highway.Transition {
  in(view, done) {
    // Tracing
    window.Console.log('Call: <b>Fade.in()</b>');

    // Animation
    Tween.fromTo(view, 1,
      { opacity: 0 },
      {
        opacity: 1,
        onComplete: () => {
          // Tracing
          window.Console.log('End: <b>Fade.in()</b>');

          // Done
          done();
        }
      }
    );
  }

  out(view, done) {
    // Tracing
    window.Console.log('Call: <b>Fade.out()</b>');

    // Animation
    Tween.fromTo(view, 1,
      { opacity: 1 },
      {
        opacity: 0,
        onComplete: () => {
          // Tracing
          window.Console.log('End: <b>Fade.out()</b>');

          // Done
          done();
        }
      }
    );
  }
}

export default Fade;
