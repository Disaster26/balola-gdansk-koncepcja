(function () {
  'use strict';
  /* menu */
  var burger = document.querySelector('.burger');
  var nav = document.getElementById('nav');
  if (burger && nav) {
    var lab = burger.getAttribute('data-otworz'), labX = burger.getAttribute('data-zamknij');
    var ustawMenu = function (o) {
      nav.classList.toggle('otw', o);
      document.body.classList.toggle('menu-otw', o);
      burger.setAttribute('aria-expanded', String(o));
      burger.setAttribute('aria-label', o ? labX : lab);
    };
    burger.addEventListener('click', function () { ustawMenu(!nav.classList.contains('otw')); });
    nav.addEventListener('click', function (e) { if (e.target.closest('a')) ustawMenu(false); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape') ustawMenu(false); });
    window.addEventListener('resize', function () { if (window.innerWidth >= 1000) ustawMenu(false); });
  }

  /* biezacy rok w stopce */
  document.querySelectorAll('[data-rok]').forEach(function (el) { el.textContent = String(new Date().getFullYear()); });

  /* pasek rezerwacji na telefonie: dopiero gdy przycisk z pierwszego ekranu zniknie */
  var mob = document.getElementById('mob');
  var cta = document.querySelector('[data-cta]');
  if (mob && cta && 'IntersectionObserver' in window) {
    var stopka = document.querySelector('.stopka');
    var ctaWidac = true, stopkaWidac = false;
    var ustaw = function () {
      var w = !ctaWidac && !stopkaWidac;
      mob.classList.toggle('widac', w);
      mob.setAttribute('aria-hidden', String(!w));
      mob.querySelectorAll('a').forEach(function (a) { a.tabIndex = w ? 0 : -1; });
    };
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

  /* galeria: palec (natywnie), mysz (przeciaganie), strzalki, licznik */
  document.querySelectorAll('[data-gal]').forEach(function (g) {
    var tor = g.querySelector('.gal-tor');
    var els = Array.prototype.slice.call(tor.children);
    var licz = g.querySelector('.gal-licz b');
    var prev = g.querySelector('[data-kier="-1"]'), next = g.querySelector('[data-kier="1"]');
    var pad = function () { return parseFloat(getComputedStyle(tor).paddingLeft) || 0; };
    var biezacy = function () {
      var x = tor.scrollLeft + pad() + 2, idx = 0;
      els.forEach(function (el, i) { if (el.offsetLeft - tor.offsetLeft <= x) idx = i; });
      if (tor.scrollLeft + tor.clientWidth >= tor.scrollWidth - 4) idx = els.length - 1;
      return idx;
    };
    var odswiez = function () {
      var i = biezacy();
      if (licz) licz.textContent = String(i + 1);
      if (prev) prev.disabled = tor.scrollLeft <= 2;
      if (next) next.disabled = tor.scrollLeft + tor.clientWidth >= tor.scrollWidth - 4;
    };
    var idz = function (k) {
      var i = Math.max(0, Math.min(els.length - 1, biezacy() + k));
      tor.scrollTo({ left: els[i].offsetLeft - tor.offsetLeft - pad(), behavior: 'smooth' });
    };
    if (prev) prev.addEventListener('click', function () { idz(-1); });
    if (next) next.addEventListener('click', function () { idz(1); });
    tor.addEventListener('keydown', function (e) {
      if (e.key === 'ArrowRight') { e.preventDefault(); idz(1); }
      if (e.key === 'ArrowLeft') { e.preventDefault(); idz(-1); }
    });
    var t;
    tor.addEventListener('scroll', function () { clearTimeout(t); t = setTimeout(odswiez, 60); }, { passive: true });
    window.addEventListener('resize', odswiez);
    /* przeciaganie mysza */
    var start = null, sl = 0, ruch = false;
    tor.addEventListener('pointerdown', function (e) {
      if (e.pointerType !== 'mouse' || e.button !== 0) return;
      start = e.clientX; sl = tor.scrollLeft; ruch = false;
    });
    window.addEventListener('pointermove', function (e) {
      if (start === null) return;
      var dx = e.clientX - start;
      if (!ruch && Math.abs(dx) > 5) { ruch = true; tor.classList.add('ciagnie'); }
      if (ruch) tor.scrollLeft = sl - dx;
    });
    window.addEventListener('pointerup', function () {
      if (start === null) return;
      start = null;
      if (ruch) { tor.classList.remove('ciagnie'); var i = biezacy(); tor.scrollTo({ left: els[i].offsetLeft - tor.offsetLeft - pad(), behavior: 'smooth' }); }
    });
    tor.addEventListener('click', function (e) { if (ruch) { e.preventDefault(); e.stopPropagation(); ruch = false; } }, true);
    odswiez();
  });

  /* baner cookies: wybor zapisany na 12 miesiecy; mapa Google laduje sie od razu, przy odmowie zastepnik */
  var KLUCZ = 'balola-cookies';
  var ban = document.getElementById('cookies');
  var czytaj = function () {
    try {
      var v = JSON.parse(localStorage.getItem(KLUCZ) || 'null');
      if (v && v.t && Date.now() - v.t < 365 * 864e5) return v;
    } catch (e) {}
    return null;
  };
  var zapisz = function (zewn) {
    try { localStorage.setItem(KLUCZ, JSON.stringify({ zewn: !!zewn, t: Date.now() })); } catch (e) {}
    zastosuj({ zewn: !!zewn });
  };
  var zastosuj = function (v) {
    var zgoda = !v || v.zewn;
    document.querySelectorAll('.mapa-okno').forEach(function (m) {
      var f = m.querySelector('iframe[data-mapa]'), z = m.querySelector('.mapa-zast');
      if (!f || !z) return;
      if (!f.getAttribute('data-src')) f.setAttribute('data-src', f.getAttribute('src'));
      if (zgoda) { if (f.getAttribute('src') !== f.getAttribute('data-src')) f.setAttribute('src', f.getAttribute('data-src')); f.hidden = false; z.hidden = true; }
      else { f.removeAttribute('src'); f.hidden = true; z.hidden = false; }
    });
  };
  if (ban) {
    var ust = ban.querySelector('.cookies-ust'), chk = ban.querySelector('[data-zgoda="zewn"]');
    var btnSave = ban.querySelector('[data-cookies="save"]'), btnSet = ban.querySelector('[data-cookies="set"]');
    var pokaz = function (zUst) {
      var v = czytaj();
      if (chk) chk.checked = v ? !!v.zewn : false;
      ust.hidden = !zUst; btnSave.hidden = !zUst; btnSet.hidden = !!zUst;
      ban.hidden = false;
    };
    ban.addEventListener('click', function (e) {
      var b = e.target.closest('[data-cookies]');
      if (!b) return;
      var a = b.getAttribute('data-cookies');
      if (a === 'all') { zapisz(true); ban.hidden = true; }
      else if (a === 'nec') { zapisz(false); ban.hidden = true; }
      else if (a === 'set') { pokaz(true); }
      else if (a === 'save') { zapisz(chk && chk.checked); ban.hidden = true; }
    });
    document.querySelectorAll('[data-cookies-otworz]').forEach(function (b) { b.addEventListener('click', function () { pokaz(true); }); });
    var v0 = czytaj();
    zastosuj(v0);
    if (!v0) pokaz(false);
  }

  /* formularz w wersji testowej nie wysyla danych */
  var f = document.querySelector('form[data-demo]');
  if (f) f.addEventListener('submit', function (e) {
    e.preventDefault();
    var i = f.querySelector('.form-info');
    if (i) i.textContent = f.getAttribute('data-demo');
  });
})();
