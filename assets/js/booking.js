/**
 * SMASH & SPIN - Court Booking Engine & Interactive Modals
 * Supports court booking, time slot selection, pricing calculation & tournament registration
 */

document.addEventListener('DOMContentLoaded', () => {
  // Current booking state
  // Local Timezone Date Utilities
  function getLocalDateString(d = new Date()) {
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  function isDateInPast(dateStr) {
    if (!dateStr || typeof dateStr !== 'string') return true;
    const todayStr = getLocalDateString();
    return dateStr < todayStr;
  }

  // Export helpers to window for cross-module validation
  window.getLocalDateString = getLocalDateString;
  window.isDateInPast = isDateInPast;

  const todayStr = getLocalDateString();

  // Helper to attach dynamic min and validation to any date input
  function attachDateValidation(input, feedbackSelector, customMsg) {
    if (!input) return;
    input.min = todayStr;
    if (!input.value || isDateInPast(input.value)) {
      input.value = todayStr;
    }

    const feedbackEl = feedbackSelector 
      ? (typeof feedbackSelector === 'string' ? document.querySelector(feedbackSelector) : feedbackSelector)
      : input.parentElement.querySelector('.invalid-feedback');

    const validate = (notify = false) => {
      const val = input.value;
      if (isDateInPast(val)) {
        input.classList.add('is-invalid');
        input.classList.remove('is-valid');
        if (feedbackEl) {
          feedbackEl.textContent = customMsg || 'Past dates are not allowed. Please choose today or a future date.';
          feedbackEl.style.display = 'block';
        }
        if (notify && window.showToast) {
          window.showToast('Invalid Date: Cannot select or book a court for a past date.', 'error');
        }
        return false;
      } else {
        input.classList.remove('is-invalid');
        input.classList.add('is-valid');
        if (feedbackEl) {
          feedbackEl.textContent = '';
          feedbackEl.style.display = 'none';
        }
        return true;
      }
    };

    input.addEventListener('change', () => validate(true));
    input.addEventListener('input', () => validate(false));
    return validate;
  }

  // Current booking state
  const bookingState = {
    courtName: 'Grand Arena - Court 1',
    sport: 'Badminton',
    ratePerHour: 25,
    selectedDate: todayStr,
    selectedSlot: '06:00 PM - 07:00 PM',
    durationHours: 1,
    racketRental: 0,
    shuttlecockPack: 0,
    totalPrice: 25
  };

  // 1. Initialize Booking Modal Triggers
  const bookingModalEl = document.getElementById('courtBookingModal');
  let bookingModalInstance = null;
  if (bookingModalEl && window.bootstrap) {
    bookingModalInstance = new bootstrap.Modal(bookingModalEl);
  }

  // Attach validation to booking modal date input
  const modalDateInput = document.getElementById('modalBookingDate');
  if (modalDateInput) {
    attachDateValidation(modalDateInput, '#modalBookingDateFeedback', 'Court bookings cannot be made for past dates. Please select today or a future date.');
  }

  // Handle all "Book Now" buttons across pages
  document.addEventListener('click', (e) => {
    const bookBtn = e.target.closest('.btn-book-court');
    if (bookBtn) {
      e.preventDefault();

      // Check if clicked from court details with a custom date
      const courtDetailsDateInput = document.getElementById('courtDetailsDate');
      if (courtDetailsDateInput) {
        if (isDateInPast(courtDetailsDateInput.value)) {
          courtDetailsDateInput.classList.add('is-invalid');
          courtDetailsDateInput.focus();
          if (window.showToast) {
            window.showToast('Booking Rejected: Please select today or a future date.', 'error');
          }
          return;
        }
        bookingState.selectedDate = courtDetailsDateInput.value;
      }

      const courtName = bookBtn.getAttribute('data-court-name') || 'Grand Arena - Court 1';
      const sport = bookBtn.getAttribute('data-sport') || 'Badminton';
      const price = parseFloat(bookBtn.getAttribute('data-price')) || 25;

      bookingState.courtName = courtName;
      bookingState.sport = sport;
      bookingState.ratePerHour = price;

      // Sync modal date input
      if (modalDateInput) {
        modalDateInput.min = todayStr;
        if (!modalDateInput.value || isDateInPast(modalDateInput.value)) {
          modalDateInput.value = bookingState.selectedDate || todayStr;
        }
        modalDateInput.classList.remove('is-invalid');
      }

      updateModalUI();
      if (bookingModalInstance) {
        bookingModalInstance.show();
      }
    }
  });

  // Handle slot pill selections inside modal
  const slotPills = document.querySelectorAll('.slot-pill');
  slotPills.forEach(pill => {
    pill.addEventListener('click', function() {
      if (this.classList.contains('disabled')) return;
      slotPills.forEach(p => p.classList.remove('active'));
      this.classList.add('active');
      bookingState.selectedSlot = this.getAttribute('data-slot') || this.textContent.trim();
      recalculateBookingTotal();
    });
  });

  // Duration select
  const durationSelect = document.getElementById('bookingDuration');
  if (durationSelect) {
    durationSelect.addEventListener('change', function() {
      bookingState.durationHours = parseInt(this.value, 10) || 1;
      recalculateBookingTotal();
    });
  }

  // Equipment add-on checkboxes
  const addonRackets = document.getElementById('addonRackets');
  const addonBalls = document.getElementById('addonBalls');

  if (addonRackets) {
    addonRackets.addEventListener('change', function() {
      bookingState.racketRental = this.checked ? 5 : 0;
      recalculateBookingTotal();
    });
  }

  if (addonBalls) {
    addonBalls.addEventListener('change', function() {
      bookingState.shuttlecockPack = this.checked ? 4 : 0;
      recalculateBookingTotal();
    });
  }

  // Recalculate total price
  function recalculateBookingTotal() {
    const courtCost = bookingState.ratePerHour * bookingState.durationHours;
    const addOns = (bookingState.racketRental + bookingState.shuttlecockPack) * bookingState.durationHours;
    bookingState.totalPrice = courtCost + addOns;

    const priceDisplay = document.getElementById('modalTotalPrice');
    if (priceDisplay) {
      priceDisplay.textContent = `$${bookingState.totalPrice.toFixed(2)}`;
    }
  }

  function updateModalUI() {
    const titleEl = document.getElementById('modalCourtTitle');
    const sportEl = document.getElementById('modalCourtSport');
    const rateEl = document.getElementById('modalCourtRate');

    if (titleEl) titleEl.textContent = bookingState.courtName;
    if (sportEl) {
      sportEl.textContent = bookingState.sport;
      sportEl.className = bookingState.sport === 'Badminton' ? 'badge badge-badminton text-white' : 'badge badge-tt text-white';
    }
    if (rateEl) rateEl.textContent = `$${bookingState.ratePerHour}/hour`;

    recalculateBookingTotal();
  }

  // Confirm booking button with strict past-date validation
  const confirmBookingBtn = document.getElementById('btnConfirmCourtBooking');
  if (confirmBookingBtn) {
    confirmBookingBtn.addEventListener('click', () => {
      // Validate date before confirming
      if (modalDateInput) {
        if (isDateInPast(modalDateInput.value)) {
          modalDateInput.classList.add('is-invalid');
          modalDateInput.focus();
          const feedback = document.getElementById('modalBookingDateFeedback') || modalDateInput.parentElement.querySelector('.invalid-feedback');
          if (feedback) {
            feedback.textContent = 'Cannot confirm booking for a past date. Please select today or a future date.';
            feedback.style.display = 'block';
          }
          if (window.showToast) {
            window.showToast('Booking Rejected: Court reservations can only be booked for today or future dates.', 'error');
          }
          return;
        }
        bookingState.selectedDate = modalDateInput.value;
      }

      const bookingId = 'BK-' + Math.floor(100000 + Math.random() * 900000);
      const receiptHtml = `
        <div class="text-center py-3">
          <div class="display-4 text-success mb-2"><i class="bi bi-check-circle-fill"></i></div>
          <h4 class="fw-bold">Booking Confirmed!</h4>
          <p class="text-muted mb-4">Your court reservation has been confirmed and locked.</p>
          <div class="bg-light p-3 rounded-3 text-start mb-3">
            <div class="d-flex justify-content-between mb-1"><strong>Booking ID:</strong> <span>${bookingId}</span></div>
            <div class="d-flex justify-content-between mb-1"><strong>Court:</strong> <span>${bookingState.courtName}</span></div>
            <div class="d-flex justify-content-between mb-1"><strong>Sport:</strong> <span>${bookingState.sport}</span></div>
            <div class="d-flex justify-content-between mb-1"><strong>Date:</strong> <span class="badge bg-primary text-white">${bookingState.selectedDate}</span></div>
            <div class="d-flex justify-content-between mb-1"><strong>Slot:</strong> <span>${bookingState.selectedSlot}</span></div>
            <div class="d-flex justify-content-between mb-1"><strong>Duration:</strong> <span>${bookingState.durationHours} Hour(s)</span></div>
            <hr class="my-2">
            <div class="d-flex justify-content-between fw-bold fs-5 text-primary"><strong>Total Paid:</strong> <span>$${bookingState.totalPrice.toFixed(2)}</span></div>
          </div>
          <div class="d-flex gap-2">
            <a href="dashboard.html#user-dashboard" class="btn btn-outline-dark flex-fill">Player Dashboard</a>
            <a href="dashboard.html#customer-dashboard" class="btn btn-primary flex-fill">Customer Dashboard</a>
          </div>
        </div>
      `;

      // Persist to localStorage so both dashboards display this new booking
      try {
        const stored = JSON.parse(localStorage.getItem('smash_spin_bookings') || '[]');
        stored.unshift({
          id: bookingId,
          court: bookingState.courtName,
          sport: bookingState.sport,
          date: bookingState.selectedDate,
          time: bookingState.selectedSlot,
          price: `$${bookingState.totalPrice.toFixed(2)}`,
          status: 'confirmed',
          paymentStatus: 'Paid'
        });
        localStorage.setItem('smash_spin_bookings', JSON.stringify(stored));
      } catch (err) {}

      const modalBody = document.querySelector('#courtBookingModal .modal-body');
      const modalFooter = document.querySelector('#courtBookingModal .modal-footer');
      if (modalBody) modalBody.innerHTML = receiptHtml;
      if (modalFooter) modalFooter.style.display = 'none';

      if (window.showToast) {
        window.showToast(`Booking ${bookingId} successfully confirmed for ${bookingState.selectedDate}!`);
      }
    });
  }

  // 2. Quick Search Availability Widget
  const quickSearchForm = document.getElementById('quickBookingSearchForm');
  const quickSearchDateInput = document.getElementById('searchDate');
  if (quickSearchDateInput) {
    attachDateValidation(quickSearchDateInput, null, 'Cannot search courts for past dates. Please select today or a future date.');
  }

  if (quickSearchForm) {
    quickSearchForm.addEventListener('submit', (e) => {
      const sport = document.getElementById('searchSport')?.value || 'All';
      const dateVal = quickSearchDateInput ? quickSearchDateInput.value : '';
      const time = document.getElementById('searchTime')?.value || 'Any Time';

      if (quickSearchDateInput && isDateInPast(dateVal)) {
        e.preventDefault();
        quickSearchDateInput.classList.add('is-invalid');
        quickSearchDateInput.focus();
        if (window.showToast) {
          window.showToast('Invalid Date: Cannot search court availability for past dates.', 'error');
        }
        return;
      }

      e.preventDefault();
      if (window.showToast) {
        window.showToast(`Searching available ${sport} courts for ${dateVal} (${time})...`);
      }

      // Smooth scroll to courts grid section if on the page
      const courtSection = document.getElementById('courtListSection');
      if (courtSection) {
        courtSection.scrollIntoView({ behavior: 'smooth' });
      } else {
        // Redirect to courts page with query parameters
        window.location.href = `courts.html?sport=${encodeURIComponent(sport)}&date=${encodeURIComponent(dateVal)}`;
      }
    });
  }

  // Sidebar widget on court-details.html
  const courtDetailsDateInput = document.getElementById('courtDetailsDate');
  if (courtDetailsDateInput) {
    attachDateValidation(courtDetailsDateInput, '#courtDetailsDateFeedback', 'Please select today or a future date.');
  }

  // 3. Tournament Registration Modal
  const tournamentModalEl = document.getElementById('tournamentRegModal');
  let tournamentModalInstance = null;
  if (tournamentModalEl && window.bootstrap) {
    tournamentModalInstance = new bootstrap.Modal(tournamentModalEl);
  }

  document.addEventListener('click', (e) => {
    const regBtn = e.target.closest('.btn-register-tournament');
    if (regBtn) {
      e.preventDefault();
      const tournamentName = regBtn.getAttribute('data-tournament-name') || 'Summer Badminton Open';
      const fee = regBtn.getAttribute('data-fee') || '$35';
      const sport = regBtn.getAttribute('data-sport') || 'Badminton';

      const titleEl = document.getElementById('tourneyModalTitle');
      const feeEl = document.getElementById('tourneyModalFee');
      const sportEl = document.getElementById('tourneyModalSport');

      if (titleEl) titleEl.textContent = tournamentName;
      if (feeEl) feeEl.textContent = fee;
      if (sportEl) sportEl.textContent = sport;

      if (tournamentModalInstance) {
        tournamentModalInstance.show();
      }
    }
  });

  const tourneyForm = document.getElementById('tourneyRegForm');
  if (tourneyForm) {
    tourneyForm.addEventListener('submit', (e) => {
      e.preventDefault();
      if (window.showToast) {
        window.showToast('Tournament Registration Successful! Confirmation sent to your email.');
      }
      if (tournamentModalInstance) {
        tournamentModalInstance.hide();
      }
    });
  }

  // 4. Interactive Courts Live Filter (on courts.html)
  const courtFilterForm = document.getElementById('courtFilterForm');
  const filterSportBtns = document.querySelectorAll('[data-filter-sport]');
  const courtTypeSelect = document.getElementById('filterCourtType');
  const filterDateInput = document.getElementById('filterDate');
  const timeSlotSelect = document.getElementById('filterTimeSlot');
  const courtItems = document.querySelectorAll('.court-filter-item');
  const courtResultCount = document.getElementById('courtResultCount');
  const activeFilterTags = document.getElementById('activeFilterTags');
  const noCourtsFoundState = document.getElementById('noCourtsFoundState');
  const btnResetFilters = document.getElementById('btnResetFilters');
  const btnEmptyStateReset = document.getElementById('btnEmptyStateReset');

  if (courtFilterForm || courtItems.length > 0) {
    let currentSport = 'all';

    // Check URL parameters for pre-selected filter (e.g. ?sport=table-tennis or ?sport=badminton)
    const urlParams = new URLSearchParams(window.location.search);
    const paramSport = urlParams.get('sport');
    const paramType = urlParams.get('type');
    if (paramSport) {
      currentSport = paramSport.toLowerCase();
      filterSportBtns.forEach(b => {
        const sportAttr = b.getAttribute('data-filter-sport');
        if (sportAttr === currentSport) {
          b.classList.add('active', 'btn-primary');
          b.classList.remove('btn-outline-dark');
        } else {
          b.classList.remove('active', 'btn-primary');
          b.classList.add('btn-outline-dark');
        }
      });
    }
    if (paramType && courtTypeSelect) {
      courtTypeSelect.value = paramType;
    }

    function applyCourtFilters(shouldScroll = false) {
      const selectedType = courtTypeSelect ? courtTypeSelect.value : 'all';
      const selectedTime = timeSlotSelect ? timeSlotSelect.value : 'all';
      let visibleCount = 0;

      courtItems.forEach(item => {
        const itemSport = item.getAttribute('data-sport') || '';
        const itemType = item.getAttribute('data-court-type') || '';
        const itemTime = item.getAttribute('data-time-slot') || 'morning afternoon evening';

        const matchSport = (currentSport === 'all' || itemSport === currentSport);
        const matchType = (selectedType === 'all' || itemType.includes(selectedType));
        const matchTime = (selectedTime === 'all' || itemTime.includes(selectedTime));

        if (matchSport && matchType && matchTime) {
          item.classList.remove('d-none');
          item.style.display = 'block';
          item.style.animation = 'fadeInDown 0.3s ease-out';
          visibleCount++;
        } else {
          item.classList.add('d-none');
          item.style.display = 'none';
        }
      });

      // Update count badge
      if (courtResultCount) {
        courtResultCount.textContent = `${visibleCount} ${visibleCount === 1 ? 'Arena' : 'Arenas'}`;
      }

      // Show/Hide Empty State
      if (noCourtsFoundState) {
        if (visibleCount === 0) {
          noCourtsFoundState.classList.remove('d-none');
        } else {
          noCourtsFoundState.classList.add('d-none');
        }
      }

      // Update active filter tags
      if (activeFilterTags) {
        activeFilterTags.innerHTML = '';
        if (currentSport !== 'all') {
          const sportLabel = currentSport === 'badminton' ? 'Badminton' : 'Table Tennis';
          activeFilterTags.innerHTML += `<span class="badge bg-light text-dark border"><i class="bi bi-tag-fill text-primary me-1"></i>${sportLabel}</span>`;
        }
        if (selectedType !== 'all') {
          const typeText = courtTypeSelect.options[courtTypeSelect.selectedIndex]?.text || selectedType;
          activeFilterTags.innerHTML += `<span class="badge bg-light text-dark border"><i class="bi bi-layers-fill text-primary me-1"></i>${typeText}</span>`;
        }
        if (selectedTime !== 'all') {
          const timeText = timeSlotSelect.options[timeSlotSelect.selectedIndex]?.text || selectedTime;
          activeFilterTags.innerHTML += `<span class="badge bg-light text-dark border"><i class="bi bi-clock-fill text-primary me-1"></i>${timeText}</span>`;
        }
      }

      if (shouldScroll) {
        const gridEl = document.getElementById('courtGridSection');
        if (gridEl) {
          gridEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }
    }

    // Sport Pill Buttons Click
    filterSportBtns.forEach(btn => {
      btn.addEventListener('click', function(e) {
        e.preventDefault();
        filterSportBtns.forEach(b => b.classList.remove('active', 'btn-primary'));
        filterSportBtns.forEach(b => b.classList.add('btn-outline-dark'));
        this.classList.remove('btn-outline-dark');
        this.classList.add('active', 'btn-primary');
        currentSport = this.getAttribute('data-filter-sport') || 'all';
        applyCourtFilters(false);
      });
    });

    // Set dynamic min date and validation for courtFilterForm
    if (filterDateInput) {
      attachDateValidation(filterDateInput, '#filterDateFeedback', 'Cannot select past dates. Please select today or a future date.');
    }

    // Form submit or "Apply Filter" click
    if (courtFilterForm) {
      courtFilterForm.addEventListener('submit', function(e) {
        if (filterDateInput && isDateInPast(filterDateInput.value)) {
          e.preventDefault();
          filterDateInput.classList.add('is-invalid');
          filterDateInput.focus();
          const feedback = document.getElementById('filterDateFeedback') || filterDateInput.parentElement.querySelector('.invalid-feedback');
          if (feedback) {
            feedback.textContent = 'Cannot search or book courts for past dates. Please select today or a future date.';
            feedback.style.display = 'block';
          }
          if (window.showToast) {
            window.showToast('Invalid Date: Cannot search or book courts for past dates. Please select today or a future date.', 'error');
          }
          return false;
        }
        e.preventDefault();
        applyCourtFilters(true);
      });
    }

    // Live filtering on dropdown change as well
    if (courtTypeSelect) {
      courtTypeSelect.addEventListener('change', () => applyCourtFilters(false));
    }
    if (timeSlotSelect) {
      timeSlotSelect.addEventListener('change', () => applyCourtFilters(false));
    }

    // Reset Filters
    function resetAllCourtFilters() {
      currentSport = 'all';
      filterSportBtns.forEach(b => {
        if (b.getAttribute('data-filter-sport') === 'all') {
          b.classList.add('active', 'btn-primary');
          b.classList.remove('btn-outline-dark');
        } else {
          b.classList.remove('active', 'btn-primary');
          b.classList.add('btn-outline-dark');
        }
      });
      if (courtTypeSelect) courtTypeSelect.value = 'all';
      if (timeSlotSelect) timeSlotSelect.value = 'all';
      if (filterDateInput) {
        filterDateInput.value = todayStr;
        filterDateInput.classList.remove('is-invalid', 'is-valid');
      }
      applyCourtFilters(false);
    }

    if (btnResetFilters) btnResetFilters.addEventListener('click', resetAllCourtFilters);
    if (btnEmptyStateReset) btnEmptyStateReset.addEventListener('click', resetAllCourtFilters);

    // Initial filter run
    applyCourtFilters(false);
  }

  // 5. Dashboard Tab Switcher
  const dashNavLinks = document.querySelectorAll('.dashboard-nav-item');
  dashNavLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      const targetTab = this.getAttribute('data-dash-target');
      if (!targetTab) return; // Regular navigation link like logout

      e.preventDefault();
      if (typeof window.switchToTab === 'function') {
        window.switchToTab(targetTab);
      } else if (typeof switchToTab === 'function') {
        switchToTab(targetTab);
      } else {
        dashNavLinks.forEach(l => l.classList.remove('active'));
        this.classList.add('active');

        const tabSections = document.querySelectorAll('.dashboard-tab-content');
        tabSections.forEach(section => {
          section.classList.add('d-none');
        });

        const activeSection = document.getElementById(`dash-tab-${targetTab}`);
        if (activeSection) {
          activeSection.classList.remove('d-none');
        }
      }
    });
  });
});
