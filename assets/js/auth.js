/**
 * SMASH & SPIN - Real Player Authentication & Session Management Module
 * Production-ready client-side secure auth with Web Crypto SHA-256 salted hashing,
 * account registration, persistent/session storage, protected route guarding & profile sync.
 */

(function(window) {
  'use strict';

  const STORAGE_USERS_KEY = 'smash_spin_users';
  const STORAGE_SESSION_KEY = 'smash_spin_session';

  // Validation Regular Expressions
  const REGEX_NAME = /^[a-zA-Z\s]{2,50}$/;
  const REGEX_EMAIL = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const REGEX_PHONE = /^[0-9+\-\s()]{7,18}$/;

  /**
   * Cryptographically secure salt generator using Web Crypto API
   */
  async function generateSalt() {
    const array = new Uint8Array(16);
    window.crypto.getRandomValues(array);
    return Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('');
  }

  /**
   * Secure salted SHA-256 password hashing via Web Cryptography API (SubtleCrypto)
   * Plain text passwords are NEVER stored in localStorage or exposed anywhere.
   */
  async function hashPassword(password, salt) {
    const encoder = new TextEncoder();
    const data = encoder.encode(password + '::' + salt);
    const hashBuffer = await window.crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  }

  /**
   * Safe storage retriever for registered users
   */
  function getUsers() {
    try {
      const raw = localStorage.getItem(STORAGE_USERS_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch (err) {
      console.error('Error retrieving users from storage:', err);
      return [];
    }
  }

  /**
   * Safe storage updater for registered users
   */
  function saveUsers(users) {
    try {
      localStorage.setItem(STORAGE_USERS_KEY, JSON.stringify(users));
    } catch (err) {
      console.error('Error saving users to storage:', err);
    }
  }

  /**
   * Generate a unique Player ID
   */
  function generatePlayerId() {
    return 'SSP-' + Math.floor(10000 + Math.random() * 90000);
  }

  const Auth = {
    /**
     * Check if a valid session exists in sessionStorage or localStorage
     */
    getSession() {
      try {
        let raw = sessionStorage.getItem(STORAGE_SESSION_KEY);
        if (!raw) {
          raw = localStorage.getItem(STORAGE_SESSION_KEY);
        }
        if (!raw) return null;

        const session = JSON.parse(raw);
        if (session && session.expiresAt && Date.now() < session.expiresAt) {
          return session;
        }

        // Expired session cleanup
        this.clearSession();
        return null;
      } catch (e) {
        this.clearSession();
        return null;
      }
    },

    /**
     * Check if user is currently authenticated
     */
    isAuthenticated() {
      return this.getSession() !== null;
    },

    /**
     * Get the currently authenticated player profile (safe copy without secrets)
     */
    getCurrentUser() {
      const session = this.getSession();
      if (!session) return null;

      const users = getUsers();
      const user = users.find(u => u.id === session.userId || u.email.toLowerCase() === session.email.toLowerCase());
      if (!user) {
        // Fallback to session basic data if user record was pruned
        return {
          id: session.userId,
          name: session.name,
          email: session.email,
          phone: '',
          tier: 'Premium Member',
          playerId: '#' + session.userId
        };
      }

      return {
        id: user.id,
        name: user.name,
        email: user.email,
        phone: user.phone || '',
        tier: user.tier || 'Premium Member',
        playerId: user.playerId || '#' + user.id,
        createdAt: user.createdAt
      };
    },

    /**
     * Register a new player account with full field validation and secure salted hashing
     */
    async register({ name, email, phone, password, confirmPassword, termsAgreed }) {
      // 1. Validate Full Name
      const trimmedName = (name || '').trim();
      if (!trimmedName || !REGEX_NAME.test(trimmedName)) {
        return {
          success: false,
          field: 'name',
          error: 'Full Name must contain letters and spaces only (min 2 characters).'
        };
      }

      // 2. Validate Phone Number
      const trimmedPhone = (phone || '').trim();
      if (!trimmedPhone || !REGEX_PHONE.test(trimmedPhone)) {
        return {
          success: false,
          field: 'phone',
          error: 'Please enter a valid phone number (min 7 digits).'
        };
      }

      // 3. Validate Email Address
      const trimmedEmail = (email || '').trim().toLowerCase();
      if (!trimmedEmail || !REGEX_EMAIL.test(trimmedEmail)) {
        return {
          success: false,
          field: 'email',
          error: 'Please enter a valid email address (e.g. player@example.com).'
        };
      }

      // 4. Validate Password Length
      if (!password || password.length < 6) {
        return {
          success: false,
          field: 'password',
          error: 'Password must be at least 6 characters long.'
        };
      }

      // 5. Validate Password Confirmation Match
      if (password !== confirmPassword) {
        return {
          success: false,
          field: 'confirmPassword',
          error: 'Passwords do not match. Please re-enter.'
        };
      }

      // 6. Validate Terms Agreement
      if (!termsAgreed) {
        return {
          success: false,
          field: 'terms',
          error: 'You must agree to the Terms of Service and Privacy Policy.'
        };
      }

      // 7. Check for Duplicate Email (case-insensitive)
      const users = getUsers();
      const existingUser = users.find(u => u.email.toLowerCase() === trimmedEmail);
      if (existingUser) {
        return {
          success: false,
          field: 'email',
          error: 'An account with this email address already exists. Please sign in or use another email.'
        };
      }

      // 8. Generate Salt & Hash Password Securely
      const salt = await generateSalt();
      const passwordHash = await hashPassword(password, salt);
      const pid = generatePlayerId();

      const newUser = {
        id: pid,
        name: trimmedName,
        email: trimmedEmail,
        phone: trimmedPhone,
        passwordHash: passwordHash,
        salt: salt,
        tier: 'Premium Member',
        playerId: '#' + pid,
        createdAt: new Date().toISOString()
      };

      users.push(newUser);
      saveUsers(users);

      return {
        success: true,
        user: {
          id: newUser.id,
          name: newUser.name,
          email: newUser.email,
          phone: newUser.phone,
          playerId: newUser.playerId
        }
      };
    },

    /**
     * Authenticate player with email and password
     */
    async login({ email, password, rememberMe = true }) {
      const trimmedEmail = (email || '').trim().toLowerCase();
      if (!trimmedEmail || !REGEX_EMAIL.test(trimmedEmail)) {
        return {
          success: false,
          field: 'email',
          error: 'Please enter a valid email address.'
        };
      }

      if (!password) {
        return {
          success: false,
          field: 'password',
          error: 'Password is required.'
        };
      }

      const users = getUsers();
      const user = users.find(u => u.email.toLowerCase() === trimmedEmail);

      // Check 1: User existence
      if (!user) {
        return {
          success: false,
          field: 'email',
          error: 'No account found with this email address.'
        };
      }

      // Check 2: Password verification via salted SHA-256 hash comparison
      const computedHash = await hashPassword(password, user.salt);
      if (computedHash !== user.passwordHash) {
        return {
          success: false,
          field: 'password',
          error: 'Incorrect password. Please try again.'
        };
      }

      // Create authenticated session
      const token = 'ssp_tok_' + Math.random().toString(36).substring(2, 12) + Date.now().toString(36);
      const expiresAt = rememberMe
        ? Date.now() + 30 * 24 * 60 * 60 * 1000 // 30 days
        : Date.now() + 24 * 60 * 60 * 1000;      // 24 hours

      const session = {
        token: token,
        userId: user.id,
        email: user.email,
        name: user.name,
        expiresAt: expiresAt,
        rememberMe: Boolean(rememberMe)
      };

      // Clear any prior sessions
      this.clearSession();

      if (rememberMe) {
        localStorage.setItem(STORAGE_SESSION_KEY, JSON.stringify(session));
      } else {
        sessionStorage.setItem(STORAGE_SESSION_KEY, JSON.stringify(session));
      }

      return {
        success: true,
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          phone: user.phone,
          playerId: user.playerId || '#' + user.id
        }
      };
    },

    /**
     * Invalidate active session and logout
     */
    logout() {
      this.clearSession();
      window.location.href = 'login.html?logged_out=1';
    },

    /**
     * Clear all session tokens from storage
     */
    clearSession() {
      try {
        localStorage.removeItem(STORAGE_SESSION_KEY);
        sessionStorage.removeItem(STORAGE_SESSION_KEY);
      } catch (e) {
        console.error('Error clearing session:', e);
      }
    },

    /**
     * Update current authenticated user profile
     */
    updateProfile(updates) {
      const session = this.getSession();
      if (!session) return false;

      const users = getUsers();
      const index = users.findIndex(u => u.id === session.userId || u.email.toLowerCase() === session.email.toLowerCase());
      if (index === -1) return false;

      if (updates.name && updates.name.trim()) {
        users[index].name = updates.name.trim();
        session.name = updates.name.trim();
      }
      if (updates.phone && updates.phone.trim()) {
        users[index].phone = updates.phone.trim();
      }
      if (updates.tier) {
        users[index].tier = updates.tier;
      }

      saveUsers(users);

      // Resave updated session
      if (localStorage.getItem(STORAGE_SESSION_KEY)) {
        localStorage.setItem(STORAGE_SESSION_KEY, JSON.stringify(session));
      } else {
        sessionStorage.setItem(STORAGE_SESSION_KEY, JSON.stringify(session));
      }

      return true;
    },

    /**
     * Guard protected routes (e.g. dashboard.html)
     * If unauthenticated, redirect immediately to login.html with return destination
     */
    requireAuth(redirectUrl = 'dashboard.html') {
      if (!this.isAuthenticated()) {
        const target = encodeURIComponent(redirectUrl);
        window.location.replace(`login.html?redirect=${target}&auth_required=1`);
        return false;
      }
      return true;
    },

    /**
     * Update public navbars across pages based on auth status
     */
    syncNavbarState() {
      const user = this.getCurrentUser();
      const navControls = document.querySelector('.nav-controls');
      if (!navControls) return;

      const loginBtn = navControls.querySelector('a[href="login.html"]');
      const signupBtn = navControls.querySelector('a[href="register.html"]');

      if (user) {
        if (loginBtn) {
          loginBtn.href = 'dashboard.html';
          loginBtn.className = 'btn btn-outline-dark btn-sm nav-auth-btn';
          loginBtn.innerHTML = '<span>Dashboard</span> <i class="bi bi-person-badge-fill"></i>';
        }
        if (signupBtn) {
          signupBtn.href = '#';
          signupBtn.className = 'btn btn-primary btn-sm nav-auth-btn';
          signupBtn.innerHTML = '<span>Sign Out</span> <i class="bi bi-box-arrow-right"></i>';
          signupBtn.onclick = (e) => {
            e.preventDefault();
            Auth.logout();
          };
        }
      }
    }
  };

  // Expose Auth globally
  window.Auth = Auth;

  // Auto-sync navbar on DOM ready if present
  document.addEventListener('DOMContentLoaded', () => {
    Auth.syncNavbarState();
  });

})(window);
