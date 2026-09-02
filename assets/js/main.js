/* BRANDSIP — shared behaviors */
(function () {
  'use strict';

  const WA_NUMBER = '918073137080';
  const WA_MESSAGE = 'Hello BRANDSIP, I am interested in customized packaged drinking water. I would like to know more about your bottle options, pricing and customization.';

  function waLink() {
    return 'https://wa.me/' + WA_NUMBER + '?text=' + encodeURIComponent(WA_MESSAGE);
  }

  /* Global WhatsApp links: any element with [data-wa] is pointed to the prefilled chat */
  document.querySelectorAll('[data-wa]').forEach(function (el) {
    el.href = waLink();
    el.setAttribute('target', '_blank');
    el.setAttribute('rel', 'noopener');
  });

  /* Sticky header shadow */
  var header = document.querySelector('.site-header');
  if (header) {
    function onScroll() {
      if (window.scrollY > 10) header.classList.add('scrolled');
      else header.classList.remove('scrolled');
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  /* Mobile menu */
  var toggle = document.querySelector('.menu-toggle');
  var drawer = document.querySelector('.nav-mobile');
  if (toggle && drawer) {
    toggle.addEventListener('click', function () {
      var open = drawer.classList.toggle('open');
      toggle.classList.toggle('open', open);
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
      toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    });
    drawer.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        drawer.classList.remove('open');
        toggle.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  /* Scroll reveal */
  var revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && revealEls.length) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    revealEls.forEach(function (el) { io.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add('visible'); });
  }

  /* Accordion */
  document.querySelectorAll('.accordion').forEach(function (acc) {
    var btn = acc.querySelector('.accordion-header');
    var panel = acc.querySelector('.accordion-panel');
    if (!btn || !panel) return;
    btn.addEventListener('click', function () {
      var isOpen = acc.classList.contains('open');
      /* close siblings */
      if (acc.parentElement) {
        acc.parentElement.querySelectorAll('.accordion.open').forEach(function (sib) {
          sib.classList.remove('open');
          sib.querySelector('.accordion-panel').style.maxHeight = '0px';
          sib.querySelector('.accordion-header').setAttribute('aria-expanded', 'false');
        });
      }
      if (!isOpen) {
        acc.classList.add('open');
        panel.style.maxHeight = panel.scrollHeight + 'px';
        btn.setAttribute('aria-expanded', 'true');
      }
    });
  });

  /* Lightbox */
  var lightbox = document.querySelector('.lightbox');
  var lbImg = lightbox ? lightbox.querySelector('img') : null;
  var lbCap = lightbox ? lightbox.querySelector('.lightbox-caption') : null;
  if (lightbox && lbImg) {
    document.querySelectorAll('.gallery-item img').forEach(function (img) {
      img.addEventListener('click', function () {
        lbImg.src = img.getAttribute('data-full') || img.src;
        lbImg.alt = img.alt || '';
        if (lbCap) lbCap.textContent = img.getAttribute('data-caption') || img.alt || '';
        lightbox.classList.add('open');
        lightbox.focus();
      });
    });
    var close = lightbox.querySelector('.lightbox-close');
    if (close) {
      close.addEventListener('click', function () {
        lightbox.classList.remove('open');
      });
    }
    lightbox.addEventListener('click', function (e) {
      if (e.target === lightbox || e.target === lbImg) {
        lightbox.classList.remove('open');
      }
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') lightbox.classList.remove('open');
    });
  }

  /* Quote form — submits enquiry to BRANDSIP via WhatsApp */
  var quoteForm = document.querySelector('.quote-form');
  if (quoteForm) {
    quoteForm.addEventListener('submit', function (e) {
      e.preventDefault();
      var val = function (name) {
        var el = quoteForm.querySelector('[name="' + name + '"]');
        var v = el ? el.value.trim() : '';
        return v ? v : 'Not provided';
      };
      var lines = [
        'Hello BRANDSIP, I would like to request a customized packaged drinking water quote.',
        'Name: ' + val('name'),
        'Business / Restaurant: ' + val('business'),
        'Phone: ' + val('phone'),
        'Email: ' + val('email'),
        'City: ' + val('city'),
        'Bottle Size: ' + val('size'),
        'Bottle Shape: ' + val('shape'),
        'Quantity Required: ' + val('quantity'),
        'Label Type: ' + val('label'),
        'Custom MRP Requirement: ' + val('mrp'),
        'Message: ' + val('message')
      ];
      if (quoteForm.querySelector('#file').files.length) {
        var file = quoteForm.querySelector('#file').files[0];
        lines.push('Uploaded file name: ' + file.name);
      }
      window.open('https://wa.me/' + WA_NUMBER + '?text=' + encodeURIComponent(lines.join('\n')), '_blank', 'noopener');
      var success = quoteForm.querySelector('.form-success');
      if (success) success.classList.add('show');
      quoteForm.reset();
    });
  }

  /* File input label display */
  document.querySelectorAll('.field-file input[type="file"]').forEach(function (inp) {
    inp.addEventListener('change', function () {
      var strong = inp.closest('.field-file').querySelector('strong');
      if (strong && inp.files.length) strong.textContent = inp.files[0].name;
    });
  });

  /* Current year */
  document.querySelectorAll('[data-year]').forEach(function (el) {
    el.textContent = new Date().getFullYear();
  });
})();
