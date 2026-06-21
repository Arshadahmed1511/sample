document.addEventListener('DOMContentLoaded', () => {
  
  /* --- 1. MOBILE NAVIGATION TOGGLE --- */
  const navToggle = document.getElementById('nav-mobile-toggle');
  const navMenu = document.getElementById('nav-menu-list');
  const navLinks = document.querySelectorAll('.nav-link');

  if (navToggle && navMenu) {
    navToggle.addEventListener('click', () => {
      const expanded = navToggle.getAttribute('aria-expanded') === 'true';
      navToggle.setAttribute('aria-expanded', !expanded);
      navToggle.classList.toggle('active');
      navMenu.classList.toggle('active');
    });

    // Close menu when a link is clicked
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        navToggle.setAttribute('aria-expanded', 'false');
        navToggle.classList.remove('active');
        navMenu.classList.remove('active');
      });
    });
  }

  /* --- 2. HEADER SCROLL EFFECT --- */
  const header = document.getElementById('site-header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });

  /* --- 3. INTERACTIVE VEHICLE CUSTOMIZER --- */
  const colorOptions = {
    teal: {
      name: "Aurora Teal Metallic",
      range: "520 miles",
      power: "1,020 hp",
      accel: "1.89 seconds",
      drivetrain: "Tri-Motor AWD"
    },
    carbon: {
      name: "Stealth Carbon Matte",
      range: "500 miles",
      power: "1,020 hp",
      accel: "1.92 seconds",
      drivetrain: "Tri-Motor AWD"
    },
    white: {
      name: "Cosmic White Pearl",
      range: "540 miles",
      power: "850 hp",
      accel: "2.45 seconds",
      drivetrain: "Dual-Motor AWD"
    },
    amber: {
      name: "Sunset Amber Gloss",
      range: "480 miles",
      power: "1,200 hp",
      accel: "1.75 seconds",
      drivetrain: "Quad-Motor AWD"
    }
  };

  const btnTeal = document.getElementById('btn-color-teal');
  const btnCarbon = document.getElementById('btn-color-carbon');
  const btnWhite = document.getElementById('btn-color-white');
  const btnAmber = document.getElementById('btn-color-amber');

  const overlayTeal = document.getElementById('overlay-teal');
  const overlayCarbon = document.getElementById('overlay-carbon');
  const overlayWhite = document.getElementById('overlay-white');
  const overlayAmber = document.getElementById('overlay-amber');

  const labelColorName = document.getElementById('selected-color-name');
  const specRange = document.getElementById('config-range');
  const specPower = document.getElementById('config-power');
  const specAccel = document.getElementById('config-accel');
  const specDrivetrain = document.getElementById('config-drivetrain');

  const colorButtons = [btnTeal, btnCarbon, btnWhite, btnAmber];
  const overlays = [overlayTeal, overlayCarbon, overlayWhite, overlayAmber];

  function setActiveColor(colorKey, activeBtn, activeOverlay) {
    // 1. Update button states
    colorButtons.forEach(btn => {
      if (btn) {
        btn.classList.remove('active');
        btn.setAttribute('aria-checked', 'false');
      }
    });
    activeBtn.classList.add('active');
    activeBtn.setAttribute('aria-checked', 'true');

    // 2. Update image overlay tint
    overlays.forEach(overlay => {
      if (overlay) overlay.classList.remove('active');
    });
    activeOverlay.classList.add('active');

    // 3. Update Text Specifications with brief fade out/in effect
    const details = colorOptions[colorKey];
    if (details) {
      const elementsToAnimate = [labelColorName, specRange, specPower, specAccel, specDrivetrain];
      elementsToAnimate.forEach(el => {
        if (el) {
          el.style.opacity = '0';
          el.style.transform = 'translateY(5px)';
        }
      });

      setTimeout(() => {
        if (labelColorName) labelColorName.textContent = details.name;
        if (specRange) specRange.textContent = details.range;
        if (specPower) specPower.textContent = details.power;
        if (specAccel) specAccel.textContent = details.accel;
        if (specDrivetrain) specDrivetrain.textContent = details.drivetrain;

        elementsToAnimate.forEach(el => {
          if (el) {
            el.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
            el.style.opacity = '1';
            el.style.transform = 'translateY(0)';
          }
        });
      }, 250);
    }
  }

  if (btnTeal && overlayTeal) {
    btnTeal.addEventListener('click', () => setActiveColor('teal', btnTeal, overlayTeal));
  }
  if (btnCarbon && overlayCarbon) {
    btnCarbon.addEventListener('click', () => setActiveColor('carbon', btnCarbon, overlayCarbon));
  }
  if (btnWhite && overlayWhite) {
    btnWhite.addEventListener('click', () => setActiveColor('white', btnWhite, overlayWhite));
  }
  if (btnAmber && overlayAmber) {
    btnAmber.addEventListener('click', () => setActiveColor('amber', btnAmber, overlayAmber));
  }

  /* --- 4. SCROLL REVEAL ANIMATIONS --- */
  const revealElements = document.querySelectorAll('.reveal');
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        // Once visible, stop observing
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
  });

  revealElements.forEach(el => {
    revealObserver.observe(el);
  });

  /* --- 5. ACTIVE MENU ITEM ON SCROLL --- */
  const sections = document.querySelectorAll('section[id]');
  window.addEventListener('scroll', () => {
    let scrollY = window.pageYOffset;
    sections.forEach(current => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop - 100;
      const sectionId = current.getAttribute('id');
      const menuLink = document.querySelector(`.nav-menu a[href*=${sectionId}]`);

      if (menuLink) {
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
          menuLink.classList.add('active');
        } else {
          menuLink.classList.remove('active');
        }
      }
    });
  });

  /* --- 6. BOOKING FORM VALIDATION & SUCCESS HANDLER --- */
  const bookingForm = document.getElementById('test-drive-form');
  const successView = document.getElementById('booking-success-view');
  const formPanel = document.getElementById('test-drive-form'); // Reference the form tag itself
  const successUserName = document.getElementById('success-user-name');
  const successUserEmail = document.getElementById('success-user-email');
  const btnResetForm = document.getElementById('btn-success-reset');
  const inputDate = document.getElementById('input-date');

  // Set min date of booking to today
  if (inputDate) {
    const today = new Date().toISOString().split('T')[0];
    inputDate.setAttribute('min', today);
  }

  // Real-time error clearing
  const inputs = bookingForm ? bookingForm.querySelectorAll('.form-control') : [];
  inputs.forEach(input => {
    input.addEventListener('input', () => {
      if (input.value.trim() !== '') {
        input.classList.remove('error');
      }
    });
    if (input.tagName === 'SELECT' || input.type === 'date') {
      input.addEventListener('change', () => {
        input.classList.remove('error');
      });
    }
  });

  if (bookingForm) {
    bookingForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      let isValid = true;
      const nameInput = document.getElementById('input-name');
      const emailInput = document.getElementById('input-email');
      const phoneInput = document.getElementById('input-phone');
      const dateInput = document.getElementById('input-date');

      // Validation Regex
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      
      // Name validation
      if (!nameInput.value.trim()) {
        nameInput.classList.add('error');
        isValid = false;
      } else {
        nameInput.classList.remove('error');
      }

      // Email validation
      if (!emailInput.value.trim() || !emailRegex.test(emailInput.value.trim())) {
        emailInput.classList.add('error');
        isValid = false;
      } else {
        emailInput.classList.remove('error');
      }

      // Phone validation
      if (!phoneInput.value.trim()) {
        phoneInput.classList.add('error');
        isValid = false;
      } else {
        phoneInput.classList.remove('error');
      }

      // Date validation
      if (!dateInput.value) {
        dateInput.classList.add('error');
        isValid = false;
      } else {
        dateInput.classList.remove('error');
      }

      if (isValid) {
        // Show success layout
        if (successUserName) successUserName.textContent = nameInput.value.trim();
        if (successUserEmail) successUserEmail.textContent = emailInput.value.trim();
        
        bookingForm.style.display = 'none';
        successView.style.display = 'flex';
      }
    });
  }

  if (btnResetForm && bookingForm && successView) {
    btnResetForm.addEventListener('click', () => {
      bookingForm.reset();
      // Reset select model to default
      const selectModel = document.getElementById('select-model');
      if (selectModel) selectModel.value = 'performance';
      
      successView.style.display = 'none';
      bookingForm.style.display = 'block';
    });
  }

});
