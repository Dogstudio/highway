// Highway
import Highway from 'highway';

// Renderer
class Features extends Highway.Renderer {

  onEnter() {
    console.log('Load: Features');
    console.log('----------');
    console.log('Call: Features.onEnter()');
  }

  onLeave() {
    console.log('Call: Features.onLeave()');
  }

  onEnterCompleted() {
    console.log('Call: Features.onEnterCompleted()');
  }

  onLeaveCompleted() {
    console.log('Call: Features.onLeaveCompleted()');
    console.log('----------');
  }
}

export default Features;
