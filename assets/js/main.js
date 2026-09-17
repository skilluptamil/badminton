/**
 * SMASH & SPIN - Main Application Logic
 * Navbar scroll behavior, counters, membership pricing toggle, blog loader
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Sticky Navbar shadow & dynamic scrolled state
  const headers = document.querySelectorAll('.site-header, .dashboard-top-navbar');
  const updateHeaderSticky = () => {
    const isScrolled = window.scrollY > 15;
    headers.forEach(h => {
      if (isScrolled) {
        h.classList.add('scrolled');
      } else {
        h.classList.remove('scrolled');
      }
    });
  };

  window.addEventListener('scroll', updateHeaderSticky, { passive: true });
  updateHeaderSticky();

  // 2. Pricing Plan Switcher (Monthly / Annual)
  const billingMonthlyBtn = document.getElementById('btnBillingMonthly');
  const billingAnnualBtn = document.getElementById('btnBillingAnnual');
  const priceValues = document.querySelectorAll('.dynamic-price');

  if (billingMonthlyBtn && billingAnnualBtn) {
    billingMonthlyBtn.addEventListener('click', () => {
      billingMonthlyBtn.classList.add('btn-primary');
      billingMonthlyBtn.classList.remove('btn-outline-dark');
      billingAnnualBtn.classList.remove('btn-primary');
      billingAnnualBtn.classList.add('btn-outline-dark');

      priceValues.forEach(el => {
        const monthly = el.getAttribute('data-monthly');
        if (monthly) el.textContent = `$${monthly}`;
      });
    });

    billingAnnualBtn.addEventListener('click', () => {
      billingAnnualBtn.classList.add('btn-primary');
      billingAnnualBtn.classList.remove('btn-outline-dark');
      billingMonthlyBtn.classList.remove('btn-primary');
      billingMonthlyBtn.classList.add('btn-outline-dark');

      priceValues.forEach(el => {
        const annual = el.getAttribute('data-annual');
        if (annual) el.textContent = `$${annual}`;
      });
    });
  }

  // 3. Court Details Page Dynamic Loader (guarantees matching heading, image & specs)
  const courtDetailsContainer = document.getElementById('courtDetailsContentArea');
  if (courtDetailsContainer && typeof COURTS_DATA !== 'undefined') {
    const urlParams = new URLSearchParams(window.location.search);
    const courtId = urlParams.get('id') || 'center-court-alpha';
    const court = getCourtById(courtId);

    // Update document title
    document.title = `${court.title} Details | Smash & Spin Arenas`;

    // Update Page Hero Elements
    const heroBadge = document.getElementById('courtHeroBadge');
    const heroTitle = document.getElementById('courtHeroTitle');
    const heroBreadcrumb = document.getElementById('courtHeroBreadcrumb');

    if (heroBadge) {
      heroBadge.textContent = court.badgeText;
      heroBadge.className = `badge ${court.badgeClass} text-white mb-2`;
    }
    if (heroTitle) heroTitle.textContent = court.title;
    if (heroBreadcrumb) heroBreadcrumb.textContent = court.title;

    // Update Main Content
    const courtHeroImg = document.getElementById('courtHeroImg');
    const courtMainTitle = document.getElementById('courtMainTitle');
    const courtMainLocation = document.getElementById('courtMainLocation');
    const courtMainPrice = document.getElementById('courtMainPrice');
    const courtMainStatusBadge = document.getElementById('courtMainStatusBadge');
    const courtDesc1 = document.getElementById('courtDesc1');
    const courtDesc2 = document.getElementById('courtDesc2');

    if (courtHeroImg) {
      courtHeroImg.src = court.image;
      courtHeroImg.alt = court.title;
    }
    if (courtMainTitle) courtMainTitle.textContent = court.title;
    if (courtMainLocation) {
      courtMainLocation.innerHTML = `<i class="bi bi-geo-alt-fill text-primary"></i> ${court.location}`;
    }
    if (courtMainPrice) courtMainPrice.textContent = `$${court.price}`;
    if (courtMainStatusBadge) courtMainStatusBadge.textContent = court.status || 'Available';
    if (courtDesc1) courtDesc1.textContent = court.description1;
    if (courtDesc2) courtDesc2.textContent = court.description2;

    // Update Technical Specifications
    const spec1Label = document.getElementById('spec1Label');
    const spec1Val = document.getElementById('spec1Val');
    const spec2Label = document.getElementById('spec2Label');
    const spec2Val = document.getElementById('spec2Val');
    const spec3Label = document.getElementById('spec3Label');
    const spec3Val = document.getElementById('spec3Val');
    const spec4Label = document.getElementById('spec4Label');
    const spec4Val = document.getElementById('spec4Val');

    if (spec1Label && court.specs?.flooring) spec1Label.textContent = court.specs.flooring.label;
    if (spec1Val && court.specs?.flooring) spec1Val.textContent = court.specs.flooring.val;
    if (spec2Label && court.specs?.lighting) spec2Label.textContent = court.specs.lighting.label;
    if (spec2Val && court.specs?.lighting) spec2Val.textContent = court.specs.lighting.val;
    if (spec3Label && court.specs?.clearance) spec3Label.textContent = court.specs.clearance.label;
    if (spec3Val && court.specs?.clearance) spec3Val.textContent = court.specs.clearance.val;
    if (spec4Label && court.specs?.climate) spec4Label.textContent = court.specs.climate.label;
    if (spec4Val && court.specs?.climate) spec4Val.textContent = court.specs.climate.val;

    // Update Included Amenities
    const amenitiesRow = document.getElementById('courtAmenitiesRow');
    if (amenitiesRow && court.amenities) {
      amenitiesRow.innerHTML = court.amenities.map(a => `
        <div class="col-md-4 col-6">
          <div class="d-flex align-items-center gap-2">
            <i class="bi ${a.icon} text-primary fs-4"></i>
            <span class="fw-semibold">${a.text}</span>
          </div>
        </div>
      `).join('');
    }

    // Update Court Guidelines
    const guidelinesList = document.getElementById('courtGuidelinesList');
    if (guidelinesList && court.guidelines) {
      guidelinesList.innerHTML = court.guidelines.map(g => `
        <li class="mb-2"><i class="bi bi-check2-circle text-primary me-2"></i><strong>${g.strong}</strong> ${g.text}</li>
      `).join('');
    }

    // Update Sidebar Widget
    const durationSelect = document.getElementById('courtDetailsDuration');
    const sidebarBaseRate = document.getElementById('courtSidebarBaseRate');
    const sidebarTotalPrice = document.getElementById('courtSidebarTotalPrice');
    const sidebarBookBtn = document.getElementById('courtSidebarBookBtn');

    function updateSidebarPrices() {
      const hours = parseInt(durationSelect?.value || '1', 10);
      const total = court.price * hours;
      if (sidebarBaseRate) sidebarBaseRate.textContent = `$${court.price.toFixed(2)}`;
      if (sidebarTotalPrice) sidebarTotalPrice.textContent = `$${total.toFixed(2)}`;
      if (sidebarBookBtn) {
        sidebarBookBtn.setAttribute('data-court-name', court.title);
        sidebarBookBtn.setAttribute('data-sport', court.sport);
        sidebarBookBtn.setAttribute('data-price', court.price);
      }
    }

    if (durationSelect) {
      durationSelect.innerHTML = `
        <option value="1">1 Hour ($${(court.price * 1).toFixed(2)})</option>
        <option value="2">2 Hours ($${(court.price * 2).toFixed(2)})</option>
        <option value="3">3 Hours ($${(court.price * 3).toFixed(2)})</option>
      `;
      durationSelect.addEventListener('change', updateSidebarPrices);
    }
    updateSidebarPrices();

    // Render Other Courts
    const otherCourtsRow = document.getElementById('otherCourtsRow');
    if (otherCourtsRow && typeof getRelatedCourts === 'function') {
      const related = getRelatedCourts(court.id, 3);
      otherCourtsRow.innerHTML = related.map(rc => `
        <div class="col-lg-4 col-md-6">
          <div class="court-card h-100">
            <div class="court-image-wrapper">
              <a href="court-details.html?id=${rc.id}" class="d-block w-100 h-100">
                <img src="${rc.image}" alt="${rc.title}" loading="lazy">
              </a>
              <span class="court-badge-sport ${rc.badgeClass}">${rc.sport}</span>
              <span class="court-badge-status"><i class="bi bi-circle-fill fs-6 text-success me-1"></i>Available</span>
            </div>
            <div class="court-body d-flex flex-column">
              <div class="court-type">${rc.courtType}</div>
              <h3 class="court-title"><a href="court-details.html?id=${rc.id}" class="text-decoration-none text-dark">${rc.title}</a></h3>
              <p class="small text-muted mb-3 flex-grow-1">${rc.summary}</p>
              <div class="court-footer mt-auto">
                <div class="court-price">$${rc.price} <span>/ hr</span></div>
                <div class="d-flex gap-2">
                  <a href="court-details.html?id=${rc.id}" class="btn btn-outline-dark btn-sm">View Details</a>
                  <button type="button" class="btn btn-primary btn-sm btn-book-court" data-court-name="${rc.title}" data-sport="${rc.sport}" data-price="${rc.price}">
                    Book Now
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      `).join('');
    }
  }

  // 4. Blog Details Page Dynamic Loader (guarantees matching image and article)
  const blogDetailsContainer = document.getElementById('blogDetailsContentArea');
  if (blogDetailsContainer && typeof BLOG_ARTICLES !== 'undefined') {
    const urlParams = new URLSearchParams(window.location.search);
    const articleId = urlParams.get('id') || 'badminton-footwork-guide';
    const article = getArticleById(articleId);

    // Update Document Title
    document.title = `${article.title} - Smash & Spin`;

    // Update Page Hero
    const heroTitle = document.getElementById('blogHeroTitle');
    const heroCategory = document.getElementById('blogHeroCategory');
    const heroAuthor = document.getElementById('blogHeroAuthor');
    const heroDate = document.getElementById('blogHeroDate');
    const heroReadTime = document.getElementById('blogHeroReadTime');
    const heroImage = document.getElementById('blogHeroImage');

    if (heroTitle) heroTitle.textContent = article.title;
    if (heroCategory) {
      heroCategory.textContent = article.category;
      heroCategory.className = `section-badge ${article.badgeClass === 'badge-tt' ? 'secondary-badge' : ''}`;
    }
    if (heroAuthor) heroAuthor.textContent = article.author;
    if (heroDate) heroDate.textContent = article.date;
    if (heroReadTime) heroReadTime.textContent = article.readTime;
    if (heroImage) {
      heroImage.src = article.image;
      heroImage.alt = article.title;
    }

    // Insert formatted article body
    const bodyEl = document.getElementById('blogArticleBody');
    if (bodyEl) {
      bodyEl.innerHTML = article.content;
    }

    // Update Author Bio Card
    const authorNameEl = document.getElementById('blogAuthorName');
    const authorRoleEl = document.getElementById('blogAuthorRole');
    const authorBioEl = document.getElementById('blogAuthorBio');
    const authorImgEl = document.getElementById('blogAuthorImg');

    if (authorNameEl && article.author) authorNameEl.textContent = article.author;
    if (authorRoleEl && article.authorRole) authorRoleEl.textContent = article.authorRole;
    if (authorBioEl && article.authorBio) authorBioEl.textContent = article.authorBio;
    if (authorImgEl && article.authorAvatar) {
      authorImgEl.src = article.authorAvatar;
      authorImgEl.alt = article.author;
    }

    // Render Tags
    const tagsContainer = document.getElementById('blogTagsList');
    if (tagsContainer && article.tags) {
      tagsContainer.innerHTML = article.tags.map(t => `<a href="blog.html?category=${encodeURIComponent(article.category.toLowerCase())}" class="amenity-tag text-decoration-none">#${t}</a>`).join(' ');
    }

    // Render Related Articles
    const relatedContainer = document.getElementById('relatedArticlesRow');
    if (relatedContainer) {
      const related = getRelatedArticles(article.id, 3);
      relatedContainer.innerHTML = related.map(rel => `
        <div class="col-lg-4 col-md-6 mb-4">
          <div class="blog-card h-100 d-flex flex-column">
            <div class="blog-img-box">
              <a href="blog-details.html?id=${rel.id}" class="d-block w-100 h-100">
                <img src="${rel.image}" alt="${rel.title}" loading="lazy">
              </a>
              <span class="blog-category-badge ${rel.badgeClass}">${rel.category}</span>
            </div>
            <div class="blog-body d-flex flex-column flex-grow-1">
              <div class="blog-meta">
                <span class="blog-meta-item"><i class="bi bi-calendar3"></i> ${rel.date}</span>
                <span class="blog-meta-item"><i class="bi bi-clock"></i> ${rel.readTime}</span>
              </div>
              <h5 class="blog-title"><a href="blog-details.html?id=${rel.id}">${rel.title}</a></h5>
              <p class="blog-desc">${rel.summary}</p>
              <div class="mt-auto pt-3">
                <a href="blog-details.html?id=${rel.id}" class="btn btn-outline-primary btn-sm w-100">Read Article <i class="bi bi-arrow-right"></i></a>
              </div>
            </div>
          </div>
        </div>
      `).join('');
    }
  }

  // 4. Blog Listing Page Dynamic Renderer & Live Search
  const blogListGrid = document.getElementById('blogGridContainer');
  if (blogListGrid && typeof BLOG_ARTICLES !== 'undefined') {
    function renderBlogCards(articles) {
      if (articles.length === 0) {
        blogListGrid.innerHTML = `<div class="col-12 text-center py-5"><i class="bi bi-journal-x fs-1 text-muted"></i><h4 class="mt-3">No articles found matching your criteria</h4></div>`;
        return;
      }
      blogListGrid.innerHTML = articles.map(art => `
        <div class="col-lg-4 col-md-6 mb-4 blog-item-card" data-category="${art.category.toLowerCase()}">
          <div class="blog-card h-100 d-flex flex-column">
            <div class="blog-img-box">
              <a href="blog-details.html?id=${art.id}" class="d-block w-100 h-100">
                <img src="${art.image}" alt="${art.title}" loading="lazy">
              </a>
              <span class="blog-category-badge ${art.badgeClass}">${art.category}</span>
            </div>
            <div class="blog-body d-flex flex-column flex-grow-1">
              <div class="blog-meta">
                <span class="blog-meta-item"><i class="bi bi-calendar3"></i> ${art.date}</span>
                <span class="blog-meta-item"><i class="bi bi-clock"></i> ${art.readTime}</span>
              </div>
              <h5 class="blog-title"><a href="blog-details.html?id=${art.id}">${art.title}</a></h5>
              <p class="blog-desc">${art.summary}</p>
              <div class="mt-auto pt-3">
                <a href="blog-details.html?id=${art.id}" class="btn btn-outline-primary btn-sm w-100">Read Article <i class="bi bi-arrow-right"></i></a>
              </div>
            </div>
          </div>
        </div>
      `).join('');
    }

    // Initial render
    renderBlogCards(BLOG_ARTICLES);

    // Category filter tabs
    const categoryBtns = document.querySelectorAll('.blog-filter-btn');
    categoryBtns.forEach(btn => {
      btn.addEventListener('click', function(e) {
        e.preventDefault();
        categoryBtns.forEach(b => b.classList.remove('active', 'btn-primary'));
        categoryBtns.forEach(b => b.classList.add('btn-outline-dark'));
        this.classList.remove('btn-outline-dark');
        this.classList.add('active', 'btn-primary');

        const cat = this.getAttribute('data-category');
        if (cat === 'all') {
          renderBlogCards(BLOG_ARTICLES);
        } else {
          const filtered = BLOG_ARTICLES.filter(a => a.category.toLowerCase() === cat || (cat === 'fitness' && a.tags.includes('Fitness')));
          renderBlogCards(filtered);
        }
      });
    });

    // Search bar
    const blogSearchInput = document.getElementById('blogSearchInput');
    if (blogSearchInput) {
      blogSearchInput.addEventListener('input', (e) => {
        const query = e.target.value.toLowerCase().trim();
        const filtered = BLOG_ARTICLES.filter(a => 
          a.title.toLowerCase().includes(query) || 
          a.summary.toLowerCase().includes(query) ||
          a.category.toLowerCase().includes(query)
        );
        renderBlogCards(filtered);
      });
    }
  }

  // 5. Coming Soon Countdown Timer
  const countdownTimer = document.getElementById('comingSoonCountdown');
  if (countdownTimer) {
    const launchDate = new Date();
    launchDate.setDate(launchDate.getDate() + 28); // 28 days in future

    function updateCountdown() {
      const now = new Date().getTime();
      const distance = launchDate.getTime() - now;

      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      const daysEl = document.getElementById('cdDays');
      const hoursEl = document.getElementById('cdHours');
      const minsEl = document.getElementById('cdMinutes');
      const secsEl = document.getElementById('cdSeconds');

      if (daysEl) daysEl.textContent = String(days).padStart(2, '0');
      if (hoursEl) hoursEl.textContent = String(hours).padStart(2, '0');
      if (minsEl) minsEl.textContent = String(minutes).padStart(2, '0');
      if (secsEl) secsEl.textContent = String(seconds).padStart(2, '0');
    }

    updateCountdown();
    setInterval(updateCountdown, 1000);
  }

  // 6. Hero Multi-Image Animated Showcase Controllers
  const heroSliders = document.querySelectorAll('.hero-slider-showcase');
  heroSliders.forEach((heroSlider) => {
    const slides = heroSlider.querySelectorAll('.hero-slide');
    if (!slides.length) return;

    const tabs = heroSlider.querySelectorAll('.hero-tab-pill');
    const prevBtn = heroSlider.querySelector('.hero-prev') || document.getElementById('heroPrevBtn');
    const nextBtn = heroSlider.querySelector('.hero-next') || document.getElementById('heroNextBtn');
    const progressBar = heroSlider.querySelector('.hero-progress-bar') || document.getElementById('heroProgressBar');

    let currentIndex = 0;
    const totalSlides = slides.length;
    const slideDuration = 4500; // 4.5 seconds per slide
    let progressStartTime = performance.now();
    let progressAnimFrame = null;
    let isPaused = false;

    function goToSlide(index) {
      if (index < 0) index = totalSlides - 1;
      if (index >= totalSlides) index = 0;
      currentIndex = index;

      // Update active slide
      slides.forEach((slide, idx) => {
        if (idx === currentIndex) {
          slide.classList.add('active');
          const img = slide.querySelector('.hero-slide-img');
          if (img) {
            img.style.animation = 'none';
            void img.offsetWidth; // Force CSS reflow to retrigger Ken Burns
            img.style.animation = '';
          }
        } else {
          slide.classList.remove('active');
        }
      });

      // Update interactive tabs without jumping or auto-scrolling the entire page
      tabs.forEach((tab, idx) => {
        if (idx === currentIndex) {
          tab.classList.add('active');
          const tabsContainer = tab.closest('.hero-category-tabs');
          if (tabsContainer) {
            const tabLeft = tab.offsetLeft;
            const tabWidth = tab.offsetWidth;
            const containerWidth = tabsContainer.offsetWidth;
            tabsContainer.scrollTo({
              left: tabLeft - (containerWidth / 2) + (tabWidth / 2),
              behavior: 'smooth'
            });
          }
        } else {
          tab.classList.remove('active');
        }
      });

      resetSlideTimer();
    }

    function updateProgress(now) {
      if (!isPaused) {
        const elapsed = now - progressStartTime;
        const percentage = Math.min((elapsed / slideDuration) * 100, 100);
        if (progressBar) progressBar.style.width = `${percentage}%`;

        if (elapsed >= slideDuration) {
          goToSlide(currentIndex + 1);
          return;
        }
      } else {
        // Offset start time while paused so progress doesn't jump
        const currentWidth = parseFloat(progressBar?.style.width || '0');
        progressStartTime = now - (currentWidth / 100) * slideDuration;
      }
      progressAnimFrame = requestAnimationFrame(updateProgress);
    }

    function resetSlideTimer() {
      if (progressAnimFrame) cancelAnimationFrame(progressAnimFrame);
      if (progressBar) progressBar.style.width = '0%';
      progressStartTime = performance.now();
      progressAnimFrame = requestAnimationFrame(updateProgress);
    }

    // Tabs click event
    tabs.forEach((tab, idx) => {
      tab.addEventListener('click', () => {
        goToSlide(idx);
      });
    });

    // Navigation buttons
    if (prevBtn) {
      prevBtn.addEventListener('click', (e) => {
        e.preventDefault();
        goToSlide(currentIndex - 1);
      });
    }

    if (nextBtn) {
      nextBtn.addEventListener('click', (e) => {
        e.preventDefault();
        goToSlide(currentIndex + 1);
      });
    }

    // Hover to pause auto-rotation
    heroSlider.addEventListener('mouseenter', () => {
      isPaused = true;
    });

    heroSlider.addEventListener('mouseleave', () => {
      isPaused = false;
    });

    // Mobile touch swipe support
    let touchStartX = 0;
    let touchEndX = 0;

    heroSlider.addEventListener('touchstart', (e) => {
      if (e.changedTouches && e.changedTouches.length > 0) {
        touchStartX = e.changedTouches[0].screenX;
        isPaused = true;
      }
    }, { passive: true });

    heroSlider.addEventListener('touchend', (e) => {
      if (e.changedTouches && e.changedTouches.length > 0) {
        touchEndX = e.changedTouches[0].screenX;
        isPaused = false;
        const swipeDiff = touchEndX - touchStartX;
        if (Math.abs(swipeDiff) > 40) {
          if (swipeDiff < 0) {
            goToSlide(currentIndex + 1); // Swipe left = next
          } else {
            goToSlide(currentIndex - 1); // Swipe right = prev
          }
        }
      }
    }, { passive: true });

    // Start slideshow
    resetSlideTimer();
  });
});

