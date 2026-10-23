(function () {
  var d = document, header = d.querySelector('.site-header');
  var btn = d.querySelector('.menu-btn'), nav = d.getElementById('site-nav');

  d.getElementById('year').textContent = new Date().getFullYear();

  function onScroll() { header.classList.toggle('scrolled', window.scrollY > 40); }
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  function setMenu(open) {
    btn.setAttribute('aria-expanded', open);
    nav.classList.toggle('open', open);
    header.classList.toggle('menu-open', open);
  }
  btn.addEventListener('click', function () { setMenu(btn.getAttribute('aria-expanded') !== 'true'); });
  nav.addEventListener('click', function (e) { if (e.target.closest('a')) setMenu(false); });
  d.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && nav.classList.contains('open')) { setMenu(false); btn.focus(); }
  });

  // Missing photos: hide the figure so the layout stays intact.
  function missing(img) {
    var fig = img.closest('figure');
    if (fig) { fig.hidden = true; var s = img.closest('section'); if (s) s.classList.add('no-photo'); }
  }
  d.querySelectorAll('img').forEach(function (img) {
    img.addEventListener('error', function () { missing(img); });
    if (img.complete && img.naturalWidth === 0) missing(img);
  });

  // Gentle reveal, skipped for reduced motion.
  var items = d.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && !matchMedia('(prefers-reduced-motion: reduce)').matches) {
    var io = new IntersectionObserver(function (es) {
      es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
    }, { rootMargin: '0px 0px -8% 0px' });
    items.forEach(function (el) { el.classList.add('pending'); io.observe(el); });
  }
})();
                               
