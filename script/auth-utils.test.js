const test = require('node:test');
const assert = require('node:assert/strict');

const storage = {};
global.localStorage = {
  getItem(key) {
    return Object.prototype.hasOwnProperty.call(storage, key) ? storage[key] : null;
  },
  setItem(key, value) {
    storage[key] = String(value);
  },
  removeItem(key) {
    delete storage[key];
  }
};

const { registerUser, loginUser, getCurrentUser, clearSession } = require('./auth-utils');

test('registers a new user and stores it', () => {
  clearSession();
  const result = registerUser({ fullName: 'Ada Lovelace', email: 'ada@example.com', password: 'secret123' });

  assert.equal(result.success, true);
  assert.equal(getCurrentUser()?.email, 'ada@example.com');
});

test('prevents duplicate emails', () => {
  const first = registerUser({ fullName: 'Ada Lovelace', email: 'ada@example.com', password: 'secret123' });
  const second = registerUser({ fullName: 'Grace Hopper', email: 'ada@example.com', password: 'anotherpass' });

  assert.equal(first.success, true);
  assert.equal(second.success, false);
  assert.match(second.message, /already exists/i);
});

test('logs in a valid user and rejects invalid credentials', () => {
  clearSession();
  registerUser({ fullName: 'Linus Torvalds', email: 'linus@example.com', password: 'securepass' });

  const valid = loginUser({ email: 'linus@example.com', password: 'securepass' });
  const invalid = loginUser({ email: 'linus@example.com', password: 'wrongpass' });

  assert.equal(valid.success, true);
  assert.equal(invalid.success, false);
});
