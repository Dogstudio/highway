// Import dependencies
import { TweenLite } from 'gsap';

// Fade transition
const Fade = {
  in: (DOM) => {
    return new Promise(resolve => {
      TweenLite.fromTo(DOM, 1,
        { alpha: 0 },
        {
          alpha: 1,
          onComplete: resolve
        }
      );
    });
  },
  out: (DOM) => {
    return new Promise(resolve => {
      TweenLite.fromTo(DOM, 1,
        { alpha: 1 },
        {
          alpha: 0,
          onComplete: resolve
        }
      );
    });
  }
}

export default Fade;
