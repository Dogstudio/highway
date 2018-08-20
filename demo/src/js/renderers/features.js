// Highway
import Highway from 'highway';

// Renderer
class Features extends Highway.Renderer {

  onEnter() {
    window.Console.clear();
    window.Console.log('Load: <b>Features</b>');
    window.Console.log('Call: <b>Features.onEnter()</b>');
  }

  onLeave() {
    window.Console.log('Call: <b>Features.onLeave()</b>');
  }

  onEnterCompleted() {
    window.Console.log('Call: <b>Features.onEnterCompleted()</b>');
  }

  onLeaveCompleted() {
    window.Console.log('Call: <b>Features.onLeaveCompleted()</b>');
  }
}

export default Features;
