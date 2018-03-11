// Router
import Router from './router/core';

// Renderers
import Home from './home';
import Page from './page';

// Transitions
import Fade from './transitions/fade';

// DOM Ready
(() => {
  // Router
  window.Router = new Router({
    routes: {
      'home:page': Fade,
      'page:home': null,
      'page:page': null
    },
    renderers: {
      'home': Home,
      'page': Page
    }
  });
})();
