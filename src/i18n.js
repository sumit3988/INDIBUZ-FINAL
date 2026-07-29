/* ============================================
   INDIBUZ — Internationalization Engine
   ============================================ */

let currentLang = 'en';
let translations = {};
const RTL_LANGUAGES = ['ar', 'sd'];

export async function initI18n() {
  const saved = localStorage.getItem('indibuz-lang') || 'en';
  await setLanguage(saved);
}

export async function setLanguage(lang) {
  try {
    const module = await import(`./lang/${lang}.json`);
    translations = module.default;
    currentLang = lang;
    localStorage.setItem('indibuz-lang', lang);

    // Set document direction
    const isRTL = RTL_LANGUAGES.includes(lang);
    document.documentElement.dir = isRTL ? 'rtl' : 'ltr';
    document.documentElement.lang = lang;

    // Update all translatable elements
    applyTranslations();

    // Update language switcher display
    updateLangDisplay();

    // Dispatch event
    window.dispatchEvent(new CustomEvent('languageChanged', { detail: { lang } }));
  } catch (e) {
    console.warn(`Language file for "${lang}" not found, falling back to English.`);
    if (lang !== 'en') {
      await setLanguage('en');
    }
  }
}

export function t(key) {
  const keys = key.split('.');
  let value = translations;
  for (const k of keys) {
    if (value && typeof value === 'object' && k in value) {
      value = value[k];
    } else {
      return key; // Return key as fallback
    }
  }
  return value;
}

export function getCurrentLang() {
  return currentLang;
}

export function isRTL() {
  return RTL_LANGUAGES.includes(currentLang);
}

function applyTranslations() {
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    const translated = t(key);
    if (translated !== key) {
      el.textContent = translated;
    }
  });

  document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
    const key = el.getAttribute('data-i18n-placeholder');
    const translated = t(key);
    if (translated !== key) {
      el.placeholder = translated;
    }
  });

  document.querySelectorAll('[data-i18n-title]').forEach(el => {
    const key = el.getAttribute('data-i18n-title');
    const translated = t(key);
    if (translated !== key) {
      document.title = translated;
    }
  });
}

function updateLangDisplay() {
  const langLabels = { en: 'EN', ar: 'عر', hi: 'हि', sd: 'سن' };
  const currentLangEl = document.getElementById('current-lang');
  if (currentLangEl) {
    currentLangEl.textContent = langLabels[currentLang] || 'EN';
  }

  // Update active states
  document.querySelectorAll('.lang-option').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.lang === currentLang);
  });

  document.querySelectorAll('.mobile-lang-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.lang === currentLang);
  });
}
