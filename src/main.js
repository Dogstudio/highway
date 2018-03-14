// Highway
import Highway from './highway';

// Renderers
import Home from './home';
import Page from './page';

// DOM Ready
(() => {
  // Router
  window.Router = new Highway.Core({
    renderers: {
      'home': Home,
      'page': Page
    }
  });
})();
