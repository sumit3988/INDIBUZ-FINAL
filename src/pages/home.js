/* ============================================
   INDIBUZ — Home Page
   ============================================ */
import { t } from '../i18n.js';
import { whatsappFallback, formSuccessHTML } from '../forms.js';

export function renderHome() {
  return `
    <!-- Hero Section -->
    <section class="hero" id="home-hero">
      <div class="hero-bg">
        <div class="img-placeholder" style="background-color:var(--forest-deep);" role="img" aria-label="Indian rice fields at golden hour">
          <div style="position:absolute;inset:0;background:linear-gradient(135deg, rgba(15,42,30,0.9) 0%, rgba(27,61,47,0.7) 40%, rgba(197,150,58,0.15) 100%);"></div>
          <!-- Decorative grain pattern -->
          <svg style="position:absolute;bottom:0;left:0;width:100%;opacity:0.05;" viewBox="0 0 1440 320" preserveAspectRatio="none">
            <path fill="var(--gold)" d="M0,224L48,208C96,192,192,160,288,165.3C384,171,480,213,576,218.7C672,224,768,192,864,165.3C960,139,1056,117,1152,128C1248,139,1344,181,1392,202.7L1440,224L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
          </svg>
        </div>
      </div>
      <div class="hero-overlay"></div>
      <div class="hero-content">
        <span class="hero-label reveal">${t('home.heroLabel')}</span>
        <h1 class="hero-title reveal" style="transition-delay:0.15s">From India's Finest Fields<br>to the <em>World's Tables</em></h1>
        <p class="hero-subtitle reveal" style="transition-delay:0.3s">${t('home.heroSubtitle')}</p>
        <div class="hero-actions reveal" style="transition-delay:0.45s">
          <a href="#/products" class="btn btn-primary btn-lg">${t('home.exploreProducts')}</a>
          <a href="#/partner" class="btn btn-outline-light btn-lg">${t('home.becomePartner')}</a>
        </div>
      </div>
    </section>

    <!-- Trust Bar -->
    <div class="trust-bar reveal" id="trust-bar">
      <div class="trust-badge">
        <span class="trust-badge-icon">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
        </span>
        <span>APEDA</span>
      </div>
      <div class="trust-badge">
        <span class="trust-badge-icon">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
        </span>
        <span>FSSAI</span>
      </div>
      <div class="trust-badge">
        <span class="trust-badge-icon">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M8 12l2 2 4-4"/></svg>
        </span>
        <span>IEC</span>
      </div>
      <div class="trust-badge">
        <span class="trust-badge-icon">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/></svg>
        </span>
        <span>MSME</span>
      </div>
      <div class="trust-badge">
        <span class="trust-badge-icon">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><path d="M14 2v6h6M16 13H8M16 17H8M10 9H8"/></svg>
        </span>
        <span>GST</span>
      </div>
    </div>

    <!-- Brand Statement -->
    <section class="brand-section section" id="brand-section">
      <div class="container">
        <div class="brand-grid">
          <div class="brand-text">
            <span class="section-label reveal">${t('home.brandLabel')}</span>
            <h2 class="brand-title reveal">${t('home.brandTitle')}</h2>
            <hr class="divider reveal">
            <p class="brand-desc reveal">${t('home.brandDesc')}</p>
            <p class="brand-desc reveal">${t('home.brandDesc2')}</p>
            <a href="#/about" class="btn btn-outline reveal" style="transition-delay:0.1s">${t('nav.about')} →</a>
          </div>
          <div class="brand-image-wrap reveal-right">
            <div class="brand-image-accent"></div>
            <div class="img-placeholder" role="img" aria-label="Premium Indian rice grains">
              <svg class="img-placeholder-icon" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1">
                <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2z"/>
                <path d="M12 6v6l4 2"/>
              </svg>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Featured Products -->
    <section class="featured-section section" id="featured-products">
      <div class="container">
        <div class="section-header">
          <span class="section-label reveal">${t('home.featuredLabel')}</span>
          <h2 class="section-title reveal">${t('home.featuredTitle')}</h2>
          <hr class="divider divider-center reveal">
        </div>
        <div class="featured-grid">
          <!-- Basmati Rice -->
          <div class="product-editorial reveal">
            <div class="product-editorial-image">
              <div class="img-placeholder" role="img" aria-label="Premium Basmati Rice grains">
                <svg class="img-placeholder-icon" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1"><ellipse cx="12" cy="12" rx="3" ry="8"/><ellipse cx="12" cy="12" rx="8" ry="3"/></svg>
              </div>
            </div>
            <div class="product-editorial-content">
              <span class="product-card-category">Basmati Rice</span>
              <h3 class="product-card-title" style="font-size:var(--text-2xl)">Premium Long-Grain Basmati Rice</h3>
              <p style="color:var(--charcoal-muted);line-height:1.7;margin-bottom:var(--space-lg)">Extra-long grains up to 8.35mm+, aromatic with natural fragrance, and non-sticky fluffy texture when cooked. Available in 1121, 1509, 1401, 1718, and Pusa varieties — Golden Sella, Steam, and Raw options.</p>
              <a href="#/products" class="btn btn-primary btn-sm">${t('home.exploreProducts')}</a>
            </div>
          </div>
          <!-- Non-Basmati Rice -->
          <div class="product-editorial reveal">
            <div class="product-editorial-image">
              <div class="img-placeholder img-placeholder-light" role="img" aria-label="Non-Basmati rice varieties">
                <svg class="img-placeholder-icon" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1"><circle cx="12" cy="12" r="10"/><path d="M8 12h8"/><path d="M12 8v8"/></svg>
              </div>
            </div>
            <div class="product-editorial-content">
              <span class="product-card-category">Non-Basmati Rice</span>
              <h3 class="product-card-title" style="font-size:var(--text-2xl)">High Quality Non-Basmati Varieties</h3>
              <p style="color:var(--charcoal-muted);line-height:1.7;margin-bottom:var(--space-lg)">From IR64 Parboiled to Sona Masoori, Parmal, and specialty Idli/Dosa rice — versatile varieties for every culinary need. Grain length 5.8–6.3mm, max 14% moisture.</p>
              <a href="#/products" class="btn btn-primary btn-sm">${t('home.exploreProducts')}</a>
            </div>
          </div>
          <!-- Chilli Products -->
          <div class="product-editorial reveal">
            <div class="product-editorial-image">
              <div class="img-placeholder" style="background-color:var(--burgundy);" role="img" aria-label="Whole dry red chillies">
                <svg class="img-placeholder-icon" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.3)" stroke-width="1"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>
              </div>
            </div>
            <div class="product-editorial-content">
              <span class="product-card-category">Chilli Products</span>
              <h3 class="product-card-title" style="font-size:var(--text-2xl)">Whole Dry Red Chilli & Chilli Powder</h3>
              <p style="color:var(--charcoal-muted);line-height:1.7;margin-bottom:var(--space-lg)">Premium sun-dried Teja, Byadgi, Guntur S4, and 341 varieties. Also available: Red Chilli Powder in ASTA 80+ to 120+ grades. Rich colour, strong aroma, maximum freshness.</p>
              <a href="#/products" class="btn btn-primary btn-sm">${t('home.exploreProducts')}</a>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Why INDIBUZ -->
    <section class="why-section section" id="why-indibuz">
      <div class="container">
        <div class="section-header">
          <span class="section-label reveal">${t('home.whyLabel')}</span>
          <h2 class="section-title reveal">${t('home.whyTitle')}</h2>
          <hr class="divider divider-center reveal">
        </div>
        <div class="why-grid stagger-children">
          <div class="diff-card">
            <div class="diff-icon">
              <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M24 44s16-8 16-20V10L24 4 8 10v14c0 12 16 20 16 20z"/>
                <path d="M16 24l6 6 10-10" stroke-width="3"/>
              </svg>
            </div>
            <h3 class="diff-title">${t('home.whyQuality')}</h3>
            <p class="diff-desc">${t('home.whyQualityDesc')}</p>
          </div>
          <div class="diff-card">
            <div class="diff-icon">
              <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="24" cy="24" r="20"/>
                <path d="M24 12v12l8 4" stroke-width="2.5"/>
              </svg>
            </div>
            <h3 class="diff-title">${t('home.whyDelivery')}</h3>
            <p class="diff-desc">${t('home.whyDeliveryDesc')}</p>
          </div>
          <div class="diff-card">
            <div class="diff-icon">
              <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="2">
                <rect x="6" y="8" width="36" height="28" rx="3"/>
                <path d="M6 16h36"/>
                <path d="M16 24h16M16 30h10"/>
              </svg>
            </div>
            <h3 class="diff-title">${t('home.whyCertified')}</h3>
            <p class="diff-desc">${t('home.whyCertifiedDesc')}</p>
          </div>
          <div class="diff-card">
            <div class="diff-icon">
              <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="24" cy="24" r="20"/>
                <path d="M4 24h40"/>
                <path d="M24 4a30 30 0 0 1 8 20 30 30 0 0 1-8 20 30 30 0 0 1-8-20A30 30 0 0 1 24 4z"/>
              </svg>
            </div>
            <h3 class="diff-title">${t('home.whyGlobal')}</h3>
            <p class="diff-desc">${t('home.whyGlobalDesc')}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Stats Bar -->
    <div class="stats-bar reveal" id="stats-bar">
      <div class="stat-item">
        <span class="stat-number" data-count="15" data-suffix="+">0</span>
        <span class="stat-label">${t('home.statsCountries')}</span>
      </div>
      <div class="stat-item">
        <span class="stat-number" data-count="10000" data-suffix="+">0</span>
        <span class="stat-label">${t('home.statsShipped')}</span>
      </div>
      <div class="stat-item">
        <span class="stat-number" data-count="5">0</span>
        <span class="stat-label">${t('home.statsCerts')}</span>
      </div>
      <div class="stat-item">
        <span class="stat-number" data-count="100" data-suffix="%">0</span>
        <span class="stat-label">${t('home.statsQuality')}</span>
      </div>
    </div>

    <!-- CTA Section -->
    <section class="cta-section section" id="home-cta">
      <div class="container">
        <div class="cta-content">
          <h2 class="cta-title reveal">${t('home.ctaTitle')}</h2>
          <p class="cta-desc reveal">${t('home.ctaDesc')}</p>
          <div class="cta-actions reveal">
            <a href="#/contact" class="btn btn-primary btn-lg">${t('home.requestQuote')}</a>
            <a href="#/partner" class="btn btn-outline-light btn-lg">${t('home.becomePartner')}</a>
          </div>
        </div>
      </div>
    </section>
  `;
}
