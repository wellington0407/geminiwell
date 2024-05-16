// Inicialização da WebSocket
var socket = new WebSocket('wss://geminiwell-hgrulo8m.b4a.run/ws');

// Evento de recebimento de mensagem
socket.onmessage = function(event) {
    var chatHistory = document.getElementById("chat-history");
    var message = document.createElement("div");
    var decodedText = decodeURIComponent(event.data);
    message.innerText = "GeminiWell: " + decodedText;
    chatHistory.appendChild(message);
};

// Função para enviar mensagem
function sendMessage() {
    var userInput = document.getElementById("user-input").value;
    var chatHistory = document.getElementById("chat-history");
    var message = document.createElement("div");
    message.innerText = "Você: " + userInput;
    chatHistory.appendChild(message);
    socket.send(userInput); // Envia mensagem pela WebSocket
    document.getElementById("user-input").value = "";
}

// Event listener para o botão de enviar mensagem
document.getElementById("send-button").addEventListener("click", sendMessage);

// Event listener para o botão de limpar o histórico de chat
document.getElementById("clear-button").addEventListener("click", function() {
    document.getElementById('chat-history').innerHTML = '';
});

// Event listener para o botão de abraço
document.getElementById("hug-button").addEventListener("click", function() {
    var chatHistory = document.getElementById("chat-history");
    var message = document.createElement("div");
    message.innerText = "Você é importante e merece todo amor do mundo! 🤗";
    chatHistory.appendChild(message);
});

// Event listener para pressionar a tecla Enter no campo de entrada de usuário
document.getElementById("user-input").addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        sendMessage();
    }
});
