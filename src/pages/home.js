/* ============================================
   INDIBUZ — Home Page (Smart Mart)
   ============================================ */
import { t } from '../i18n.js';

export function renderHome() {
  return `
    <!-- Smart Mart Hero / Banner Section -->
    <section class="hero-smartmart" style="background: var(--cream); padding-top: calc(var(--header-height) + 20px); padding-bottom: 40px;">
      <div class="container">
        <div style="display: flex; gap: 20px; align-items: stretch; flex-wrap: wrap;">
          <div style="flex: 2; min-width: 300px; background: var(--red); border-radius: 12px; padding: 40px; color: white; display: flex; flex-direction: column; justify-content: center; position: relative; overflow: hidden; box-shadow: 0 10px 30px rgba(200, 16, 46, 0.2);">
            <div style="position: relative; z-index: 2;">
              <span style="background: var(--red); color: var(--charcoal); padding: 4px 12px; border-radius: 20px; font-size: 12px; font-weight: bold; margin-bottom: 15px; display: inline-block;">WHOLESALE EXCLUSIVE</span>
              <h1 style="font-size: clamp(2rem, 4vw, 3rem); font-weight: 800; color: white; margin-bottom: 15px; line-height: 1.1;">Stock Up & Save Big on Premium Groceries</h1>
              <p style="font-size: 1.1rem; opacity: 0.9; margin-bottom: 25px; max-width: 400px;">Direct from mills & manufacturers. The best prices for your business.</p>
              <a href="#/products" class="btn" style="background: white; color: var(--red); padding: 12px 24px; border-radius: 8px; font-weight: bold; display: inline-block; box-shadow: 0 4px 15px rgba(0,0,0,0.1);">Shop Wholesale Now</a>
            </div>
            <!-- Decorative Circle -->
            <div style="position: absolute; right: -50px; bottom: -50px; width: 300px; height: 300px; background: rgba(255,255,255,0.1); border-radius: 50%; z-index: 1;"></div>
          </div>
          
          <div style="flex: 1; min-width: 300px; display: flex; flex-direction: column; gap: 20px;">
            <div style="flex: 1; background: var(--red); border-radius: 12px; padding: 30px; display: flex; flex-direction: column; justify-content: center; box-shadow: 0 4px 15px rgba(0,0,0,0.05);">
              <h3 style="font-size: 1.5rem; font-weight: 800; color: var(--charcoal); margin-bottom: 10px;">Bulk Buyer Discount</h3>
              <p style="color: var(--charcoal); opacity: 0.8; margin-bottom: 15px;">Get extra 5% off on orders above ₹50,000.</p>
              <a href="#/products" style="color: var(--charcoal); font-weight: 700; text-decoration: underline;">View Details</a>
            </div>
            <div style="flex: 1; background: var(--charcoal); border-radius: 12px; padding: 30px; display: flex; flex-direction: column; justify-content: center; box-shadow: 0 4px 15px rgba(0,0,0,0.05);">
              <h3 style="font-size: 1.5rem; font-weight: 800; color: white; margin-bottom: 10px;">Fast Delivery</h3>
              <p style="color: rgba(255,255,255,0.7); margin-bottom: 15px;">Next day delivery available in select cities.</p>
              <a href="#/contact" style="color: var(--red); font-weight: 700; text-decoration: underline;">Check Pin Code</a>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Shop By Category Section -->
    <section class="section" style="padding: 60px 0;">
      <div class="container">
        <div style="display: flex; justify-content: space-between; align-items: flex-end; margin-bottom: 30px;">
          <div>
            <h2 style="font-size: 2rem; font-weight: 800; color: var(--charcoal); margin-bottom: 8px;">Shop by Category</h2>
            <p style="color: var(--charcoal-muted); font-size: 1rem; margin: 0;">Explore our wide range of wholesale products.</p>
          </div>
          <a href="#/products" style="color: var(--red); font-weight: 600; display: flex; align-items: center; gap: 5px;">View All Categories <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg></a>
        </div>
        
        <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(180px, 1fr)); gap: 20px;">
          ${['Basmati Rice', 'Pulses & Dal', 'Masala & Spices', 'Edible Oils & Ghee', 'Sauces & Condiments', 'Tea & Beverages', 'Horeca & Disposable', 'Grocery'].map(cat => `
            <a href="#/products" style="display: flex; flex-direction: column; align-items: center; background: white; border: 1px solid rgba(0,0,0,0.08); border-radius: 12px; padding: 25px 15px; transition: all 0.2s; box-shadow: 0 4px 10px rgba(0,0,0,0.02);" onmouseover="this.style.borderColor='var(--red)'; this.style.transform='translateY(-5px)';" onmouseout="this.style.borderColor='rgba(0,0,0,0.08)'; this.style.transform='translateY(0)';">
              <div style="width: 64px; height: 64px; background: var(--cream); border-radius: 50%; display: flex; align-items: center; justify-content: center; margin-bottom: 15px; color: var(--red);">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><line x1="3" y1="9" x2="21" y2="9"/><line x1="9" y1="21" x2="9" y2="9"/></svg>
              </div>
              <span style="font-weight: 600; color: var(--charcoal); text-align: center;">${cat}</span>
            </a>
          `).join('')}
        </div>
      </div>
    </section>

    <!-- Best Selling Products Grid Placeholder -->
    <section class="section" style="padding: 60px 0; background: var(--ivory);">
      <div class="container">
        <div style="display: flex; justify-content: space-between; align-items: flex-end; margin-bottom: 30px;">
          <div>
            <h2 style="font-size: 2rem; font-weight: 800; color: var(--charcoal); margin-bottom: 8px;">Best Selling Products <span style="background: var(--red); color: white; font-size: 12px; padding: 4px 8px; border-radius: 4px; vertical-align: middle; margin-left: 10px;">HOT</span></h2>
            <p style="color: var(--charcoal-muted); font-size: 1rem; margin: 0;">Top choices for supermarkets and HoReCa.</p>
          </div>
          <a href="#/products" style="color: var(--red); font-weight: 600; display: flex; align-items: center; gap: 5px;">View All Products <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg></a>
        </div>
        
        <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 24px;">
           ${[
             {name: '1121 Steam Basmati Rice', cat: 'Basmati Rice', price: 107, old: 130},
             {name: 'Arhar (Toor) Dal Premium', cat: 'Pulses & Dal', price: 130, old: 160},
             {name: 'Mahakosh Mustard Oil', cat: 'Edible Oils & Ghee', price: 170, old: 195},
             {name: 'Perennial Tomato Ketchup', cat: 'Sauces', price: 290, old: 350}
           ].map(p => `
             <div style="background: white; border: 1px solid rgba(0,0,0,0.08); border-radius: 12px; padding: 20px; position: relative; transition: all 0.3s;" onmouseover="this.style.boxShadow='0 10px 25px rgba(0,0,0,0.1)';" onmouseout="this.style.boxShadow='none';">
               <span style="position: absolute; top: 15px; left: 15px; background: var(--red); color: white; font-size: 12px; font-weight: bold; padding: 4px 8px; border-radius: 4px; z-index: 2;">-${Math.round((1 - p.price/p.old)*100)}%</span>
               <div style="width: 100%; aspect-ratio: 1; background: var(--cream); border-radius: 8px; margin-bottom: 15px; display: flex; align-items: center; justify-content: center; color: var(--charcoal-light);">
                 <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" opacity="0.3"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>
               </div>
               <div style="font-size: 12px; color: var(--charcoal-muted); margin-bottom: 5px;">${p.cat}</div>
               <h4 style="font-size: 16px; font-weight: 700; color: var(--charcoal); margin-bottom: 10px; line-height: 1.3;">${p.name}</h4>
               <div style="display: flex; align-items: baseline; gap: 8px; margin-bottom: 15px;">
                 <span style="font-size: 1.25rem; font-weight: 800; color: var(--charcoal);">₹${p.price}</span>
                 <span style="font-size: 0.9rem; color: var(--charcoal-muted); text-decoration: line-through;">₹${p.old}</span>
               </div>
               <a href="#/products" style="display: block; width: 100%; text-align: center; padding: 10px; background: white; border: 1px solid var(--red); color: var(--red); border-radius: 6px; font-weight: 600; transition: all 0.2s;" onmouseover="this.style.background='var(--red)'; this.style.color='white';" onmouseout="this.style.background='white'; this.style.color='var(--red)';">View Product</a>
             </div>
           `).join('')}
        </div>
      </div>
    </section>

    <!-- Why Choose INDIBUZ Fast Delivery Section -->
    <section class="why-section section" id="why-indibuz" style="padding: 60px 0; background: white;">
      <div class="container">
        <div class="section-header" style="text-align: center; margin-bottom: 40px;">
          <h2 class="section-title" style="font-size: 2rem; font-weight: 800; color: var(--charcoal);">Why Partner with INDIBUZ?</h2>
        </div>
        <div class="why-grid stagger-children" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 30px;">
          <div class="diff-card" style="text-align: center; padding: 30px; background: var(--ivory); border-radius: 12px;">
            <div class="diff-icon" style="color: var(--red); margin-bottom: 20px;">
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"/></svg>
            </div>
            <h3 class="diff-title" style="font-size: 1.25rem; font-weight: 700; margin-bottom: 10px;">Wholesale Pricing</h3>
            <p class="diff-desc" style="color: var(--charcoal-muted); font-size: 0.95rem;">Direct sourcing from manufacturers ensures you get the most competitive margins.</p>
          </div>
          <div class="diff-card" style="text-align: center; padding: 30px; background: var(--ivory); border-radius: 12px;">
            <div class="diff-icon" style="color: var(--red); margin-bottom: 20px;">
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="1" y="3" width="15" height="13"></rect><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"></polygon><circle cx="5.5" cy="18.5" r="2.5"></circle><circle cx="18.5" cy="18.5" r="2.5"></circle></svg>
            </div>
            <h3 class="diff-title" style="font-size: 1.25rem; font-weight: 700; margin-bottom: 10px;">Express Delivery</h3>
            <p class="diff-desc" style="color: var(--charcoal-muted); font-size: 0.95rem;">Fast and reliable logistics network to keep your inventory fully stocked.</p>
          </div>
          <div class="diff-card" style="text-align: center; padding: 30px; background: var(--ivory); border-radius: 12px;">
            <div class="diff-icon" style="color: var(--red); margin-bottom: 20px;">
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
            </div>
            <h3 class="diff-title" style="font-size: 1.25rem; font-weight: 700; margin-bottom: 10px;">100% Quality Assured</h3>
            <p class="diff-desc" style="color: var(--charcoal-muted); font-size: 0.95rem;">FSSAI approved, rigorously tested products for your customers' satisfaction.</p>
          </div>
        </div>
      </div>
    </section>

    <!-- WhatsApp CTA Banner -->
    <section style="background: var(--charcoal); padding: 50px 0;">
      <div class="container">
        <div style="background: #25D366; border-radius: 16px; padding: 40px; display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 30px; box-shadow: 0 10px 30px rgba(37, 211, 102, 0.2);">
          <div style="color: white; max-width: 600px;">
            <h2 style="font-size: 2rem; font-weight: 800; margin-bottom: 10px;">Order Instantly on WhatsApp</h2>
            <p style="font-size: 1.1rem; opacity: 0.9; margin: 0;">Send us your requirements list directly and our sales team will create the order for you within minutes.</p>
          </div>
          <a href="https://wa.me/916284302338?text=Hello%20INDIBUZ%2C%20I%20would%20like%20to%20place%20a%20wholesale%20order." target="_blank" style="background: white; color: #128C7E; padding: 16px 32px; border-radius: 50px; font-weight: 800; font-size: 1.1rem; display: flex; align-items: center; gap: 10px; transition: transform 0.2s;" onmouseover="this.style.transform='scale(1.05)';" onmouseout="this.style.transform='scale(1)';">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z"/></svg>
            Send WhatsApp Message
          </a>
        </div>
      </div>
    </section>
  `;
}
