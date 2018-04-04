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
  // In this example welisten to the `NAVIGATE_END` event from Highway that occurs 
  // when a navigation ends and we scroll to the an anchor if one is found in the
  // `state` of Highway.
  H.on('NAVIGATE_END', (from, to, state) => {
    if (state.anchor) {
      const el = document.getElementById(state.anchor);

      if (el) {
        window.scrollTo(el.offsetLeft, el.offsetTop);
      }
    }
  });
})();
