// Highway
import Highway from 'highway';

// Renderer
class Home extends Highway.Renderer {

  onEnter() {
    window.Console.clear();
    window.Console.log('<span>Load:</span> <b>Home</b>');
    window.Console.log('<span>Call:</span> <b>Home.onEnter()</b>');
  }

  onLeave() {
    window.Console.log('<span>Call:</span> <b>Home.onLeave()</b>');
  }

  onEnterCompleted() {
    window.Console.log('<span>Call:</span> <b>Home.onEnterCompleted()</b>');
  }

  onLeaveCompleted() {
    window.Console.log('<span>Call:</span> <b>Home.onLeaveCompleted()</b>');
  }
}

export default Home;
