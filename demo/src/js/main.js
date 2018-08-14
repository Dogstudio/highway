// Import Highway
import Highway from 'highway';

// Renderers
import Home from 'renderers/home';
import About from 'renderers/about';
import Features from 'renderers/features';
import Examples from 'renderers/examples';

// Transitions
import Fade from 'transitions/fade';

(() => {
  new Highway.Core({
    renderers: {
      home: Home,
      about: About,
      features: Features,
      examples: Examples,
    },
    transitions: {
      default: Fade
    }
  });
})();
