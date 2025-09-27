// Menu toggle
const menu = document.getElementById('sidemenu');
const hamburger = document.querySelector('.hamburger');
const backdrop = document.querySelector('.backdrop');

function setExpanded(isOpen){
  hamburger.setAttribute('aria-expanded', String(isOpen));
  menu.setAttribute('aria-hidden', String(!isOpen));
  backdrop.hidden = !isOpen;
}

hamburger.addEventListener('click', () => {
  const isOpen = !menu.classList.contains('open');
  menu.classList.toggle('open', isOpen);
  setExpanded(isOpen);
});

backdrop.addEventListener('click', () => {
  menu.classList.remove('open');
  setExpanded(false);
});

// Brightness slider
const range = document.getElementById('brightnessRange');
const root = document.documentElement;
const clamp = (v, min, max) => Math.max(min, Math.min(max, v));

function applyBrightness(){
  const val = clamp(parseInt(range.value, 10), 50, 110) / 100;
  root.style.setProperty('--bg-brightness', String(val));
  // Persist between sessions
  try { localStorage.setItem('bg_brightness', String(val)); } catch(e){}
}
range.addEventListener('input', applyBrightness);

// Restore previous brightness
try {
  const saved = localStorage.getItem('bg_brightness');
  if(saved){ root.style.setProperty('--bg-brightness', saved); range.value = Math.round(parseFloat(saved)*100); }
} catch(e){}

// Footer year
document.getElementById('year').textContent = new Date().getFullYear();
