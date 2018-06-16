// Import Highway
import Highway from 'dist/highway';

(() => {
  // Instanciate `Highway.Core` and send your custom renderers through the options.
  // Each renderer is associated to a slug you define in your HTML.
  // More informations: https://github.com/Dogstudio/highway
  const H = new Highway.Core();

  // Highway sends multiple events along its process your script can listen to in
  // order to extend Highway's capabilities.
  // More informations: https://github.com/Dogstudio/highway
  //
  // In this example we listen to the `NAVIGATE_END` event from Highway that
  // occurs when a navigation ends and send a new `pageview` to Google Analytics
  // based on the `state` of Highway.
  H.on('NAVIGATE_IN', (to, state) => {
    if (typeof gtag !== 'undefined') {
      // eslint-disable-next-line
      gtag('config', 'GA_TRACKING_ID', {
        'page_path': state.pathname,
        'page_title': to.page.title,
        'page_location': state.url
      });
    }
  });
})();
