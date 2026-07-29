import { API_BASE_URL } from '../config.js';
import { setUser, getAuthHeaders } from '../auth.js';

export function renderRegister() {
    return `
    <style>
        .auth-container { max-width: 450px; margin: 60px auto; padding: 40px; background: var(--forest-deep); border-radius: 12px; box-shadow: 0 10px 30px rgba(0,0,0,0.15); border: 1px solid rgba(197, 160, 89, 0.2); }
        .auth-title { text-align: center; color: var(--cream); margin-bottom: 24px; font-family: var(--font-heading); font-size: 28px; }
        .auth-form .form-group { margin-bottom: 20px; }
        .auth-form .row { display: flex; gap: 16px; }
        .auth-form .row .form-group { flex: 1; margin-bottom: 20px; }
        .auth-form label { display: block; margin-bottom: 8px; font-weight: 500; color: var(--cream); font-size: 14px; }
        .auth-form input { width: 100%; padding: 12px; background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1); border-radius: 6px; font-size: 16px; color: var(--cream); transition: all 0.3s ease; }
        .auth-form input:focus { border-color: var(--gold); outline: none; background: rgba(255,255,255,0.1); }
        .auth-form .btn { width: 100%; text-align: center; justify-content: center; margin-top: 10px; background: var(--gold); color: var(--forest-deep); font-weight: bold; border: none; }
        .auth-form .btn:hover { background: #d4af6a; }
        .auth-links { text-align: center; margin-top: 24px; font-size: 14px; color: rgba(249, 246, 240, 0.7); }
        .auth-links a { color: var(--gold); text-decoration: none; font-weight: 600; transition: color 0.3s ease; }
        .auth-links a:hover { color: var(--cream); }
        .auth-error { color: #ff8a80; background: rgba(211, 47, 47, 0.1); border: 1px solid rgba(211, 47, 47, 0.3); padding: 10px; border-radius: 6px; margin-bottom: 20px; display: none; font-size: 14px; text-align: center; }
    </style>
    <div style="min-height: calc(100vh - 200px); padding: 20px;">
        <div class="auth-container">
            <h2 class="auth-title">Create an Account</h2>
            <div id="register-error" class="auth-error"></div>
            <form id="register-form" class="auth-form">
                <div class="row">
                    <div class="form-group">
                        <label for="first_name">First Name</label>
                        <input type="text" id="first_name" name="first_name" required>
                    </div>
                    <div class="form-group">
                        <label for="last_name">Last Name</label>
                        <input type="text" id="last_name" name="last_name" required>
                    </div>
                </div>
                <div class="form-group">
                    <label for="username">Username</label>
                    <input type="text" id="username" name="username" required>
                </div>
                <div class="form-group">
                    <label for="email">Email Address</label>
                    <input type="email" id="email" name="email" required>
                </div>
                <div class="form-group">
                    <label for="password">Password</label>
                    <input type="password" id="password" name="password" minlength="8" required>
                </div>
                <button type="submit" class="btn btn-primary">Create Account</button>
            </form>
            <div class="auth-links">
                Already have an account? <a href="#/login">Sign In</a>
            </div>
        </div>
    </div>
    `;
}

export function initRegister() {
    const form = document.getElementById('register-form');
    const errorDiv = document.getElementById('register-error');

    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            errorDiv.style.display = 'none';
            const formData = new FormData(form);
            const data = Object.fromEntries(formData.entries());

            fetch(`${API_BASE_URL}/api/auth/register/`, {
                method: 'POST',
                headers: { 
                    'Content-Type': 'application/json',
                    ...getAuthHeaders()
                },
                credentials: 'include',
                body: JSON.stringify(data)
            })
            .then(async res => {
                const result = await res.json();
                if (!res.ok) {
                    // Extract first error message
                    const firstError = Object.values(result)[0];
                    const msg = Array.isArray(firstError) ? firstError[0] : firstError;
                    throw new Error(msg || 'Registration failed');
                }
                return result;
            })
            .then(data => {
                setUser(data.user);
                window.dispatchEvent(new Event('authStateChanged'));
                
                // Trigger toast on layout
                window.dispatchEvent(new CustomEvent('showToast', { detail: { message: 'Registered successfully', type: 'success' } }));
                window.location.hash = '#/account';
            })
            .catch(err => {
                errorDiv.textContent = err.message;
                errorDiv.style.display = 'block';
            });
        });
    }
}
