// app.js — drop-in (clean version for svh/dvh/lvh CSS)
(() => {
  const menu = document.getElementById('sidemenu');
  const hamburger = document.querySelector('.hamburger');
  const backdrop = document.querySelector('.backdrop');
  const root = document.documentElement;
  const year = document.getElementById('year');
  const range = document.getElementById('brightnessRange');

  // Footer year
  if (year) year.textContent = new Date().getFullYear();

  // ----- Off-canvas menu -----
  const setExpanded = (isOpen) => {
    if (hamburger) hamburger.setAttribute('aria-expanded', String(isOpen));
    if (menu) menu.setAttribute('aria-hidden', String(!isOpen));
    if (backdrop) backdrop.hidden = !isOpen;
    document.body.style.overflow = isOpen ? 'hidden' : '';
  };
  const open = () => { menu?.classList.add('open'); setExpanded(true); };
  const close = () => { menu?.classList.remove('open'); setExpanded(false); };

  hamburger?.addEventListener('click', () => (
    menu?.classList.contains('open') ? close() : open()
  ));
  backdrop?.addEventListener('click', close);
  document.addEventListener('keydown', e => { if (e.key === 'Escape') close(); });

  // Close drawer when tapping any primary link
  document.querySelectorAll('.menu-link').forEach(a => {
    a.addEventListener('click', close);
  });

  // ----- Brightness slider (persists) -----
  if (range) {
    const clamp = (v, min, max) => Math.max(min, Math.min(max, v));
    const applyFromPct = (pctStr) => {
      const pct = clamp(parseInt(pctStr, 10), 50, 110);
      root.style.setProperty('--bg-brightness', String(pct / 100));
    };

    // Backwards-compatible with your previous "bg_brightness" float key
    const savedPct = localStorage.getItem('bg_brightness_pct');
    const savedFloat = localStorage.getItem('bg_brightness');
    if (savedPct) {
      range.value = savedPct;
    } else if (savedFloat) {
      range.value = String(Math.round(parseFloat(savedFloat) * 100));
    }

    // Apply once on load (or use default value if nothing saved)
    applyFromPct(range.value || '80');

    range.addEventListener('input', (e) => {
      const val = e.target.value;
      localStorage.setItem('bg_brightness_pct', val);
      applyFromPct(val);
    });
  }

})();
  
// --- Resources dropdown (drawer submenu) ---
(() => {
  const disclosures = document.querySelectorAll('.menu-disclosure');
  disclosures.forEach(btn => {
    const targetId = btn.getAttribute('aria-controls');
    const panel = document.getElementById(targetId);
    if (!panel) return;

    btn.addEventListener('click', () => {
      const expanded = btn.getAttribute('aria-expanded') === 'true';
      btn.setAttribute('aria-expanded', String(!expanded));
      if (expanded) {
        panel.setAttribute('hidden', '');
      } else {
        panel.removeAttribute('hidden');
      }
    });
  });
})();
