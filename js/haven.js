// Quick Exit everywhere
const qe = document.getElementById('quickExit');
if (qe) qe.onclick = () => window.location.replace('https://www.google.com/');

// Year in footer
const y = document.getElementById('year');
if (y) y.textContent = new Date().getFullYear();
