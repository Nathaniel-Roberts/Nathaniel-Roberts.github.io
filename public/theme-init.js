(function () {
  var SCHEME = { light: 'light', dark: 'dark', latte: 'light', mocha: 'dark', nord: 'dark', gruvbox: 'dark', 'rose-pine': 'dark', 'tokyo-night': 'dark', 'solarized-light': 'light', 'solarized-dark': 'dark' };
  var mq = window.matchMedia('(prefers-color-scheme: dark)');
  function apply() {
    var stored = null;
    try { stored = localStorage.getItem('theme'); } catch (e) {}
    var name = stored && SCHEME[stored] ? stored : (mq.matches ? 'dark' : 'light');
    var root = document.documentElement;
    root.setAttribute('data-theme', name);
    root.setAttribute('data-scheme', SCHEME[name]);
    root.setAttribute('data-theme-choice', stored && SCHEME[stored] ? stored : 'system');
  }
  apply();
  mq.addEventListener('change', apply);
  document.addEventListener('astro:after-swap', apply);
  window.__applyTheme = apply;
})();
