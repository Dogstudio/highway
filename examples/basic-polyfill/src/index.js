// Polyfill
import 'whatwg-fetch';

// Import Highway
import Highway from 'dist/highway.js';

// Import Renderers
import Home from 'renderers/home';
import Page from 'renderers/page';

// Import Transitions
import Fade from 'transitions/fade';

(() => {
  new Highway.Core({
    renderers: {
      home: Home,
      page: Page
    },
    transitions: {
      default: Fade
    }
  });
})();
