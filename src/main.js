/* ============================================
   INDIBUZ — Main Application Entry
   ============================================ */

import { registerRoute, initRouter } from './router.js';
import { initI18n, setLanguage } from './i18n.js';
import { initAnimations, initParallax, animateCounters } from './animations.js';
import { updatePageMeta } from './seo.js';
import { initForm } from './forms.js';

// Page modules
import { renderHome } from './pages/home.js';
import { renderProducts, initProductTabs } from './pages/products.js';
import { renderAbout } from './pages/about.js';
import { renderQuality } from './pages/quality.js';
import { renderCertifications } from './pages/certifications.js';
import { renderMarkets, initMapTooltips } from './pages/markets.js';
import { renderPartner } from './pages/partner.js';
import { renderContact } from './pages/contact.js';
import { renderCart, initCartEvents } from './pages/cart.js';
import { renderAccount, initAccount } from './pages/account.js';
import { renderLogin, initLogin } from './pages/login.js';
import { renderRegister, initRegister } from './pages/register.js';
import { renderForgotPassword, initForgotPassword } from './pages/forgot-password.js';
import { renderResetPassword, initResetPassword } from './pages/reset-password.js';
import { getCartCount } from './cart.js';
import { isAuthenticated, logout, fetchCsrfToken } from './auth.js';

// ---- App Bootstrap ----
async function boot() {
  await fetchCsrfToken();
  const app = document.getElementById('app');

  // Register routes
  registerRoute('/', () => renderHome());
  registerRoute('/about', () => renderAbout());
  registerRoute('/products', () => renderProducts());
  registerRoute('/quality', () => renderQuality());
  registerRoute('/certifications', () => renderCertifications());
  registerRoute('/markets', () => renderMarkets());
  registerRoute('/partner', () => renderPartner());
  registerRoute('/contact', () => renderContact());
  registerRoute('/cart', () => renderCart());
  registerRoute('/account', () => renderAccount());
  registerRoute('/login', () => renderLogin());
  registerRoute('/register', () => renderRegister());
  registerRoute('/forgot-password', () => renderForgotPassword());
  registerRoute('/reset-password', () => renderResetPassword());

  // Initialize i18n
  await initI18n();

  // Initialize router
  initRouter(app);

  // Setup header behavior
  initHeader();

  // Setup language switcher
  initLangSwitcher();

  // Listen for route changes — run post-render hooks
  window.addEventListener('routeChanged', (e) => {
    const route = e.detail.route;

    // Update SEO meta
    updatePageMeta(route);

    // Update header style based on page
    updateHeaderStyle(route);

    // Initialize animations after DOM update
    requestAnimationFrame(() => {
      initAnimations();

      // Page-specific init
      switch (route) {
        case '/':
          initParallax();
          animateCounters();
          break;
        case '/products':
          initProductTabs();
          break;
        case '/markets':
          initMapTooltips();
          break;
        case '/partner':
          initForm('partner-form-wrap', [
            { name: 'name', required: true, requiredMsg: 'Please enter your name' },
            { name: 'company', required: true, requiredMsg: 'Please enter your company name' },
            { name: 'country', required: true, requiredMsg: 'Please enter your country' },
            { name: 'email', required: true, type: 'email', requiredMsg: 'Please enter your email', emailMsg: 'Please enter a valid email address' },
            { name: 'phone', type: 'phone' },
            { name: 'product', required: true, requiredMsg: 'Please select a product' },
          ]);
          break;
        case '/contact':
          initForm('contact-form-wrap', [
            { name: 'name', required: true, requiredMsg: 'Please enter your name' },
            { name: 'email', required: true, type: 'email', requiredMsg: 'Please enter your email', emailMsg: 'Please enter a valid email address' },
            { name: 'phone', type: 'phone' },
            { name: 'subject', required: true, requiredMsg: 'Please select a subject' },
            { name: 'message', required: true, minLength: 10, requiredMsg: 'Please enter your message', minLengthMsg: 'Message must be at least 10 characters' },
          ]);
          break;
        case '/cart':
          initCartEvents();
          break;
        case '/account':
          initAccount();
          break;
        case '/login':
          initLogin();
          break;
        case '/register':
          initRegister();
          break;
        case '/forgot-password':
          initForgotPassword();
          break;
        case '/reset-password':
          initResetPassword();
          break;
      }
    });

    // Close mobile menu if open
    closeMobileMenu();
  });

  // Sync cart badge on startup & cart changes
  const updateCartBadge = () => {
    const count = getCartCount();
    const badge = document.getElementById('cart-badge');
    if (badge) badge.textContent = count;
    document.querySelectorAll('.cart-count-text').forEach(el => el.textContent = count);
  };

  updateCartBadge();
  window.addEventListener('cartUpdated', updateCartBadge);

  // Re-render the current page when language changes
  window.addEventListener('languageChanged', () => {
    // Trigger a re-render by re-dispatching the current route
    const hash = window.location.hash.slice(1) || '/';
    window.dispatchEvent(new HashChangeEvent('hashchange'));
  });

  // Auth UI logic
  const updateAuthUI = () => {
    const isAuth = isAuthenticated();
    document.querySelectorAll('.auth-hide').forEach(el => el.style.display = isAuth ? 'inline-block' : 'none');
    document.querySelectorAll('.unauth-hide').forEach(el => el.style.display = isAuth ? 'none' : 'inline-block');
    // We can conditionally show dashboard if user is admin, but for now we'll just keep it simple or based on auth
    // (In reality, we'd check user.is_staff for .admin-hide, but let's just make it visible for testing if auth)
  };

  updateAuthUI();
  window.addEventListener('authStateChanged', updateAuthUI);

  const logoutBtn = document.getElementById('logout-btn');
  const mobileLogoutBtn = document.getElementById('mobile-logout-btn');
  if (logoutBtn) logoutBtn.addEventListener('click', (e) => { e.preventDefault(); logout(); });
  if (mobileLogoutBtn) mobileLogoutBtn.addEventListener('click', (e) => { e.preventDefault(); logout(); closeMobileMenu(); });
}

function initHeader() {
  const header = document.getElementById('site-header');

  // Performance optimized scroll detection using IntersectionObserver
  const sentinel = document.createElement('div');
  sentinel.style.position = 'absolute';
  sentinel.style.top = '60px';
  sentinel.style.width = '100%';
  sentinel.style.height = '1px';
  sentinel.style.pointerEvents = 'none';
  sentinel.style.zIndex = '-1';
  document.body.appendChild(sentinel);

  const observer = new IntersectionObserver(([entry]) => {
    if (!entry.isIntersecting) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  }, { threshold: [1] });

  observer.observe(sentinel);

  // Mobile menu toggle
  const toggle = document.getElementById('mobile-toggle');
  const overlay = document.getElementById('mobile-overlay');

  if (toggle && overlay) {
    toggle.addEventListener('click', () => {
      const isOpen = overlay.classList.contains('open');
      if (isOpen) {
        closeMobileMenu();
      } else {
        overlay.classList.add('open');
        toggle.setAttribute('aria-expanded', 'true');
        document.body.style.overflow = 'hidden';
      }
    });

    // Close on link click
    overlay.querySelectorAll('.mobile-nav-link').forEach(link => {
      link.addEventListener('click', closeMobileMenu);
    });
  }
}

function closeMobileMenu() {
  const toggle = document.getElementById('mobile-toggle');
  const overlay = document.getElementById('mobile-overlay');
  if (overlay) overlay.classList.remove('open');
  if (toggle) toggle.setAttribute('aria-expanded', 'false');
  document.body.style.overflow = '';
}

function updateHeaderStyle(route) {
  const header = document.getElementById('site-header');
  
  // Pages that don't have a dark hero banner need a light header (dark text)
  const lightPages = ['/login', '/register', '/forgot-password', '/reset-password', '/account', '/cart'];
  
  if (lightPages.includes(route)) {
    header.classList.add('header-light');
  } else {
    header.classList.remove('header-light');
  }
}

// ---- Language Switcher ----
function initLangSwitcher() {
  const langBtn = document.getElementById('lang-btn');
  const langDropdown = document.getElementById('lang-dropdown');

  if (langBtn && langDropdown) {
    // Toggle dropdown
    langBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      const isOpen = langDropdown.classList.contains('open');
      langDropdown.classList.toggle('open', !isOpen);
      langBtn.setAttribute('aria-expanded', !isOpen);
    });

    // Close on outside click
    document.addEventListener('click', () => {
      langDropdown.classList.remove('open');
      langBtn.setAttribute('aria-expanded', 'false');
    });

    // Language options
    langDropdown.querySelectorAll('.lang-option').forEach(btn => {
      btn.addEventListener('click', () => {
        setLanguage(btn.dataset.lang);
        langDropdown.classList.remove('open');
        langBtn.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // Mobile language buttons
  document.querySelectorAll('.mobile-lang-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      setLanguage(btn.dataset.lang);
      closeMobileMenu();
    });
  });
}

// ---- Initialize ----
boot();
