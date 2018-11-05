// Highway
import Highway from 'highway';

// GSAP
import Tween from 'gsap';

// Fade
class Fade extends Highway.Transition {
  in(view, done) {
    console.log(view);

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
    console.log(view);

    // Animation
    Tween.fromTo(view, 0.5,
      { opacity: 1 },
      {
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

export default Fade;
