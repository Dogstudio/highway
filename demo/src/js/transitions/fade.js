// Highway
import Highway from 'highway';

// Fade
class Fade extends Highway.Transition {
  in(view, done) {
    // Tracing
    console.log('Call: Fade.in()');

    // Done
    done();
  }

  out(view, done) {
    // Tracing
    console.log('Call: Fade.out()');

    // Done
    done();
  }
}

export default Fade;
