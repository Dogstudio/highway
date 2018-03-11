// Router
import Router from './router/core';

// Renderers
import Home from './home';
import Page from './page';

// DOM Ready
(() => {
  // Router
  window.Router = new Router({
    renderers: {
      'home': Home,
      'page': Page
    }
  });
})();
