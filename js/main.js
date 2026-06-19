/* ============================================================
   DoorProblems.com — Main JavaScript
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

  /* ── Mobile Menu ──────────────────────────────────────── */
  const hamburger = document.querySelector('.hamburger');
  const mobileMenu = document.querySelector('.mobile-menu');

  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', () => {
      const open = hamburger.classList.toggle('open');
      mobileMenu.classList.toggle('open', open);
      hamburger.setAttribute('aria-expanded', open);
    });

    // Close on outside click
    document.addEventListener('click', (e) => {
      if (!hamburger.contains(e.target) && !mobileMenu.contains(e.target)) {
        hamburger.classList.remove('open');
        mobileMenu.classList.remove('open');
      }
    });

    // Close on link click
    mobileMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('open');
        mobileMenu.classList.remove('open');
      });
    });
  }

  /* ── Active Nav Link ──────────────────────────────────── */
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a, .mobile-menu a').forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });

  /* ── Booking / Contact Form ───────────────────────────── */
  const bookingForm = document.getElementById('bookingForm');
  if (bookingForm) {
    // Set min date on date picker to today
    const dateInput = bookingForm.querySelector('input[type="date"]');
    if (dateInput) {
      const today = new Date().toISOString().split('T')[0];
      dateInput.min = today;
    }

    bookingForm.addEventListener('submit', (e) => {
      e.preventDefault();

      if (!validateForm(bookingForm)) return;

      // Simulate async submission
      const submitBtn = bookingForm.querySelector('[type="submit"]');
      const origText = submitBtn.textContent;
      submitBtn.disabled = true;
      submitBtn.textContent = 'Sending…';

      setTimeout(() => {
        bookingForm.style.display = 'none';
        const msg = document.getElementById('successMessage');
        if (msg) {
          msg.classList.add('show');
          msg.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      }, 900);
    });
  }

  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      if (!validateForm(contactForm)) return;
      const btn = contactForm.querySelector('[type="submit"]');
      btn.disabled = true;
      btn.textContent = 'Sending…';
      setTimeout(() => {
        contactForm.reset();
        btn.disabled = false;
        btn.textContent = 'Send Message';
        showToast('Message sent! We\'ll be in touch within 1 business day.');
      }, 800);
    });
  }

  /* ── Form Validation ──────────────────────────────────── */
  function validateForm(form) {
    let valid = true;
    form.querySelectorAll('[required]').forEach(field => {
      clearError(field);
      if (!field.value.trim()) {
        showError(field, 'This field is required.');
        valid = false;
      } else if (field.type === 'email' && !isEmail(field.value)) {
        showError(field, 'Please enter a valid email address.');
        valid = false;
      } else if (field.type === 'tel' && !isPhone(field.value)) {
        showError(field, 'Please enter a valid phone number.');
        valid = false;
      }
    });
    return valid;
  }

  function showError(field, msg) {
    field.style.borderColor = '#dc2626';
    const err = document.createElement('span');
    err.className = 'field-error';
    err.style.cssText = 'color:#dc2626;font-size:.78rem;margin-top:4px;display:block;';
    err.textContent = msg;
    field.parentNode.appendChild(err);
  }

  function clearError(field) {
    field.style.borderColor = '';
    const existing = field.parentNode.querySelector('.field-error');
    if (existing) existing.remove();
  }

  function isEmail(v) { return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v); }
  function isPhone(v) { return /^[\d\s\-\+\(\)]{7,}$/.test(v); }

  /* ── Toast Notification ───────────────────────────────── */
  function showToast(msg) {
    const t = document.createElement('div');
    t.textContent = msg;
    t.style.cssText = `
      position:fixed; bottom:90px; left:50%; transform:translateX(-50%);
      background:#065f46; color:#fff; padding:14px 24px; border-radius:8px;
      font-size:.9rem; box-shadow:0 8px 24px rgba(0,0,0,.15);
      z-index:9999; max-width:90vw; text-align:center;
      animation:toastIn .3s ease;
    `;
    document.head.insertAdjacentHTML('beforeend', '<style>@keyframes toastIn{from{opacity:0;transform:translate(-50%,12px)}to{opacity:1;transform:translate(-50%,0)}}</style>');
    document.body.appendChild(t);
    setTimeout(() => t.remove(), 4000);
  }

  /* ── Scroll Animations ────────────────────────────────── */
  const animEls = document.querySelectorAll('.service-card, .testimonial-card, .value-card, .area-card, .why-feature, .team-card');

  if ('IntersectionObserver' in window) {
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

    animEls.forEach((el, i) => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(20px)';
      el.style.transition = `opacity .4s ease ${i * 0.06}s, transform .4s ease ${i * 0.06}s`;
      obs.observe(el);
    });
  }

  /* ── Testimonials Filter ──────────────────────────────── */
  const filterBtns = document.querySelectorAll('.filter-btn');
  const cards = document.querySelectorAll('.testimonial-card[data-service]');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.dataset.filter;
      cards.forEach(card => {
        if (filter === 'all' || card.dataset.service === filter) {
          card.style.display = '';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  /* ── Counter Animation (hero stats) ──────────────────── */
  function animateCount(el, target, duration) {
    let start = 0;
    const step = (target / (duration / 16));
    const timer = setInterval(() => {
      start += step;
      if (start >= target) { el.textContent = el.dataset.suffix ? target + el.dataset.suffix : target + '+'; clearInterval(timer); }
      else { el.textContent = Math.floor(start) + (el.dataset.suffix || '+'); }
    }, 16);
  }

  const statNums = document.querySelectorAll('.hero-stat-num[data-count]');
  if (statNums.length) {
    const statsObs = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          const el = e.target;
          animateCount(el, parseInt(el.dataset.count), 1200);
          statsObs.unobserve(el);
        }
      });
    });
    statNums.forEach(el => statsObs.observe(el));
  }

  /* ── Hero Carousel ───────────────────────────────────── */
  const carouselTrack = document.querySelector('.carousel-track');
  if (carouselTrack) {
    const slides  = document.querySelectorAll('.carousel-slide');
    const dots    = document.querySelectorAll('.carousel-dot');
    const prevBtn = document.querySelector('.carousel-prev');
    const nextBtn = document.querySelector('.carousel-next');
    let current = 0;
    let autoTimer;

    function goTo(n) {
      slides[current].classList.remove('active');
      dots[current].classList.remove('active');
      current = (n + slides.length) % slides.length;
      slides[current].classList.add('active');
      dots[current].classList.add('active');
    }

    function resetAuto() {
      clearInterval(autoTimer);
      autoTimer = setInterval(() => goTo(current + 1), 4000);
    }

    prevBtn.addEventListener('click', () => { goTo(current - 1); resetAuto(); });
    nextBtn.addEventListener('click', () => { goTo(current + 1); resetAuto(); });
    dots.forEach((dot, i) => dot.addEventListener('click', () => { goTo(i); resetAuto(); }));

    resetAuto();
  }

  /* ── Hero Video (click-to-play) ──────────────────────── */
  const heroVideo = document.getElementById('heroVideo');
  const heroVideoBtn = document.getElementById('heroVideoBtn');
  if (heroVideo && heroVideoBtn) {
    heroVideoBtn.addEventListener('click', () => {
      heroVideoBtn.classList.add('is-hidden');
      heroVideo.play();
    });
    heroVideo.addEventListener('ended', () => heroVideoBtn.classList.remove('is-hidden'));
  }

  /* ── Phone number formatting ──────────────────────────── */
  const phoneInputs = document.querySelectorAll('input[type="tel"]');
  phoneInputs.forEach(input => {
    input.addEventListener('input', (e) => {
      let v = e.target.value.replace(/\D/g, '').slice(0, 10);
      if (v.length >= 6) v = `(${v.slice(0,3)}) ${v.slice(3,6)}-${v.slice(6)}`;
      else if (v.length >= 3) v = `(${v.slice(0,3)}) ${v.slice(3)}`;
      e.target.value = v;
    });
  });

});
