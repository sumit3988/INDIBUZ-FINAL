/* ============================================
   INDIBUZ — Certifications Page
   ============================================ */
import { t } from '../i18n.js';

const certifications = [
  {
    abbr: 'APEDA',
    name: 'Agricultural & Processed Food Products Export Development Authority',
    desc: 'Mandatory for all Indian food exporters. APEDA registration ensures compliance with international food safety and export standards. It authorizes INDIBUZ to export agricultural products including Basmati Rice, Non-Basmati Rice, and Spices to international markets.',
    icon: `<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="M9 12l2 2 4-4"/></svg>`
  },
  {
    abbr: 'FSSAI',
    name: 'Food Safety and Standards Authority of India',
    desc: 'Guarantees all products meet India\'s highest food safety regulations. FSSAI Central License ensures that every product processed, packed, and exported by INDIBUZ complies with stringent food safety standards — protecting buyer confidence and consumer health.',
    icon: `<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>`
  },
  {
    abbr: 'IEC',
    name: 'Importer Exporter Code — Issued by DGFT',
    desc: 'Official authorization to conduct international trade. The IEC (Import Export Code) is issued by the Directorate General of Foreign Trade (DGFT), Government of India. It is the primary identification number for any entity engaged in import/export activities from India.',
    icon: `<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M2 12h20"/><path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10A15.3 15.3 0 0112 2z"/></svg>`
  },
  {
    abbr: 'MSME',
    name: 'Micro, Small & Medium Enterprises Registration',
    desc: 'Recognized Indian business entity with government backing. MSME (Udyam) registration certifies INDIBUZ as a recognized small/medium enterprise under the Ministry of MSME, Government of India — providing institutional credibility and access to government support programs.',
    icon: `<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 21V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v16"/></svg>`
  },
  {
    abbr: 'GST',
    name: 'Goods and Services Tax Registration',
    desc: 'Fully tax-compliant Indian business. GST registration confirms that INDIBUZ operates as a fully compliant, legitimate business entity under India\'s unified tax regime. This ensures transparent invoicing, proper documentation, and seamless B2B transactions for international buyers.',
    icon: `<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><path d="M14 2v6h6"/><path d="M16 13H8"/><path d="M16 17H8"/><path d="M10 9H8"/></svg>`
  }
];

export function renderCertifications() {
  return `
    <!-- Page Hero -->
    <section class="page-hero">
      <div class="hero-bg">
        <div class="img-placeholder" style="background-color:var(--forest-deep);" role="img" aria-label="Official certifications and registrations">
          <div style="position:absolute;inset:0;background:linear-gradient(135deg, rgba(15,42,30,0.9) 0%, rgba(27,61,47,0.75) 100%);"></div>
        </div>
      </div>
      <div class="hero-overlay"></div>
      <div class="hero-content">
        <h1 class="hero-title reveal">${t('certifications.heroTitle')}</h1>
        <p class="hero-subtitle reveal">${t('certifications.heroSubtitle')}</p>
      </div>
    </section>

    <!-- Certifications Grid -->
    <section class="section">
      <div class="container">
        <div class="section-header">
          <span class="section-label reveal">Our Compliance</span>
          <h2 class="section-title reveal">Certified for International Trade</h2>
          <p class="section-subtitle reveal">Every certification we hold represents our commitment to quality, safety, and regulatory compliance — giving international buyers complete confidence in our products.</p>
          <hr class="divider divider-center reveal">
        </div>
        <div class="certs-grid">
          ${certifications.map((cert, i) => `
            <article class="cert-badge reveal" style="transition-delay:${i * 0.1}s">
              <div class="cert-badge-icon">
                ${cert.icon}
              </div>
              <h3 class="cert-badge-name">${cert.abbr}</h3>
              <span class="cert-badge-full">${cert.name}</span>
              <p class="cert-badge-desc">${cert.desc}</p>
            </article>
          `).join('')}
        </div>

        <!-- What These Mean -->
        <div class="reveal" style="margin-top:var(--space-4xl);padding:var(--space-3xl);background:var(--cream);border-left:4px solid var(--gold);">
          <h3 style="font-family:var(--font-heading);font-size:var(--text-xl);color:var(--forest-deep);margin-bottom:var(--space-md)">What This Means for Buyers</h3>
          <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(280px,1fr));gap:var(--space-xl);">
            <div>
              <h4 style="font-size:var(--text-base);color:var(--forest);margin-bottom:var(--space-xs);">✓ Safe Food Production</h4>
              <p style="font-size:var(--text-sm);color:var(--charcoal-muted);margin:0;">All products are manufactured, processed, and packed under FSSAI-compliant conditions.</p>
            </div>
            <div>
              <h4 style="font-size:var(--text-base);color:var(--forest);margin-bottom:var(--space-xs);">✓ Quality Assurance</h4>
              <p style="font-size:var(--text-sm);color:var(--charcoal-muted);margin:0;">APEDA registration and regular quality audits ensure consistent, export-grade products.</p>
            </div>
            <div>
              <h4 style="font-size:var(--text-base);color:var(--forest);margin-bottom:var(--space-xs);">✓ International Trade Acceptance</h4>
              <p style="font-size:var(--text-sm);color:var(--charcoal-muted);margin:0;">IEC authorization and complete documentation for smooth customs clearance at any port.</p>
            </div>
            <div>
              <h4 style="font-size:var(--text-base);color:var(--forest);margin-bottom:var(--space-xs);">✓ Transparent Business Entity</h4>
              <p style="font-size:var(--text-sm);color:var(--charcoal-muted);margin:0;">GST and MSME registrations verify INDIBUZ as a legitimate, tax-compliant Indian business.</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA -->
    <section class="cta-section section">
      <div class="container">
        <div class="cta-content">
          <h2 class="cta-title reveal">Need Certification Documents?</h2>
          <p class="cta-desc reveal">We can provide copies of all our certifications and registration documents on request for your compliance and verification needs.</p>
          <div class="cta-actions reveal">
            <a href="#/contact" class="btn btn-primary btn-lg">${t('home.contactUs')}</a>
          </div>
        </div>
      </div>
    </section>
  `;
}
