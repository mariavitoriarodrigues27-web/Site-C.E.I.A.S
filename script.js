/* ==========================================================================
   C.E.I.A.S - SCRIPT INTERATIVO VIVO E DINÂMICO
   Arquivo: script.js
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

  // 1. MENU HAMBÚRGUER MOBILE
  const hamburgerBtn = document.getElementById('hamburger-btn');
  const navMenu = document.getElementById('nav-menu');

  if (hamburgerBtn && navMenu) {
    hamburgerBtn.addEventListener('click', () => {
      navMenu.classList.toggle('active');
    });

    document.querySelectorAll('.nav-item').forEach(item => {
      item.addEventListener('click', () => {
        navMenu.classList.remove('active');
      });
    });
  }

  // 2. ACESSIBILIDADE DE TOPO
  const btnContrast = document.getElementById('btn-contrast');
  const btnIncrease = document.getElementById('btn-increase-font');
  const btnDecrease = document.getElementById('btn-decrease-font');
  const btnTts = document.getElementById('btn-tts');
  let currentFontSize = 100;

  if (btnContrast) {
    btnContrast.addEventListener('click', () => {
      document.body.classList.toggle('high-contrast');
    });
  }

  if (btnIncrease) {
    btnIncrease.addEventListener('click', () => {
      if (currentFontSize < 130) {
        currentFontSize += 10;
        document.body.style.fontSize = `${currentFontSize}%`;
      }
    });
  }

  if (btnDecrease) {
    btnDecrease.addEventListener('click', () => {
      if (currentFontSize > 80) {
        currentFontSize -= 10;
        document.body.style.fontSize = `${currentFontSize}%`;
      }
    });
  }

  // LEITOR DE VOZ (TEXT TO SPEECH)
  let isSpeaking = false;
  if (btnTts) {
    btnTts.addEventListener('click', () => {
      if ('speechSynthesis' in window) {
        if (isSpeaking) {
          window.speechSynthesis.cancel();
          isSpeaking = false;
          document.getElementById('tts-text').textContent = 'Ouvir Página';
        } else {
          const activeTab = document.querySelector('.tab-content.active');
          const pageText = activeTab ? activeTab.innerText : document.body.innerText;
          const utterance = new SpeechSynthesisUtterance(pageText.substring(0, 1200));
          utterance.lang = 'pt-BR';

          utterance.onend = () => {
            isSpeaking = false;
            document.getElementById('tts-text').textContent = 'Ouvir Página';
          };

          window.speechSynthesis.speak(utterance);
          isSpeaking = true;
          document.getElementById('tts-text').textContent = 'Parar Áudio';
        }
      }
    });
  }

  // 3. INICIALIZAR GRÁFICO DE RENDIMENTO
  initChartRendimento();
});

/* ==========================================================================
   TROCA DE ABAS PRINCIPAIS
   ========================================================================== */
function switchMainTab(evt, tabId) {
  const allTabs = document.querySelectorAll('.tab-content');
  const allNavButtons = document.querySelectorAll('.nav-item');

  allTabs.forEach(pane => pane.classList.remove('active'));
  allNavButtons.forEach(btn => btn.classList.remove('active'));

  const targetPane = document.getElementById(tabId);
  if (targetPane) {
    targetPane.classList.add('active');
  }

  if (evt && evt.currentTarget) {
    evt.currentTarget.classList.add('active');
  }

  window.scrollTo({ top: 0, behavior: 'smooth' });
}

/* ==========================================================================
   SUB-ABAS DE ENSINO E GALERIA
   ========================================================================== */
function switchSubTab(evt, subtabId) {
  const container = evt.currentTarget.closest('.tab-content');
  const panes = container.querySelectorAll('.subtab-pane');
  const buttons = container.querySelectorAll('.subtab-btn');

  panes.forEach(pane => pane.classList.remove('active'));
  buttons.forEach(btn => btn.classList.remove('active'));

  document.getElementById(subtabId).classList.add('active');
  evt.currentTarget.classList.add('active');
}

function switchGalleryTab(evt, galleryId) {
  const container = evt.currentTarget.closest('.tab-content');
  const panes = container.querySelectorAll('.gallery-pane');
  const buttons = container.querySelectorAll('.gallery-filter-btn');

  panes.forEach(pane => pane.classList.remove('active'));
  buttons.forEach(btn => btn.classList.remove('active'));

  document.getElementById(galleryId).classList.add('active');
  evt.currentTarget.classList.add('active');
}

/* ==========================================================================
   LIGHTBOX
   ========================================================================== */
function openLightbox(imgSrc, caption) {
  const lightbox = document.getElementById('lightbox');
  document.getElementById('lightbox-img').src = imgSrc;
  document.getElementById('lightbox-caption').textContent = caption;
  lightbox.classList.add('active');
}

function closeLightbox() {
  document.getElementById('lightbox').classList.remove('active');
}

/* ==========================================================================
   GRÁFICO CHART.JS
   ========================================================================== */
function initChartRendimento() {
  const canvas = document.getElementById('chartRendimento');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: ['6º Fund.', '7º Fund.', '8º Fund.', '9º Fund.', '1º Médio', '2º Médio', '3º Médio'],
      datasets: [
        {
          label: '% Aprovação',
          data: [94, 91, 93, 96, 88, 92, 98],
          backgroundColor: '#0ea5e9',
          borderRadius: 8
        },
        {
          label: '% Reprovação',
          data: [4, 6, 5, 3, 9, 6, 2],
          backgroundColor: '#ef4444',
          borderRadius: 8
        },
        {
          label: '% Abandono',
          data: [2, 3, 2, 1, 3, 2, 0],
          backgroundColor: '#f59e0b',
          borderRadius: 8
        }
      ]
    },
    options: {
      responsive: true,
      plugins: {
        legend: { position: 'top' },
        title: { display: true, text: 'Indicadores de Desempenho por Ano Letivo (%)', font: { size: 16 } }
      },
      scales: {
        y: { beginAtZero: true, max: 100 }
      }
    }
  });
}

/* ==========================================================================
   CHATBOT VIRTUAL DE IA E WHATSAPP
   ========================================================================== */
let conversationLog = [];

function appendChatMessage(sender, text) {
  const chatMessages = document.getElementById('chat-messages');
  if (!chatMessages) return;

  const msgDiv = document.createElement('div');
  msgDiv.className = `msg ${sender === 'user' ? 'msg-user' : 'msg-bot'}`;
  msgDiv.innerHTML = text;

  chatMessages.appendChild(msgDiv);
  chatMessages.scrollTop = chatMessages.scrollHeight;

  const cleanText = text.replace(/<[^>]*>?/gm, '');
  conversationLog.push(`${sender === 'user' ? 'Aluno/Responsável' : 'IA C.E.I.A.S'}: ${cleanText}`);
}

function handleKeyPress(event) {
  if (event.key === 'Enter') sendMessage();
}

function sendMessage() {
  const input = document.getElementById('chat-input');
  const text = input.value.trim();
  if (!text) return;

  appendChatMessage('user', text);
  input.value = '';

  setTimeout(() => {
    generateAIResponse(text);
  }, 500);
}

function sendQuickPrompt(promptText) {
  appendChatMessage('user', promptText);
  setTimeout(() => {
    generateAIResponse(promptText);
  }, 500);
}

function generateAIResponse(userText) {
  const text = userText.toLowerCase();
  let reply = "Obrigado pela sua pergunta! Para detalhes específicos, você pode enviar esta conversa diretamente ao nosso WhatsApp pelo botão abaixo.";

  if (text.includes('documento') || text.includes('matricula')) {
    reply = "<strong>Documentos para Matrícula:</strong><br>1. Certidão de Nascimento do Aluno<br>2. RG e CPF do Aluno e Responsável<br>3. Comprovante de Residência (Luz)<br>4. Histórico Escolar Original.";
  } else if (text.includes('horario') || text.includes('aula')) {
    reply = "<strong>Horários do C.E.I.A.S:</strong><br>• Manhã: 07h30 às 12h00<br>• Tarde: 13h00 às 17h30.";
  } else if (text.includes('transporte') || text.includes('onibus')) {
    reply = "O C.E.I.A.S possui <strong>transporte escolar público e 100% gratuito</strong> cobrindo as rotas da zona rural.";
  } else if (text.includes('público') || text.includes('paga') || text.includes('gratuita')) {
    reply = "O C.E.I.A.S é uma <strong>Escola Pública Estadual 100% Gratuita</strong>, sem mensalidades ou taxas.";
  }

  appendChatMessage('bot', reply);
}

function sendToWhatsApp() {
  const phoneNumber = "5541999998888";
  let formattedText = "*Atendimento pelo Site — C.E.I.A.S*\n\n";

  if (conversationLog.length > 0) {
    formattedText += "*Resumo da Conversa com a IA:*\n" + conversationLog.join("\n") + "\n\n";
  }

  formattedText += "Olá! Gostaria de atendimento com a secretaria do colégio.";

  const encodedText = encodeURIComponent(formattedText);
  window.open(`https://wa.me/${phoneNumber}?text=${encodedText}`, '_blank');
}