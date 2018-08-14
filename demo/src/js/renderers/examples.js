// Highway
import Highway from 'highway';

// Renderer
class Examples extends Highway.Renderer {

  onEnter() {
    console.log('Load: Examples');
    console.log('----------');
    console.log('Call: Examples.onEnter()');
  }

  onLeave() {
    console.log('Call: Examples.onLeave()');
  }

  onEnterCompleted() {
    console.log('Call: Examples.onEnterCompleted()');
  }

  onLeaveCompleted() {
    console.log('Call: Examples.onLeaveCompleted()');
    console.log('----------');
  }
}

export default Examples;
