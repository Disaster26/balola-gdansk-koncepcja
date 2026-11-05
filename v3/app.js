(function () {
  'use strict';
  var burger = document.querySelector('.burger');
  var nav = document.getElementById('nav');
  if (burger && nav) {
    var lab = burger.getAttribute('data-otworz'), labX = burger.getAttribute('data-zamknij');
    function zamknij() { nav.classList.remove('otw'); burger.setAttribute('aria-expanded', 'false'); burger.setAttribute('aria-label', lab); }
    burger.addEventListener('click', function () {
      var o = !nav.classList.contains('otw');
      nav.classList.toggle('otw', o);
      burger.setAttribute('aria-expanded', String(o));
      burger.setAttribute('aria-label', o ? labX : lab);
    });
    nav.addEventListener('click', function (e) { if (e.target.closest('a')) zamknij(); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape') zamknij(); });
    window.addEventListener('resize', function () { if (window.innerWidth >= 1000) zamknij(); });
  }

  /* pasek rezerwacji na telefonie: pojawia sie dopiero, gdy przycisk z pierwszego ekranu zniknie */
  var mob = document.getElementById('mob');
  var cta = document.querySelector('[data-cta]');
  if (mob && cta && 'IntersectionObserver' in window) {
    var stopka = document.querySelector('.stopka');
    var ctaWidac = true, stopkaWidac = false;
    function ustaw() {
      var w = !ctaWidac && !stopkaWidac;
      mob.classList.toggle('widac', w);
      mob.setAttribute('aria-hidden', String(!w));
      mob.querySelectorAll('a').forEach(function (a) { a.tabIndex = w ? 0 : -1; });
    }
    new IntersectionObserver(function (en) { ctaWidac = en[0].isIntersecting || en[0].boundingClientRect.top > 0; ustaw(); }).observe(cta);
    if (stopka) new IntersectionObserver(function (en) { stopkaWidac = en[0].isIntersecting; ustaw(); }, { rootMargin: '0px 0px -40px 0px' }).observe(stopka);
  }

  /* cennik: przejscie z menu kategorii otwiera kategorie */
  function otworzZHash() {
    if (!location.hash) return;
    var el = document.getElementById(location.hash.slice(1));
    if (el && el.tagName === 'DETAILS') el.open = true;
  }
  window.addEventListener('hashchange', otworzZHash);
  otworzZHash();

  /* formularz w wizualizacji nie wysyla danych */
  var f = document.querySelector('form[data-demo]');
  if (f) f.addEventListener('submit', function (e) {
    e.preventDefault();
    var i = f.querySelector('.form-info');
    if (i) i.textContent = f.getAttribute('data-demo');
  });
})();
