/* ============================================
   INDIBUZ — Become a Partner Page
   ============================================ */
import { t } from '../i18n.js';
import { whatsappFallback, formSuccessHTML } from '../forms.js';

export function renderPartner() {
  return `
    <!-- Page Hero -->
    <section class="page-hero">
      <div class="hero-bg">
        <div class="img-placeholder" style="background-color:var(--forest-deep);" role="img" aria-label="Business partnership">
          <div style="position:absolute;inset:0;background:linear-gradient(135deg, rgba(15,42,30,0.9) 0%, rgba(27,61,47,0.7) 50%, rgba(197,150,58,0.15) 100%);"></div>
        </div>
      </div>
      <div class="hero-overlay"></div>
      <div class="hero-content">
        <h1 class="hero-title reveal">${t('partner.heroTitle')}</h1>
        <p class="hero-subtitle reveal">${t('partner.heroSubtitle')}</p>
      </div>
    </section>

    <!-- Benefits Section -->
    <section class="section">
      <div class="container">
        <div class="section-header">
          <span class="section-label reveal">${t('partner.benefitsLabel')}</span>
          <h2 class="section-title reveal">${t('partner.benefitsTitle')}</h2>
          <hr class="divider divider-center reveal">
        </div>
        <div class="partner-benefits stagger-children">
          <div class="partner-benefit">
            <div class="partner-benefit-icon">
              <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="24" cy="18" r="8"/>
                <path d="M14 42v-4c0-5.5 4.5-10 10-10s10 4.5 10 10v4"/>
                <path d="M34 18l4-4M34 18l4 4" stroke-width="2.5"/>
              </svg>
            </div>
            <h3 class="partner-benefit-title">${t('partner.benefit1')}</h3>
            <p class="partner-benefit-desc">${t('partner.benefit1Desc')}</p>
          </div>
          <div class="partner-benefit">
            <div class="partner-benefit-icon">
              <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M4 36h40"/>
                <rect x="8" y="24" width="8" height="12"/>
                <rect x="20" y="16" width="8" height="20"/>
                <rect x="32" y="20" width="8" height="16"/>
                <path d="M8 24l16-16 16 12" stroke-width="2.5"/>
              </svg>
            </div>
            <h3 class="partner-benefit-title">${t('partner.benefit2')}</h3>
            <p class="partner-benefit-desc">${t('partner.benefit2Desc')}</p>
          </div>
          <div class="partner-benefit">
            <div class="partner-benefit-icon">
              <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="24" cy="24" r="20"/>
                <path d="M24 14v10l6 6"/>
                <path d="M16 8l2 4M32 8l-2 4"/>
              </svg>
            </div>
            <h3 class="partner-benefit-title">${t('partner.benefit3')}</h3>
            <p class="partner-benefit-desc">${t('partner.benefit3Desc')}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Value Proposition -->
    <section class="section bg-cream">
      <div class="container">
        <div class="featured-grid">
          <div class="product-editorial reveal" style="grid-column:1/-1;">
            <div class="product-editorial-image">
              <div class="img-placeholder" role="img" aria-label="Global distribution network">
                <svg class="img-placeholder-icon" width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1">
                  <circle cx="12" cy="12" r="10"/>
                  <path d="M2 12h20"/>
                  <path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10A15.3 15.3 0 0112 2z"/>
                </svg>
              </div>
            </div>
            <div class="product-editorial-content">
              <span class="product-card-category">Partnership</span>
              <h3 style="font-family:var(--font-heading);font-size:var(--text-2xl);color:var(--forest-deep);margin-bottom:var(--space-lg)">Why Distributors & Importers Choose INDIBUZ</h3>
              <div style="display:grid;gap:var(--space-md);">
                <p style="color:var(--charcoal-muted);line-height:1.7;margin:0;">
                  <strong style="color:var(--forest);">Direct Factory Pricing</strong> — We source directly from farms and mills, eliminating middlemen to offer the most competitive FOB and CIF pricing.
                </p>
                <p style="color:var(--charcoal-muted);line-height:1.7;margin:0;">
                  <strong style="color:var(--forest);">Custom Packaging & Labeling</strong> — Private label and custom packaging options available for OEM buyers. Bag sizes from 1kg retail to 50kg bulk.
                </p>
                <p style="color:var(--charcoal-muted);line-height:1.7;margin:0;">
                  <strong style="color:var(--forest);">Complete Documentation</strong> — We handle all export documentation: Commercial Invoice, Packing List, Certificate of Origin, Phytosanitary, Fumigation.
                </p>
                <p style="color:var(--charcoal-muted);line-height:1.7;margin:0;">
                  <strong style="color:var(--forest);">Flexible Payment Terms</strong> — TT or LC, negotiable based on order volume and relationship maturity.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Partner Inquiry Form -->
    <section class="section">
      <div class="container">
        <div class="partner-form-section">
          <div class="section-header">
            <h2 class="section-title reveal">${t('partner.formTitle')}</h2>
            <p class="section-subtitle reveal">Fill out the form below and our team will get back to you within 24 hours with a detailed proposal.</p>
            <hr class="divider divider-center reveal">
          </div>

          <div class="contact-form-wrap reveal" id="partner-form-wrap">
            <div class="form-fields">
              <form id="partner-form" novalidate>
                <div style="display:grid;grid-template-columns:1fr 1fr;gap:var(--space-md);">
                  <div class="form-group">
                    <label class="form-label" for="partner-name">${t('partner.formName')} *</label>
                    <input class="form-input" type="text" id="partner-name" name="name" required autocomplete="name">
                    <span class="form-error"></span>
                  </div>
                  <div class="form-group">
                    <label class="form-label" for="partner-company">${t('partner.formCompany')} *</label>
                    <input class="form-input" type="text" id="partner-company" name="company" required autocomplete="organization">
                    <span class="form-error"></span>
                  </div>
                </div>
                <div style="display:grid;grid-template-columns:1fr 1fr;gap:var(--space-md);">
                  <div class="form-group">
                    <label class="form-label" for="partner-country">${t('partner.formCountry')} *</label>
                    <input class="form-input" type="text" id="partner-country" name="country" required autocomplete="country-name">
                    <span class="form-error"></span>
                  </div>
                  <div class="form-group">
                    <label class="form-label" for="partner-email">${t('partner.formEmail')} *</label>
                    <input class="form-input" type="email" id="partner-email" name="email" required autocomplete="email">
                    <span class="form-error"></span>
                  </div>
                </div>
                <div style="display:grid;grid-template-columns:1fr 1fr;gap:var(--space-md);">
                  <div class="form-group">
                    <label class="form-label" for="partner-phone">${t('partner.formPhone')}</label>
                    <input class="form-input" type="tel" id="partner-phone" name="phone" autocomplete="tel">
                    <span class="form-error"></span>
                  </div>
                  <div class="form-group">
                    <label class="form-label" for="partner-product">${t('partner.formProduct')} *</label>
                    <select class="form-select" id="partner-product" name="product" required>
                      <option value="">Select product...</option>
                      <option value="basmati">Basmati Rice</option>
                      <option value="non-basmati">Non-Basmati Rice</option>
                      <option value="chilli">Whole Dry Red Chilli</option>
                      <option value="powder">Red Chilli Powder</option>
                      <option value="multiple">Multiple Products</option>
                    </select>
                    <span class="form-error"></span>
                  </div>
                </div>
                <div class="form-group">
                  <label class="form-label" for="partner-volume">${t('partner.formVolume')}</label>
                  <input class="form-input" type="text" id="partner-volume" name="volume" placeholder="e.g., 25 MT / month">
                  <span class="form-error"></span>
                </div>
                <div class="form-group">
                  <label class="form-label" for="partner-message">${t('partner.formMessage')}</label>
                  <textarea class="form-textarea" id="partner-message" name="message" rows="4" placeholder="Tell us about your requirements, target price, preferred payment terms..."></textarea>
                  <span class="form-error"></span>
                </div>
                <button type="submit" class="btn btn-primary btn-lg" style="width:100%">${t('partner.formSubmit')}</button>
              </form>
              ${whatsappFallback()}
            </div>
            ${formSuccessHTML()}
          </div>
        </div>
      </div>
    </section>
  `;
}
