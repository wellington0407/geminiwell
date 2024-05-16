var socket = new WebSocket('wss://geminiwell-hgrulo8m.b4a.run/ws');

ws.onmessage = function(event) {
    var chatHistory = document.getElementById("chat-history");
    var message = document.createElement("div");
    var decodedText = decodeURIComponent(event.data);
    message.innerText = "GeminiWell: " + decodedText;
    chatHistory.appendChild(message);
};


function sendMessage() {
    var userInput = document.getElementById("user-input").value;
    var chatHistory = document.getElementById("chat-history");
    var message = document.createElement("div");
    message.innerText = "Você: " + userInput;
    chatHistory.appendChild(message);
    ws.send(userInput);
    document.getElementById("user-input").value = "";
}

document.getElementById("send-button").addEventListener("click", sendMessage);

document.getElementById("clear-button").addEventListener("click", function() {
    document.getElementById('chat-history').innerHTML = '';
});

document.getElementById("hug-button").addEventListener("click", function() {
    var chatHistory = document.getElementById("chat-history");
    var message = document.createElement("div");
    message.innerText = "Você é importante e merece todo amor do mundo! 🤗";
    chatHistory.appendChild(message);
})
document.getElementById("user-input").addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        sendMessage();
    }
});
