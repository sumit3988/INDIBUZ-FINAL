/* ============================================
   INDIBUZ — Quality Control Page
   ============================================ */
import { t } from '../i18n.js';

export function renderQuality() {
  return `
    <!-- Page Hero -->
    <section class="page-hero">
      <div class="hero-bg">
        <div class="img-placeholder" style="background-color:var(--forest-deep);" role="img" aria-label="Quality control process">
          <div style="position:absolute;inset:0;background:linear-gradient(135deg, rgba(15,42,30,0.9) 0%, rgba(27,61,47,0.75) 100%);"></div>
        </div>
      </div>
      <div class="hero-overlay"></div>
      <div class="hero-content">
        <h1 class="hero-title reveal">${t('quality.heroTitle')}</h1>
        <p class="hero-subtitle reveal">${t('quality.heroSubtitle')}</p>
      </div>
    </section>

    <!-- Introduction -->
    <section class="quality-intro section">
      <div class="container">
        <div class="quality-intro-text">
          <h2 class="section-title reveal">${t('quality.introTitle')}</h2>
          <hr class="divider divider-center reveal">
          <p class="section-subtitle reveal" style="max-width:700px">${t('quality.introDesc')}</p>
        </div>
      </div>
    </section>

    <!-- 6-Step Process -->
    <section class="quality-process section bg-cream">
      <div class="container">
        <div class="section-header">
          <span class="section-label reveal">Our Process</span>
          <h2 class="section-title reveal">${t('quality.processTitle')}</h2>
          <hr class="divider divider-center reveal">
        </div>
        <div class="process-flow stagger-children">
          <!-- Step 1: Sourcing -->
          <div class="process-step">
            <div class="process-step-icon">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                <path d="M12 22c-4.97 0-9-2.69-9-6v-4c0-3.31 4.03-6 9-6s9 2.69 9 6v4c0 3.31-4.03 6-9 6z"/>
                <path d="M12 6v6"/>
                <path d="M9 9l3-3 3 3"/>
              </svg>
            </div>
            <h3 class="process-step-title">${t('quality.step1')}</h3>
            <p class="process-step-desc">${t('quality.step1Desc')}</p>
          </div>
          <!-- Step 2: Cleaning -->
          <div class="process-step">
            <div class="process-step-icon">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                <path d="M12 2l2 7h7l-5.5 4 2 7L12 16l-5.5 4 2-7L3 9h7z"/>
              </svg>
            </div>
            <h3 class="process-step-title">${t('quality.step2')}</h3>
            <p class="process-step-desc">${t('quality.step2Desc')}</p>
          </div>
          <!-- Step 3: Grading -->
          <div class="process-step">
            <div class="process-step-icon">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                <path d="M3 3h18v18H3z"/>
                <path d="M3 9h18M3 15h18M9 3v18M15 3v18"/>
              </svg>
            </div>
            <h3 class="process-step-title">${t('quality.step3')}</h3>
            <p class="process-step-desc">${t('quality.step3Desc')}</p>
          </div>
          <!-- Step 4: Packaging -->
          <div class="process-step">
            <div class="process-step-icon">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                <path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z"/>
                <path d="M3.27 6.96L12 12.01l8.73-5.05M12 22.08V12"/>
              </svg>
            </div>
            <h3 class="process-step-title">${t('quality.step4')}</h3>
            <p class="process-step-desc">${t('quality.step4Desc')}</p>
          </div>
          <!-- Step 5: Testing -->
          <div class="process-step">
            <div class="process-step-icon">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                <path d="M9 3v7.5L5 18a2 2 0 002 2h10a2 2 0 002-2l-4-7.5V3"/>
                <path d="M7 3h10"/>
                <circle cx="14" cy="16" r="1"/>
                <circle cx="10" cy="14" r="1"/>
              </svg>
            </div>
            <h3 class="process-step-title">${t('quality.step5')}</h3>
            <p class="process-step-desc">${t('quality.step5Desc')}</p>
          </div>
          <!-- Step 6: Export -->
          <div class="process-step">
            <div class="process-step-icon">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                <circle cx="12" cy="12" r="10"/>
                <path d="M2 12h20"/>
                <path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10A15.3 15.3 0 0112 2z"/>
              </svg>
            </div>
            <h3 class="process-step-title">${t('quality.step6')}</h3>
            <p class="process-step-desc">${t('quality.step6Desc')}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Quality Highlights -->
    <section class="section">
      <div class="container">
        <div class="section-header">
          <h2 class="section-title reveal">Quality at Every Level</h2>
          <hr class="divider divider-center reveal">
        </div>
        <div class="featured-grid">
          <div class="product-editorial reveal">
            <div class="product-editorial-image">
              <div class="img-placeholder img-placeholder-light" role="img" aria-label="Modern sorting and grading technology">
                <svg class="img-placeholder-icon" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1"><rect x="2" y="3" width="20" height="18" rx="2"/><path d="M8 12h8"/><path d="M12 8v8"/></svg>
              </div>
            </div>
            <div class="product-editorial-content">
              <span class="product-card-category">Technology</span>
              <h3 style="font-family:var(--font-heading);font-size:var(--text-2xl);color:var(--forest-deep);margin-bottom:var(--space-md)">Sortex-Clean Processing</h3>
              <p style="color:var(--charcoal-muted);line-height:1.7;">All our rice undergoes advanced optical sorting (Sortex) to remove discolored grains, foreign matter, and impurities. This ensures every bag that leaves our facility meets export-grade purity standards — 95 to 100% pure with nil foreign matter.</p>
            </div>
          </div>
          <div class="product-editorial reveal">
            <div class="product-editorial-image">
              <div class="img-placeholder" role="img" aria-label="Laboratory testing equipment">
                <svg class="img-placeholder-icon" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1"><path d="M9 3v7.5L5 18a2 2 0 002 2h10a2 2 0 002-2l-4-7.5V3"/><path d="M7 3h10"/></svg>
              </div>
            </div>
            <div class="product-editorial-content">
              <span class="product-card-category">Certification</span>
              <h3 style="font-family:var(--font-heading);font-size:var(--text-2xl);color:var(--forest-deep);margin-bottom:var(--space-md)">Third-Party Inspection</h3>
              <p style="color:var(--charcoal-muted);line-height:1.7;">SGS or equivalent third-party inspection is available on request. Every shipment can be accompanied by complete documentation: Commercial Invoice, Packing List, Certificate of Origin, Phytosanitary Certificate, and Fumigation Certificate.</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA -->
    <section class="cta-section section">
      <div class="container">
        <div class="cta-content">
          <h2 class="cta-title reveal">Quality You Can Trust</h2>
          <p class="cta-desc reveal">Our certifications and rigorous processes ensure every shipment meets the highest international standards.</p>
          <div class="cta-actions reveal">
            <a href="#/certifications" class="btn btn-primary btn-lg">View Certifications</a>
            <a href="#/contact" class="btn btn-outline-light btn-lg">${t('home.requestQuote')}</a>
          </div>
        </div>
      </div>
    </section>
  `;
}
