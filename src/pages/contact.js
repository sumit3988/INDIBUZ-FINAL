/* ============================================
   INDIBUZ — Contact Page
   ============================================ */
import { t } from '../i18n.js';
import { whatsappFallback, formSuccessHTML } from '../forms.js';

export function renderContact() {
  return `
    <!-- Page Hero -->
    <section class="page-hero">
      <div class="hero-bg">
        <div class="img-placeholder" style="background-color:var(--forest-deep);" role="img" aria-label="Contact INDIBUZ">
          <div style="position:absolute;inset:0;background:linear-gradient(135deg, rgba(15,42,30,0.9) 0%, rgba(27,61,47,0.75) 100%);"></div>
        </div>
      </div>
      <div class="hero-overlay"></div>
      <div class="hero-content">
        <h1 class="hero-title reveal">${t('contact.heroTitle')}</h1>
        <p class="hero-subtitle reveal">${t('contact.heroSubtitle')}</p>
      </div>
    </section>

    <!-- Contact Content -->
    <section class="section">
      <div class="container">
        <div class="contact-grid">
          <!-- Contact Info Card -->
          <div class="contact-info-card reveal-left">
            <div class="contact-info-content">
              <h2 class="contact-info-title">${t('contact.infoTitle')}</h2>
              <p class="contact-info-desc">${t('contact.infoDesc')}</p>

              <!-- Phone -->
              <div class="contact-detail">
                <div class="contact-detail-icon">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/></svg>
                </div>
                <div class="contact-detail-text">
                  <span class="contact-detail-label">${t('contact.phone')}</span>
                  <div class="contact-detail-value">
                    <a href="tel:+916284302338">+91 6284302338</a>
                  </div>
                </div>
              </div>

              <!-- Email -->
              <div class="contact-detail">
                <div class="contact-detail-icon">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="M22 7l-10 7L2 7"/></svg>
                </div>
                <div class="contact-detail-text">
                  <span class="contact-detail-label">${t('contact.email')}</span>
                  <div class="contact-detail-value">
                    <a href="mailto:info@indibuz.in">info@indibuz.in</a><br>
                    <a href="mailto:indibuztrader@gmail.com">indibuztrader@gmail.com</a>
                  </div>
                </div>
              </div>

              <!-- Address -->
              <div class="contact-detail">
                <div class="contact-detail-icon">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>
                </div>
                <div class="contact-detail-text">
                  <span class="contact-detail-label">${t('contact.address')}</span>
                  <div class="contact-detail-value">
                    Indibuz Trader<br>
                    Plot No. 3195, Khata No. 593,<br>
                    Nandua Sthan, Chas,<br>
                    Bokaro, Jharkhand, India — 827013
                  </div>
                </div>
              </div>

              <!-- Website -->
              <div class="contact-detail">
                <div class="contact-detail-icon">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M2 12h20"/><path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10A15.3 15.3 0 0112 2z"/></svg>
                </div>
                <div class="contact-detail-text">
                  <span class="contact-detail-label">${t('contact.website')}</span>
                  <div class="contact-detail-value">
                    <a href="https://www.indibuz.in" target="_blank" rel="noopener noreferrer">www.indibuz.in</a>
                  </div>
                </div>
              </div>

              <!-- WhatsApp CTA -->
              <a href="https://wa.me/916284302338?text=Hello%20INDIBUZ%2C%20I%27m%20interested%20in%20your%20products." target="_blank" rel="noopener noreferrer" class="btn btn-whatsapp" style="width:100%;margin-top:var(--space-xl);">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 0C5.373 0 0 5.373 0 12c0 2.127.555 4.122 1.522 5.857L.055 23.456l5.753-1.51A11.94 11.94 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.82c-1.98 0-3.828-.534-5.42-1.467l-.389-.231-4.03 1.057 1.076-3.93-.254-.403A9.783 9.783 0 012.18 12c0-5.423 4.397-9.82 9.82-9.82 5.423 0 9.82 4.397 9.82 9.82 0 5.423-4.397 9.82-9.82 9.82z"/></svg>
                Chat on WhatsApp
              </a>

              <!-- QR Code Section -->
              <div style="margin-top:var(--space-2xl);text-align:center;">
                <h4 style="font-size:var(--text-sm);color:var(--gold);font-weight:600;letter-spacing:0.08em;text-transform:uppercase;margin-bottom:var(--space-md);">${t('contact.qrTitle')}</h4>
                <div class="qr-container" style="background:rgba(255,255,255,0.1);border-color:rgba(255,255,255,0.1);">
                  <div class="qr-code" id="qr-code" style="background:var(--white);">
                    <!-- QR code generated via SVG -->
                    <svg viewBox="0 0 150 150" width="120" height="120">
                      <!-- Simplified QR representation -->
                      <rect width="150" height="150" fill="white"/>
                      <!-- Corner markers -->
                      <rect x="10" y="10" width="30" height="30" fill="var(--forest-deep)"/>
                      <rect x="15" y="15" width="20" height="20" fill="white"/>
                      <rect x="19" y="19" width="12" height="12" fill="var(--forest-deep)"/>

                      <rect x="110" y="10" width="30" height="30" fill="var(--forest-deep)"/>
                      <rect x="115" y="15" width="20" height="20" fill="white"/>
                      <rect x="119" y="19" width="12" height="12" fill="var(--forest-deep)"/>

                      <rect x="10" y="110" width="30" height="30" fill="var(--forest-deep)"/>
                      <rect x="15" y="115" width="20" height="20" fill="white"/>
                      <rect x="19" y="119" width="12" height="12" fill="var(--forest-deep)"/>

                      <!-- Data pattern -->
                      <rect x="50" y="10" width="6" height="6" fill="var(--forest-deep)"/>
                      <rect x="62" y="10" width="6" height="6" fill="var(--forest-deep)"/>
                      <rect x="74" y="10" width="6" height="6" fill="var(--forest-deep)"/>
                      <rect x="86" y="16" width="6" height="6" fill="var(--forest-deep)"/>
                      <rect x="50" y="22" width="6" height="6" fill="var(--forest-deep)"/>
                      <rect x="68" y="22" width="6" height="6" fill="var(--forest-deep)"/>
                      <rect x="80" y="22" width="6" height="6" fill="var(--forest-deep)"/>
                      <rect x="50" y="50" width="6" height="6" fill="var(--forest-deep)"/>
                      <rect x="62" y="50" width="6" height="6" fill="var(--forest-deep)"/>
                      <rect x="74" y="50" width="6" height="6" fill="var(--forest-deep)"/>
                      <rect x="86" y="50" width="6" height="6" fill="var(--forest-deep)"/>
                      <rect x="98" y="50" width="6" height="6" fill="var(--forest-deep)"/>
                      <rect x="50" y="62" width="6" height="6" fill="var(--forest-deep)"/>
                      <rect x="74" y="62" width="6" height="6" fill="var(--forest-deep)"/>
                      <rect x="86" y="62" width="6" height="6" fill="var(--forest-deep)"/>
                      <rect x="50" y="74" width="6" height="6" fill="var(--forest-deep)"/>
                      <rect x="62" y="74" width="6" height="6" fill="var(--forest-deep)"/>
                      <rect x="86" y="74" width="6" height="6" fill="var(--forest-deep)"/>
                      <rect x="98" y="74" width="6" height="6" fill="var(--forest-deep)"/>
                      <rect x="50" y="86" width="6" height="6" fill="var(--forest-deep)"/>
                      <rect x="62" y="86" width="6" height="6" fill="var(--forest-deep)"/>
                      <rect x="74" y="86" width="6" height="6" fill="var(--forest-deep)"/>

                      <!-- Center branding -->
                      <rect x="60" y="60" width="30" height="30" rx="4" fill="var(--gold)"/>
                      <text x="75" y="79" text-anchor="middle" fill="white" font-size="10" font-weight="bold" font-family="sans-serif">IB</text>
                    </svg>
                  </div>
                  <span class="qr-label" style="color:rgba(245,240,232,0.6)">Scan to visit indibuz.in</span>
                </div>
              </div>
            </div>
          </div>

          <!-- Contact Form -->
          <div class="contact-form-wrap reveal-right" id="contact-form-wrap">
            <h3 style="font-family:var(--font-heading);font-size:var(--text-2xl);color:var(--forest-deep);margin-bottom:var(--space-xl);">${t('contact.formTitle')}</h3>
            <div class="form-fields">
              <form id="contact-form" novalidate>
                <div class="form-group">
                  <label class="form-label" for="contact-name">${t('contact.formName')} *</label>
                  <input class="form-input" type="text" id="contact-name" name="name" required autocomplete="name">
                  <span class="form-error"></span>
                </div>
                <div style="display:grid;grid-template-columns:1fr 1fr;gap:var(--space-md);">
                  <div class="form-group">
                    <label class="form-label" for="contact-email">${t('contact.formEmail')} *</label>
                    <input class="form-input" type="email" id="contact-email" name="email" required autocomplete="email">
                    <span class="form-error"></span>
                  </div>
                  <div class="form-group">
                    <label class="form-label" for="contact-phone">${t('contact.formPhone')}</label>
                    <input class="form-input" type="tel" id="contact-phone" name="phone" autocomplete="tel">
                    <span class="form-error"></span>
                  </div>
                </div>
                <div class="form-group">
                  <label class="form-label" for="contact-subject">${t('contact.formSubject')} *</label>
                  <select class="form-select" id="contact-subject" name="subject" required>
                    <option value="">Select subject...</option>
                    <option value="quote">Request a Quote</option>
                    <option value="product">Product Inquiry</option>
                    <option value="partnership">Partnership Discussion</option>
                    <option value="sample">Sample Request</option>
                    <option value="other">General Inquiry</option>
                  </select>
                  <span class="form-error"></span>
                </div>
                <div class="form-group">
                  <label class="form-label" for="contact-message">${t('contact.formMessage')} *</label>
                  <textarea class="form-textarea" id="contact-message" name="message" rows="5" required placeholder="Please share your requirements: variety, specification, packaging, quantity, destination port..."></textarea>
                  <span class="form-error"></span>
                </div>
                <button type="submit" class="btn btn-primary btn-lg" style="width:100%">${t('contact.formSubmit')}</button>
              </form>
              ${whatsappFallback()}
            </div>
            ${formSuccessHTML()}
          </div>
        </div>
      </div>
    </section>

    <!-- Company Info Section -->
    <section class="section bg-cream">
      <div class="container">
        <div class="section-header">
          <h2 class="section-title reveal">Key Contact Person</h2>
          <hr class="divider divider-center reveal">
        </div>
        <div class="reveal" style="max-width:600px;margin:0 auto;text-align:center;">
          <h3 style="font-family:var(--font-heading);font-size:var(--text-xl);color:var(--forest-deep);margin-bottom:var(--space-xs);">Sadanand Kumar Mahato</h3>
          <p style="color:var(--gold);font-weight:500;font-size:var(--text-sm);margin-bottom:var(--space-md);">Sales Team — Indibuz Trader</p>
          <p style="color:var(--charcoal-muted);font-size:var(--text-sm);line-height:1.7;">
            For product inquiries, pricing, samples, or partnership discussions, reach out directly. We respond to all inquiries within 24 hours.
          </p>
        </div>
      </div>
    </section>
  `;
}
