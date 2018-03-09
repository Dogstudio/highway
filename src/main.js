// Router
import Router from './router/core';

// Views
import Home from './home';

// DOM Ready
(() => {
  // Router
  window.Router = new Router({
    views: {
      'home': Home
    }
  });
})();
