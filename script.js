/* ==========================================================================
   C.E.I.A.S - COLÉGIO ESTADUAL DO CAMPO IRMÃ AMBRÓSIA SABATOVICH
   SCRIPT PRINCIPAL DE INTERATIVIDADE, GRÁFICOS E IA
   Arquivo: script.js
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

  /* 1. MENU HAMBÚRGUER PARA DISPOSITIVOS MÓVEIS */
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

  /* 2. CONTROLES DA BARRA DE ACESSIBILIDADE */
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
          document.getElementById('tts-text').textContent = 'Ouvir Página';
        } else {
          const activeTabContent = document.querySelector('.tab-content.active');
          const pageText = activeTabContent ? activeTabContent.innerText : document.body.innerText;
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
      } else {
        alert('Seu navegador não possui suporte ao recurso de leitura de texto.');
      }
    });
  }

  /* 3. INICIALIZAÇÃO DO GRÁFICO EDUCACIONAL */
  initChartRendimento();
});

/* ==========================================================================
   SISTEMA DE TROCA DE ABAS PRINCIPAIS DO SITE
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
  }

  window.scrollTo({ top: 0, behavior: 'smooth' });
}

/* ==========================================================================
   SUB-ABAS DE ENSINO (FUNDAMENTAL E MÉDIO)
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
   SUB-ABAS DE GALERIA DE FOTOS (INTERNAS, EXTERNAS E EVENTOS)
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
   MODAL LIGHTBOX PARA AMPLIAR FOTOS DA GALERIA
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
   GRÁFICO DETALHADO DE RENDIMENTO ESCOLAR (CHART.JS)
   Separado por ano escolar (6º ao 9º do Fundamental e 1º ao 3º do Médio)
   ========================================================================== */
function initChartRendimento() {
  const canvas = document.getElementById('chartRendimento');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: ['6º Ano (Fund.)', '7º Ano (Fund.)', '8º Ano (Fund.)', '9º Ano (Fund.)', '1º Ano (Médio)', '2º Ano (Médio)', '3º Ano (Médio)'],
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
          display: true,
          position: 'top',
          labels: { font: { family: 'Plus Jakarta Sans', size: 12, weight: '600' } }
        },
        title: {
          display: true,
          text: 'Rendimento Escolar C.E.I.A.S por Ano Letivo (%)',
          font: { family: 'Plus Jakarta Sans', size: 16, weight: '700' }
        }
      },
      scales: {
        y: {
          beginAtZero: true,
          max: 100,
          ticks: { callback: function(value) { return value + "%"; } }
        }
      }
    }
  });
}

/* ==========================================================================
   ASSISTENTE DE IA E INTEGRAÇÃO COM WHATSAPP DA ESCOLA
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
  let reply = "Obrigado pelo seu contato! Sou o assistente virtual do C.E.I.A.S. Para assuntos específicos, você pode clicar no botão verde abaixo para encaminhar esta conversa diretamente ao WhatsApp da nossa secretaria.";

  if (text.includes('documento') || text.includes('matricula') || text.includes('matrícula')) {
    reply = "<strong>Documentos necessários para matrícula no C.E.I.A.S:</strong><br>1. Certidão de Nascimento do estudante<br>2. RG e CPF do estudante e dos pais/responsáveis<br>3. Comprovante de Residência recente (fatura de energia)<br>4. Histórico Escolar original ou declaração de transferência.";
  } else if (text.includes('horario') || text.includes('horário') || text.includes('aula')) {
    reply = "<strong>Horários de Funcionamento do C.E.I.A.S:</strong><br>• Turno Matutino: 07h30 às 12h00<br>• Turno Vespertino: 13h00 às 17h30.";
  } else if (text.includes('transporte') || text.includes('ônibus') || text.includes('onibus')) {
    reply = "O C.E.I.A.S oferece <strong>transporte escolar público e gratuito</strong> garantido para todos os alunos residentes na zona rural.";
  } else if (text.includes('público') || text.includes('publico') || text.includes('paga') || text.includes('valor')) {
    reply = "O C.E.I.A.S é uma <strong>Escola Pública Estadual 100% Gratuita</strong>. Não há cobrança de mensalidades, matrículas ou taxas de materiais.";
  }

  appendChatMessage('bot', reply);
}

function sendToWhatsApp() {
  const phoneNumber = "5541999998888"; // Insira aqui o WhatsApp do celular do colégio
  let formattedText = "*Atendimento do Site - C.E.I.A.S*\n\n";

  if (conversationLog.length > 0) {
    formattedText += "*Histórico da Conversa com a IA:*\n" + conversationLog.join("\n") + "\n\n";
  }

  formattedText += "Gostaria de dar continuidade ao atendimento com a secretaria do colégio.";

  const encodedText = encodeURIComponent(formattedText);
  window.open(`https://wa.me/${phoneNumber}?text=${encodedText}`, '_blank');
}