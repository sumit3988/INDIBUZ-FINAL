/* ============================================
   INDIBUZ — About Page
   ============================================ */
import { t } from '../i18n.js';

export function renderAbout() {
  return `
    <!-- Page Hero -->
    <section class="page-hero">
      <div class="hero-bg">
        <img src="https://images.unsplash.com/photo-1591543621430-c44bb0c6495d?auto=format&fit=crop&q=80&w=1600" alt="Indian agricultural landscape" style="width:100%; height:100%; object-fit:cover;" />
      </div>
      <div class="hero-overlay"></div>
      <div class="hero-content">
        <h1 class="hero-title reveal">${t('about.heroTitle')}</h1>
        <p class="hero-subtitle reveal">${t('about.heroSubtitle')}</p>
      </div>
    </section>

    <!-- Brand Story -->
    <section class="about-story section">
      <div class="container">
        <div class="about-story-grid">
          <div class="story-text">
            <span class="section-label reveal">${t('about.storyLabel')}</span>
            <h2 class="reveal">${t('about.storyTitle')}</h2>
            <hr class="divider reveal">
            <p class="reveal">${t('about.storyP1')}</p>
            <p class="reveal">${t('about.storyP2')}</p>
            <p class="reveal">${t('about.storyP3')}</p>
          </div>
          <div class="about-image-wrap reveal-right">
            <img src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=800" alt="INDIBUZ team and facilities" style="width:100%; height:100%; object-fit:cover; border-radius:12px;" />
          </div>
        </div>
      </div>
    </section>

    <!-- Timeline -->
    <section class="section bg-cream">
      <div class="container">
        <div class="section-header">
          <span class="section-label reveal">${t('about.storyLabel')}</span>
          <h2 class="section-title reveal">${t('about.timelineTitle')}</h2>
          <hr class="divider divider-center reveal">
        </div>
        <div class="container-narrow">
          <div class="timeline">
            <div class="timeline-item reveal">
              <div class="timeline-dot"></div>
              <span class="timeline-year">Foundation</span>
              <h3 class="timeline-title">Company Established</h3>
              <p class="timeline-desc">INDIBUZ was founded in Bokaro, Jharkhand with a mission to bring premium Indian agricultural products to global markets. Starting with domestic rice trading, the foundation was built on quality and trust.</p>
            </div>
            <div class="timeline-item reveal">
              <div class="timeline-dot"></div>
              <span class="timeline-year">Growth</span>
              <h3 class="timeline-title">Export Operations Begin</h3>
              <p class="timeline-desc">Obtained IEC and APEDA registration, opening doors to international markets. First container shipped from Mundra port to the Middle East.</p>
            </div>
            <div class="timeline-item reveal">
              <div class="timeline-dot"></div>
              <span class="timeline-year">Expansion</span>
              <h3 class="timeline-title">Product Line Expands</h3>
              <p class="timeline-desc">Extended our product range to include Non-Basmati Rice, Whole Dry Red Chilli, and Chilli Powder. Secured FSSAI central license and MSME registration.</p>
            </div>
            <div class="timeline-item reveal">
              <div class="timeline-dot"></div>
              <span class="timeline-year">Today</span>
              <h3 class="timeline-title">Global Presence</h3>
              <p class="timeline-desc">Exporting to 15+ countries across the USA, Middle East, Africa, Southeast Asia, and Europe. Over 10,000 MT shipped annually with 5 international certifications.</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Sourcing Philosophy -->
    <section class="about-philosophy section">
      <div class="container">
        <div class="section-header">
          <span class="section-label reveal">${t('about.philLabel')}</span>
          <h2 class="section-title reveal">${t('about.philTitle')}</h2>
          <hr class="divider divider-center reveal">
        </div>
        <div class="philosophy-grid stagger-children">
          <div class="philosophy-card">
            <div class="philosophy-icon">
              <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M24 4v16M16 12l8-8 8 8"/>
                <path d="M8 24c0 8.8 7.2 16 16 16s16-7.2 16-16"/>
                <path d="M14 28h20"/>
              </svg>
            </div>
            <h3 class="philosophy-title">${t('about.philSource')}</h3>
            <p class="philosophy-desc">${t('about.philSourceDesc')}</p>
          </div>
          <div class="philosophy-card">
            <div class="philosophy-icon">
              <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="2">
                <rect x="4" y="8" width="40" height="32" rx="4"/>
                <path d="M16 8V4M32 8V4"/>
                <circle cx="24" cy="26" r="6"/>
                <path d="M24 22v4l2 2"/>
              </svg>
            </div>
            <h3 class="philosophy-title">${t('about.philProcess')}</h3>
            <p class="philosophy-desc">${t('about.philProcessDesc')}</p>
          </div>
          <div class="philosophy-card">
            <div class="philosophy-icon">
              <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M16 28l-8 8M32 28l8 8"/>
                <path d="M12 20a12 12 0 0124 0"/>
                <circle cx="24" cy="14" r="6"/>
                <path d="M20 26h8v6a4 4 0 01-8 0v-6z"/>
              </svg>
            </div>
            <h3 class="philosophy-title">${t('about.philPartnership')}</h3>
            <p class="philosophy-desc">${t('about.philPartnershipDesc')}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Gallery -->
    <section class="section">
        <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(300px, 1fr)); gap:30px; padding:20px 0;" class="stagger-children">
          <!-- Step 1 -->
          <div style="background:#fff; border-radius:12px; overflow:hidden; box-shadow:0 10px 30px rgba(0,0,0,0.05); transition:transform 0.3s; cursor:pointer;" onmouseover="this.style.transform='translateY(-10px)'" onmouseout="this.style.transform='none'">
            <div style="height:250px; overflow:hidden;">
              <img src="https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=600&q=80" alt="Ethical Sourcing" style="width:100%; height:100%; object-fit:cover; transition:transform 0.5s;" onmouseover="this.style.transform='scale(1.1)'" onmouseout="this.style.transform='none'" />
            </div>
            <div style="padding:30px;">
              <div style="color:var(--gold); font-weight:bold; font-size:14px; margin-bottom:10px; letter-spacing:1px; text-transform:uppercase;">Step 01</div>
              <h3 style="font-family:var(--font-heading); font-size:22px; color:var(--forest-deep); margin-bottom:15px;">Ethical Sourcing</h3>
              <p style="color:var(--charcoal-muted); font-size:15px; line-height:1.6;">We partner directly with farmers across India's most fertile regions to procure premium quality basmati and non-basmati rice right from the harvest.</p>
            </div>
          </div>
          
          <!-- Step 2 -->
          <div style="background:#fff; border-radius:12px; overflow:hidden; box-shadow:0 10px 30px rgba(0,0,0,0.05); transition:transform 0.3s; cursor:pointer;" onmouseover="this.style.transform='translateY(-10px)'" onmouseout="this.style.transform='none'">
            <div style="height:250px; overflow:hidden;">
              <img src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=600&q=80" alt="Modern Processing" style="width:100%; height:100%; object-fit:cover; transition:transform 0.5s;" onmouseover="this.style.transform='scale(1.1)'" onmouseout="this.style.transform='none'" />
            </div>
            <div style="padding:30px;">
              <div style="color:var(--gold); font-weight:bold; font-size:14px; margin-bottom:10px; letter-spacing:1px; text-transform:uppercase;">Step 02</div>
              <h3 style="font-family:var(--font-heading); font-size:22px; color:var(--forest-deep); margin-bottom:15px;">Modern Processing</h3>
              <p style="color:var(--charcoal-muted); font-size:15px; line-height:1.6;">Our state-of-the-art milling facilities ensure that every grain is sorted, cleaned, and aged to perfection while maintaining the highest hygiene standards.</p>
            </div>
          </div>

          <!-- Step 3 -->
          <div style="background:#fff; border-radius:12px; overflow:hidden; box-shadow:0 10px 30px rgba(0,0,0,0.05); transition:transform 0.3s; cursor:pointer;" onmouseover="this.style.transform='translateY(-10px)'" onmouseout="this.style.transform='none'">
            <div style="height:250px; overflow:hidden;">
              <img src="https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?auto=format&fit=crop&w=600&q=80" alt="Global Logistics" style="width:100%; height:100%; object-fit:cover; transition:transform 0.5s;" onmouseover="this.style.transform='scale(1.1)'" onmouseout="this.style.transform='none'" />
            </div>
            <div style="padding:30px;">
              <div style="color:var(--gold); font-weight:bold; font-size:14px; margin-bottom:10px; letter-spacing:1px; text-transform:uppercase;">Step 03</div>
              <h3 style="font-family:var(--font-heading); font-size:22px; color:var(--forest-deep); margin-bottom:15px;">Global Logistics</h3>
              <p style="color:var(--charcoal-muted); font-size:15px; line-height:1.6;">From meticulous export packaging to seamless port handling, we ensure your bulk orders are delivered safely and efficiently anywhere in the world.</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA -->
    <section class="cta-section section">
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
