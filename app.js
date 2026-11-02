(function () {
  'use strict';

  var EN = {
    nav1: 'Treatments', nav2: 'Your visit', nav3: 'Technology', nav4: 'The place', nav5: 'Contact',
    btnTop: 'Book now',
    heroAdr: 'Hotel Gdańsk Boutique, 5th floor · 9 Szafarnia Street',
    h1: 'Cosmetology and calm overlooking the Motława',
    lead: 'Cosmetology treatments and <span class="nw">hi-tech</span> devices combined with relaxation, wellness and longevity. Balola’s second location after Sopot - for Tricity locals and hotel guests.',
    btnBook: 'Book on Booksy', btnZab: 'See treatments',
    zabH: 'Treatments chosen after a skin diagnosis',
    zabP: 'A cosmetology consultation with skin analysis is part of every treatment, so your plan answers what your skin needs, not what is in fashion.',
    k1h: 'Skin diagnosis', k1p: 'Observ 520x reveals what the naked eye cannot see: 8 lighting modes and before-and-after photos.',
    k2h: 'Facial treatments', k2p: 'Pigmentation brightening, face, neck and décolletage care, oxybrasion, Kobido massage.',
    k3h: 'Mesotherapy and hi-tech', k3p: 'Dermapen, Vivace microneedle RF, Geneo, Bloomea, Zaffiro thermolifting.',
    k4h: 'Laser: veins and hair removal', k4p: 'Thread vein closure and MeDioStar Next laser hair removal, also on tanned skin.',
    k5h: 'Lashes and brows', k5p: 'Lash lamination and botox, extensions and volume, brow tinting and shaping.',
    k6h: 'Permanent make-up', k6p: 'Lips and brows in the perfect shape and colour all day, without daily make-up.',
    c1: 'Manual therapies', c2: 'Aesthetic medicine', c3: 'Body treatments', c4: 'Scalp and hair', c5: 'Manicure and pedicure', c6: 'Podiatry',
    zabNote: 'Based on the Balola Sopot menu. Treatments available in Gdańsk to be confirmed.',
    wizH: 'Every visit starts with a conversation',
    wizP: 'You expect results now, not after the last of ten sessions. That is why we rely on devices and dermocosmetics with proven efficacy, and on a plan that makes sense for your skin.',
    w1: '<strong>Consultation and diagnosis.</strong> A cosmetologist assesses your skin and talks through your expectations.',
    w2: '<strong>Treatment plan.</strong> We combine hi-tech devices with manual therapies for lasting results.',
    w3: '<strong>Treatment and rest.</strong> In a calm spa with views over the Motława river.',
    w4: '<strong>Home care.</strong> We match products from RVB LAB, PROXN, Diego dalla Palma and IMAGE Skincare.',
    techH: 'Technology we trust',
    techP: 'Non-invasive devices that give visible results without long downtime. Selected from Balola’s equipment.',
    u1: 'Lumenis modular system: IPL light and ResurFX fractional laser for pigmentation, vessels and photorejuvenation.',
    u2: 'Macro-exfoliation, micro-vibrations and red light. Results close to resurfacing, with no pain or downtime.',
    u3: 'Skin analysis in eight lighting modes, with a report and before-and-after comparison.',
    u4: 'Alma Lasers hydrodermabrasion: deep cleansing, nourishing and hydration in one treatment.',
    fotCap: 'The Motława in Gdańsk. Photo: Silar, Wikimedia Commons, CC BY-SA 4.0 (illustration)',
    mscH: 'On the 5th floor, above the Motława',
    mscP: 'Balola Gdańsk is located in Hotel Gdańsk Boutique at 9 Szafarnia Street, a short walk from the Main Town. Here we combine cosmetology with relaxation, wellness and longevity: care for your skin and well-being for years, not just for one evening.',
    d1h: 'For Tricity locals', d1p: 'Treatment series, skin diagnosis and a care plan led by Balola cosmetologists. Visits by appointment on Booksy.',
    d2h: 'For hotel guests', d2p: 'The spa is in the same building. A facial after your journey or a moment of calm before an evening in town. Website and booking in English.',
    balH: 'Balola, from Sopot to Gdańsk',
    balP1: 'Balola was founded in Sopot for active, demanding and informed women, built on personal experience and a long search for cosmetology that truly works.',
    balP2: 'The salon is run by Marta Socha-Kilanowska, MSc, a cosmetologist, biotechnologist and podiatrist. She treats every case holistically: skin mirrors the whole body, and results also depend on care at home.',
    balLink: 'Balola Sopot, 4/1/B Tadeusza Kościuszki Street',
    konH: 'Booking and directions',
    konHotel: 'Hotel Gdańsk Boutique, 5th floor',
    konP: 'Visits by appointment. Choose your treatment and time on Booksy; your first visit starts with a free consultation.',
    btnBook2: 'Book on Booksy', konPyt: 'Questions:', konMapa: 'Get directions in Google Maps',
    stopka1: 'Balola Gdańsk · Hotel Gdańsk Boutique, 9 Szafarnia Street · Balola Sopot · 4/1/B Tadeusza Kościuszki Street',
    stopka2: 'Concept design of the website. Content and photos from balola.pl, Gdańsk treatment menu to be confirmed. Motława photo: Silar, CC BY-SA 4.0.',
    btnBook3: 'Book on Booksy', mobDoj: 'Directions'
  };
  var META = {
    pl: { title: document.title, desc: document.querySelector('meta[name="description"]').content, menu: 'Otwórz menu', menuX: 'Zamknij menu' },
    en: { title: 'Balola Gdańsk - cosmetology spa overlooking the Motława', desc: 'Balola Gdańsk: cosmetology treatments, hi-tech devices, relaxation, wellness and longevity. Spa on the 5th floor of Hotel Gdańsk Boutique, overlooking the Motława river.', menu: 'Open menu', menuX: 'Close menu' }
  };

  var nodes = Array.prototype.slice.call(document.querySelectorAll('[data-i18n]'));
  var PL = {};
  nodes.forEach(function (n) { PL[n.getAttribute('data-i18n')] = n.innerHTML; });
  var cur = 'pl';
  var burger = document.querySelector('.burger');
  var nav = document.getElementById('nav');

  function setLang(l, save) {
    cur = l === 'en' ? 'en' : 'pl';
    var dict = cur === 'en' ? EN : PL;
    nodes.forEach(function (n) {
      var k = n.getAttribute('data-i18n');
      if (dict[k] != null) n.innerHTML = dict[k];
    });
    document.documentElement.lang = cur;
    document.title = META[cur].title;
    document.querySelector('meta[name="description"]').content = META[cur].desc;
    document.querySelectorAll('.lang button').forEach(function (b) {
      b.setAttribute('aria-pressed', String(b.getAttribute('data-lang') === cur));
    });
    burger.setAttribute('aria-label', nav.classList.contains('otw') ? META[cur].menuX : META[cur].menu);
    if (save) {
      try { localStorage.setItem('balola-lang', cur); } catch (e) {}
      try {
        var u = new URL(location.href);
        if (cur === 'en') u.searchParams.set('lang', 'en'); else u.searchParams.delete('lang');
        history.replaceState(null, '', u.pathname + u.search + u.hash);
      } catch (e) {}
    }
  }

  document.querySelectorAll('.lang button').forEach(function (b) {
    b.addEventListener('click', function () { setLang(b.getAttribute('data-lang'), true); });
  });

  var start = 'pl';
  try {
    var q = new URLSearchParams(location.search).get('lang');
    if (q) start = q;
    else if (localStorage.getItem('balola-lang')) start = localStorage.getItem('balola-lang');
  } catch (e) {}
  if (start === 'en') setLang('en', false);

  // menu mobilne
  function closeNav() {
    nav.classList.remove('otw');
    burger.setAttribute('aria-expanded', 'false');
    burger.setAttribute('aria-label', META[cur].menu);
  }
  burger.addEventListener('click', function () {
    var o = nav.classList.toggle('otw');
    burger.setAttribute('aria-expanded', String(o));
    burger.setAttribute('aria-label', o ? META[cur].menuX : META[cur].menu);
  });
  nav.addEventListener('click', function (e) { if (e.target.closest('a')) closeNav(); });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') closeNav(); });

  // dolny pasek po przewinieciu za przyciski hero
  var mob = document.getElementById('mob');
  var cta = document.getElementById('heroCta');
  if ('IntersectionObserver' in window && mob && cta) {
    new IntersectionObserver(function (en) {
      var e = en[0];
      var past = !e.isIntersecting && e.boundingClientRect.top < 0;
      mob.classList.toggle('widac', past);
      mob.setAttribute('aria-hidden', String(!past));
      mob.querySelectorAll('a').forEach(function (a) { a.tabIndex = past ? 0 : -1; });
    }).observe(cta);
  }
})();
