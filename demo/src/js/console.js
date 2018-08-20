// Get Console DOM
const ROOT = document.querySelector('.console');

export default {
  log: (message) => {
    // Create message
    const el = document.createElement('p');

    // Write message
    el.innerHTML = message;
    el.classList.add('console-entry');

    // Display message
    ROOT.appendChild(el);
  },

  clear: () => {
    // Get all entries
    const els = ROOT.querySelectorAll('.console-entry');

    for (let i = 0; i < els.length; i++) {
      // Get entry
      const el = els[i];

      // Clear entry
      ROOT.removeChild(el);
    }
  }
}
