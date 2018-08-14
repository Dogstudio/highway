// Highway
import Highway from 'highway';

// Renderer
class About extends Highway.Renderer {

  onEnter() {
    console.log('Load: About');
    console.log('----------');
    console.log('Call: About.onEnter()');
  }

  onLeave() {
    console.log('Call: About.onLeave()');
  }

  onEnterCompleted() {
    console.log('Call: About.onEnterCompleted()');
  }

  onLeaveCompleted() {
    console.log('Call: About.onLeaveCompleted()');
    console.log('----------');
  }
}

export default About;
