// Função para Alternar Entre as Abas
function openTab(event, tabId) {
  // Oculta todas as abas
  const tabContents = document.querySelectorAll('.tab-content');
  tabContents.forEach(content => {
    content.classList.remove('active');
  });

  // Remove o estado ativo dos botões
  const tabButtons = document.querySelectorAll('.tab-button');
  tabButtons.forEach(button => {
    button.classList.remove('active');
  });

  // Ativa a aba selecionada e o botão clicado
  document.getElementById(tabId).classList.add('active');
  event.currentTarget.classList.add('active');
}