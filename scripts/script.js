const userInput = document.getElementById("user-input");
const sendButton = document.getElementById("send-button");
const chatHistory = document.getElementById("chat-history");
const hugButton = document.getElementById("hug-button");
const clearButton = document.getElementById("clear-button");

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
    console.log(data); 
    const botResponse = data.candidates[0].content.parts[0].text;
    displayMessage(botResponse, "bot-message");
  })
  .catch(error => {
    console.error("Erro ao chamar a API:", error);
    displayMessage("Ocorreu um erro. Por favor, tente novamente mais tarde.", "error-message");
  });
}

function displayMessage(message, type) {
  const messageElement = document.createElement("div");
  messageElement.classList.add("message", type);
  messageElement.textContent = message;
  chatHistory.appendChild(messageElement);
  chatHistory.scrollTop = chatHistory.scrollHeight; 
}

function clearChatHistory() {
  chatHistory.innerHTML = ""; 
}

function sendHug() {
  const hugMessage = "Você é importante e merece todo amor do mundo! 🤗";
  displayMessage(hugMessage, "bot-message");
}

sendButton.addEventListener("click", () => {
  const userMessage = userInput.value;
  displayMessage(userMessage, "user-message");
  userInput.value = "";
  sendMessageToAPI(userMessage); 
});

hugButton.addEventListener("click", () => {
  sendHug();
});

clearButton.addEventListener("click", () => {
  clearChatHistory();
});

userInput.addEventListener("keyup", (event) => {
  if (event.key === "Enter") {
    sendButton.click(); 
  }
});
