/* ============================================
   INDIBUZ — Export Markets Page (Redesigned)
   ============================================ */
import { t } from '../i18n.js';

const regions = [
  {
    name: 'Middle East',
    flag: '🇸🇦',
    countries: 'Saudi Arabia, UAE, Kuwait, Oman, Qatar, Bahrain',
    demand: 'Basmati Rice (1121 Golden Sella, Steam), Chilli Powder',
    desc: 'The largest import market for Indian Basmati Rice. Strong demand for 1121 Golden Sella and Steam varieties for traditional Arabic cuisine.',
    color: '#C5963A',
    accent: 'rgba(197,150,58,0.10)'
  },
  {
    name: 'Africa',
    flag: '🌍',
    countries: 'Nigeria, Kenya, South Africa, Ghana, Tanzania',
    demand: 'Non-Basmati Rice (IR64 Parboiled), Whole Dry Chilli',
    desc: 'High-volume demand for affordable IR64 parboiled rice and cost-effective non-basmati varieties. Growing market for Indian spices.',
    color: '#2E7D32',
    accent: 'rgba(46,125,50,0.10)'
  },
  {
    name: 'Southeast Asia',
    flag: '🌏',
    countries: 'Malaysia, Indonesia, Singapore, Philippines',
    demand: 'Basmati Rice, Non-Basmati Rice, Chilli Products',
    desc: 'Diverse demand across premium basmati for Indian restaurants and affordable non-basmati for mass consumption.',
    color: '#1565C0',
    accent: 'rgba(21,101,192,0.10)'
  },
  {
    name: 'Europe',
    flag: '🇪🇺',
    countries: 'United Kingdom, Germany, Netherlands, France, Italy',
    demand: 'Basmati Rice (1121, Pusa), Red Chilli Powder',
    desc: 'Premium market with stringent quality requirements. Demand for certified organic and specialty basmati varieties.',
    color: '#6A1B9A',
    accent: 'rgba(106,27,154,0.10)'
  },
  {
    name: 'North America',
    flag: '🇺🇸',
    countries: 'United States, Canada',
    demand: 'Basmati Rice (1121, 1509), Chilli Powder',
    desc: 'Growing demand for premium long-grain basmati rice in Indian, Middle Eastern, and ethnic grocery markets.',
    color: '#BF360C',
    accent: 'rgba(191,54,12,0.10)'
  }
];

const stats = [
  { value: '25+', label: 'Countries Served' },
  { value: '5',   label: 'Export Regions' },
  { value: '10K+', label: 'MT Exported / Year' },
  { value: '100%', label: 'Quality Certified' }
];

export function renderMarkets() {
  return `
    <!-- Page Hero -->
    <section class="page-hero">
      <div class="hero-bg">
        <div class="img-placeholder" style="background-color:var(--forest-deep);" role="img" aria-label="Global export map">
          <div style="position:absolute;inset:0;background:linear-gradient(135deg,rgba(15,42,30,0.95) 0%,rgba(27,61,47,0.75) 50%,rgba(197,150,58,0.2) 100%);"></div>
          <svg style="position:absolute;inset:0;width:100%;height:100%;opacity:0.05;" xmlns="http://www.w3.org/2000/svg">
            <defs><pattern id="dotgrid" x="0" y="0" width="32" height="32" patternUnits="userSpaceOnUse"><circle cx="2" cy="2" r="1.8" fill="#fff"/></pattern></defs>
            <rect width="100%" height="100%" fill="url(#dotgrid)"/>
          </svg>
        </div>
      </div>
      <div class="hero-overlay"></div>
      <div class="hero-content">
        <h1 class="hero-title reveal">${t('markets.heroTitle')}</h1>
        <p class="hero-subtitle reveal">${t('markets.heroSubtitle')}</p>
      </div>
    </section>

    <!-- Export Stats Bar -->
    <section style="background:var(--forest-deep); padding:36px 0; border-bottom:3px solid rgba(197,150,58,0.4);">
      <div class="container">
        <div style="display:grid; grid-template-columns:repeat(4,1fr); gap:0; text-align:center;">
          ${stats.map((s, i) => `
            <div style="padding:20px 16px; ${i < stats.length - 1 ? 'border-right:1px solid rgba(255,255,255,0.1);' : ''}">
              <div style="font-family:var(--font-heading); font-size:clamp(1.8rem,3.5vw,2.8rem); font-weight:800; color:var(--gold); line-height:1; margin-bottom:8px;">${s.value}</div>
              <div style="font-size:var(--text-sm); color:rgba(255,255,255,0.65); letter-spacing:0.5px;">${s.label}</div>
            </div>
          `).join('')}
        </div>
      </div>
    </section>

    <!-- Map Section -->
    <section class="markets-map-section section" style="background:linear-gradient(180deg, var(--cream) 0%, #fff 100%);">
      <div class="container">
        <div class="section-header">
          <span class="section-label reveal">Our Location</span>
          <h2 class="section-title reveal">Find Us on the Map</h2>
          <hr class="divider divider-center reveal">
          <p style="max-width:620px; margin:0 auto; color:var(--charcoal-muted); text-align:center; font-size:var(--text-md); line-height:1.8;">
            Based in <strong>Punjab, India</strong> — the heartland of Basmati Rice cultivation — we ship export-quality products to 25+ countries worldwide.
          </p>
        </div>

        <!-- Premium Map Card -->
        <div class="world-map-container reveal" style="margin-top:var(--space-2xl);">
          <div style="border-radius:24px; overflow:hidden; box-shadow:0 24px 80px rgba(0,0,0,0.14); border:3px solid rgba(197,150,58,0.35); position:relative;">
            <!-- Header bar overlay -->
            <div style="position:absolute; top:0; left:0; right:0; z-index:10; background:linear-gradient(to bottom,rgba(15,42,30,0.88) 0%,transparent 100%); padding:18px 24px; pointer-events:none; display:flex; align-items:center; justify-content:space-between;">
              <div style="display:flex; align-items:center; gap:10px;">
                <span style="width:10px;height:10px;border-radius:50%;background:var(--gold);display:inline-block;animation:pulse 2s ease-in-out infinite;box-shadow:0 0 0 4px rgba(197,150,58,0.25);"></span>
                <span style="color:#fff; font-weight:700; font-size:14px; letter-spacing:0.6px;">INDIBUZ — Punjab, India</span>
                <span style="color:rgba(255,255,255,0.55); font-size:12px;">· Export Hub</span>
              </div>
              <div style="background:rgba(197,150,58,0.2); border:1px solid rgba(197,150,58,0.4); border-radius:20px; padding:4px 12px; font-size:11px; color:var(--gold); font-weight:600;">🟢 LIVE</div>
            </div>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d874777.6!2d74.8!3d30.9!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x391a87e3c8ef2d75%3A0xaabb3810d42ab5f4!2sPunjab%2C%20India!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
              width="100%"
              height="500"
              style="border:0; display:block; filter:saturate(1.15) contrast(1.05);"
              allowfullscreen=""
              loading="lazy"
              referrerpolicy="no-referrer-when-downgrade"
              title="INDIBUZ Location — Punjab, India"
            ></iframe>
          </div>

          <!-- Info strips below map -->
          <div style="display:grid; grid-template-columns:repeat(3,1fr); gap:16px; margin-top:20px;">
            <div style="background:#fff; border-radius:14px; padding:18px 20px; border:1px solid rgba(0,0,0,0.07); display:flex; align-items:center; gap:14px; box-shadow:0 4px 20px rgba(0,0,0,0.05); transition:transform 0.2s;" onmouseenter="this.style.transform='translateY(-3px)'" onmouseleave="this.style.transform='translateY(0)'">
              <div style="width:44px;height:44px;border-radius:10px;background:rgba(15,42,30,0.08);display:flex;align-items:center;justify-content:center;font-size:22px;flex-shrink:0;">📍</div>
              <div>
                <div style="font-size:11px; color:var(--charcoal-muted); margin-bottom:3px; text-transform:uppercase; letter-spacing:0.5px;">Location</div>
                <div style="font-weight:700; font-size:14px; color:var(--forest-deep);">Punjab, India</div>
              </div>
            </div>
            <div style="background:#fff; border-radius:14px; padding:18px 20px; border:1px solid rgba(0,0,0,0.07); display:flex; align-items:center; gap:14px; box-shadow:0 4px 20px rgba(0,0,0,0.05); transition:transform 0.2s;" onmouseenter="this.style.transform='translateY(-3px)'" onmouseleave="this.style.transform='translateY(0)'">
              <div style="width:44px;height:44px;border-radius:10px;background:rgba(37,211,102,0.1);display:flex;align-items:center;justify-content:center;font-size:22px;flex-shrink:0;">📞</div>
              <div>
                <div style="font-size:11px; color:var(--charcoal-muted); margin-bottom:3px; text-transform:uppercase; letter-spacing:0.5px;">WhatsApp / Call</div>
                <div style="font-weight:700; font-size:14px; color:var(--forest-deep);">+91 6284302338</div>
              </div>
            </div>
            <div style="background:#fff; border-radius:14px; padding:18px 20px; border:1px solid rgba(0,0,0,0.07); display:flex; align-items:center; gap:14px; box-shadow:0 4px 20px rgba(0,0,0,0.05); transition:transform 0.2s;" onmouseenter="this.style.transform='translateY(-3px)'" onmouseleave="this.style.transform='translateY(0)'">
              <div style="width:44px;height:44px;border-radius:10px;background:rgba(197,150,58,0.12);display:flex;align-items:center;justify-content:center;font-size:22px;flex-shrink:0;">✈️</div>
              <div>
                <div style="font-size:11px; color:var(--charcoal-muted); margin-bottom:3px; text-transform:uppercase; letter-spacing:0.5px;">Export Reach</div>
                <div style="font-weight:700; font-size:14px; color:var(--forest-deep);">25+ Countries</div>
              </div>
            </div>
          </div>
        </div>

        <!-- Markets Grid -->
        <div class="section-header" style="margin-top:var(--space-4xl)">
          <span class="section-label reveal">Where We Export</span>
          <h2 class="section-title reveal">${t('markets.regionsTitle')}</h2>
          <hr class="divider divider-center reveal">
        </div>

        <div class="markets-list">
          ${regions.map((region, i) => `
            <article class="market-card reveal" style="
              transition-delay:${i * 0.1}s;
              border-left:4px solid ${region.color};
              background:linear-gradient(135deg, ${region.accent} 0%, #fff 70%);
              border-radius:16px;
            ">
              <div style="display:flex; align-items:center; gap:14px; margin-bottom:var(--space-md);">
                <span style="font-size:42px; line-height:1; filter:drop-shadow(0 2px 4px rgba(0,0,0,0.15));">${region.flag}</span>
                <div>
                  <h3 class="market-region" style="margin:0 0 2px; color:${region.color};">${region.name}</h3>
                  <p style="margin:0; color:var(--charcoal-muted); font-size:var(--text-xs); line-height:1.5;">${region.countries}</p>
                </div>
              </div>
              <div style="background:rgba(0,0,0,0.04); border-radius:8px; padding:10px 14px; margin-bottom:var(--space-md);">
                <span style="font-weight:700; font-size:var(--text-xs); color:${region.color};">📦 Key Products</span>
                <p style="margin:4px 0 0; font-size:var(--text-xs); color:var(--charcoal); line-height:1.6;">${region.demand}</p>
              </div>
              <p style="font-size:var(--text-sm); color:var(--charcoal-muted); line-height:1.7; margin-bottom:var(--space-lg);">${region.desc}</p>
              <a href="#/contact" class="btn btn-sm" style="border:2px solid ${region.color}; color:${region.color}; background:transparent; border-radius:8px; font-weight:600; transition:all 0.2s;"
                onmouseenter="this.style.background='${region.color}';this.style.color='#fff';"
                onmouseleave="this.style.background='transparent';this.style.color='${region.color}';"
              >${t('markets.inquiryCta')}</a>
            </article>
          `).join('')}
        </div>
      </div>
    </section>

    <!-- CTA -->
    <section class="cta-section section">
      <div class="container">
        <div class="cta-content">
          <h2 class="cta-title reveal">Don't See Your Market?</h2>
          <p class="cta-desc reveal">We're actively expanding our global footprint. If your country or region isn't listed, get in touch — we'd love to explore new market opportunities together.</p>
          <div class="cta-actions reveal">
            <a href="#/contact" class="btn btn-primary btn-lg">${t('home.contactUs')}</a>
            <a href="#/partner" class="btn btn-outline-light btn-lg">${t('home.becomePartner')}</a>
          </div>
        </div>
      </div>
    </section>
  `;
}

export function initMapTooltips() {
  // No longer needed — using real Google Maps embed
  // Kept for backward compatibility
}
