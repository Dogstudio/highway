// Highway
import Highway from 'highway';

// Renderer
class GetStarted extends Highway.Renderer {

  onEnter() {
    window.Console.clear();
    window.Console.log('<span>Load:</span> <b>GetStarted</b>');
    window.Console.log('<span>Call:</span> <b>GetStarted.onEnter()</b>');

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
    window.Console.log('<span>Call:</span> <b>GetStarted.onLeave()</b>');
  }

  onEnterCompleted() {
    window.Console.log('<span>Call:</span> <b>GetStarted.onEnterCompleted()</b>');
  }

  onLeaveCompleted() {
    window.Console.log('<span>Call:</span> <b>GetStarted.onLeaveCompleted()</b>');
  }
}

export default GetStarted;
