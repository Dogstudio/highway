// Import Highway
import Highway from 'highway';

// Renderers
import Home from 'renderers/home';
import About from 'renderers/about';
import Features from 'renderers/features';
import Examples from 'renderers/examples';

// Transitions
import Fade from 'transitions/fade';

(() => {
  const H = new Highway.Core({
    renderers: {
      home: Home,
      about: About,
      features: Features,
      examples: Examples
    },
    transitions: {
      default: Fade
    }
  });

  // Events
  H.on('NAVIGATE_END', (from, to, state) => {
    // Check Anchor
    if (state.anchor) {
      const el = document.querySelector(state.anchor);

      if (el) {
        window.scrollTo(el.offsetLeft, el.offsetTop);
      }
    }
  });
})();
