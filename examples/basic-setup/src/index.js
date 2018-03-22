// Import Highway
import Highway from '@dogstudio/highway';

// Import Renderers
import Home from './renderers/home';
import Page from './renderers/page';

(() => {
  // Instanciate `Highway.Core` and send your custom renderers through the options.
  // Each renderer is associated to a slug you define in your HTML.
  // More informations: https://github.com/Dogstudio/highway
  new Highway.Core({
    renderers: {
      home: Home,
      page: Page
    }
  });
})();
