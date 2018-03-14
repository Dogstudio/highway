// Highway
import Highway from './highway';

// Renderers
import Home from './home';
import Page from './page';

// Transitions
import Fade from './transitions/fade';

// DOM Ready
(() => {
  // Router
  window.Router = new Highway.Core({
    renderers: {
      'home': Home,
      'page': Page
    },
    transitions: {
      'default': Fade
    }
  });

  window.Router.on('NAVIGATE_START', (from, to, title, state) => {
    // Example: Send `pageview` Google Analytics
    if (typeof gtag !== 'undefined') {
      gtag('config', 'UA-115758635-1', {
        'page_title': title,
        'page_path': state.pathname,
        'path_location': state.url
      });
    }

    // Example: Activate menu items
    const items = document.querySelectorAll('nav a');

    for (let i = 0; i < items.length; i++) {
      items[i].classList.remove('is-active');

      if (items[i].href === state.url) {
        items[i].classList.add('is-active');
      }
    }
  });
})();
