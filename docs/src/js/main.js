// Polyfill
import 'whatwg-fetch';

// Import Highway
import Highway from 'highway';

// Transitions
import Fade from 'transitions/fade';
import Contextual from 'transitions/contextualExample';

(() => {

  // for clicking back and forward, we always want to drop them on the top of the page
  if ('scrollRestoration' in history) {
    history.scrollRestoration = 'manual';
  }

  const $menuToggler = document.querySelector('.js-toggle-menu');
  const $siteHeader = document.querySelector('.js-site-header');

  $menuToggler.addEventListener('click', () => {
    $siteHeader.classList.toggle('is-open');
  });

  // Highway
  const H = new Highway.Core({
    renderers: {
      'examples': () => import('renderers/examples'),
      'get-started': () => import('renderers/get-started'),
      'installation': () => import('renderers/installation')
    },
    transitions: {
      default: Fade,
      contextual: {
        contextualExample: Contextual
      }
    }
  });

  // this should probably be in examples.js somehow, but I ran out of time and needed access to the Highway.Core created above
  const hoverRedirect = () => {
    let hoveringButton = false;
    let countdown;
    const redirectButton = document.querySelector('.redirect-example');
    if (redirectButton) {
      redirectButton.addEventListener('mouseenter', () => {
        hoveringButton = true;
        countdown = setTimeout(() => {
          if (hoveringButton === true) {
            H.redirect('http://127.0.0.1:4000/api.html', 'contextualExample');
          }
        }, 1500);
      });
      redirectButton.addEventListener('mouseleave', () => {
        hoveringButton = false;
        clearTimeout(countdown);
      });
    }
  };
  hoverRedirect();

  // Events
  const links = document.querySelectorAll('.site-menu a');

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

    hoverRedirect();
  });

  H.on('NAVIGATE_END', (to, from, location) => {
    // Check Anchor
    if (location.anchor) {
      const el = document.querySelector(location.anchor);

      if (el) {
        window.scrollTo(el.offsetLeft, el.offsetTop);
      }
    }

    // Page View
    if (typeof gtag !== 'undefined') {
      // eslint-disable-next-line
      gtag('config', 'UA-125659111-1', {
        'page_path': location.pathname,
        'page_title': to.page.title,
        'page_location': location.href
      });
    }
  });

  H.on('NAVIGATE_OUT', (from, location) => {
    // Close menu
    $siteHeader.classList.remove('is-open');
  });
})();
