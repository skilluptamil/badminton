/**
 * SMASH & SPIN - Court Booking Engine & Interactive Modals
 * Supports court booking, time slot selection, pricing calculation & tournament registration
 */

document.addEventListener('DOMContentLoaded', () => {
  // Current booking state
  const bookingState = {
    courtName: 'Grand Arena - Court 1',
    sport: 'Badminton',
    ratePerHour: 25,
    selectedDate: new Date().toISOString().split('T')[0],
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

  // Handle all "Book Now" buttons across pages
  document.addEventListener('click', (e) => {
    const bookBtn = e.target.closest('.btn-book-court');
    if (bookBtn) {
      e.preventDefault();
      const courtName = bookBtn.getAttribute('data-court-name') || 'Grand Arena - Court 1';
      const sport = bookBtn.getAttribute('data-sport') || 'Badminton';
      const price = parseFloat(bookBtn.getAttribute('data-price')) || 25;

      bookingState.courtName = courtName;
      bookingState.sport = sport;
      bookingState.ratePerHour = price;

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

  // Confirm booking button
  const confirmBookingBtn = document.getElementById('btnConfirmCourtBooking');
  if (confirmBookingBtn) {
    confirmBookingBtn.addEventListener('click', () => {
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
            <div class="d-flex justify-content-between mb-1"><strong>Slot:</strong> <span>${bookingState.selectedSlot}</span></div>
            <div class="d-flex justify-content-between mb-1"><strong>Duration:</strong> <span>${bookingState.durationHours} Hour(s)</span></div>
            <hr class="my-2">
            <div class="d-flex justify-content-between fw-bold fs-5 text-primary"><strong>Total Paid:</strong> <span>$${bookingState.totalPrice.toFixed(2)}</span></div>
          </div>
          <a href="dashboard.html" class="btn btn-primary w-100">View in Player Dashboard</a>
        </div>
      `;

      const modalBody = document.querySelector('#courtBookingModal .modal-body');
      const modalFooter = document.querySelector('#courtBookingModal .modal-footer');
      if (modalBody) modalBody.innerHTML = receiptHtml;
      if (modalFooter) modalFooter.style.display = 'none';

      if (window.showToast) {
        window.showToast(`Booking ${bookingId} successfully confirmed!`);
      }
    });
  }

  // 2. Quick Search Availability Widget
  const quickSearchForm = document.getElementById('quickBookingSearchForm');
  if (quickSearchForm) {
    quickSearchForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const sport = document.getElementById('searchSport')?.value || 'All';
      const date = document.getElementById('searchDate')?.value || 'Today';
      const time = document.getElementById('searchTime')?.value || 'Any Time';

      if (window.showToast) {
        window.showToast(`Searching available ${sport} courts for ${date} (${time})...`);
      }

      // Smooth scroll to courts grid section if on the page
      const courtSection = document.getElementById('courtListSection');
      if (courtSection) {
        courtSection.scrollIntoView({ behavior: 'smooth' });
      } else {
        // Redirect to courts page with query parameters
        window.location.href = `courts.html?sport=${encodeURIComponent(sport)}`;
      }
    });
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
  const filterSportBtns = document.querySelectorAll('[data-filter-sport]');
  filterSportBtns.forEach(btn => {
    btn.addEventListener('click', function(e) {
      e.preventDefault();
      filterSportBtns.forEach(b => b.classList.remove('active', 'btn-primary'));
      filterSportBtns.forEach(b => b.classList.add('btn-outline-dark'));
      this.classList.remove('btn-outline-dark');
      this.classList.add('active', 'btn-primary');

      const filterVal = this.getAttribute('data-filter-sport');
      const courtItems = document.querySelectorAll('.court-filter-item');

      courtItems.forEach(item => {
        const itemSport = item.getAttribute('data-sport');
        if (filterVal === 'all' || itemSport === filterVal) {
          item.style.display = 'block';
        } else {
          item.style.display = 'none';
        }
      });
    });
  });

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
