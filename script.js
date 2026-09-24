/* ==========================================================================
   INICIALIZAÇÃO E EVENTOS AO CARREGAR A PÁGINA
   ========================================================================== */
document.addEventListener('DOMContentLoaded', () => {

  // 1. MENU HAMBÚRGUER
  const hamburgerBtn = document.getElementById('hamburger-btn');
  const navMenu = document.getElementById('nav-menu');

  if (hamburgerBtn && navMenu) {
    hamburgerBtn.addEventListener('click', () => {
      navMenu.classList.toggle('active');
    });

    // Fechar menu ao clicar em qualquer item
    document.querySelectorAll('.nav-item').forEach(item => {
      item.addEventListener('click', () => {
        navMenu.classList.remove('active');
      });
    });
  }

  // 2. RECURSOS DE ACESSIBILIDADE
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

  // Sintetizador de Voz (Text-To-Speech)
  let isSpeaking = false;
  if (btnTts) {
    btnTts.addEventListener('click', () => {
      if ('speechSynthesis' in window) {
        if (isSpeaking) {
          window.speechSynthesis.cancel();
          isSpeaking = false;
          document.getElementById('tts-text').textContent = 'Ouvir Página';
        } else {
          const pageText = document.querySelector('main') ? document.querySelector('main').innerText : document.body.innerText;
          const utterance = new SpeechSynthesisUtterance(pageText.substring(0, 1000)); // Lê os trechos principais
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
        alert('Seu navegador não suporta a leitura por áudio.');
      }
    });
  }

  // 3. INICIALIZAÇÃO DO GRÁFICO (CHART.JS)
  initChartRendimento();
});

/* ==========================================================================
   SISTEMA DE ABAS PEDAGÓGICAS (ENSINO)
   ========================================================================== */
function switchTab(evt, tabId) {
  const container = evt.currentTarget.closest('.container');
  const panes = container.querySelectorAll('.tab-pane');
  const buttons = container.querySelectorAll('.tab-btn');

  panes.forEach(pane => pane.classList.remove('active'));
  buttons.forEach(btn => btn.classList.remove('active'));

  document.getElementById(tabId).classList.add('active');
  evt.currentTarget.classList.add('active');
}

/* ==========================================================================
   SISTEMA DE ABAS DA GALERIA
   ========================================================================== */
function switchGalleryTab(evt, galleryId) {
  const container = evt.currentTarget.closest('.container');
  const panes = container.querySelectorAll('.gallery-pane');
  const buttons = container.querySelectorAll('.gallery-tab-btn');

  panes.forEach(pane => pane.classList.remove('active'));
  buttons.forEach(btn => btn.classList.remove('active'));

  document.getElementById(galleryId).classList.add('active');
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
          backgroundColor: '#f43f5e',
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
      plugins: {
        legend: {
          position: 'top',
        },
        title: {
          display: true,
          text: 'Rendimento Por Ano Escolar (%) - C.E.I.A.S',
          font: {
            size: 16,
            family: 'Poppins'
          }
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
   CHATBOT COM IA & INTEGRAÇÃO COM WHATSAPP
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

  // Registrar histórico para enviar via WhatsApp
  conversationLog.push(`${sender === 'user' ? 'Aluno/Responsável' : 'Assistente IA'}: ${text.replace(/<[^>]*>?/gm, '')}`);
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

  // Simulação de resposta com IA
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
  let reply = "Obrigado por entrar em contato! Sou o assistente do C.E.I.A.S. Para assuntos específicos, você também pode clicar no botão abaixo para falar com nossa secretaria pelo WhatsApp.";

  if (text.includes('documento') || text.includes('matricula') || text.includes('matrícula')) {
    reply = "Para realizar a matrícula no C.E.I.A.S é necessário:<br>1. Certidão de Nascimento do aluno<br>2. RG e CPF do aluno e do responsável<br>3. Comprovante de residência atualizado<br>4. Histórico Escolar original.";
  } else if (text.includes('horario') || text.includes('horário') || text.includes('aula')) {
    reply = "Nossas aulas ocorrem nos seguintes turnos:<br>• Matutino: 07h30 às 12h00<br>• Vespertino: 13h00 às 17h30.";
  } else if (text.includes('transporte') || text.includes('ônibus') || text.includes('onibus')) {
    reply = "Sim! O C.E.I.A.S conta com transporte escolar público e gratuito garantido para todas as rotas rurais atendidas pela escola.";
  } else if (text.includes('público') || text.includes('publico') || text.includes('paga')) {
    reply = "O C.E.I.A.S é um <strong>Colégio Estadual Público 100% Gratuito</strong>. Não há cobrança de mensalidades ou taxas de inscrição.";
  }

  appendChatMessage('bot', reply);
}

// Enviar Histórico para o WhatsApp da Escola
function sendToWhatsApp() {
  const phoneNumber = "5541999998888"; // Número do celular/WhatsApp do colégio com DDD
  let formattedText = "*Atendimento via Site - C.E.I.A.S*\n\n";
  
  if (conversationLog.length > 0) {
    formattedText += "*Histórico da Conversa com a IA:*\n" + conversationLog.join("\n") + "\n\n";
  }
  
  formattedText += "Gostaria de dar continuidade ao atendimento com a equipe escolar.";
  
  const encodedText = encodeURIComponent(formattedText);
  window.open(`https://wa.me/${phoneNumber}?text=${encodedText}`, '_blank');
}