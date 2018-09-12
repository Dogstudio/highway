// Highway
import Highway from 'highway';

// Renderer
class Features extends Highway.Renderer {

  onEnter() {
    // Highlight.js
    const codes = document.querySelectorAll('pre code');

    for (let i = 0; i < codes.length; i++) {
      // Get code
      const code = codes[i];

      // Highlight code
      // eslint-disable-next-line
      hljs.highlightBlock(code);
    }
  }
}

export default Features;
