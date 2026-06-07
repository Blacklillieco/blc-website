/* ============================================================
   BLACK LILLIE COLLECTIVE — main.js
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

  /* ── LILY DRAW-ON HERO ANIMATION ── */
  const lilyHero = document.getElementById('lilyHero');
  const heroText = document.getElementById('heroText');
  const lilyDraw = document.querySelector('.lily-draw');
  const lilyGlow = document.getElementById('lilyGlow');

  if (lilyHero && heroText && lilyDraw) {
    // Draw order: stamens → dots → petals → leaves → bud
    const drawOrder = [
      { nth: 1,  type: 'stroke', delay: 200  },  // stamen 1
      { nth: 2,  type: 'stroke', delay: 420  },  // stamen 2
      { nth: 3,  type: 'stroke', delay: 600  },  // stamen 3
      { nth: 4,  type: 'dot',    delay: 860  },  // dot top
      { nth: 5,  type: 'dot',    delay: 980  },  // dot right
      { nth: 6,  type: 'dot',    delay: 1100 },  // dot left
      { nth: 7,  type: 'stroke', delay: 1280 },  // left petal
      { nth: 8,  type: 'stroke', delay: 1720 },  // right petal
      { nth: 9,  type: 'stroke', delay: 2160 },  // bottom leaf
      { nth: 10, type: 'stroke', delay: 2560 },  // top leaf
      { nth: 11, type: 'stroke', delay: 2920 },  // bud fill
      { nth: 12, type: 'stroke', delay: 3280 },  // lower bud
    ];

    const allEls = lilyDraw.querySelectorAll('.ld');

    drawOrder.forEach(({ nth, type, delay }) => {
      const el = allEls[nth - 1];
      if (!el) return;
      setTimeout(() => {
        if (type === 'stroke') {
          let len = 300;
          try { len = el.getTotalLength(); } catch(e) {}
          el.style.setProperty('--len', len);
          el.classList.add('animate-stroke');
        } else {
          el.classList.add('animate-dot');
        }
      }, delay);
    });

    // Glow appears after all paths drawn
    const lastDelay = 3280 + 700;
    setTimeout(() => {
      lilyDraw.classList.add('glowing');
      if (lilyGlow) lilyGlow.classList.add('active');
    }, lastDelay);

    // Lily fades to ghost, hero text fades in
    setTimeout(() => {
      lilyDraw.style.opacity = '0.08';
      heroText.classList.add('visible');
    }, lastDelay + 500);
  }


  /* ── SCROLL REVEAL ── */
  const revealEls = document.querySelectorAll('.reveal, .reveal-slow');
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const siblings = entry.target.parentElement?.querySelectorAll('.reveal, .reveal-slow');
        if (siblings) {
          siblings.forEach((el, i) => {
            if (!el.classList.contains('revealed')) {
              setTimeout(() => el.classList.add('revealed'), i * 80);
            }
          });
        }
        entry.target.classList.add('revealed');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  revealEls.forEach(el => revealObserver.observe(el));


  /* ── NAV SCROLL EFFECT ── */
  const nav = document.getElementById('nav');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 60) nav.classList.add('scrolled');
    else nav.classList.remove('scrolled');
  }, { passive: true });


  /* ── MOBILE NAV TOGGLE ── */
  const navToggle = document.getElementById('navToggle');
  const navLinks  = document.getElementById('navLinks');
  if (navToggle && navLinks) {
    navToggle.addEventListener('click', () => {
      navLinks.classList.toggle('open');
      navToggle.setAttribute('aria-expanded', navLinks.classList.contains('open'));
    });
    navLinks.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => navLinks.classList.remove('open'));
    });
  }


  /* ── CYCLING HERO WORDS ── */
  const cycler = document.getElementById('cycler');
  if (cycler) {
    const words = ['bold.', 'iconic.', 'editorial.', 'unforgettable.', 'intentional.', 'yours.'];
    let idx = 0;
    setInterval(() => {
      cycler.classList.add('fade');
      setTimeout(() => {
        idx = (idx + 1) % words.length;
        cycler.textContent = words[idx];
        cycler.classList.remove('fade');
      }, 320);
    }, 2200);
  }


  /* ── PORTFOLIO FILTER ── */
  const filterBtns    = document.querySelectorAll('.filter-btn');
  const portfolioCards = document.querySelectorAll('.portfolio-card');
  if (filterBtns.length && portfolioCards.length) {
    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const filter = btn.dataset.filter;
        portfolioCards.forEach(card => {
          if (filter === 'all' || card.dataset.category === filter) {
            card.classList.remove('hidden');
          } else {
            card.classList.add('hidden');
          }
        });
      });
    });
    const params = new URLSearchParams(window.location.search);
    const initFilter = params.get('filter');
    if (initFilter) {
      const matchBtn = document.querySelector(`.filter-btn[data-filter="${initFilter}"]`);
      if (matchBtn) matchBtn.click();
    }
  }


  /* ── QUOTE PAGE TABS ── */
  const quoteTabs  = document.querySelectorAll('.quote-tab');
  const quoteForms = document.querySelectorAll('.quote-form-wrap');
  if (quoteTabs.length) {
    quoteTabs.forEach(tab => {
      tab.addEventListener('click', () => {
        quoteTabs.forEach(t => t.classList.remove('active'));
        quoteForms.forEach(f => f.classList.remove('active'));
        tab.classList.add('active');
        const target = document.getElementById('form' + capitalize(tab.dataset.form));
        if (target) target.classList.add('active');
      });
    });
    const hash = window.location.hash.replace('#', '');
    if (hash === 'print' || hash === 'ugc') {
      const matchTab = document.querySelector(`.quote-tab[data-form="${hash}"]`);
      if (matchTab) matchTab.click();
    }
  }


  /* ── STACKED DECK CLICK ── */
  const deck = document.querySelector('.stacked-deck');
  if (deck) {
    deck.addEventListener('click', () => { window.location.href = 'work.html'; });
  }


  /* ── SMOOTH ANCHOR SCROLL ── */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', e => {
      const id = anchor.getAttribute('href').slice(1);
      const target = document.getElementById(id);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });


  /* ── ACTIVE NAV LINK ── */
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(a => {
    const href = a.getAttribute('href');
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
      a.classList.add('active');
    }
  });

});

function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
