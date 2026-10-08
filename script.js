/* ==========================================================================
   C.E.I.A.S - COLÉGIO ESTADUAL DO CAMPO IRMÃ AMBRÓSIA SABATOVICH
   SCRIPT PRINCIPAL DE INTERATIVIDADE E IA
   Arquivo: script.js
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

  /* 1. MENU HAMBÚRGUER & NAVEGAÇÃO RESPONSIVA */
  const hamburgerBtn = document.getElementById('hamburger-btn');
  const navMenu = document.getElementById('nav-menu');

  if (hamburgerBtn && navMenu) {
    hamburgerBtn.addEventListener('click', () => {
      navMenu.classList.toggle('active');
    });

    // Fechar menu ao clicar em qualquer opção de navegação
    document.querySelectorAll('.nav-item').forEach(item => {
      item.addEventListener('click', () => {
        navMenu.classList.remove('active');
      });
    });
  }

  /* 2. BARRA DE ACESSIBILIDADE DE TOPO */
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

  /* Sintetizador de Voz (Text-to-Speech) */
  let isSpeaking = false;
  if (btnTts) {
    btnTts.addEventListener('click', () => {
      if ('speechSynthesis' in window) {
        if (isSpeaking) {
          window.speechSynthesis.cancel();
          isSpeaking = false;
          const ttsSpan = document.getElementById('tts-text');
          if (ttsSpan) ttsSpan.textContent = 'Ouvir Página';
        } else {
          const activeTabContent = document.querySelector('.tab-content.active');
          const pageText = activeTabContent ? activeTabContent.innerText : document.body.innerText;
          const utterance = new SpeechSynthesisUtterance(pageText.substring(0, 1200));
          utterance.lang = 'pt-BR';
          
          utterance.onend = () => {
            isSpeaking = false;
            const ttsSpan = document.getElementById('tts-text');
            if (ttsSpan) ttsSpan.textContent = 'Ouvir Página';
          };

          window.speechSynthesis.speak(utterance);
          isSpeaking = true;
          const ttsSpan = document.getElementById('tts-text');
          if (ttsSpan) ttsSpan.textContent = 'Parar Áudio';
        }
      } else {
        alert('Seu navegador não possui suporte ao recurso de leitura por áudio.');
      }
    });
  }

  /* 3. INICIALIZAÇÃO DO GRÁFICO EDUCACIONAL (CHART.JS) */
  initChartRendimento();
});

/* ==========================================================================
   SISTEMA PRINCIPAL DE ABAS DO SITE
   ========================================================================== */
function switchMainTab(evt, tabId) {
  const allTabPanes = document.querySelectorAll('.tab-content');
  const allNavButtons = document.querySelectorAll('.nav-item');

  allTabPanes.forEach(pane => pane.classList.remove('active'));
  allNavButtons.forEach(btn => btn.classList.remove('active'));

  const targetPane = document.getElementById(tabId);
  if (targetPane) {
    targetPane.classList.add('active');
  }

  if (evt && evt.currentTarget) {
    evt.currentTarget.classList.add('active');
  } else {
    const btn = document.querySelector(`[onclick*="'${tabId}'"]`);
    if (btn) btn.classList.add('active');
  }

  // Rolar suavemente até o topo do conteúdo da aba
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

/* ==========================================================================
   ABAS DE ENSINO (GRADE CURRICULAR)
   ========================================================================== */
function switchSubTab(evt, subtabId) {
  const container = evt.currentTarget.closest('.tab-content');
  const panes = container.querySelectorAll('.subtab-pane');
  const buttons = container.querySelectorAll('.subtab-btn');

  panes.forEach(pane => pane.classList.remove('active'));
  buttons.forEach(btn => btn.classList.remove('active'));

  const targetPane = document.getElementById(subtabId);
  if (targetPane) {
    targetPane.classList.add('active');
  }
  evt.currentTarget.classList.add('active');
}

/* ==========================================================================
   ABAS DE GALERIA DE FOTOS
   ========================================================================== */
function switchGalleryTab(evt, galleryId) {
  const container = evt.currentTarget.closest('.tab-content');
  const panes = container.querySelectorAll('.gallery-pane');
  const buttons = container.querySelectorAll('.gallery-filter-btn');

  panes.forEach(pane => pane.classList.remove('active'));
  buttons.forEach(btn => btn.classList.remove('active'));

  const targetPane = document.getElementById(galleryId);
  if (targetPane) {
    targetPane.classList.add('active');
  }
  evt.currentTarget.classList.add('active');
}

/* ==========================================================================
   LIGHTBOX DA GALERIA DE FOTOS
   ========================================================================== */
function openLightbox(imgSrc, captionText) {
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightbox-img');
  const lightboxCaption = document.getElementById('lightbox-caption');

  if (lightbox && lightboxImg && lightboxCaption) {
    lightboxImg.src = imgSrc;
    lightboxCaption.textContent = captionText;
    lightbox.classList.add('active');
  }
}

function closeLightbox() {
  const lightbox = document.getElementById('lightbox');
  if (lightbox) {
    lightbox.classList.remove('active');
  }
}

/* ==========================================================================
   GRÁFICO DE RENDIMENTO ESCOLAR (CHART.JS)
   ========================================================================== */
function initChartRendimento() {
  const canvas = document.getElementById('chartRendimento');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: ['6º Ano', '7º Ano', '8º Ano', '9º Ano', '1º Médio', '2º Médio', '3º Médio'],
      datasets: [
        {
          label: '% Aprovação',
          data: [94, 91, 93, 96, 88, 92, 98],
          backgroundColor: '#0ea5e9',
          borderRadius: 6
        },
        {
          label: '% Reprovação',
          data: [4, 6, 5, 3, 9, 6, 2],
          backgroundColor: '#ef4444',
          borderRadius: 6
        },
        {
          label: '% Abandono',
          data: [2, 3, 2, 1, 3, 2, 0],
          backgroundColor: '#f59e0b',
          borderRadius: 6
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: true,
      plugins: {
        legend: {
          position: 'top',
          labels: {
            font: { family: 'Plus Jakarta Sans', size: 12 }
          }
        },
        title: {
          display: true,
          text: 'Rendimento Por Ano Escolar (%) - C.E.I.A.S',
          font: { family: 'Plus Jakarta Sans', size: 16, weight: '700' }
        }
      },
      scales: {
        y: {
          beginAtZero: true,
          max: 100,
          ticks: {
            callback: function(value) { return value + "%"; }
          }
        }
      }
    }
  });
}

/* ==========================================================================
   CHATBOT VIRTUAL DE IA E INTEGRAÇÃO COM WHATSAPP
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

  // Registro do histórico de conversa para envio ao WhatsApp
  const cleanText = text.replace(/<[^>]*>?/gm, '');
  conversationLog.push(`${sender === 'user' ? 'Aluno/Responsável' : 'Assistente Virtual'}: ${cleanText}`);
}

function handleKeyPress(event) {
  if (event.key === 'Enter') {
    sendMessage();
  }
}

function sendMessage() {
  const input = document.getElementById('chat-input');
  if (!input) return;

  const text = input.value.trim();
  if (text === '') return;

  appendChatMessage('user', text);
  input.value = '';

  // Simulação de resposta inteligente da IA
  setTimeout(() => {
    generateAIResponse(text);
  }, 600);
}

function sendQuickPrompt(promptText) {
  appendChatMessage('user', promptText);
  setTimeout(() => {
    generateAIResponse(promptText);
  }, 600);
}

function generateAIResponse(userText) {
  const text = userText.toLowerCase();
  let reply = "Obrigado pela mensagem! Sou o assistente virtual do C.E.I.A.S. Para assuntos específicos, você também pode clicar no botão verde abaixo para conversar diretamente com a secretaria pelo WhatsApp.";

  if (text.includes('documento') || text.includes('matricula') || text.includes('matrícula')) {
    reply = "Para realizar a matrícula no C.E.I.A.S são necessários:<br>1. Certidão de Nascimento do aluno<br>2. RG e CPF do aluno e responsável<br>3. Comprovante de Residência recente (luz)<br>4. Histórico Escolar original.";
  } else if (text.includes('horario') || text.includes('horário') || text.includes('aula')) {
    reply = "Nossos horários de aula são:<br>• Turno Matutino: 07h30 às 12h00<br>• Turno Vespertino: 13h00 às 17h30.";
  } else if (text.includes('transporte') || text.includes('ônibus') || text.includes('onibus')) {
    reply = "O C.E.I.A.S conta com transporte escolar público e gratuito garantido para os estudantes residentes na zona rural!";
  } else if (text.includes('público') || text.includes('publico') || text.includes('paga') || text.includes('valor')) {
    reply = "O C.E.I.A.S é um <strong>Colégio Estadual Público 100% Gratuito</strong>. Não há cobrança de mensalidades ou taxas.";
  }

  appendChatMessage('bot', reply);
}

/* Envio do Atendimento para o WhatsApp do Celular da Escola */
function sendToWhatsApp() {
  const phoneNumber = "5541999998888"; // Substituir pelo celular/WhatsApp oficial da escola
  let formattedText = "*Atendimento pelo Site - C.E.I.A.S*\n\n";

  if (conversationLog.length > 0) {
    formattedText += "*Histórico da Conversa com o Assistente IA:*\n" + conversationLog.join("\n") + "\n\n";
  }

  formattedText += "Gostaria de dar continuidade ao atendimento com a secretaria do colégio.";

  const encodedText = encodeURIComponent(formattedText);
  window.open(`https://wa.me/${phoneNumber}?text=${encodedText}`, '_blank');
}