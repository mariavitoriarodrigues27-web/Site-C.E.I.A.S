// Controle de Fonte e Contraste (Acessibilidade)
let currentFontSize = 100;

function changeFontSize(delta) {
  currentFontSize += delta * 10;
  if (currentFontSize < 80) currentFontSize = 80;
  if (currentFontSize > 140) currentFontSize = 140;
  document.body.style.fontSize = currentFontSize + '%';
}

function toggleContrast() {
  document.body.classList.toggle('high-contrast');
}
