<pre>
<code class="js">// File: main.js
const H = // [...] Call Highway.Core;

// Get all menu links
const links = document.querySelectorAll('nav a');

// Listen the `NAVIGATE_IN` event
H.on('NAVIGATE_IN', (to, location) => {
    // Check Active Link
    for (let i = 0; i < links.length; i++) {
      const link = links[i];

      // Clean class
      link.classList.remove('is-active');

      // Active link
      if (link.href === location.href) {
        link.classList.add('is-active');
      }
    }
});
</code>
</pre>
