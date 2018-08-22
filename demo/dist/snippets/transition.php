<pre>
<code class="js">// File: custom-transition.js
// Import Highway
import Highway from '@dogstudio/highway';

class CustomTransition extends Highway.Transition {
  // Built-in methods
  in(view, done) {
    // [...]
  }

  out(view, done) {
    // [...]
  }
}

// Don`t forget to export your transition
export default CustomTransition;
</code>
</pre>
