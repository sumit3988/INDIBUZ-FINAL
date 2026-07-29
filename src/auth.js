import { API_BASE_URL } from './config.js';

export const USER_INFO_KEY = 'indibuz_user';

export function getCsrfToken() {
    let csrfToken = null;
    if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            if (cookie.substring(0, 10) === 'csrftoken=') {
                csrfToken = decodeURIComponent(cookie.substring(10));
                break;
            }
        }
    }
    return csrfToken;
}

export async function fetchCsrfToken() {
    try {
        await fetch(`${API_BASE_URL}/api/auth/csrf/`, { credentials: 'include' });
    } catch (e) {
        console.error("Could not fetch CSRF token", e);
    }
}

export function getAuthHeaders() {
    const headers = {};
    const csrf = getCsrfToken();
    if (csrf) {
        headers['X-CSRFToken'] = csrf;
    }
    return headers;
}

export function getUser() {
    try {
        return JSON.parse(localStorage.getItem(USER_INFO_KEY));
    } catch {
        return null;
    }
}

export function setUser(user) {
    if (user) {
        localStorage.setItem(USER_INFO_KEY, JSON.stringify(user));
    } else {
        localStorage.removeItem(USER_INFO_KEY);
    }
}

export function isAuthenticated() {
    return !!getUser();
}

export async function logout() {
    try {
        await fetch(`${API_BASE_URL}/api/auth/logout/`, {
            method: 'POST',
            headers: getAuthHeaders(),
            credentials: 'include'
        });
    } catch (err) {
        console.error(err);
    }
    setUser(null);
    window.dispatchEvent(new Event('authStateChanged'));
    window.location.hash = '#/login';
}
