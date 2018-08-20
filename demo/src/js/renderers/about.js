// Highway
import Highway from 'highway';

// Renderer
class About extends Highway.Renderer {

  onEnter() {
    window.Console.clear();
    window.Console.log('Load: <b>About</b>');
    window.Console.log('Call: <b>About.onEnter()</b>');
  }

  onLeave() {
    window.Console.log('Call: <b>About.onLeave()</b>');
  }

  onEnterCompleted() {
    window.Console.log('Call: <b>About.onEnterCompleted()</b>');
  }

  onLeaveCompleted() {
    window.Console.log('Call: <b>About.onLeaveCompleted()</b>');
  }
}

export default About;
