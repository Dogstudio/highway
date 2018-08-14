// Import Highway
import Highway from 'highway';

// Renderers
import Home from 'renderers/home';
import About from 'renderers/about';
import Features from 'renderers/features';

(() => {
  new Highway.Core({
    renderers: {
      home: Home,
      about: About,
      features: Features
    }
  });
})();
