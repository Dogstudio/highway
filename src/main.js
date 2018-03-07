// Router
const Router = require('./core');

// DOM Ready
(() => {
  // Router
  window.Router = new Router();

  // Events
  window.Router.on('NAVIGATE_START', () => console.log('STAAART'));
  window.Router.on('NAVIGATE_ERROR', () => console.log('ERROR'));
  window.Router.on('NAVIGATE_ENDED', () => console.log('EEEEND'));
})();
