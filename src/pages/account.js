import { API_BASE_URL } from '../config.js';
import { getAuthHeaders, isAuthenticated } from '../auth.js';

export function renderAccount() {
  return `
    <style>
        .account-container { padding: 40px 20px; max-width: 1000px; margin: 0 auto; min-height: 500px; }
        .account-header { margin-bottom: 30px; border-bottom: 2px solid var(--gold); padding-bottom: 10px; }
        .order-card { background: #fff; border: 1px solid #ddd; border-radius: 8px; padding: 20px; margin-bottom: 16px; box-shadow: 0 2px 4px rgba(0,0,0,0.05); }
        .order-card-header { display: flex; justify-content: space-between; margin-bottom: 12px; border-bottom: 1px solid #eee; padding-bottom: 8px; }
        .status-badge { padding: 4px 8px; border-radius: 4px; font-size: 12px; font-weight: bold; }
        .status-pending { background: #fff3e0; color: #e65100; }
        .status-confirmed { background: #e3f2fd; color: #1976d2; }
        .status-delivered { background: #e8f5e9; color: #2e7d32; }
        .status-cancelled { background: #ffebee; color: #d32f2f; }
        .nav-tabs { display: flex; gap: 20px; margin-bottom: 20px; }
        .nav-tab { background: none; border: none; font-size: 16px; font-weight: bold; color: var(--charcoal-muted); cursor: pointer; padding-bottom: 5px; }
        .nav-tab.active { color: var(--forest-deep); border-bottom: 2px solid var(--forest-deep); }
    </style>
    <!-- Page Hero -->
    <section class="page-hero" style="min-height: 250px;">
      <div class="hero-bg">
        <img src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=1600" alt="My Account" style="width:100%; height:100%; object-fit:cover;" />
      </div>
      <div class="hero-overlay"></div>
      <div class="hero-content" style="padding-top: 100px;">
        <h1 class="hero-title reveal">My Account</h1>
      </div>
    </section>

    <div class="account-container">
        <div class="nav-tabs" id="account-tabs">
            <button class="nav-tab active" data-tab="orders">Order History</button>
            <button class="nav-tab" data-tab="profile">Profile Details</button>
            <button class="nav-tab" data-tab="addresses">Saved Addresses</button>
        </div>
        
        <div id="account-content">
            <p>Loading...</p>
        </div>
    </div>
  `;
}

export function initAccount() {
    if (!isAuthenticated()) {
        window.location.hash = '#/login';
        return;
    }

    const content = document.getElementById('account-content');
    const tabs = document.querySelectorAll('#account-tabs .nav-tab');

    function switchTab(tabId) {
        tabs.forEach(t => t.classList.remove('active'));
        document.querySelector(`.nav-tab[data-tab="${tabId}"]`).classList.add('active');
        content.innerHTML = '<p>Loading...</p>';

        if (tabId === 'orders') {
            loadOrders();
        } else if (tabId === 'profile') {
            loadProfile();
        } else if (tabId === 'addresses') {
            content.innerHTML = `<div style="background:#fff; padding:30px; border-radius:8px; border:1px solid #ddd; text-align:center;">
                <h3 style="color:var(--forest-deep); margin-bottom:10px;">Address Management</h3>
                <p style="color:var(--charcoal-muted);">This feature will be fully implemented in a future phase.</p>
            </div>`;
        }
    }

    tabs.forEach(tab => {
        tab.addEventListener('click', (e) => {
            switchTab(e.target.dataset.tab);
        });
    });

    function loadOrders() {
        fetch(`${API_BASE_URL}/api/orders/`, {
            headers: getAuthHeaders(),
            credentials: 'include'
        })
        .then(res => {
            if (!res.ok) throw new Error("Please log in to view your account.");
            return res.json();
        })
        .then(data => {
            const orders = data.results !== undefined ? data.results : data;
            
            if (orders.length === 0) {
                content.innerHTML = `<p>You have no past orders.</p>`;
                return;
            }

            const ordersHtml = orders.map(order => {
                let statusClass = 'status-pending';
                if (['CONFIRMED', 'PROCESSING', 'SHIPPED'].includes(order.status)) statusClass = 'status-confirmed';
                if (order.status === 'DELIVERED') statusClass = 'status-delivered';
                if (['CANCELLED', 'RETURNED', 'REFUNDED'].includes(order.status)) statusClass = 'status-cancelled';

                return `
                    <div class="order-card">
                        <div class="order-card-header">
                            <div>
                                <strong>Order #${order.order_id}</strong>
                                <div style="font-size:12px; color:#666;">${new Date(order.created_at).toLocaleDateString()}</div>
                            </div>
                            <div style="text-align:right;">
                                <span class="status-badge ${statusClass}">${order.status}</span>
                                <div style="font-size:14px; font-weight:bold; margin-top:4px;">₹${parseFloat(order.total_amount).toLocaleString('en-IN')}</div>
                            </div>
                        </div>
                        <div style="font-size:14px;">
                            ${order.items.map(i => `
                                <div style="display:flex; justify-content:space-between; margin-bottom:4px;">
                                    <span>${i.quantity}x ${i.product_name}</span>
                                    <span>₹${parseFloat(i.price).toLocaleString('en-IN')}</span>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                `;
            }).join('');

            content.innerHTML = ordersHtml;
        })
        .catch(err => {
            content.innerHTML = `
                <div style="background:#fff3e0; color:#e65100; padding:20px; border-radius:8px;">
                    <strong>Notice:</strong> ${err.message}
                </div>
            `;
        });
    }

    function loadProfile() {
        fetch(`${API_BASE_URL}/api/auth/profile/`, {
            headers: getAuthHeaders(),
            credentials: 'include'
        })
        .then(res => {
            if (!res.ok) throw new Error("Failed to load profile.");
            return res.json();
        })
        .then(user => {
            const p = user.profile || {};
            content.innerHTML = `
                <div style="background:#fff; border: 1px solid #ddd; border-radius: 8px; padding: 30px;">
                    <h3 style="color:var(--forest-deep); margin-bottom: 20px; border-bottom: 1px solid #eee; padding-bottom: 10px;">Personal Information</h3>
                    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
                        <div>
                            <strong style="color:var(--charcoal-muted); font-size:12px; text-transform:uppercase;">Name</strong>
                            <div style="font-size:16px; margin-top:4px;">${user.first_name || ''} ${user.last_name || ''}</div>
                        </div>
                        <div>
                            <strong style="color:var(--charcoal-muted); font-size:12px; text-transform:uppercase;">Email</strong>
                            <div style="font-size:16px; margin-top:4px;">${user.email || user.username}</div>
                        </div>
                        <div>
                            <strong style="color:var(--charcoal-muted); font-size:12px; text-transform:uppercase;">Phone Number</strong>
                            <div style="font-size:16px; margin-top:4px;">${p.phone_number || 'Not provided'}</div>
                        </div>
                        <div>
                            <strong style="color:var(--charcoal-muted); font-size:12px; text-transform:uppercase;">Gender</strong>
                            <div style="font-size:16px; margin-top:4px;">${p.gender === 'M' ? 'Male' : p.gender === 'F' ? 'Female' : p.gender === 'O' ? 'Other' : 'Prefer not to say'}</div>
                        </div>
                    </div>
                </div>
            `;
        })
        .catch(err => {
            content.innerHTML = `<p style="color:red;">Error: ${err.message}</p>`;
        });
    }

    // Load default tab
    switchTab('orders');
}
