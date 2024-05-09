const userInput = document.getElementById("user-input");
const sendButton = document.getElementById("send-button");
const chatHistory = document.getElementById("chat-history");
const hugButton = document.getElementById("hug-button");
const clearButton = document.getElementById("clear-button");

// Função para enviar mensagem para a API Gemini usando o formato cURL fornecido
function sendMessageToAPI(message) {
  const apiKey = "SEU-TOKEN";
  const apiUrl = "https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=" + apiKey;

  let texto = `Aborde essa pergunta em textos curtos de duas linhas e motivacionas com a sensibilidade de uma terapeuta ou psicóloga: ${message}. Se sentir que não tem as habilidades necessárias para responder adequadamente, é importante encaminhar a pessoa para um profissional qualificado`;
  
  const data = {
    "contents": [{
      "parts": [{
        "text": texto
      }]
    }]
  };

  fetch(apiUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  })
  .then(response => response.json())
  .then(data => {
    console.log(data); // Adicione esta linha para ver o que está sendo retornado pela API
    // Extraindo texto da resposta
    const botResponse = data.candidates[0].content.parts[0].text;
    displayMessage(botResponse, "bot-message");
  })
  .catch(error => {
    console.error("Erro ao chamar a API:", error);
    displayMessage("Ocorreu um erro. Por favor, tente novamente mais tarde.", "error-message");
  });
}

// Função para exibir mensagem no chat
function displayMessage(message, type) {
  const messageElement = document.createElement("div");
  messageElement.classList.add("message", type);
  messageElement.textContent = message;
  chatHistory.appendChild(messageElement);
  chatHistory.scrollTop = chatHistory.scrollHeight; 
}

// Função para limpar o histórico do chat
function clearChatHistory() {
  chatHistory.innerHTML = ""; 
}

// Função para enviar um abraço
function sendHug() {
  const hugMessage = "Você é importante e merece todo amor do mundo! 🤗";
  displayMessage(hugMessage, "bot-message");
}

// Evento para clique no botão "Enviar"
sendButton.addEventListener("click", () => {
  const userMessage = userInput.value;
  displayMessage(userMessage, "user-message");
  userInput.value = "";
  sendMessageToAPI(userMessage); 
});

// Evento para clique no botão "Abraço"
hugButton.addEventListener("click", () => {
  sendHug();
});

// Evento para clique no botão "Limpar Chat"
clearButton.addEventListener("click", () => {
  clearChatHistory();
});

// Evento para pressionar a tecla Enter
userInput.addEventListener("keyup", (event) => {
  if (event.key === "Enter") {
    sendButton.click(); 
  }
});
