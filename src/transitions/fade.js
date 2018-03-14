// Import dependencies
import { TweenLite } from 'gsap';

// Fade transition
const Fade = {
  in: (view, done) => {
    TweenLite.fromTo(view, 1,
      { alpha: 0 },
      {
        alpha: 1,
        onComplete: done
      }
    );
  },
  out: (view, done) => {
    TweenLite.fromTo(view, 1,
      { alpha: 1 },
      {
        alpha: 0,
        onComplete: done
      }
    );
  }
}

export default Fade;
