// Highway
import Highway from 'highway';

// Renderer
class Examples extends Highway.Renderer {

  onEnter() {
    window.Console.clear();
    window.Console.log('<span>Load:</span> <b>Examples</b>');
    window.Console.log('<span>Call:</span> <b>Examples.onEnter()</b>');

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

  onLeave() {
    window.Console.log('<span>Call:</span> <b>Examples.onLeave()</b>');
  }

  onEnterCompleted() {
    window.Console.log('<span>Call:</span> <b>Examples.onEnterCompleted()</b>');
  }

  onLeaveCompleted() {
    window.Console.log('<span>Call:</span> <b>Examples.onLeaveCompleted()</b>');
  }
}

export default Examples;
