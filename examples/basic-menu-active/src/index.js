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
  // In this example we select all the navigation links and listen to the `NAVIGATE_OUT`
  // event from Highway that occurs when a navigation starts and we update the
  // active item in the menu based on the `state` of Highway.
  const links = document.querySelectorAll('nav a');

  H.on('NAVIGATE_IN', (to, state) => {
    for (const link of links) {
      link.classList.remove('is-active');

      if (link.href === state.url) {
        link.classList.add('is-active');
      }
    }
  });
})();
