const form = document.getElementById('registerForm');
const message = document.getElementById('authMessage');

const authUtils = typeof window !== 'undefined' && window.authUtils ? window.authUtils : require('./auth-utils');

if (authUtils.getCurrentUser()) {
    window.location.href = 'dashboard.html';
}

form.addEventListener('submit', function (e) {
    e.preventDefault();

    const password = document.getElementById('password').value;
    const confirm = document.getElementById('confirmPassword').value;

    if (password !== confirm) {
        message.textContent = 'Passwords do not match.';
        message.style.color = '#dc2626';
        return;
    }

    const result = authUtils.registerUser({
        fullName: document.getElementById('fullname').value.trim(),
        email: document.getElementById('email').value.trim(),
        password
    });

    if (!result.success) {
        message.textContent = result.message;
        message.style.color = '#dc2626';
        return;
    }

    message.textContent = 'Account created successfully! Redirecting to dashboard...';
    message.style.color = '#16a34a';
    this.reset();
    setTimeout(() => {
        window.location.href = 'dashboard.html';
    }, 700);
});