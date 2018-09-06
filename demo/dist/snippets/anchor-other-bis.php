<pre>
<code class="js">// File: main.js
const H = // [...] Call Highway.Core;

// Listen the `NAVIGATE_END` event
H.on('NAVIGATE_END', (from, to, state) => {
    // Check Anchor
    if (state.anchor) {
        // Get element
        const el = document.querySelector(state.anchor);

        if (el) {
            // Scroll to element
            window.scrollTo(el.offsetLeft, el.offsetTop);
        }
    }
});
</code>
</pre>
