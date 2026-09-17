/**
 * SMASH & SPIN - Form Validation & Notification System
 * Robust validation for Contact, Login, Sign Up, Tournaments & Newsletters
 */

document.addEventListener('DOMContentLoaded', () => {
  // Regex Patterns
  const REGEX_NAME = /^[a-zA-Z\s]{2,50}$/;
  const REGEX_EMAIL = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const REGEX_PHONE = /^[0-9+\-\s()]{7,18}$/;

  // Toast Notification Trigger
  window.showToast = function(message, type = 'success') {
    let existingToast = document.querySelector('.toast-notification');
    if (existingToast) {
      existingToast.remove();
    }

    const toast = document.createElement('div');
    toast.className = `toast-notification ${type === 'error' ? 'bg-danger' : 'bg-dark'}`;
    const icon = type === 'error' ? 'bi-exclamation-circle-fill text-danger' : 'bi-check-circle-fill text-success';
    toast.innerHTML = `
      <i class="bi ${icon} fs-5"></i>
      <div>
        <div class="fw-bold">${type === 'error' ? 'Notice' : 'Success'}</div>
        <div class="small">${message}</div>
      </div>
    `;
    document.body.appendChild(toast);

    setTimeout(() => {
      toast.classList.add('show');
    }, 50);

    setTimeout(() => {
      toast.classList.remove('show');
      setTimeout(() => toast.remove(), 350);
    }, 4000);
  };

  // 1. Contact Form Validation
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const nameInput = document.getElementById('contactName');
      const emailInput = document.getElementById('contactEmail');
      const phoneInput = document.getElementById('contactPhone');
      const subjectInput = document.getElementById('contactSubject');
      const messageInput = document.getElementById('contactMessage');
      const alertBox = document.getElementById('contactAlert');

      let isValid = true;
      let errorMsg = '';

      // Validate Full Name (letters and spaces only)
      if (!nameInput.value.trim() || !REGEX_NAME.test(nameInput.value.trim())) {
        isValid = false;
        errorMsg = 'Full Name must contain letters and spaces only (min 2 characters).';
        nameInput.classList.add('is-invalid');
      } else {
        nameInput.classList.remove('is-invalid');
        nameInput.classList.add('is-valid');
      }

      // Validate Email
      if (isValid && (!emailInput.value.trim() || !REGEX_EMAIL.test(emailInput.value.trim()))) {
        isValid = false;
        errorMsg = 'Please enter a valid email address (e.g. player@example.com).';
        emailInput.classList.add('is-invalid');
      } else if (isValid) {
        emailInput.classList.remove('is-invalid');
        emailInput.classList.add('is-valid');
      }

      // Validate Phone (valid numbers and formatting characters)
      if (isValid && (!phoneInput.value.trim() || !REGEX_PHONE.test(phoneInput.value.trim()))) {
        isValid = false;
        errorMsg = 'Please enter a valid phone number (digits and formatting only).';
        phoneInput.classList.add('is-invalid');
      } else if (isValid) {
        phoneInput.classList.remove('is-invalid');
        phoneInput.classList.add('is-valid');
      }

      // Validate Subject
      if (isValid && (!subjectInput.value.trim() || subjectInput.value.trim().length < 3)) {
        isValid = false;
        errorMsg = 'Please provide a subject of at least 3 characters.';
        subjectInput.classList.add('is-invalid');
      } else if (isValid) {
        subjectInput.classList.remove('is-invalid');
        subjectInput.classList.add('is-valid');
      }

      // Validate Message
      if (isValid && (!messageInput.value.trim() || messageInput.value.trim().length < 10)) {
        isValid = false;
        errorMsg = 'Please provide a message with at least 10 characters.';
        messageInput.classList.add('is-invalid');
      } else if (isValid) {
        messageInput.classList.remove('is-invalid');
        messageInput.classList.add('is-valid');
      }

      if (!isValid) {
        if (alertBox) {
          alertBox.className = 'alert alert-danger mb-4';
          alertBox.innerHTML = `<i class="bi bi-exclamation-triangle-fill me-2"></i>${errorMsg}`;
          alertBox.classList.remove('d-none');
        }
        showToast(errorMsg, 'error');
        return;
      }

      // Successful submission
      if (alertBox) {
        alertBox.className = 'alert alert-success mb-4';
        alertBox.innerHTML = `<i class="bi bi-check-circle-fill me-2"></i>Thank you! Your message has been sent successfully. Our team will contact you shortly.`;
        alertBox.classList.remove('d-none');
      }
      showToast('Message Sent Successfully!');
      contactForm.reset();
      setTimeout(() => {
        contactForm.querySelectorAll('.is-valid').forEach(el => el.classList.remove('is-valid'));
      }, 3000);
    });
  }

  // 2. Real Player Login Validation & Authentication
  const loginForm = document.getElementById('loginForm');
  const loginAlertBox = document.getElementById('loginAlert');
  const loginEmailInput = document.getElementById('loginEmail');
  const loginPasswordInput = document.getElementById('loginPassword');
  const rememberMeInput = document.getElementById('rememberMe');

  // Check URL parameters for status banners on Login page
  if (loginForm && loginAlertBox) {
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('registered') === '1') {
      const emailParam = urlParams.get('email');
      if (emailParam && loginEmailInput) {
        loginEmailInput.value = decodeURIComponent(emailParam);
      }
      loginAlertBox.className = 'alert alert-success mb-4';
      loginAlertBox.innerHTML = `<i class="bi bi-check-circle-fill me-2"></i>Account created successfully! Enter your password to sign in.`;
      loginAlertBox.classList.remove('d-none');
    } else if (urlParams.get('auth_required') === '1') {
      loginAlertBox.className = 'alert alert-warning mb-4';
      loginAlertBox.innerHTML = `<i class="bi bi-shield-lock-fill me-2"></i>Please sign in to access your Player Dashboard.`;
      loginAlertBox.classList.remove('d-none');
    } else if (urlParams.get('logged_out') === '1') {
      loginAlertBox.className = 'alert alert-info mb-4';
      loginAlertBox.innerHTML = `<i class="bi bi-info-circle-fill me-2"></i>You have been signed out successfully.`;
      loginAlertBox.classList.remove('d-none');
    }

    loginForm.addEventListener('submit', async (e) => {
      e.preventDefault();

      const email = loginEmailInput.value.trim();
      const password = loginPasswordInput.value;
      const rememberMe = rememberMeInput ? rememberMeInput.checked : true;

      // Reset validation states
      loginEmailInput.classList.remove('is-invalid', 'is-valid');
      loginPasswordInput.classList.remove('is-invalid', 'is-valid');

      let isValid = true;
      let errorMsg = '';

      if (!email || !REGEX_EMAIL.test(email)) {
        isValid = false;
        errorMsg = 'Please enter a valid email address.';
        loginEmailInput.classList.add('is-invalid');
      } else {
        loginEmailInput.classList.add('is-valid');
      }

      if (isValid && !password) {
        isValid = false;
        errorMsg = 'Password is required.';
        loginPasswordInput.classList.add('is-invalid');
      }

      if (!isValid) {
        loginAlertBox.className = 'alert alert-danger mb-4';
        loginAlertBox.innerHTML = `<i class="bi bi-exclamation-triangle-fill me-2"></i>${errorMsg}`;
        loginAlertBox.classList.remove('d-none');
        showToast(errorMsg, 'error');
        return;
      }

      // Execute Real Authentication against registered accounts
      if (typeof Auth !== 'undefined') {
        const result = await Auth.login({ email, password, rememberMe });
        if (!result.success) {
          loginAlertBox.className = 'alert alert-danger mb-4';
          loginAlertBox.innerHTML = `<i class="bi bi-exclamation-circle-fill me-2"></i>${result.error}`;
          loginAlertBox.classList.remove('d-none');

          if (result.field === 'email') {
            loginEmailInput.classList.remove('is-valid');
            loginEmailInput.classList.add('is-invalid');
          } else if (result.field === 'password') {
            loginPasswordInput.classList.remove('is-valid');
            loginPasswordInput.classList.add('is-invalid');
          }

          showToast(result.error, 'error');
          return;
        }

        // Login Succeeded
        loginEmailInput.classList.remove('is-invalid');
        loginEmailInput.classList.add('is-valid');
        loginPasswordInput.classList.remove('is-invalid');
        loginPasswordInput.classList.add('is-valid');

        loginAlertBox.className = 'alert alert-success mb-4';
        loginAlertBox.innerHTML = `<i class="bi bi-check-circle-fill me-2"></i>Login successful! Redirecting to Player Dashboard...`;
        loginAlertBox.classList.remove('d-none');
        showToast(`Welcome back, ${result.user.name}! Redirecting...`);

        const redirectParam = urlParams.get('redirect');
        const targetUrl = redirectParam ? decodeURIComponent(redirectParam) : 'dashboard.html';

        setTimeout(() => {
          window.location.href = targetUrl;
        }, 800);
      }
    });
  }

  // 3. Real Player Registration Validation & Account Creation
  const registerForm = document.getElementById('registerForm');
  if (registerForm) {
    registerForm.addEventListener('submit', async (e) => {
      e.preventDefault();

      const nameInput = document.getElementById('regName');
      const emailInput = document.getElementById('regEmail');
      const phoneInput = document.getElementById('regPhone');
      const passwordInput = document.getElementById('regPassword');
      const confirmPasswordInput = document.getElementById('regConfirmPassword');
      const termsInput = document.getElementById('regTerms');
      const alertBox = document.getElementById('registerAlert');

      const name = nameInput.value.trim();
      const email = emailInput.value.trim();
      const phone = phoneInput.value.trim();
      const password = passwordInput.value;
      const confirmPassword = confirmPasswordInput.value;
      const termsAgreed = termsInput.checked;

      // Reset field classes
      [nameInput, emailInput, phoneInput, passwordInput, confirmPasswordInput, termsInput].forEach(el => {
        if (el) el.classList.remove('is-invalid', 'is-valid');
      });

      let isValid = true;
      let errorMsg = '';

      // Validate Name (letters and spaces only)
      if (!name || !REGEX_NAME.test(name)) {
        isValid = false;
        errorMsg = 'Full Name must contain letters and spaces only (min 2 characters).';
        nameInput.classList.add('is-invalid');
      } else {
        nameInput.classList.add('is-valid');
      }

      // Validate Phone (digits and formatting only)
      if (isValid && (!phone || !REGEX_PHONE.test(phone))) {
        isValid = false;
        errorMsg = 'Please enter a valid phone number.';
        phoneInput.classList.add('is-invalid');
      } else if (isValid) {
        phoneInput.classList.add('is-valid');
      }

      // Validate Email format
      if (isValid && (!email || !REGEX_EMAIL.test(email))) {
        isValid = false;
        errorMsg = 'Please enter a valid email address (e.g. player@example.com).';
        emailInput.classList.add('is-invalid');
      } else if (isValid) {
        emailInput.classList.add('is-valid');
      }

      // Validate Password length
      if (isValid && (!password || password.length < 6)) {
        isValid = false;
        errorMsg = 'Password must be at least 6 characters long.';
        passwordInput.classList.add('is-invalid');
      } else if (isValid) {
        passwordInput.classList.add('is-valid');
      }

      // Confirm Password match
      if (isValid && (password !== confirmPassword)) {
        isValid = false;
        errorMsg = 'Passwords do not match. Please re-enter.';
        confirmPasswordInput.classList.add('is-invalid');
      } else if (isValid) {
        confirmPasswordInput.classList.add('is-valid');
      }

      // Terms Checkbox
      if (isValid && !termsAgreed) {
        isValid = false;
        errorMsg = 'You must agree to the Terms of Service and Privacy Policy.';
        termsInput.classList.add('is-invalid');
      } else if (isValid) {
        termsInput.classList.remove('is-invalid');
      }

      if (!isValid) {
        if (alertBox) {
          alertBox.className = 'alert alert-danger mb-4';
          alertBox.innerHTML = `<i class="bi bi-exclamation-triangle-fill me-2"></i>${errorMsg}`;
          alertBox.classList.remove('d-none');
        }
        showToast(errorMsg, 'error');
        return;
      }

      // Real Account Creation via Auth Service with Salted Hash
      if (typeof Auth !== 'undefined') {
        const result = await Auth.register({
          name,
          email,
          phone,
          password,
          confirmPassword,
          termsAgreed
        });

        if (!result.success) {
          if (alertBox) {
            alertBox.className = 'alert alert-danger mb-4';
            alertBox.innerHTML = `<i class="bi bi-exclamation-circle-fill me-2"></i>${result.error}`;
            alertBox.classList.remove('d-none');
          }
          if (result.field === 'email') {
            emailInput.classList.remove('is-valid');
            emailInput.classList.add('is-invalid');
          }
          showToast(result.error, 'error');
          return;
        }

        // Account created successfully
        if (alertBox) {
          alertBox.className = 'alert alert-success mb-4';
          alertBox.innerHTML = `<i class="bi bi-check-circle-fill me-2"></i>Player account created successfully! Redirecting to sign in...`;
          alertBox.classList.remove('d-none');
        }
        showToast('Account Created Successfully!');
        registerForm.reset();

        setTimeout(() => {
          window.location.href = `login.html?registered=1&email=${encodeURIComponent(email)}`;
        }, 1200);
      }
    });
  }

  // 4. Newsletter forms
  const newsletterForms = document.querySelectorAll('.newsletter-form');
  newsletterForms.forEach(form => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const emailInput = form.querySelector('input[type="email"]');
      if (emailInput && REGEX_EMAIL.test(emailInput.value.trim())) {
        showToast('Subscribed to Smash & Spin newsletter!');
        form.reset();
      } else {
        showToast('Please enter a valid email address.', 'error');
      }
    });
  });

  // 5. Password toggle show/hide
  document.querySelectorAll('.password-toggle-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const input = btn.previousElementSibling;
      const icon = btn.querySelector('i');
      if (input && input.type === 'password') {
        input.type = 'text';
        icon.className = 'bi bi-eye-slash';
      } else if (input) {
        input.type = 'password';
        icon.className = 'bi bi-eye';
      }
    });
  });
});
