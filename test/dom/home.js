// Highway
import Highway from '../../src/index';

// Fake HTML.
const HTML = `
<html class="foo">
  <head>
    <title>Home</title>
  </head>
  <body class="bar">
    <main router-wrapper>
      <article router-view="page"></article>
    </main>
  </body>
</html>`;

// We parse the HTML to create a fake DOM.
const DOM = new window.DOMParser().parseFromString(HTML, 'text/html');

// We now get the `[router-view]` from the fake DOM.
const VIEW = DOM.querySelector('[router-view]');

// Export instance
export default new Highway.Renderer({
  page: DOM,
  view: VIEW,
  transition: Highway.Transition
});
