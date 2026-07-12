const form = document.getElementById('loginForm');
const message = document.getElementById('authMessage');

const authUtils = typeof window !== 'undefined' && window.authUtils ? window.authUtils : require('./auth-utils');

if (authUtils.getCurrentUser()) {
    window.location.href = 'dashboard.html';
}

form.addEventListener('submit', function (e) {
    e.preventDefault();

    const result = authUtils.loginUser({
        email: document.getElementById('email').value.trim(),
        password: document.getElementById('password').value
    });

    if (!result.success) {
        message.textContent = result.message;
        message.style.color = '#dc2626';
        return;
    }

    message.textContent = 'Login successful. Redirecting to dashboard...';
    message.style.color = '#16a34a';
    setTimeout(() => {
        window.location.href = 'dashboard.html';
    }, 600);
});