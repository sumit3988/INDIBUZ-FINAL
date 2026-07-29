/* ============================================
   INDIBUZ — Shopping Cart & Order Manager
   ============================================ */

const CART_KEY = 'indibuz-cart';

let cart = loadCart();

function loadCart() {
  try {
    const saved = localStorage.getItem(CART_KEY);
    return saved ? JSON.parse(saved) : [];
  } catch (e) {
    console.error('Failed to load cart from localStorage', e);
    return [];
  }
}

function saveCart() {
  try {
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
  } catch (e) {
    console.error('Failed to save cart to localStorage', e);
  }
  window.dispatchEvent(new CustomEvent('cartUpdated', { detail: { cart } }));
}

export function getCart() {
  return [...cart];
}

export function addToCart(product, quantity = 1) {
  const existingIndex = cart.findIndex(item => item.id === product.id || item.name === product.name);
  
  const itemPrice = product.sale_price ? parseFloat(product.sale_price) 
    : product.salePrice ? parseFloat(product.salePrice) 
    : product.original_price ? parseFloat(product.original_price) 
    : 0;

  const origPrice = product.original_price ? parseFloat(product.original_price) 
    : product.originalPrice ? parseFloat(product.originalPrice) 
    : 0;

  if (existingIndex > -1) {
    cart[existingIndex].quantity += quantity;
  } else {
    cart.push({
      id: product.id || product.name.toLowerCase().replace(/[^a-z0-9]/g, '-'),
      name: product.name,
      variant: product.variant || product.variants || '',
      price: itemPrice,
      original_price: origPrice,
      packaging: product.packaging_options || product.packaging || '',
      image_url: product.image_url || '',
      quantity: Math.max(1, quantity)
    });
  }

  saveCart();
  showToast(`Added "${product.name}" to your cart!`);
}

export function updateQuantity(id, quantity) {
  const index = cart.findIndex(item => String(item.id) === String(id));
  if (index > -1) {
    if (quantity <= 0) {
      cart.splice(index, 1);
    } else {
      cart[index].quantity = quantity;
    }
    saveCart();
  }
}

export function removeFromCart(id) {
  cart = cart.filter(item => String(item.id) !== String(id));
  saveCart();
}

export function clearCart() {
  cart = [];
  saveCart();
}

export function getCartCount() {
  return cart.reduce((total, item) => total + item.quantity, 0);
}

export function getCartTotal() {
  return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
}

export function getCartSavings() {
  return cart.reduce((total, item) => {
    if (item.original_price && item.original_price > item.price) {
      return total + ((item.original_price - item.price) * item.quantity);
    }
    return total;
  }, 0);
}

// Toast notification popup
export function showToast(message) {
  let toastContainer = document.getElementById('toast-container');
  if (!toastContainer) {
    toastContainer = document.createElement('div');
    toastContainer.id = 'toast-container';
    toastContainer.style.cssText = 'position:fixed; bottom:24px; right:24px; z-index:9999; display:flex; flex-direction:column; gap:10px; pointer-events:none;';
    document.body.appendChild(toastContainer);
  }

  const toast = document.createElement('div');
  toast.style.cssText = 'background:var(--forest-deep, #0f2a1e); color:#fff; padding:12px 20px; border-radius:8px; font-size:14px; font-weight:500; box-shadow:0 10px 25px rgba(0,0,0,0.25); border-left:4px solid var(--gold, #d4af37); transform:translateY(20px); opacity:0; transition:all 0.3s ease; pointer-events:auto; display:flex; align-items:center; gap:10px;';
  toast.innerHTML = `
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--gold, #d4af37)" stroke-width="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg>
    <span>${message}</span>
  `;

  toastContainer.appendChild(toast);

  requestAnimationFrame(() => {
    toast.style.transform = 'translateY(0)';
    toast.style.opacity = '1';
  });

  setTimeout(() => {
    toast.style.transform = 'translateY(20px)';
    toast.style.opacity = '0';
    setTimeout(() => toast.remove(), 300);
  }, 3000);
}
