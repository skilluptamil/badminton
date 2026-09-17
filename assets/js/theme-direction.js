/**
 * SMASH & SPIN - Theme (Dark/Light) & Direction (LTR/RTL) Manager
 * Production-ready switcher with persistent localStorage state
 */

(function() {
  'use strict';

  // State keys
  const THEME_KEY = 'smash_spin_theme';
  const DIR_KEY = 'smash_spin_direction';

  // 1. Theme Management (Dark / Light)
  function initTheme() {
    const savedTheme = localStorage.getItem(THEME_KEY) || 'light';
    applyTheme(savedTheme);
  }

  function applyTheme(theme) {
    if (theme === 'dark') {
      document.documentElement.setAttribute('data-theme', 'dark');
      document.documentElement.setAttribute('data-bs-theme', 'dark');
      document.documentElement.style.colorScheme = 'dark';
      localStorage.setItem(THEME_KEY, 'dark');
    } else {
      document.documentElement.removeAttribute('data-theme');
      document.documentElement.setAttribute('data-bs-theme', 'light');
      document.documentElement.style.colorScheme = 'light';
      localStorage.setItem(THEME_KEY, 'light');
    }
    updateThemeIcons(theme);
  }

  function toggleTheme() {
    const currentTheme = localStorage.getItem(THEME_KEY) || 'light';
    const nextTheme = currentTheme === 'dark' ? 'light' : 'dark';
    applyTheme(nextTheme);
  }

  function updateThemeIcons(theme) {
    const themeToggles = document.querySelectorAll('.theme-toggle-btn');
    themeToggles.forEach(btn => {
      const icon = btn.querySelector('i');
      if (icon) {
        if (theme === 'dark') {
          icon.className = 'bi bi-sun-fill text-warning';
          btn.setAttribute('title', 'Switch to Light Mode');
          btn.setAttribute('aria-label', 'Switch to Light Mode');
        } else {
          icon.className = 'bi bi-moon-stars-fill';
          btn.setAttribute('title', 'Switch to Dark Mode');
          btn.setAttribute('aria-label', 'Switch to Dark Mode');
        }
      }
    });
  }

  // 2. Direction Management (LTR / RTL)
  function initDirection() {
    const savedDir = localStorage.getItem(DIR_KEY) || 'ltr';
    applyDirection(savedDir);
  }

  function applyDirection(dir) {
    if (dir === 'rtl') {
      document.documentElement.setAttribute('dir', 'rtl');
      document.documentElement.setAttribute('lang', 'ar');
      localStorage.setItem(DIR_KEY, 'rtl');
    } else {
      document.documentElement.setAttribute('dir', 'ltr');
      document.documentElement.setAttribute('lang', 'en');
      localStorage.setItem(DIR_KEY, 'ltr');
    }
    updateDirectionIcons(dir);
  }

  function toggleDirection() {
    const currentDir = localStorage.getItem(DIR_KEY) || 'ltr';
    const nextDir = currentDir === 'rtl' ? 'ltr' : 'rtl';
    applyDirection(nextDir);
  }

  function updateDirectionIcons(dir) {
    const dirToggles = document.querySelectorAll('.dir-toggle-btn');
    dirToggles.forEach(btn => {
      btn.setAttribute('title', dir === 'rtl' ? 'Switch to LTR Mode' : 'Switch to RTL Mode');
      btn.setAttribute('aria-label', dir === 'rtl' ? 'Switch to LTR Mode' : 'Switch to RTL Mode');
    });
  }

  // Expose global methods
  window.SmashSpinTheme = {
    toggleTheme,
    toggleDirection,
    applyTheme,
    applyDirection
  };

  // Immediate init on parse
  initTheme();
  initDirection();

  // Attach event listeners when DOM is loaded
  document.addEventListener('DOMContentLoaded', () => {
    // Theme toggle buttons
    const themeBtns = document.querySelectorAll('.theme-toggle-btn');
    themeBtns.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        toggleTheme();
      });
    });

    // RTL toggle buttons
    const dirBtns = document.querySelectorAll('.dir-toggle-btn');
    dirBtns.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        toggleDirection();
      });
    });

    // Update icons on load
    const currentTheme = localStorage.getItem(THEME_KEY) || 'light';
    const currentDir = localStorage.getItem(DIR_KEY) || 'ltr';
    updateThemeIcons(currentTheme);
    updateDirectionIcons(currentDir);
  });
})();
