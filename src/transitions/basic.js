// Import dependencies
import { TweenLite } from 'gsap';

// Basic transition
const Basic = {
  in: (view, done) => {
    TweenLite.set(view, {
      alpha: 1,
      onComplete: done
    });
  },
  out: (view, done) => {
    TweenLite.set(view, {
      alpha: 0,
      onComplete: done
    });
  }
}

export default Basic;
