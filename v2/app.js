(function () {
  'use strict';

  var EN = {
    nav1: 'Treatments', nav2: 'Your visit', nav3: 'The place', nav4: 'Contact',
    btnTop: 'Book online',
    heroAdr: 'Hotel Gdańsk Boutique, 5th floor · 9 Szafarnia Street',
    h1: 'A cosy spa overlooking the Motława',
    lead: 'A place to slow down. Relaxation, wellness and longevity in a warm interior, and when your skin needs more, cosmetology and <span class="nw">hi-tech</span> devices.',
    btnBook: 'Book online', btnOf: 'See treatments',
    ofH: 'Rest and skin care in one place',
    ofP: 'We combine a moment of calm with cosmetology that delivers real results. Treatments are chosen for what your skin needs and how you want to feel when you leave.',
    k1h: 'Relaxation and wellness', k1p: 'Face and body rituals, massages and a moment of quiet in a warm interior. Time just for you, without rushing.',
    k2h: 'Longevity', k2p: 'Care for your skin and well-being for years to come: recovery, good habits and a skincare plan you can keep up.',
    k3h: 'Cosmetology and skin analysis', k3p: 'Every plan starts with an assessment of your skin. A cosmetologist chooses treatments and home care to match its needs.',
    k4h: 'Hi-tech devices', k4p: 'Modern, non-invasive devices where a visible effect is needed. In the same calm, comforting atmosphere.',
    ofNote: 'Sample menu - the Gdańsk treatment menu will be completed with your materials.',
    wizH: 'A visit at your own pace',
    wizP: 'There is no rush at Balola Gdańsk. The treatment is only part of the visit; how you feel before and after matters just as much.',
    w1: '<strong>A calm welcome.</strong> A moment to unwind and a conversation about what you need today.',
    w2: '<strong>Consultation.</strong> A cosmetologist assesses your skin and suggests a treatment or a series suited to your goal.',
    w3: '<strong>Treatment.</strong> Skilled hands and hi-tech devices, each used where it makes sense.',
    w4: '<strong>Rest and home care.</strong> Time to stay a little longer, and advice that helps the results last.',
    fotCap: 'The Motława in Gdańsk. Photo: Silar, Wikimedia Commons, CC BY-SA 4.0 (illustration, warmed colours)',
    mscH: 'On the 5th floor, above the Motława',
    mscP: 'Balola Gdańsk is located in Hotel Gdańsk Boutique at 9 Szafarnia Street, a short walk from the Main Town. Warm beiges, wood and soft light make it easy to forget the city outside the window.',
    d1h: 'For Tricity locals', d1p: 'Treatment series and a skincare plan led by Balola cosmetologists, with regular visits in a calm place.',
    d2h: 'For hotel guests', d2p: 'The spa is in the same building. A ritual after your journey or a moment of calm before an evening in town. Website and booking in English.',
    balH: 'Balola, from Sopot to Gdańsk',
    balP1: 'Balola was founded in Sopot for active, demanding and informed women. In Gdańsk we keep the same focus on effective care, in a calmer, more homely setting.',
    balP2: 'The salon is run by Marta Socha-Kilanowska, MSc, a cosmetologist, biotechnologist and podiatrist. She treats every case holistically: skin mirrors the whole body, and results also depend on everyday care.',
    balLink: 'Balola Sopot, 4/1/B Tadeusza Kościuszki Street',
    konH: 'Booking and directions',
    konHotel: 'Hotel Gdańsk Boutique, 5th floor',
    konP: 'Visits by appointment. Choose your treatment and time online.',
    btnBook2: 'Book online', konDod: 'Balola Gdańsk phone, e-mail and Instagram - to be added.',
    konMapa: 'Get directions in Google Maps',
    stopka1: 'Balola Gdańsk · Hotel Gdańsk Boutique, 9 Szafarnia Street · Balola Sopot · 4/1/B Tadeusza Kościuszki Street',
    stopka2: 'Concept design of the website. Illustrative photos (Pexels), skin analysis photo from balola.pl, Motława: Silar, CC BY-SA 4.0. Sample menu - the Gdańsk treatment menu will be completed with your materials. The booking button temporarily links to Balola Sopot on Booksy.',
    btnBook3: 'Book online', mobDoj: 'Directions'
  };
  var META = {
    pl: { title: document.title, desc: document.querySelector('meta[name="description"]').content, menu: 'Otwórz menu', menuX: 'Zamknij menu' },
    en: { title: 'Balola Gdańsk - a cosy spa overlooking the Motława', desc: 'Balola Gdańsk: a cosy spa on the 5th floor of Hotel Gdańsk Boutique. Relaxation, wellness and longevity, cosmetology and hi-tech devices.', menu: 'Open menu', menuX: 'Close menu' }
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
      try { localStorage.setItem('balola-gd-lang', cur); } catch (e) {}
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
    else if (localStorage.getItem('balola-gd-lang')) start = localStorage.getItem('balola-gd-lang');
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
