// Enhanced JS: nav toggle accessibility + close on anchor click + reveal observer

document.addEventListener('DOMContentLoaded', function () {

  // Nav toggle for small screens: use class 'open' on nav-links
  const toggle = document.querySelector('.nav-toggle');
  const navLinks = document.getElementById('nav-links');
  if (toggle && navLinks) {
    toggle.addEventListener('click', () => {
      const expanded = toggle.getAttribute('aria-expanded') === 'true';
      toggle.setAttribute('aria-expanded', String(!expanded));
      navLinks.classList.toggle('open');
    });

    // Close menu when clicking a link
    navLinks.querySelectorAll('a[href^="#"]').forEach(a => {
      a.addEventListener('click', () => {
        navLinks.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // Smooth scroll for internal anchors
  document.querySelectorAll('a[href^="#"]').forEach(a=>{
    a.addEventListener('click', function(e){
      const targetId = this.getAttribute('href');
      if (targetId.length > 1) {
        e.preventDefault();
        const el = document.querySelector(targetId);
        if (el) {
          el.scrollIntoView({behavior:'smooth', block:'start'});
          // update focus for accessibility
          el.setAttribute('tabindex','-1');
          el.focus({preventScroll:true});
        }
      }
    });
  });

  // IntersectionObserver for reveal elements (sparse, low cost)
  const reveals = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries)=>{
      entries.forEach(entry=>{
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          io.unobserve(entry.target);
        }
      });
    }, {threshold: 0.08});
    reveals.forEach(r => io.observe(r));
  } else {
    // fallback: show all
    reveals.forEach(r => r.classList.add('visible'));
  }

});
