import { API_BASE_URL } from '../config.js';
import { setUser, getAuthHeaders } from '../auth.js';

export function renderLogin() {
    return `
    <style>
        .auth-container { max-width: 400px; margin: 60px auto; padding: 40px; background: var(--forest-deep); border-radius: 12px; box-shadow: 0 10px 30px rgba(0,0,0,0.15); border: 1px solid rgba(197, 160, 89, 0.2); }
        .auth-title { text-align: center; color: var(--cream); margin-bottom: 24px; font-family: var(--font-heading); font-size: 28px; }
        .auth-form .form-group { margin-bottom: 20px; }
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
            <h2 class="auth-title">Welcome Back</h2>
            <div id="login-error" class="auth-error"></div>
            <form id="login-form" class="auth-form">
                <div class="form-group">
                    <label for="username">Username</label>
                    <input type="text" id="username" name="username" required>
                </div>
                <div class="form-group">
                    <label for="password">Password</label>
                    <input type="password" id="password" name="password" required>
                </div>
                <button type="submit" class="btn btn-primary">Sign In</button>
            </form>
            <div class="auth-links">
                <a href="#/forgot-password" style="display:block; margin-bottom:10px;">Forgot Password?</a>
                Don't have an account? <a href="#/register">Create one</a>
            </div>
        </div>
    </div>
    `;
}

export function initLogin() {
    const form = document.getElementById('login-form');
    const errorDiv = document.getElementById('login-error');

    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            errorDiv.style.display = 'none';
            const formData = new FormData(form);
            const data = Object.fromEntries(formData.entries());

            fetch(`${API_BASE_URL}/api/auth/login/`, {
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
                if (!res.ok) throw new Error(result.error || 'Login failed');
                return result;
            })
            .then(data => {
                setUser(data.user);
                window.dispatchEvent(new Event('authStateChanged'));
                window.location.hash = '#/account';
                window.dispatchEvent(new CustomEvent('showToast', { detail: { message: 'Logged in successfully', type: 'success' } }));
            })
            .catch(err => {
                errorDiv.textContent = err.message;
                errorDiv.style.display = 'block';
            });
        });
    }
}
