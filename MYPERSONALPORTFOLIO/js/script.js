/* =====================================================================
   SCRIPT.JS
   Every feature is written as its own small function and called
   from the bottom of this file. This makes it easy to teach one
   function at a time in class, and easy for students to remove a
   feature they don't want by deleting one function call.
===================================================================== */

/* ---------------------------------------------------------------------
   1. LOADER
   Hides the loader once the whole page (images included) has loaded.
--------------------------------------------------------------------- */
function initLoader() {
  const loader = document.getElementById('loader');
  window.addEventListener('load', () => {
    setTimeout(() => {
      loader.classList.add('loaded');
    }, 500); // small delay so the animation is actually visible in class
  });
}

/* ---------------------------------------------------------------------
   2. AOS (Animate On Scroll) LIBRARY INIT
--------------------------------------------------------------------- */
function initAOS() {
  if (typeof AOS !== 'undefined') {
    AOS.init({
      duration: 800,
      easing: 'ease-out-cubic',
      once: true,      // only animate the first time an element appears
      offset: 80,
    });
  }
}

/* ---------------------------------------------------------------------
   3. NAVBAR: background on scroll + active link highlighting
--------------------------------------------------------------------- */
function initNavbar() {
  const navbar = document.getElementById('navbar');
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  window.addEventListener('scroll', () => {
    // Add background once the user scrolls past the hero a bit
    navbar.classList.toggle('scrolled', window.scrollY > 40);

    // Highlight the nav link matching the section currently in view
    let currentSection = '';
    sections.forEach((section) => {
      const sectionTop = section.offsetTop - 140;
      if (window.scrollY >= sectionTop) {
        currentSection = section.getAttribute('id');
      }
    });

    navLinks.forEach((link) => {
      link.classList.toggle('active-link', link.getAttribute('href') === `#${currentSection}`);
    });
  });
}

/* ---------------------------------------------------------------------
   4. MOBILE HAMBURGER MENU
--------------------------------------------------------------------- */
function initHamburger() {
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('navLinks');

  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('open');
    navLinks.classList.toggle('open');
  });

  // Close the menu whenever a link is tapped (nicer mobile experience)
  navLinks.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('open');
      navLinks.classList.remove('open');
    });
  });
}

/* ---------------------------------------------------------------------
   5. SCROLL PROGRESS BAR
--------------------------------------------------------------------- */
function initScrollProgress() {
  const bar = document.getElementById('scrollProgress');

  window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = (scrollTop / docHeight) * 100;
    bar.style.width = `${progress}%`;
  });
}

/* ---------------------------------------------------------------------
   6. CURSOR GLOW (follows the mouse on desktop)
--------------------------------------------------------------------- */
function initCursorGlow() {
  const glow = document.getElementById('cursorGlow');
  // Skip on touch devices — there's no mouse to follow
  if (window.matchMedia('(pointer: coarse)').matches) {
    glow.style.display = 'none';
    return;
  }

  window.addEventListener('mousemove', (e) => {
    glow.style.left = `${e.clientX}px`;
    glow.style.top = `${e.clientY}px`;
  });
}

/* ---------------------------------------------------------------------
   7. HERO TYPING EFFECT
   Cycles through a list of phrases, typing and deleting each one.
--------------------------------------------------------------------- */
function initTypingEffect() {
  const el = document.getElementById('typedText');
  if (!el) return;

  // Replace these phrases with your own — keep them short so they fit on one line
  const phrases = ['clear dashboards', 'business decisions', 'SQL queries', 'Python insights', 'Power BI reports'];

  let phraseIndex = 0;
  let charIndex = 0;
  let isDeleting = false;

  function type() {
    const currentPhrase = phrases[phraseIndex];

    if (isDeleting) {
      charIndex--;
    } else {
      charIndex++;
    }

    el.textContent = currentPhrase.substring(0, charIndex);

    let speed = isDeleting ? 45 : 90;

    if (!isDeleting && charIndex === currentPhrase.length) {
      speed = 1400; // pause at the end of a full word
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      phraseIndex = (phraseIndex + 1) % phrases.length;
      speed = 300;
    }

    setTimeout(type, speed);
  }

  type();
}

/* ---------------------------------------------------------------------
   8. ANIMATED COUNTERS (stat cards in the About section)
   Uses IntersectionObserver so the count-up only plays once the
   card is actually visible on screen.
--------------------------------------------------------------------- */
function initCounters() {
  const counters = document.querySelectorAll('.counter');
  if (!counters.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach((counter) => observer.observe(counter));

  function animateCounter(counter) {
    const target = parseInt(counter.dataset.target, 10);
    const duration = 1500;
    const startTime = performance.now();

    function update(now) {
      const progress = Math.min((now - startTime) / duration, 1);
      counter.textContent = Math.floor(progress * target);
      if (progress < 1) {
        requestAnimationFrame(update);
      } else {
        counter.textContent = target; // avoid rounding gaps at the end
      }
    }

    requestAnimationFrame(update);
  }
}

/* ---------------------------------------------------------------------
   9. SKILL PROGRESS BARS
   Fills each bar to its data-percent only when scrolled into view.
--------------------------------------------------------------------- */
function initSkillBars() {
  const bars = document.querySelectorAll('.skill-fill');
  if (!bars.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const percent = entry.target.dataset.percent;
        entry.target.style.width = `${percent}%`;
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.4 });

  bars.forEach((bar) => observer.observe(bar));
}

/* ---------------------------------------------------------------------
   10. CONTACT FORM VALIDATION + FAKE SUBMIT ANIMATION
--------------------------------------------------------------------- */
function initContactForm() {
  const form = document.getElementById('contactForm');
  if (!form) return;

  const successBox = document.getElementById('formSuccess');

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('nameInput');
    const email = document.getElementById('emailInput');
    const message = document.getElementById('messageInput');

    let isValid = true;

    isValid = validateField(name, name.value.trim().length > 0) && isValid;
    isValid = validateField(email, isValidEmail(email.value.trim())) && isValid;
    isValid = validateField(message, message.value.trim().length > 0) && isValid;

    if (isValid) {
      successBox.classList.add('visible');
      form.reset();
      // Move labels back down after reset
      form.querySelectorAll('.form-group').forEach((g) => g.classList.remove('invalid'));

      setTimeout(() => {
        successBox.classList.remove('visible');
      }, 4000);
    }
  });

  function validateField(input, condition) {
    const group = input.closest('.form-group');
    group.classList.toggle('invalid', !condition);
    return condition;
  }

  function isValidEmail(value) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  }
}

/* ---------------------------------------------------------------------
   11. BUTTON RIPPLE EFFECT
--------------------------------------------------------------------- */
function initRippleEffect() {
  document.querySelectorAll('.btn').forEach((btn) => {
    btn.addEventListener('click', function (e) {
      const rect = this.getBoundingClientRect();
      const ripple = document.createElement('span');
      const size = Math.max(rect.width, rect.height);

      ripple.className = 'ripple';
      ripple.style.width = ripple.style.height = `${size}px`;
      ripple.style.left = `${e.clientX - rect.left - size / 2}px`;
      ripple.style.top = `${e.clientY - rect.top - size / 2}px`;

      this.appendChild(ripple);
      setTimeout(() => ripple.remove(), 600);
    });
  });
}

/* ---------------------------------------------------------------------
   12. MAGNETIC BUTTONS
   Makes primary buttons gently follow the cursor on hover — a nice
   "premium" micro-interaction used a lot on agency sites.
--------------------------------------------------------------------- */
function initMagneticButtons() {
  if (window.matchMedia('(pointer: coarse)').matches) return; // skip on touch

  document.querySelectorAll('.btn-primary').forEach((btn) => {
    btn.addEventListener('mousemove', (e) => {
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      btn.style.transform = `translate(${x * 0.15}px, ${y * 0.35}px)`;
    });

    btn.addEventListener('mouseleave', () => {
      btn.style.transform = '';
    });
  });
}

/* ---------------------------------------------------------------------
   13. AI ASSISTANT FLOATING BUTTON (dummy functionality)
--------------------------------------------------------------------- */
function initAIAssistant() {
  const btn = document.getElementById('aiBtn');
  const popup = document.getElementById('aiPopup');
  if (!btn) return;

  // Show the "Need help?" popup automatically once, after a short delay
  setTimeout(() => popup.classList.add('visible'), 3000);

  btn.addEventListener('click', () => {
    popup.classList.toggle('visible');
    // This is where a real chat widget would open.
    // For this workshop it's just a demo, so we show an alert instead.
    alert('This is a dummy AI Assistant button for the workshop demo. Connect your own chatbot here!');
  });
}

/* ---------------------------------------------------------------------
   14. BACK TO TOP BUTTON
--------------------------------------------------------------------- */
function initBackToTop() {
  const btn = document.getElementById('backToTop');
  if (!btn) return;

  window.addEventListener('scroll', () => {
    btn.classList.toggle('visible', window.scrollY > 500);
  });

  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

/* ---------------------------------------------------------------------
   15. FOOTER YEAR (auto-updates so students never see an outdated year)
--------------------------------------------------------------------- */
function initFooterYear() {
  const yearEl = document.getElementById('year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }
}

/* ---------------------------------------------------------------------
   RUN EVERYTHING ONCE THE DOM IS READY
--------------------------------------------------------------------- */
document.addEventListener('DOMContentLoaded', () => {
  initLoader();
  initAOS();
  initNavbar();
  initHamburger();
  initScrollProgress();
  initCursorGlow();
  initTypingEffect();
  initCounters();
  initSkillBars();
  initContactForm();
  initRippleEffect();
  initMagneticButtons();
  initAIAssistant();
  initBackToTop();
  initFooterYear();
});
