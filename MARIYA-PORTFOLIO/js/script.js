/* Shared interactions for all portfolio pages */
const root = document.documentElement;
const themeToggle = document.getElementById('themeToggle');
const savedTheme = localStorage.getItem('mariya-pro-theme');
const systemDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
function setTheme(theme) {
  root.dataset.theme = theme;
  if (themeToggle) {
    themeToggle.textContent = theme === 'dark' ? '☀' : '☾';
    themeToggle.setAttribute('aria-label', theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode');
  }
  localStorage.setItem('mariya-pro-theme', theme);
}
setTheme(savedTheme || (systemDark ? 'dark' : 'light'));
if (themeToggle) themeToggle.addEventListener('click', () => setTheme(root.dataset.theme === 'dark' ? 'light' : 'dark'));

const mobileMenu = document.getElementById('mobileMenu');
const nav = document.getElementById('nav');
if (mobileMenu && nav) {
  mobileMenu.addEventListener('click', () => {
    const open = nav.classList.toggle('open');
    mobileMenu.setAttribute('aria-expanded', String(open));
  });
  nav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => nav.classList.remove('open')));
}

// Local image preview. For a permanent photo, replace assets/profile-placeholder.svg in the HTML with your own file.
const photoInput = document.getElementById('photoInput');
const profileImage = document.getElementById('profileImage');
if (photoInput && profileImage) photoInput.addEventListener('change', event => {
  const file = event.target.files && event.target.files[0];
  if (!file) return;
  if (!file.type.startsWith('image/')) { alert('Please select an image file.'); return; }
  const reader = new FileReader();
  reader.onload = () => { profileImage.src = reader.result; };
  reader.readAsDataURL(file);
});

// Project slider: arrow buttons + touch swipe.
const projectSlider = document.getElementById('projectSlider');
if (projectSlider) {
  const slides = Array.from(projectSlider.querySelectorAll('.featured-project'));
  let current = 0;
  const count = document.getElementById('projectCount');
  const progress = document.getElementById('sliderProgress');
  const prev = document.getElementById('projectPrev');
  const next = document.getElementById('projectNext');
  function showSlide(index) {
    current = (index + slides.length) % slides.length;
    slides.forEach((slide, i) => {
      slide.classList.toggle('is-active', i === current);
      slide.setAttribute('aria-hidden', String(i !== current));
    });
    if (count) count.textContent = `${String(current + 1).padStart(2, '0')} / ${String(slides.length).padStart(2, '0')}`;
    if (progress) progress.style.width = `${((current + 1) / slides.length) * 100}%`;
  }
  if (prev) prev.addEventListener('click', () => showSlide(current - 1));
  if (next) next.addEventListener('click', () => showSlide(current + 1));
  let startX = null;
  projectSlider.addEventListener('touchstart', e => { startX = e.changedTouches[0].clientX; }, {passive:true});
  projectSlider.addEventListener('touchend', e => {
    if (startX === null) return;
    const delta = e.changedTouches[0].clientX - startX;
    if (Math.abs(delta) > 45) showSlide(current + (delta < 0 ? 1 : -1));
    startX = null;
  }, {passive:true});
  showSlide(0);
}

const PORTFOLIO_EMAIL = 'mariyaakther035@gmail.com'; // Change this to your preferred email.
const emailLink = document.getElementById('emailLink');
if (emailLink) { emailLink.href = `mailto:${PORTFOLIO_EMAIL}`; emailLink.textContent = PORTFOLIO_EMAIL; }
const copyEmail = document.getElementById('copyEmail');
if (copyEmail) copyEmail.addEventListener('click', async () => {
  try { await navigator.clipboard.writeText(PORTFOLIO_EMAIL); copyEmail.textContent = 'Copied!'; }
  catch { window.location.href = `mailto:${PORTFOLIO_EMAIL}`; }
});
const contactForm = document.getElementById('contactForm');
if (contactForm) contactForm.addEventListener('submit', event => {
  event.preventDefault();
  const form = new FormData(contactForm);
  const name = String(form.get('name') || '').trim();
  const email = String(form.get('email') || '').trim();
  const message = String(form.get('message') || '').trim();
  const topic = String(form.get('topic') || 'Portfolio enquiry');
  if (!name || !email || !message) return;
  const subject = encodeURIComponent(`${topic} — ${name}`);
  const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\nTopic: ${topic}\n\n${message}`);
  const status = document.getElementById('formStatus');
  if (status) status.textContent = 'Opening your email app with a prepared message…';
  window.location.href = `mailto:${PORTFOLIO_EMAIL}?subject=${subject}&body=${body}`;
});
document.querySelectorAll('#year').forEach(el => el.textContent = new Date().getFullYear());

// Reading progress on homepage.
const progressBar = document.getElementById('progressBar');
if (progressBar) {
  window.addEventListener('scroll', () => {
    const max = document.documentElement.scrollHeight - window.innerHeight;
    progressBar.style.width = `${max > 0 ? (window.scrollY / max) * 100 : 0}%`;
  }, {passive:true});
}
