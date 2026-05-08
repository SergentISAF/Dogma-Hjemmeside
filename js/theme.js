// Theme loaded synchronously to avoid flash. Run as early as possible in <head>.
(function () {
  const saved = localStorage.getItem('dogma-theme') || 'light';
  document.documentElement.dataset.theme = saved;
  document.addEventListener('DOMContentLoaded', () => {
    document.body.className = `theme-${saved}`;
    bindSwitcher();
    markActiveSwitcher(saved);
  });
})();

function setTheme(name) {
  document.body.className = `theme-${name}`;
  document.documentElement.dataset.theme = name;
  localStorage.setItem('dogma-theme', name);
  markActiveSwitcher(name);
}

function bindSwitcher() {
  document.querySelectorAll('[data-theme]').forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      setTheme(btn.dataset.theme);
    });
  });
}

function markActiveSwitcher(name) {
  document.querySelectorAll('[data-theme]').forEach((btn) => {
    btn.classList.toggle('active', btn.dataset.theme === name);
  });
}
