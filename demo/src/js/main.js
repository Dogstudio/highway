// Import Highway
import Highway from 'highway';

// Renderers
import Home from 'renderers/home';
import About from 'renderers/about';
import Features from 'renderers/features';
import Examples from 'renderers/examples';

// Transitions
import Fade from 'transitions/fade';

// Console
import Console from 'console';

(() => {
  // Console
  window.Console = Console;

  // Highway
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
  const links = document.querySelectorAll('.site-menu a');

  H.on('NAVIGATE_IN', (to, state) => {
    // Check Active Link
    for (let i = 0; i < links.length; i++) {
      const link = links[i];

      // Clean class
      link.classList.remove('is-active');

      // Active link
      if (link.href === state.url) {
        link.classList.add('is-active');
      }
    }
  });

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
