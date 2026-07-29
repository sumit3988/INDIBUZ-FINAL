/* ============================================
   INDIBUZ — Shopping Cart & Order Page
   ============================================ */

import { getCart, updateQuantity, removeFromCart, clearCart, getCartTotal, getCartSavings } from '../cart.js';
import { API_BASE_URL } from '../config.js';
import { getAuthHeaders } from '../auth.js';

export function renderCart() {
  const items = getCart();
  const subtotal = getCartTotal();
  const savings = getCartSavings();

  if (items.length === 0) {
    return `
      <!-- Page Hero -->
      <section class="page-hero">
        <div class="hero-bg">
        <img src="https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?auto=format&fit=crop&q=80&w=1600" alt="Your Order Cart" style="width:100%; height:100%; object-fit:cover;" />
        </div>
        <div class="hero-overlay"></div>
        <div class="hero-content">
          <h1 class="hero-title reveal">Your Order Cart</h1>
          <p class="hero-subtitle reveal">Review your selected items and submit an order request</p>
        </div>
      </section>

      <section class="section" style="min-height:400px; display:flex; align-items:center; justify-content:center;">
        <div class="container" style="text-align:center; max-width:550px;">
          <div style="width:80px; height:80px; margin:0 auto var(--space-lg); background:var(--cream); border-radius:50%; display:flex; align-items:center; justify-content:center; color:var(--forest-deep);">
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
              <circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/>
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
            </svg>
          </div>
          <h2 style="font-family:var(--font-heading); font-size:var(--text-3xl); color:var(--forest-deep); margin-bottom:var(--space-md);">Your Cart is Currently Empty</h2>
          <p style="color:var(--charcoal-muted); line-height:1.6; margin-bottom:var(--space-xl);">Browse our export-quality Basmati Rice, Non-Basmati Rice, Atta, and Spices, and add your required items to build a custom bulk order quote.</p>
          <a href="#/products" class="btn btn-primary btn-lg">Explore Our Products →</a>
        </div>
      </section>
    `;
  }

  const itemsHTML = items.map(item => {
    const lineTotal = item.price > 0 ? item.price * item.quantity : 0;
    return `
      <div class="cart-item" data-id="${item.id}" style="display:flex; gap:20px; padding:20px; background:var(--white); border-radius:12px; border:1px solid rgba(0,0,0,0.08); align-items:center; flex-wrap:wrap;">
        <div style="width:70px; height:70px; border-radius:8px; overflow:hidden; background:var(--forest-deep); flex-shrink:0; display:flex; align-items:center; justify-content:center;">
          ${item.image_url ? `
            <img src="${item.image_url}" alt="${item.name}" style="width:100%; height:100%; object-fit:cover;" />
          ` : `
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.4)" stroke-width="1"><ellipse cx="12" cy="12" rx="3" ry="8"/></svg>
          `}
        </div>
        <div style="flex:1; min-width:200px;">
          <h4 style="font-family:var(--font-heading); font-size:var(--text-lg); color:var(--forest-deep); margin-bottom:4px;">${item.name}</h4>
          <p style="font-size:var(--text-xs); color:var(--charcoal-muted); margin:0;">${item.variant ? item.variant : ''} ${item.packaging ? `• ${item.packaging}` : ''}</p>
          <div style="margin-top:6px;">
            ${item.price > 0 ? `
              <span style="font-weight:700; color:var(--forest-deep); font-size:var(--text-md);">₹${item.price.toLocaleString('en-IN')}</span>
              ${item.original_price && item.original_price > item.price ? `
                <span style="font-size:var(--text-xs); color:var(--charcoal-muted); text-decoration:line-through; margin-left:6px;">₹${item.original_price.toLocaleString('en-IN')}</span>
              ` : ''}
            ` : `
              <span style="font-size:var(--text-xs); color:var(--gold); font-weight:600;">Bulk Pricing / Quote Required</span>
            `}
          </div>
        </div>
        
        <!-- Quantity Controls -->
        <div style="display:flex; align-items:center; border:1px solid #ddd; border-radius:6px; overflow:hidden; background:#f9f9f9;">
          <button class="cart-qty-btn decrease-qty" data-id="${item.id}" style="width:32px; height:32px; border:none; background:none; cursor:pointer; font-weight:bold; font-size:16px;">-</button>
          <span style="width:36px; text-align:center; font-weight:600; font-size:14px;">${item.quantity}</span>
          <button class="cart-qty-btn increase-qty" data-id="${item.id}" style="width:32px; height:32px; border:none; background:none; cursor:pointer; font-weight:bold; font-size:16px;">+</button>
        </div>

        <!-- Line Total -->
        <div style="min-width:100px; text-align:right;">
          ${lineTotal > 0 ? `
            <span style="font-weight:700; color:var(--forest-deep); font-size:var(--text-lg);">₹${lineTotal.toLocaleString('en-IN')}</span>
          ` : `
            <span style="font-size:var(--text-xs); color:var(--charcoal-muted);">Custom Quote</span>
          `}
        </div>

        <!-- Remove -->
        <button class="remove-item-btn" data-id="${item.id}" aria-label="Remove item" style="border:none; background:none; color:#c62828; cursor:pointer; padding:6px; border-radius:4px;" title="Remove Item">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
        </button>
      </div>
    `;
  }).join('');

  return `
    <!-- Page Hero -->
    <section class="page-hero">
      <div class="hero-bg">
        <img src="https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?auto=format&fit=crop&q=80&w=1600" alt="Your Order Cart" style="width:100%; height:100%; object-fit:cover;" />
      </div>
      <div class="hero-overlay"></div>
      <div class="hero-content">
        <h1 class="hero-title reveal">Your Order Cart</h1>
        <p class="hero-subtitle reveal">Review selected items and place your bulk order request</p>
      </div>
    </section>

    <section class="section">
      <div class="container">
        <div style="display:grid; grid-template-columns: 1fr 380px; gap:40px; align-items:start;">
          
          <!-- Items List Column -->
          <div>
            <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:var(--space-lg);">
              <h2 style="font-family:var(--font-heading); font-size:var(--text-2xl); color:var(--forest-deep); margin:0;">Selected Order Items (${items.length})</h2>
              <button id="clear-cart-btn" style="background:none; border:none; color:#c62828; cursor:pointer; font-size:var(--text-xs); font-weight:600; text-decoration:underline;">Clear Cart</button>
            </div>
            
            <div style="display:flex; flex-direction:column; gap:16px;">
              ${itemsHTML}
            </div>

            <div style="margin-top:var(--space-xl); display:flex; justify-content:space-between; align-items:center;">
              <a href="#/products" style="color:var(--forest-deep); font-weight:600; font-size:var(--text-sm); text-decoration:none;">← Add More Products</a>
            </div>
          </div>

          <!-- Checkout & Summary Column -->
          <div style="background:var(--cream); padding:28px; border-radius:16px; border:1px solid rgba(0,0,0,0.06); position:sticky; top:100px;">
            <h3 style="font-family:var(--font-heading); font-size:var(--text-xl); color:var(--forest-deep); margin-bottom:var(--space-lg); border-bottom:2px solid var(--gold); padding-bottom:10px;">Order Summary</h3>
            
            <div style="display:flex; flex-direction:column; gap:12px; margin-bottom:var(--space-lg); font-size:var(--text-sm);">
              <div style="display:flex; justify-content:space-between;">
                <span style="color:var(--charcoal-muted);">Items Subtotal:</span>
                <span style="font-weight:700; color:var(--forest-deep);">₹${subtotal.toLocaleString('en-IN')}</span>
              </div>
              ${savings > 0 ? `
                <div style="display:flex; justify-content:space-between; color:#2e7d32;">
                  <span>Total Discount Savings:</span>
                  <span style="font-weight:700;">- ₹${savings.toLocaleString('en-IN')}</span>
                </div>
              ` : ''}
              <div style="display:flex; justify-content:space-between; font-size:var(--text-base); border-top:1px dashed #ccc; padding-top:12px; margin-top:4px;">
                <strong style="color:var(--forest-deep);">Estimated Total:</strong>
                <strong style="font-size:var(--text-xl); color:var(--forest-deep);">₹${subtotal.toLocaleString('en-IN')}</strong>
              </div>
              <p style="font-size:11px; color:var(--charcoal-muted); margin:0;">* Final shipping, freight, and bulk volume discounts will be calculated in quote.</p>
            </div>

            <!-- Customer Checkout Form -->
            <form id="cart-order-form" style="display:flex; flex-direction:column; gap:14px; margin-top:var(--space-lg);">
              <h4 style="font-family:var(--font-heading); font-size:var(--text-md); color:var(--forest-deep); margin:0;">Your Contact Details</h4>
              <div>
                <input type="text" name="name" placeholder="Full Name *" required class="form-input" style="width:100%; padding:10px 14px; border-radius:6px; border:1px solid #ccc; font-size:14px;" />
              </div>
              <div>
                <input type="email" name="email" placeholder="Email Address *" required class="form-input" style="width:100%; padding:10px 14px; border-radius:6px; border:1px solid #ccc; font-size:14px;" />
              </div>
              <div>
                <input type="tel" name="phone" placeholder="Phone / WhatsApp Number *" required pattern="[0-9]+" oninput="this.value=this.value.replace(/[^0-9]/g, '')" class="form-input" style="width:100%; padding:10px 14px; border-radius:6px; border:1px solid #ccc; font-size:14px;" />
              </div>
              <div>
                <textarea name="address" placeholder="Complete Delivery Address *" required rows="2" class="form-input" style="width:100%; padding:10px 14px; border-radius:6px; border:1px solid #ccc; font-size:14px; resize:vertical;"></textarea>
              </div>
              <div>
                <textarea name="notes" placeholder="Delivery Port, Specific Packaging, or Order Notes... (Optional)" rows="2" class="form-input" style="width:100%; padding:10px 14px; border-radius:6px; border:1px solid #ccc; font-size:14px; resize:vertical;"></textarea>
              </div>

              <!-- Payment Method Selection -->
              <div style="margin-top:8px;">
                <h4 style="font-family:var(--font-heading); font-size:var(--text-md); color:var(--forest-deep); margin:0 0 10px 0;">Select Payment Method</h4>
                <div style="display:flex; flex-direction:column; gap:8px;">

                  <!-- Bank Transfer -->
                  <label id="pay-label-bank" style="display:flex; align-items:center; gap:10px; padding:12px 14px; border-radius:8px; border:2px solid #ddd; cursor:pointer; background:#fff; transition:all 0.2s;" onclick="selectPayment('bank')">
                    <input type="radio" name="payment_method" value="bank_transfer" id="pay-bank" style="width:16px;height:16px;accent-color:var(--forest-deep);" />
                    <span style="font-size:22px;">🏦</span>
                    <div>
                      <div style="font-weight:600; font-size:13px; color:var(--forest-deep);">Bank Transfer (NEFT / RTGS / SWIFT)</div>
                      <div style="font-size:11px; color:var(--charcoal-muted);">For domestic & international bulk orders</div>
                    </div>
                  </label>
                  <div id="bank-details" style="display:none; background:var(--cream); border-radius:8px; padding:14px 16px; font-size:12px; color:var(--charcoal); border:1px dashed var(--gold); line-height:1.8;">
                    <div style="font-weight:700; color:var(--forest-deep); margin-bottom:6px;">🏦 INDIBUZ Bank Account Details</div>
                    <table style="width:100%; border-collapse:collapse;">
                      <tr><td style="color:var(--charcoal-muted); padding:2px 0; width:40%;">Account Name</td><td style="font-weight:600;">INDIBUZ TRADING</td></tr>
                      <tr><td style="color:var(--charcoal-muted); padding:2px 0;">Account No.</td><td style="font-weight:600;">50200098765432</td></tr>
                      <tr><td style="color:var(--charcoal-muted); padding:2px 0;">IFSC Code</td><td style="font-weight:600;">HDFC0001234</td></tr>
                      <tr><td style="color:var(--charcoal-muted); padding:2px 0;">Bank Name</td><td style="font-weight:600;">HDFC Bank</td></tr>
                      <tr><td style="color:var(--charcoal-muted); padding:2px 0;">Branch</td><td style="font-weight:600;">Punjab, India</td></tr>
                      <tr><td style="color:var(--charcoal-muted); padding:2px 0;">SWIFT Code</td><td style="font-weight:600;">HDFCINBB</td></tr>
                    </table>
                    <p style="margin:8px 0 0 0; font-size:11px; color:var(--charcoal-muted);">* After transfer, please share payment receipt via WhatsApp: +91 6284302338</p>
                  </div>

                  <!-- UPI -->
                  <label id="pay-label-upi" style="display:flex; align-items:center; gap:10px; padding:12px 14px; border-radius:8px; border:2px solid #ddd; cursor:pointer; background:#fff; transition:all 0.2s;" onclick="selectPayment('upi')">
                    <input type="radio" name="payment_method" value="upi" id="pay-upi" style="width:16px;height:16px;accent-color:var(--forest-deep);" />
                    <span style="font-size:22px;">📱</span>
                    <div>
                      <div style="font-weight:600; font-size:13px; color:var(--forest-deep);">UPI Payment</div>
                      <div style="font-size:11px; color:var(--charcoal-muted);">GPay, PhonePe, Paytm, BHIM</div>
                    </div>
                  </label>
                  <div id="upi-details" style="display:none; background:var(--cream); border-radius:8px; padding:14px 16px; font-size:12px; color:var(--charcoal); border:1px dashed var(--gold); text-align:center;">
                    <div style="font-weight:700; color:var(--forest-deep); margin-bottom:8px;">📱 UPI Payment Details</div>
                    <div style="font-size:16px; font-weight:700; color:var(--forest-deep); letter-spacing:0.5px; background:#fff; padding:10px; border-radius:6px; border:1px solid #ddd;">
                      iindibuztrader@okicici
                    </div>
                    <p style="margin:8px 0 0 0; font-size:11px; color:var(--charcoal-muted);">Scan QR or pay directly to this UPI ID. Share screenshot after payment.</p>
                  </div>

                  <!-- WhatsApp Order -->
                  <label id="pay-label-whatsapp" style="display:flex; align-items:center; gap:10px; padding:12px 14px; border-radius:8px; border:2px solid #ddd; cursor:pointer; background:#fff; transition:all 0.2s;" onclick="selectPayment('whatsapp')">
                    <input type="radio" name="payment_method" value="whatsapp" id="pay-whatsapp" style="width:16px;height:16px;accent-color:var(--forest-deep);" />
                    <span style="font-size:22px;">💬</span>
                    <div>
                      <div style="font-weight:600; font-size:13px; color:var(--forest-deep);">Order via WhatsApp</div>
                      <div style="font-size:11px; color:var(--charcoal-muted);">Discuss payment & terms directly with team</div>
                    </div>
                  </label>

                  <!-- Cash on Delivery -->
                  <label id="pay-label-cod" style="display:flex; align-items:center; gap:10px; padding:12px 14px; border-radius:8px; border:2px solid #ddd; cursor:pointer; background:#fff; transition:all 0.2s;" onclick="selectPayment('cod')">
                    <input type="radio" name="payment_method" value="cod" id="pay-cod" style="width:16px;height:16px;accent-color:var(--forest-deep);" />
                    <span style="font-size:22px;">💵</span>
                    <div>
                      <div style="font-weight:600; font-size:13px; color:var(--forest-deep);">Cash on Delivery (COD)</div>
                      <div style="font-size:11px; color:var(--charcoal-muted);">Pay in cash when your order arrives</div>
                    </div>
                  </label>
                  <div id="cod-details" style="display:none; background:#fff8e1; border-radius:8px; padding:14px 16px; font-size:12px; color:var(--charcoal); border:1px dashed #ffc107; line-height:1.8;">
                    <div style="font-weight:700; color:#e65100; margin-bottom:6px;">💵 Cash on Delivery — Terms</div>
                    <ul style="margin:0; padding-left:16px; color:var(--charcoal);">
                      <li>Available for domestic orders within India only.</li>
                      <li>Please keep the exact cash amount ready at delivery.</li>
                      <li>COD is subject to order value limits & location eligibility.</li>
                      <li>Our team will confirm COD availability for your area via WhatsApp before dispatch.</li>
                    </ul>
                    <p style="margin:8px 0 0 0; font-size:11px; color:var(--charcoal-muted);">* Contact us: +91 6284302338 for confirmation.</p>
                  </div>

                </div>
              </div>

              <div style="display:flex; flex-direction:column; gap:10px; margin-top:10px;">
                <button type="submit" class="btn btn-primary" style="width:100%; justify-content:center;">
                  Submit Order Request →
                </button>

                <button type="button" id="whatsapp-order-btn" class="btn btn-whatsapp" style="width:100%; justify-content:center;">
                  Order via WhatsApp 💬
                </button>
              </div>
            </form>

            <div id="cart-order-success" style="display:none; margin-top:20px; background:#e8f5e9; color:#2e7d32; padding:16px; border-radius:8px; text-align:center;">
              <h4 style="margin:0 0 6px 0;">Order Submitted!</h4>
              <p style="margin:0; font-size:13px;">Thank you for your order request. Our export team will contact you within 24 hours.</p>
            </div>

          </div>

        </div>
      </div>
    </section>
  `;
}

export function initCartEvents() {
  // Payment method toggle logic
  window.selectPayment = function(method) {
    const labels = { bank: 'pay-label-bank', upi: 'pay-label-upi', whatsapp: 'pay-label-whatsapp', cod: 'pay-label-cod' };
    const details = { bank: 'bank-details', upi: 'upi-details', cod: 'cod-details' };

    // Reset all label styles
    Object.values(labels).forEach(id => {
      const el = document.getElementById(id);
      if (el) { el.style.border = '2px solid #ddd'; el.style.background = '#fff'; }
    });
    // Highlight selected
    const selected = document.getElementById(labels[method]);
    if (selected) { selected.style.border = '2px solid var(--forest-deep)'; selected.style.background = 'var(--cream)'; }

    // Hide all detail panels
    Object.values(details).forEach(id => {
      const el = document.getElementById(id);
      if (el) el.style.display = 'none';
    });
    // Show relevant panel
    const panel = document.getElementById(details[method]);
    if (panel) panel.style.display = 'block';
  };
  // Quantity controls
  document.querySelectorAll('.increase-qty').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = btn.dataset.id;
      const items = getCart();
      const item = items.find(i => String(i.id) === String(id));
      if (item) {
        updateQuantity(id, item.quantity + 1);
        refreshCartPage();
      }
    });
  });

  document.querySelectorAll('.decrease-qty').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = btn.dataset.id;
      const items = getCart();
      const item = items.find(i => String(i.id) === String(id));
      if (item) {
        updateQuantity(id, item.quantity - 1);
        refreshCartPage();
      }
    });
  });

  document.querySelectorAll('.remove-item-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = btn.dataset.id;
      removeFromCart(id);
      refreshCartPage();
    });
  });

  const clearBtn = document.getElementById('clear-cart-btn');
  if (clearBtn) {
    clearBtn.addEventListener('click', () => {
      if (confirm('Are you sure you want to clear your cart?')) {
        clearCart();
        refreshCartPage();
      }
    });
  }

  // Order Submission via API
  const orderForm = document.getElementById('cart-order-form');
  if (orderForm) {
    orderForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const formData = new FormData(orderForm);
      const items = getCart();
      const subtotal = getCartTotal();
      const paymentMethod = formData.get('payment_method') || 'Not specified';
      const paymentLabels = { bank_transfer: 'Bank Transfer (NEFT/RTGS/SWIFT)', upi: 'UPI Payment', whatsapp: 'WhatsApp Order', cod: 'Cash on Delivery (COD)', 'Not specified': 'Not specified' };
      const paymentLabel = paymentLabels[paymentMethod] || paymentMethod;

      const orderPayload = {
        cart: items.map(i => ({ product_id: i.id, quantity: i.quantity })),
        address: {
            full_name: formData.get('name'),
            email: formData.get('email'),
            phone: formData.get('phone'),
            address_line_1: formData.get('address')
        },
        payment_method: paymentMethod
      };

      const submitBtn = orderForm.querySelector('button[type="submit"]');
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerText = 'Submitting Order...';
      }

      try {
        const response = await fetch(`${API_BASE_URL}/api/checkout/`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            ...getAuthHeaders()
          },
          credentials: 'include',
          body: JSON.stringify(orderPayload)
        });

        if (response.ok) {
          const resData = await response.json();
          orderForm.style.display = 'none';
          const successDiv = document.getElementById('cart-order-success');
          successDiv.innerHTML = `<h4 style="margin:0 0 6px 0;">Order Submitted!</h4><p style="margin:0; font-size:13px;">Your order ID is <strong>${resData.order_id}</strong>. Our team will contact you shortly.</p>`;
          successDiv.style.display = 'block';
          clearCart();
        } else {
          alert('Failed to submit order request. Please try again or order via WhatsApp.');
        }
      } catch (err) {
        alert('Network issue. You can order directly via WhatsApp!');
      } finally {
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.innerText = 'Submit Order Request →';
        }
      }
    });
  }

  // WhatsApp Order Submission
  const whatsappBtn = document.getElementById('whatsapp-order-btn');
  if (whatsappBtn) {
    whatsappBtn.addEventListener('click', () => {
      const items = getCart();
      const subtotal = getCartTotal();
      const name = document.querySelector('[name="name"]')?.value || '';
      const notes = document.querySelector('[name="notes"]')?.value || '';
      const paymentEl = document.querySelector('[name="payment_method"]:checked');
      const paymentLabels = { bank_transfer: 'Bank Transfer (NEFT/RTGS/SWIFT)', upi: 'UPI Payment', whatsapp: 'WhatsApp Order', cod: 'Cash on Delivery (COD)' };
      const paymentLabel = paymentEl ? (paymentLabels[paymentEl.value] || paymentEl.value) : 'Not specified';

      let text = `Hello INDIBUZ, I would like to place a bulk order request:\n\n`;
      if (name) text += `Name: ${name}\n`;
      text += `Payment Method: ${paymentLabel}\n`;
      text += `\n*ORDER ITEMS:*\n`;

      items.forEach((item, index) => {
        text += `${index + 1}. *${item.name}*\n   Qty: ${item.quantity} | Price: ₹${(item.price * item.quantity).toLocaleString('en-IN')}\n`;
      });

      text += `\n*ESTIMATED TOTAL:* ₹${subtotal.toLocaleString('en-IN')}\n`;
      if (notes) text += `\nNotes: ${notes}\n`;

      const whatsappURL = `https://wa.me/916284302338?text=${encodeURIComponent(text)}`;
      window.open(whatsappURL, '_blank');
    });
  }
}

function refreshCartPage() {
  window.dispatchEvent(new HashChangeEvent('hashchange'));
}
