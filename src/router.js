/* ============================================
   INDIBUZ — Hash-Based SPA Router
   ============================================ */

const routes = {};
let currentRoute = null;

export function registerRoute(path, handler) {
  routes[path] = handler;
}

export function navigate(path) {
  window.location.hash = path;
}

export function getCurrentRoute() {
  return currentRoute;
}

export function initRouter(appElement) {
  async function handleRoute() {
    const hash = window.location.hash.slice(1) || '/';
    currentRoute = hash;

    const handler = routes[hash];
    if (handler) {
      // Scroll to top
      window.scrollTo(0, 0);

      // Render page
      const html = await handler();
      appElement.innerHTML = html;

      // Update active nav
      updateActiveNav(hash);

      // Dispatch custom event for post-render hooks
      window.dispatchEvent(new CustomEvent('routeChanged', { detail: { route: hash } }));
    } else {
      // 404 fallback — redirect to home
      window.location.hash = '#/';
    }
  }

  window.addEventListener('hashchange', handleRoute);
  handleRoute();
}

function updateActiveNav(route) {
  // Desktop nav
  document.querySelectorAll('.nav-link').forEach(link => {
    const hrefAttr = link.getAttribute('href');
    if (hrefAttr) {
      const href = hrefAttr.replace('#', '');
      link.classList.toggle('active', href === route);
    }
  });

  // Mobile nav
  document.querySelectorAll('.mobile-nav-link').forEach(link => {
    const hrefAttr = link.getAttribute('href');
    if (hrefAttr) {
      const href = hrefAttr.replace('#', '');
      link.classList.toggle('active', href === route);
    }
  });
}
