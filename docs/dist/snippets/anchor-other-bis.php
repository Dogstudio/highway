<pre>
<code class="js">// File: main.js
const H = // [...] Call Highway.Core;

// Listen the `NAVIGATE_END` event
H.on('NAVIGATE_END', (to, from, location) => {
    // Check Anchor
    if (location.anchor) {
        // Get element
        const el = document.querySelector(location.anchor);

        if (el) {
            // Scroll to element
            window.scrollTo(el.offsetLeft, el.offsetTop);
        }
    }
});
</code>
</pre>
