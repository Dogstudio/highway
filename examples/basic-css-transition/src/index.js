// Import Highway
import Highway from 'dist/highway';

// Import Transitions
import Fade from 'transitions/fade';

(() => {
  // Instanciate `Highway.Core` and send your custom renderers and transitions
  // through the options. Each renderer and transition is associated to a slug
  // you define in your HTML.
  // More informations: https://github.com/Dogstudio/highway
  new Highway.Core({
    transitions: {
      default: Fade
    }
  });
})();
