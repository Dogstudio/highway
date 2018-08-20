// Highway
import Highway from 'highway';

// Renderer
class Home extends Highway.Renderer {

  onEnter() {
    window.Console.clear();
    window.Console.log('Load: <b>Home</b>');
    window.Console.log('Call: <b>Home.onEnter()</b>');
  }

  onLeave() {
    window.Console.log('Call: <b>Home.onLeave()</b>');
  }

  onEnterCompleted() {
    window.Console.log('Call: <b>Home.onEnterCompleted()</b>');
  }

  onLeaveCompleted() {
    window.Console.log('Call: <b>Home.onLeaveCompleted()</b>');
  }
}

export default Home;
