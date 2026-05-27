// Dogma Cables language switcher.
// Loaded with `defer` so DOM is ready by the time it runs.
// Reads `data-en` / `data-da` on elements and swaps textContent (or the
// appropriate attribute for META / INPUT / TEXTAREA / IMG).

(function () {
  var STORAGE_KEY = 'dogma-lang';
  var DEFAULT_LANG = 'da';

  function readSaved() {
    try {
      return localStorage.getItem(STORAGE_KEY) || DEFAULT_LANG;
    } catch (e) {
      return DEFAULT_LANG;
    }
  }

  function applyToElement(el, lang) {
    var value = el.dataset[lang];
    if (value === undefined) return;
    var tag = el.tagName;
    if (tag === 'META') {
      el.setAttribute('content', value);
    } else if (tag === 'INPUT' || tag === 'TEXTAREA') {
      if (el.hasAttribute('placeholder')) {
        el.setAttribute('placeholder', value);
      }
    } else if (tag === 'IMG') {
      el.setAttribute('alt', value);
    } else {
      el.textContent = value;
    }
  }

  function applyLang(lang) {
    document.documentElement.lang = lang;
    document.documentElement.dataset.lang = lang;
    document.querySelectorAll('[data-en], [data-da]').forEach(function (el) {
      applyToElement(el, lang);
    });
    document.querySelectorAll('.lang-switcher [data-lang]').forEach(function (btn) {
      btn.classList.toggle('active', btn.dataset.lang === lang);
    });
    try {
      localStorage.setItem(STORAGE_KEY, lang);
    } catch (e) {
      // localStorage may be blocked; language still applies in-page
    }
  }

  function init() {
    applyLang(readSaved());
    document.querySelectorAll('.lang-switcher [data-lang]').forEach(function (btn) {
      btn.addEventListener('click', function (e) {
        e.preventDefault();
        applyLang(btn.dataset.lang);
      });
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
