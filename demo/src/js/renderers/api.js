// Highway
import Highway from 'highway';

// Renderer
class API extends Highway.Renderer {

  onEnter() {
    window.Console.clear();
    window.Console.log('<span>Load:</span> <b>API</b>');
    window.Console.log('<span>Call:</span> <b>API.onEnter()</b>');
  }

  onLeave() {
    window.Console.log('<span>Call:</span> <b>API.onLeave()</b>');
  }

  onEnterCompleted() {
    window.Console.log('<span>Call:</span> <b>API.onEnterCompleted()</b>');
  }

  onLeaveCompleted() {
    window.Console.log('<span>Call:</span> <b>API.onLeaveCompleted()</b>');
  }
}

export default API;
