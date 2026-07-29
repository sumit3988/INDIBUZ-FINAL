import { API_BASE_URL } from '../config.js';
import { getAuthHeaders } from '../auth.js';

export function renderForgotPassword() {
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
        .auth-msg { background: rgba(46, 125, 50, 0.1); color: #81c784; border: 1px solid rgba(46, 125, 50, 0.3); padding: 10px; border-radius: 6px; margin-bottom: 20px; display: none; font-size: 14px; text-align: center; }
        .auth-error { color: #ff8a80; background: rgba(211, 47, 47, 0.1); border: 1px solid rgba(211, 47, 47, 0.3); padding: 10px; border-radius: 6px; margin-bottom: 20px; display: none; font-size: 14px; text-align: center; }
    </style>
    <div style="min-height: calc(100vh - 200px); padding: 20px;">
        <div class="auth-container">
            <h2 class="auth-title">Reset Password</h2>
            <div id="fp-msg" class="auth-msg"></div>
            <div id="fp-error" class="auth-error"></div>
            <form id="fp-form" class="auth-form">
                <div class="form-group">
                    <label for="email">Enter your email address</label>
                    <input type="email" id="email" name="email" required>
                </div>
                <button type="submit" class="btn btn-primary">Send Reset Link</button>
            </form>
            <div class="auth-links">
                Remember your password? <a href="#/login">Sign In</a>
            </div>
        </div>
    </div>
    `;
}

export function initForgotPassword() {
    const form = document.getElementById('fp-form');
    const msgDiv = document.getElementById('fp-msg');
    const errorDiv = document.getElementById('fp-error');

    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            msgDiv.style.display = 'none';
            errorDiv.style.display = 'none';
            
            const formData = new FormData(form);
            const data = Object.fromEntries(formData.entries());

            fetch(`${API_BASE_URL}/api/auth/password-reset/`, {
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
                if (!res.ok) throw new Error(result.error || 'Failed to send request');
                return result;
            })
            .then(data => {
                msgDiv.textContent = data.message;
                msgDiv.style.display = 'block';
                form.reset();
            })
            .catch(err => {
                errorDiv.textContent = err.message;
                errorDiv.style.display = 'block';
            });
        });
    }
}
