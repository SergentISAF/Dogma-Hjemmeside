// Dogma Cables theme switcher.
// Loaded with `defer` so DOM is ready by the time it runs.

(function () {
  function readSaved() {
    try {
      return localStorage.getItem('dogma-theme') || 'light';
    } catch (e) {
      return 'light';
    }
  }

  function applyTheme(name) {
    document.body.className = 'theme-' + name;
    document.documentElement.dataset.theme = name;
    try {
      localStorage.setItem('dogma-theme', name);
    } catch (e) {
      // localStorage may be blocked; theme still applies in-page
    }
    document.querySelectorAll('[data-theme]').forEach(function (btn) {
      btn.classList.toggle('active', btn.dataset.theme === name);
    });
  }

  function init() {
    var saved = readSaved();
    applyTheme(saved);

    document.querySelectorAll('[data-theme]').forEach(function (btn) {
      btn.addEventListener('click', function (e) {
        e.preventDefault();
        applyTheme(btn.dataset.theme);
      });
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
