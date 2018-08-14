// Highway
import Highway from 'highway';

// Renderer
class Home extends Highway.Renderer {

  onEnter() {
    console.log('Load: Home');
    console.log('----------');
    console.log('Call: Home.onEnter()');
  }

  onLeave() {
    console.log('Call: Home.onLeave()');
  }

  onEnterCompleted() {
    console.log('Call: Home.onEnterCompleted()');
  }

  onLeaveCompleted() {
    console.log('Call: Home.onLeaveCompleted()');
    console.log('----------');
  }
}

export default Home;
