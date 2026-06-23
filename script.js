/* ============================================================
   LAKSHMINARASIMHAN R — ENGINEERING PORTFOLIO
   GSAP ScrollTrigger animation choreography
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

  gsap.registerPlugin(ScrollTrigger);

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------------------------------------------------------
     1. HERO — "identity system coming online"
     --------------------------------------------------------- */
  function playHeroIntro() {
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

    tl.to('.hero-portrait-wrap', { opacity: 1, duration: 0.9 })
      .to('.portrait-frame', { scale: 1, duration: 1, ease: 'power3.out' }, '<')
      .to('.bp-trace', {
        strokeDashoffset: 0,
        duration: 1.4,
        stagger: 0.15,
        ease: 'power2.inOut'
      }, '<0.1')
      .to('.bp-node', { opacity: 1, duration: 0.4 }, '-=0.4')
      .to('.hero-text', { opacity: 1, duration: 0.9 }, '<0.1')
      .from('.hero-name', { y: 24, opacity: 0, duration: 0.9 }, '<')
      .from('.hud-corner', { opacity: 0, duration: 0.5, stagger: 0.06 }, '<0.2')
      .from('.hud-tag', { opacity: 0, y: 6, duration: 0.5, stagger: 0.1 }, '<');
  }

  if (reduceMotion) {
    gsap.set('.hero-text, .hero-portrait-wrap, .portrait-frame, .hud-corner, .hud-tag, .bp-trace, .bp-node', { opacity: 1, scale: 1, strokeDashoffset: 0 });
  } else {
    gsap.set('.portrait-frame', { scale: 0.96 });
    playHeroIntro();
  }

  /* subtle 3D tilt on the portrait, mouse-follow, GPU-cheap (transform only) */
  const frame = document.getElementById('portraitFrame');
  const wrap = document.querySelector('.hero-portrait-wrap');
  if (frame && wrap && !reduceMotion && window.matchMedia('(hover: hover)').matches) {
    let rect = null;
    wrap.addEventListener('mouseenter', () => { rect = wrap.getBoundingClientRect(); });
    wrap.addEventListener('mousemove', (e) => {
      if (!rect) rect = wrap.getBoundingClientRect();
      const px = (e.clientX - rect.left) / rect.width - 0.5;
      const py = (e.clientY - rect.top) / rect.height - 0.5;
      gsap.to(frame, {
        rotateY: px * 8,
        rotateX: py * -8,
        duration: 0.6,
        ease: 'power2.out'
      });
    });
    wrap.addEventListener('mouseleave', () => {
      gsap.to(frame, { rotateY: 0, rotateX: 0, duration: 0.8, ease: 'power3.out' });
    });
  }

  /* ---------------------------------------------------------
     2. PHILOSOPHY — blur-to-focus word reveal
     --------------------------------------------------------- */
  function wrapWords(el) {
    const words = el.textContent.trim().split(/\s+/);
    el.innerHTML = words.map(w => `<span class="word-wrap"><span class="word-inner">${w}</span></span>`).join(' ');
  }

  document.querySelectorAll('.reveal-words').forEach(el => {
    wrapWords(el);
    gsap.set(el.querySelectorAll('.word-inner'), { filter: 'blur(8px)', opacity: 0, y: 14 });

    ScrollTrigger.create({
      trigger: el,
      start: 'top 78%',
      once: true,
      onEnter: () => {
        gsap.to(el.querySelectorAll('.word-inner'), {
          filter: 'blur(0px)',
          opacity: 1,
          y: 0,
          duration: 0.7,
          stagger: 0.06,
          ease: 'power2.out'
        });
      }
    });
  });

  gsap.utils.toArray('.reveal-line').forEach((line, i) => {
    gsap.set(line, { opacity: 0, y: 10 });
    ScrollTrigger.create({
      trigger: line,
      start: 'top 85%',
      once: true,
      onEnter: () => gsap.to(line, { opacity: 1, y: 0, duration: 0.7, ease: 'power2.out' })
    });
  });

  /* draw the divider tick as it scrolls in */
  gsap.set('.phil-divider-line', { scaleY: 0, transformOrigin: 'top' });
  ScrollTrigger.create({
    trigger: '.phil-divider',
    start: 'top 80%',
    once: true,
    onEnter: () => gsap.to('.phil-divider-line', { scaleY: 1, duration: 0.8, ease: 'power2.out' })
  });

  /* ---------------------------------------------------------
     3. SECTION HEADS — fade/rise on scroll
     --------------------------------------------------------- */
  gsap.utils.toArray('.section-head').forEach(head => {
    gsap.set(head, { opacity: 0, y: 20 });
    ScrollTrigger.create({
      trigger: head,
      start: 'top 85%',
      once: true,
      onEnter: () => gsap.to(head, { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' })
    });
  });

  /* ---------------------------------------------------------
     4. SPECS MATRIX — staggered card reveal
     --------------------------------------------------------- */
  gsap.set('.spec-card', { opacity: 0, y: 24 });
  ScrollTrigger.create({
    trigger: '.specs-grid',
    start: 'top 80%',
    once: true,
    onEnter: () => gsap.to('.spec-card', { opacity: 1, y: 0, duration: 0.7, stagger: 0.12, ease: 'power2.out' })
  });

  /* ---------------------------------------------------------
     5. MISSION LOGS — staggered card reveal
     --------------------------------------------------------- */
  gsap.set('.mission-card', { opacity: 0, y: 28 });
  ScrollTrigger.create({
    trigger: '.missions-grid',
    start: 'top 80%',
    once: true,
    onEnter: () => gsap.to('.mission-card', { opacity: 1, y: 0, duration: 0.7, stagger: 0.14, ease: 'power2.out' })
  });

  /* ---------------------------------------------------------
     6. JOURNEY — sequential node reveal with line draw
     --------------------------------------------------------- */
  gsap.utils.toArray('.journey-node').forEach((node, i) => {
    gsap.set(node, { opacity: 0, y: 24 });
    ScrollTrigger.create({
      trigger: node,
      start: 'top 82%',
      once: true,
      onEnter: () => gsap.to(node, { opacity: 1, y: 0, duration: 0.7, ease: 'power2.out' })
    });
  });

  /* ---------------------------------------------------------
     7. FOOTER — channel reveal
     --------------------------------------------------------- */
  gsap.set('.footer-channel', { opacity: 0, y: 16 });
  ScrollTrigger.create({
    trigger: '.footer-channels',
    start: 'top 88%',
    once: true,
    onEnter: () => gsap.to('.footer-channel', { opacity: 1, y: 0, duration: 0.6, stagger: 0.1, ease: 'power2.out' })
  });

  /* ---------------------------------------------------------
     8. NAVBAR — border intensifies after hero
     --------------------------------------------------------- */
  ScrollTrigger.create({
    trigger: '.hero',
    start: 'bottom top',
    onEnter: () => gsap.to('.navbar', { borderColor: 'rgba(148, 163, 184, 0.32)', duration: 0.4 }),
    onLeaveBack: () => gsap.to('.navbar', { borderColor: 'rgba(148, 163, 184, 0.18)', duration: 0.4 })
  });

});
