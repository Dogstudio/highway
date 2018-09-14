// Polyfill
import 'whatwg-fetch';

// Import Highway
import Highway from 'highway';

// Renderers
import Features from 'renderers/features';
import Examples from 'renderers/examples';
import GetStarted from 'renderers/get-started';
import Installation from 'renderers/installation';

// Transitions
import Fade from 'transitions/fade';

(() => {
  // Highway
  const H = new Highway.Core({
    renderers: {
      'features': Features,
      'examples': Examples,
      'get-started': GetStarted,
      'installation': Installation
    },
    transitions: {
      default: Fade
    }
  });

  // Events
  const links = document.querySelectorAll('.site-menu a');

  H.on('NAVIGATE_IN', (to, location) => {
    // Check Active Link
    for (let i = 0; i < links.length; i++) {
      const link = links[i];

      // Clean class
      link.classList.remove('is-active');

      // Active link
      if (link.href === location.href) {
        link.classList.add('is-active');
      }
    }
  });

  H.on('NAVIGATE_END', (to, from, location) => {
    // Check Anchor
    if (location.anchor) {
      const el = document.querySelector(location.anchor);

      if (el) {
        window.scrollTo(el.offsetLeft, el.offsetTop);
      }
    }

    // Page View
    if (typeof gtag !== 'undefined') {
      // eslint-disable-next-line
      gtag('config', 'UA-125659111-1', {
        'page_path': location.pathname,
        'page_title': to.page.title,
        'page_location': location.href
      });
    }
  });
})();
