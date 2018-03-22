// Import Highway
import Highway from '../../../dist/highway.js';

// Import Renderers
import Home from './renderers/home';
import Page from './renderers/page';

// Import Transitions
import Fade from './transitions/fade';

(() => {
  // Instanciate `Highway.Core` and send your custom renderers and transitions
  // through the options. Each renderer and transition is associated to a slug 
  // you define in your HTML.
  // More informations: https://github.com/Dogstudio/highway
  new Highway.Core({
    renderers: {
      page: Page
    },
    transitions: {
      home: Fade,
      page: Fade
    }
  });

  // Note: If you want you can set a `default` transition that will be applied
  // to all you views except if you override if for a specific view.
  //
  // Usage:
  //
  // transitions: {
  //   'default': Fade
  // }
})();
