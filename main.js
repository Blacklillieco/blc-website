/* ============================================================
   BLACK LILLIE COLLECTIVE — main.js
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

  /* ── SCROLL REVEAL ── */
  const revealEls = document.querySelectorAll('.reveal, .reveal-slow');
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // stagger siblings inside same parent
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
      const isOpen = navLinks.classList.contains('open');
      navToggle.setAttribute('aria-expanded', isOpen);
    });
    // close on link click
    navLinks.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => navLinks.classList.remove('open'));
    });
  }


  /* ── CYCLING HERO WORDS ── */
  const cycler = document.getElementById('cycler');
  if (cycler) {
    const words = ['BOLD.', 'ICONIC.', 'EDITORIAL.', 'UNFORGETTABLE.', 'INTENTIONAL.', 'YOURS.'];
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
  const filterBtns = document.querySelectorAll('.filter-btn');
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

    // handle ?filter= param on page load
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
        const target = document.getElementById(`form${capitalize(tab.dataset.form)}`);
        if (target) target.classList.add('active');
      });
    });

    // handle #print / #ugc hash on page load
    const hash = window.location.hash.replace('#', '');
    if (hash === 'print' || hash === 'ugc') {
      const matchTab = document.querySelector(`.quote-tab[data-form="${hash}"]`);
      if (matchTab) matchTab.click();
    }
  }


  /* ── STACKED DECK HOVER ── */
  // handled via CSS — JS can add click to navigate
  const deck = document.querySelector('.stacked-deck');
  if (deck) {
    deck.addEventListener('click', () => {
      window.location.href = 'work.html';
    });
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
