import { API_BASE_URL } from '../config.js';
import { getAuthHeaders } from '../auth.js';

export function renderResetPassword() {
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
        .auth-msg { background: rgba(46, 125, 50, 0.1); color: #81c784; border: 1px solid rgba(46, 125, 50, 0.3); padding: 10px; border-radius: 6px; margin-bottom: 20px; display: none; font-size: 14px; text-align: center; }
        .auth-error { color: #ff8a80; background: rgba(211, 47, 47, 0.1); border: 1px solid rgba(211, 47, 47, 0.3); padding: 10px; border-radius: 6px; margin-bottom: 20px; display: none; font-size: 14px; text-align: center; }
    </style>
    <div style="min-height: calc(100vh - 200px); padding: 20px;">
        <div class="auth-container">
            <h2 class="auth-title">Set New Password</h2>
            <div id="rp-msg" class="auth-msg"></div>
            <div id="rp-error" class="auth-error"></div>
            <form id="rp-form" class="auth-form">
                <div class="form-group">
                    <label for="password">New Password</label>
                    <input type="password" id="password" name="password" minlength="8" required>
                </div>
                <button type="submit" class="btn btn-primary">Save New Password</button>
            </form>
        </div>
    </div>
    `;
}

export function initResetPassword() {
    const form = document.getElementById('rp-form');
    const msgDiv = document.getElementById('rp-msg');
    const errorDiv = document.getElementById('rp-error');

    // Extract uid and token from URL params
    const urlParams = new URLSearchParams(window.location.hash.split('?')[1]);
    const uid = urlParams.get('uid');
    const token = urlParams.get('token');

    if (!uid || !token) {
        errorDiv.textContent = "Invalid password reset link.";
        errorDiv.style.display = 'block';
        if (form) form.style.display = 'none';
        return;
    }

    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            msgDiv.style.display = 'none';
            errorDiv.style.display = 'none';
            
            const formData = new FormData(form);
            const data = {
                uid: uid,
                token: token,
                password: formData.get('password')
            };

            fetch(`${API_BASE_URL}/api/auth/password-reset/confirm/`, {
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
                if (!res.ok) throw new Error(result.error || 'Failed to reset password');
                return result;
            })
            .then(data => {
                msgDiv.innerHTML = `${data.message} <a href="#/login" style="color:var(--forest-deep); font-weight:bold; text-decoration:underline;">Click here to Login</a>.`;
                msgDiv.style.display = 'block';
                form.style.display = 'none';
            })
            .catch(err => {
                errorDiv.textContent = err.message;
                errorDiv.style.display = 'block';
            });
        });
    }
}
