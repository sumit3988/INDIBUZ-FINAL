/* ============================================
   INDIBUZ — SEO Meta Manager
   ============================================ */

const BASE_URL = 'https://www.indibuz.in';

const pageMeta = {
  '/': {
    title: 'INDIBUZ — Premium Basmati Rice & Spice Exporters from India',
    description: 'INDIBUZ is a trusted Indian exporter of premium Basmati Rice, Non-Basmati Rice, Whole Dry Chilli, and Chilli Powder. Supplying to 15+ countries with certified export quality.',
    canonical: '/',
  },
  '/about': {
    title: 'About INDIBUZ — Our Story & Mission | Premium Indian Food Exporters',
    description: 'Discover the story of INDIBUZ — an India-based export house committed to delivering premium quality Basmati Rice, Non-Basmati Rice, and Spices to global markets.',
    canonical: '/about',
  },
  '/products': {
    title: 'Our Products — Basmati Rice, Non-Basmati Rice, Chilli | INDIBUZ',
    description: 'Explore INDIBUZ\'s premium product range: 1121, 1509, 1401 Basmati Rice, IR64, Sona Masoori, Whole Dry Chilli, and Chilli Powder. Export-quality certified.',
    canonical: '/products',
  },
  '/quality': {
    title: 'Quality Control — Our Process from Farm to Export | INDIBUZ',
    description: 'Learn about INDIBUZ\'s rigorous 6-step quality control process: Sourcing, Cleaning, Grading, Packaging, Testing, and Export. SGS inspection available.',
    canonical: '/quality',
  },
  '/certifications': {
    title: 'Certifications — APEDA, FSSAI, IEC, MSME, GST | INDIBUZ',
    description: 'INDIBUZ holds APEDA, FSSAI, IEC, MSME, and GST certifications ensuring the highest standards of food safety and international trade compliance.',
    canonical: '/certifications',
  },
  '/markets': {
    title: 'Export Markets — Global Reach Across 15+ Countries | INDIBUZ',
    description: 'INDIBUZ exports premium Indian rice and spices to the USA, Middle East, Africa, Southeast Asia, and Europe. Discover our global market presence.',
    canonical: '/markets',
  },
  '/partner': {
    title: 'Become a Partner — Import & Distribute with INDIBUZ',
    description: 'Partner with INDIBUZ to import premium Indian Basmati Rice, Non-Basmati Rice, and Spices. Competitive pricing, reliable supply, and global logistics support.',
    canonical: '/partner',
  },
  '/contact': {
    title: 'Contact INDIBUZ — Get a Quote for Premium Indian Rice & Spices',
    description: 'Contact INDIBUZ for bulk inquiries, quotes, and partnerships. Phone/WhatsApp: +91 6284302338. Email: info@indibuz.in. Based in Bokaro, Jharkhand, India.',
    canonical: '/contact',
  },
  '/cart': {
    title: 'Your Order Cart — INDIBUZ Bulk Rice & Spice Exporters',
    description: 'Review your selected bulk products and place your order request with INDIBUZ.',
    canonical: '/cart',
  },
};

export function updatePageMeta(route) {
  const meta = pageMeta[route] || pageMeta['/'];

  // Title
  document.title = meta.title;

  // Description
  setMetaTag('name', 'description', meta.description);

  // Canonical
  setLinkTag('canonical', BASE_URL + meta.canonical);

  // Open Graph
  setMetaTag('property', 'og:title', meta.title);
  setMetaTag('property', 'og:description', meta.description);
  setMetaTag('property', 'og:url', BASE_URL + meta.canonical);
}

function setMetaTag(attr, name, content) {
  let el = document.querySelector(`meta[${attr}="${name}"]`);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, name);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}

function setLinkTag(rel, href) {
  let el = document.querySelector(`link[rel="${rel}"]`);
  if (!el) {
    el = document.createElement('link');
    el.setAttribute('rel', rel);
    document.head.appendChild(el);
  }
  el.setAttribute('href', href);
}
