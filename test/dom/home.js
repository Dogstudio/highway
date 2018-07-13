// Highway
import Highway from '../../src/index';

// Fake HTML.
const HTML = `
<html>
  <head>
    <title>Home</title>
  </head>
  <body>
    <main data-router-wrapper>
      <article data-router-view="home"></article>
    </main>
  </body>
</html>`;

// We parse the HTML to create a fake DOM.
const DOM = new window.DOMParser().parseFromString(HTML, 'text/html');

// We now get the `[router-view]` from the fake DOM.
const VIEW = DOM.querySelector('[data-router-view]');

// Export instance
export default new Highway.Renderer({
  page: DOM,
  view: VIEW
});
