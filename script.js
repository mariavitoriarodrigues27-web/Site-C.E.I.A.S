// MENU HAMBÚRGUER
const hamburger = document.getElementById("hamburger");
const navLinks = document.getElementById("navLinks");

hamburger.addEventListener("click", () => {
  navLinks.classList.toggle("open");
});

// ALTERNADOR DE ABAS
function openTab(evt, tabName) {
  const contents = document.getElementsByClassName("tab-content");
  for (let content of contents) {
    content.classList.remove("active");
  }

  const buttons = document.getElementsByClassName("nav-btn");
  for (let btn of buttons) {
    btn.classList.remove("active");
  }

  document.getElementById(tabName).classList.add("active");
  evt.currentTarget.classList.add("active");

  // Fecha o menu hambúrguer ao clicar na aba (em telas menores)
  navLinks.classList.remove("open");
}

// MODO ALTO CONTRASTE (ACESSIBILIDADE)
function toggleHighContrast() {
  document.body.classList.toggle("high-contrast");
}

// ENVIO DE MATRÍCULA PARA O WHATSAPP DA ESCOLA
function sendMatriculaToWhatsApp(event) {
  event.preventDefault();
  const nome = document.getElementById("matNome").value;
  const serie = document.getElementById("matSerie").value;
  const resp = document.getElementById("matResp").value;

  const phone = "5500999999999"; // Substituir pelo número da escola
  const message = `Olá, gostaria de solicitar a pré-matrícula no C.E.I.A.S.%0A- *Aluno:* ${nome}%0A- *Série:* ${serie}%0A- *Responsável:* ${resp}`;

  window.open(`https://wa.me/${phone}?text=${message}`, '_blank');
}

// SIMULAÇÃO DO CHAT DE IA
let lastUserMessage = "";

function sendMessage() {
  const input = document.getElementById("userInput");
  const text = input.value.trim();
  if (!text) return;

  lastUserMessage = text;
  const chatBox = document.getElementById("chatBox");

  const userMsg = document.createElement("div");
  userMsg.className = "message user";
  userMsg.innerText = text;
  chatBox.appendChild(userMsg);

  input.value = "";

  setTimeout(() => {
    const botMsg = document.createElement("div");
    botMsg.className = "message bot";
    botMsg.innerText = "Entendi sua dúvida. Você pode prosseguir com o encaminhamento direto para nossa secretaria pelo botão verde abaixo.";
    chatBox.appendChild(botMsg);
    chatBox.scrollTop = chatBox.scrollHeight;
  }, 600);
}

// ENCAMINHAR CONVERSA COM IA PARA O WHATSAPP
function redirectChatToWhatsApp() {
  const phone = "5500999999999";
  const message = `Olá! Estava no site da escola (C.E.I.A.S) e gostaria de atendimento humano referente a: "${lastUserMessage}"`;
  window.open(`https://wa.me/${phone}?text=${encodeURIComponent(message)}`, '_blank');
}