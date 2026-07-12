const STORAGE_KEYS = {
  users: 'dlg_users',
  currentUser: 'dlg_current_user'
};

function getStorage() {
  return typeof window !== 'undefined' && window.localStorage ? window.localStorage : global.localStorage;
}

function readUsers() {
  const storage = getStorage();
  const raw = storage.getItem(STORAGE_KEYS.users);
  if (!raw) return [];
  try {
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

function writeUsers(users) {
  getStorage().setItem(STORAGE_KEYS.users, JSON.stringify(users));
}

function registerUser({ fullName, email, password }) {
  const users = readUsers();
  const exists = users.some((user) => user.email.toLowerCase() === email.toLowerCase());

  if (exists) {
    return { success: false, message: 'An account with this email already exists.' };
  }

  const user = {
    id: Date.now().toString(),
    fullName,
    email: email.toLowerCase(),
    password
  };

  users.push(user);
  writeUsers(users);
  getStorage().setItem(STORAGE_KEYS.currentUser, JSON.stringify(user));

  return { success: true, user };
}

function loginUser({ email, password }) {
  const users = readUsers();
  const user = users.find((entry) => entry.email.toLowerCase() === email.toLowerCase());

  if (!user || user.password !== password) {
    return { success: false, message: 'Invalid email or password.' };
  }

  localStorage.setItem(STORAGE_KEYS.currentUser, JSON.stringify(user));
  return { success: true, user };
}

function getCurrentUser() {
  const storage = getStorage();
  const raw = storage.getItem(STORAGE_KEYS.currentUser);
  if (!raw) return null;
  try {
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

function clearSession() {
  const storage = getStorage();
  storage.removeItem(STORAGE_KEYS.currentUser);
  storage.removeItem(STORAGE_KEYS.users);
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    registerUser,
    loginUser,
    getCurrentUser,
    clearSession
  };
}

if (typeof window !== 'undefined') {
  window.authUtils = {
    registerUser,
    loginUser,
    getCurrentUser,
    clearSession
  };
}
