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
  
  // Try to use unit/pack size
  const packSize = product.unit || (product.packaging_options ? product.packaging_options.split(',')[0] : '1 Pack');
  
  const origPrice = product.original_price ? parseFloat(product.original_price) : (product.mrp ? parseFloat(product.mrp) : null);
  const salePrice = product.sale_price ? parseFloat(product.sale_price) : (product.price ? parseFloat(product.price) : null);
  
  // Calculate discount if old price exists and > sale price
  let discountPercent = 0;
  if (origPrice && salePrice && origPrice > salePrice) {
    discountPercent = Math.round((1 - (salePrice / origPrice)) * 100);
  }

  const priceHTML = (salePrice || origPrice) ? `
    <div class="product-card-pricing" style="margin-top:10px; margin-bottom:12px; display:flex; align-items:baseline; gap:8px; flex-wrap:wrap;">
      ${salePrice ? `<span style="font-size:1.4rem; font-weight:800; color:var(--charcoal);">₹${salePrice.toLocaleString('en-IN')}</span>` : ''}
      ${origPrice && origPrice > salePrice ? `<span style="font-size:1rem; color:var(--charcoal-muted); text-decoration:line-through;">₹${origPrice.toLocaleString('en-IN')}</span>` : ''}
    </div>
  ` : '';

  let stockBadge = '';
  if (product.availability === 'Out of Stock') {
    stockBadge = `<span style="color:#d32f2f; font-size:12px; font-weight:bold;">Out of Stock</span>`;
  } else {
    stockBadge = `<span style="color:var(--success); font-size:12px; font-weight:bold;">In Stock</span>`;
  }

  // Use the ID to track cart
  const prodId = product.id || product.name.toLowerCase().replace(/[^a-z0-9]/g, '-');
  const cartItem = getCart().find(item => String(item.id) === String(prodId));

  // Determine Add to cart vs Qty Selector
  let cartActions = '';
  if (product.availability === 'Out of Stock') {
     cartActions = `<button class="btn btn-sm" disabled style="opacity:0.5; width:100%; background:var(--charcoal-muted); color:white; font-weight:600; border-radius:6px; padding:10px;">Out of Stock</button>`;
  } else if (cartItem) {
     cartActions = `
       <div style="display:flex; align-items:center; justify-content:space-between; background:var(--white); border-radius:6px; border:2px solid var(--red); padding:4px;">
         <button class="qty-btn" data-id="${cartItem.id}" data-action="decrease" style="background:#fff; border:none; width:32px; height:32px; border-radius:4px; cursor:pointer; font-size:18px; display:flex; align-items:center; justify-content:center; color:var(--red); font-weight:bold;">-</button>
         <span style="font-weight:bold; font-size:16px; color:var(--charcoal);">${cartItem.quantity}</span>
         <button class="qty-btn" data-id="${cartItem.id}" data-action="increase" style="background:#fff; border:none; width:32px; height:32px; border-radius:4px; cursor:pointer; font-size:18px; display:flex; align-items:center; justify-content:center; color:var(--red); font-weight:bold;">+</button>
       </div>
     `;
  } else {
     cartActions = `<button class="btn btn-sm add-to-cart-btn" data-product='${encodeURIComponent(JSON.stringify(product))}' style="width:100%; background:white; color:var(--red); border:2px solid var(--red); font-weight:700; border-radius:6px; padding:8px; transition:all 0.2s;" onmouseover="this.style.background='var(--red)'; this.style.color='white';" onmouseout="this.style.background='white'; this.style.color='var(--red)';">Add to Cart</button>`;
  }

  return `
    <article class="product-card reveal hidden-reveal" style="background: white; border: 1px solid rgba(0,0,0,0.08); border-radius: 12px; padding: 20px; position: relative; transition: all 0.3s; display:flex; flex-direction:column; height: 100%;" onmouseover="this.style.boxShadow='0 12px 30px rgba(0,0,0,0.08)'; this.style.transform='translateY(-4px)';" onmouseout="this.style.boxShadow='none'; this.style.transform='translateY(0)';">
      <div class="product-card-image" style="position:relative; margin-bottom:16px;">
        ${discountPercent > 0 ? `
          <div style="position:absolute; top:10px; left:10px; background:var(--red); color:#fff; font-size:12px; font-weight:800; padding:4px 8px; border-radius:4px; z-index:2; box-shadow:0 2px 6px rgba(200,16,46,0.3);">
            -${discountPercent}%
          </div>
        ` : ''}
        <button style="position:absolute; top:10px; right:10px; background:rgba(255,255,255,0.9); border:none; border-radius:50%; width:32px; height:32px; display:flex; align-items:center; justify-content:center; z-index:2; cursor:pointer; box-shadow:0 2px 6px rgba(0,0,0,0.1);" title="Quick View">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--charcoal)" stroke-width="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>
        </button>
        <div style="width: 100%; aspect-ratio: 1; background: var(--cream); border-radius: 8px; display: flex; align-items: center; justify-content: center; overflow:hidden;">
          ${product.image_url ? `
            <img src="${product.image_url}" alt="${product.name}" loading="lazy" style="width:100%; height:100%; object-fit:cover;" />
          ` : `
            <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" opacity="0.3" color="var(--charcoal-light)"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>
          `}
        </div>
      </div>
      <div class="product-card-body" style="flex:1; display:flex; flex-direction:column;">
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:8px;">
            <span style="font-size:12px; color:var(--charcoal-muted); font-weight:600; text-transform:uppercase;">${product.category_name || product.category || 'Grocery'}</span>
            ${stockBadge}
        </div>
        <h3 class="product-card-title" style="font-size:1.1rem; font-weight:700; color:var(--charcoal); margin-bottom:8px; line-height:1.3; overflow:hidden; display:-webkit-box; -webkit-line-clamp:2; -webkit-box-orient:vertical;">${product.name}</h3>
        <div style="font-size:13px; color:var(--charcoal-muted); background:var(--ivory); display:inline-block; padding:2px 8px; border-radius:4px; margin-bottom:8px; align-self:flex-start; border:1px solid rgba(0,0,0,0.05);">Pack Size: ${packSize}</div>
        
        <div style="flex:1;"></div> <!-- Spacer to push pricing and buttons to bottom -->
        
        ${priceHTML}
        
      </div>
      <div class="product-card-footer" style="display:flex; flex-direction:column; gap:8px; margin-top:12px;">
        ${cartActions}
        <div style="display:flex; gap:8px;">
            <a href="#/cart" class="buy-now-btn" style="flex:1; text-align:center; background:var(--red); color:var(--charcoal); border:none; padding:8px; border-radius:6px; font-weight:700; font-size:14px; text-decoration:none; cursor:pointer; transition:opacity 0.2s;" onmouseover="this.style.opacity='0.9';" onmouseout="this.style.opacity='1';">Buy Now</a>
            <a href="https://wa.me/916284302338?text=I%20would%20like%20to%20order:%20${encodeURIComponent(product.name)}" target="_blank" style="flex:1; text-align:center; background:#25D366; color:white; border:none; padding:8px; border-radius:6px; font-weight:700; font-size:14px; text-decoration:none; display:flex; align-items:center; justify-content:center; gap:4px; cursor:pointer; transition:opacity 0.2s;" onmouseover="this.style.opacity='0.9';" onmouseout="this.style.opacity='1';"><svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z"/></svg> Order</a>
        </div>
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
      .filter-title { font-weight: 800; margin-bottom: 15px; font-size: 18px; color: var(--charcoal); border-bottom: 2px solid var(--red); padding-bottom: 10px; }
      .filter-list { list-style: none; padding: 0; margin: 0; }
      .filter-list li { margin-bottom: 12px; cursor: pointer; color: var(--charcoal-muted); font-size: 15px; transition: all 0.2s; }
      .filter-list li:hover { color: var(--red); font-weight: 600; padding-left: 5px; }
      .filter-list li.active { color: var(--red); font-weight: bold; }
      .products-layout { display: grid; grid-template-columns: 260px 1fr; gap: 40px; align-items: start; }
      .mobile-filter-btn { display: none; width: 100%; padding: 14px; background: var(--white); color: var(--charcoal); border: 1px solid var(--red); border-radius: 8px; font-size: 16px; font-weight: bold; cursor: pointer; align-items: center; justify-content: center; gap: 8px; transition: all 0.3s; margin-bottom: 20px;}
      .mobile-filter-btn:hover { background: var(--red); color: white; }
      @media (max-width: 991px) {
        .products-layout { grid-template-columns: 1fr; gap: 24px; }
        .sidebar { display: none; margin-top: 20px; }
        .sidebar.show { display: block; }
        .mobile-filter-btn { display: flex; }
      }
    </style>
    <!-- Page Hero - Now Smart Mart Minimal -->
    <section class="page-hero" style="min-height: 200px; padding-top: calc(var(--header-height) + 40px); background: var(--ivory); padding-bottom: 20px;">
      <div class="container">
        <h1 class="hero-title reveal" style="color: var(--charcoal); font-size: 2.5rem; margin-bottom: 10px;">Wholesale Products</h1>
        <p class="hero-subtitle reveal" style="color: var(--charcoal-muted); margin: 0; max-width: none;">Browse our extensive catalogue of premium wholesale goods.</p>
      </div>
    </section>

    <!-- Products Content -->
    <section class="products-page section">
      <div class="container products-layout">
        
        <!-- Sidebar Filters -->
        <div>
          <button id="mobile-filter-toggle" class="mobile-filter-btn">
             <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
             Search & Filter
          </button>
          <aside class="sidebar" id="products-sidebar">
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
        </div>

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
  
  const filterToggle = document.getElementById('mobile-filter-toggle');
  const sidebar = document.getElementById('products-sidebar');
  if (filterToggle && sidebar) {
      filterToggle.addEventListener('click', () => {
          sidebar.classList.toggle('show');
      });
  }
  
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
