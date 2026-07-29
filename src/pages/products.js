import { t } from '../i18n.js';
import { API_BASE_URL } from '../config.js';
import { addToCart, getCart, updateQuantity } from '../cart.js';

let currentProducts = [];

function renderSkeletonCards() {
  return Array(6).fill(`
    <article class="product-card skeleton-card">
      <div class="product-card-image" style="background:#e0e0e0; animation:skeleton-pulse 1.5s infinite ease-in-out;"></div>
      <div class="product-card-body" style="padding:24px;">
        <div style="height:14px; width:40%; background:#e0e0e0; margin-bottom:12px; border-radius:4px; animation:skeleton-pulse 1.5s infinite ease-in-out;"></div>
        <div style="height:24px; width:80%; background:#e0e0e0; margin-bottom:16px; border-radius:4px; animation:skeleton-pulse 1.5s infinite ease-in-out;"></div>
        <div style="height:60px; width:100%; background:#e0e0e0; margin-bottom:24px; border-radius:4px; animation:skeleton-pulse 1.5s infinite ease-in-out;"></div>
        <div style="height:120px; width:100%; background:#e0e0e0; border-radius:4px; animation:skeleton-pulse 1.5s infinite ease-in-out;"></div>
      </div>
    </article>
  `).join('');
}

function renderProductCard(product) {
  const specs = [];
  
  if (product.grain_length) specs.push({ label: t('products.grainLength') || 'Grain Length', value: product.grain_length });
  if (product.moisture_max) specs.push({ label: t('products.moisture') || 'Moisture', value: product.moisture_max });
  if (product.broken_percent) specs.push({ label: t('products.broken') || 'Broken', value: product.broken_percent });
  if (product.packaging_options) specs.push({ label: t('products.packaging') || 'Packaging', value: product.packaging_options });
  
  const origPrice = product.original_price ? parseFloat(product.original_price) : null;
  const salePrice = product.sale_price ? parseFloat(product.sale_price) : null;
  const discountPercent = product.discount_percent || 0;

  const priceHTML = (salePrice || origPrice) ? `
    <div class="product-card-pricing" style="margin-top:12px; margin-bottom:12px; display:flex; align-items:center; gap:10px; flex-wrap:wrap;">
      ${salePrice ? `<span style="font-size:var(--text-xl); font-weight:700; color:var(--forest-deep);">₹${salePrice.toLocaleString('en-IN')}</span>` : ''}
      ${origPrice && origPrice > salePrice ? `<span style="font-size:var(--text-sm); color:var(--charcoal-muted); text-decoration:line-through;">₹${origPrice.toLocaleString('en-IN')}</span>` : ''}
      ${discountPercent > 0 ? `<span style="background:var(--burgundy); color:#fff; font-size:11px; font-weight:700; padding:3px 10px; border-radius:12px; letter-spacing:0.05em;">${discountPercent}% OFF</span>` : ''}
    </div>
  ` : '';

  let stockBadge = '';
  if (product.stock_status_customer === 'Out of Stock') {
    stockBadge = `<span style="color:#d32f2f; background:#ffebee; padding:4px 8px; border-radius:4px; font-size:12px; font-weight:bold;">Out of Stock</span>`;
  } else if (product.stock_status_customer === 'Low Stock') {
    stockBadge = `<span style="color:#e65100; background:#fff3e0; padding:4px 8px; border-radius:4px; font-size:12px; font-weight:bold;">Low Stock</span>`;
  } else {
    stockBadge = `<span style="color:#2e7d32; background:#e8f5e9; padding:4px 8px; border-radius:4px; font-size:12px; font-weight:bold;">In Stock</span>`;
  }

  return `
    <article class="product-card reveal hidden-reveal">
      <div class="product-card-image" style="position:relative;">
        ${discountPercent > 0 ? `
          <div style="position:absolute; top:12px; right:12px; background:var(--burgundy); color:#fff; font-size:12px; font-weight:700; padding:4px 10px; border-radius:4px; z-index:2; box-shadow:0 2px 6px rgba(0,0,0,0.2);">
            ${discountPercent}% OFF
          </div>
        ` : ''}
        ${product.image_url ? `
          <img src="${product.image_url}" alt="${product.name}" loading="lazy" style="width:100%; height:100%; object-fit:cover;" />
        ` : `
          <div class="img-placeholder" style="background-color:var(--forest-deep);" role="img" aria-label="${product.name}"></div>
        `}
      </div>
      <div class="product-card-body">
        <span class="product-card-category" style="display:flex; justify-content:space-between;">
            <span>${product.category_name || 'General'}</span>
            ${stockBadge}
        </span>
        <h3 class="product-card-title">${product.name}</h3>
        ${priceHTML}
        <p style="font-size:var(--text-sm);color:var(--charcoal-muted);line-height:1.6;margin-bottom:var(--space-md)">${product.description || ''}</p>
        <div class="product-card-specs">
          ${specs.map(s => `
            <div class="product-spec">
              <span class="product-spec-label">${s.label}</span>
              <span class="product-spec-value">${s.value}</span>
            </div>
          `).join('')}
        </div>
      </div>
      <div class="product-card-footer" style="display:flex; flex-direction:column; gap:8px;">
        ${(function() {
          const cartItems = getCart();
          const prodId = product.id || product.name.toLowerCase().replace(/[^a-z0-9]/g, '-');
          const cartItem = cartItems.find(item => String(item.id) === String(prodId));
          
          if (product.stock_status_customer === 'Out of Stock') {
             return `<button class="btn btn-primary btn-sm" disabled style="opacity:0.5; width:100%; justify-content:center; background:var(--forest-deep); font-weight:600;">Out of Stock</button>`;
          } else if (cartItem) {
             return `
               <div style="display:flex; align-items:center; justify-content:space-between; background:var(--cream); border-radius:4px; border:1px solid #ddd; padding:4px;">
                 <button class="qty-btn" data-id="${cartItem.id}" data-action="decrease" style="background:#fff; border:none; width:32px; height:32px; border-radius:4px; cursor:pointer; font-size:18px; display:flex; align-items:center; justify-content:center; box-shadow:0 1px 3px rgba(0,0,0,0.1);">-</button>
                 <span style="font-weight:bold; font-size:16px;">${cartItem.quantity}</span>
                 <button class="qty-btn" data-id="${cartItem.id}" data-action="increase" style="background:#fff; border:none; width:32px; height:32px; border-radius:4px; cursor:pointer; font-size:18px; display:flex; align-items:center; justify-content:center; box-shadow:0 1px 3px rgba(0,0,0,0.1);">+</button>
               </div>
             `;
          } else {
             return `<button class="btn btn-primary btn-sm add-to-cart-btn" data-product='${encodeURIComponent(JSON.stringify(product))}' style="width:100%; justify-content:center; background:var(--forest-deep); font-weight:600;">Add to Cart 🛒</button>`;
          }
        })()}
      </div>
    </article>
  `;
}

export function renderProducts() {
  return `
    <style>
      @keyframes skeleton-pulse {
        0%, 100% { opacity: 1; }
        50% { opacity: 0.5; }
      }
      .hidden-reveal {
        opacity: 1;
        transform: none;
      }
      .sidebar { padding: 24px; background: var(--cream); border-radius: 12px; }
      .search-box { width: 100%; padding: 12px; border-radius: 8px; border: 1px solid #ccc; font-size: 16px; margin-bottom: 20px; }
      .filter-title { font-weight: bold; margin-bottom: 12px; font-size: 18px; color: var(--forest-deep); border-bottom: 2px solid var(--gold); padding-bottom: 8px; }
      .filter-list { list-style: none; padding: 0; margin: 0; }
      .filter-list li { margin-bottom: 10px; cursor: pointer; color: var(--charcoal); }
      .filter-list li:hover { color: var(--forest-deep); font-weight: 600; }
      .filter-list li.active { color: var(--forest-deep); font-weight: bold; text-decoration: underline; }
    </style>
    <!-- Page Hero -->
    <section class="page-hero">
      <div class="hero-bg">
        <div class="img-placeholder" style="background-color:var(--forest-deep);" role="img" aria-label="Premium rice and spice products">
          <div style="position:absolute;inset:0;background:linear-gradient(135deg, rgba(15,42,30,0.95) 0%, rgba(27,61,47,0.8) 60%, rgba(107,29,42,0.3) 100%);"></div>
        </div>
      </div>
      <div class="hero-overlay"></div>
      <div class="hero-content">
        <h1 class="hero-title reveal">Our Products</h1>
        <p class="hero-subtitle reveal">Browse our premium export-quality products</p>
      </div>
    </section>

    <!-- Products Content -->
    <section class="products-page section">
      <div class="container" style="display:grid; grid-template-columns: 280px 1fr; gap: 40px; align-items: start;">
        
        <!-- Sidebar Filters -->
        <aside class="sidebar">
            <input type="text" id="search-input" class="search-box" placeholder="Search products..." autocomplete="off">
            <div id="autocomplete-suggestions" style="position:absolute; background:#fff; border:1px solid #ccc; width:230px; display:none; z-index:10; border-radius:4px; max-height:200px; overflow-y:auto; box-shadow:0 4px 6px rgba(0,0,0,0.1);"></div>
            
            <h3 class="filter-title">Categories</h3>
            <ul class="filter-list" id="category-filter-list">
                <li data-val="" class="active">All Categories</li>
            </ul>

            <h3 class="filter-title" style="margin-top: 30px;">Brands</h3>
            <ul class="filter-list" id="brand-filter-list">
                <li data-val="" class="active">All Brands</li>
            </ul>
        </aside>

        <!-- Product Grid -->
        <div id="products-content">
          <div class="products-grid" id="main-products-grid">
            ${renderSkeletonCards()}
          </div>
          <div id="no-products-msg" style="display:none; text-align:center; padding: 40px; color: var(--charcoal-muted); font-size: 18px;">
            No products found matching your search.
          </div>
        </div>

      </div>
    </section>
  `;
}

export function initProductTabs() {
  const grid = document.getElementById('main-products-grid');
  const searchInput = document.getElementById('search-input');
  const suggestionsBox = document.getElementById('autocomplete-suggestions');
  
  let currentCategory = '';
  let currentBrand = '';
  let currentSearch = '';

  // Fetch Filters
  fetch(`${API_BASE_URL}/api/categories/`)
    .then(res => res.json())
    .then(data => {
        const catList = document.getElementById('category-filter-list');
        const categories = data.results !== undefined ? data.results : data;
        categories.forEach(c => {
            catList.innerHTML += `<li data-val="${c.slug}">${c.name}</li>`;
        });
        bindFilters('category-filter-list', (val) => { currentCategory = val; fetchProducts(); });
    });

  fetch(`${API_BASE_URL}/api/brands/`)
    .then(res => res.json())
    .then(data => {
        const brandList = document.getElementById('brand-filter-list');
        const brands = data.results !== undefined ? data.results : data;
        brands.forEach(b => {
            brandList.innerHTML += `<li data-val="${b.slug}">${b.name}</li>`;
        });
        bindFilters('brand-filter-list', (val) => { currentBrand = val; fetchProducts(); });
    });

  function bindFilters(listId, callback) {
      document.getElementById(listId).addEventListener('click', (e) => {
          if (e.target.tagName === 'LI') {
              document.querySelectorAll(`#${listId} li`).forEach(li => li.classList.remove('active'));
              e.target.classList.add('active');
              callback(e.target.dataset.val);
          }
      });
  }

  function fetchProducts() {
      grid.innerHTML = renderSkeletonCards();
      document.getElementById('no-products-msg').style.display = 'none';

      let query = `${API_BASE_URL}/api/products/?`;
      if (currentCategory) query += `category=${currentCategory}&`;
      if (currentBrand) query += `brand=${currentBrand}&`;
      if (currentSearch) query += `search=${currentSearch}&`;

      fetch(query)
        .then(response => response.json())
        .then(data => {
            // Handle both paginated and non-paginated responses
            const productsList = data.results !== undefined ? data.results : data;
            currentProducts = productsList;
            
            if (productsList.length === 0) {
                grid.innerHTML = '';
                document.getElementById('no-products-msg').style.display = 'block';
            } else {
                renderGrid();
            }
        })
        .catch(err => {
            console.error(err);
            grid.innerHTML = '<p>Error loading products.</p>';
        });
  }

  function renderGrid() {
      if (!currentProducts || currentProducts.length === 0) return;
      grid.innerHTML = currentProducts.map(p => renderProductCard(p)).join('');
      bindAddToCart();
  }

  // Listen for cart updates to re-render grid buttons without fetching
  window.addEventListener('cartUpdated', renderGrid);

  function bindAddToCart() {
    document.querySelectorAll('.add-to-cart-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        try {
          const productData = JSON.parse(decodeURIComponent(btn.dataset.product));
          addToCart(productData);
        } catch (err) {
          console.error('Error adding product to cart', err);
        }
      });
    });

    document.querySelectorAll('.qty-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        const id = btn.dataset.id;
        const action = btn.dataset.action;
        const cartItem = getCart().find(item => String(item.id) === String(id));
        if (cartItem) {
           if (action === 'increase') updateQuantity(id, cartItem.quantity + 1);
           if (action === 'decrease') updateQuantity(id, cartItem.quantity - 1);
        }
      });
    });
  }

  // Search logic
  let typingTimer;
  searchInput.addEventListener('input', (e) => {
      clearTimeout(typingTimer);
      const val = e.target.value.trim();
      
      // Smart Autocomplete using existing fetched products (or fetch new)
      if (val.length > 1) {
          typingTimer = setTimeout(() => {
              currentSearch = val;
              fetchProducts();
          }, 300);
      } else if (val.length === 0) {
          currentSearch = '';
          fetchProducts();
      }
  });

  // Initial Fetch
  fetchProducts();
}
