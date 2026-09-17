// Controle de rolagem Navbar Glassmorphism
window.addEventListener('scroll', () => {
  const navbar = document.getElementById('navbar');
  if (window.scrollY > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

// Menu Mobile Toggle
const menuToggle = document.getElementById('menuToggle');
const navMenu = document.getElementById('navMenu');

menuToggle.addEventListener('click', () => {
  navMenu.classList.toggle('active');
});

// Acessibilidade: Tamanho da fonte e Contraste
let fontSize = 100;

function adjustFont(delta) {
  fontSize += delta * 8;
  if (fontSize < 84) fontSize = 84;
  if (fontSize > 130) fontSize = 130;
  document.body.style.fontSize = fontSize + '%';
}

function toggleTheme() {
  document.body.classList.toggle('light-contrast');
}

// Galeria de Fotos - Filtro
function filterGallery(category) {
  const items = document.querySelectorAll('.gallery-item');
  const buttons = document.querySelectorAll('.tab-btn');

  buttons.forEach(btn => btn.classList.remove('active'));
  event.target.classList.add('active');

  items.forEach(item => {
    if (category === 'all' || item.classList.contains(category)) {
      item.style.display = 'block';
    } else {
      item.style.display = 'none';
    }
  });
}

// Lightbox Modal
function openLightbox(src, caption) {
  const modal = document.getElementById('lightboxModal');
  const img = document.getElementById('lightboxImg');
  const cap = document.getElementById('lightboxCaption');

  modal.style.display = 'flex';
  img.src = src;
  cap.innerText = caption;
}

function closeLightbox() {
  document.getElementById('lightboxModal').style.display = 'none';
}