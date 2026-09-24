document.addEventListener('DOMContentLoaded', () => {

  /* 1. MENU HAMBÚRGUER */
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('nav-links');

  hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('open');
  });

  /* 2. BARRA DE ACESSIBILIDADE */
  const btnContrast = document.getElementById('btn-contrast');
  const btnIncrease = document.getElementById('btn-increase-font');
  const btnDecrease = document.getElementById('btn-decrease-font');
  let fontSize = 100;

  btnContrast.addEventListener('click', () => {
    document.body.classList.toggle('high-contrast');
  });

  btnIncrease.addEventListener('click', () => {
    if (fontSize < 130) {
      fontSize += 10;
      document.body.style.fontSize = `${fontSize}%`;
    }
  });

  btnDecrease.addEventListener('click', () => {
    if (fontSize > 80) {
      fontSize -= 10;
      document.body.style.fontSize = `${fontSize}%`;
    }
  });

  /* 3. INICIALIZAÇÃO DO GRÁFICO (CHART.JS) */
  const ctx = document.getElementById('rendimentoChart').getContext('2d');
  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: ['6º Ano', '7º Ano', '8º Ano', '9º Ano', '1º Médio', '2º Médio', '3º Médio'],
      datasets: [
        {
          label: '% Aprovação',
          data: [92, 88, 90, 95, 85, 89, 97],
          backgroundColor: '#3a9bdc'
        },
        {
          label: '% Reprovação',
          data: [6, 9, 8, 4, 11, 8, 2],
          backgroundColor: '#f07167'
        },
        {
          label: '% Abandono',
          data: [2, 3, 2, 1, 4, 3, 1],
          backgroundColor: '#fed9b7'
        }
      ]
    },
    options: {
      responsive: true,
      plugins: {
        title: {
          display: true,
          text: 'Rendimento Escolar por Ano Letivo (%)'
        }
      },
      scales: {
        y: { beginAtZero: true, max: 100 }
      }
    }
  });

  /* 4. CHAT COM IA E INTEGRALIZAÇÃO COM WHATSAPP */
  const chatMessages = document.getElementById('chat-messages');
  const chatInput = document.getElementById('chat-input');
  const sendBtn = document.getElementById('send-btn');
  const whatsappSendBtn = document.getElementById('whatsapp-send-btn');

  let conversaHistorico = "";

  function addMessage(text, isUser = false) {
    const msgDiv = document.createElement('div');
    msgDiv.classList.add(isUser ? 'user-msg' : 'bot-msg');
    msgDiv.textContent = text;
    chatMessages.appendChild(msgDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;

    conversaHistorico += `${isUser ? "Usuário" : "IA"}: ${text}\n`;
  }

  function responderIA(userText) {
    const text = userText.toLowerCase();
    let resposta = "Entendi! Para essa e outras dúvidas, você pode nos mandar uma mensagem direta pelo WhatsApp clicando no botão abaixo.";

    if (text.includes("matrícula") || text.includes("matricula") || text.includes("documento")) {
      resposta = "Para a matrícula são necessários: Certidão de Nascimento, RG/CPF do aluno e responsável, Comprovante de Residência (luz) e Histórico Escolar. Quer enviar os dados via WhatsApp?";
    } else if (text.includes("horário") || text.includes("horario") || text.includes("aula")) {
      resposta = "As aulas funcionam no turno matutino (07h30 às 12h) e vespertino (13h às 17h30).";
    } else if (text.includes("transporte") || text.includes("ônibus")) {
      resposta = "O colégio conta com transporte escolar público garantido para os alunos da área rural!";
    }

    setTimeout(() => {
      addMessage(resposta, false);
    }, 600);
  }

  sendBtn.addEventListener('click', () => {
    const text = chatInput.value.trim();
    if (text) {
      addMessage(text, true);
      chatInput.value = '';
      responderIA(text);
    }
  });

  chatInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') sendBtn.click();
  });

  // Envio direto para o número de celular/WhatsApp da escola
  whatsappSendBtn.addEventListener('click', () => {
    const numeroEscola = "5500999999999"; // Substituir pelo número real com DDD
    const textoMensagem = encodeURIComponent("Olá C.E.I.A.S, conversei com o assistente do site:\n\n" + conversaHistorico);
    window.open(`https://wa.me/${numeroEscola}?text=${textoMensagem}`, '_blank');
  });

});

/* 5. NAVEGAÇÃO DE ABAS GERAIS */
function openTab(evt, tabName) {
  const container = evt.currentTarget.closest('.tabs-container');
  const contents = container.querySelectorAll('.tab-content');
  const buttons = container.querySelectorAll('.tab-btn');

  contents.forEach(content => content.classList.remove('active'));
  buttons.forEach(btn => btn.classList.remove('active'));

  document.getElementById(tabName).classList.add('active');
  evt.currentTarget.classList.add('active');
}

/* 6. NAVEGAÇÃO DE ABAS DA GALERIA */
function openGalleryTab(evt, galleryName) {
  const container = evt.currentTarget.closest('.tabs-container');
  const contents = container.querySelectorAll('.gallery-content');
  const buttons = container.querySelectorAll('.tab-btn');

  contents.forEach(content => content.classList.remove('active'));
  buttons.forEach(btn => btn.classList.remove('active'));

  document.getElementById(galleryName).classList.add('active');
  evt.currentTarget.classList.add('active');
}