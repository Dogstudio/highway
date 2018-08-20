// Highway
import Highway from 'highway';

// Renderer
class Examples extends Highway.Renderer {

  onEnter() {
    window.Console.clear();
    window.Console.log('Load: <b>Examples</b>');
    window.Console.log('Call: <b>Examples.onEnter()</b>');
  }

  onLeave() {
    window.Console.log('Call: <b>Examples.onLeave()</b>');
  }

  onEnterCompleted() {
    window.Console.log('Call: <b>Examples.onEnterCompleted()</b>');
  }

  onLeaveCompleted() {
    window.Console.log('Call: <b>Examples.onLeaveCompleted()</b>');
  }
}

export default Examples;
