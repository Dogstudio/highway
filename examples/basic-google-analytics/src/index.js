// Import Highway
import Highway from '@dogstudio/highway';

// Import Renderers
import Home from './renderers/home';
import Page from './renderers/page';

(() => {
  // Instanciate `Highway.Core` and send your custom renderers through the options.
  // Each renderer is associated to a slug you define in your HTML.
  // More informations: https://github.com/Dogstudio/highway
  const H = new Highway.Core({
    renderers: {
      home: Home,
      page: Page
    }
  });

  // Highway sends multiple events along its process your script can listen to in
  // order to extend Highway's capabilities.
  // More informations: https://github.com/Dogstudio/highway
  //
  // In this example we listen to the `NAVIGATE_START` event from Highway that
  // occurs when a navigation starts and send a new `pageview` to Google Analytics
  // based on the `state` of Highway.
  H.on('NAVIGATE_START', (from, to, title, state) => {
    if (typeof gtag !== 'undefined') {
      // eslint-disable-next-line
      gtag('config', 'GA_TRACKING_ID', {
        'page_path': state.pathname,
        'page_title': title,
        'page_location': state.url
      });
    }
  });
})();
